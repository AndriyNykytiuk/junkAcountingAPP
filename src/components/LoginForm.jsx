import React, { useState } from 'react';
import identity from '../img/DSNSlogo.svg';

const LoginForm = ({ onLogin }) => {
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    const formData = new FormData(e.target);
    const username = formData.get('username');
    const password = formData.get('password');

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({ username, password }).toString(),
      });

      if (!res.ok) throw new Error('Помилка авторизації');
      const data = await res.json();
      localStorage.setItem('sessionId', data.sessionId);
      localStorage.setItem('userBrigadeId', data.brigadeId);
      onLogin(data);
    } catch {
      setError('Невірний логін або пароль');
    }
  };

  return (
    <div className='bg-gray-100 min-h-screen flex flex-col justify-center items-center p-4'>
      <div className='flex flex-col w-full max-w-md md:max-w-lg lg:max-w-xl justify-center mb-6 p-4 md:p-7 bg-[#203955] items-center rounded shadow-md'>
        <img src={identity} alt="Identity" className="h-24 w-24 md:h-32 md:w-32 object-contain mb-6 md:mb-10" />
        <form onSubmit={handleLogin} className="w-full flex flex-col justify-center mx-auto p-3 md:p-4 space-y-3 md:space-y-4 bg-[#203955] rounded shadow-md">
          <input
            type="text"
            name="username"
            placeholder="Логін"
            className="w-full border px-3 py-2 md:py-3 rounded bg-white text-sm md:text-base"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Пароль"
            className="w-full border px-3 py-2 md:py-3 rounded bg-white text-sm md:text-base"
            required
          />
          <button
            type="submit"
            className="bg-[#fcd700] text-center text-black px-4 py-2 md:py-3 rounded cursor-pointer hover:font-bold text-sm md:text-base font-medium transition-all"
          >
            Авторизуватися
          </button>
          {error && <p className="text-red-500 text-sm md:text-base text-center">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginForm;