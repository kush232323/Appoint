import React from 'react';

const PaymentModal = ({ showPaymentModal, setShowPaymentModal, selectedAppointment, paymentMethod, setPaymentMethod, processPayment }) => {
  const styles = {
    modalOverlay: { 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      right: 0, 
      bottom: 0, 
      backgroundColor: 'rgba(0,0,0,0.5)', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      zIndex: 2000 
    },
    modalContent: { 
      backgroundColor: 'white', 
      padding: '24px', 
      borderRadius: '16px', 
      width: '450px', 
      maxWidth: '90%' 
    },
    modalTitle: { 
      fontSize: '20px', 
      fontWeight: 'bold', 
      marginBottom: '20px' 
    },
    formGroup: { 
      marginBottom: '16px' 
    },
    formLabel: { 
      display: 'block', 
      marginBottom: '6px', 
      fontSize: '13px', 
      fontWeight: '500', 
      color: '#374151' 
    },
    selectInput: { 
      width: '100%', 
      padding: '10px', 
      border: '1px solid #e5e7eb', 
      borderRadius: '8px', 
      fontSize: '14px', 
      background: 'white' 
    },
    buttonGroup: { 
      display: 'flex', 
      gap: '12px', 
      marginTop: '20px' 
    },
    saveBtn: { 
      flex: 1, 
      padding: '10px', 
      backgroundColor: '#10b981', 
      color: 'white', 
      border: 'none', 
      borderRadius: '8px', 
      cursor: 'pointer' 
    },
    cancelBtn: { 
      flex: 1, 
      padding: '10px', 
      backgroundColor: '#ef4444', 
      color: 'white', 
      border: 'none', 
      borderRadius: '8px', 
      cursor: 'pointer' 
    },
    infoBox: { 
      backgroundColor: '#f0fdf4', 
      padding: '16px', 
      borderRadius: '8px', 
      marginBottom: '20px' 
    }
  };

  if (!showPaymentModal || !selectedAppointment) return null;

  return (
    <div style={styles.modalOverlay} onClick={() => setShowPaymentModal(false)}>
      <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2 style={styles.modalTitle}>💰 Process Payment</h2>
        <div style={styles.infoBox}>
          <div><strong>Patient:</strong> {selectedAppointment.patient}</div>
          <div><strong>Service:</strong> {selectedAppointment.service}</div>
          <div><strong>Amount:</strong> <span style={{ fontSize: '20px', color: '#10b981' }}>₹{selectedAppointment.amount}</span></div>
        </div>
        <div style={styles.formGroup}>
          <label style={styles.formLabel}>Payment Method</label>
          <select style={styles.selectInput} value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
            <option>Cash</option>
            <option>Credit Card</option>
            <option>Debit Card</option>
            <option>UPI</option>
            <option>Bank Transfer</option>
          </select>
        </div>
        <div style={styles.buttonGroup}>
          <button style={styles.saveBtn} onClick={processPayment}>Confirm Payment</button>
          <button style={styles.cancelBtn} onClick={() => setShowPaymentModal(false)}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;