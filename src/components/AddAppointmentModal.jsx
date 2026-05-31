import React, { useState } from 'react';

const AddAppointmentModal = ({ show, onClose, onSave, patients, doctors, services, rooms, staff, appointmentTypes, timeSlots }) => {
  const [formData, setFormData] = useState({
    patient_id: '',
    doctor_id: '',
    service_id: '',
    room_id: '',
    staff_id: '',
    appointment_type_id: '',
    appointment_date: new Date().toISOString().split('T')[0],
    start_time: '10:00:00',
    end_time: '11:00:00',
    total_amount: 0,
    notes: ''
  });

  const handleSubmit = async () => {
    if (!formData.patient_id || !formData.appointment_date) {
      alert('Please fill required fields');
      return;
    }
    await onSave(formData);
    setFormData({ patient_id: '', doctor_id: '', service_id: '', room_id: '', staff_id: '', appointment_type_id: '', appointment_date: new Date().toISOString().split('T')[0], start_time: '10:00:00', end_time: '11:00:00', total_amount: 0, notes: '' });
    onClose();
  };

  const styles = {
    modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: show ? 'flex' : 'none', alignItems: 'center', justifyContent: 'center', zIndex: 1000 },
    modalContent: { backgroundColor: 'white', padding: '24px', borderRadius: '15px', width: '550px', maxWidth: '90%', maxHeight: '80vh', overflowY: 'auto' },
    modalTitle: { fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' },
    formGroup: { marginBottom: '15px' },
    label: { display: 'block', marginBottom: '5px', fontSize: '13px', fontWeight: '500', color: '#374151' },
    input: { width: '100%', padding: '10px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '14px' },
    select: { width: '100%', padding: '10px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '14px', backgroundColor: 'white' },
    buttonGroup: { display: 'flex', gap: '10px', marginTop: '20px' },
    saveBtn: { flex: 1, padding: '10px', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' },
    cancelBtn: { flex: 1, padding: '10px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }
  };

  if (!show) return null;

  return (
    <div style={styles.modalOverlay} onClick={onClose}>
      <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h3 style={styles.modalTitle}>➕ Add New Appointment</h3>
        
        <div style={styles.formGroup}>
          <label style={styles.label}>Patient *</label>
          <select style={styles.select} value={formData.patient_id} onChange={(e) => setFormData({...formData, patient_id: e.target.value})}>
            <option value="">Select Patient</option>
            {patients.map(p => <option key={p.id} value={p.id}>{p.full_name} - {p.phone}</option>)}
          </select>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Doctor</label>
            <select style={styles.select} value={formData.doctor_id} onChange={(e) => setFormData({...formData, doctor_id: e.target.value})}>
              <option value="">Select Doctor</option>
              {doctors.filter(d => d.status === 'active').map(d => <option key={d.id} value={d.id}>{d.doctor_name}</option>)}
            </select>
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>Service</label>
            <select style={styles.select} value={formData.service_id} onChange={(e) => setFormData({...formData, service_id: e.target.value})}>
              <option value="">Select Service</option>
              {services.filter(s => s.status === 'active').map(s => <option key={s.id} value={s.id}>{s.service_name} - ₹{s.price}</option>)}
            </select>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Room</label>
            <select style={styles.select} value={formData.room_id} onChange={(e) => setFormData({...formData, room_id: e.target.value})}>
              <option value="">Select Room</option>
              {rooms.filter(r => r.status === 'active').map(r => <option key={r.id} value={r.id}>{r.room_name}</option>)}
            </select>
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>Staff</label>
            <select style={styles.select} value={formData.staff_id} onChange={(e) => setFormData({...formData, staff_id: e.target.value})}>
              <option value="">Select Staff</option>
              {staff.filter(s => s.status === 'active').map(s => <option key={s.id} value={s.id}>{s.staff_name}</option>)}
            </select>
          </div>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Appointment Type</label>
          <select style={styles.select} value={formData.appointment_type_id} onChange={(e) => setFormData({...formData, appointment_type_id: e.target.value})}>
            <option value="">Select Type</option>
            {appointmentTypes.map(t => <option key={t.id} value={t.id}>{t.type_name}</option>)}
          </select>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Date *</label>
          <input type="date" style={styles.input} value={formData.appointment_date} onChange={(e) => setFormData({...formData, appointment_date: e.target.value})} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Start Time</label>
            <input type="time" style={styles.input} value={formData.start_time} onChange={(e) => setFormData({...formData, start_time: e.target.value})} />
          </div>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>End Time</label>
            <input type="time" style={styles.input} value={formData.end_time} onChange={(e) => setFormData({...formData, end_time: e.target.value})} />
          </div>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Notes</label>
          <textarea style={styles.input} rows="3" value={formData.notes} onChange={(e) => setFormData({...formData, notes: e.target.value})} placeholder="Additional notes..."></textarea>
        </div>

        <div style={styles.buttonGroup}>
          <button style={styles.saveBtn} onClick={handleSubmit}>Save Appointment</button>
          <button style={styles.cancelBtn} onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AddAppointmentModal;