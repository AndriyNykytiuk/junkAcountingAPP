import React, { useState } from 'react';
import identity from '../img/DSNSlogo.svg'

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
      console.log('Успішний логін, sessionId:', data.sessionId);
      console.log('Response data:', data);
    } catch (err) {
      setError('Невірний логін або пароль');
    }
  };

  return (
      <div className='bg-gray-100 h-screen flex flex-col justify-center items-center '>
          <div className='flex flex-col w-1/3 justify-center mb-6  p-7 bg-[#203955] items-center rounded shadow-md'>
            <img src={identity} alt="Identity" className="h-32 w-32 object-contain mb-10" />
               <form action="https://rasp.ivkeen.keenetic.link/api/login" method="POST" onSubmit={handleLogin} className="  w-full flex flex-col justify-center mx-auto p-4 space-y-4 bg-[#203955] rounded shadow-md">
              <input type="text" name="username" placeholder="Логін" className="w-full border px-3 py-2 rounded bg-white" required />
              <input type="password" name="password" placeholder="Пароль" className="w-full border px-3 py-2 rounded bg-white" required />
              <button type="submit" className="bg-[#fcd700] text-center text-black px-4 py-2 rounded cursor-pointer hover:font-bold ">Авторизуватися</button>
              {error && <p className="text-red-500">{error}</p>}
            </form>
          </div>
         
      </div>
  );
};

export default LoginForm;
