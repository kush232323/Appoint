import React, { useState } from 'react';

const RoomsMaster = ({ rooms, onAdd, onUpdate, onDelete }) => {
  const [showModal, setShowModal] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [formData, setFormData] = useState({
    room_code: '',
    room_name: '',
    room_type: 'treatment',
    capacity: 1,
    price_per_hour: 0,
    is_available: true,
    status: 'active'
  });

  const handleSubmit = async () => {
    if (editingRoom) {
      await onUpdate(editingRoom.id, formData);
    } else {
      await onAdd(formData);
    }
    setShowModal(false);
    setEditingRoom(null);
  };

  const handleEdit = (room) => {
    setEditingRoom(room);
    setFormData(room);
    setShowModal(true);
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
    formGroup: { marginBottom: '15px' },
    input: { width: '100%', padding: '10px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '14px' },
    select: { width: '100%', padding: '10px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '14px' },
    buttonGroup: { display: 'flex', gap: '10px', marginTop: '20px' },
    saveBtn: { flex: 1, padding: '10px', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' },
    cancelBtn: { flex: 1, padding: '10px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>🚪 Rooms Master</h2>
        <button style={styles.addButton} onClick={() => { setEditingRoom(null); setFormData({ room_code: '', room_name: '', room_type: 'treatment', capacity: 1, price_per_hour: 0, is_available: true, status: 'active' }); setShowModal(true); }}>+ Add Room</button>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={styles.table}>
          <thead>
            <tr><th style={styles.th}>Code</th><th style={styles.th}>Room Name</th><th style={styles.th}>Type</th><th style={styles.th}>Capacity</th><th style={styles.th}>Price/Hour</th><th style={styles.th}>Status</th><th style={styles.th}>Actions</th></tr>
          </thead>
          <tbody>
            {rooms.filter(r => r.status === 'active').map(room => (
              <tr key={room.id}>
                <td style={styles.td}>{room.room_code}</td>
                <td style={styles.td}><strong>{room.room_name}</strong></td>
                <td style={styles.td}>{room.room_type}</td>
                <td style={styles.td}>{room.capacity}</td>
                <td style={styles.td}>₹{room.price_per_hour}</td>
                <td style={styles.td}>{room.status}</td>
                <td style={styles.td}>
                  <button style={styles.editBtn} onClick={() => handleEdit(room)}>Edit</button>
                  <button style={styles.deleteBtn} onClick={() => onDelete(room.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div style={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3>{editingRoom ? 'Edit Room' : 'Add New Room'}</h3>
            <input style={styles.input} placeholder="Room Code *" value={formData.room_code} onChange={(e) => setFormData({...formData, room_code: e.target.value})} />
            <input style={styles.input} placeholder="Room Name *" value={formData.room_name} onChange={(e) => setFormData({...formData, room_name: e.target.value})} />
            <select style={styles.select} value={formData.room_type} onChange={(e) => setFormData({...formData, room_type: e.target.value})}>
              <option value="consultation">Consultation</option>
              <option value="treatment">Treatment</option>
              <option value="laser">Laser</option>
              <option value="operation">Operation</option>
            </select>
            <input type="number" style={styles.input} placeholder="Capacity" value={formData.capacity} onChange={(e) => setFormData({...formData, capacity: parseInt(e.target.value)})} />
            <input type="number" style={styles.input} placeholder="Price per Hour (₹)" value={formData.price_per_hour} onChange={(e) => setFormData({...formData, price_per_hour: parseInt(e.target.value)})} />
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

export default RoomsMaster;