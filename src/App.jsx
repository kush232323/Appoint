// App.jsx
import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [showBookingAlert, setShowBookingAlert] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Toggle Dark/Light Mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
  };

  // Handle Form Input Change
  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle Form Submit
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setFormSubmitted(true);
      setTimeout(() => setFormSubmitted(false), 3000);
      setFormData({ name: '', email: '', message: '' });
    }
  };

  // Gallery Images - Category Wise
  const galleryCategories = {
    all: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800&auto=format',
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=800&auto=format',
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=800&auto=format',
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=800&auto=format',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format'
    ],
    rooms: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format',
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=800&auto=format',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=800&auto=format'
    ],
    dining: [
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=800&auto=format',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format'
    ],
    wellness: [
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800&auto=format',
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=800&auto=format'
    ]
  };

  // Get current gallery images based on category
  const getCurrentGalleryImages = () => {
    return galleryCategories[activeCategory] || galleryCategories.all;
  };

  // Image URLs
  const images = {
    hero: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2000&auto=format',
    heritage1: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200&auto=format',
    heritage2: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=1000&auto=format',
    suite1: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=1200&auto=format',
    suite2: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format',
    suite3: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1200&auto=format',
    dining1: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1400&auto=format',
    dining2: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1400&auto=format',
    spa: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=900&auto=format',
    pool: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=900&auto=format',
    walk: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=900&auto=format',
    celebration: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=900&auto=format',
    cta: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=2000&auto=format',
    modal: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=1200&auto=format',
    award1: 'https://cdn-icons-png.flaticon.com/512/1828/1828884.png',
    award2: 'https://cdn-icons-png.flaticon.com/512/2589/2589175.png',
    award3: 'https://cdn-icons-png.flaticon.com/512/3159/3159321.png',
    team1: 'https://randomuser.me/api/portraits/women/68.jpg',
    team2: 'https://randomuser.me/api/portraits/men/32.jpg',
    team3: 'https://randomuser.me/api/portraits/women/45.jpg',
    team4: 'https://randomuser.me/api/portraits/men/75.jpg',
    blog1: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=800&auto=format',
    blog2: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format',
    blog3: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=800&auto=format',
    amenity1: 'https://cdn-icons-png.flaticon.com/512/1903/1903234.png',
    amenity2: 'https://cdn-icons-png.flaticon.com/512/2645/2645895.png',
    amenity3: 'https://cdn-icons-png.flaticon.com/512/1041/1041918.png',
    amenity4: 'https://cdn-icons-png.flaticon.com/512/3106/3106774.png',
    amenity5: 'https://cdn-icons-png.flaticon.com/512/2997/2997672.png',
    amenity6: 'https://cdn-icons-png.flaticon.com/512/1061/1061026.png'
  };

  // Amenities Data
  const amenities = [
    { icon: images.amenity1, title: 'Free Wi-Fi', desc: 'High-speed internet throughout the property' },
    { icon: images.amenity2, title: 'Spa & Wellness', desc: 'Full-service Ayurvedic spa' },
    { icon: images.amenity3, title: 'Infinity Pool', desc: 'Heated pool with mountain views' },
    { icon: images.amenity4, title: 'Fine Dining', desc: 'Multiple award-winning restaurants' },
    { icon: images.amenity5, title: 'Butler Service', desc: '24/7 personalized service' },
    { icon: images.amenity6, title: 'Fitness Center', desc: 'State-of-the-art gym equipment' }
  ];

  // Events Data
  const events = [
    { title: 'Wedding Packages', desc: 'Royal weddings with traditional ceremonies', price: 'Starting at ₹25L' },
    { title: 'Corporate Events', desc: 'Conference rooms with modern amenities', price: 'Custom pricing' },
    { title: 'Private Parties', desc: 'Exclusive celebrations in palace venues', price: 'On request' }
  ];

  // Offers Data
  const offers = [
    { title: 'Early Bird Special', discount: '25% OFF', desc: 'Book 30 days in advance', code: 'EARLY25' },
    { title: 'Weekend Getaway', discount: '15% OFF', desc: 'Friday to Sunday stays', code: 'WEEKEND15' },
    { title: 'Honeymoon Package', discount: '30% OFF', desc: 'Romantic getaway for couples', code: 'HONEY30' }
  ];

  // Blog Posts
  const blogPosts = [
    { title: 'A Royal Wedding at The Aravalli Palace', date: 'March 15, 2025', desc: 'Experience the grandeur of palace weddings with our exclusive wedding packages...' },
    { title: 'The Art of Ayurvedic Wellness', date: 'March 10, 2025', desc: 'Discover our signature spa treatments inspired by ancient Indian traditions...' },
    { title: 'Exploring the Aravalli Hills', date: 'March 5, 2025', desc: 'A guide to heritage walks and nature trails around the palace...' }
  ];

  // Handle scroll for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll);
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('in'), (i % 3) * 120);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    
    setTimeout(() => {
      document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    }, 100);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  // Show welcome popup after 1.4 seconds
  useEffect(() => {
    const timer = setTimeout(() => setModalOpen(true), 1400);
    return () => clearTimeout(timer);
  }, []);

  const closeModal = () => setModalOpen(false);
  const handleBookingAlert = () => {
    setShowBookingAlert(true);
    setTimeout(() => setShowBookingAlert(false), 2000);
  };

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const element = document.querySelector(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="app">
      {/* Header */}
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="wrap nav">
          <div className="logo">
            The Aravalli <span>Palace</span>
            <small>Gurugram · Est. 1924</small>
          </div>
          <ul className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
            <li><a href="#home" onClick={(e) => handleSmoothScroll(e, '#home')}>Home</a></li>
            <li><a href="#heritage" onClick={(e) => handleSmoothScroll(e, '#heritage')}>Heritage</a></li>
            <li><a href="#suites" onClick={(e) => handleSmoothScroll(e, '#suites')}>Suites</a></li>
            <li><a href="#dining" onClick={(e) => handleSmoothScroll(e, '#dining')}>Dining</a></li>
            <li><a href="#wellness" onClick={(e) => handleSmoothScroll(e, '#wellness')}>Wellness</a></li>
            <li><a href="#gallery" onClick={(e) => handleSmoothScroll(e, '#gallery')}>Gallery</a></li>
            <li><a href="#contact" onClick={(e) => handleSmoothScroll(e, '#contact')}>Contact</a></li>
          </ul>
          <div className="header-actions">
            <button className="mode-toggle" onClick={toggleDarkMode} aria-label="Toggle Dark Mode">
              {darkMode ? '☀️' : '🌙'}
            </button>
            <a href="#book" className="btn" onClick={(e) => handleSmoothScroll(e, '#book')}>Reserve</a>
          </div>
          <div className="burger" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <span></span><span></span><span></span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-video">
          <video autoPlay loop muted playsInline className="bg-video">
            <source src="https://assets.mixkit.co/videos/preview/mixkit-girl-in-yoga-pose-by-the-pool-32878-large.mp4" type="video/mp4" />
          </video>
        </div>
        {images.hero && <img className="poster" src={images.hero} alt="Hero" />}
        <div className="hero-inner">
          <p className="eyebrow">A Legacy of Timeless Hospitality</p>
          <h1>Where Royalty <em>Resides</em></h1>
          <p>An exclusive heritage retreat nestled in the Aravalli hills — palatial suites, celebrated kitchens, and service worthy of kings.</p>
          <div className="hero-btns">
            <a href="#book" className="btn solid" onClick={(e) => handleSmoothScroll(e, '#book')}>Book Now</a>
            <a href="#suites" className="btn" onClick={(e) => handleSmoothScroll(e, '#suites')}>Explore Suites</a>
          </div>
        </div>
        <div className="scroll-cue"><span>Scroll</span><i></i></div>
      </section>

      {/* Booking Bar */}
      <div className="booking" id="book">
        <div className="field"><label>Arrival</label><input type="date" /></div>
        <div className="field"><label>Departure</label><input type="date" /></div>
        <div className="field"><label>Guests</label><select><option>1 Adult</option><option>2 Adults</option><option>2 Adults · 1 Child</option><option>Family Suite</option></select></div>
        <a href="#" className="btn solid" onClick={(e) => { e.preventDefault(); handleBookingAlert(); }}>Check Availability</a>
      </div>

      {/* Heritage Section */}
      <section id="heritage">
        <div className="wrap heritage">
          <div className="imgs reveal">
            {images.heritage1 && <img src={images.heritage1} alt="Heritage" />}
            {images.heritage2 && <img src={images.heritage2} alt="Courtyard" />}
          </div>
          <div className="reveal">
            <p className="eyebrow">Our Story</p>
            <h2>A century of grace, written in marble and gold</h2>
            <p>Built as a maharaja's residence and lovingly restored, The Aravalli Palace blends the grandeur of a bygone era with the quiet comforts of modern luxury.</p>
            <p>From hand-painted frescoes to gardens scented with jasmine, we have preserved the soul of the palace while reimagining it for the discerning traveller of today.</p>
            <div className="sig">— The House of Aravalli</div>
          </div>
        </div>
      </section>

      {/* Amenities Section - NEW */}
      <section className="amenities-section">
        <div className="wrap">
          <div className="section-head reveal">
            <p className="eyebrow">Luxury Amenities</p>
            <h2>World-Class Facilities</h2>
            <div className="divider"></div>
          </div>
          <div className="amenities-grid">
            {amenities.map((amenity, index) => (
              <div key={index} className="amenity reveal">
                <img src={amenity.icon} alt={amenity.title} />
                <h3>{amenity.title}</h3>
                <p>{amenity.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Suites Section */}
      <section className="suites" id="suites">
        <div className="wrap">
          <div className="section-head reveal">
            <p className="eyebrow">Accommodation</p>
            <h2>Suites &amp; Residences</h2>
            <div className="divider"></div>
          </div>
          <div className="suite-grid">
            <div className="suite reveal">
              <div className="ph">{images.suite1 && <img src={images.suite1} alt="Heritage Room" />}</div>
              <div className="body"><div className="meta">Garden View · 55 sqm</div><h3>Heritage Room</h3><p>A graceful retreat overlooking the palace gardens.</p><div className="price">₹24,000 <small>/ night</small></div></div>
            </div>
            <div className="suite reveal">
              <div className="ph">{images.suite2 && <img src={images.suite2} alt="Palace Suite" />}</div>
              <div className="body"><div className="meta">Courtyard · 80 sqm</div><h3>Palace Suite</h3><p>A sprawling suite with a private living room.</p><div className="price">₹42,000 <small>/ night</small></div></div>
            </div>
            <div className="suite reveal">
              <div className="ph">{images.suite3 && <img src={images.suite3} alt="Maharaja Suite" />}</div>
              <div className="body"><div className="meta">Top Floor · 140 sqm</div><h3>Maharaja Suite</h3><p>Signature residence with private terrace.</p><div className="price">₹95,000 <small>/ night</small></div></div>
            </div>
          </div>
        </div>
      </section>

      {/* Dining Section */}
      <section className="dining" id="dining">
        <div className="wrap">
          <div className="section-head reveal">
            <p className="eyebrow">Culinary Journeys</p>
            <h2>Dining</h2>
            <div className="divider"></div>
          </div>
          <div className="dine-grid">
            <div className="dine reveal">{images.dining1 && <img src={images.dining1} alt="The Durbar Hall" />}<div className="cap"><span>Signature · Indian</span><h3>The Durbar Hall</h3><p>Royal Awadhi cuisine under chandelier-lit dome.</p></div></div>
            <div className="dine reveal">{images.dining2 && <img src={images.dining2} alt="The Conservatory" />}<div className="cap"><span>All Day · European</span><h3>The Conservatory</h3><p>Garden-side breakfasts and continental plates.</p></div></div>
          </div>
        </div>
      </section>

      {/* Wellness Section */}
      <section id="wellness">
        <div className="wrap">
          <div className="section-head reveal">
            <p className="eyebrow">Curated Experiences</p>
            <h2>Moments to Remember</h2>
            <div className="divider"></div>
          </div>
          <div className="exp-grid">
            <div className="exp reveal"><div className="ph">{images.spa && <img src={images.spa} alt="Spa" />}</div><h3>The Spa</h3><p>Ayurvedic rituals in private therapy suites.</p></div>
            <div className="exp reveal"><div className="ph">{images.pool && <img src={images.pool} alt="Pool" />}</div><h3>Infinity Pool</h3><p>A heated pool overlooking the Aravalli ridge.</p></div>
            <div className="exp reveal"><div className="ph">{images.walk && <img src={images.walk} alt="Heritage Walks" />}</div><h3>Heritage Walks</h3><p>Guided tours through the palace and its history.</p></div>
            <div className="exp reveal"><div className="ph">{images.celebration && <img src={images.celebration} alt="Celebrations" />}</div><h3>Celebrations</h3><p>Regal weddings &amp; events in courtyard lawns.</p></div>
          </div>
        </div>
      </section>

      {/* Gallery Section - Category Wise */}
      <section className="gallery-section" id="gallery">
        <div className="wrap">
          <div className="section-head reveal">
            <p className="eyebrow">Visual Journey</p>
            <h2>Our Gallery</h2>
            <div className="divider"></div>
          </div>
          <div className="gallery-categories">
            <button className={activeCategory === 'all' ? 'active' : ''} onClick={() => setActiveCategory('all')}>All</button>
            <button className={activeCategory === 'rooms' ? 'active' : ''} onClick={() => setActiveCategory('rooms')}>Rooms & Suites</button>
            <button className={activeCategory === 'dining' ? 'active' : ''} onClick={() => setActiveCategory('dining')}>Dining</button>
            <button className={activeCategory === 'wellness' ? 'active' : ''} onClick={() => setActiveCategory('wellness')}>Wellness</button>
          </div>
          <div className="gallery-grid">
            {getCurrentGalleryImages().map((img, index) => (
              <div key={index} className="gallery-item reveal">
                <img src={img} alt={`Gallery ${index + 1}`} />
                <div className="gallery-overlay"><span>View</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Offers Section - NEW */}
      <section className="offers-section">
        <div className="wrap">
          <div className="section-head reveal">
            <p className="eyebrow">Special Offers</p>
            <h2>Exclusive Deals</h2>
            <div className="divider"></div>
          </div>
          <div className="offers-grid">
            {offers.map((offer, index) => (
              <div key={index} className="offer-card reveal">
                <div className="offer-discount">{offer.discount}</div>
                <h3>{offer.title}</h3>
                <p>{offer.desc}</p>
                <div className="offer-code">Code: {offer.code}</div>
                <a href="#book" className="btn" onClick={(e) => handleSmoothScroll(e, '#book')}>Book Now</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events Section - NEW */}
      <section className="events-section">
        <div className="wrap">
          <div className="section-head reveal">
            <p className="eyebrow">Celebrations</p>
            <h2>Events & Weddings</h2>
            <div className="divider"></div>
          </div>
          <div className="events-grid">
            {events.map((event, index) => (
              <div key={index} className="event-card reveal">
                <h3>{event.title}</h3>
                <p>{event.desc}</p>
                <div className="event-price">{event.price}</div>
                <a href="#contact" className="btn" onClick={(e) => handleSmoothScroll(e, '#contact')}>Inquire Now</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mode Section */}
      <section className="mode-section">
        <div className="wrap">
          <div className="mode-content reveal">
            <div className="mode-icon">{darkMode ? '🌙' : '☀️'}</div>
            <h2>{darkMode ? 'Dark Mode Active' : 'Light Mode Active'}</h2>
            <p>Experience the website in your preferred theme. Click the sun/moon icon in the header to switch between dark and light modes.</p>
            <button className="btn solid" onClick={toggleDarkMode}>Switch to {darkMode ? 'Light' : 'Dark'} Mode</button>
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="awards-section">
        <div className="wrap">
          <div className="section-head reveal">
            <p className="eyebrow">Recognition</p>
            <h2>Awards & Accolades</h2>
            <div className="divider"></div>
          </div>
          <div className="awards-grid">
            <div className="award reveal"><img src={images.award1} alt="Award" /><h4>World's Best Luxury Hotel</h4><p>2024</p></div>
            <div className="award reveal"><img src={images.award2} alt="Award" /><h4>Best Heritage Property</h4><p>2023</p></div>
            <div className="award reveal"><img src={images.award3} alt="Award" /><h4>Outstanding Service Award</h4><p>2024</p></div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="wrap">
          <div className="section-head reveal">
            <p className="eyebrow">Our People</p>
            <h2>Leadership Team</h2>
            <div className="divider"></div>
          </div>
          <div className="team-grid">
            <div className="team reveal"><img src={images.team1} alt="Team" /><h4>Priya Singh</h4><p>General Manager</p></div>
            <div className="team reveal"><img src={images.team2} alt="Team" /><h4>Arjun Mehta</h4><p>Executive Chef</p></div>
            <div className="team reveal"><img src={images.team3} alt="Team" /><h4>Sarah Khan</h4><p>Director of Sales</p></div>
            <div className="team reveal"><img src={images.team4} alt="Team" /><h4>Vikram Rathore</h4><p>Spa Director</p></div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="blog-section">
        <div className="wrap">
          <div className="section-head reveal">
            <p className="eyebrow">Stories</p>
            <h2>Latest from Our Blog</h2>
            <div className="divider"></div>
          </div>
          <div className="blog-grid">
            {blogPosts.map((post, index) => (
              <div key={index} className="blog-card reveal">
                <img src={images[`blog${index+1}`]} alt={post.title} />
                <div className="blog-content">
                  <span className="blog-date">{post.date}</span>
                  <h3>{post.title}</h3>
                  <p>{post.desc}</p>
                  <a href="#" className="read-more">Read More →</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="cta-band">
        {images.cta && <img src={images.cta} alt="Palace view" />}
        <div className="wrap">
          <p className="eyebrow" style={{ color: 'var(--gold-light)' }}>An Invitation</p>
          <h2>Your Palace Awaits</h2>
          <p>Reserve your stay and let us craft an experience tailored to you, from arrival to farewell.</p>
          <a href="#book" className="btn" onClick={(e) => handleSmoothScroll(e, '#book')}>Reserve Your Suite</a>
        </div>
      </section>

      {/* Testimonial */}
      <section>
        <div className="wrap quote reveal">
          <div className="stars">★ ★ ★ ★ ★</div>
          <blockquote>"From the moment the gates opened, we were treated like royalty. The most exquisite stay of our lives."</blockquote>
          <cite>— Featured in Condé Nast Traveller</cite>
        </div>
      </section>

      {/* Contact Section - WORKING FORM */}
      <section className="contact-section" id="contact">
        <div className="wrap">
          <div className="section-head reveal">
            <p className="eyebrow">Get In Touch</p>
            <h2>Contact Us</h2>
            <div className="divider"></div>
          </div>
          <div className="contact-grid">
            <div className="contact-info reveal">
              <h3>Visit Us</h3>
              <p>📍 Sector 00, Gurugram, Haryana, India</p>
              <p>📞 +91 00000 00000</p>
              <p>✉️ stay@aravallipalace.com</p>
              <div className="contact-hours">
                <h4>Reservation Hours</h4>
                <p>Monday - Friday: 9:00 AM - 8:00 PM</p>
                <p>Saturday - Sunday: 10:00 AM - 6:00 PM</p>
              </div>
            </div>
            <div className="contact-form reveal">
              <form onSubmit={handleFormSubmit}>
                <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleFormChange} required />
                <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleFormChange} required />
                <textarea name="message" placeholder="Your Message" rows="5" value={formData.message} onChange={handleFormChange} required></textarea>
                <button type="submit" className="btn solid">Send Message</button>
                {formSubmitted && <div className="form-success">✓ Message sent successfully!</div>}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="wrap">
          <div className="foot-grid">
            <div><div className="logo">The Aravalli <span style={{ color: 'var(--gold-light)' }}>Palace</span></div><p>A heritage luxury retreat in the Aravalli hills.</p></div>
            <div><h4>Explore</h4><ul><li><a href="#heritage" onClick={(e) => handleSmoothScroll(e, '#heritage')}>Heritage</a></li><li><a href="#suites" onClick={(e) => handleSmoothScroll(e, '#suites')}>Suites</a></li><li><a href="#dining" onClick={(e) => handleSmoothScroll(e, '#dining')}>Dining</a></li><li><a href="#gallery" onClick={(e) => handleSmoothScroll(e, '#gallery')}>Gallery</a></li></ul></div>
            <div><h4>Contact</h4><ul><li>Sector 00, Gurugram</li><li>+91 00000 00000</li><li>stay@aravallipalace.com</li></ul></div>
            <div className="foot-news"><h4>Newsletter</h4><input type="email" placeholder="Your email address" /><a href="#" className="btn" style={{ color: 'var(--gold-light)', borderColor: 'var(--gold-light)' }} onClick={(e) => e.preventDefault()}>Subscribe</a></div>
          </div>
          <div className="foot-bottom"><span>© 2025 The Aravalli Palace. All rights reserved.</span><span>Privacy · Terms · Crafted for luxury</span></div>
        </div>
      </footer>

      {/* Welcome Modal */}
      {modalOpen && (<div className="modal-overlay show" onClick={closeModal}><div className="modal" onClick={(e) => e.stopPropagation()}><button className="close" onClick={closeModal}>&times;</button><div className="pic">{images.modal && <img src={images.modal} alt="Luxury suite" />}</div><div className="content"><p className="eyebrow">An Exclusive Invitation</p><h3>Welcome to the Palace</h3><p className="offer">Enjoy 20% off your first stay</p><p>Reserve direct and receive complimentary breakfast, a suite upgrade on arrival, and late checkout.</p><a href="#book" className="btn solid" onClick={(e) => { e.preventDefault(); closeModal(); handleSmoothScroll(e, '#book'); }}>Book Now</a><button className="later" onClick={closeModal}>Maybe later</button></div></div></div>)}

      {/* Booking Alert */}
      {showBookingAlert && (<div className="booking-alert">Connect this to your booking engine ↓</div>)}
    </div>
  );
};

export default App;