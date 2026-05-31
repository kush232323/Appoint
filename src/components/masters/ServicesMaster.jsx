import React, { useState } from 'react';

const ServicesMaster = ({ services, onAdd, onUpdate, onDelete }) => {
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({
    service_code: '',
    service_name: '',
    category_name: '',
    duration_minutes: 30,
    price: 0,
    discount_percentage: 0,
    requires_doctor: false,
    is_popular: false,
    status: 'active'
  });

  const calculateFinalPrice = (price, discount) => {
    return price * (1 - discount / 100);
  };

  const handleSubmit = async () => {
    const finalPrice = calculateFinalPrice(formData.price, formData.discount_percentage);
    await onAdd({ ...formData, final_price: finalPrice });
    setShowModal(false);
    setEditingService(null);
    setFormData({ service_code: '', service_name: '', category_name: '', duration_minutes: 30, price: 0, discount_percentage: 0, requires_doctor: false, is_popular: false, status: 'active' });
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setFormData(service);
    setShowModal(true);
  };

  const styles = {
    container: { backgroundColor: 'white', borderRadius: '15px', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
    title: { fontSize: '24px', fontWeight: 'bold', color: '#1a1a2e' },
    addButton: { backgroundColor: '#0ea5e9', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer' },
    table: { width: '100%', borderCollapse: 'collapse' },
    th: { textAlign: 'left', padding: '12px', backgroundColor: '#f8f9fa', fontWeight: '600', borderBottom: '2px solid #e5e7eb' },
    td: { padding: '12px', borderBottom: '1px solid #f0f0f0' },
    editBtn: { backgroundColor: '#f59e0b', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer', marginRight: '5px' },
    deleteBtn: { backgroundColor: '#ef4444', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' },
    modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 },
    modalContent: { backgroundColor: 'white', padding: '24px', borderRadius: '15px', width: '500px', maxWidth: '90%' },
    formGroup: { marginBottom: '15px' },
    label: { display: 'block', marginBottom: '5px', fontSize: '13px', fontWeight: '500' },
    input: { width: '100%', padding: '10px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '14px' },
    buttonGroup: { display: 'flex', gap: '10px', marginTop: '20px' },
    saveBtn: { flex: 1, padding: '10px', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' },
    cancelBtn: { flex: 1, padding: '10px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' },
    badge: (isPopular) => ({ padding: '4px 8px', borderRadius: '20px', fontSize: '11px', backgroundColor: isPopular ? '#d1fae5' : '#f3f4f6', color: isPopular ? '#065f46' : '#6b7280' })
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>💆‍♀️ Services Master</h2>
        <button style={styles.addButton} onClick={() => { setEditingService(null); setFormData({ service_code: '', service_name: '', category_name: '', duration_minutes: 30, price: 0, discount_percentage: 0, requires_doctor: false, is_popular: false, status: 'active' }); setShowModal(true); }}>+ Add Service</button>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Code</th>
              <th style={styles.th}>Service Name</th>
              <th style={styles.th}>Category</th>
              <th style={styles.th}>Duration</th>
              <th style={styles.th}>Price</th>
              <th style={styles.th}>Final Price</th>
              <th style={styles.th}>Popular</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.filter(s => s.status === 'active').map(service => (
              <tr key={service.id}>
                <td style={styles.td}>{service.service_code}</td>
                <td style={styles.td}><strong>{service.service_name}</strong></td>
                <td style={styles.td}>{service.category_name}</td>
                <td style={styles.td}>{service.duration_minutes} min</td>
                <td style={styles.td}>₹{service.price}</td>
                <td style={styles.td}>₹{service.final_price}</td>
                <td style={styles.td}><span style={styles.badge(service.is_popular)}>{service.is_popular ? 'Popular' : 'Standard'}</span></td>
                <td style={styles.td}>
                  <button style={styles.editBtn} onClick={() => handleEdit(service)}>Edit</button>
                  <button style={styles.deleteBtn} onClick={() => onDelete(service.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div style={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ marginBottom: '20px' }}>{editingService ? 'Edit Service' : 'Add New Service'}</h3>
            <div style={styles.formGroup}>
              <input style={styles.input} placeholder="Service Code *" value={formData.service_code} onChange={(e) => setFormData({...formData, service_code: e.target.value})} />
            </div>
            <div style={styles.formGroup}>
              <input style={styles.input} placeholder="Service Name *" value={formData.service_name} onChange={(e) => setFormData({...formData, service_name: e.target.value})} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <input style={styles.input} placeholder="Category" value={formData.category_name} onChange={(e) => setFormData({...formData, category_name: e.target.value})} />
              <input type="number" style={styles.input} placeholder="Duration (minutes)" value={formData.duration_minutes} onChange={(e) => setFormData({...formData, duration_minutes: parseInt(e.target.value)})} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <input type="number" style={styles.input} placeholder="Price (₹)" value={formData.price} onChange={(e) => setFormData({...formData, price: parseInt(e.target.value)})} />
              <input type="number" style={styles.input} placeholder="Discount %" value={formData.discount_percentage} onChange={(e) => setFormData({...formData, discount_percentage: parseInt(e.target.value)})} />
            </div>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
              <label><input type="checkbox" checked={formData.requires_doctor} onChange={(e) => setFormData({...formData, requires_doctor: e.target.checked})} /> Requires Doctor</label>
              <label><input type="checkbox" checked={formData.is_popular} onChange={(e) => setFormData({...formData, is_popular: e.target.checked})} /> Popular Service</label>
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

export default ServicesMaster;