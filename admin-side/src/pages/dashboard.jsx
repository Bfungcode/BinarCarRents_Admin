import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Dashboard from '../features/dashboard';
import "../styles/NavandSideBar.css";
import {
  SVGDashboard,
  SVGTruck,
  SVGMenu,
  SVGDropdownMenu,
} from "../vectors/navandsidebar-icon";

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
        <div className='icon-dashboard'> 
          <SVGDashboard/> 
          <p>Dashboard</p>
        </div>
        <div> 
          <SVGTruck /> 
          <p>Cars</p>
        </div>
        
    </div>
    <div className="right-layout">
      <div className='h-navbar'>
        <div className="logo">Binar-Car</div>
        <div> <SVGMenu /> </div>
        <div className='searchbar'>
          <div class="input-group">
            <div class="form-outline">
              <input type="search" id="form1" class="form-control" placeholder='Search'/>
              <label class="form-label"></label>
            </div>
            <div className='search-button'>
              Search
            </div>
          </div>
      </div>
        <div>

          <div className='acct-icon'>U</div>
          <p>Unis Badri</p>
        </div>
        <div><SVGDropdownMenu /> </div>
      </div>

    <div className="sidebar-content">
      <div className="sidebar">
        <ul>
          <li>CARS</li>
          <li>List Car</li>
        </ul>
      </div>
        <Dashboard />
      </div>  
    </div>
    


  </div>
  )
};
export default DashboardPage
