import '../styles/NavandSideBar.css';
import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { SVGDashboard, SVGDropdownMenu, SVGMenu, SVGSearch, SVGTruck } from '../vectors/navandsidebar-icon';

const NavSideBar = ({ PageContent }) => {
  const [isDashboard, setIsDashboard] = useState(true);
  const [isSidebarOpen, setIsSideBarOpen] = useState(true);
  const location = useLocation();
  const [isDBActive, setIsDBActive] = useState('nav-link');
  const [isCarsActive, setIsCarsActive] = useState('');


  function onCars() {
    return (setIsDashboard(!isDashboard),
      setIsDBActive(''),
      setIsCarsActive('nav-link'))
  }
  const cekdb = () => {
    if (location.pathname === "/cars") {
      return (onCars())
    }
  }
  const toggle = () => {
    setIsSideBarOpen(!isSidebarOpen)
  }

  useEffect(() => {
    cekdb()
  }, [])



  return (

    <div className="Dashboard">

      <div className="main-sidebar">
        <div className="square-logo">BR</div>
        <NavLink to='/dashboard' className={isDBActive}>
          <div className="" id='sidebar-icon'>
            <SVGDashboard />
            <p>Dashboard</p>
          </div>
        </NavLink>
        <NavLink to='/cars' className={isCarsActive}>
          <div className='' id='sidebar-icon'>
            <SVGTruck />
            <p>Cars</p>
          </div>
        </NavLink>
      </div>

      {console.log('status sidebar: ', isSidebarOpen)}


      {isSidebarOpen === true ? <div className='hidden-bar' >
        <div className="hidden-logo">Binar-Car</div>
        <div className="sidebar">
          {isDashboard ? (
            <div>
              <div id='menu'>DASHBOARD</div>
              <div className='activemenu'>Dashboard</div>
            </div>
          ) :
            <div>
              <div id='menu'>CARS</div>
              <div className='activemenu'>List Car</div>
            </div>
          }
        </div>

      </div> : null}

      <div className='right-layout'>
        <div>
          <div className="h-navbar">
            <div className='minimize'>
              <button className='toggle' onClick={toggle}><SVGMenu className="svgmenu" />
              </button>

            </div>
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
  )
}

export default NavSideBar;
