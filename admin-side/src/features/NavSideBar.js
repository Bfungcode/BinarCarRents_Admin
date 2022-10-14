import '../styles/NavandSideBar.css';

const NavSideBar = ({ PageContent }) => {
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
      <div className="right-layout">
        <div className="h-navbar">
          <div className="logo">Binar-Car</div>
          {/* <div> <SVGMenu /> </div> */}
          <div className="searchbar">
            <div className="input-group">
              <div className="form-outline">
                <input type="search" id="form1" className="form-control" placeholder="Search" />
                <label className="form-label"></label>
              </div>
              <div className="search-button">Search</div>
            </div>
          </div>
          <div>
            <div className="acct-icon">U</div>
            <p>Unis Badri</p>
          </div>
          {/* <div><SVGDropdownMenu /> </div> */}
        </div>

        <div className="sidebar-content">
          <div className="sidebar">
            <ul>
              <li>CARS</li>
              <li>List Car</li>
            </ul>
          </div>
          <PageContent />
        </div>
      </div>
    </div>
  );
};

export default NavSideBar;
