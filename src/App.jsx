// App.jsx - Complete School Management Dashboard with Indian Names
import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  // State for various dashboard data
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [schoolName, setSchoolName] = useState('ज्ञान विद्या मंदिर');
  
  const [stats, setStats] = useState({
    totalStudents: 2450,
    totalTeachers: 98,
    totalCourses: 52,
    attendanceRate: 96.7,
    passedStudents: 94.2
  });

  const [recentStudents, setRecentStudents] = useState([
    { id: 1, name: 'राहुल शर्मा', grade: '10वीं', rollNo: '101', fatherName: 'मोहन शर्मा', status: 'सक्रिय' },
    { id: 2, name: 'प्रिया पाटिल', grade: '11वीं', rollNo: '102', fatherName: 'रवि पाटिल', status: 'सक्रिय' },
    { id: 3, name: 'अर्जुन सिंह', grade: '9वीं', rollNo: '103', fatherName: 'विक्रम सिंह', status: 'सक्रिय' },
    { id: 4, name: 'आदित्य वर्मा', grade: '12वीं', rollNo: '104', fatherName: 'संजय वर्मा', status: 'निष्क्रिय' },
    { id: 5, name: 'सोनाली देशपांडे', grade: '8वीं', rollNo: '105', fatherName: 'अशोक देशपांडे', status: 'सक्रिय' },
  ]);

  const [upcomingEvents, setUpcomingEvents] = useState([
    { id: 1, title: 'माता-पिता शिक्षक बैठक', date: '2024-06-15', time: '10:00 AM' },
    { id: 2, title: 'वार्षिक खेल दिवस', date: '2024-06-20', time: '9:00 AM' },
    { id: 3, title: 'विज्ञान प्रदर्शनी', date: '2024-06-22', time: '11:00 AM' },
    { id: 4, title: 'संस्कृत सप्ताह', date: '2024-06-25', time: '8:00 AM' },
    { id: 5, title: 'सांस्कृतिक कार्यक्रम', date: '2024-06-30', time: '5:00 PM' },
  ]);

  const [festivals, setFestivals] = useState([
    { id: 1, name: 'रक्षाबंधन', date: '2024-08-19', type: 'त्योहार' },
    { id: 2, name: 'जन्माष्टमी', date: '2024-08-26', type: 'धार्मिक' },
    { id: 3, name: 'गणेश चतुर्थी', date: '2024-09-07', type: 'त्योहार' },
    { id: 4, name: 'दीपावली', date: '2024-10-31', type: 'प्रमुख त्योहार' },
  ]);

  const [notifications, setNotifications] = useState([
    { id: 1, message: 'नया छात्र प्रवेशित हुआ', time: '2 घंटे पहले', read: false },
    { id: 2, message: 'शुल्क भुगतान कल तक जमा करें', time: '4 घंटे पहले', read: true },
    { id: 3, message: 'शिक्षक बैठक निर्धारित', time: '1 दिन पहले', read: false },
    { id: 4, message: 'वार्षिक परीक्षा कार्यक्रम जारी', time: '2 दिन पहले', read: false },
  ]);

  const [students, setStudents] = useState([
    { id: 1, name: 'राहुल शर्मा', grade: '10वीं', rollNo: '101', fatherName: 'मोहन शर्मा', phone: '9876543210', address: 'दिल्ली' },
    { id: 2, name: 'प्रिया पाटिल', grade: '11वीं', rollNo: '102', fatherName: 'रवि पाटिल', phone: '9876543211', address: 'मुंबई' },
    { id: 3, name: 'अर्जुन सिंह', grade: '9वीं', rollNo: '103', fatherName: 'विक्रम सिंह', phone: '9876543212', address: 'लखनऊ' },
    { id: 4, name: 'आदित्य वर्मा', grade: '12वीं', rollNo: '104', fatherName: 'संजय वर्मा', phone: '9876543213', address: 'चेन्नई' },
    { id: 5, name: 'सोनाली देशपांडे', grade: '8वीं', rollNo: '105', fatherName: 'अशोक देशपांडे', phone: '9876543214', address: 'पुणे' },
    { id: 6, name: 'विक्रांत राव', grade: '10वीं', rollNo: '106', fatherName: 'प्रकाश राव', phone: '9876543215', address: 'हैदराबाद' },
    { id: 7, name: 'नीलिमा चौधरी', grade: '11वीं', rollNo: '107', fatherName: 'अमित चौधरी', phone: '9876543216', address: 'कोलकाता' },
    { id: 8, name: 'संजीव कुमार', grade: '9वीं', rollNo: '108', fatherName: 'रमेश कुमार', phone: '9876543217', address: 'पटना' },
  ]);

  const [teachers, setTeachers] = useState([
    { id: 1, name: 'डॉ. राजेश्वरी अय्यर', subject: 'गणित', qualification: 'पीएच.डी', experience: '15 वर्ष', phone: '9876500001' },
    { id: 2, name: 'श्रीमती मीना शर्मा', subject: 'हिंदी', qualification: 'एम.ए', experience: '12 वर्ष', phone: '9876500002' },
    { id: 3, name: 'श्री रवि कुमार', subject: 'विज्ञान', qualification: 'एम.एससी', experience: '10 वर्ष', phone: '9876500003' },
    { id: 4, name: 'श्रीमती संगीता पटेल', subject: 'सामाजिक विज्ञान', qualification: 'एम.ए', experience: '8 वर्ष', phone: '9876500004' },
    { id: 5, name: 'डॉ. अरुण जोशी', subject: 'संस्कृत', qualification: 'पीएच.डी', experience: '20 वर्ष', phone: '9876500005' },
    { id: 6, name: 'श्रीमती अनिता रेड्डी', subject: 'अंग्रेजी', qualification: 'एम.ए', experience: '9 वर्ष', phone: '9876500006' },
  ]);

  const [classes, setClasses] = useState([
    { id: 1, name: 'कक्षा 6वीं', section: 'A', students: 45, classTeacher: 'श्रीमती सुधा मेनन' },
    { id: 2, name: 'कक्षा 7वीं', section: 'B', students: 42, classTeacher: 'श्री रमेश पिल्लै' },
    { id: 3, name: 'कक्षा 8वीं', section: 'A', students: 48, classTeacher: 'श्रीमती लता शेट्टी' },
    { id: 4, name: 'कक्षा 9वीं', section: 'C', students: 40, classTeacher: 'डॉ. सतीश नायर' },
    { id: 5, name: 'कक्षा 10वीं', section: 'A', students: 52, classTeacher: 'श्रीमती कविता सिन्हा' },
    { id: 6, name: 'कक्षा 11वीं', section: 'साइंस', students: 38, classTeacher: 'श्री राजीव बनर्जी' },
    { id: 7, name: 'कक्षा 12वीं', section: 'कॉमर्स', students: 44, classTeacher: 'श्रीमती प्रतिभा दास' },
  ]);

  // Mock data initialization
  useEffect(() => {
    // This would typically be API calls in a real application
    console.log('डैशबोर्ड आरंभ किया गया');
  }, []);

  // Calculate unread notifications
  const unreadCount = notifications.filter(n => !n.read).length;

  // Get current Indian time
  const getIndianTime = () => {
    return new Date().toLocaleTimeString('en-IN', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getIndianDate = () => {
    return new Date().toLocaleDateString('hi-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Dashboard content based on active tab
  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard':
        return (
          <div className="dashboard-content">
            <h2 className="content-title">विद्यालय संचालन डैशबोर्ड</h2>
            <p className="subtitle">स्वागत है! आज की स्थिति और विवरण</p>
            
            {/* Stats Cards */}
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon student">👨‍🎓</div>
                <div className="stat-info">
                  <h3>{stats.totalStudents.toLocaleString('en-IN')}</h3>
                  <p>कुल विद्यार्थी</p>
                </div>
                <span className="stat-trend">↑ 8.5%</span>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon teacher">👩‍🏫</div>
                <div className="stat-info">
                  <h3>{stats.totalTeachers}</h3>
                  <p>कुल शिक्षक</p>
                </div>
                <span className="stat-trend">↑ 3.2%</span>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon course">📚</div>
                <div className="stat-info">
                  <h3>{stats.totalCourses}</h3>
                  <p>कुल विषय</p>
                </div>
                <span className="stat-trend">↑ 5.7%</span>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon attendance">✓</div>
                <div className="stat-info">
                  <h3>{stats.attendanceRate}%</h3>
                  <p>उपस्थिति दर</p>
                </div>
                <span className="stat-trend">↑ 1.8%</span>
              </div>

              <div className="stat-card">
                <div className="stat-icon result">🏆</div>
                <div className="stat-info">
                  <h3>{stats.passedStudents}%</h3>
                  <p>उत्तीर्ण प्रतिशत</p>
                </div>
                <span className="stat-trend">↑ 2.3%</span>
              </div>
            </div>
            
            {/* Charts and Tables */}
            <div className="content-grid">
              <div className="chart-container">
                <h3>विद्यार्थी नामांकन रुझान</h3>
                <div className="mock-chart">
                  <div className="chart-bar" style={{height: '70%'}}><span>कक्षा 6</span></div>
                  <div className="chart-bar" style={{height: '75%'}}><span>कक्षा 7</span></div>
                  <div className="chart-bar" style={{height: '80%'}}><span>कक्षा 8</span></div>
                  <div className="chart-bar" style={{height: '85%'}}><span>कक्षा 9</span></div>
                  <div className="chart-bar" style={{height: '90%'}}><span>कक्षा 10</span></div>
                  <div className="chart-bar" style={{height: '65%'}}><span>कक्षा 11</span></div>
                  <div className="chart-bar" style={{height: '60%'}}><span>कक्षा 12</span></div>
                </div>
              </div>
              
              <div className="recent-activity">
                <h3>नए विद्यार्थी</h3>
                <table>
                  <thead>
                    <tr>
                      <th>नाम</th>
                      <th>कक्षा</th>
                      <th>स्थिति</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentStudents.map(student => (
                      <tr key={student.id}>
                        <td>{student.name}</td>
                        <td>{student.grade}</td>
                        <td>
                          <span className={`status-badge ${student.status === 'सक्रिय' ? 'active' : 'inactive'}`}>
                            {student.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="upcoming-events">
                <h3>आगामी कार्यक्रम</h3>
                <div className="events-list">
                  {upcomingEvents.map(event => (
                    <div key={event.id} className="event-item">
                      <div className="event-date">
                        <strong>{event.date.split('-')[2]}</strong>
                        <span>जून</span>
                      </div>
                      <div className="event-details">
                        <h4>{event.title}</h4>
                        <p>{event.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="quick-actions">
                <h3>त्वरित कार्य</h3>
                <div className="actions-grid">
                  <button className="action-btn" onClick={() => setActiveTab('students')}>
                    <span>➕</span>
                    नया छात्र जोड़ें
                  </button>
                  <button className="action-btn" onClick={() => setActiveTab('teachers')}>
                    <span>👩‍🏫</span>
                    शिक्षक जोड़ें
                  </button>
                  <button className="action-btn" onClick={() => setActiveTab('attendance')}>
                    <span>✓</span>
                    उपस्थिति दर्ज करें
                  </button>
                  <button className="action-btn" onClick={() => alert('फीस रसीद जारी की गई!')}>
                    <span>💰</span>
                    फीस रसीद
                  </button>
                </div>
              </div>

              <div className="festivals-section">
                <h3>आगामी त्योहार</h3>
                <div className="festivals-list">
                  {festivals.map(festival => (
                    <div key={festival.id} className="festival-item">
                      <div className="festival-icon">🎉</div>
                      <div className="festival-details">
                        <h4>{festival.name}</h4>
                        <p>{festival.date} • {festival.type}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'students':
        return (
          <div className="students-content">
            <div className="content-header">
              <h2>विद्यार्थी प्रबंधन</h2>
              <div className="header-actions">
                <button className="btn-primary" onClick={() => alert('नया विद्यार्थी फॉर्म खुला')}>
                  ➕ नया विद्यार्थी
                </button>
                <button className="btn-secondary" onClick={() => alert('छात्र डेटा निर्यात किया गया')}>
                  📥 एक्सपोर्ट
                </button>
              </div>
            </div>
            
            <div className="search-filter">
              <input 
                type="text" 
                placeholder="विद्यार्थी खोजें..." 
                className="search-input"
              />
              <select className="filter-select">
                <option value="">सभी कक्षाएं</option>
                <option value="6">कक्षा 6वीं</option>
                <option value="7">कक्षा 7वीं</option>
                <option value="8">कक्षा 8वीं</option>
                <option value="9">कक्षा 9वीं</option>
                <option value="10">कक्षा 10वीं</option>
                <option value="11">कक्षा 11वीं</option>
                <option value="12">कक्षा 12वीं</option>
              </select>
              <button className="btn-filter">🔍 खोजें</button>
            </div>
            
            <table className="data-table">
              <thead>
                <tr>
                  <th>क्र.</th>
                  <th>नाम</th>
                  <th>कक्षा</th>
                  <th>रोल नं.</th>
                  <th>पिता का नाम</th>
                  <th>फ़ोन</th>
                  <th>कार्य</th>
                </tr>
              </thead>
              <tbody>
                {students.map(student => (
                  <tr key={student.id}>
                    <td>#{student.id}</td>
                    <td><strong>{student.name}</strong></td>
                    <td>{student.grade}</td>
                    <td>{student.rollNo}</td>
                    <td>{student.fatherName}</td>
                    <td>{student.phone}</td>
                    <td>
                      <button className="btn-icon" title="संपादित करें">✏️</button>
                      <button className="btn-icon" title="देखें">👁️</button>
                      <button className="btn-icon" title="रिपोर्ट">📊</button>
                      <button className="btn-icon delete" title="हटाएं">🗑️</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'teachers':
        return (
          <div className="teachers-content">
            <div className="content-header">
              <h2>शिक्षक प्रबंधन</h2>
              <button className="btn-primary" onClick={() => alert('नया शिक्षक फॉर्म खुला')}>
                👨‍🏫 नया शिक्षक
              </button>
            </div>
            
            <div className="teachers-grid">
              {teachers.map(teacher => (
                <div key={teacher.id} className="teacher-card">
                  <div className="teacher-avatar">
                    {teacher.name.split(' ')[1]?.charAt(0) || teacher.name.charAt(0)}
                  </div>
                  <div className="teacher-info">
                    <h3>{teacher.name}</h3>
                    <p className="subject">{teacher.subject}</p>
                    <p className="qualification">{teacher.qualification}</p>
                    <p className="experience">अनुभव: {teacher.experience}</p>
                    <p className="phone">📞 {teacher.phone}</p>
                  </div>
                  <div className="teacher-actions">
                    <button className="btn-small">प्रोफ़ाइल देखें</button>
                    <button className="btn-small outline">शेड्यूल</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'classes':
        return (
          <div className="classes-content">
            <div className="content-header">
              <h2>कक्षा प्रबंधन</h2>
              <button className="btn-primary" onClick={() => alert('नई कक्षा जोड़ी गई')}>
                🏫 नई कक्षा
              </button>
            </div>
            
            <div className="classes-grid">
              {classes.map(cls => (
                <div key={cls.id} className="class-card">
                  <div className="class-header">
                    <h3>{cls.name}</h3>
                    <span className="class-section">सेक्शन {cls.section}</span>
                  </div>
                  <div className="class-details">
                    <div className="detail-item">
                      <span>विद्यार्थी:</span>
                      <strong>{cls.students}</strong>
                    </div>
                    <div className="detail-item">
                      <span>कक्षाध्यापक:</span>
                      <strong>{cls.classTeacher}</strong>
                    </div>
                    <div className="detail-item">
                      <span>कमरा:</span>
                      <strong>{cls.id}०१</strong>
                    </div>
                  </div>
                  <div className="class-actions">
                    <button className="btn-small">विवरण</button>
                    <button className="btn-small outline">समय सारणी</button>
                    <button className="btn-small outline">उपस्थिति</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'attendance':
        return (
          <div className="attendance-content">
            <h2>उपस्थिति प्रबंधन</h2>
            <div className="attendance-container">
              <div className="calendar-view">
                <h3>जून 2024</h3>
                <div className="calendar">
                  {['र', 'सो', 'मं', 'बु', 'गु', 'शु', 'श'].map(day => (
                    <div key={day} className="calendar-header">{day}</div>
                  ))}
                  {Array.from({length: 30}, (_, i) => (
                    <div key={i} className={`calendar-day ${i === 7 ? 'today' : ''}`}>
                      {i + 1}
                      <div className="day-stats">
                        <span className="present">उ: 92%</span>
                        <span className="absent">अ: 8%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="attendance-stats">
                <h3>आज की उपस्थिति</h3>
                <div className="stats-summary">
                  <div className="stat-item present">
                    <h4>उपस्थित</h4>
                    <p>२,२५८ विद्यार्थी</p>
                    <span>९२%</span>
                  </div>
                  <div className="stat-item absent">
                    <h4>अनुपस्थित</h4>
                    <p>१८७ विद्यार्थी</p>
                    <span>८%</span>
                  </div>
                  <div className="stat-item late">
                    <h4>विलंब से</h4>
                    <p>४२ विद्यार्थी</p>
                    <span>२%</span>
                  </div>
                </div>
                <div className="attendance-actions">
                  <button className="btn-primary">📝 आज की उपस्थिति दर्ज करें</button>
                  <button className="btn-secondary">📊 मासिक रिपोर्ट</button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'fees':
        return (
          <div className="fees-content">
            <h2>शुल्क प्रबंधन</h2>
            <div className="fees-stats">
              <div className="fees-card collected">
                <h3>₹८,४५,२५०</h3>
                <p>एकत्रित शुल्क</p>
                <span>८५%</span>
              </div>
              <div className="fees-card pending">
                <h3>₹१,५०,७५०</h3>
                <p>लंबित शुल्क</p>
                <span>१५%</span>
              </div>
              <div className="fees-card overdue">
                <h3>₹७५,५००</h3>
                <p>समयावधि समाप्त</p>
                <span>८%</span>
              </div>
            </div>
            
            <div className="fees-table">
              <h3>हाल ही की फीस भुगतान</h3>
              <table>
                <thead>
                  <tr>
                    <th>छात्र नाम</th>
                    <th>कक्षा</th>
                    <th>राशि</th>
                    <th>दिनांक</th>
                    <th>स्थिति</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'राहुल शर्मा', grade: '10वीं', amount: '₹५,०००', date: '२०२४-०६-१०', status: 'भुगतान किया' },
                    { name: 'प्रिया पाटिल', grade: '11वीं', amount: '₹४,५००', date: '२०२४-०६-०९', status: 'भुगतान किया' },
                    { name: 'अर्जुन सिंह', grade: '9वीं', amount: '₹४,०००', date: '२०२४-०६-०८', status: 'लंबित' },
                    { name: 'आदित्य वर्मा', grade: '12वीं', amount: '₹६,०००', date: '२०२४-०६-०७', status: 'भुगतान किया' },
                  ].map((fee, index) => (
                    <tr key={index}>
                      <td>{fee.name}</td>
                      <td>{fee.grade}</td>
                      <td><strong>{fee.amount}</strong></td>
                      <td>{fee.date}</td>
                      <td><span className={`status-badge ${fee.status === 'भुगतान किया' ? 'active' : 'inactive'}`}>{fee.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'reports':
        return (
          <div className="reports-content">
            <h2>रिपोर्ट और विश्लेषण</h2>
            <div className="reports-grid">
              <div className="report-card">
                <h3>📊 शैक्षणिक प्रदर्शन</h3>
                <p>सभी कक्षाओं का परिणाम विश्लेषण</p>
                <button className="btn-small">रिपोर्ट देखें</button>
              </div>
              <div className="report-card">
                <h3>📈 उपस्थिति रिपोर्ट</h3>
                <p>मासिक उपस्थिति सारांश</p>
                <button className="btn-small">रिपोर्ट देखें</button>
              </div>
              <div className="report-card">
                <h3>💰 शुल्क रिपोर्ट</h3>
                <p>वित्तीय विवरण और भुगतान</p>
                <button className="btn-small">रिपोर्ट देखें</button>
              </div>
              <div className="report-card">
                <h3>👨‍🎓 छात्र प्रोफ़ाइल</h3>
                <p>व्यक्तिगत छात्र रिपोर्ट</p>
                <button className="btn-small">रिपोर्ट देखें</button>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="default-content">
            <h2>विद्यालय प्रबंधन प्रणाली में स्वागत है</h2>
            <p>आरंभ करने के लिए साइडबार से एक विकल्प चुनें।</p>
          </div>
        );
    }
  };

  return (
    <div className={`app ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>🏫 {schoolName}</h2>
          <button 
            className="toggle-btn" 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            title={sidebarOpen ? "साइडबार बंद करें" : "साइडबार खोलें"}
          >
            {sidebarOpen ? '◀' : '▶'}
          </button>
        </div>
        
        <nav className="sidebar-nav">
          <div 
            className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
            title="डैशबोर्ड"
          >
            <span>📊</span>
            <span>डैशबोर्ड</span>
          </div>
          
          <div 
            className={`nav-item ${activeTab === 'students' ? 'active' : ''}`}
            onClick={() => setActiveTab('students')}
            title="विद्यार्थी"
          >
            <span>👨‍🎓</span>
            <span>विद्यार्थी</span>
          </div>
          
          <div 
            className={`nav-item ${activeTab === 'teachers' ? 'active' : ''}`}
            onClick={() => setActiveTab('teachers')}
            title="शिक्षक"
          >
            <span>👩‍🏫</span>
            <span>शिक्षक</span>
          </div>
          
          <div 
            className={`nav-item ${activeTab === 'classes' ? 'active' : ''}`}
            onClick={() => setActiveTab('classes')}
            title="कक्षाएं"
          >
            <span>🏫</span>
            <span>कक्षाएं</span>
          </div>
          
          <div 
            className={`nav-item ${activeTab === 'attendance' ? 'active' : ''}`}
            onClick={() => setActiveTab('attendance')}
            title="उपस्थिति"
          >
            <span>✓</span>
            <span>उपस्थिति</span>
          </div>
          
          <div 
            className={`nav-item ${activeTab === 'fees' ? 'active' : ''}`}
            onClick={() => setActiveTab('fees')}
            title="शुल्क"
          >
            <span>💰</span>
            <span>शुल्क</span>
          </div>
          
          <div 
            className={`nav-item ${activeTab === 'reports' ? 'active' : ''}`}
            onClick={() => setActiveTab('reports')}
            title="रिपोर्ट"
          >
            <span>📈</span>
            <span>रिपोर्ट</span>
          </div>
          
          <div 
            className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
            title="सेटिंग"
          >
            <span>⚙️</span>
            <span>सेटिंग</span>
          </div>
        </nav>
        
        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">प्र</div>
            <div className="user-details">
              <h4>प्रधानाचार्य</h4>
              <p>{schoolName}</p>
            </div>
          </div>
          <button 
            className="logout-btn" 
            onClick={() => alert('सफलतापूर्वक लॉग आउट किया गया!')}
            title="लॉग आउट"
          >
            🔒
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Top Header */}
        <header className="top-header">
          <div className="header-left">
            <h1>{schoolName} - विद्यालय प्रबंधन प्रणाली</h1>
            <p>स्वागत है प्रधानाचार्य जी! आज की अपडेट यहाँ देखें।</p>
          </div>
          
          <div className="header-right">
            <div className="notification-icon">
              🔔
              {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
            </div>
            <div className="time-display">
              <div className="time">{getIndianTime()}</div>
              <div className="date">{getIndianDate()}</div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="content-wrapper">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

// CSS Styles (inline but you should move to separate CSS file in real project)
const styles = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Segoe UI', 'Noto Sans Devanagari', 'Arial', sans-serif;
    background: #f5f5f5;
    direction: ltr;
  }

  .app {
    display: flex;
    min-height: 100vh;
  }

  /* Sidebar Styles */
  .sidebar {
    width: 280px;
    background: linear-gradient(180deg, #1e3c72 0%, #2a5298 100%);
    color: white;
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    box-shadow: 2px 0 10px rgba(0,0,0,0.1);
  }

  .sidebar.closed {
    width: 70px;
  }

  .sidebar-header {
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
  }

  .sidebar-header h2 {
    font-size: 1.5rem;
    color: white;
    font-weight: 600;
  }

  .toggle-btn {
    background: rgba(255, 255, 255, 0.1);
    border: none;
    color: white;
    width: 30px;
    height: 30px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
  }

  .toggle-btn:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  .sidebar-nav {
    flex: 1;
    padding: 20px 0;
  }

  .nav-item {
    padding: 15px 25px;
    display: flex;
    align-items: center;
    gap: 15px;
    cursor: pointer;
    transition: all 0.3s ease;
    border-left: 4px solid transparent;
    font-size: 16px;
  }

  .nav-item:hover {
    background: rgba(255, 255, 255, 0.1);
    border-left-color: #FF9933;
  }

  .nav-item.active {
    background: rgba(255, 255, 255, 0.15);
    border-left-color: #FF9933;
  }

  .nav-item span:first-child {
    font-size: 20px;
  }

  .sidebar-footer {
    padding: 20px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: rgba(0, 0, 0, 0.1);
  }

  .user-info {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .user-avatar {
    width: 45px;
    height: 45px;
    background: linear-gradient(135deg, #FF9933, #138808);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 18px;
    border: 2px solid white;
  }

  .user-details h4 {
    font-size: 15px;
    margin-bottom: 3px;
  }

  .user-details p {
    font-size: 12px;
    opacity: 0.9;
  }

  .logout-btn {
    background: rgba(255, 255, 255, 0.1);
    border: none;
    color: white;
    font-size: 20px;
    cursor: pointer;
    padding: 8px;
    border-radius: 4px;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .logout-btn:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  /* Main Content Styles */
  .main-content {
    flex: 1;
    overflow-y: auto;
    background: #f8f9fa;
  }

  .top-header {
    background: white;
    padding: 20px 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 2px 10px rgba(0,0,0,0.08);
    border-bottom: 1px solid #e0e0e0;
  }

  .header-left h1 {
    font-size: 24px;
    color: #1e3c72;
    margin-bottom: 5px;
    font-weight: 600;
  }

  .header-left p {
    color: #666;
    font-size: 14px;
  }

  .header-right {
    display: flex;
    align-items: center;
    gap: 25px;
  }

  .notification-icon {
    position: relative;
    font-size: 24px;
    cursor: pointer;
    color: #1e3c72;
  }

  .notification-badge {
    position: absolute;
    top: -8px;
    right: -8px;
    background: #ff4757;
    color: white;
    font-size: 12px;
    padding: 3px 8px;
    border-radius: 50%;
    min-width: 20px;
    text-align: center;
  }

  .time-display {
    text-align: right;
  }

  .time {
    font-size: 24px;
    font-weight: 600;
    color: #1e3c72;
    margin-bottom: 5px;
  }

  .date {
    color: #666;
    font-size: 14px;
  }

  /* Content Wrapper */
  .content-wrapper {
    padding: 25px;
  }

  .content-title {
    font-size: 28px;
    color: #1e3c72;
    margin-bottom: 10px;
    font-weight: 600;
  }

  .subtitle {
    color: #666;
    margin-bottom: 25px;
    font-size: 16px;
  }

  /* Stats Grid */
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 20px;
    margin-bottom: 30px;
  }

  .stat-card {
    background: white;
    padding: 25px;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    display: flex;
    align-items: center;
    gap: 20px;
    transition: transform 0.3s ease;
    border: 1px solid #e8e8e8;
  }

  .stat-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 16px rgba(0,0,0,0.12);
  }

  .stat-icon {
    width: 60px;
    height: 60px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
  }

  .stat-icon.student {
    background: linear-gradient(135deg, #e3f2fd, #bbdefb);
    color: #0d47a1;
  }

  .stat-icon.teacher {
    background: linear-gradient(135deg, #f3e5f5, #e1bee7);
    color: #4a148c;
  }

  .stat-icon.course {
    background: linear-gradient(135deg, #e8f5e9, #c8e6c9);
    color: #1b5e20;
  }

  .stat-icon.attendance {
    background: linear-gradient(135deg, #fff3e0, #ffcc80);
    color: #e65100;
  }

  .stat-icon.result {
    background: linear-gradient(135deg, #ffebee, #ffcdd2);
    color: #c62828;
  }

  .stat-info h3 {
    font-size: 28px;
    color: #1e3c72;
    margin-bottom: 5px;
    font-weight: 700;
  }

  .stat-info p {
    color: #666;
    font-size: 15px;
    font-weight: 500;
  }

  .stat-trend {
    margin-left: auto;
    color: #138808;
    font-weight: bold;
    font-size: 14px;
    padding: 4px 10px;
    background: rgba(19, 136, 8, 0.1);
    border-radius: 20px;
  }

  /* Content Grid */
  .content-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 25px;
  }

  .chart-container, .recent-activity, .upcoming-events, 
  .quick-actions, .festivals-section {
    background: white;
    padding: 25px;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    border: 1px solid #e8e8e8;
  }

  .chart-container h3, .recent-activity h3, .upcoming-events h3, 
  .quick-actions h3, .festivals-section h3 {
    margin-bottom: 20px;
    color: #1e3c72;
    font-size: 20px;
    font-weight: 600;
    border-bottom: 2px solid #f0f0f0;
    padding-bottom: 10px;
  }

  .mock-chart {
    display: flex;
    align-items: flex-end;
    gap: 15px;
    height: 200px;
    padding: 20px 0;
    justify-content: space-around;
  }

  .chart-bar {
    flex: 1;
    background: linear-gradient(to top, #1e3c72, #2a5298);
    border-radius: 6px;
    min-height: 20px;
    position: relative;
    transition: all 0.3s ease;
  }

  .chart-bar:hover {
    background: linear-gradient(to top, #FF9933, #ffad5a);
  }

  .chart-bar span {
    position: absolute;
    bottom: -25px;
    left: 0;
    right: 0;
    text-align: center;
    font-size: 12px;
    color: #666;
  }

  /* Tables */
  table {
    width: 100%;
    border-collapse: collapse;
  }

  th {
    text-align: left;
    padding: 15px;
    background: #f8f9fa;
    color: #1e3c72;
    font-weight: 600;
    font-size: 14px;
    border-bottom: 2px solid #e0e0e0;
  }

  td {
    padding: 15px;
    border-bottom: 1px solid #eee;
    color: #333;
    font-size: 14px;
  }

  tr:hover {
    background: #f8f9fa;
  }

  .status-badge {
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    display: inline-block;
  }

  .status-badge.active {
    background: #e8f5e9;
    color: #138808;
    border: 1px solid #c8e6c9;
  }

  .status-badge.inactive {
    background: #ffebee;
    color: #c62828;
    border: 1px solid #ffcdd2;
  }

  /* Events */
  .events-list, .festivals-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .event-item, .festival-item {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 15px;
    border-radius: 10px;
    transition: background 0.3s;
    border: 1px solid #f0f0f0;
  }

  .event-item:hover, .festival-item:hover {
    background: #f8f9fa;
    border-color: #e0e0e0;
  }

  .event-date {
    background: linear-gradient(135deg, #e3f2fd, #bbdefb);
    color: #0d47a1;
    padding: 12px;
    border-radius: 10px;
    text-align: center;
    min-width: 70px;
    flex-shrink: 0;
  }

  .event-date strong {
    display: block;
    font-size: 22px;
    font-weight: 700;
  }

  .event-date span {
    font-size: 14px;
    font-weight: 600;
  }

  .event-details h4 {
    font-size: 16px;
    margin-bottom: 5px;
    color: #333;
    font-weight: 600;
  }

  .event-details p {
    font-size: 13px;
    color: #666;
  }

  .festival-icon {
    font-size: 28px;
    width: 60px;
    height: 60px;
    background: linear-gradient(135deg, #fff3e0, #ffcc80);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #e65100;
  }

  .festival-details h4 {
    font-size: 16px;
    margin-bottom: 5px;
    color: #333;
    font-weight: 600;
  }

  .festival-details p {
    font-size: 13px;
    color: #666;
  }

  /* Quick Actions */
  .actions-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }

  .action-btn {
    padding: 20px 10px;
    background: #f8f9fa;
    border: 2px solid #e0e0e0;
    border-radius: 10px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    transition: all 0.3s;
    font-size: 14px;
    font-weight: 500;
    color: #333;
  }

  .action-btn:hover {
    background: #1e3c72;
    color: white;
    border-color: #1e3c72;
    transform: translateY(-3px);
  }

  .action-btn span {
    font-size: 28px;
  }

  /* Buttons */
  .btn-primary {
    background: linear-gradient(135deg, #1e3c72, #2a5298);
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    font-size: 15px;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .btn-primary:hover {
    background: linear-gradient(135deg, #0d2c5e, #1a4285);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(30, 60, 114, 0.3);
  }

  .btn-secondary {
    background: white;
    color: #1e3c72;
    border: 2px solid #1e3c72;
    padding: 10px 20px;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    font-size: 14px;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .btn-secondary:hover {
    background: #1e3c72;
    color: white;
    transform: translateY(-2px);
  }

  .btn-small {
    padding: 8px 16px;
    background: linear-gradient(135deg, #1e3c72, #2a5298);
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 13px;
    font-weight: 500;
    transition: all 0.3s;
  }

  .btn-small:hover {
    background: linear-gradient(135deg, #0d2c5e, #1a4285);
    transform: translateY(-2px);
  }

  .btn-small.outline {
    background: white;
    color: #1e3c72;
    border: 2px solid #1e3c72;
  }

  .btn-small.outline:hover {
    background: #1e3c72;
    color: white;
  }

  .btn-icon {
    background: transparent;
    border: none;
    cursor: pointer;
    margin: 0 5px;
    font-size: 18px;
    padding: 8px;
    border-radius: 6px;
    transition: all 0.3s;
  }

  .btn-icon:hover {
    background: #f0f0f0;
    transform: scale(1.1);
  }

  .btn-icon.delete:hover {
    background: #ffebee;
    color: #c62828;
  }

  .btn-filter {
    background: #1e3c72;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 500;
  }

  /* Content Header */
  .content-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 25px;
  }

  .header-actions {
    display: flex;
    gap: 15px;
  }

  .search-filter {
    display: flex;
    gap: 15px;
    margin-bottom: 25px;
  }

  .search-input {
    flex: 1;
    padding: 12px 20px;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    font-size: 15px;
    transition: all 0.3s;
  }

  .search-input:focus {
    outline: none;
    border-color: #1e3c72;
    box-shadow: 0 0 0 3px rgba(30, 60, 114, 0.1);
  }

  .filter-select {
    padding: 12px 20px;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    background: white;
    font-size: 15px;
    min-width: 150px;
  }

  .filter-select:focus {
    outline: none;
    border-color: #1e3c72;
  }

  /* Data Table */
  .data-table {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    border: 1px solid #e8e8e8;
  }

  /* Teachers Grid */
  .teachers-grid, .classes-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 25px;
  }

  .teacher-card, .class-card {
    background: white;
    padding: 25px;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    border: 1px solid #e8e8e8;
    transition: transform 0.3s ease;
  }

  .teacher-card:hover, .class-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 16px rgba(0,0,0,0.12);
  }

  .teacher-avatar {
    width: 70px;
    height: 70px;
    background: linear-gradient(135deg, #1e3c72, #2a5298);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
    font-weight: bold;
    margin: 0 auto 20px;
    border: 3px solid #f0f0f0;
  }

  .teacher-info h3 {
    margin-bottom: 10px;
    color: #1e3c72;
    text-align: center;
    font-size: 18px;
    font-weight: 600;
  }

  .teacher-info .subject {
    color: #FF9933;
    font-weight: 600;
    margin-bottom: 5px;
    text-align: center;
    font-size: 16px;
  }

  .teacher-info .qualification {
    color: #666;
    font-size: 14px;
    margin-bottom: 5px;
    text-align: center;
  }

  .teacher-info .experience, .teacher-info .phone {
    color: #888;
    font-size: 13px;
    text-align: center;
  }

  .teacher-actions, .class-actions {
    display: flex;
    gap: 10px;
    margin-top: 20px;
    justify-content: center;
  }

  .class-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 2px solid #f0f0f0;
  }

  .class-header h3 {
    color: #1e3c72;
    font-size: 20px;
    font-weight: 600;
  }

  .class-section {
    background: #e3f2fd;
    color: #0d47a1;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 14px;
    font-weight: 600;
  }

  .class-details {
    margin-bottom: 20px;
  }

  .detail-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid #f0f0f0;
  }

  .detail-item:last-child {
    border-bottom: none;
  }

  .detail-item span {
    color: #666;
    font-size: 14px;
  }

  .detail-item strong {
    color: #333;
    font-weight: 600;
  }

  /* Attendance */
  .attendance-container {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 30px;
  }

  .calendar-view, .attendance-stats {
    background: white;
    padding: 25px;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    border: 1px solid #e8e8e8;
  }

  .calendar-view h3 {
    color: #1e3c72;
    font-size: 20px;
    margin-bottom: 20px;
    text-align: center;
  }

  .calendar {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 5px;
    margin-top: 20px;
  }

  .calendar-header {
    text-align: center;
    padding: 10px;
    background: #f8f9fa;
    font-weight: 600;
    color: #1e3c72;
    border-radius: 6px;
  }

  .calendar-day {
    aspect-ratio: 1;
    padding: 8px;
    border: 1px solid #eee;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    background: white;
    transition: all 0.3s;
  }

  .calendar-day:hover {
    background: #f8f9fa;
    border-color: #1e3c72;
  }

  .calendar-day.today {
    background: #1e3c72;
    color: white;
    border-color: #1e3c72;
  }

  .day-stats {
    position: absolute;
    bottom: 2px;
    font-size: 9px;
    color: #666;
  }

  .calendar-day.today .day-stats {
    color: rgba(255, 255, 255, 0.9);
  }

  .stat-item {
    padding: 20px;
    border-radius: 10px;
    position: relative;
    margin-bottom: 15px;
  }

  .stat-item.present {
    background: linear-gradient(135deg, #e8f5e9, #c8e6c9);
    border-left: 4px solid #138808;
  }

  .stat-item.absent {
    background: linear-gradient(135deg, #ffebee, #ffcdd2);
    border-left: 4px solid #c62828;
  }

  .stat-item.late {
    background: linear-gradient(135deg, #fff3e0, #ffcc80);
    border-left: 4px solid #e65100;
  }

  .stat-item h4 {
    margin-bottom: 5px;
    color: #333;
    font-size: 16px;
    font-weight: 600;
  }

  .stat-item p {
    color: #666;
    font-size: 14px;
  }

  .stat-item span {
    position: absolute;
    right: 20px;
    top: 20px;
    font-size: 28px;
    font-weight: 700;
  }

  .attendance-actions {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-top: 25px;
  }

  /* Fees Management */
  .fees-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 25px;
    margin-bottom: 30px;
  }

  .fees-card {
    padding: 25px;
    border-radius: 12px;
    color: white;
    text-align: center;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  }

  .fees-card.collected {
    background: linear-gradient(135deg, #138808, #1bb908);
  }

  .fees-card.pending {
    background: linear-gradient(135deg, #FF9933, #ffad5a);
  }

  .fees-card.overdue {
    background: linear-gradient(135deg, #c62828, #e53935);
  }

  .fees-card h3 {
    font-size: 32px;
    margin-bottom: 10px;
    font-weight: 700;
  }

  .fees-card p {
    font-size: 16px;
    margin-bottom: 10px;
    opacity: 0.9;
  }

  .fees-card span {
    display: inline-block;
    padding: 4px 12px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 20px;
    font-size: 14px;
    font-weight: 600;
  }

  .fees-table {
    background: white;
    padding: 25px;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  }

  .fees-table h3 {
    margin-bottom: 20px;
    color: #1e3c72;
    font-size: 20px;
    font-weight: 600;
  }

  /* Reports */
  .reports-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 25px;
  }

  .report-card {
    background: white;
    padding: 25px;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    border: 1px solid #e8e8e8;
    transition: transform 0.3s ease;
  }

  .report-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 16px rgba(0,0,0,0.12);
  }

  .report-card h3 {
    margin-bottom: 10px;
    color: #1e3c72;
    font-size: 18px;
    font-weight: 600;
  }

  .report-card p {
    color: #666;
    font-size: 14px;
    margin-bottom: 20px;
  }

  /* Responsive Design */
  @media (max-width: 1200px) {
    .attendance-container {
      grid-template-columns: 1fr;
    }
    
    .fees-stats {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 992px) {
    .sidebar {
      position: fixed;
      left: -280px;
      top: 0;
      bottom: 0;
      z-index: 1000;
    }

    .sidebar-open .sidebar {
      left: 0;
    }

    .fees-stats {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 768px) {
    .top-header {
      flex-direction: column;
      gap: 15px;
      text-align: center;
    }
    
    .header-right {
      flex-direction: column;
      gap: 15px;
    }
    
    .content-header {
      flex-direction: column;
      gap: 15px;
      align-items: stretch;
    }
    
    .header-actions {
      flex-direction: column;
    }
    
    .search-filter {
      flex-direction: column;
    }
    
    .stats-grid {
      grid-template-columns: repeat(2, 1fr);
    }
    
    .actions-grid {
      grid-template-columns: 1fr;
    }
    
    .teachers-grid, .classes-grid, .reports-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 576px) {
    .content-wrapper {
      padding: 15px;
    }
    
    .stats-grid {
      grid-template-columns: 1fr;
    }
    
    .stat-card {
      flex-direction: column;
      text-align: center;
    }
    
    .stat-trend {
      margin-left: 0;
      margin-top: 10px;
    }
  }
`;

// Inject styles
const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

export default App;