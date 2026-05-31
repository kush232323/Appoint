import React from 'react';

const PaymentMethodsMaster = ({ methods }) => {
  const styles = {
    container: { backgroundColor: 'white', borderRadius: '15px', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' },
    title: { fontSize: '24px', fontWeight: 'bold', color: '#1a1a2e', marginBottom: '20px' },
    table: { width: '100%', borderCollapse: 'collapse' },
    th: { textAlign: 'left', padding: '12px', backgroundColor: '#f8f9fa', fontWeight: '600' },
    td: { padding: '12px', borderBottom: '1px solid #f0f0f0' }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>💳 Payment Methods Master</h2>
      <div style={{ overflowX: 'auto' }}>
        <table style={styles.table}>
          <thead><tr><th style={styles.th}>Code</th><th style={styles.th}>Method Name</th><th style={styles.th}>Cash</th><th style={styles.th}>Card</th><th style={styles.th}>Online</th><th style={styles.th}>Status</th></tr></thead>
          <tbody>
            {methods.map(method => (
              <tr key={method.id}>
                <td style={styles.td}>{method.method_code}</td>
                <td style={styles.td}><strong>{method.method_name}</strong></td>
                <td style={styles.td}>{method.is_cash ? '✅' : '❌'}</td>
                <td style={styles.td}>{method.is_card ? '✅' : '❌'}</td>
                <td style={styles.td}>{method.is_online ? '✅' : '❌'}</td>
                <td style={styles.td}>{method.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentMethodsMaster;