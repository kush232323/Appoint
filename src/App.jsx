import React, { useState, useEffect } from 'react';
import { 
  Plus, Trash2, Edit, Save, X, Calendar, Building, Mail, 
  CheckCircle, AlertCircle, Clock, Printer, Download, 
  Eye, Users, Search, Zap, Shield, FileCheck, 
  ClipboardList, CalendarCheck, RefreshCw, Send,
  ChevronRight, ChevronDown, Folder, FileText, Menu, Home,
  Settings, BarChart3, List, Layout, Grid, Layers, FileSpreadsheet,
  File, FolderOpen, ChevronLeft, ChevronRight as ChevronRightIcon,
  AlertTriangle, Info, CheckSquare, Square
} from 'lucide-react';

// Initial Data with hierarchy
const initialTests = [
  { id: 1, sno: '1.1', description: 'Earth Pit test', type: 'In-house', frequency: 'Half Yearly', category: 'Electrical', hasSubItems: true },
  { id: 2, sno: '1.2', description: 'Thermal Overload Relay testing', type: 'In-house', frequency: 'Half Yearly', category: 'Electrical', hasSubItems: false },
  { id: 3, sno: '1.3', description: 'Motor Megger test', type: 'In-house', frequency: 'Half Yearly', category: 'Electrical', hasSubItems: false },
  { id: 4, sno: '1.4', description: 'Cable Insulation test', type: 'In-house', frequency: 'Half Yearly', category: 'Electrical', hasSubItems: false },
  { id: 5, sno: '1.5', description: 'Protective Relay testing', type: 'Third Party', frequency: 'Yearly', category: 'Electrical', hasSubItems: false },
  { id: 6, sno: '1.6', description: 'Transformer Oil testing as per IS-1866', type: 'Third Party', frequency: 'Yearly', category: 'Electrical', hasSubItems: false },
  { id: 7, sno: '1.7', description: 'OLTC oil testing as per IS-1866', type: 'Third Party', frequency: 'Yearly', category: 'Electrical', hasSubItems: false },
  { id: 8, sno: '1.8', description: 'DGA of Transformer oil', type: 'Third Party', frequency: 'Once in a three year', category: 'Electrical', hasSubItems: false },
  { id: 9, sno: '1.9', description: 'Electrical Authorized personnel', type: 'In-house', frequency: 'Yearly', category: 'Electrical', hasSubItems: false },
  { id: 10, sno: '1.10', description: 'Motor Push Button Continuity test', type: 'In-house', frequency: 'Yearly', category: 'Electrical', hasSubItems: false },
  { id: 11, sno: '1.11', description: 'Earthing interlock test in carousel', type: 'In-house', frequency: 'Weekly', category: 'Electrical', hasSubItems: false },
  { id: 12, sno: '1.12', description: 'Earthing interlock test in the Tank Truck gantry', type: 'In-house', frequency: 'Weekly', category: 'Electrical', hasSubItems: false },
  { id: 13, sno: '1.13', description: 'Checking of interlock of the carousel and the manual filling machine and the vapour extraction Blower', type: 'In-house', frequency: 'Once a month', category: 'Electrical', hasSubItems: false },
  { id: 14, sno: '1.14', description: 'Thermography of Panel', type: 'Third Party', frequency: 'Half Yearly', category: 'Electrical', hasSubItems: false },
  { id: 15, sno: '1.15', description: 'Checking of VCB bottles for healthiness', type: 'Third Party', frequency: 'Once in a three year', category: 'Electrical', hasSubItems: false },
  { id: 16, sno: '1.16', description: 'Insulating Mats checking', type: 'In-house', frequency: 'Once a year', category: 'Electrical', hasSubItems: false },
  { id: 17, sno: '1.17', description: 'Condition of cable end sealing and terminal boxes', type: 'In-house', frequency: 'Once a year', category: 'Electrical', hasSubItems: false },
  { id: 18, sno: '1.18', description: 'Lighting Illumination level (Lux Level) checking of various areas', type: 'In-house', frequency: 'Once a year', category: 'Electrical', hasSubItems: false },
  { id: 19, sno: '1.19', description: 'Third harmonic current testing of the lightning arrestor', type: 'Third Party', frequency: 'Once in a three year', category: 'Electrical', hasSubItems: false },
  { id: 20, sno: '1.20', description: 'Yearly check for sealing of the bus duct/cable entry on both sides of the wall', type: 'In-house', frequency: 'Once a year', category: 'Electrical', hasSubItems: false },
  { id: 21, sno: '1.21', description: 'Checking of the electrical Insulation Block provided for the railway siding', type: 'In-house', frequency: 'Quarterly', category: 'Electrical', hasSubItems: false },
  { id: 22, sno: '1.22', description: 'Continuity of earthing conductors', type: 'In-house', frequency: 'Once a year', category: 'Electrical', hasSubItems: false },
  { id: 23, sno: '2.1', description: 'Fire Hose Testing', type: 'In-house', frequency: 'Yearly', category: 'Safety & Fire Fighting', hasSubItems: false },
  { id: 24, sno: '2.2', description: 'Fire Hose quarterly check', type: 'In-house', frequency: 'Quarterly', category: 'Safety & Fire Fighting', hasSubItems: false },
  { id: 25, sno: '2.3', description: 'Fire hose box checking', type: 'In-house', frequency: 'Quarterly', category: 'Safety & Fire Fighting', hasSubItems: false },
  { id: 26, sno: '2.4', description: 'First Aid trained personnel', type: 'In-house', frequency: 'Yearly', category: 'Safety & Fire Fighting', hasSubItems: false },
  { id: 27, sno: '2.5', description: 'DCP Extinguishers- All types-Visual Inspection', type: 'In-house', frequency: 'Monthly', category: 'Safety & Fire Fighting', hasSubItems: false },
  { id: 28, sno: '2.6', description: 'Stored Pressure DCP Extinguisher', type: 'In-house', frequency: 'Quarterly', category: 'Safety & Fire Fighting', hasSubItems: false },
  { id: 29, sno: '2.7', description: 'Cartridge Onarated DCP Extinguisher', type: 'In-house', frequency: 'Quarterly', category: 'Safety & Fire Fighting', hasSubItems: false },
];

