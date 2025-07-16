import React from 'react';
import { useSelector } from 'react-redux';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import dayjs from 'dayjs';
import { RootState } from '../redux/store';

const ChartLine: React.FC = () => {
 type Transaction = {
  id: number;
  Title: string;
  Amount: number;
  Category: string | string[];
  Date: string;
  Type: string;
};

// نوع داده‌ای که به نمودار می‌دیم
type ChartDataItem = {
  day: string;
  income: number;
  expense: number;
};
  // خواندن تراکنش‌ها از Redux store
  const transactions = useSelector(
    (state: RootState) => state.transactions?.transactions ?? []
  ) as Transaction[];

  // حذف داده‌های نامعتبر
  const validTransactions = transactions.filter(
    (t): t is Transaction =>
      t &&
      typeof t === 'object' &&
      typeof t.Date === 'string' &&
      typeof t.Amount === 'number'
  );

  // گروه‌بندی تراکنش‌ها بر اساس تاریخ
  const groupedData = validTransactions.reduce<Record<string, ChartDataItem>>((acc, t) => {
    const day = dayjs(t.Date).format('YYYY-MM-DD');
    if (!acc[day]) acc[day] = { day, income: 0, expense: 0 };
    if (t.Amount >= 0) {
      acc[day].income += t.Amount;
    } else {
      acc[day].expense += Math.abs(t.Amount);
    }
    return acc;
  }, {});

  // تبدیل object به array و مرتب‌سازی
  const data: ChartDataItem[] = Object.values(groupedData).sort((a, b) =>
    a.day > b.day ? 1 : -1
  );


  return (
    <div className="bg-[#242425c0] rounded-2xl shadow-md mt-6 p-4 w-full">
      <h2 className="text-lg font-bold mb-4">نمودار روزانه درآمد و هزینه</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ left: 30, right: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#555" />
          <XAxis dataKey="day" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip />
          <Line type="monotone" dataKey="income" stroke="#00e676" strokeWidth={2} name="درآمد" />
          <Line type="monotone" dataKey="expense" stroke="#ff1744" strokeWidth={2} name="هزینه" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
export default ChartLine;
