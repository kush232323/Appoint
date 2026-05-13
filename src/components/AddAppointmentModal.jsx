import React, { useState } from 'react';

const AddAppointmentModal = ({ showAddModal, setShowAddModal, resources, addAppointment }) => {
  const [newAppointment, setNewAppointment] = useState({
    patient: '',
    phone: '',
    email: '',
    service: '',
    resourceId: '',
    startTime: '',
    endTime: '',
    status: 'Scheduled',
    amount: 0
  });

  const handleSubmit = () => {
    if (newAppointment.patient && newAppointment.resourceId && newAppointment.startTime) {
      addAppointment(newAppointment);
      setNewAppointment({ patient: '', phone: '', email: '', service: '', resourceId: '', startTime: '', endTime: '', status: 'Scheduled', amount: 0 });
    } else {
      alert('Please fill all required fields!');
    }
  };

  const styles = {
    modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 },
    modalContent: { backgroundColor: 'white', padding: '24px', borderRadius: '16px', width: '500px', maxWidth: '90%', maxHeight: '80vh', overflowY: 'auto' },
    modalTitle: { fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' },
    formGroup: { marginBottom: '16px' },
    formLabel: { display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '500', color: '#374151' },
    formInput: { width: '100%', padding: '10px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '14px' },
    selectInput: { width: '100%', padding: '10px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '14px', background: 'white' },
    buttonGroup: { display: 'flex', gap: '12px', marginTop: '20px' },
    saveBtn: { flex: 1, padding: '10px', backgroundColor: '#0ea5e9', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' },
    cancelBtn: { flex: 1, padding: '10px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }
  };

  if (!showAddModal) return null;

  return (
    <div style={styles.modalOverlay} onClick={() => setShowAddModal(false)}>
      <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2 style={styles.modalTitle}>➕ Add New Appointment</h2>
        <div style={styles.formGroup}>
          <label style={styles.formLabel}>Patient Name *</label>
          <input style={styles.formInput} placeholder="Full name" value={newAppointment.patient} onChange={(e) => setNewAppointment({...newAppointment, patient: e.target.value})} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Phone *</label>
            <input style={styles.formInput} placeholder="Mobile number" value={newAppointment.phone} onChange={(e) => setNewAppointment({...newAppointment, phone: e.target.value})} />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Email</label>
            <input style={styles.formInput} placeholder="Email address" value={newAppointment.email} onChange={(e) => setNewAppointment({...newAppointment, email: e.target.value})} />
          </div>
        </div>
        <div style={styles.formGroup}>
          <label style={styles.formLabel}>Service</label>
          <input style={styles.formInput} placeholder="Service name" value={newAppointment.service} onChange={(e) => setNewAppointment({...newAppointment, service: e.target.value})} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Resource *</label>
            <select style={styles.selectInput} value={newAppointment.resourceId} onChange={(e) => {
              const resource = resources.find(r => r.id === parseInt(e.target.value));
              setNewAppointment({...newAppointment, resourceId: e.target.value, amount: resource?.price || 0});
            }}>
              <option value="">Select Resource</option>
              {resources.map(r => <option key={r.id} value={r.id}>{r.name} - ₹{r.price}</option>)}
            </select>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Amount</label>
            <input type="number" style={styles.formInput} placeholder="Amount" value={newAppointment.amount} onChange={(e) => setNewAppointment({...newAppointment, amount: parseInt(e.target.value)})} />
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Start Time *</label>
            <input type="time" style={styles.formInput} value={newAppointment.startTime} onChange={(e) => setNewAppointment({...newAppointment, startTime: e.target.value})} />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>End Time</label>
            <input type="time" style={styles.formInput} value={newAppointment.endTime} onChange={(e) => setNewAppointment({...newAppointment, endTime: e.target.value})} />
          </div>
        </div>
        <div style={styles.buttonGroup}>
          <button style={styles.saveBtn} onClick={handleSubmit}>Save Appointment</button>
          <button style={styles.cancelBtn} onClick={() => setShowAddModal(false)}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AddAppointmentModal;