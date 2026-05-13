import React from 'react';

const ReportsView = ({ appointments, resources, stats }) => {
  const styles = {
    container: { padding: '20px' },
    reportCard: { backgroundColor: 'white', padding: '20px', borderRadius: '15px', marginBottom: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' },
    sectionTitle: { fontSize: '18px', fontWeight: 'bold', marginBottom: '15px', color: '#1a1a2e', borderLeft: '4px solid #0f3460', paddingLeft: '12px' },
    statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '20px' },
    statItem: { padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '10px' },
    resourceStats: { marginTop: '20px' },
    resourceRow: { display: 'flex', justifyContent: 'space-between', padding: '10px', borderBottom: '1px solid #eee' }
  };

  // Resource-wise revenue
  const resourceRevenue = resources.map(resource => {
    const resourceApps = appointments.filter(a => a.resId === resource.id && a.paymentStatus === 'Paid');
    const total = resourceApps.reduce((sum, a) => sum + a.amount, 0);
    const count = resourceApps.length;
    return { ...resource, revenue: total, count };
  }).filter(r => r.revenue > 0);

  return (
    <div style={styles.container}>
      <div style={styles.reportCard}>
        <h2 style={styles.sectionTitle}>📊 Analytics & Reports</h2>
        
        <div style={styles.statsGrid}>
          <div style={styles.statItem}>
            <div style={{ fontSize: '12px', color: '#666' }}>Total Appointments</div>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#0ea5e9' }}>{appointments.length}</div>
          </div>
          <div style={styles.statItem}>
            <div style={{ fontSize: '12px', color: '#666' }}>Completion Rate</div>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#10b981' }}>
              {((stats.checkedOut / appointments.length) * 100).toFixed(1)}%
            </div>
          </div>
          <div style={styles.statItem}>
            <div style={{ fontSize: '12px', color: '#666' }}>Total Revenue</div>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#f59e0b' }}>₹{stats.totalRevenue}</div>
          </div>
          <div style={styles.statItem}>
            <div style={{ fontSize: '12px', color: '#666' }}>Average Ticket Size</div>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#6366f1' }}>
              ₹{(stats.totalRevenue / (stats.checkedOut || 1)).toFixed(0)}
            </div>
          </div>
        </div>
      </div>

      <div style={styles.reportCard}>
        <h3 style={styles.sectionTitle}>🏢 Resource-wise Revenue</h3>
        <div style={styles.resourceStats}>
          {resourceRevenue.map(r => (
            <div key={r.id} style={styles.resourceRow}>
              <div>
                <span style={{ display: 'inline-block', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: r.color, marginRight: '8px' }}></span>
                <strong>{r.name}</strong>
              </div>
              <div>{r.count} appointments</div>
              <div style={{ fontWeight: 'bold', color: '#10b981' }}>₹{r.revenue}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={styles.reportCard}>
        <h3 style={styles.sectionTitle}>📈 Status Distribution</h3>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, textAlign: 'center' }}>
            <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#10b981' }}>{stats.scheduled}</div>
            <div style={{ fontSize: '12px', color: '#666' }}>Scheduled</div>
          </div>
          <div style={{ flex: 1, textAlign: 'center' }}>
            <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#f59e0b' }}>{stats.waiting}</div>
            <div style={{ fontSize: '12px', color: '#666' }}>Waiting</div>
          </div>
          <div style={{ flex: 1, textAlign: 'center' }}>
            <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#ef4444' }}>{stats.engaged}</div>
            <div style={{ fontSize: '12px', color: '#666' }}>Engaged</div>
          </div>
          <div style={{ flex: 1, textAlign: 'center' }}>
            <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#6366f1' }}>{stats.checkedOut}</div>
            <div style={{ fontSize: '12px', color: '#666' }}>Completed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsView;