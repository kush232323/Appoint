import React, { useState } from 'react';

const AppointmentsListView = ({ appointments, resources, updateStatus, deleteAppointment, setSelectedAppointment, setShowPaymentModal }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredAppointments = appointments.filter(apt => {
    const matchesSearch = apt.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          apt.phone.includes(searchTerm) ||
                          apt.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || apt.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const styles = {
    container: { padding: '20px' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' },
    searchBox: { padding: '10px', border: '1px solid #ddd', borderRadius: '8px', width: '300px', fontSize: '14px' },
    filterSelect: { padding: '10px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px' },
    table: { width: '100%', backgroundColor: 'white', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' },
    th: { textAlign: 'left', padding: '15px', backgroundColor: '#f8f9fa', fontWeight: 'bold', borderBottom: '2px solid #dee2e6' },
    td: { padding: '12px 15px', borderBottom: '1px solid #dee2e6' },
    badge: { padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', display: 'inline-block' },
    button: { padding: '6px 12px', borderRadius: '6px', border: 'none', cursor: 'pointer', fontSize: '12px', marginRight: '5px' },
    buttonSuccess: { backgroundColor: '#10b981', color: 'white' },
    buttonWarning: { backgroundColor: '#f59e0b', color: 'white' },
    buttonDanger: { backgroundColor: '#ef4444', color: 'white' },
    buttonInfo: { backgroundColor: '#0ea5e9', color: 'white' }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Scheduled': return '#10b981';
      case 'Waiting': return '#f59e0b';
      case 'Engaged': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={{ color: '#1a1a2e' }}>📋 All Appointments</h2>
        <div>
          <input 
            type="text" 
            style={styles.searchBox} 
            placeholder="🔍 Search by patient, phone, email..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select style={styles.filterSelect} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="All">All Status</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Waiting">Waiting</option>
            <option value="Engaged">Engaged</option>
          </select>
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Patient</th>
              <th style={styles.th}>Contact</th>
              <th style={styles.th}>Service</th>
              <th style={styles.th}>Resource</th>
              <th style={styles.th}>Time</th>
              <th style={styles.th}>Amount</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Payment</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.map(apt => {
              const resource = resources.find(r => r.id === apt.resId);
              return (
                <tr key={apt.id}>
                  <td style={styles.td}>
                    <strong>{apt.patient}</strong>
                  </td>
                  <td style={styles.td}>
                    {apt.phone}<br />
                    <small>{apt.email}</small>
                  </td>
                  <td style={styles.td}>{apt.service || '-'}</td>
                  <td style={styles.td}>{resource?.name || '-'}</td>
                  <td style={styles.td}>{apt.start} - {apt.end}</td>
                  <td style={styles.td}>₹{apt.amount}</td>
                  <td style={styles.td}>
                    <span style={{ ...styles.badge, backgroundColor: getStatusColor(apt.status), color: 'white' }}>
                      {apt.status}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <span style={{ ...styles.badge, backgroundColor: apt.paymentStatus === 'Paid' ? '#d1fae5' : '#fed7aa', color: apt.paymentStatus === 'Paid' ? '#065f46' : '#92400e' }}>
                      {apt.paymentStatus}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <button style={{ ...styles.button, ...styles.buttonInfo }} onClick={() => updateStatus(apt.id, apt.status === 'Scheduled' ? 'Waiting' : apt.status === 'Waiting' ? 'Engaged' : 'Scheduled')}>
                      Update
                    </button>
                    {apt.paymentStatus === 'Pending' && (
                      <button style={{ ...styles.button, ...styles.buttonSuccess }} onClick={() => { setSelectedAppointment(apt); setShowPaymentModal(true); }}>
                        Pay
                      </button>
                    )}
                    <button style={{ ...styles.button, ...styles.buttonDanger }} onClick={() => deleteAppointment(apt.id)}>
                      Delete
                    </button>
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

export default AppointmentsListView;