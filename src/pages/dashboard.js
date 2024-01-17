import Table from '@/components/Table/Table';
import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

function Dashboard() {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove('token');
    router.push('/');
  };

  useEffect(() => {
    const token = Cookies.get('token');

    if (!token) {
      router.push('/login');
    }
  }, []);

  return (
    <div>
      <button type="button" style={{ position: "absolute", right: "2rem" }} onClick={handleLogout}>
        LogOut
      </button>
      <Table />
    </div>
  );
}

export default Dashboard;
