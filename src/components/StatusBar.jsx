import React from 'react';

const StatusBar = ({ stats, currentDate, setCurrentDate, view, setView }) => {
  const navigateDate = (direction) => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setDate(currentDate.getDate() - 1);
    } else {
      newDate.setDate(currentDate.getDate() + 1);
    }
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
  };

  const styles = {
    statusBar: { backgroundColor: 'white', borderBottom: '1px solid #e5e7eb', padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' },
    statBox: { display: 'flex', alignItems: 'center', gap: '8px' },
    statNumber: { width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid', fontSize: '14px', fontWeight: '600' },
    statLabel: { fontSize: '13px', color: '#6b7280' },
    dateControls: { marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' },
    dateButton: { padding: '4px 12px', fontSize: '12px', border: '1px solid #e5e7eb', borderRadius: '6px', background: 'white', cursor: 'pointer' },
    dateDisplay: { display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 12px', border: '1px solid #e5e7eb', borderRadius: '6px', background: 'white' },
    viewToggle: { display: 'flex', border: '1px solid #e5e7eb', borderRadius: '6px', overflow: 'hidden' },
    viewButton: { padding: '4px 12px', fontSize: '12px', background: 'white', border: 'none', cursor: 'pointer' },
    activeViewButton: { background: '#0ea5e9', color: 'white' }
  };

  const statItems = [
    { label: "Scheduled", count: stats.scheduled, color: "#0ea5e9" },
    { label: "Waiting", count: stats.waiting, color: "#f59e0b" },
    { label: "Engaged", count: stats.engaged, color: "#ef4444" },
    { label: "Check Out", count: stats.checkedOut, color: "#0ea5e9" },
    { label: "Revenue", count: `₹${stats.totalRevenue}`, color: "#10b981" },
    { label: "Pending", count: `₹${stats.pendingAmount}`, color: "#f59e0b" }
  ];

  return (
    <div style={styles.statusBar}>
      {statItems.map((s) => (
        <div key={s.label} style={styles.statBox}>
          <div style={{ ...styles.statNumber, borderColor: s.color, color: s.color }}>{s.count}</div>
          <span style={styles.statLabel}>{s.label}</span>
        </div>
      ))}
      <div style={styles.dateControls}>
        <button style={styles.dateButton} onClick={goToToday}>Today</button>
        <button style={styles.dateButton} onClick={() => navigateDate('prev')}>{'<'}</button>
        <div style={styles.dateDisplay}>
          <span>{formatDate(currentDate)}</span>
        </div>
        <button style={styles.dateButton} onClick={() => navigateDate('next')}>{'>'}</button>
        <div style={styles.viewToggle}>
          {['Day', 'Week'].map(v => (
            <button key={v} onClick={() => setView(v)} style={{ ...styles.viewButton, ...(view === v ? styles.activeViewButton : {}) }}>
              {v}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatusBar;