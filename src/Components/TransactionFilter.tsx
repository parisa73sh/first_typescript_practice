
import { useState } from 'react';
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';

const TransactionFilter = () => {
  const allTransactions = useSelector((state:RootState) => state.transactions.transactions);
  const categories = useSelector((state:RootState) => state.transactions.categories);

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const filtered = allTransactions.filter(tx => {
  if (!tx || typeof tx !== 'object') return false; // جلوگیری از خطا

  const matchesTitle = tx.Title?.toLowerCase().includes(search.toLowerCase());
  const matchesCategory = categoryFilter ? tx.Category === categoryFilter : true;
  const txDate = new Date(tx.Date);
  const matchesStartDate = startDate ? txDate >= new Date(startDate) : true;
  const matchesEndDate = endDate ? txDate <= new Date(endDate) : true;

  return matchesTitle && matchesCategory && matchesStartDate && matchesEndDate;
});


  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white font-sans p-4">
    <div className="bg-[#1f1d2b] rounded-2xl p-6">
    <div className="p-4 space-y-4">
        <h2 className="text-lg font-bold mb-4 items-center">فیلتر تراکنشها</h2>
        <div className="flex flex-col md:flex-row gap-4">
            <input
            type="text"
            placeholder="جستجو بر اساس عنوان"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="p-2 rounded-xl bg-[#2a2837] w-full md:w-1/3"
            />
            <select
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
            className="p-2 rounded-xl bg-[#2a2837] w-full md:w-1/3"
            >
            <option value="">همه دسته‌بندی‌ها</option>
            {categories.map(c => (
                <option key={c} value={c}>{c}</option>
            ))}
            </select>
            <input
            type="date"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            className="p-2 rounded-xl bg-[#2a2837]"
            />
            <input
            type="date"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
            className="p-2 rounded-xl bg-[#2a2837]"
            />
        </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {filtered.length === 0 && (
          <div className="col-span-full text-center text-gray-400">موردی یافت نشد.</div>
        )}
        {filtered.map(tx => (
          <div key={tx.id} className="bg-[#1f1d2b] rounded-2xl p-4 shadow-lg flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold">{tx.Title}</h3>
              <p className="text-sm text-gray-400">{new Date(tx.Date).toLocaleDateString('fa-IR')}</p>
              <p className="text-sm text-indigo-400">{tx.Category}</p>
            </div>
            <div className={`text-xl font-bold ${tx.Amount < 0 ? 'text-red-400' : 'text-green-400'}`}>
              {tx.Amount.toLocaleString()} تومان
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
    </div>
  );
};

export default TransactionFilter;
