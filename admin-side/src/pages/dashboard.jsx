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
  SVGSearch,
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
      
        <div className="square-logo"> BR</div>
        <div className='icon-dashboard'> 
          <SVGDashboard/> 
          <p>Dashboard</p>
        </div>
        <div className='icon-cars'> 
          <SVGTruck /> 
          <p>Cars</p>
        </div>
        
    </div>
    <div className="right-layout">
      <div className='h-navbar'>
        <div className="nav-logo">Binar-Car</div>
        <div> <SVGMenu /> </div>
        <div className='searchbar'>
          <div class="input-group searchbar">
            <div class="form-outline search-input">
              <span>
                <SVGSearch />
              </span>
              <input type="search" id="form1" placeholder="Search"
              />
              <label class="form-label"></label>
            </div>
            <div className='search-button'>
              Search
            </div>
          </div>
      </div>
        <div className='acct-group'>

          <div className='acct-icon'>U</div>
          <div className='acct-name'>Unis Badri</div>
        </div>
        <div className='dropdown'><SVGDropdownMenu /> </div>
      </div>

    <div className="sidebar-content">
      <div className="sidebar">
        <div id='menu'>DASHBOARD</div>
        <div id='menu'>Dashboard</div>
      </div>
        <Dashboard />
      </div>  
    </div>
    


  </div>
  )
};
export default DashboardPage
