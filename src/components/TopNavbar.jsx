import React from 'react';

const TopNavbar = ({ loggedInUser, setIsLoggedIn }) => {
  const styles = {
    topNavbar: { backgroundColor: 'white', borderBottom: '1px solid #e5e7eb' },
    navbarInner: { display: 'flex', alignItems: 'center', height: '56px', padding: '0 16px', gap: '16px' },
    logoIcon: { width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#0ea5e9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' },
    navButtons: { display: 'flex', alignItems: 'center', gap: '20px' },
    navButton: { padding: '10px 0', borderBottom: '2px solid transparent', background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', color: '#6b7280' },
    activeNavButton: { borderBottomColor: '#0ea5e9', color: '#0ea5e9', fontWeight: '600' },
    userInfo: { marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '12px' },
    userName: { fontSize: '13px', color: '#6b7280' },
    userAvatar: { width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#e5e7eb' },
    logoutBtn: { backgroundColor: '#ef4444', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }
  };

  const navItems = ['CRM', 'Calendar', 'Client', 'Financials', 'Inventory', 'Documents', 'Report', 'Tools'];

  return (
    <div style={styles.topNavbar}>
      <div style={styles.navbarInner}>
        <div style={styles.logoIcon}>C</div>
        <div style={styles.navButtons}>
          {navItems.map(item => (
            <button key={item} style={{ ...styles.navButton, ...(item === 'Calendar' ? styles.activeNavButton : {}) }}>
              {item}
            </button>
          ))}
        </div>
        <div style={styles.userInfo}>
          <span style={styles.userName}>{loggedInUser?.name}</span>
          <div style={styles.userAvatar} />
          <button style={styles.logoutBtn} onClick={() => setIsLoggedIn(false)}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;