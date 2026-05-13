import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = onLogin(loginData.email, loginData.password);
    if (!success) {
      setLoginError('Invalid credentials. Use: admin@example.com / admin123');
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: 'Segoe UI, Arial, sans-serif'
    },
    loginBox: {
      backgroundColor: 'white',
      padding: '40px',
      borderRadius: '20px',
      boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
      width: '400px',
      maxWidth: '90%'
    },
    loginHeader: { textAlign: 'center', marginBottom: '30px' },
    loginTitle: { fontSize: '28px', color: '#333', marginBottom: '10px' },
    inputGroup: { marginBottom: '20px' },
    inputLabel: { display: 'block', marginBottom: '8px', color: '#555', fontWeight: '500' },
    input: { width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px' },
    loginButton: { width: '100%', padding: '12px', backgroundColor: '#667eea', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' },
    errorMsg: { backgroundColor: '#fee', color: '#c33', padding: '10px', borderRadius: '8px', marginBottom: '20px', fontSize: '14px', textAlign: 'center' },
    demoInfo: { marginTop: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px', fontSize: '12px', textAlign: 'center', color: '#666' }
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginBox}>
        <div style={styles.loginHeader}>
          <div style={{ fontSize: '50px', marginBottom: '10px' }}>📅</div>
          <h1 style={styles.loginTitle}>AppointPro</h1>
          <p style={{ color: '#666', fontSize: '14px' }}>Appointment Management System</p>
        </div>
        {loginError && <div style={styles.errorMsg}>{loginError}</div>}
        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label style={styles.inputLabel}>Email Address</label>
            <input type="email" style={styles.input} placeholder="admin@example.com" value={loginData.email} onChange={(e) => setLoginData({...loginData, email: e.target.value})} required />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.inputLabel}>Password</label>
            <input type={showPassword ? "text" : "password"} style={styles.input} placeholder="••••••" value={loginData.password} onChange={(e) => setLoginData({...loginData, password: e.target.value})} required />
            <div style={{ marginTop: '5px', fontSize: '12px' }}>
              <input type="checkbox" id="showPassword" onChange={() => setShowPassword(!showPassword)} />
              <label htmlFor="showPassword" style={{ marginLeft: '5px' }}>Show Password</label>
            </div>
          </div>
          <button type="submit" style={styles.loginButton}>Sign In</button>
        </form>
        <div style={styles.demoInfo}>
          <strong>Demo Credentials:</strong><br />
          Email: admin@example.com<br />
          Password: admin123
        </div>
      </div>
    </div>
  );
};

export default Login;