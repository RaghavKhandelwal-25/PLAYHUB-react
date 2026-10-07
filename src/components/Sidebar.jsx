function Sidebar() {
  return (
    <div className="sidebar">

      <div className="sidebar-logo">

        <div id="sidebar-menu-btn">
          <i className="fa-solid fa-bars icon"></i>
        </div>

        <div id="sidebar-casino">
          CASINO
        </div>

      </div>

      <div className="sidebar-content">

        <ul className="lists">

          <li className="list">
            <a href="#" className="nav-link">
              <i className="fa-solid fa-house icon"></i>
              <span className="link">
                Dashboard
              </span>
            </a>
          </li>

          <li className="list">
            <a href="#" className="nav-link">
              <i className="fa-solid fa-circle-info icon"></i>
              <span className="link">
                Instructions
              </span>
            </a>
          </li>

          <li className="list">
            <a href="#" className="nav-link">
              <i className="fa-solid fa-gamepad icon"></i>
              <span className="link">
                Extra Game
              </span>
            </a>
          </li>

          <li className="list">
            <a href="#" className="nav-link">
              <i className="fa-solid fa-trophy icon"></i>
              <span className="link">
                ?
              </span>
            </a>
          </li>

        </ul>

      </div>

    </div>
  );
}

export default Sidebar;