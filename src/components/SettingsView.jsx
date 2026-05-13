import React, { useState } from 'react';

const SettingsView = ({ loggedInUser }) => {
  const [notifications, setNotifications] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);

  const styles = {
    container: { padding: '20px' },
    settingsCard: { backgroundColor: 'white', padding: '24px', borderRadius: '15px', marginBottom: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' },
    sectionTitle: { fontSize: '18px', fontWeight: 'bold', marginBottom: '15px', color: '#1a1a2e', borderLeft: '4px solid #0f3460', paddingLeft: '12px' },
    settingRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 0', borderBottom: '1px solid #eee' },
    label: { fontWeight: '500', color: '#374151' },
    description: { fontSize: '12px', color: '#666', marginTop: '4px' },
    switch: { width: '44px', height: '24px', backgroundColor: '#ddd', borderRadius: '12px', cursor: 'pointer', position: 'relative', transition: 'all 0.3s' },
    switchActive: { backgroundColor: '#10b981' },
    switchKnob: { width: '20px', height: '20px', backgroundColor: 'white', borderRadius: '50%', position: 'absolute', top: '2px', left: '2px', transition: 'all 0.3s' },
    switchKnobActive: { left: '22px' },
    saveButton: { backgroundColor: '#0ea5e9', color: 'white', border: 'none', padding: '10px 24px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', marginTop: '20px' },
    infoBox: { backgroundColor: '#f0fdf4', padding: '16px', borderRadius: '10px', marginTop: '20px' }
  };

  return (
    <div style={styles.container}>
      <div style={styles.settingsCard}>
        <h2 style={styles.sectionTitle}>⚙️ Settings</h2>
        
        <div style={styles.settingRow}>
          <div>
            <div style={styles.label}>Push Notifications</div>
            <div style={styles.description}>Receive notifications about new appointments</div>
          </div>
          <div style={{ ...styles.switch, ...(notifications ? styles.switchActive : {}) }} onClick={() => setNotifications(!notifications)}>
            <div style={{ ...styles.switchKnob, ...(notifications ? styles.switchKnobActive : {}) }}></div>
          </div>
        </div>

        <div style={styles.settingRow}>
          <div>
            <div style={styles.label}>Email Alerts</div>
            <div style={styles.description}>Send email alerts for appointment reminders</div>
          </div>
          <div style={{ ...styles.switch, ...(emailAlerts ? styles.switchActive : {}) }} onClick={() => setEmailAlerts(!emailAlerts)}>
            <div style={{ ...styles.switchKnob, ...(emailAlerts ? styles.switchKnobActive : {}) }}></div>
          </div>
        </div>

        <button style={styles.saveButton}>Save Settings</button>
      </div>

      <div style={styles.settingsCard}>
        <h3 style={styles.sectionTitle}>👤 Profile Information</h3>
        <div style={styles.settingRow}>
          <div>
            <div style={styles.label}>Name</div>
            <div style={styles.description}>{loggedInUser?.name}</div>
          </div>
        </div>
        <div style={styles.settingRow}>
          <div>
            <div style={styles.label}>Email</div>
            <div style={styles.description}>{loggedInUser?.email}</div>
          </div>
        </div>
        <div style={styles.settingRow}>
          <div>
            <div style={styles.label}>Role</div>
            <div style={styles.description}>{loggedInUser?.role}</div>
          </div>
        </div>
      </div>

      <div style={styles.settingsCard}>
        <h3 style={styles.sectionTitle}>ℹ️ About</h3>
        <div style={styles.infoBox}>
          <strong>AppointPro v2.0</strong><br />
          Appointment Management System<br />
          © 2026 All Rights Reserved
        </div>
      </div>
    </div>
  );
};

export default SettingsView;