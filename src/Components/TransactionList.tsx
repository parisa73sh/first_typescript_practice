import { useDispatch, useSelector } from 'react-redux';
import { deleteTransaction } from '../redux/reducers/Reducers';
import { RootState } from '../redux/store';
const TransactionList = () => {
  const dispatch = useDispatch();
  const transactions = useSelector((state: RootState) => state.transactions.transactions);
  const handleDeleteTransaction = (id:number) => {
    dispatch(deleteTransaction(id));
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {transactions.length === 0 && (
        <div className="col-span-full text-center text-gray-400">تراکنشی وجود ندارد.</div>
      )}
      {transactions.map((tx) => (
        tx && typeof tx === 'object' && (
          <div key={tx.id} className="bg-[#1f1d2b] rounded-2xl p-4 shadow-lg flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold">{tx.Title}</h3>
              <p className="text-sm text-gray-400">{new Date(tx.Date).toLocaleDateString('fa-IR')}</p>
              <p className="text-sm text-indigo-400">{tx.Category}</p>
            </div>
            <div className={`text-xl font-bold ${tx.Amount < 0 ? 'text-red-400' : 'text-green-400'}`}>
              {tx.Amount.toLocaleString()} تومان
            </div>
            <button
              onClick={() => handleDeleteTransaction(tx?.id)}
              className="bg-red-600 px-3 py-1 rounded-xl hover:brightness-110 text-white text-sm ml-6"
            >
            حذف
            </button>
          </div>
        )
      ))}
    </div>
  );
};

export default TransactionList;
