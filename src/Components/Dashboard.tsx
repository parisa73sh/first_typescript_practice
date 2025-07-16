import { useSelector } from 'react-redux';
import TransactionList from './TransactionList';
import ChartPie from './ChartPie';
import { FaRegUser } from "react-icons/fa";
import { RootState } from '../redux/store';

function Dashboard() {
const transactions = useSelector((state:RootState) => state.transactions.transactions);
  const currentUser = useSelector((state:RootState) => state.user.user);

  const totalIncome = transactions
    .filter((tx) => tx?.Amount > 0)
    .reduce((sum, tx) => sum + tx?.Amount, 0);

  const totalExpense = transactions
    .filter((tx) => tx?.Amount < 0)
    .reduce((sum, tx) => sum + tx?.Amount, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white font-sans p-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Card Info */}
        <div className="lg:col-span-2 bg-[#1f1d2b] rounded-2xl p-6 shadow">
          <div className="flex items-center justify-between">
            <div className="bg-black text-white p-6 rounded-xl w-1/2">
              <div className="text-sm tracking-widest">
                {currentUser?.cardNumber || '---- ---- ---- ----'}
              </div>
              <div className="mt-4 font-bold text-xl">
                {currentUser?.name || 'کاربر مهمان'}
              </div>
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="bg-[#1f1d2b] rounded-2xl p-6 shadow">
          <div className="flex items-center space-x-4 mb-4">
            <FaRegUser className="w-14 h-14 rounded-full" />
            <div>
              <p className="text-sm text-gray-400">خوش آمدید</p>
              <h2 className="text-lg font-bold">
                {currentUser?.name || 'کاربر مهمان'}
              </h2>
              <p className="text-sm text-gray-500">{currentUser?.email}</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between bg-green-100 p-3 rounded-lg">
              <span className='text-gray-700'>درآمد</span>
              <span className="font-bold text-green-700">{totalIncome.toLocaleString()} تومان</span>
            </div>
            <div className="flex justify-between bg-red-100 p-3 rounded-lg">
              <span className='text-gray-700'>هزینه</span>
              <span className="font-bold text-red-700">{Math.abs(totalExpense).toLocaleString()} تومان</span>
            </div>
          </div>
        </div>

        {/* Transactions List */}
        <div className="lg:col-span-2 bg-[#1f1d2b] rounded-2xl p-6 shadow">
          <div className="space-y-3 flex justify-center items-center flex-wrap">
            <TransactionList />
          </div>
        </div>

        {/* Money Flow Chart */}
        <div className="bg-[#1f1d2b] rounded-2xl p-6 shadow">
          <div className="flex items-center justify-center">
            <ChartPie />
          </div>
        </div>

      </div>
    </div>
  );
}
export default Dashboard;
