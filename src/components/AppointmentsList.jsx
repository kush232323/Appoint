import React, { useState } from 'react';

const AppointmentsList = ({ appointments, patients, doctors, services, onUpdateStatus, onDelete, onPayment }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredAppointments = appointments.filter(apt => {
    const patient = patients.find(p => p.id === apt.patient_id);
    const matchesSearch = patient?.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          patient?.phone?.includes(searchTerm);
    const matchesStatus = statusFilter === 'All' || apt.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'Scheduled': return { bg: '#d1fae5', color: '#065f46' };
      case 'Waiting': return { bg: '#fed7aa', color: '#92400e' };
      case 'Engaged': return { bg: '#fee2e2', color: '#991b1b' };
      case 'Completed': return { bg: '#d1fae5', color: '#065f46' };
      case 'Cancelled': return { bg: '#fee2e2', color: '#991b1b' };
      default: return { bg: '#f3f4f6', color: '#6b7280' };
    }
  };

  const styles = {
    container: { backgroundColor: 'white', borderRadius: '15px', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' },
    title: { fontSize: '24px', fontWeight: 'bold', color: '#1a1a2e' },
    searchBox: { padding: '10px', border: '1px solid #e5e7eb', borderRadius: '8px', width: '250px', fontSize: '14px' },
    filterSelect: { padding: '10px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '14px', backgroundColor: 'white' },
    table: { width: '100%', borderCollapse: 'collapse', overflowX: 'auto', display: 'block' },
    th: { textAlign: 'left', padding: '12px', backgroundColor: '#f8f9fa', fontWeight: '600', borderBottom: '2px solid #e5e7eb' },
    td: { padding: '12px', borderBottom: '1px solid #f0f0f0' },
    statusBadge: (status) => ({ padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '500', display: 'inline-block', backgroundColor: getStatusColor(status).bg, color: getStatusColor(status).color }),
    button: { padding: '6px 12px', borderRadius: '6px', border: 'none', cursor: 'pointer', fontSize: '12px', marginRight: '5px' },
    btnStatus: { backgroundColor: '#0ea5e9', color: 'white' },
    btnPayment: { backgroundColor: '#10b981', color: 'white' },
    btnDelete: { backgroundColor: '#ef4444', color: 'white' }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>📋 Appointments List</h2>
        <div>
          <input type="text" style={styles.searchBox} placeholder="🔍 Search by patient..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          <select style={styles.filterSelect} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="All">All Status</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Waiting">Waiting</option>
            <option value="Engaged">Engaged</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Appt #</th>
              <th style={styles.th}>Patient</th>
              <th style={styles.th}>Doctor</th>
              <th style={styles.th}>Service</th>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>Time</th>
              <th style={styles.th}>Amount</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Payment</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.map(apt => {
              const patient = patients.find(p => p.id === apt.patient_id);
              const doctor = doctors.find(d => d.id === apt.doctor_id);
              const service = services.find(s => s.id === apt.service_id);
              return (
                <tr key={apt.id}>
                  <td style={styles.td}>{apt.appointment_number}</td>
                  <td style={styles.td}><strong>{patient?.full_name}</strong><br /><small>{patient?.phone}</small></td>
                  <td style={styles.td}>{doctor?.doctor_name || '-'}</td>
                  <td style={styles.td}>{service?.service_name || '-'}</td>
                  <td style={styles.td}>{apt.appointment_date}</td>
                  <td style={styles.td}>{apt.start_time} - {apt.end_time}</td>
                  <td style={styles.td}>₹{apt.net_amount}</td>
                  <td style={styles.td}><span style={styles.statusBadge(apt.status)}>{apt.status}</span></td>
                  <td style={styles.td}>
                    <span style={{ padding: '4px 8px', borderRadius: '20px', fontSize: '11px', backgroundColor: apt.payment_status === 'Paid' ? '#d1fae5' : '#fed7aa', color: apt.payment_status === 'Paid' ? '#065f46' : '#92400e' }}>
                      {apt.payment_status}
                    </span>
                   </td>
                  <td style={styles.td}>
                    <button style={{ ...styles.button, ...styles.btnStatus }} onClick={() => {
                      const newStatus = apt.status === 'Scheduled' ? 'Waiting' : apt.status === 'Waiting' ? 'Engaged' : 'Scheduled';
                      onUpdateStatus(apt.id, newStatus);
                    }}>Status</button>
                    {apt.payment_status === 'Pending' && (
                      <button style={{ ...styles.button, ...styles.btnPayment }} onClick={() => onPayment(apt)}>Pay</button>
                    )}
                    <button style={{ ...styles.button, ...styles.btnDelete }} onClick={() => onDelete(apt.id)}>Del</button>
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

export default AppointmentsList;