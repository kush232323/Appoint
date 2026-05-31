import React, { useState } from 'react';

const PatientsMaster = ({ patients, onAdd, onUpdate, onDelete }) => {
  const [showModal, setShowModal] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);
  const [formData, setFormData] = useState({
    patient_code: '',
    first_name: '',
    last_name: '',
    full_name: '',
    date_of_birth: '',
    gender: 'Female',
    email: '',
    phone: '',
    address: '',
    city: '',
    status: 'active'
  });

  const handleSubmit = async () => {
    const fullName = `${formData.first_name} ${formData.last_name || ''}`;
    if (editingPatient) {
      await onUpdate(editingPatient.id, { ...formData, full_name: fullName });
    } else {
      await onAdd({ ...formData, full_name: fullName });
    }
    setShowModal(false);
    setEditingPatient(null);
  };

  const styles = {
    container: { backgroundColor: 'white', borderRadius: '15px', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
    title: { fontSize: '24px', fontWeight: 'bold', color: '#1a1a2e' },
    addButton: { backgroundColor: '#0ea5e9', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer' },
    table: { width: '100%', borderCollapse: 'collapse' },
    th: { textAlign: 'left', padding: '12px', backgroundColor: '#f8f9fa', fontWeight: '600' },
    td: { padding: '12px', borderBottom: '1px solid #f0f0f0' },
    editBtn: { backgroundColor: '#f59e0b', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer', marginRight: '5px' },
    deleteBtn: { backgroundColor: '#ef4444', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' },
    modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 },
    modalContent: { backgroundColor: 'white', padding: '24px', borderRadius: '15px', width: '500px', maxWidth: '90%', maxHeight: '80vh', overflowY: 'auto' },
    input: { width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #e5e7eb', borderRadius: '8px' },
    select: { width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #e5e7eb', borderRadius: '8px' },
    buttonGroup: { display: 'flex', gap: '10px', marginTop: '20px' },
    saveBtn: { flex: 1, padding: '10px', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' },
    cancelBtn: { flex: 1, padding: '10px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>🧑‍🤝‍🧑 Patients Master</h2>
        <button style={styles.addButton} onClick={() => { setEditingPatient(null); setFormData({ patient_code: '', first_name: '', last_name: '', full_name: '', date_of_birth: '', gender: 'Female', email: '', phone: '', address: '', city: '', status: 'active' }); setShowModal(true); }}>+ Add Patient</button>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={styles.table}>
          <thead><tr><th style={styles.th}>Code</th><th style={styles.th}>Name</th><th style={styles.th}>Phone</th><th style={styles.th}>Email</th><th style={styles.th}>City</th><th style={styles.th}>Status</th><th style={styles.th}>Actions</th></tr></thead>
          <tbody>
            {patients.filter(p => p.status === 'active').map(patient => (
              <tr key={patient.id}>
                <td style={styles.td}>{patient.patient_code}</td>
                <td style={styles.td}><strong>{patient.full_name}</strong></td>
                <td style={styles.td}>{patient.phone}</td>
                <td style={styles.td}>{patient.email}</td>
                <td style={styles.td}>{patient.city}</td>
                <td style={styles.td}>{patient.status}</td>
                <td style={styles.td}>
                  <button style={styles.editBtn} onClick={() => { setEditingPatient(patient); setFormData(patient); setShowModal(true); }}>Edit</button>
                  <button style={styles.deleteBtn} onClick={() => onDelete(patient.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div style={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3>{editingPatient ? 'Edit Patient' : 'Add New Patient'}</h3>
            <input style={styles.input} placeholder="Patient Code *" value={formData.patient_code} onChange={(e) => setFormData({...formData, patient_code: e.target.value})} />
            <div style={{ display: 'flex', gap: '10px' }}>
              <input style={{ ...styles.input, flex: 1 }} placeholder="First Name *" value={formData.first_name} onChange={(e) => setFormData({...formData, first_name: e.target.value})} />
              <input style={{ ...styles.input, flex: 1 }} placeholder="Last Name" value={formData.last_name} onChange={(e) => setFormData({...formData, last_name: e.target.value})} />
            </div>
            <input type="date" style={styles.input} value={formData.date_of_birth} onChange={(e) => setFormData({...formData, date_of_birth: e.target.value})} />
            <select style={styles.select} value={formData.gender} onChange={(e) => setFormData({...formData, gender: e.target.value})}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <input style={styles.input} placeholder="Phone *" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
            <input style={styles.input} placeholder="Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
            <input style={styles.input} placeholder="Address" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} />
            <input style={styles.input} placeholder="City" value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} />
            <div style={styles.buttonGroup}>
              <button style={styles.saveBtn} onClick={handleSubmit}>Save</button>
              <button style={styles.cancelBtn} onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientsMaster;