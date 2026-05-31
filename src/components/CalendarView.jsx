import React from 'react';

const CalendarView = ({ appointments, resources, onUpdateStatus, onDelete, onPayment }) => {
  const hours = Array.from({ length: 12 }, (_, i) => i + 9); // 9 AM to 8 PM
  const hourHeight = 80;

  const timeToMinutes = (time) => {
    const [h, m] = time.split(':').map(Number);
    return h * 60 + m;
  };

  const getAppointmentPosition = (apt) => {
    const startMin = timeToMinutes(apt.start_time);
    const endMin = timeToMinutes(apt.end_time);
    const startHour = 9;
    const top = (startMin - startHour * 60) * (hourHeight / 60);
    const height = (endMin - startMin) * (hourHeight / 60);
    return { top, height: Math.max(height, 50) };
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Scheduled': return '#10b981';
      case 'Waiting': return '#f59e0b';
      case 'Engaged': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const styles = {
    container: { backgroundColor: 'white', borderRadius: '15px', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', overflow: 'auto' },
    header: { display: 'flex', marginBottom: '20px' },
    timeColumn: { width: '80px', flexShrink: 0 },
    resourceColumn: { flex: 1, display: 'flex', gap: '10px' },
    resourceItem: { flex: 1, textAlign: 'center', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '8px', fontWeight: '500' },
    timelineContainer: { position: 'relative', display: 'flex' },
    timeLabels: { width: '80px', flexShrink: 0, position: 'relative' },
    hourLabel: { height: `${hourHeight}px`, borderTop: '1px solid #e5e7eb', position: 'relative' },
    hourText: { position: 'absolute', top: '-10px', left: '8px', fontSize: '11px', color: '#9ca3af' },
    gridContainer: { flex: 1, display: 'flex', gap: '10px', position: 'relative', minHeight: `${hours.length * hourHeight}px` },
    resourceGrid: { flex: 1, position: 'relative', backgroundColor: '#fafafa', borderRadius: '8px' },
    appointmentCard: (status, top, height) => ({
      position: 'absolute',
      left: '4px',
      right: '4px',
      top: `${top}px`,
      height: `${height}px`,
      backgroundColor: 'white',
      borderRadius: '8px',
      borderLeft: `4px solid ${getStatusColor(status)}`,
      boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
      padding: '8px',
      cursor: 'pointer',
      overflow: 'hidden'
    })
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.timeColumn}>Time</div>
        <div style={styles.resourceColumn}>
          {resources.slice(0, 5).map(r => (
            <div key={r.id} style={styles.resourceItem}>{r.doctor_name}</div>
          ))}
        </div>
      </div>

      <div style={styles.timelineContainer}>
        <div style={styles.timeLabels}>
          {hours.map(hour => (
            <div key={hour} style={styles.hourLabel}>
              <span style={styles.hourText}>{hour > 12 ? hour - 12 : hour}:00 {hour >= 12 ? 'PM' : 'AM'}</span>
            </div>
          ))}
        </div>

        <div style={styles.gridContainer}>
          {resources.slice(0, 5).map(resource => (
            <div key={resource.id} style={styles.resourceGrid}>
              {appointments.filter(apt => apt.doctor_id === resource.id).map(apt => {
                const { top, height } = getAppointmentPosition(apt);
                return (
                  <div key={apt.id} style={styles.appointmentCard(apt.status, top, height)}>
                    <div style={{ fontWeight: 'bold', fontSize: '12px' }}>{apt.patient_name || 'Patient'}</div>
                    <div style={{ fontSize: '10px', color: '#666' }}>{apt.start_time} - {apt.end_time}</div>
                    <div style={{ fontSize: '10px', color: '#10b981' }}>₹{apt.net_amount}</div>
                    <div style={{ display: 'flex', gap: '4px', marginTop: '4px' }}>
                      <button onClick={(e) => { e.stopPropagation(); onUpdateStatus(apt.id, apt.status === 'Scheduled' ? 'Waiting' : 'Waiting' ? 'Engaged' : 'Scheduled'); }} style={{ fontSize: '9px', padding: '2px 6px', background: '#e5e7eb', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Status</button>
                      {apt.payment_status === 'Pending' && (
                        <button onClick={(e) => { e.stopPropagation(); onPayment(apt); }} style={{ fontSize: '9px', padding: '2px 6px', background: '#10b981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Pay</button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalendarView;