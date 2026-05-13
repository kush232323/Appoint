import React from 'react';

const CalendarView = ({ resources, appointments, startHour, endHour, hourHeight, updateStatus, deleteAppointment, setSelectedAppointment, setShowPaymentModal }) => {
  const timeToMinutes = (t) => {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
  };

  const hours = Array.from({ length: endHour - startHour + 1 }, (_, i) => startHour + i);

  const styles = {
    calendarArea: { flex: 1, overflow: 'auto', backgroundColor: '#f0f1f3' },
    resourceHeader: { position: 'sticky', top: 0, zIndex: 20, backgroundColor: 'white', borderBottom: '1px solid #e5e7eb', display: 'flex' },
    timeColumn: { width: '56px', flexShrink: 0, borderRight: '1px solid #e5e7eb', backgroundColor: '#fafafa' },
    resourceColumn: { flex: 1, display: 'flex' },
    resourceItem: { flex: 1, minWidth: '120px', borderRight: '1px solid #e5e7eb', padding: '8px 12px' },
    resourceDot: { width: '8px', height: '8px', borderRadius: '50%', display: 'inline-block', marginRight: '6px' },
    resourceName: { fontSize: '13px', color: '#374151' },
    timelineContainer: { position: 'relative', display: 'flex' },
    timeLabels: { width: '56px', flexShrink: 0, backgroundColor: '#fafafa', borderRight: '1px solid #e5e7eb', position: 'relative' },
    hourLabel: { position: 'absolute', left: 0, right: 0, borderTop: '1px solid #e5e7eb' },
    hourText: { position: 'absolute', top: '-10px', left: '8px', fontSize: '10px', color: '#9ca3af', backgroundColor: '#fafafa', padding: '0 4px' },
    timelineGrid: { flex: 1, display: 'flex', position: 'relative', minHeight: `${(endHour - startHour + 1) * hourHeight}px` },
    resourceGrid: { flex: 1, position: 'relative' },
    appointmentCard: { position: 'absolute', margin: '0 2px', backgroundColor: 'white', borderRadius: '6px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', borderLeft: '3px solid', overflow: 'hidden', cursor: 'pointer' },
    appointmentContent: { padding: '6px 8px' },
    patientName: { fontSize: '12px', fontWeight: '500', color: '#1f2937' },
    serviceText: { fontSize: '10px', color: '#6b7280', marginTop: '2px' },
    priceText: { fontSize: '10px', color: '#10b981', marginTop: '2px', fontWeight: 'bold' },
    paymentBadge: { fontSize: '8px', padding: '2px 4px', borderRadius: '4px', display: 'inline-block', marginTop: '2px' }
  };

  return (
    <div style={styles.calendarArea}>
      <div style={{ minWidth: '800px' }}>
        {/* Resource Header */}
        <div style={styles.resourceHeader}>
          <div style={styles.timeColumn}></div>
          <div style={styles.resourceColumn}>
            {resources.map(r => (
              <div key={r.id} style={styles.resourceItem}>
                <div>
                  <span style={{ ...styles.resourceDot, backgroundColor: r.color }}></span>
                  <span style={styles.resourceName}>{r.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div style={styles.timelineContainer}>
          <div style={styles.timeLabels}>
            {hours.map((h) => (
              <div key={h} style={{ ...styles.hourLabel, top: (h - startHour) * hourHeight }}>
                <span style={styles.hourText}>{h > 12 ? h - 12 : h}{h >= 12 ? 'pm' : 'am'}</span>
              </div>
            ))}
            <div style={{ height: (endHour - startHour + 1) * hourHeight }} />
          </div>

          <div style={styles.timelineGrid}>
            {resources.map((r) => {
              const resourceAppointments = appointments.filter(a => a.resId === r.id);
              return (
                <div key={r.id} style={{ ...styles.resourceGrid, borderRight: '1px solid #e5e7eb' }}>
                  <div style={{ position: 'relative', height: (endHour - startHour + 1) * hourHeight, backgroundImage: `repeating-linear-gradient(to bottom, transparent, transparent ${hourHeight - 1}px, #e5e7eb ${hourHeight - 1}px, #e5e7eb ${hourHeight}px)` }}>
                    {resourceAppointments.map(apt => {
                      const top = (timeToMinutes(apt.start) - startHour * 60) * (hourHeight / 60);
                      const height = (timeToMinutes(apt.end) - timeToMinutes(apt.start)) * (hourHeight / 60);
                      return (
                        <div
                          key={apt.id}
                          style={{ ...styles.appointmentCard, top: `${top}px`, height: `${Math.max(height, 70)}px`, left: '4px', right: '4px', borderLeftColor: apt.dot }}
                        >
                          <div style={styles.appointmentContent}>
                            <div style={styles.patientName}>{apt.patient}</div>
                            {apt.service && <div style={styles.serviceText}>{apt.service.substring(0, 25)}</div>}
                            <div style={styles.priceText}>₹{apt.amount}</div>
                            <div style={{ ...styles.paymentBadge, backgroundColor: apt.paymentStatus === 'Paid' ? '#d1fae5' : '#fed7aa', color: apt.paymentStatus === 'Paid' ? '#065f46' : '#92400e' }}>
                              {apt.paymentStatus}
                            </div>
                            <div style={{ display: 'flex', gap: '4px', marginTop: '4px', flexWrap: 'wrap' }}>
                              <button onClick={(e) => { e.stopPropagation(); updateStatus(apt.id, apt.status === 'Scheduled' ? 'Waiting' : apt.status === 'Waiting' ? 'Engaged' : 'Scheduled'); }} style={{ fontSize: '9px', padding: '2px 6px', background: '#e5e7eb', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Status</button>
                              {apt.paymentStatus === 'Pending' && (
                                <button onClick={(e) => { e.stopPropagation(); setSelectedAppointment(apt); setShowPaymentModal(true); }} style={{ fontSize: '9px', padding: '2px 6px', background: '#10b981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Pay</button>
                              )}
                              <button onClick={(e) => { e.stopPropagation(); deleteAppointment(apt.id); }} style={{ fontSize: '9px', padding: '2px 6px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Del</button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;