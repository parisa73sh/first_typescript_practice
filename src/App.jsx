import React, { useState } from 'react';
import TransactionForm from './Components/TransactionForm';
import TransactionList from './Components/TransactionList';
import ChartPie from './Components/ChartPie';
import ChartLine from './Components/ChartLine';
import TransactionFilter from './Components/TransactionFilter';
import Categorymanager from './Components/CategoryManager';
import Dashboard from './Components/Dashboard';
import RegisterForm from './Components/RegisterForm';
import LoginForm from './Components/LoginForm';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState('Dashboard');
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white font-sans p-4">
      <div className="flex flex-col lg:flex-row h-full">
        <aside className="w-full h-auto lg:w-1/5 p-4 bg-[#1f1d2b] rounded-2xl shadow-md mb-4 lg:mb-0 lg:m-4">
          <ul className="flex flex-col justify-between items-center p-6 m-8">
            <li onClick={() => setActiveSection('Dashboard')} className="hover:text-indigo-400 cursor-pointer mb-4">صفحه اصلی</li>
            <li onClick={() => setActiveSection('transactions')} className="hover:text-indigo-400 cursor-pointer mb-4">افزودن تراکنش</li>
            <li onClick={() => setActiveSection('charts')} className="hover:text-indigo-400 cursor-pointer mb-4">نمودارها</li>
            <li onClick={() => setActiveSection('categories')} className="hover:text-indigo-400 cursor-pointer mb-4">دسته‌بندی‌ها</li>
            <li onClick={() => setActiveSection('ّfilters')} className="hover:text-indigo-400 cursor-pointer mb-4">فیلتر</li>
            <li onClick={() => setActiveSection('ّregister/login form')} className="hover:text-indigo-400 cursor-pointer mb-4">ثبت نام/ورود کاربران</li>
          </ul>
        </aside>
        <main className="flex-1 space-y-6">
          {activeSection === 'Dashboard' && (<Dashboard/>)}
          {activeSection === 'transactions' && (<div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white font-sans p-4"><TransactionForm /><TransactionList /></div>)}
          {activeSection === 'charts' && (<div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white font-sans p-4"><ChartPie /><ChartLine /></div>)}
          {activeSection === 'categories' && (<Categorymanager/>)}
          {activeSection === 'ّfilters' && (<TransactionFilter/>)}
          {activeSection === 'ّregister/login form' && (<div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white font-sans p-4"><RegisterForm/><LoginForm/></div> )}
        </main>
      </div>
    </div>
  );
}
export default App;