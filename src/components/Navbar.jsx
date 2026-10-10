function Navbar({setSidebarOpen, setProfileOpen}) {
  return (
    <div className="navbar">

      <div 
      id="menu-btn"
      onClick={() => setSidebarOpen(true)}
      >
        <i className="fa-solid fa-bars"></i>
      </div>

      <div id="casino-title">
        CASINO
      </div>

      <div id="balance">
        <i className="fa-solid fa-money-bill-1"></i>
        <p id="mainBalance">200</p>
      </div>

      <div
        id="profile"
        onClick={() => setProfileOpen(prev => !prev)}
      >
        <i className="fa-solid fa-user"></i>
      </div>

    </div>
  );
}

export default Navbar;