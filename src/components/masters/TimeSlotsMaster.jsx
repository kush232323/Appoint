import React from 'react';

const TimeSlotsMaster = ({ slots }) => {
  const styles = {
    container: { backgroundColor: 'white', borderRadius: '15px', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' },
    title: { fontSize: '24px', fontWeight: 'bold', color: '#1a1a2e', marginBottom: '20px' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '10px' },
    slotCard: { padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '8px', textAlign: 'center', cursor: 'pointer' }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>⏰ Time Slots Master</h2>
      <div style={styles.grid}>
        {slots.map(slot => (
          <div key={slot.id} style={styles.slotCard}>
            {slot.slot_display || slot.slot_time}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimeSlotsMaster;