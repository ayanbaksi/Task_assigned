import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import styled from '../styles/login.module.scss';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const postData = {
        email: formData.email,
        password: formData.password,
      };

      const response = await axios.post('http://localhost:3000/api/login/checkuser', postData);

      if (response.data.is_logged_in) {
        console.log(response.data.token);
        Cookies.set('token', response.data.token);
        alert("successfully logged in");
        router.push('/dashboard');
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className={styled.container}>
      <h1 className={styled.title}>Login</h1>
      <form className={styled.form} onSubmit={handleLogin}>
        <label className={styled.label}>
          Email:
          <input
            className={styled.input}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label className={styled.label}>
          Password:
          <input
            className={styled.input}
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button className={styled.button} type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
