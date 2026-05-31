import React from 'react';

const Dashboard = ({ stats, appointments, patients }) => {
  const todayAppointments = appointments?.filter(a => {
    const today = new Date().toISOString().split('T')[0];
    return a.appointment_date === today;
  }) || [];

  const styles = {
    container: { padding: '20px' },
    welcomeCard: { backgroundColor: 'white', padding: '24px', borderRadius: '15px', marginBottom: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' },
    welcomeTitle: { fontSize: '24px', fontWeight: 'bold', color: '#1a1a2e', marginBottom: '8px' },
    statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '20px' },
    statCard: { backgroundColor: 'white', padding: '20px', borderRadius: '15px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', textAlign: 'center' },
    statNumber: { fontSize: '32px', fontWeight: 'bold', color: '#0f3460' },
    statLabel: { fontSize: '14px', color: '#666', marginTop: '5px' },
    sectionTitle: { fontSize: '18px', fontWeight: 'bold', marginBottom: '15px', color: '#1a1a2e', borderLeft: '4px solid #0f3460', paddingLeft: '12px' },
    todayCard: { backgroundColor: 'white', padding: '20px', borderRadius: '15px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' },
    todayItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', borderBottom: '1px solid #eee' },
    emptyText: { textAlign: 'center', color: '#666', padding: '20px' }
  };

  const statItems = [
    { label: "Total Patients", count: patients?.length || 0, color: "#0ea5e9" },
    { label: "Today's Appointments", count: todayAppointments.length, color: "#10b981" },
    { label: "Total Appointments", count: appointments?.length || 0, color: "#6366f1" },
    { label: "Total Revenue", count: `₹${stats?.total_revenue || 0}`, color: "#f59e0b" }
  ];

  return (
    <div style={styles.container}>
      <div style={styles.welcomeCard}>
        <h1 style={styles.welcomeTitle}>Welcome Back, Admin! 👋</h1>
        <p style={{ color: '#666' }}>Here's what's happening with your clinic today.</p>
      </div>

      <div style={styles.statsGrid}>
        {statItems.map((s) => (
          <div key={s.label} style={styles.statCard}>
            <div style={styles.statNumber}>{s.count}</div>
            <div style={styles.statLabel}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={styles.todayCard}>
        <h3 style={styles.sectionTitle}>📋 Today's Appointments</h3>
        {todayAppointments.length > 0 ? (
          todayAppointments.map(apt => (
            <div key={apt.id} style={styles.todayItem}>
              <div><strong>{apt.patient_name || 'Patient'}</strong></div>
              <div>{apt.start_time} - {apt.end_time}</div>
              <div style={{ color: apt.payment_status === 'Paid' ? '#10b981' : '#f59e0b' }}>{apt.payment_status || 'Pending'}</div>
            </div>
          ))
        ) : (
          <p style={styles.emptyText}>No appointments scheduled for today</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;