// Sub-items for Earth Pit test (1.1)
const earthPitSubItems = [
  { id: 'ep1', sno: '1.1.1', description: 'Body Earth Pit (BE-1)', location: 'Near Control Room' },
  { id: 'ep2', sno: '1.1.2', description: 'Body Earth Pit (BE-2)', location: 'Near Compressor House' },
  { id: 'ep3', sno: '1.1.3', description: 'Body Earth Pit (BE-3)', location: 'Near Tank Farm' },
  { id: 'ep4', sno: '1.1.4', description: 'Neutral Earth Pit (NEP-1)', location: 'Near Substation' },
  { id: 'ep5', sno: '1.1.5', description: 'Neutral Earth Pit (NEP-2)', location: 'Near DG Set' },
  { id: 'ep6', sno: '1.1.6', description: 'Lightening Earth Pit (LEP-1)', location: 'Near Tower 1' },
  { id: 'ep7', sno: '1.1.7', description: 'Lightening Earth Pit (LEP-2)', location: 'Near Tower 2' },
  { id: 'ep8', sno: '1.1.8', description: 'Lightening Earth Pit (LEP-3)', location: 'Near Chimney' },
];

// Sample data for each test
const testDataMap = {
  '1.2': [
    { id: 1, date: '2024-01-15', value: '0.05', status: 'Pass', remarks: 'OK' },
    { id: 2, date: '2024-02-15', value: '0.04', status: 'Pass', remarks: 'OK' },
  ],
  '1.3': [
    { id: 1, date: '2024-01-20', value: '50MΩ', status: 'Pass', remarks: 'OK' },
    { id: 2, date: '2024-02-20', value: '48MΩ', status: 'Pass', remarks: 'OK' },
  ],
  '1.4': [
    { id: 1, date: '2024-01-25', value: '100MΩ', status: 'Pass', remarks: 'OK' },
  ],
  '1.5': [
    { id: 1, date: '2024-03-01', value: '98%', status: 'Pass', remarks: 'OK' },
  ],
  '1.6': [
    { id: 1, date: '2024-03-15', value: '28kV', status: 'Pass', remarks: 'OK' },
  ],
};

// Toast Component
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => onClose(), 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const colors = {
    success: { bg: '#22c55e', icon: CheckCircle },
    error: { bg: '#ef4444', icon: AlertCircle },
    info: { bg: '#3b82f6', icon: AlertCircle }
  };
  const color = colors[type] || colors.info;
  const Icon = color.icon;

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      padding: '12px 20px',
      borderRadius: '12px',
      background: color.bg,
      color: 'white',
      fontWeight: '500',
      boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
      animation: 'slideIn 0.3s ease-out'
    }}>
      <Icon size={20} />
      <span>{message}</span>
      <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', opacity: 0.8 }}>
        <X size={18} />
      </button>
    </div>
  );
};

// Main App
function App() {
  const [tests, setTests] = useState(() => {
    const saved = localStorage.getItem('testRecords');
    return saved ? JSON.parse(saved) : initialTests;
  });

  const [filteredTests, setFilteredTests] = useState(tests);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedFrequency, setSelectedFrequency] = useState('All');
  const [isEditing, setIsEditing] = useState(null);
  const [editData, setEditData] = useState({ id: null, sno: '', description: '', type: '', frequency: '' });
  const [isAdding, setIsAdding] = useState(false);
  const [newTest, setNewTest] = useState({ sno: '', description: '', type: 'In-house', frequency: 'Half Yearly' });
  const [toast, setToast] = useState(null);
  const [selectedTest, setSelectedTest] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [emailData, setEmailData] = useState({ to: '', subject: 'Electrical Test Report', message: '' });
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [isSending, setIsSending] = useState(false);
  
  // Sidebar states
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedItems, setExpandedItems] = useState({ '1.1': true });
  const [selectedMenuItem, setSelectedMenuItem] = useState('1.1');
  
  // Earth Pit Report states
  const [showEarthPitReport, setShowEarthPitReport] = useState(false);
  const [earthPitData, setEarthPitData] = useState(
    earthPitSubItems.map(item => ({
      ...item,
      individualResistance: '',
      gridResistance: '',
      remarks: '',
      testDate: '',
      nextDueDate: ''
    }))
  );
  const [testDate, setTestDate] = useState('');
  const [nextDueDate, setNextDueDate] = useState('');

  // Test data for selected menu item
  const [testRecords, setTestRecords] = useState({});
  const [newRecord, setNewRecord] = useState({ date: '', value: '', status: 'Pass', remarks: '' });
  const [showAddRecord, setShowAddRecord] = useState(false);

  useEffect(() => {
    localStorage.setItem('testRecords', JSON.stringify(tests));
  }, [tests]);

  useEffect(() => {
    let filtered = tests;
    if (searchTerm) {
      filtered = filtered.filter(t => 
        t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.sno.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedType !== 'All') filtered = filtered.filter(t => t.type === selectedType);
    if (selectedFrequency !== 'All') filtered = filtered.filter(t => t.frequency === selectedFrequency);
    setFilteredTests(filtered);
  }, [tests, searchTerm, selectedType, selectedFrequency]);

  const showToast = (message, type = 'success') => setToast({ message, type });

  const handleAddTest = () => {
    if (!newTest.sno || !newTest.description) {
      showToast('Please fill in S.No and Description', 'error');
      return;
    }
    if (tests.some(t => t.sno === newTest.sno)) {
      showToast('S.No already exists!', 'error');
      return;
    }
    const testToAdd = { ...newTest, id: Date.now(), hasSubItems: false, category: 'Electrical' };
    setTests([...tests, testToAdd]);
    setNewTest({ sno: '', description: '', type: 'In-house', frequency: 'Half Yearly' });
    setIsAdding(false);
    showToast('Test added successfully!');
  };

  const handleSaveEdit = () => {
    if (!editData.sno || !editData.description) {
      showToast('Please fill in S.No and Description', 'error');
      return;
    }
    setTests(tests.map(t => t.id === editData.id ? { ...editData } : t));
    setIsEditing(null);
    showToast('Test updated successfully!');
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this test?')) {
      setTests(tests.filter(t => t.id !== id));
      showToast('Test deleted successfully!');
    }
  };

  const exportCSV = () => {
    const headers = ['S.No', 'Description', 'Type', 'Frequency'];
    const rows = tests.map(t => [t.sno, t.description, t.type, t.frequency]);
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `electrical_test_report_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('CSV exported successfully!');
  };

  const handleSendEmail = () => {
    if (!emailData.to) {
      showToast('Please enter recipient email', 'error');
      return;
    }
    setIsSending(true);
    
    // Prepare email content with all test data
    let emailContent = `${emailData.message}\n\n`;
    emailContent += `Electrical Test Report\n`;
    emailContent += `=====================\n\n`;
    
    if (selectedMenuItem === '1.1') {
      emailContent += `EARTH PIT TEST REPORT\n`;
      emailContent += `Test Date: ${testDate || 'Not set'}\n`;
      emailContent += `Next Due Date: ${nextDueDate || 'Not set'}\n\n`;
      emailContent += `S.No\tEarth Pit No\tLocation\tIndividual (Ω)\tGrid (Ω)\tRemarks\n`;
      earthPitData.forEach(item => {
        emailContent += `${item.sno}\t${item.description}\t${item.location}\t${item.individualResistance || '-'}\t${item.gridResistance || '-'}\t${item.remarks || '-'}\n`;
      });
    } else {
      const records = testRecords[selectedMenuItem] || [];
      if (records.length > 0) {
        const test = tests.find(t => t.sno === selectedMenuItem);
        emailContent += `${test?.description || selectedMenuItem} - Test Data\n`;
        emailContent += `----------------------------------------\n`;
        emailContent += `Date\tValue\tStatus\tRemarks\n`;
        records.forEach(r => {
          emailContent += `${r.date || '-'}\t${r.value || '-'}\t${r.status || '-'}\t${r.remarks || '-'}\n`;
        });
      } else {
        emailContent += `No data available for ${selectedMenuItem}`;
      }
    }
    
    emailContent += `\n\nGenerated on: ${new Date().toLocaleString()}`;

    setTimeout(() => {
      setIsSending(false);
      setShowEmailModal(false);
      setEmailData({ to: '', subject: 'Electrical Test Report', message: '' });
      showToast(`Email sent to ${emailData.to} successfully!`);
      console.log('Email content:', emailContent);
    }, 2000);
  };

  const handleEarthPitSave = () => {
    const data = { testDate, nextDueDate, earthPitData };
    setTestRecords(prev => ({ ...prev, '1.1': data }));
    showToast('Earth Pit Report saved successfully!');
    setShowEarthPitReport(false);
  };

  const handleEarthPitInputChange = (index, field, value) => {
    const updated = [...earthPitData];
    updated[index] = { ...updated[index], [field]: value };
    setEarthPitData(updated);
  };

  const toggleExpand = (sno) => {
    setExpandedItems(prev => ({ ...prev, [sno]: !prev[sno] }));
  };

  const handleMenuItemClick = (test) => {
    setSelectedMenuItem(test.sno);
    if (test.sno === '1.1') {
      setShowEarthPitReport(true);
      setShowModal(false);
      setShowAddRecord(false);
    } else {
      setShowEarthPitReport(false);
      // Load records for this test
      if (!testRecords[test.sno]) {
        // Initialize with sample data for demo
        const sampleData = testDataMap[test.sno] || [];
        setTestRecords(prev => ({ ...prev, [test.sno]: sampleData }));
      }
      setSelectedTest(test);
      setShowModal(true);
      setShowAddRecord(false);
    }
  };

  const handleAddRecord = () => {
    if (!newRecord.date || !newRecord.value) {
      showToast('Please fill in Date and Value', 'error');
      return;
    }
    const record = { ...newRecord, id: Date.now() };
    setTestRecords(prev => ({
      ...prev,
      [selectedMenuItem]: [...(prev[selectedMenuItem] || []), record]
    }));
    setNewRecord({ date: '', value: '', status: 'Pass', remarks: '' });
    setShowAddRecord(false);
    showToast('Record added successfully!');
  };

  const handleDeleteRecord = (recordId) => {
    if (window.confirm('Delete this record?')) {
      setTestRecords(prev => ({
        ...prev,
        [selectedMenuItem]: prev[selectedMenuItem].filter(r => r.id !== recordId)
      }));
      showToast('Record deleted!');
    }
  };

  const getFrequencyColor = (freq) => {
    const colors = {
      'Weekly': '#d1fae5', 'Monthly': '#dbeafe', 'Quarterly': '#fef9c3',
      'Half Yearly': '#fed7aa', 'Yearly': '#fee2e2', 'Once in a three year': '#ede9fe',
      'Once a month': '#dbeafe', 'Once a year': '#fee2e2'
    };
    return colors[freq] || '#f3f4f6';
  };

  const getFrequencyTextColor = (freq) => {
    const colors = {
      'Weekly': '#065f46', 'Monthly': '#1e40af', 'Quarterly': '#854d0e',
      'Half Yearly': '#9a3412', 'Yearly': '#991b1b', 'Once in a three year': '#5b21b6',
      'Once a month': '#1e40af', 'Once a year': '#991b1b'
    };
    return colors[freq] || '#4b5563';
  };

  // Group tests by category for sidebar
  const groupedTests = tests.reduce((acc, test) => {
    if (!acc[test.category]) acc[test.category] = [];
    acc[test.category].push(test);
    return acc;
  }, {});

  const stats = {
    total: tests.length,
    inHouse: tests.filter(t => t.type === 'In-house').length,
    thirdParty: tests.filter(t => t.type === 'Third Party').length,
    weekly: tests.filter(t => t.frequency === 'Weekly' || t.frequency === 'Once a month').length,
    monthly: tests.filter(t => t.frequency === 'Monthly').length,
    quarterly: tests.filter(t => t.frequency === 'Quarterly').length,
    halfYearly: tests.filter(t => t.frequency === 'Half Yearly').length,
    yearly: tests.filter(t => t.frequency === 'Yearly' || t.frequency === 'Once a year').length,
    threeYear: tests.filter(t => t.frequency === 'Once in a three year').length,
  };

  // Get current test data for display
  const currentRecords = testRecords[selectedMenuItem] || [];
  const currentTest = tests.find(t => t.sno === selectedMenuItem);

  // Styles
  const styles = {
    container: { minHeight: '100vh', background: '#f3f4f6', fontFamily: 'system-ui, -apple-system, sans-serif', display: 'flex' },
    sidebar: {
      width: sidebarOpen ? '320px' : '0px',
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #1e1b4b, #312e81)',
      color: 'white',
      transition: 'width 0.3s ease',
      overflow: 'hidden',
      position: 'sticky',
      top: 0,
      height: '100vh',
      zIndex: 20,
      flexShrink: 0
    },
    sidebarContent: { 
      padding: sidebarOpen ? '16px' : '0', 
      opacity: sidebarOpen ? 1 : 0,
      transition: 'opacity 0.2s ease',
      overflowY: 'auto',
      height: '100%'
    },
    sidebarHeader: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.1)' },
    sidebarTitle: { fontSize: '18px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' },
    sidebarToggle: { 
      background: 'rgba(255,255,255,0.1)', 
      border: 'none', 
      color: 'white', 
      padding: '6px 10px', 
      borderRadius: '8px', 
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '4px'
    },
    categoryHeader: { 
      padding: '8px 12px', 
      fontSize: '11px', 
      textTransform: 'uppercase', 
      color: '#a5b4fc', 
      fontWeight: '600',
      letterSpacing: '0.05em',
      marginTop: '12px',
      borderBottom: '1px solid rgba(255,255,255,0.05)'
    },
    menuItem: {
      padding: '8px 12px',
      borderRadius: '8px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      transition: 'all 0.15s ease',
      fontSize: '14px',
      marginBottom: '2px'
    },
    menuItemActive: {
      background: 'rgba(99, 102, 241, 0.3)',
      borderLeft: '3px solid #818cf8'
    },
    menuItemHover: {
      background: 'rgba(255,255,255,0.05)'
    },
    subMenuItem: {
      padding: '6px 12px 6px 40px',
      borderRadius: '8px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      transition: 'all 0.15s ease',
      fontSize: '13px',
      color: '#c7d2fe',
      marginBottom: '2px'
    },
    mainContent: {
      flex: 1,
      padding: '20px',
      overflowX: 'hidden',
      minWidth: 0
    },
    header: { background: 'linear-gradient(135deg, #4338ca, #1e1b4b)', color: 'white', padding: '12px 20px', position: 'sticky', top: 0, zIndex: 30, boxShadow: '0 4px 20px rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
    headerInner: { display: 'flex', alignItems: 'center', gap: '16px', width: '100%' },
    brand: { display: 'flex', alignItems: 'center', gap: '10px' },
    brandTitle: { fontSize: '20px', fontWeight: 'bold' },
    brandSub: { fontSize: '12px', color: '#a5b4fc' },
    headerBadge: { background: 'rgba(255,255,255,0.15)', padding: '4px 12px', borderRadius: '9999px', fontSize: '14px' },
    headerBtn: { background: 'white', color: '#4338ca', padding: '6px 14px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '6px' },
    statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '12px', marginBottom: '20px' },
    statCard: { background: 'white', borderRadius: '12px', padding: '12px 16px', border: '1px solid #f3f4f6', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' },
    statLabel: { fontSize: '10px', textTransform: 'uppercase', color: '#6b7280', fontWeight: '600', letterSpacing: '0.05em' },
    statValue: { fontSize: '24px', fontWeight: '700', color: '#1f2937', marginTop: '2px' },
    statIcon: { padding: '8px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    searchBar: { background: 'white', borderRadius: '12px', padding: '16px', border: '1px solid #f3f4f6', marginBottom: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' },
    searchRow: { display: 'flex', flexDirection: 'column', gap: '12px' },
    searchInput: { flex: 1, position: 'relative' },
    input: { width: '100%', padding: '8px 12px 8px 40px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '14px', outline: 'none', background: '#f9fafb', transition: 'all 0.2s' },
    filterGroup: { display: 'flex', gap: '8px', flexWrap: 'wrap' },
    select: { padding: '8px 12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '14px', background: 'white', outline: 'none', cursor: 'pointer' },
    btnAdd: { background: '#4338ca', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '500' },
    btnExport: { background: '#059669', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '8px', cursor: 'pointer' },
    btnPrint: { background: '#4b5563', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '8px', cursor: 'pointer' },
    tableWrap: { background: 'white', borderRadius: '12px', border: '1px solid #f3f4f6', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' },
    table: { width: '100%', borderCollapse: 'collapse' },
    th: { padding: '12px 16px', textAlign: 'left', fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', color: '#4b5563', background: '#f9fafb', borderBottom: '1px solid #e5e7eb' },
    td: { padding: '12px 16px', fontSize: '14px', color: '#1f2937', borderBottom: '1px solid #f3f4f6' },
    badge: { display: 'inline-block', padding: '4px 10px', fontSize: '11px', fontWeight: '500', borderRadius: '9999px' },
    actionBtn: { padding: '6px', border: 'none', borderRadius: '8px', cursor: 'pointer', background: 'transparent', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' },
    modalOverlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' },
    modalContent: { background: 'white', borderRadius: '16px', maxWidth: '900px', width: '100%', maxHeight: '90vh', overflow: 'auto', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' },
    modalHeader: { padding: '16px 24px', borderBottom: '1px solid #f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, background: 'white', zIndex: 1 },
    modalBody: { padding: '24px' },
    modalFooter: { padding: '16px 24px', borderTop: '1px solid #f3f4f6', display: 'flex', justifyContent: 'flex-end', gap: '8px' },
    footer: { marginTop: '24px', textAlign: 'center', fontSize: '14px', color: '#6b7280' },
    reportHeader: { 
      background: 'linear-gradient(135deg, #1e1b4b, #4338ca)', 
      color: 'white', 
      padding: '16px 24px',
      borderRadius: '12px 12px 0 0',
      marginBottom: '20px'
    },
    reportTable: { width: '100%', borderCollapse: 'collapse', border: '1px solid #e5e7eb' },
    reportTh: { padding: '10px 12px', background: '#f9fafb', border: '1px solid #e5e7eb', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#4b5563' },
    reportTd: { padding: '8px 12px', border: '1px solid #e5e7eb', fontSize: '13px' },
    reportInput: { width: '100%', padding: '6px 8px', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '13px', outline: 'none' }
  };

  // CSS Keyframes
  const keyframes = `
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: scale(0.95) translateY(-10px); }
      to { opacity: 1; transform: scale(1) translateY(0); }
    }
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    .animate-spin { animation: spin 1s linear infinite; }
    .animate-fade-in { animation: fadeIn 0.2s ease-out; }
  `;

  return (
    <div style={styles.container}>
      <style>{keyframes}</style>
      
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.sidebarContent}>
          <div style={styles.sidebarHeader}>
            <div style={styles.sidebarTitle}>
              <Menu size={20} />
              <span>Menu</span>
            </div>
            <button 
              style={styles.sidebarToggle}
              onClick={() => setSidebarOpen(false)}
            >
              <ChevronLeft size={18} />
            </button>
          </div>

          {/* Dashboard */}
          <div 
            style={{ ...styles.menuItem, ...(selectedMenuItem === 'dashboard' ? styles.menuItemActive : {}) }}
            onMouseEnter={(e) => { if (selectedMenuItem !== 'dashboard') e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
            onMouseLeave={(e) => { if (selectedMenuItem !== 'dashboard') e.currentTarget.style.background = 'transparent'; }}
            onClick={() => { setSelectedMenuItem('dashboard'); setShowEarthPitReport(false); setShowModal(false); setShowAddRecord(false); }}
          >
            <Home size={18} />
            <span>Dashboard</span>
          </div>

          {/* Test Categories */}
          {Object.keys(groupedTests).map(category => (
            <div key={category}>
              <div style={styles.categoryHeader}>{category}</div>
              {groupedTests[category].map(test => (
                <div key={test.id}>
                  <div 
                    style={{ ...styles.menuItem, ...(selectedMenuItem === test.sno ? styles.menuItemActive : {}) }}
                    onMouseEnter={(e) => { if (selectedMenuItem !== test.sno) e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
                    onMouseLeave={(e) => { if (selectedMenuItem !== test.sno) e.currentTarget.style.background = 'transparent'; }}
                    onClick={() => {
                      if (test.hasSubItems) {
                        toggleExpand(test.sno);
                      }
                      handleMenuItemClick(test);
                    }}
                  >
                    {test.hasSubItems ? (
                      expandedItems[test.sno] ? <ChevronDown size={16} /> : <ChevronRight size={16} />
                    ) : (
                      <FileText size={16} />
                    )}
                    <span style={{ fontSize: '13px' }}>{test.sno} {test.description}</span>
                  </div>
                  
                  {/* Sub-items for Earth Pit */}
                  {test.hasSubItems && expandedItems[test.sno] && (
                    <div>
                      {earthPitSubItems.map(sub => (
                        <div 
                          key={sub.id}
                          style={{ ...styles.subMenuItem, ...(selectedMenuItem === sub.sno ? { background: 'rgba(99,102,241,0.2)', borderLeft: '3px solid #818cf8' } : {}) }}
                          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                          onClick={() => {
                            setSelectedMenuItem(sub.sno);
                            setShowEarthPitReport(true);
                            setShowModal(false);
                            setShowAddRecord(false);
                          }}
                        >
                          <File size={14} />
                          <span style={{ fontSize: '12px' }}>{sub.sno} {sub.description}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}

          {/* Reports */}
          <div style={styles.categoryHeader}>Reports</div>
          <div 
            style={{ ...styles.menuItem, ...(selectedMenuItem === 'reports' ? styles.menuItemActive : {}) }}
            onMouseEnter={(e) => { if (selectedMenuItem !== 'reports') e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
            onMouseLeave={(e) => { if (selectedMenuItem !== 'reports') e.currentTarget.style.background = 'transparent'; }}
          >
            <ClipboardList size={18} />
            <span>All Reports</span>
          </div>
          <div 
            style={{ ...styles.menuItem, ...(selectedMenuItem === 'settings' ? styles.menuItemActive : {}) }}
            onMouseEnter={(e) => { if (selectedMenuItem !== 'settings') e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
            onMouseLeave={(e) => { if (selectedMenuItem !== 'settings') e.currentTarget.style.background = 'transparent'; }}
          >
            <Settings size={18} />
            <span>Settings</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerInner}>
            {!sidebarOpen && (
              <button 
                onClick={() => setSidebarOpen(true)}
                style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', padding: '6px 10px', borderRadius: '8px', cursor: 'pointer' }}
              >
                <Menu size={20} />
              </button>
            )}
            <div style={styles.brand}>
              <Zap size={28} color="#a78bfa" />
              <div>
                <div style={styles.brandTitle}>Electrical Test Management</div>
                <div style={styles.brandSub}>IOCL LPG Bottling Plant</div>
              </div>
            </div>
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={styles.headerBadge}>{tests.length} Tests</span>
              <button style={styles.headerBtn} onClick={() => setShowEmailModal(true)}>
                <Mail size={16} /> Email Report
              </button>
            </div>
          </div>
        </div>

        {/* Dashboard View */}
        {selectedMenuItem === 'dashboard' && (
          <>
            {/* Stats */}
            <div style={styles.statsGrid}>
              {[
                { label: 'Total', value: stats.total, color: '#6366f1', icon: FileCheck },
                { label: 'In-house', value: stats.inHouse, color: '#6366f1', icon: Users },
                { label: 'Third Party', value: stats.thirdParty, color: '#d97706', icon: Building },
                { label: 'Weekly/Monthly', value: stats.weekly + stats.monthly, color: '#2563eb', icon: Clock },
                { label: 'Quarterly', value: stats.quarterly, color: '#ca8a04', icon: Calendar },
                { label: 'Yearly', value: stats.yearly, color: '#dc2626', icon: CalendarCheck },
                { label: '3 Year', value: stats.threeYear, color: '#7c3aed', icon: Shield },
              ].map((s, i) => (
                <div key={i} style={styles.statCard}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <div style={styles.statLabel}>{s.label}</div>
                      <div style={{ ...styles.statValue, color: s.color }}>{s.value}</div>
                    </div>
                    <div style={{ ...styles.statIcon, background: `${s.color}20`, color: s.color }}><s.icon size={18} /></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Search & Filters */}
            <div style={styles.searchBar}>
              <div style={styles.searchRow}>
                <div style={styles.searchInput}>
                  <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                  <input
                    type="text"
                    placeholder="Search by S.No or Description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={styles.input}
                    onFocus={(e) => e.target.style.cssText = Object.entries({ ...styles.input, borderColor: '#6366f1', boxShadow: '0 0 0 3px rgba(99,102,241,0.15)', background: 'white' }).map(([k,v]) => `${k}:${v}`).join(';')}
                    onBlur={(e) => e.target.style.cssText = Object.entries(styles.input).map(([k,v]) => `${k}:${v}`).join(';')}
                  />
                </div>
                <div style={styles.filterGroup}>
                  <select style={styles.select} value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
                    <option value="All">All Types</option>
                    <option value="In-house">In-house</option>
                    <option value="Third Party">Third Party</option>
                  </select>
                  <select style={styles.select} value={selectedFrequency} onChange={(e) => setSelectedFrequency(e.target.value)}>
                    <option value="All">All Frequencies</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Quarterly">Quarterly</option>
                    <option value="Half Yearly">Half Yearly</option>
                    <option value="Yearly">Yearly</option>
                    <option value="Once in a three year">Once in 3 Year</option>
                    <option value="Once a month">Once a month</option>
                    <option value="Once a year">Once a year</option>
                  </select>
                  <button style={styles.btnAdd} onClick={() => setIsAdding(true)}><Plus size={16} /> Add</button>
                  <button style={styles.btnExport} onClick={exportCSV}><Download size={16} /></button>
                  <button style={styles.btnPrint} onClick={() => window.print()}><Printer size={16} /></button>
                </div>
              </div>
            </div>

            {/* Add Form */}
            {isAdding && (
              <div style={{ ...styles.searchBar, animation: 'fadeIn 0.2s ease-out' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <h3 style={{ fontWeight: '600', color: '#1f2937' }}>Add New Test</h3>
                  <button onClick={() => setIsAdding(false)} style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer' }}><X size={20} /></button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                  <input type="text" placeholder="S.No (e.g. 1.23)" value={newTest.sno} onChange={(e) => setNewTest({...newTest, sno: e.target.value})} style={styles.input} />
                  <input type="text" placeholder="Description" value={newTest.description} onChange={(e) => setNewTest({...newTest, description: e.target.value})} style={styles.input} />
                  <select style={styles.select} value={newTest.type} onChange={(e) => setNewTest({...newTest, type: e.target.value})}>
                    <option value="In-house">In-house</option>
                    <option value="Third Party">Third Party</option>
                  </select>
                  <select style={styles.select} value={newTest.frequency} onChange={(e) => setNewTest({...newTest, frequency: e.target.value})}>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Quarterly">Quarterly</option>
                    <option value="Half Yearly">Half Yearly</option>
                    <option value="Yearly">Yearly</option>
                    <option value="Once in a three year">Once in 3 Year</option>
                    <option value="Once a month">Once a month</option>
                    <option value="Once a year">Once a year</option>
                  </select>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '12px' }}>
                  <button onClick={() => setIsAdding(false)} style={{ padding: '8px 16px', border: '1px solid #e5e7eb', borderRadius: '8px', background: 'white', cursor: 'pointer' }}>Cancel</button>
                  <button onClick={handleAddTest} style={{ padding: '8px 16px', border: 'none', borderRadius: '8px', background: '#4338ca', color: 'white', cursor: 'pointer', fontWeight: '500' }}>Add Test</button>
                </div>
              </div>
            )}

            {/* Table */}
            <div style={styles.tableWrap}>
              <div style={{ overflowX: 'auto' }}>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.th}>S.No</th>
                      <th style={styles.th}>Description</th>
                      <th style={styles.th}>Type</th>
                      <th style={styles.th}>Frequency</th>
                      <th style={{ ...styles.th, textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTests.length === 0 ? (
                      <tr><td colSpan="5" style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>No tests found</td></tr>
                    ) : (
                      filteredTests.map((test) => (
                        <tr key={test.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                          <td style={styles.td}><strong>{test.sno}</strong></td>
                          <td style={styles.td}>{test.description}</td>
                          <td style={styles.td}>
                            <span style={{ ...styles.badge, background: test.type === 'In-house' ? '#eef2ff' : '#fef3c7', color: test.type === 'In-house' ? '#4338ca' : '#d97706' }}>{test.type}</span>
                          </td>
                          <td style={styles.td}>
                            <span style={{ ...styles.badge, background: getFrequencyColor(test.frequency), color: getFrequencyTextColor(test.frequency) }}>{test.frequency}</span>
                          </td>
                          <td style={{ ...styles.td, textAlign: 'right' }}>
                            {isEditing === test.id ? (
                              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '4px' }}>
                                <button onClick={handleSaveEdit} style={{ ...styles.actionBtn, color: '#22c55e' }}><Check size={16} /></button>
                                <button onClick={() => { setIsEditing(null); setEditData({ id: null, sno: '', description: '', type: '', frequency: '' }); }} style={{ ...styles.actionBtn, color: '#6b7280' }}><X size={16} /></button>
                              </div>
                            ) : (
                              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '4px' }}>
                                <button onClick={() => { 
                                  if (test.sno === '1.1') {
                                    setShowEarthPitReport(true);
                                    setShowModal(false);
                                    setShowAddRecord(false);
                                  } else {
                                    handleMenuItemClick(test);
                                  }
                                }} style={{ ...styles.actionBtn, color: '#3b82f6' }}><Eye size={16} /></button>
                                <button onClick={() => { setIsEditing(test.id); setEditData({...test}); }} style={{ ...styles.actionBtn, color: '#6366f1' }}><Edit size={16} /></button>
                                <button onClick={() => handleDelete(test.id)} style={{ ...styles.actionBtn, color: '#ef4444' }}><Trash2 size={16} /></button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div style={styles.footer}>
              <p>Total: {filteredTests.length} tests | Last updated: {new Date().toLocaleString()}</p>
              <p style={{ fontSize: '12px', color: '#9ca3af', marginTop: '4px' }}>IOCL LPG Bottling Plant - Electrical Test Management System</p>
            </div>
          </>
        )}

        {/* Earth Pit Report */}
        {selectedMenuItem === '1.1' && showEarthPitReport && (
          <div style={{ animation: 'fadeIn 0.3s ease-out' }}>
            <div style={styles.reportHeader}>
              <h2 style={{ margin: 0, fontSize: '20px' }}>Test Report For Earth Pits</h2>
              <p style={{ margin: '4px 0 0', opacity: 0.8, fontSize: '14px' }}>
                INDIAN OIL CORPORATION LIMITED - LPG BOTTLING PLANT
              </p>
            </div>

            <div style={{ background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', marginBottom: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>Test Date</label>
                  <input type="date" style={styles.input} value={testDate} onChange={(e) => setTestDate(e.target.value)} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>Next Due Date</label>
                  <input type="date" style={styles.input} value={nextDueDate} onChange={(e) => setNextDueDate(e.target.value)} />
                </div>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table style={styles.reportTable}>
                  <thead>
                    <tr>
                      <th style={styles.reportTh}>S/No.</th>
                      <th style={styles.reportTh}>Earth Pit No</th>
                      <th style={styles.reportTh}>Location</th>
                      <th style={styles.reportTh}>Individual Pit (Ω)</th>
                      <th style={styles.reportTh}>Grid (Ω)</th>
                      <th style={styles.reportTh}>Remarks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {earthPitData.map((item, index) => (
                      <tr key={item.id}>
                        <td style={styles.reportTd}>{index + 1}</td>
                        <td style={styles.reportTd}><strong>{item.sno}</strong></td>
                        <td style={styles.reportTd}>{item.location}</td>
                        <td style={styles.reportTd}>
                          <input 
                            type="text" 
                            style={styles.reportInput} 
                            placeholder="Ω"
                            value={item.individualResistance}
                            onChange={(e) => handleEarthPitInputChange(index, 'individualResistance', e.target.value)}
                          />
                        </td>
                        <td style={styles.reportTd}>
                          <input 
                            type="text" 
                            style={styles.reportInput} 
                            placeholder="Ω"
                            value={item.gridResistance}
                            onChange={(e) => handleEarthPitInputChange(index, 'gridResistance', e.target.value)}
                          />
                        </td>
                        <td style={styles.reportTd}>
                          <input 
                            type="text" 
                            style={styles.reportInput} 
                            placeholder="Remarks"
                            value={item.remarks}
                            onChange={(e) => handleEarthPitInputChange(index, 'remarks', e.target.value)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div style={{ marginTop: '16px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '200px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', color: '#374151', marginBottom: '2px' }}>Testing Agency</label>
                  <input type="text" style={{ ...styles.input, padding: '6px 10px' }} placeholder="Agency Name" />
                </div>
                <div style={{ flex: 1, minWidth: '150px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', color: '#374151', marginBottom: '2px' }}>License No</label>
                  <input type="text" style={{ ...styles.input, padding: '6px 10px' }} placeholder="License" />
                </div>
                <div style={{ flex: 1, minWidth: '150px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', color: '#374151', marginBottom: '2px' }}>Lic. Validity</label>
                  <input type="date" style={{ ...styles.input, padding: '6px 10px' }} />
                </div>
              </div>

              <div style={{ marginTop: '16px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '200px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', color: '#374151', marginBottom: '2px' }}>IOCL Representative</label>
                  <input type="text" style={{ ...styles.input, padding: '6px 10px' }} placeholder="Name & Designation" />
                </div>
                <div style={{ flex: 1, minWidth: '200px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '500', color: '#374151', marginBottom: '2px' }}>Seal & Signature</label>
                  <input type="text" style={{ ...styles.input, padding: '6px 10px' }} placeholder="Signature" />
                </div>
              </div>

              <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button 
                  onClick={() => { setShowEarthPitReport(false); setSelectedMenuItem('dashboard'); }}
                  style={{ padding: '10px 24px', border: '1px solid #e5e7eb', borderRadius: '8px', background: 'white', cursor: 'pointer' }}
                >
                  Close
                </button>
                <button 
                  onClick={handleEarthPitSave}
                  style={{ padding: '10px 24px', border: 'none', borderRadius: '8px', background: '#4338ca', color: 'white', cursor: 'pointer' }}
                >
                  Save Report
                </button>
                <button 
                  onClick={() => window.print()}
                  style={{ padding: '10px 24px', border: 'none', borderRadius: '8px', background: '#4b5563', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <Printer size={16} /> Print
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Test Detail View for other tests */}
        {selectedMenuItem !== 'dashboard' && selectedMenuItem !== '1.1' && showModal && (
          <div style={{ animation: 'fadeIn 0.3s ease-out' }}>
            <div style={{ ...styles.reportHeader, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h2 style={{ margin: 0, fontSize: '20px' }}>{currentTest?.sno} - {currentTest?.description}</h2>
                <p style={{ margin: '4px 0 0', opacity: 0.8, fontSize: '14px' }}>
                  Type: {currentTest?.type} | Frequency: {currentTest?.frequency}
                </p>
              </div>
              <button 
                onClick={() => { setShowModal(false); setSelectedMenuItem('dashboard'); }}
                style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer' }}
              >
                <X size={18} /> Close
              </button>
            </div>

            <div style={{ background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ margin: 0, fontWeight: '600', color: '#1f2937' }}>Test Records</h3>
                <button 
                  onClick={() => setShowAddRecord(!showAddRecord)}
                  style={{ ...styles.btnAdd, padding: '6px 14px', fontSize: '13px' }}
                >
                  <Plus size={16} /> Add Record
                </button>
              </div>

              {/* Add Record Form */}
              {showAddRecord && (
                <div style={{ background: '#f9fafb', padding: '16px', borderRadius: '8px', marginBottom: '16px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
                    <div>
                      <label style={{ fontSize: '12px', fontWeight: '500', color: '#374151' }}>Date</label>
                      <input type="date" style={styles.input} value={newRecord.date} onChange={(e) => setNewRecord({...newRecord, date: e.target.value})} />
                    </div>
                    <div>
                      <label style={{ fontSize: '12px', fontWeight: '500', color: '#374151' }}>Value</label>
                      <input type="text" style={styles.input} placeholder="Value" value={newRecord.value} onChange={(e) => setNewRecord({...newRecord, value: e.target.value})} />
                    </div>
                    <div>
                      <label style={{ fontSize: '12px', fontWeight: '500', color: '#374151' }}>Status</label>
                      <select style={styles.select} value={newRecord.status} onChange={(e) => setNewRecord({...newRecord, status: e.target.value})}>
                        <option value="Pass">Pass</option>
                        <option value="Fail">Fail</option>
                        <option value="Pending">Pending</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ fontSize: '12px', fontWeight: '500', color: '#374151' }}>Remarks</label>
                      <input type="text" style={styles.input} placeholder="Remarks" value={newRecord.remarks} onChange={(e) => setNewRecord({...newRecord, remarks: e.target.value})} />
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '12px' }}>
                    <button onClick={() => setShowAddRecord(false)} style={{ padding: '6px 16px', border: '1px solid #e5e7eb', borderRadius: '6px', background: 'white', cursor: 'pointer' }}>Cancel</button>
                    <button onClick={handleAddRecord} style={{ padding: '6px 16px', border: 'none', borderRadius: '6px', background: '#4338ca', color: 'white', cursor: 'pointer' }}>Add</button>
                  </div>
                </div>
              )}

              {/* Records Table */}
              {currentRecords.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
                  <FileText size={48} style={{ margin: '0 auto 12px', color: '#d1d5db' }} />
                  <p>No records found. Click "Add Record" to add data.</p>
                </div>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  <table style={styles.reportTable}>
                    <thead>
                      <tr>
                        <th style={styles.reportTh}>#</th>
                        <th style={styles.reportTh}>Date</th>
                        <th style={styles.reportTh}>Value</th>
                        <th style={styles.reportTh}>Status</th>
                        <th style={styles.reportTh}>Remarks</th>
                        <th style={{ ...styles.reportTh, textAlign: 'center' }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentRecords.map((record, index) => (
                        <tr key={record.id}>
                          <td style={styles.reportTd}>{index + 1}</td>
                          <td style={styles.reportTd}>{record.date || '-'}</td>
                          <td style={styles.reportTd}><strong>{record.value || '-'}</strong></td>
                          <td style={styles.reportTd}>
                            <span style={{ 
                              ...styles.badge, 
                              background: record.status === 'Pass' ? '#d1fae5' : record.status === 'Fail' ? '#fee2e2' : '#fef9c3',
                              color: record.status === 'Pass' ? '#065f46' : record.status === 'Fail' ? '#991b1b' : '#854d0e'
                            }}>
                              {record.status || '-'}
                            </span>
                          </td>
                          <td style={styles.reportTd}>{record.remarks || '-'}</td>
                          <td style={{ ...styles.reportTd, textAlign: 'center' }}>
                            <button 
                              onClick={() => handleDeleteRecord(record.id)}
                              style={{ ...styles.actionBtn, color: '#ef4444' }}
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button 
                  onClick={exportCSV}
                  style={{ padding: '8px 20px', border: 'none', borderRadius: '8px', background: '#059669', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <Download size={16} /> Export CSV
                </button>
                <button 
                  onClick={() => window.print()}
                  style={{ padding: '8px 20px', border: 'none', borderRadius: '8px', background: '#4b5563', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <Printer size={16} /> Print
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Email Modal */}
      {showEmailModal && (
        <div style={styles.modalOverlay} onClick={() => setShowEmailModal(false)}>
          <div style={{ ...styles.modalContent, maxWidth: '480px', animation: 'fadeIn 0.2s ease-out' }} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h3 style={{ fontWeight: '600', color: '#1f2937', display: 'flex', alignItems: 'center', gap: '8px' }}><Mail size={20} color="#6366f1" /> Send Email Report</h3>
              <button onClick={() => setShowEmailModal(false)} style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer' }}><X size={24} /></button>
            </div>
            <div style={styles.modalBody}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>To Email</label>
                <input type="email" placeholder="recipient@example.com" value={emailData.to} onChange={(e) => setEmailData({...emailData, to: e.target.value})} style={{ ...styles.input, width: '100%' }} />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>Subject</label>
                <input type="text" placeholder="Email Subject" value={emailData.subject} onChange={(e) => setEmailData({...emailData, subject: e.target.value})} style={{ ...styles.input, width: '100%' }} />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>Message</label>
                <textarea rows="3" placeholder="Add a message..." value={emailData.message} onChange={(e) => setEmailData({...emailData, message: e.target.value})} style={{ ...styles.input, width: '100%', resize: 'none' }} />
              </div>
              <div style={{ background: '#f9fafb', padding: '12px', borderRadius: '8px', fontSize: '14px', color: '#4b5563' }}>
                <strong>Summary:</strong> Total Tests: {tests.length} | In-house: {stats.inHouse} | Third Party: {stats.thirdParty}
                {selectedMenuItem !== 'dashboard' && selectedMenuItem !== '1.1' && (
                  <div style={{ marginTop: '4px', fontSize: '13px' }}>
                    Selected: {currentTest?.sno} - {currentTest?.description} ({currentRecords.length} records)
                  </div>
                )}
                {selectedMenuItem === '1.1' && (
                  <div style={{ marginTop: '4px', fontSize: '13px' }}>
                    Earth Pit Report ({earthPitData.length} pits)
                  </div>
                )}
              </div>
            </div>
            <div style={{ ...styles.modalFooter, gap: '8px' }}>
              <button onClick={() => setShowEmailModal(false)} style={{ padding: '8px 16px', border: '1px solid #e5e7eb', borderRadius: '8px', background: 'white', cursor: 'pointer' }}>Cancel</button>
              <button onClick={handleSendEmail} disabled={isSending} style={{ padding: '8px 24px', border: 'none', borderRadius: '8px', background: '#4338ca', color: 'white', cursor: isSending ? 'not-allowed' : 'pointer', opacity: isSending ? 0.5 : 1, display: 'flex', alignItems: 'center', gap: '8px' }}>
                {isSending ? <><RefreshCw size={16} className="animate-spin" /> Sending...</> : <><Send size={16} /> Send</>}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;