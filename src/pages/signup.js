import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import styled from '../styles/signup.module.scss';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
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

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const postData = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      };
      const response = await axios.post('http://localhost:3000/api/signup/regt', postData);
      const res = response.data;
      const result = res.result;
      console.log('Signup successful:', res);
      if (res.message == "success") {
        router.push('/login');
      } else {
        alert(res.error + "Sign up using different credentials");
      }
    } catch (error) {
      console.error('Error in signup:', error);
    }
  };

  return (
    <div className={styled.container}>
      <h1 className={styled.title}>Signup</h1>
      <form className={styled.form} onSubmit={handleSignup}>
        <label className={styled.label}>
          Username:
          <input
            className={styled.input}
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </label>
        <br />
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
          Signup
        </button>
      </form>
    </div>
  );
};

export default SignUp;
