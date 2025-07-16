import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/reducers/userSlice';
import { RootState } from '../redux/store';
const RegisterForm = () => {
  const dispatch = useDispatch();
  const storeduser = useSelector((state: RootState) => state.user.user?.cardNumber);
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    cardNumber: '',
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();  
      if (user.cardNumber.length !== 16 || !/^\d+$/.test(user.cardNumber)) {
      alert('شماره کارت باید ۱۶ رقم و فقط عدد باشد.');
      return;
    }

    dispatch(registerUser(user));
    setUser({ name: '', email: '', password: '', cardNumber: '' });
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 rounded shadow max-w-md mx-auto flex flex-col justify-center items-center">
      <h2 className="text-lg font-bold mb-4 text-center text-white ">فرم ثبت‌نام</h2>

      <input
        className="border p-2 w-full mb-3 rounded text-white"
        placeholder="نام"
        value={user.name}
        onChange={(e) => setUser({ ...user, name: e.target.value })}
        required
      />

      <input
        className="border p-2 w-full mb-3 rounded text-white"
        placeholder="ایمیل"
        type="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        required
      />

      <input
        className="border p-2 w-full mb-3 rounded"
        type="password"
        placeholder="رمز عبور"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        required
      />

      <input
        className="border p-2 w-full mb-3 rounded"
        placeholder="شماره کارت (۱۶ رقم)"
        value={user.cardNumber}
        onChange={(e) => setUser({ ...user, cardNumber: e.target.value })}
        maxLength={16}
        required
      />

      <button className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700 ">
        ثبت‌نام
      </button>
    </form>
  );
};

export default RegisterForm;
