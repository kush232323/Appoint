import React, { useState } from 'react';

const DoctorsMaster = ({ doctors, onAdd, onUpdate, onDelete }) => {
  const [showModal, setShowModal] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [formData, setFormData] = useState({
    doctor_code: '',
    doctor_name: '',
    specialization: '',
    qualification: '',
    experience_years: 0,
    consultation_fee: 0,
    phone: '',
    email: '',
    is_available: true,
    status: 'active'
  });

  const handleSubmit = async () => {
    if (editingDoctor) {
      await onUpdate(editingDoctor.id, formData);
    } else {
      await onAdd(formData);
    }
    setShowModal(false);
    setEditingDoctor(null);
    setFormData({
      doctor_code: '',
      doctor_name: '',
      specialization: '',
      qualification: '',
      experience_years: 0,
      consultation_fee: 0,
      phone: '',
      email: '',
      is_available: true,
      status: 'active'
    });
  };

  const handleEdit = (doctor) => {
    setEditingDoctor(doctor);
    setFormData(doctor);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this doctor?')) {
      await onDelete(id);
    }
  };

  const styles = {
    container: { backgroundColor: 'white', borderRadius: '15px', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' },
    title: { fontSize: '24px', fontWeight: 'bold', color: '#1a1a2e' },
    addButton: { backgroundColor: '#0ea5e9', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px' },
    table: { width: '100%', borderCollapse: 'collapse', overflowX: 'auto', display: 'block' },
    th: { textAlign: 'left', padding: '12px', backgroundColor: '#f8f9fa', fontWeight: '600', borderBottom: '2px solid #e5e7eb' },
    td: { padding: '12px', borderBottom: '1px solid #f0f0f0' },
    editBtn: { backgroundColor: '#f59e0b', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer', marginRight: '5px' },
    deleteBtn: { backgroundColor: '#ef4444', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' },
    modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 },
    modalContent: { backgroundColor: 'white', padding: '24px', borderRadius: '15px', width: '500px', maxWidth: '90%', maxHeight: '80vh', overflowY: 'auto' },
    modalTitle: { fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' },
    formGroup: { marginBottom: '15px' },
    label: { display: 'block', marginBottom: '5px', fontSize: '13px', fontWeight: '500', color: '#374151' },
    input: { width: '100%', padding: '10px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '14px' },
    select: { width: '100%', padding: '10px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '14px' },
    buttonGroup: { display: 'flex', gap: '10px', marginTop: '20px' },
    saveBtn: { flex: 1, padding: '10px', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' },
    cancelBtn: { flex: 1, padding: '10px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' },
    statusBadge: (status) => ({
      padding: '4px 8px',
      borderRadius: '20px',
      fontSize: '11px',
      fontWeight: '500',
      backgroundColor: status === 'active' ? '#d1fae5' : '#fee2e2',
      color: status === 'active' ? '#065f46' : '#991b1b',
      display: 'inline-block'
    })
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>👨‍⚕️ Doctors Master</h2>
        <button style={styles.addButton} onClick={() => { setEditingDoctor(null); setFormData({ doctor_code: '', doctor_name: '', specialization: '', qualification: '', experience_years: 0, consultation_fee: 0, phone: '', email: '', is_available: true, status: 'active' }); setShowModal(true); }}>
          + Add Doctor
        </button>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Code</th>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Specialization</th>
              <th style={styles.th}>Experience</th>
              <th style={styles.th}>Fee</th>
              <th style={styles.th}>Phone</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.filter(d => d.status === 'active').map(doctor => (
              <tr key={doctor.id}>
                <td style={styles.td}>{doctor.doctor_code}</td>
                <td style={styles.td}><strong>{doctor.doctor_name}</strong></td>
                <td style={styles.td}>{doctor.specialization}</td>
                <td style={styles.td}>{doctor.experience_years} years</td>
                <td style={styles.td}>₹{doctor.consultation_fee}</td>
                <td style={styles.td}>{doctor.phone}</td>
                <td style={styles.td}><span style={styles.statusBadge(doctor.status)}>{doctor.status}</span></td>
                <td style={styles.td}>
                  <button style={styles.editBtn} onClick={() => handleEdit(doctor)}>Edit</button>
                  <button style={styles.deleteBtn} onClick={() => handleDelete(doctor.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div style={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3 style={styles.modalTitle}>{editingDoctor ? 'Edit Doctor' : 'Add New Doctor'}</h3>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>Doctor Code *</label>
              <input style={styles.input} value={formData.doctor_code} onChange={(e) => setFormData({...formData, doctor_code: e.target.value})} placeholder="DOC001" />
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>Doctor Name *</label>
              <input style={styles.input} value={formData.doctor_name} onChange={(e) => setFormData({...formData, doctor_name: e.target.value})} placeholder="Dr. John Doe" />
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>Specialization</label>
              <input style={styles.input} value={formData.specialization} onChange={(e) => setFormData({...formData, specialization: e.target.value})} placeholder="Dermatologist" />
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>Qualification</label>
              <input style={styles.input} value={formData.qualification} onChange={(e) => setFormData({...formData, qualification: e.target.value})} placeholder="MBBS, MD" />
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Experience (Years)</label>
                <input type="number" style={styles.input} value={formData.experience_years} onChange={(e) => setFormData({...formData, experience_years: parseInt(e.target.value)})} />
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>Consultation Fee (₹)</label>
                <input type="number" style={styles.input} value={formData.consultation_fee} onChange={(e) => setFormData({...formData, consultation_fee: parseInt(e.target.value)})} />
              </div>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Phone</label>
                <input style={styles.input} value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>Email</label>
                <input style={styles.input} value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
              </div>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Status</label>
                <select style={styles.select} value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})}>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>Available</label>
                <select style={styles.select} value={formData.is_available} onChange={(e) => setFormData({...formData, is_available: e.target.value === 'true'})}>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
            </div>
            
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

export default DoctorsMaster;