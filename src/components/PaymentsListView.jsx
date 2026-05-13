import React, { useState } from 'react';

const PaymentsListView = ({ appointments, resources, setSelectedAppointment, setShowPaymentModal }) => {
  const [paymentFilter, setPaymentFilter] = useState('All');

  const filteredAppointments = appointments.filter(apt => {
    return paymentFilter === 'All' || apt.paymentStatus === paymentFilter;
  });

  const paidTotal = appointments.filter(a => a.paymentStatus === 'Paid').reduce((sum, a) => sum + a.amount, 0);
  const pendingTotal = appointments.filter(a => a.paymentStatus === 'Pending').reduce((sum, a) => sum + a.amount, 0);

  const styles = {
    container: { padding: '20px' },
    statsRow: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' },
    statCard: { backgroundColor: 'white', padding: '20px', borderRadius: '15px', textAlign: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' },
    statAmount: { fontSize: '32px', fontWeight: 'bold' },
    filterBar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
    filterSelect: { padding: '10px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px' },
    table: { width: '100%', backgroundColor: 'white', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' },
    th: { textAlign: 'left', padding: '15px', backgroundColor: '#f8f9fa', fontWeight: 'bold', borderBottom: '2px solid #dee2e6' },
    td: { padding: '12px 15px', borderBottom: '1px solid #dee2e6' },
    badge: { padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', display: 'inline-block' },
    button: { padding: '6px 12px', borderRadius: '6px', border: 'none', cursor: 'pointer', fontSize: '12px', backgroundColor: '#10b981', color: 'white' }
  };

  return (
    <div style={styles.container}>
      <div style={styles.statsRow}>
        <div style={styles.statCard}>
          <div style={{ color: '#666', marginBottom: '8px' }}>Total Revenue</div>
          <div style={{ ...styles.statAmount, color: '#10b981' }}>₹{paidTotal}</div>
        </div>
        <div style={styles.statCard}>
          <div style={{ color: '#666', marginBottom: '8px' }}>Pending Amount</div>
          <div style={{ ...styles.statAmount, color: '#f59e0b' }}>₹{pendingTotal}</div>
        </div>
      </div>

      <div style={styles.filterBar}>
        <h2 style={{ color: '#1a1a2e' }}>💰 Payment Transactions</h2>
        <select style={styles.filterSelect} value={paymentFilter} onChange={(e) => setPaymentFilter(e.target.value)}>
          <option value="All">All Transactions</option>
          <option value="Paid">Paid Only</option>
          <option value="Pending">Pending Only</option>
        </select>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Invoice ID</th>
              <th style={styles.th}>Patient</th>
              <th style={styles.th}>Service</th>
              <th style={styles.th}>Resource</th>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>Amount</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.map(apt => {
              const resource = resources.find(r => r.id === apt.resId);
              return (
                <tr key={apt.id}>
                  <td style={styles.td}>#{apt.id}INV</td>
                  <td style={styles.td}>
                    <strong>{apt.patient}</strong><br />
                    <small>{apt.phone}</small>
                  </td>
                  <td style={styles.td}>{apt.service || '-'}</td>
                  <td style={styles.td}>{resource?.name || '-'}</td>
                  <td style={styles.td}>{apt.start}</td>
                  <td style={styles.td}>₹{apt.amount}</td>
                  <td style={styles.td}>
                    <span style={{ ...styles.badge, backgroundColor: apt.paymentStatus === 'Paid' ? '#d1fae5' : '#fed7aa', color: apt.paymentStatus === 'Paid' ? '#065f46' : '#92400e' }}>
                      {apt.paymentStatus}
                    </span>
                  </td>
                  <td style={styles.td}>
                    {apt.paymentStatus === 'Pending' && (
                      <button style={styles.button} onClick={() => { setSelectedAppointment(apt); setShowPaymentModal(true); }}>
                        Collect Payment
                      </button>
                    )}
                    {apt.paymentStatus === 'Paid' && (
                      <span style={{ color: '#10b981' }}>✓ Completed</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentsListView;