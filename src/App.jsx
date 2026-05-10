import React, { useState } from 'react';

const App = () => {
  // Authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // State management for appointments
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      name: 'Charles Smith',
      phone: '+1(555) 123-4567',
      email: 'charles@example.com',
      date: '2026-05-10',
      time: '10:00 AM',
      endTime: '12:00 PM',
      floor: '3rd floor',
      status: 'Active',
      priority: 'High',
      type: 'Consultation'
    },
    {
      id: 2,
      name: 'John Smith',
      phone: '+1234567890',
      email: 'johnsmith@example.com',
      date: '2026-05-10',
      time: '2:00 PM',
      endTime: '3:00 PM',
      floor: '2nd floor',
      status: 'Active',
      priority: 'Medium',
      type: 'Follow-up'
    },
    {
      id: 3,
      name: 'Emma Watson',
      phone: '+1(555) 987-6543',
      email: 'emma@example.com',
      date: '2026-05-11',
      time: '11:00 AM',
      endTime: '12:30 PM',
      floor: '5th floor',
      status: 'Active',
      priority: 'Low',
      type: 'Meeting'
    },
    {
      id: 4,
      name: 'Michael Brown',
      phone: '+1(555) 456-7890',
      email: 'michael@example.com',
      date: '2026-05-09',
      time: '3:00 PM',
      endTime: '4:00 PM',
      floor: '1st floor',
      status: 'Completed',
      priority: 'High',
      type: 'Consultation'
    }
  ]);

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [dateRange, setDateRange] = useState({ from: '2026-05-01', to: '2026-05-31' });
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [workflowStep, setWorkflowStep] = useState(1);
  const [newAppointment, setNewAppointment] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    endTime: '',
    floor: '',
    type: 'Consultation',
    priority: 'Medium'
  });

  // Handle login
  const handleLogin = (e) => {
    e.preventDefault();
    // Demo credentials: admin@example.com / admin123
    if (loginData.email === 'admin@gmail.com' && loginData.password === 'admin123') {
      setIsLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Invalid email or password. Use: admin@gmail.com / admin123');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginData({ email: '', password: '' });
  };

  // Today's date
  const today = new Date().toISOString().split('T')[0];
  
  // Get today's appointments
  const todayAppointments = appointments.filter(apt => apt.date === today && apt.status === 'Active');
  
  // Get next appointment (soonest future date)
  const nextAppointment = [...appointments]
    .filter(apt => apt.status === 'Active' && new Date(apt.date) >= new Date())
    .sort((a, b) => new Date(a.date) - new Date(b.date))[0];

  // Get upcoming appointments (next 7 days)
  const upcomingAppointments = appointments.filter(apt => {
    const aptDate = new Date(apt.date);
    const todayDate = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(todayDate.getDate() + 7);
    return apt.status === 'Active' && aptDate >= todayDate && aptDate <= nextWeek;
  });

  // Filter appointments based on search and filters
  const filteredAppointments = appointments.filter(apt => {
    const matchesSearch = 
      apt.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.phone.includes(searchTerm) ||
      apt.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'All' || apt.status === filterStatus;
    
    const aptDate = new Date(apt.date);
    const fromDate = new Date(dateRange.from);
    const toDate = new Date(dateRange.to);
    const matchesDateRange = aptDate >= fromDate && aptDate <= toDate;
    
    return matchesSearch && matchesStatus && matchesDateRange;
  });

  // Add new appointment
  const addAppointment = () => {
    if (newAppointment.name && newAppointment.date && newAppointment.time) {
      const newId = Math.max(...appointments.map(a => a.id), 0) + 1;
      setAppointments([...appointments, { ...newAppointment, id: newId, status: 'Active' }]);
      setNewAppointment({ name: '', phone: '', email: '', date: '', time: '', endTime: '', floor: '', type: 'Consultation', priority: 'Medium' });
      setShowAddForm(false);
      alert('✅ Appointment added successfully!');
    } else {
      alert('Please fill all required fields!');
    }
  };

  // Update appointment status
  const updateStatus = (id, newStatus) => {
    setAppointments(appointments.map(apt => 
      apt.id === id ? { ...apt, status: newStatus } : apt
    ));
    alert(`Appointment marked as ${newStatus}`);
  };

  // Delete appointment
  const deleteAppointment = (id) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      setAppointments(appointments.filter(apt => apt.id !== id));
      alert('Appointment deleted successfully!');
    }
  };

  // Handle next appointment time selection
  const handleNextTimeSelect = (time) => {
    setSelectedTimeSlot(time);
    if (nextAppointment) {
      alert(`Next appointment scheduled for ${nextAppointment.date} at ${time}`);
    }
  };

  // Handle workflow next step
  const nextWorkflowStep = () => {
    if (workflowStep < 4) {
      setWorkflowStep(workflowStep + 1);
    } else {
      alert('Workflow completed! Appointment will be scheduled.');
      setWorkflowStep(1);
    }
  };

  // Get statistics
  const stats = {
    total: appointments.length,
    active: appointments.filter(a => a.status === 'Active').length,
    completed: appointments.filter(a => a.status === 'Completed').length,
    today: todayAppointments.length,
    upcoming: upcomingAppointments.length
  };

  // Time slots for today
  const timeSlots = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'];

  // Login Page Styles
  const loginStyles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: 'Segoe UI, Roboto, Arial, sans-serif'
    },
    loginBox: {
      backgroundColor: 'white',
      padding: '40px',
      borderRadius: '20px',
      boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
      width: '400px',
      maxWidth: '90%'
    },
    loginHeader: {
      textAlign: 'center',
      marginBottom: '30px'
    },
    loginTitle: {
      fontSize: '28px',
      color: '#333',
      marginBottom: '10px'
    },
    loginSubtitle: {
      color: '#666',
      fontSize: '14px'
    },
    inputGroup: {
      marginBottom: '20px'
    },
    inputLabel: {
      display: 'block',
      marginBottom: '8px',
      color: '#555',
      fontWeight: '500'
    },
    input: {
      width: '100%',
      padding: '12px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      fontSize: '14px',
      transition: 'border-color 0.3s'
    },
    loginButton: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#667eea',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'background-color 0.3s'
    },
    errorMsg: {
      backgroundColor: '#fee',
      color: '#c33',
      padding: '10px',
      borderRadius: '8px',
      marginBottom: '20px',
      fontSize: '14px',
      textAlign: 'center'
    },
    demoInfo: {
      marginTop: '20px',
      padding: '15px',
      backgroundColor: '#f8f9fa',
      borderRadius: '8px',
      fontSize: '12px',
      textAlign: 'center',
      color: '#666'
    }
  };

  // Dashboard Styles
  const dashboardStyles = {
    app: {
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: '#f0f2f5',
      fontFamily: 'Segoe UI, Roboto, Arial, sans-serif'
    },
    sidebar: {
      width: sidebarOpen ? '280px' : '80px',
      backgroundColor: '#1a1a2e',
      color: 'white',
      transition: 'all 0.3s ease',
      display: 'flex',
      flexDirection: 'column',
      position: 'fixed',
      height: '100vh',
      overflowY: 'auto',
      zIndex: 1000
    },
    sidebarHeader: {
      padding: '20px',
      borderBottom: '1px solid #2d2d4e',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    logo: {
      fontSize: sidebarOpen ? '20px' : '0',
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      whiteSpace: 'nowrap',
      overflow: 'hidden'
    },
    toggleBtn: {
      background: 'none',
      border: 'none',
      color: 'white',
      cursor: 'pointer',
      fontSize: '20px'
    },
    menuItem: {
      padding: '12px 20px',
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      backgroundColor: activeMenu === 'dashboard' ? '#0f3460' : 'transparent',
      margin: '5px 10px',
      borderRadius: '10px'
    },
    menuIcon: {
      fontSize: '20px',
      minWidth: '30px'
    },
    menuText: {
      display: sidebarOpen ? 'block' : 'none',
      fontSize: '14px'
    },
    mainContent: {
      flex: 1,
      marginLeft: sidebarOpen ? '280px' : '80px',
      transition: 'all 0.3s ease',
      padding: '20px',
      backgroundColor: '#f0f2f5'
    },
    header: {
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '15px',
      marginBottom: '20px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    headerTitle: {
      margin: 0,
      fontSize: '28px',
      color: '#1a1a2e'
    },
    headerSub: {
      margin: '5px 0 0',
      fontSize: '14px',
      color: '#666'
    },
    logoutBtn: {
      backgroundColor: '#e74c3c',
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '14px'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '20px',
      marginBottom: '20px'
    },
    statCard: {
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '15px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
      textAlign: 'center',
      cursor: 'pointer',
      transition: 'transform 0.3s'
    },
    statNumber: {
      fontSize: '32px',
      fontWeight: 'bold',
      color: '#0f3460'
    },
    statLabel: {
      fontSize: '14px',
      color: '#666',
      marginTop: '5px'
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '15px',
      padding: '20px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
      marginBottom: '20px'
    },
    cardTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '15px',
      color: '#1a1a2e',
      borderLeft: '4px solid #0f3460',
      paddingLeft: '12px'
    },
    todayItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px',
      borderBottom: '1px solid #eee',
      cursor: 'pointer'
    },
    todayTime: {
      fontWeight: 'bold',
      color: '#0f3460',
      minWidth: '100px'
    },
    todayName: {
      flex: 1,
      marginLeft: '15px'
    },
    badge: {
      padding: '4px 12px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: 'bold'
    },
    badgeHigh: { backgroundColor: '#e74c3c', color: 'white' },
    badgeMedium: { backgroundColor: '#f39c12', color: 'white' },
    badgeLow: { backgroundColor: '#27ae60', color: 'white' },
    timeSlotBtn: {
      padding: '10px 20px',
      backgroundColor: '#f0f2f5',
      border: '1px solid #ddd',
      borderRadius: '10px',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    selectedTimeSlot: {
      backgroundColor: '#0f3460',
      color: 'white',
      borderColor: '#0f3460'
    },
    workflowStep: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '20px'
    },
    stepCircle: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      backgroundColor: '#ddd',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 'bold'
    },
    stepActive: {
      backgroundColor: '#0f3460',
      color: 'white'
    },
    stepComplete: {
      backgroundColor: '#27ae60',
      color: 'white'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      overflowX: 'auto',
      display: 'block'
    },
    th: {
      textAlign: 'left',
      padding: '12px',
      backgroundColor: '#f8f9fa',
      fontWeight: 'bold',
      borderBottom: '2px solid #dee2e6'
    },
    td: {
      padding: '12px',
      borderBottom: '1px solid #dee2e6'
    },
    button: {
      backgroundColor: '#0f3460',
      color: 'white',
      border: 'none',
      padding: '8px 16px',
      borderRadius: '8px',
      cursor: 'pointer',
      marginRight: '8px',
      fontSize: '13px'
    },
    buttonSuccess: {
      backgroundColor: '#27ae60'
    },
    buttonDanger: {
      backgroundColor: '#e74c3c'
    },
    searchBox: {
      width: '100%',
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      fontSize: '14px'
    },
    formGroup: {
      marginBottom: '15px'
    },
    formInput: {
      width: '100%',
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      fontSize: '14px'
    },
    modal: {
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
      padding: '30px',
      borderRadius: '15px',
      width: '500px',
      maxWidth: '90%'
    }
  };

  // Login Component
  if (!isLoggedIn) {
    return (
      <div style={loginStyles.container}>
        <div style={loginStyles.loginBox}>
          <div style={loginStyles.loginHeader}>
            <div style={{ fontSize: '50px', marginBottom: '10px' }}>📅</div>
            <h1 style={loginStyles.loginTitle}>Appoint</h1>
            <p style={loginStyles.loginSubtitle}>Appointment Management System</p>
          </div>
          
          {loginError && <div style={loginStyles.errorMsg}>{loginError}</div>}
          
          <form onSubmit={handleLogin}>
            <div style={loginStyles.inputGroup}>
              <label style={loginStyles.inputLabel}>Email Address</label>
              <input
                type="email"
                style={loginStyles.input}
                placeholder="admin@example.com"
                value={loginData.email}
                onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                required
              />
            </div>
            
            <div style={loginStyles.inputGroup}>
              <label style={loginStyles.inputLabel}>Password</label>
              <input
                type={showPassword ? "text" : "password"}
                style={loginStyles.input}
                placeholder="••••••"
                value={loginData.password}
                onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                required
              />
              <div style={{ marginTop: '5px', fontSize: '12px' }}>
                <input
                  type="checkbox"
                  id="showPassword"
                  onChange={() => setShowPassword(!showPassword)}
                />
                <label htmlFor="showPassword" style={{ marginLeft: '5px' }}>Show Password</label>
              </div>
            </div>
            
            <button type="submit" style={loginStyles.loginButton}>Sign In</button>
          </form>
          
          <div style={loginStyles.demoInfo}>
            <strong>Demo Credentials:</strong><br />
            Email: admin@example.com<br />
            Password: admin123
          </div>
        </div>
      </div>
    );
  }

  // Dashboard Component
  return (
    <div style={dashboardStyles.app}>
      {/* Sidebar */}
      <div style={dashboardStyles.sidebar}>
        <div style={dashboardStyles.sidebarHeader}>
          <div style={dashboardStyles.logo}>
            📅 {sidebarOpen && 'AppointPro'}
          </div>
          <button style={dashboardStyles.toggleBtn} onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? '◀' : '▶'}
          </button>
        </div>
        
        <div style={{ flex: 1, marginTop: '20px' }}>
          {['dashboard', 'calendar', 'workflow', 'reports', 'settings'].map(menu => (
            <div
              key={menu}
              style={{ ...dashboardStyles.menuItem, backgroundColor: activeMenu === menu ? '#0f3460' : 'transparent' }}
              onClick={() => setActiveMenu(menu)}
            >
              <span style={dashboardStyles.menuIcon}>
                {menu === 'dashboard' && '📊'}
                {menu === 'calendar' && '📅'}
                {menu === 'workflow' && '⚡'}
                {menu === 'reports' && '📈'}
                {menu === 'settings' && '⚙️'}
              </span>
              <span style={dashboardStyles.menuText}>
                {menu === 'dashboard' && 'Dashboard'}
                {menu === 'calendar' && 'Calendar'}
                {menu === 'workflow' && 'Workflow'}
                {menu === 'reports' && 'Reports'}
                {menu === 'settings' && 'Settings'}
              </span>
            </div>
          ))}
        </div>
        
        <div style={{ padding: '20px', borderTop: '1px solid #2d2d4e', fontSize: '12px', textAlign: 'center' }}>
          {sidebarOpen && 'Admin Panel v1.0'}
        </div>
      </div>

      {/* Main Content */}
      <div style={dashboardStyles.mainContent}>
        {/* Header */}
        <div style={dashboardStyles.header}>
          <div>
            <h1 style={dashboardStyles.headerTitle}>Welcome back, Admin 👋</h1>
            <p style={dashboardStyles.headerSub}>Manage your appointments efficiently with real-time updates</p>
          </div>
          <button style={dashboardStyles.logoutBtn} onClick={handleLogout}>
            Logout
          </button>
        </div>

        {/* Statistics Cards */}
        <div style={dashboardStyles.statsGrid}>
          <div style={dashboardStyles.statCard}>
            <div style={dashboardStyles.statNumber}>{stats.total}</div>
            <div style={dashboardStyles.statLabel}>Total Appointments</div>
          </div>
          <div style={dashboardStyles.statCard}>
            <div style={dashboardStyles.statNumber}>{stats.active}</div>
            <div style={dashboardStyles.statLabel}>Active</div>
          </div>
          <div style={dashboardStyles.statCard}>
            <div style={dashboardStyles.statNumber}>{stats.completed}</div>
            <div style={dashboardStyles.statLabel}>Completed</div>
          </div>
          <div style={dashboardStyles.statCard}>
            <div style={dashboardStyles.statNumber}>{stats.today}</div>
            <div style={dashboardStyles.statLabel}>Today's Appointments</div>
          </div>
          <div style={dashboardStyles.statCard}>
            <div style={dashboardStyles.statNumber}>{stats.upcoming}</div>
            <div style={dashboardStyles.statLabel}>Upcoming (7 days)</div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
          {/* Today's Appointments */}
          <div style={dashboardStyles.card}>
            <h3 style={dashboardStyles.cardTitle}>📋 Today's Appointments ({todayAppointments.length})</h3>
            {todayAppointments.length > 0 ? (
              todayAppointments.map(apt => (
                <div key={apt.id} style={dashboardStyles.todayItem}>
                  <div style={dashboardStyles.todayTime}>{apt.time}</div>
                  <div style={dashboardStyles.todayName}>
                    <strong>{apt.name}</strong><br />
                    <small>{apt.type} • {apt.floor}</small>
                  </div>
                  <div>
                    <span style={{ ...dashboardStyles.badge, ...(apt.priority === 'High' ? dashboardStyles.badgeHigh : apt.priority === 'Medium' ? dashboardStyles.badgeMedium : dashboardStyles.badgeLow) }}>
                      {apt.priority}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p style={{ textAlign: 'center', color: '#666' }}>No appointments for today 🎉</p>
            )}
            <button style={{ ...dashboardStyles.button, marginTop: '15px', width: '100%' }} onClick={() => setShowAddForm(true)}>
              + Add Appointment for Today
            </button>
          </div>

          {/* Next Appointment & Workflow */}
          <div style={dashboardStyles.card}>
            <h3 style={dashboardStyles.cardTitle}>⏰ Next Appointment</h3>
            {nextAppointment ? (
              <div style={{ backgroundColor: '#e8f4fd', padding: '15px', borderRadius: '10px', marginBottom: '15px' }}>
                <p><strong>{nextAppointment.name}</strong> - {nextAppointment.floor}</p>
                <p>📞 {nextAppointment.phone}</p>
                <p>📧 {nextAppointment.email}</p>
                <p>📅 {nextAppointment.date} • {nextAppointment.time} - {nextAppointment.endTime}</p>
              </div>
            ) : (
              <p>No upcoming appointments</p>
            )}
            
            <h4>Select Next Appointment Time</h4>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '15px' }}>
              {timeSlots.slice(0, 4).map(time => (
                <button
                  key={time}
                  style={{ ...dashboardStyles.timeSlotBtn, ...(selectedTimeSlot === time ? dashboardStyles.selectedTimeSlot : {}) }}
                  onClick={() => handleNextTimeSelect(time)}
                >
                  {time}
                </button>
              ))}
            </div>
            
            <button style={{ ...dashboardStyles.button, width: '100%' }} onClick={() => alert('Time submitted! Notification sent.')}>
              Submit Next Appointment Time
            </button>
          </div>
        </div>

        {/* Workflow Section */}
        <div style={dashboardStyles.card}>
          <h3 style={dashboardStyles.cardTitle}>⚡ Appointment Workflow</h3>
          <div style={dashboardStyles.workflowStep}>
            {['Select Date', 'Choose Time', 'Confirm Details', 'Schedule'].map((step, index) => (
              <React.Fragment key={index}>
                <div style={{ ...dashboardStyles.stepCircle, ...(workflowStep > index + 1 ? dashboardStyles.stepComplete : workflowStep === index + 1 ? dashboardStyles.stepActive : {}) }}>
                  {workflowStep > index + 1 ? '✓' : index + 1}
                </div>
                {index < 3 && <div style={{ flex: 1, height: '2px', backgroundColor: '#ddd' }}></div>}
              </React.Fragment>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <p style={{ marginBottom: '15px' }}>
              {workflowStep === 1 && 'Step 1: Select appointment date from calendar'}
              {workflowStep === 2 && 'Step 2: Choose available time slot'}
              {workflowStep === 3 && 'Step 3: Review appointment details'}
              {workflowStep === 4 && 'Step 4: Confirm and schedule appointment'}
            </p>
            <button style={dashboardStyles.button} onClick={nextWorkflowStep}>
              {workflowStep === 4 ? 'Complete Workflow' : 'Next Step →'}
            </button>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div style={dashboardStyles.card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
            <input
              type="text"
              style={{ ...dashboardStyles.searchBox, width: '300px' }}
              placeholder="🔍 Search by name, phone or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <select style={dashboardStyles.formInput} value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Completed">Completed</option>
              </select>
              <input type="date" style={dashboardStyles.formInput} value={dateRange.from} onChange={(e) => setDateRange({...dateRange, from: e.target.value})} />
              <span>to</span>
              <input type="date" style={dashboardStyles.formInput} value={dateRange.to} onChange={(e) => setDateRange({...dateRange, to: e.target.value})} />
              <button style={dashboardStyles.button} onClick={() => setShowAddForm(true)}>+ New Appointment</button>
            </div>
          </div>

          {/* Appointments Table */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={dashboardStyles.th}>Name</th>
                  <th style={dashboardStyles.th}>Contact</th>
                  <th style={dashboardStyles.th}>Date & Time</th>
                  <th style={dashboardStyles.th}>Type</th>
                  <th style={dashboardStyles.th}>Priority</th>
                  <th style={dashboardStyles.th}>Status</th>
                  <th style={dashboardStyles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.map(apt => (
                  <tr key={apt.id}>
                    <td style={dashboardStyles.td}>
                      <strong>{apt.name}</strong><br />
                      <small>{apt.floor}</small>
                    </td>
                    <td style={dashboardStyles.td}>
                      {apt.phone}<br />
                      <small>{apt.email}</small>
                    </td>
                    <td style={dashboardStyles.td}>
                      {apt.date}<br />
                      <small>{apt.time} - {apt.endTime}</small>
                    </td>
                    <td style={dashboardStyles.td}>{apt.type}</td>
                    <td style={dashboardStyles.td}>
                      <span style={{ ...dashboardStyles.badge, ...(apt.priority === 'High' ? dashboardStyles.badgeHigh : apt.priority === 'Medium' ? dashboardStyles.badgeMedium : dashboardStyles.badgeLow) }}>
                        {apt.priority}
                      </span>
                    </td>
                    <td style={dashboardStyles.td}>
                      <span style={{ ...dashboardStyles.badge, backgroundColor: apt.status === 'Active' ? '#27ae60' : '#95a5a6' }}>
                        {apt.status}
                      </span>
                    </td>
                    <td style={dashboardStyles.td}>
                      {apt.status === 'Active' ? (
                        <button style={{ ...dashboardStyles.button, ...dashboardStyles.buttonSuccess }} onClick={() => updateStatus(apt.id, 'Completed')}>
                          Complete
                        </button>
                      ) : (
                        <button style={dashboardStyles.button} onClick={() => updateStatus(apt.id, 'Active')}>
                          Reactivate
                        </button>
                      )}
                      <button style={{ ...dashboardStyles.button, ...dashboardStyles.buttonDanger }} onClick={() => deleteAppointment(apt.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Future Time Slots */}
        <div style={dashboardStyles.card}>
          <h3 style={dashboardStyles.cardTitle}>📅Today Available Time Slots</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '10px' }}>
            {timeSlots.map(slot => (
              <button
                key={slot}
                style={dashboardStyles.timeSlotBtn}
                onClick={() => {
                  setSelectedTimeSlot(slot);
                  alert(`Selected time slot: ${slot}`);
                }}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Add Appointment Modal */}
      {showAddForm && (
        <div style={dashboardStyles.modal} onClick={() => setShowAddForm(false)}>
          <div style={dashboardStyles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ marginBottom: '20px' }}>New Appointment</h2>
            <div style={dashboardStyles.formGroup}>
              <input style={dashboardStyles.formInput} placeholder="Full Name *" value={newAppointment.name} onChange={(e) => setNewAppointment({...newAppointment, name: e.target.value})} />
            </div>
            <div style={dashboardStyles.formGroup}>
              <input style={dashboardStyles.formInput} placeholder="Phone Number *" value={newAppointment.phone} onChange={(e) => setNewAppointment({...newAppointment, phone: e.target.value})} />
            </div>
            <div style={dashboardStyles.formGroup}>
              <input style={dashboardStyles.formInput} placeholder="Email" value={newAppointment.email} onChange={(e) => setNewAppointment({...newAppointment, email: e.target.value})} />
            </div>
            <div style={dashboardStyles.formGroup}>
              <input type="date" style={dashboardStyles.formInput} value={newAppointment.date} onChange={(e) => setNewAppointment({...newAppointment, date: e.target.value})} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '15px' }}>
              <input style={dashboardStyles.formInput} placeholder="Start Time *" value={newAppointment.time} onChange={(e) => setNewAppointment({...newAppointment, time: e.target.value})} />
              <input style={dashboardStyles.formInput} placeholder="End Time" value={newAppointment.endTime} onChange={(e) => setNewAppointment({...newAppointment, endTime: e.target.value})} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '15px' }}>
              <input style={dashboardStyles.formInput} placeholder="Floor/Location" value={newAppointment.floor} onChange={(e) => setNewAppointment({...newAppointment, floor: e.target.value})} />
              <select style={dashboardStyles.formInput} value={newAppointment.type} onChange={(e) => setNewAppointment({...newAppointment, type: e.target.value})}>
                <option>Consultation</option>
                <option>Follow-up</option>
                <option>Meeting</option>
                <option>Review</option>
              </select>
            </div>
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button style={{ ...dashboardStyles.button, flex: 1 }} onClick={addAppointment}>Save Appointment</button>
              <button style={{ ...dashboardStyles.button, ...dashboardStyles.buttonDanger, flex: 1 }} onClick={() => setShowAddForm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;