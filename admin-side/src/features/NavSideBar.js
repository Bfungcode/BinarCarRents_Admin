import '../styles/NavandSideBar.css';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { SVGDashboard, SVGDropdownMenu, SVGMenu, SVGSearch, SVGTruck } from '../vectors/navandsidebar-icon';

const NavSideBar = ({ PageContent }) => {
  const [isDashboard, setIsDashboard] = useState(true)
  function onCars() {
    setIsDashboard(false)
  }
  return (
    <div className="Dashboard">
      <div className="main-sidebar">
        <div className="logo"> logo</div>
        <div className="icon-dashboard">
          {/* <SVGDashboard/>  */}
          <p>Dashboard</p>
        </div>
        <div>
          {/* <SVGTruck />  */}
          <p>Cars</p>
        </div>
      </div>
      <div className='right-layout'>
        <div>
          <div className="h-navbar">
            <div className="nav-logo">Binar-Car</div>
            <div><SVGMenu /></div>

            <div className='searchbar'>
              <div className="input-group searchgroup">
                <div className="form-outline search-input">
                  <span>
                    <SVGSearch />
                  </span>
                  <input type="search" id="form1" placeholder="Search"
                  />
                  <label className="form-label"></label>
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
              {isDashboard === true ? (
                <div>
                  <div id='menu'>DASHBOARD</div>
                  <div id='menu'>Dashboard</div>
                </div>
              ) :
                <div>
                  <div id='menu'>CARS</div>
                  <div id='menu'>List Car</div>
                </div>
              }
            </div>
            <div><PageContent /></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavSideBar;
