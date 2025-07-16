import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTransaction} from '../redux/reducers/Reducers';
import { RootState } from '../redux/store';

const TransactionForm = () => {
  const dispatch = useDispatch();
  const Categories = useSelector((state:RootState) => state.transactions.categories);

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [type, setType] = useState('income');

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title || !amount || !category || !date) return alert("لطفاً تمام فیلدها را پر کنید");

    const finalAmount = type === 'income' ? +amount : -Math.abs(+amount);

    dispatch(addTransaction({ id: Date.now(), Title:title, Amount: finalAmount, Category:category, Date: date, Type:type }));

    setTitle('');
    setAmount('');
    setCategory('');
    setDate('');
    setType('income');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#1f1d2b] rounded-2xl p-6 shadow-md space-y-4 w-full md:w-1/2 mx-auto m-5">
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-lg font-bold mb-4 items-center">اضافه کردن تراکنش جدید</h2>
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input type="radio" value="income" checked={type === 'income'} onChange={() => setType('income')} /> درآمد
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" value="expense" checked={type === 'expense'} onChange={() => setType('expense')} /> هزینه
          </label>
        </div>
      </div>
      <input placeholder="عنوان" value={title} onChange={e => setTitle(e.target.value)} className="w-full p-3 bg-[#2a2837] rounded-xl focus:outline-none" />
      <input placeholder="مبلغ" type="number" value={amount} onChange={e => setAmount(e.target.value)} className="w-full p-3 bg-[#2a2837] rounded-xl focus:outline-none" />
      <input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full p-3 bg-[#2a2837] rounded-xl focus:outline-none" />
      <select value={category} onChange={e => setCategory(e.target.value)} className="w-full p-3 bg-[#2a2837] rounded-xl focus:outline-none">
        <option value="">انتخاب دسته‌بندی</option>
        {(Categories || []).map(c => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
      <button type="submit" className="bg-gradient-to-r from-indigo-600 to-purple-600 w-full py-3 rounded-xl hover:brightness-110">ثبت تراکنش</button>
    </form>
  );
};

export default TransactionForm;