import React from 'react';

const LeftPanel = ({ filters, setFilters, stats, setShowAddModal, resources }) => {
  const styles = {
    leftPanel: { width: '280px', backgroundColor: 'white', borderRight: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column', overflowY: 'auto' },
    leftPanelHeader: { padding: '16px', borderBottom: '1px solid #e5e7eb' },
    filterSection: { padding: '16px', borderBottom: '1px solid #e5e7eb' },
    filterSelect: { width: '100%', padding: '8px', marginBottom: '8px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '12px' },
    revenueCard: { padding: '16px', backgroundColor: '#f0fdf4', margin: '12px', borderRadius: '8px' },
    revenueAmount: { fontSize: '24px', fontWeight: 'bold', color: '#10b981' },
    noAppointments: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '24px' },
    addButton: { backgroundColor: '#10b981', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer', marginTop: '8px' },
    filterTitle: { fontSize: '13px', fontWeight: '600', marginBottom: '8px', color: '#374151' }
  };

  return (
    <div style={styles.leftPanel}>
      <div style={styles.leftPanelHeader}>
        <div style={{ fontSize: '14px', fontWeight: '600', color: '#374151' }}>📊 Today's Overview</div>
      </div>
      
      <div style={styles.filterSection}>
        <h4 style={styles.filterTitle}>Filters</h4>
        <select style={styles.filterSelect} value={filters.resource} onChange={(e) => setFilters({...filters, resource: e.target.value})}>
          <option value="">All Resources</option>
          {resources.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
        </select>
        <select style={styles.filterSelect} value={filters.status} onChange={(e) => setFilters({...filters, status: e.target.value})}>
          <option value="">All Status</option>
          <option value="Scheduled">Scheduled</option>
          <option value="Waiting">Waiting</option>
          <option value="Engaged">Engaged</option>
        </select>
        <select style={styles.filterSelect} value={filters.paymentStatus} onChange={(e) => setFilters({...filters, paymentStatus: e.target.value})}>
          <option value="">All Payment</option>
          <option value="Paid">Paid</option>
          <option value="Pending">Pending</option>
        </select>
      </div>
      
      <div style={styles.revenueCard}>
        <div style={{ fontSize: '12px', color: '#666' }}>Today's Revenue</div>
        <div style={styles.revenueAmount}>₹{stats.totalRevenue}</div>
        <div style={{ fontSize: '11px', color: '#666', marginTop: '4px' }}>Pending: ₹{stats.pendingAmount}</div>
      </div>
      
      <div style={styles.noAppointments}>
        <p style={{ color: '#374151', fontWeight: '500', marginBottom: '8px' }}>Quick Actions</p>
        <button style={styles.addButton} onClick={() => setShowAddModal(true)}>➕ Add Appointment</button>
      </div>
    </div>
  );
};

export default LeftPanel;