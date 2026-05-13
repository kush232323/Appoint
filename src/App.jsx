import React, { useState } from 'react';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import TopNavbar from './components/TopNavbar';
import StatusBar from './components/StatusBar';
import LeftPanel from './components/LeftPanel';
import CalendarView from './components/CalendarView';
import AddAppointmentModal from './components/AddAppointmentModal';
import PaymentModal from './components/PaymentModal';
import ReceiptModal from './components/ReceiptModal';
import DashboardView from './components/DashboardView';
import AppointmentsListView from './components/AppointmentsListView';
import PaymentsListView from './components/PaymentsListView';
import ReportsView from './components/ReportsView';
import SettingsView from './components/SettingsView';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  
  // Resources data
  const [resources] = useState([
    { id: 1, name: "Shiveinai", color: "#8b5cf6", type: "staff", price: 1500 },
    { id: 2, name: "Dr. Kritika", color: "#ec4899", type: "doctor", price: 2500 },
    { id: 3, name: "Consult...", color: "#3b82f6", type: "consultation", price: 1000 },
    { id: 4, name: "Fiza", color: "#14b8a6", type: "staff", price: 1200 },
    { id: 5, name: "Glow Su..", color: "#f59e0b", type: "service", price: 3000 },
    { id: 6, name: "Glow Su..", color: "#f59e0b", type: "service", price: 3000 },
    { id: 7, name: "Harmony", color: "#6366f1", type: "service", price: 4500 },
    { id: 8, name: "Laser Ro..", color: "#f43f5e", type: "room", price: 5000 },
    { id: 9, name: "Luxe Ro..", color: "#06b6d4", type: "room", price: 6000 },
    { id: 10, name: "Operati..", color: "#10b981", type: "room", price: 8000 },
    { id: 11, name: "Rejuven..", color: "#f97316", type: "room", price: 5500 },
    { id: 12, name: "Dr. Omai..", color: "#a855f7", type: "doctor", price: 3000 },
  ]);

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

  // Statistics
  const stats = {
    scheduled: appointments.filter(a => a.status === 'Scheduled').length,
    waiting: appointments.filter(a => a.status === 'Waiting').length,
    engaged: appointments.filter(a => a.status === 'Engaged').length,
    checkedOut: appointments.filter(a => a.paymentStatus === 'Paid').length,
    totalRevenue: appointments.filter(a => a.paymentStatus === 'Paid').reduce((sum, a) => sum + a.amount, 0),
    pendingAmount: appointments.filter(a => a.paymentStatus === 'Pending').reduce((sum, a) => sum + a.amount, 0)
  };

  // Filter appointments
  const filteredAppointments = appointments.filter(apt => {
    if (filters.resource && apt.resId !== parseInt(filters.resource)) return false;
    if (filters.status && apt.status !== filters.status) return false;
    if (filters.paymentStatus && apt.paymentStatus !== filters.paymentStatus) return false;
    return true;
  });

  // Add new appointment
  const addAppointment = (newAppointment) => {
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
    setShowAddModal(false);
    alert('Appointment added successfully!');
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

  // Process payment
  const processPayment = () => {
    if (selectedAppointment) {
      const updatedAppointments = appointments.map(apt =>
        apt.id === selectedAppointment.id
          ? { ...apt, paymentStatus: 'Paid', status: 'Completed' }
          : apt
      );
      setAppointments(updatedAppointments);
      const slip = {
        id: `INV-${Date.now()}`,
        date: new Date().toLocaleString(),
        patientName: selectedAppointment.patient,
        patientPhone: selectedAppointment.phone,
        patientEmail: selectedAppointment.email,
        service: selectedAppointment.service,
        amount: selectedAppointment.amount,
        paymentMethod: paymentMethod,
        status: 'Paid',
        appointmentDate: selectedAppointment.start,
        generatedBy: loggedInUser?.name || 'Admin'
      };
      setReceiptGenerated(slip);
      setShowPaymentModal(false);
      alert(`Payment of ₹${selectedAppointment.amount} received successfully!`);
    }
  };

  const handleLogin = (email, password) => {
    if (email === 'admin@example.com' && password === 'admin123') {
      setIsLoggedIn(true);
      setLoggedInUser({ id: 1, name: "Admin User", email: "admin@example.com", role: "Super Admin" });
      return true;
    }
    return false;
  };

  // Render different views based on active menu
  const renderMainContent = () => {
    switch(activeMenu) {
      case 'dashboard':
        return (
          <DashboardView 
            stats={stats}
            appointments={appointments}
            resources={resources}
            setShowAddModal={setShowAddModal}
          />
        );
      case 'appointments':
        return (
          <AppointmentsListView 
            appointments={appointments}
            resources={resources}
            updateStatus={updateStatus}
            deleteAppointment={deleteAppointment}
            setSelectedAppointment={setSelectedAppointment}
            setShowPaymentModal={setShowPaymentModal}
          />
        );
      case 'payments':
        return (
          <PaymentsListView 
            appointments={appointments}
            resources={resources}
            setSelectedAppointment={setSelectedAppointment}
            setShowPaymentModal={setShowPaymentModal}
          />
        );
      case 'reports':
        return (
          <ReportsView 
            appointments={appointments}
            resources={resources}
            stats={stats}
          />
        );
      case 'settings':
        return (
          <SettingsView 
            loggedInUser={loggedInUser}
          />
        );
      case 'calendar':
      default:
        return (
          <>
            <StatusBar 
              stats={stats}
              currentDate={currentDate}
              setCurrentDate={setCurrentDate}
              view={view}
              setView={setView}
            />
            <div style={styles.mainLayout}>
              <LeftPanel 
                filters={filters}
                setFilters={setFilters}
                stats={stats}
                setShowAddModal={setShowAddModal}
                resources={resources}
              />
              <CalendarView 
                resources={resources}
                appointments={filteredAppointments}
                startHour={12}
                endHour={19}
                hourHeight={96}
                updateStatus={updateStatus}
                deleteAppointment={deleteAppointment}
                setSelectedAppointment={setSelectedAppointment}
                setShowPaymentModal={setShowPaymentModal}
              />
            </div>
          </>
        );
    }
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div style={styles.app}>
      <Sidebar 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        loggedInUser={loggedInUser}
        setIsLoggedIn={setIsLoggedIn}
      />
      
      <div style={{ ...styles.mainContent, marginLeft: sidebarOpen ? '260px' : '70px' }}>
        <TopNavbar loggedInUser={loggedInUser} setIsLoggedIn={setIsLoggedIn} />
        {renderMainContent()}
      </div>

      <AddAppointmentModal 
        showAddModal={showAddModal}
        setShowAddModal={setShowAddModal}
        resources={resources}
        addAppointment={addAppointment}
      />

      <PaymentModal 
        showPaymentModal={showPaymentModal}
        setShowPaymentModal={setShowPaymentModal}
        selectedAppointment={selectedAppointment}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        processPayment={processPayment}
      />

      <ReceiptModal 
        receiptGenerated={receiptGenerated}
        setReceiptGenerated={setReceiptGenerated}
      />
    </div>
  );
};

const styles = {
  app: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#f0f2f5',
    fontFamily: 'Segoe UI, Arial, sans-serif'
  },
  mainContent: {
    flex: 1,
    transition: 'all 0.3s ease',
    backgroundColor: '#f5f6f8',
    overflowX: 'auto'
  },
  mainLayout: {
    display: 'flex',
    flex: 1,
    overflow: 'hidden'
  }
};

export default App;