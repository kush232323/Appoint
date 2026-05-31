import React, { useState } from 'react';

const StaffMaster = ({ staff, onAdd, onUpdate, onDelete }) => {
  const [showModal, setShowModal] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);
  const [formData, setFormData] = useState({
    staff_code: '',
    staff_name: '',
    designation: '',
    department: '',
    phone: '',
    email: '',
    is_available: true,
    status: 'active'
  });

  const handleSubmit = async () => {
    if (editingStaff) {
      await onUpdate(editingStaff.id, formData);
    } else {
      await onAdd(formData);
    }
    setShowModal(false);
    setEditingStaff(null);
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
    modalContent: { backgroundColor: 'white', padding: '24px', borderRadius: '15px', width: '450px', maxWidth: '90%' },
    input: { width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #e5e7eb', borderRadius: '8px' },
    buttonGroup: { display: 'flex', gap: '10px', marginTop: '20px' },
    saveBtn: { flex: 1, padding: '10px', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' },
    cancelBtn: { flex: 1, padding: '10px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>👥 Staff Master</h2>
        <button style={styles.addButton} onClick={() => { setEditingStaff(null); setFormData({ staff_code: '', staff_name: '', designation: '', department: '', phone: '', email: '', is_available: true, status: 'active' }); setShowModal(true); }}>+ Add Staff</button>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={styles.table}>
          <thead><tr><th style={styles.th}>Code</th><th style={styles.th}>Name</th><th style={styles.th}>Designation</th><th style={styles.th}>Department</th><th style={styles.th}>Phone</th><th style={styles.th}>Status</th><th style={styles.th}>Actions</th></tr></thead>
          <tbody>
            {staff.filter(s => s.status === 'active').map(member => (
              <tr key={member.id}>
                <td style={styles.td}>{member.staff_code}</td>
                <td style={styles.td}><strong>{member.staff_name}</strong></td>
                <td style={styles.td}>{member.designation}</td>
                <td style={styles.td}>{member.department}</td>
                <td style={styles.td}>{member.phone}</td>
                <td style={styles.td}>{member.status}</td>
                <td style={styles.td}>
                  <button style={styles.editBtn} onClick={() => { setEditingStaff(member); setFormData(member); setShowModal(true); }}>Edit</button>
                  <button style={styles.deleteBtn} onClick={() => onDelete(member.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div style={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3>{editingStaff ? 'Edit Staff' : 'Add New Staff'}</h3>
            <input style={styles.input} placeholder="Staff Code *" value={formData.staff_code} onChange={(e) => setFormData({...formData, staff_code: e.target.value})} />
            <input style={styles.input} placeholder="Staff Name *" value={formData.staff_name} onChange={(e) => setFormData({...formData, staff_name: e.target.value})} />
            <input style={styles.input} placeholder="Designation" value={formData.designation} onChange={(e) => setFormData({...formData, designation: e.target.value})} />
            <input style={styles.input} placeholder="Department" value={formData.department} onChange={(e) => setFormData({...formData, department: e.target.value})} />
            <input style={styles.input} placeholder="Phone" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
            <input style={styles.input} placeholder="Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
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

export default StaffMaster;