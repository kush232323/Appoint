import React, { useState } from 'react';

const AppointmentTypesMaster = ({ types, onAdd, onUpdate, onDelete }) => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ type_code: '', type_name: '', default_duration: 30, color: '#0ea5e9', requires_doctor: false, requires_room: true });

  const styles = {
    container: { backgroundColor: 'white', borderRadius: '15px', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
    title: { fontSize: '24px', fontWeight: 'bold', color: '#1a1a2e' },
    addButton: { backgroundColor: '#0ea5e9', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer' },
    table: { width: '100%', borderCollapse: 'collapse' },
    th: { textAlign: 'left', padding: '12px', backgroundColor: '#f8f9fa', fontWeight: '600' },
    td: { padding: '12px', borderBottom: '1px solid #f0f0f0' }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>📝 Appointment Types Master</h2>
        <button style={styles.addButton} onClick={() => setShowModal(true)}>+ Add Type</button>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table style={styles.table}>
          <thead><tr><th style={styles.th}>Code</th><th style={styles.th}>Type Name</th><th style={styles.th}>Duration</th><th style={styles.th}>Color</th><th style={styles.th}>Requires Doctor</th><th style={styles.th}>Requires Room</th></tr></thead>
          <tbody>
            {types.map(type => (
              <tr key={type.id}>
                <td style={styles.td}>{type.type_code}</td>
                <td style={styles.td}>{type.type_name}</td>
                <td style={styles.td}>{type.default_duration} min</td>
                <td style={styles.td}><span style={{ display: 'inline-block', width: '20px', height: '20px', backgroundColor: type.color, borderRadius: '4px' }}></span></td>
                <td style={styles.td}>{type.requires_doctor ? 'Yes' : 'No'}</td>
                <td style={styles.td}>{type.requires_room ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentTypesMaster;