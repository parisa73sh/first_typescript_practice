import { useState, useEffect } from 'react';
import { useDispatch , useSelector } from 'react-redux';
import { loginUser } from '../redux/reducers/userSlice';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../redux/store';


const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate =useNavigate();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const user = useSelector((state:RootState) => state.user.user);

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginUser(credentials));
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 rounded shadow max-w-md mx-auto flex flex-col justify-center items-center">
      <h2 className="text-lg font-bold mb-2">ورود</h2>
      <input className="border p-1 w-full mb-2" placeholder="ایمیل" value={credentials.email} onChange={e => setCredentials({ ...credentials, email: e.target.value })} />
      <input className="border p-1 w-full mb-2" type="password" placeholder="رمز عبور" value={credentials.password} onChange={e => setCredentials({ ...credentials, password: e.target.value })} />
      <button className="bg-green-500 w-full text-white px-4 py-1 rounded hover:bg-green-600">ورود</button>
    </form>
  );
};

export default LoginForm;
