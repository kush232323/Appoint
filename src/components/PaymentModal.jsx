import React, { useState } from 'react';

const PaymentModal = ({ show, onClose, onProcess, appointment, paymentMethods }) => {
  const [paymentMethodId, setPaymentMethodId] = useState('');
  const [amount, setAmount] = useState(appointment?.net_amount || 0);

  const handleSubmit = async () => {
    if (!paymentMethodId) {
      alert('Please select payment method');
      return;
    }
    await onProcess({
      appointment_id: appointment?.id,
      patient_id: appointment?.patient_id,
      payment_method_id: paymentMethodId,
      amount: amount,
      notes: ''
    });
    onClose();
  };

  const styles = {
    modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: show ? 'flex' : 'none', alignItems: 'center', justifyContent: 'center', zIndex: 1000 },
    modalContent: { backgroundColor: 'white', padding: '24px', borderRadius: '15px', width: '400px', maxWidth: '90%' },
    modalTitle: { fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' },
    formGroup: { marginBottom: '15px' },
    label: { display: 'block', marginBottom: '5px', fontSize: '13px', fontWeight: '500', color: '#374151' },
    input: { width: '100%', padding: '10px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '14px' },
    select: { width: '100%', padding: '10px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '14px', backgroundColor: 'white' },
    infoBox: { backgroundColor: '#f0fdf4', padding: '15px', borderRadius: '8px', marginBottom: '20px' },
    buttonGroup: { display: 'flex', gap: '10px', marginTop: '20px' },
    saveBtn: { flex: 1, padding: '10px', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' },
    cancelBtn: { flex: 1, padding: '10px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }
  };

  if (!show) return null;

  return (
    <div style={styles.modalOverlay} onClick={onClose}>
      <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h3 style={styles.modalTitle}>💰 Process Payment</h3>
        
        <div style={styles.infoBox}>
          <div><strong>Patient:</strong> {appointment?.patient_name}</div>
          <div><strong>Amount:</strong> <span style={{ fontSize: '20px', color: '#10b981' }}>₹{appointment?.net_amount}</span></div>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Payment Method *</label>
          <select style={styles.select} value={paymentMethodId} onChange={(e) => setPaymentMethodId(e.target.value)}>
            <option value="">Select Payment Method</option>
            {paymentMethods?.filter(p => p.status === 'active').map(m => (
              <option key={m.id} value={m.id}>{m.method_name}</option>
            ))}
          </select>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Amount</label>
          <input type="number" style={styles.input} value={amount} onChange={(e) => setAmount(parseFloat(e.target.value))} />
        </div>

        <div style={styles.buttonGroup}>
          <button style={styles.saveBtn} onClick={handleSubmit}>Confirm Payment</button>
          <button style={styles.cancelBtn} onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;