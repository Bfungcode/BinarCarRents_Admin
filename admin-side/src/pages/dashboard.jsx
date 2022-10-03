import React, { useNavigate } from 'react';
import { useSelector } from 'react-redux';
import Dashboard from '../features/dashboard';

const DashboardPage = () => {
  const navigate = useNavigate();
  const {isLoggedIn} = useSelector((state) => state.auth)
  
//  logic validasi login 
  React.useEffect(()=>{ 
    if(isLoggedIn === false){
      alert('belum login'); 
      navigate('/');  
    };
    
  }, [isLoggedIn])
  
  
  return(
    <>
        <Dashboard /> 
    </>
  )
};
export default DashboardPage
