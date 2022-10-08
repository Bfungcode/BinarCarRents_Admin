import '../styles/NavandSideBar.css';

const NavSideBar = ({ PageContent }) => {
  return (
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
          <PageContent />
        </div>
      </div>
    </div>
  );
};

export default NavSideBar;
