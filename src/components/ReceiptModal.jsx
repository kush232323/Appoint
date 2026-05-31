import React from 'react';

const ReceiptModal = ({ receipt, onClose }) => {
  const printReceipt = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Payment Receipt</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 40px; }
            .receipt { max-width: 500px; margin: 0 auto; border: 1px solid #ddd; padding: 20px; border-radius: 10px; }
            .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 10px; margin-bottom: 20px; }
            .logo { font-size: 24px; font-weight: bold; color: #0ea5e9; }
            .title { font-size: 18px; margin-top: 5px; }
            .details { margin: 20px 0; }
            .row { display: flex; justify-content: space-between; margin: 10px 0; padding: 5px 0; }
            .total { border-top: 2px solid #333; margin-top: 20px; padding-top: 10px; font-weight: bold; font-size: 18px; }
            .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="receipt">
            <div class="header">
              <div class="logo">🏥 AppointPro</div>
              <div class="title">Payment Receipt</div>
            </div>
            <div class="details">
              <div class="row"><strong>Receipt No:</strong> <span>${receipt?.payment_number}</span></div>
              <div class="row"><strong>Date:</strong> <span>${new Date().toLocaleString()}</span></div>
              <div class="row"><strong>Amount Paid:</strong> <span>₹${receipt?.amount}</span></div>
              <div class="row total"><strong>Status:</strong> <span>✅ Payment Successful</span></div>
            </div>
            <div class="footer">
              <p>Thank you for choosing AppointPro!</p>
            </div>
          </div>
          <div style="text-align: center; margin-top: 20px;">
            <button onclick="window.print();setTimeout(()=>window.close(),500)" style="padding: 10px 20px; background: #0ea5e9; color: white; border: none; border-radius: 5px; cursor: pointer;">🖨️ Print Receipt</button>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const styles = {
    modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: receipt ? 'flex' : 'none', alignItems: 'center', justifyContent: 'center', zIndex: 1000 },
    modalContent: { backgroundColor: 'white', padding: '24px', borderRadius: '15px', width: '350px', maxWidth: '90%' },
    modalTitle: { fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' },
    receiptBox: { backgroundColor: '#f0fdf4', padding: '16px', borderRadius: '8px', marginBottom: '20px', textAlign: 'center' },
    buttonGroup: { display: 'flex', gap: '10px' },
    printBtn: { flex: 1, padding: '10px', backgroundColor: '#0ea5e9', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' },
    closeBtn: { flex: 1, padding: '10px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }
  };

  if (!receipt) return null;

  return (
    <div style={styles.modalOverlay} onClick={onClose}>
      <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h3 style={styles.modalTitle}>🧾 Payment Receipt</h3>
        <div style={styles.receiptBox}>
          <div style={{ fontSize: '14px', color: '#666' }}>Receipt No: {receipt.payment_number}</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#10b981', margin: '10px 0' }}>₹{receipt.amount}</div>
          <div style={{ fontSize: '12px', color: '#10b981' }}>✅ Payment Successful</div>
        </div>
        <div style={styles.buttonGroup}>
          <button style={styles.printBtn} onClick={printReceipt}>🖨️ Print Receipt</button>
          <button style={styles.closeBtn} onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default ReceiptModal;