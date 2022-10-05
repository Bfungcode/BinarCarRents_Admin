import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Dashboard from '../features/dashboard';
import "../styles/NavandSideBar.css";

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
    <div className="Dashboard">

      <div className="main-sidebar">
        
          <div className="logo"> logo</div>
          <div> icon1</div>
          <p>subtitle</p>
          <div> icon2</div>
          <p>subtitle</p>
      </div>
      <div className="h-navbar">
        <div className="logo">Binar-Car</div>

      <div className="sidebar-content">
        <div className="sidebar">
          <ul>
            <li>title1</li>
            <li>title2</li>
          </ul>
        </div>
          <Dashboard />
        </div>  
      </div>
      


    </div>
  )
};
export default DashboardPage
