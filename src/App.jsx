import React, { useState } from 'react';

const App = () => {
  // Authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  // Resources data
  const resources = [
    { id: 1, name: "Shiveinai", color: "bg-purple-500", type: "staff", price: 1500 },
    { id: 2, name: "Dr. Kritika", color: "bg-pink-500", type: "doctor", price: 2500 },
    { id: 3, name: "Consult...", color: "bg-blue-500", type: "consultation", price: 1000 },
    { id: 4, name: "Fiza", color: "bg-teal-500", type: "staff", price: 1200 },
    { id: 5, name: "Glow Su..", color: "bg-amber-500", type: "service", price: 3000 },
    { id: 6, name: "Glow Su..", color: "bg-amber-500", type: "service", price: 3000 },
    { id: 7, name: "Harmony", color: "bg-indigo-500", type: "service", price: 4500 },
    { id: 8, name: "Laser Ro..", color: "bg-rose-500", type: "room", price: 5000 },
    { id: 9, name: "Luxe Ro..", color: "bg-cyan-500", type: "room", price: 6000 },
    { id: 10, name: "Operati..", color: "bg-emerald-500", type: "room", price: 8000 },
    { id: 11, name: "Rejuven..", color: "bg-orange-500", type: "room", price: 5500 },
    { id: 12, name: "Dr. Omai..", color: "bg-violet-500", type: "doctor", price: 3000 },
  ];

  // Appointments data
  const [appointments, setAppointments] = useState([
    { id: 1, resId: 1, start: "13:40", end: "14:30", patient: "Mehak Goswami", phone: "9876543210", email: "mehak@example.com", service: "underarms & Underarms", time: "1:30pm", dot: "#10b981", status: "Scheduled", paymentStatus: "Pending", amount: 1500 },
    { id: 2, resId: 4, start: "13:30", end: "14:10", patient: "Namita", phone: "9876543211", email: "namita@example.com", service: "Consultation", time: "1:30pm", dot: "#f59e0b", status: "Waiting", paymentStatus: "Paid", amount: 1200 },
    { id: 3, resId: 5, start: "13:30", end: "14:20", patient: "Mehak Goswami", phone: "9876543210", email: "mehak@example.com", service: "underarms & Underarms", time: "1:30pm", dot: "#10b981", status: "Scheduled", paymentStatus: "Pending", amount: 3000 },
    { id: 4, resId: 2, start: "14:15", end: "15:15", patient: "Shivani Yadav", phone: "9876543212", email: "shivani@example.com", service: "Medifacial + Dr. cons", time: "2:15pm", dot: "#10b981", status: "Scheduled", paymentStatus: "Paid", amount: 2500 },
    { id: 5, resId: 3, start: "14:15", end: "15:15", patient: "Shivani Yadav", phone: "9876543212", email: "shivani@example.com", service: "+ Dr. cons (voucher)", time: "2:15pm", dot: "#10b981", status: "Scheduled", paymentStatus: "Paid", amount: 1000 },
    { id: 6, resId: 6, start: "14:30", end: "15:30", patient: "Ms. Neha Jain", phone: "9876543213", email: "neha@example.com", service: "full body laser", time: "2:30pm", dot: "#f59e0b", status: "Waiting", paymentStatus: "Pending", amount: 3000 },
    { id: 7, resId: 7, start: "15:00", end: "16:00", patient: "Shikha Rai", phone: "9876543214", email: "shikha@example.com", service: "PDRN", time: "3:00pm", dot: "#ef4444", status: "Engaged", paymentStatus: "Paid", amount: 4500 },
    { id: 8, resId: 8, start: "15:00", end: "16:00", patient: "Shikha Rai", phone: "9876543214", email: "shikha@example.com", service: "PDRN", time: "3:00pm", dot: "#ef4444", status: "Engaged", paymentStatus: "Paid", amount: 5000 },
    { id: 9, resId: 9, start: "14:55", end: "16:00", patient: "Radhika", phone: "9876543215", email: "radhika@example.com", service: "consultation and HIFU", time: "2:55pm", dot: "#f59e0b", status: "Waiting", paymentStatus: "Pending", amount: 6000 },
    { id: 10, resId: 10, start: "16:50", end: "17:40", patient: "Vishal", phone: "9876543216", email: "vishal@example.com", service: "Follow-up", time: "4:50pm", dot: "#10b981", status: "Scheduled", paymentStatus: "Paid", amount: 8000 },
    { id: 11, resId: 11, start: "16:50", end: "17:40", patient: "Mansi", phone: "9876543217", email: "mansi@example.com", service: "Consultation", time: "4:50pm", dot: "#10b981", status: "Scheduled", paymentStatus: "Pending", amount: 5500 },
    { id: 12, resId: 11, start: "17:30", end: "18:10", patient: "Anna Omar", phone: "9876543218", email: "anna@example.com", service: "call her", time: "5:30pm", dot: "#f59e0b", status: "Waiting", paymentStatus: "Pending", amount: 5500 },
    { id: 13, resId: 12, start: "18:00", end: "18:50", patient: "Medha", phone: "9876543219", email: "medha@example.com", service: "follow up consult", time: "6:00pm", dot: "#ef4444", status: "Engaged", paymentStatus: "Paid", amount: 3000 },
    { id: 14, resId: 12, start: "17:55", end: "18:45", patient: "Medha", phone: "9876543219", email: "medha@example.com", service: "follow up", time: "5:55pm", dot: "#ef4444", status: "Engaged", paymentStatus: "Paid", amount: 3000 },
  ]);

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState('calendar');
  const [currentDate, setCurrentDate] = useState(new Date(2026, 4, 10));
  const [view, setView] = useState('Day');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [receiptGenerated, setReceiptGenerated] = useState(null);
  const [filters, setFilters] = useState({ resource: '', status: '', paymentStatus: '' });
  
  const [newAppointment, setNewAppointment] = useState({
    patient: '',
    phone: '',
    email: '',
    service: '',
    resourceId: '',
    startTime: '',
    endTime: '',
    status: 'Scheduled',
    amount: 0
  });

  // Admin users
  const [adminUsers] = useState([
    { id: 1, name: "Admin User", email: "admin@example.com", role: "Super Admin" },
    { id: 2, name: "Mohit juneja", email: "mohit@example.com", role: "Manager" }
  ]);

  // Statistics
  const stats = {
    scheduled: appointments.filter(a => a.status === 'Scheduled').length,
    waiting: appointments.filter(a => a.status === 'Waiting').length,
    engaged: appointments.filter(a => a.status === 'Engaged').length,
    checkedOut: appointments.filter(a => a.paymentStatus === 'Paid').length,
    totalRevenue: appointments.filter(a => a.paymentStatus === 'Paid').reduce((sum, a) => sum + a.amount, 0),
    pendingAmount: appointments.filter(a => a.paymentStatus === 'Pending').reduce((sum, a) => sum + a.amount, 0)
  };

  // Time helper
  const timeToMinutes = (t) => {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
  };

  const startHour = 12;
  const endHour = 19;
  const hourHeight = 96;
  const hours = Array.from({ length: endHour - startHour + 1 }, (_, i) => startHour + i);

  // Handle login
  const handleLogin = (e) => {
    e.preventDefault();
    const user = adminUsers.find(u => u.email === loginData.email);
    if (user && loginData.password === 'admin123') {
      setIsLoggedIn(true);
      setLoggedInUser(user);
      setLoginError('');
    } else {
      setLoginError('Invalid credentials. Use: admin@example.com / admin123');
    }
  };

  // Generate Payment Slip
  const generatePaymentSlip = (appointment, method) => {
    const slip = {
      id: `INV-${Date.now()}`,
      date: new Date().toLocaleString(),
      patientName: appointment.patient,
      patientPhone: appointment.phone,
      patientEmail: appointment.email,
      service: appointment.service,
      resource: resources.find(r => r.id === appointment.resId)?.name || 'Unknown',
      amount: appointment.amount,
      paymentMethod: method,
      status: 'Paid',
      appointmentDate: appointment.start,
      generatedBy: loggedInUser?.name || 'Admin'
    };
    setReceiptGenerated(slip);
    return slip;
  };

  // Process payment
  const processPayment = () => {
    if (selectedAppointment) {
      const updatedAppointments = appointments.map(apt =>
        apt.id === selectedAppointment.id
          ? { ...apt, paymentStatus: 'Paid', status: 'Completed' }
          : apt
      );
      setAppointments(updatedAppointments);
      generatePaymentSlip(selectedAppointment, paymentMethod);
      setShowPaymentModal(false);
      alert(`Payment of ₹${selectedAppointment.amount} received successfully! Receipt generated.`);
    }
  };

  // Add new appointment
  const addAppointment = () => {
    if (newAppointment.patient && newAppointment.resourceId && newAppointment.startTime) {
      const resource = resources.find(r => r.id === parseInt(newAppointment.resourceId));
      const newId = Math.max(...appointments.map(a => a.id), 0) + 1;
      setAppointments([...appointments, {
        id: newId,
        resId: parseInt(newAppointment.resourceId),
        start: newAppointment.startTime,
        end: newAppointment.endTime || `${parseInt(newAppointment.startTime.split(':')[0]) + 1}:${newAppointment.startTime.split(':')[1]}`,
        patient: newAppointment.patient,
        phone: newAppointment.phone,
        email: newAppointment.email,
        service: newAppointment.service,
        time: newAppointment.startTime,
        dot: '#10b981',
        status: newAppointment.status,
        paymentStatus: 'Pending',
        amount: newAppointment.amount || resource?.price || 0
      }]);
      setNewAppointment({ patient: '', phone: '', email: '', service: '', resourceId: '', startTime: '', endTime: '', status: 'Scheduled', amount: 0 });
      setShowAddModal(false);
      alert('Appointment added successfully!');
    } else {
      alert('Please fill all required fields!');
    }
  };

  // Update appointment status
  const updateStatus = (id, newStatus) => {
    setAppointments(appointments.map(apt =>
      apt.id === id ? { ...apt, status: newStatus, dot: newStatus === 'Scheduled' ? '#10b981' : newStatus === 'Waiting' ? '#f59e0b' : '#ef4444' } : apt
    ));
  };

  // Delete appointment
  const deleteAppointment = (id) => {
    if (window.confirm('Delete this appointment?')) {
      setAppointments(appointments.filter(apt => apt.id !== id));
    }
  };

  // Filter appointments
  const filteredAppointments = appointments.filter(apt => {
    if (filters.resource && apt.resId !== parseInt(filters.resource)) return false;
    if (filters.status && apt.status !== filters.status) return false;
    if (filters.paymentStatus && apt.paymentStatus !== filters.paymentStatus) return false;
    return true;
  });

  // Navigate date
  const navigateDate = (direction) => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setDate(currentDate.getDate() - 1);
    } else {
      newDate.setDate(currentDate.getDate() + 1);
    }
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Print receipt
  const printReceipt = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Payment Receipt</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 40px; }
            .receipt { max-width: 500px; margin: 0 auto; border: 1px solid #ddd; padding: 20px; }
            .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 10px; margin-bottom: 20px; }
            .logo { font-size: 24px; font-weight: bold; color: #0ea5e9; }
            .title { font-size: 18px; margin-top: 5px; }
            .details { margin: 20px 0; }
            .row { display: flex; justify-content: space-between; margin: 10px 0; padding: 5px 0; }
            .total { border-top: 2px solid #333; margin-top: 20px; padding-top: 10px; font-weight: bold; font-size: 18px; }
            .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #666; }
            button { margin-top: 20px; padding: 10px 20px; background: #0ea5e9; color: white; border: none; cursor: pointer; }
          </style>
        </head>
        <body>
          <div class="receipt">
            <div class="header">
              <div class="logo">🏥 AppointPro</div>
              <div class="title">Payment Receipt</div>
            </div>
            <div class="details">
              <div class="row"><strong>Receipt No:</strong> <span>${receiptGenerated.id}</span></div>
              <div class="row"><strong>Date:</strong> <span>${receiptGenerated.date}</span></div>
              <div class="row"><strong>Patient Name:</strong> <span>${receiptGenerated.patientName}</span></div>
              <div class="row"><strong>Phone:</strong> <span>${receiptGenerated.patientPhone}</span></div>
              <div class="row"><strong>Email:</strong> <span>${receiptGenerated.patientEmail}</span></div>
              <div class="row"><strong>Service:</strong> <span>${receiptGenerated.service}</span></div>
              <div class="row"><strong>Resource:</strong> <span>${receiptGenerated.resource}</span></div>
              <div class="row"><strong>Appointment Date:</strong> <span>${receiptGenerated.appointmentDate}</span></div>
              <div class="row"><strong>Payment Method:</strong> <span>${receiptGenerated.paymentMethod}</span></div>
              <div class="row total"><strong>Amount Paid:</strong> <span>₹${receiptGenerated.amount}</span></div>
            </div>
            <div class="footer">
              <p>Thank you for choosing AppointPro!</p>
              <p>Generated by: ${receiptGenerated.generatedBy}</p>
            </div>
          </div>
          <div style="text-align: center;">
            <button onclick="window.print();setTimeout(()=>window.close(),500)">Print Receipt</button>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  // Styles
  const loginStyles = {
    container: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', fontFamily: 'Segoe UI, Arial, sans-serif' },
    loginBox: { backgroundColor: 'white', padding: '40px', borderRadius: '20px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)', width: '400px', maxWidth: '90%' },
    loginHeader: { textAlign: 'center', marginBottom: '30px' },
    loginTitle: { fontSize: '28px', color: '#333', marginBottom: '10px' },
    inputGroup: { marginBottom: '20px' },
    inputLabel: { display: 'block', marginBottom: '8px', color: '#555', fontWeight: '500' },
    input: { width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px' },
    loginButton: { width: '100%', padding: '12px', backgroundColor: '#667eea', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' },
    errorMsg: { backgroundColor: '#fee', color: '#c33', padding: '10px', borderRadius: '8px', marginBottom: '20px', fontSize: '14px', textAlign: 'center' },
    demoInfo: { marginTop: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px', fontSize: '12px', textAlign: 'center', color: '#666' }
  };

  const styles = {
    app: { display: 'flex', minHeight: '100vh', backgroundColor: '#f0f2f5', fontFamily: 'Segoe UI, Arial, sans-serif' },
    sidebar: { width: sidebarOpen ? '260px' : '70px', backgroundColor: '#1a1a2e', color: 'white', transition: 'all 0.3s ease', display: 'flex', flexDirection: 'column', position: 'fixed', height: '100vh', overflowY: 'auto', zIndex: 1000 },
    sidebarHeader: { padding: '20px', borderBottom: '1px solid #2d2d4e', display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
    logo: { fontSize: sidebarOpen ? '20px' : '0', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px', whiteSpace: 'nowrap', overflow: 'hidden' },
    toggleBtn: { background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '20px' },
    menuItem: { padding: '12px 20px', display: 'flex', alignItems: 'center', gap: '15px', cursor: 'pointer', transition: 'all 0.3s ease', backgroundColor: activeMenu === 'calendar' ? '#0f3460' : 'transparent', margin: '5px 10px', borderRadius: '10px' },
    menuIcon: { fontSize: '20px', minWidth: '30px' },
    menuText: { display: sidebarOpen ? 'block' : 'none', fontSize: '14px' },
    mainContent: { flex: 1, marginLeft: sidebarOpen ? '260px' : '70px', transition: 'all 0.3s ease', backgroundColor: '#f5f6f8' },
    topNavbar: { backgroundColor: 'white', borderBottom: '1px solid #e5e7eb' },
    navbarInner: { display: 'flex', alignItems: 'center', height: '56px', padding: '0 16px', gap: '16px' },
    logoIcon: { width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#0ea5e9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' },
    navButtons: { display: 'flex', alignItems: 'center', gap: '20px' },
    navButton: { padding: '10px 0', borderBottom: '2px solid transparent', background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', color: '#6b7280' },
    activeNavButton: { borderBottomColor: '#0ea5e9', color: '#0ea5e9', fontWeight: '600' },
    userInfo: { marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '12px' },
    userName: { fontSize: '13px', color: '#6b7280' },
    userAvatar: { width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#e5e7eb' },
    statusBar: { backgroundColor: 'white', borderBottom: '1px solid #e5e7eb', padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' },
    statBox: { display: 'flex', alignItems: 'center', gap: '8px' },
    statNumber: { width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid', fontSize: '14px', fontWeight: '600' },
    statLabel: { fontSize: '13px', color: '#6b7280' },
    dateControls: { marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' },
    dateButton: { padding: '4px 12px', fontSize: '12px', border: '1px solid #e5e7eb', borderRadius: '6px', background: 'white', cursor: 'pointer' },
    dateDisplay: { display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 12px', border: '1px solid #e5e7eb', borderRadius: '6px', background: 'white' },
    viewToggle: { display: 'flex', border: '1px solid #e5e7eb', borderRadius: '6px', overflow: 'hidden' },
    viewButton: { padding: '4px 12px', fontSize: '12px', background: 'white', border: 'none', cursor: 'pointer' },
    activeViewButton: { background: '#0ea5e9', color: 'white' },
    mainLayout: { display: 'flex', flex: 1, overflow: 'hidden' },
    leftPanel: { width: '280px', backgroundColor: 'white', borderRight: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column' },
    leftPanelHeader: { padding: '16px', borderBottom: '1px solid #e5e7eb' },
    filterSection: { padding: '16px', borderBottom: '1px solid #e5e7eb' },
    filterSelect: { width: '100%', padding: '8px', marginBottom: '8px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '12px' },
    notConfirmed: { fontSize: '13px', color: '#6b7280' },
    revenueCard: { padding: '16px', backgroundColor: '#f0fdf4', margin: '12px', borderRadius: '8px' },
    revenueAmount: { fontSize: '24px', fontWeight: 'bold', color: '#10b981' },
    noAppointments: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '24px' },
    addButton: { backgroundColor: '#10b981', color: 'white', border: 'none', padding: '4px 12px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer', marginLeft: '4px' },
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
    paymentBadge: { fontSize: '8px', padding: '2px 4px', borderRadius: '4px', display: 'inline-block', marginTop: '2px' },
    modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 },
    modalContent: { backgroundColor: 'white', padding: '24px', borderRadius: '16px', width: '500px', maxWidth: '90%', maxHeight: '80vh', overflowY: 'auto' },
    modalTitle: { fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' },
    formGroup: { marginBottom: '16px' },
    formLabel: { display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '500', color: '#374151' },
    formInput: { width: '100%', padding: '10px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '14px' },
    selectInput: { width: '100%', padding: '10px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '14px', background: 'white' },
    buttonGroup: { display: 'flex', gap: '12px', marginTop: '20px' },
    saveBtn: { flex: 1, padding: '10px', backgroundColor: '#0ea5e9', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' },
    cancelBtn: { flex: 1, padding: '10px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' },
    paymentBtn: { padding: '4px 8px', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '4px', fontSize: '10px', cursor: 'pointer', marginTop: '4px' },
    logoutBtn: { backgroundColor: '#ef4444', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '12px' }
  };

  // Login Component
  if (!isLoggedIn) {
    return (
      <div style={loginStyles.container}>
        <div style={loginStyles.loginBox}>
          <div style={loginStyles.loginHeader}>
            <div style={{ fontSize: '50px', marginBottom: '10px' }}>📅</div>
            <h1 style={loginStyles.loginTitle}>AppointPro</h1>
            <p style={{ color: '#666', fontSize: '14px' }}>Appointment Management System</p>
          </div>
          {loginError && <div style={loginStyles.errorMsg}>{loginError}</div>}
          <form onSubmit={handleLogin}>
            <div style={loginStyles.inputGroup}>
              <label style={loginStyles.inputLabel}>Email Address</label>
              <input type="email" style={loginStyles.input} placeholder="admin@example.com" value={loginData.email} onChange={(e) => setLoginData({...loginData, email: e.target.value})} required />
            </div>
            <div style={loginStyles.inputGroup}>
              <label style={loginStyles.inputLabel}>Password</label>
              <input type={showPassword ? "text" : "password"} style={loginStyles.input} placeholder="••••••" value={loginData.password} onChange={(e) => setLoginData({...loginData, password: e.target.value})} required />
              <div style={{ marginTop: '5px', fontSize: '12px' }}>
                <input type="checkbox" id="showPassword" onChange={() => setShowPassword(!showPassword)} />
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
    <div style={styles.app}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <div style={styles.logo}>📅 {sidebarOpen && 'AppointPro'}</div>
          <button style={styles.toggleBtn} onClick={() => setSidebarOpen(!sidebarOpen)}>{sidebarOpen ? '◀' : '▶'}</button>
        </div>
        <div style={{ flex: 1, marginTop: '20px' }}>
          {['Dashboard', 'Calendar', 'Appointments', 'Payments', 'Reports', 'Settings'].map(menu => (
            <div key={menu} style={{ ...styles.menuItem, backgroundColor: activeMenu === menu.toLowerCase() ? '#0f3460' : 'transparent' }} onClick={() => setActiveMenu(menu.toLowerCase())}>
              <span style={styles.menuIcon}>
                {menu === 'Dashboard' && '📊'}
                {menu === 'Calendar' && '📅'}
                {menu === 'Appointments' && '📋'}
                {menu === 'Payments' && '💰'}
                {menu === 'Reports' && '📈'}
                {menu === 'Settings' && '⚙️'}
              </span>
              <span style={styles.menuText}>{menu}</span>
            </div>
          ))}
        </div>
        <div style={{ padding: '20px', borderTop: '1px solid #2d2d4e', fontSize: '12px', textAlign: 'center' }}>
          {sidebarOpen && `👤 ${loggedInUser?.name}`}
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Top Navbar */}
        <div style={styles.topNavbar}>
          <div style={styles.navbarInner}>
            <div style={styles.logoIcon}>C</div>
            <div style={styles.navButtons}>
              {['CRM', 'Calendar', 'Client', 'Financials', 'Inventory', 'Documents', 'Report', 'Tools'].map(item => (
                <button key={item} style={{ ...styles.navButton, ...(item === 'Calendar' ? styles.activeNavButton : {}) }}>{item}</button>
              ))}
            </div>
            <div style={styles.userInfo}>
              <span style={styles.userName}>{loggedInUser?.name}</span>
              <div style={styles.userAvatar} />
              <button style={styles.logoutBtn} onClick={() => setIsLoggedIn(false)}>Logout</button>
            </div>
          </div>
        </div>

        {/* Status Bar with Revenue */}
        <div style={styles.statusBar}>
          {[
            { label: "Scheduled", count: stats.scheduled, color: "#0ea5e9" },
            { label: "Waiting", count: stats.waiting, color: "#f59e0b" },
            { label: "Engaged", count: stats.engaged, color: "#ef4444" },
            { label: "Check Out", count: stats.checkedOut, color: "#0ea5e9" },
            { label: "Revenue", count: `₹${stats.totalRevenue}`, color: "#10b981" },
            { label: "Pending", count: `₹${stats.pendingAmount}`, color: "#f59e0b" }
          ].map((s) => (
            <div key={s.label} style={styles.statBox}>
              <div style={{ ...styles.statNumber, borderColor: s.color, color: s.color }}>{s.count}</div>
              <span style={styles.statLabel}>{s.label}</span>
            </div>
          ))}
          <div style={styles.dateControls}>
            <button style={styles.dateButton} onClick={goToToday}>Today</button>
            <button style={styles.dateButton} onClick={() => navigateDate('prev')}>{'<'}</button>
            <div style={styles.dateDisplay}>
              <span>{formatDate(currentDate)}</span>
            </div>
            <button style={styles.dateButton} onClick={() => navigateDate('next')}>{'>'}</button>
            <div style={styles.viewToggle}>
              {['Day', 'Week'].map(v => (
                <button key={v} onClick={() => setView(v)} style={{ ...styles.viewButton, ...(view === v ? styles.activeViewButton : {}) }}>{v}</button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Layout */}
        <div style={styles.mainLayout}>
          {/* Left Panel with Filters */}
          <div style={styles.leftPanel}>
            <div style={styles.leftPanelHeader}>
              <div style={styles.notConfirmed}>📊 Today's Overview</div>
            </div>
            <div style={styles.filterSection}>
              <h4 style={{ fontSize: '13px', marginBottom: '8px' }}>Filters</h4>
              <select style={styles.filterSelect} value={filters.resource} onChange={(e) => setFilters({...filters, resource: e.target.value})}>
                <option value="">All Resources</option>
                {resources.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
              </select>
              <select style={styles.filterSelect} value={filters.status} onChange={(e) => setFilters({...filters, status: e.target.value})}>
                <option value="">All Status</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Waiting">Waiting</option>
                <option value="Engaged">Engaged</option>
              </select>
              <select style={styles.filterSelect} value={filters.paymentStatus} onChange={(e) => setFilters({...filters, paymentStatus: e.target.value})}>
                <option value="">All Payment</option>
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
            <div style={styles.revenueCard}>
              <div style={{ fontSize: '12px', color: '#666' }}>Today's Revenue</div>
              <div style={styles.revenueAmount}>₹{stats.totalRevenue}</div>
              <div style={{ fontSize: '11px', color: '#666', marginTop: '4px' }}>Pending: ₹{stats.pendingAmount}</div>
            </div>
            <div style={styles.noAppointments}>
              <p style={{ color: '#374151', fontWeight: '500', marginBottom: '8px' }}>Quick Actions</p>
              <button style={styles.addButton} onClick={() => setShowAddModal(true)}>➕ Add Appointment</button>
            </div>
          </div>

          {/* Calendar Area */}
          <div style={styles.calendarArea}>
            <div style={{ minWidth: '800px' }}>
              {/* Resource Header */}
              <div style={styles.resourceHeader}>
                <div style={styles.timeColumn}></div>
                <div style={styles.resourceColumn}>
                  {resources.map(r => (
                    <div key={r.id} style={styles.resourceItem}>
                      <div>
                        <span style={{ ...styles.resourceDot, backgroundColor: r.color.replace('bg-', '').replace('-500', '') === 'purple' ? '#8b5cf6' : r.color.replace('bg-', '').replace('-500', '') === 'pink' ? '#ec4899' : '#3b82f6' }}></span>
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
                  {resources.map((r, idx) => {
                    const resourceAppointments = filteredAppointments.filter(a => a.resId === r.id);
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
        </div>
      </div>

      {/* Add Appointment Modal */}
      {showAddModal && (
        <div style={styles.modalOverlay} onClick={() => setShowAddModal(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h2 style={styles.modalTitle}>➕ Add New Appointment</h2>
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Patient Name *</label>
              <input style={styles.formInput} placeholder="Full name" value={newAppointment.patient} onChange={(e) => setNewAppointment({...newAppointment, patient: e.target.value})} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Phone *</label>
                <input style={styles.formInput} placeholder="Mobile number" value={newAppointment.phone} onChange={(e) => setNewAppointment({...newAppointment, phone: e.target.value})} />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Email</label>
                <input style={styles.formInput} placeholder="Email address" value={newAppointment.email} onChange={(e) => setNewAppointment({...newAppointment, email: e.target.value})} />
              </div>
            </div>
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>Service</label>
              <input style={styles.formInput} placeholder="Service name" value={newAppointment.service} onChange={(e) => setNewAppointment({...newAppointment, service: e.target.value})} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Resource *</label>
                <select style={styles.selectInput} value={newAppointment.resourceId} onChange={(e) => {
                  const resource = resources.find(r => r.id === parseInt(e.target.value));
                  setNewAppointment({...newAppointment, resourceId: e.target.value, amount: resource?.price || 0});
                }}>
                  <option value="">Select Resource</option>
                  {resources.map(r => <option key={r.id} value={r.id}>{r.name} - ₹{r.price}</option>)}
                </select>
              </div>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Amount</label>
                <input type="number" style={styles.formInput} placeholder="Amount" value={newAppointment.amount} onChange={(e) => setNewAppointment({...newAppointment, amount: parseInt(e.target.value)})} />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Start Time *</label>
                <input type="time" style={styles.formInput} value={newAppointment.startTime} onChange={(e) => setNewAppointment({...newAppointment, startTime: e.target.value})} />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.formLabel}>End Time</label>
                <input type="time" style={styles.formInput} value={newAppointment.endTime} onChange={(e) => setNewAppointment({...newAppointment, endTime: e.target.value})} />
              </div>
            </div>
            <div style={styles.buttonGroup}>
              <button style={styles.saveBtn} onClick={addAppointment}>Save Appointment</button>
              <button style={styles.cancelBtn} onClick={() => setShowAddModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && selectedAppointment && (
        <div style={styles.modalOverlay} onClick={() => setShowPaymentModal(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h2 style={styles.modalTitle}>💰 Process Payment</h2>
            <div style={{ backgroundColor: '#f0fdf4', padding: '16px', borderRadius: '8px', marginBottom: '20px' }}>
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
              <button style={{ ...styles.saveBtn, backgroundColor: '#10b981' }} onClick={processPayment}>Confirm Payment</button>
              <button style={styles.cancelBtn} onClick={() => setShowPaymentModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Receipt Modal */}
      {receiptGenerated && (
        <div style={styles.modalOverlay} onClick={() => setReceiptGenerated(null)}>
          <div style={{ ...styles.modalContent, width: '400px' }} onClick={(e) => e.stopPropagation()}>
            <h2 style={styles.modalTitle}>🧾 Payment Receipt</h2>
            <div style={{ padding: '16px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
              <div><strong>Receipt No:</strong> {receiptGenerated.id}</div>
              <div><strong>Date:</strong> {receiptGenerated.date}</div>
              <div><strong>Patient:</strong> {receiptGenerated.patientName}</div>
              <div><strong>Service:</strong> {receiptGenerated.service}</div>
              <div><strong>Amount:</strong> <span style={{ fontSize: '18px', color: '#10b981' }}>₹{receiptGenerated.amount}</span></div>
              <div><strong>Payment Method:</strong> {receiptGenerated.paymentMethod}</div>
              <hr style={{ margin: '12px 0' }} />
              <div><strong>Payment Status:</strong> <span style={{ color: '#10b981' }}>✅ Completed</span></div>
            </div>
            <div style={styles.buttonGroup}>
              <button style={styles.saveBtn} onClick={printReceipt}>🖨️ Print Receipt</button>
              <button style={styles.cancelBtn} onClick={() => setReceiptGenerated(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;