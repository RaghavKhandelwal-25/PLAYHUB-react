function Overlay({sidebarOpen, setSidebarOpen}) {
  return (
    <section
      className={`overlay ${sidebarOpen ? "open" : ""}`}
      onClick={() => setSidebarOpen(false)}
    ></section>
  );
}

export default Overlay;