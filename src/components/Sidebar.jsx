import React from 'react';

const Sidebar = ({ sidebarOpen, setSidebarOpen, activeMenu, setActiveMenu, loggedInUser, setIsLoggedIn, logo }) => {
  const styles = {
    sidebar: {
      width: sidebarOpen ? '260px' : '70px',
      backgroundColor: '#1a1a2e',
      color: 'white',
      transition: 'all 0.3s ease',
      display: 'flex',
      flexDirection: 'column',
      position: 'fixed',
      height: '100vh',
      overflowY: 'auto',
      zIndex: 1000
    },
    sidebarHeader: {
      padding: '20px',
      borderBottom: '1px solid #2d2d4e',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    logoContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      whiteSpace: 'nowrap',
      overflow: 'hidden'
    },
    logoImage: {
      width: sidebarOpen ? '32px' : '0',
      height: sidebarOpen ? '32px' : '0',
      borderRadius: '8px',
      objectFit: 'cover',
      transition: 'all 0.3s ease'
    },
    logoText: {
      fontSize: sidebarOpen ? '18px' : '0',
      fontWeight: 'bold',
      transition: 'all 0.3s ease'
    },
    toggleBtn: {
      background: 'none',
      border: 'none',
      color: 'white',
      cursor: 'pointer',
      fontSize: '20px'
    },
    menuItem: {
      padding: '12px 20px',
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      margin: '5px 10px',
      borderRadius: '10px'
    },
    menuIcon: { fontSize: '20px', minWidth: '30px' },
    menuText: { display: sidebarOpen ? 'block' : 'none', fontSize: '14px' },
    logoutBtn: {
      backgroundColor: '#ef4444',
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '12px',
      margin: '20px'
    }
  };

  const menus = [
    { name: 'Dashboard', key: 'dashboard', icon: '📊' },
    { name: 'Calendar', key: 'calendar', icon: '📅' },
    { name: 'Appointments', key: 'appointments', icon: '📋' },
    { name: 'Payments', key: 'payments', icon: '💰' },
    { name: 'Reports', key: 'reports', icon: '📈' },
    { name: 'Settings', key: 'settings', icon: '⚙️' }
  ];

  return (
    <div style={styles.sidebar}>
      <div style={styles.sidebarHeader}>
        <div style={styles.logoContainer}>
          <img src={logo} alt="Logo" style={styles.logoImage} />
          <span style={styles.logoText}>{sidebarOpen && 'AppointPro'}</span>
        </div>
        <button style={styles.toggleBtn} onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? '◀' : '▶'}
        </button>
      </div>
      <div style={{ flex: 1, marginTop: '20px' }}>
        {menus.map(menu => (
          <div
            key={menu.key}
            style={{ ...styles.menuItem, backgroundColor: activeMenu === menu.key ? '#0f3460' : 'transparent' }}
            onClick={() => setActiveMenu(menu.key)}
          >
            <span style={styles.menuIcon}>{menu.icon}</span>
            <span style={styles.menuText}>{menu.name}</span>
          </div>
        ))}
      </div>
      <div style={{ padding: '20px', borderTop: '1px solid #2d2d4e', fontSize: '12px', textAlign: 'center' }}>
        {sidebarOpen && `👤 ${loggedInUser?.name}`}
        <button style={styles.logoutBtn} onClick={() => setIsLoggedIn(false)}>Logout</button>
      </div>
    </div>
  );
};

export default Sidebar;