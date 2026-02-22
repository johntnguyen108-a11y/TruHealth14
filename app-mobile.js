
// app-mobile.fixed.js
// TruHealth Mobile – fixed and simplified app logic

let currentProvider = null;
let selectedDate = null;
let selectedTime = null;
let callTimer = 0;
let callInterval = null;
let analyzedBills = [];
let disputedBillIds = [];

// User Profile & Insurance
let userProfile = { fullName: '', dateOfBirth: '', address: '', insuranceProvider: null, profileComplete: false };
try {
  const saved = localStorage.getItem('truhealth_profile');
  if (saved) userProfile = JSON.parse(saved);
} catch (e) { /* ignore */ }

const insuranceProviders = [
  {id: 'bluecross', name: 'BlueCross BlueShield', shortName: 'BCBS', icon: '🔵', color: '#1e88e5', description: 'Nationwide coverage with extensive provider network'},
  {id: 'unitedhealthcare', name: 'UnitedHealthcare', shortName: 'UHC', icon: '🏥', color: '#ff6f00', description: 'Comprehensive plans with wellness programs'},
  {id: 'aetna', name: 'Aetna', shortName: 'Aetna', icon: '💜', color: '#9c27b0', description: 'Quality care with innovative health solutions'}
];
const getInsuranceInfo = (id) => insuranceProviders.find(i => i.id === id);
function saveUserProfile(){ try { localStorage.setItem('truhealth_profile', JSON.stringify(userProfile)); } catch(e){} }

// Pages
const pages = {
  home: `
  <div class="header">
    <h1>TruHealth</h1>
    <p>100% Transparent Healthcare</p>
  </div>
  <div class="page-content">
    <div class="feature-card" onclick="showPage('search')">
      <div class="feature-icon" style="background:linear-gradient(135deg,#1e88e5,#43a047)">🔍</div>
      <h3>Find Care</h3>
      <p>Search by price, location, quality, experience, insurance and more.</p>
    </div>
    <div class="feature-card" onclick="showPage('chatbot')">
      <div class="feature-icon" style="background:linear-gradient(135deg,#9c27b0,#7b1fa2)">💬</div>
      <h3>AI Health Assistant</h3>
      <p>Simple, step‑by‑step guidance. <b>Not a substitute for medical advice.</b></p>
    </div>
    <div class="feature-card" onclick="showPage('bills')">
      <div class="feature-icon" style="background:linear-gradient(135deg,#00acc1,#0097a7)">📄</div>
      <h3>Bill Analyzer</h3>
      <p>Spot errors/overcharges and dispute through TruHealth.</p>
    </div>
    <div class="feature-card" onclick="showProfile()">
      <div class="feature-icon" style="background:linear-gradient(135deg,#ff6f00,#e65100)">👤</div>
      <h3>Your Profile</h3>
      <p>${userProfile.profileComplete ? 'Profile complete' : 'Complete your profile for tailored results'}</p>
    </div>
    <div class="feature-card" onclick="showPage('premium')">
      <div class="feature-icon" style="background:linear-gradient(135deg,#1e88e5,#43a047)">⭐</div>
      <h3>Premium</h3>
      <p>Unlock advanced filters, AI support, and priority booking.</p>
    </div>

    <div class="profile-section" style="margin-top:16px">
      <h3>Quick Stats</h3>
      <p>Appointments: <b id="homeApptCount">0</b> • Bills analyzed: <b id="homeBillCount">0</b></p>
    </div>
  </div>
  `,
  search: `
  <div class="page-header"><button class="back-btn" onclick="showPage('home')">← Back</button><img src="TruHealth_Logo.png" class="header-logo" alt="TruHealth"></div>
  <div class="page-content">
    <div class="search-section">
      <div class="input-group">
        <label>Type of Care</label>
        <select id="specialtySelect">
          <option value="">Select specialty</option>
          <option value="chiropractic">Chiropractic Care</option>
          <option value="family">Family Medicine</option>
          <option value="therapy">Therapy/Counseling</option>
          <option value="orthodontist">Orthodontist</option>
          <option value="dentist">Dentist</option>
          <option value="optometrist">Optometrist</option>
        </select>
      </div>
    </div>
    <div class="filter-section">
      <h4>Experience Level</h4>
      <div class="filter-chips" data-cat="experience">
        <div class="chip active" onclick="toggleFilter(this,'experience','all')">All</div>
        <div class="chip" onclick="toggleFilter(this,'experience','5')">5+ Years</div>
        <div class="chip" onclick="toggleFilter(this,'experience','10')">10+ Years</div>
        <div class="chip" onclick="toggleFilter(this,'experience','15')">15+ Years</div>
      </div>
      <h4 style="margin-top:14px">Price Range</h4>
      <div class="filter-chips" data-cat="price">
        <div class="chip active" onclick="toggleFilter(this,'price','all')">Any</div>
        <div class="chip" onclick="toggleFilter(this,'price','under50')">Under $50</div>
        <div class="chip" onclick="toggleFilter(this,'price','50to100')">$50–$100</div>
        <div class="chip" onclick="toggleFilter(this,'price','100plus')">$100+</div>
      </div>
      <h4 style="margin-top:14px">Availability</h4>
      <div class="filter-chips" data-cat="availability">
        <div class="chip active" onclick="toggleFilter(this,'availability','any')">Any</div>
        <div class="chip" onclick="toggleFilter(this,'availability','same-day')">Same Day</div>
        <div class="chip" onclick="toggleFilter(this,'availability','next-day')">Next Day</div>
        <div class="chip" onclick="toggleFilter(this,'availability','this-week')">This Week</div>
      </div>
      <button class="btn-primary" onclick="searchProviders()">Search Providers</button>
    </div>

    <div id="providerResults" style="display:none"></div>
    <div id="noResults" class="no-results" style="display:none">No providers match your filters.</div>
  </div>
  `,
  chatbot: `
  <div class="page-header"><button class="back-btn" onclick="showPage('home')">← Back</button><img src="TruHealth_Logo.png" class="header-logo" alt="TruHealth"></div>
  <div class="page-content">
    <div class="profile-section">
      <h3>AI Assistant</h3>
      <p><b>Disclaimer:</b> For information only. Not medical advice. If symptoms are severe, call emergency services.</p>
    </div>
    <div class="profile-section">
      <div class="symptom-chips">
        <div class="symptom-chip" onclick="selectSymptom('fever')">🌡️ Fever</div>
        <div class="symptom-chip" onclick="selectSymptom('headache')">🤕 Headache</div>
        <div class="symptom-chip" onclick="selectSymptom('nausea')">🤢 Nausea</div>
        <div class="symptom-chip" onclick="selectSymptom('cough')">🤧 Cough</div>
        <div class="symptom-chip" onclick="selectSymptom('sore throat')">😷 Sore Throat</div>
      </div>
    </div>
    <div id="chatContainer" class="chat-container"></div>
    <div class="chat-input-container">
      <input id="chatInput" class="chat-input" placeholder="Type your message..." />
      <button class="send-btn" onclick="sendMessage()">➤</button>
    </div>
    <button class="chat-with-doctor-btn" onclick="showCallScreen()">📞 Call / Chat with a Real Doctor</button>
  </div>

  <div id="callScreen" class="call-doctor-screen">
    <div class="page-header"><button class="back-btn" onclick="hideCallScreen()">← Back</button><h2 style="display:none">Talk to Doctor</h2></div>
    <div class="page-content" id="careTypeContent">
      <div class="call-option" onclick="selectCareType('general')"><h3>🧑‍⚕️ General Health</h3><p>Common symptoms, preventive care</p></div>
      <div class="call-option" onclick="selectCareType('urgent')"><h3>🚑 Urgent Care</h3><p>Immediate concerns, injuries</p></div>
    </div>
    <div class="page-content" id="providerSelectContent" style="display:none">
      <h3 style="margin-bottom:10px">Select a Doctor</h3>
      <div id="doctorList"></div>
    </div>
    <div class="page-content" id="connectionTypeContent" style="display:none">
      <div class="call-option" onclick="initiateCall()"><h3>📞 Voice Call</h3><p>Talk with a professional</p></div>
      <div class="call-option" onclick="initiateChat()"><h3>💬 Text Chat</h3><p>Message with a professional</p></div>
    </div>
    <div id="callLoading" class="call-loading"><div class="loading-spinner"></div><p>Connecting…</p></div>
    <div id="activeCall" class="call-screen">
      <div class="caller-avatar" id="callAvatar">👩‍⚕️</div>
      <div>
        <h3 id="callDoctorName">Doctor</h3>
        <div class="call-duration" id="callTimer">00:00</div>
      </div>
      <button class="end-call-btn" onclick="endCall()">⛔</button>
    </div>
    <div id="activeChat" class="chat-screen">
      <div class="chat-messages" id="doctorChatMessages">
        <div class="imessage-bubble doctor">Hello! I'm <span id="chatDoctorName">your doctor</span>. What can I help you with?</div>
      </div>
      <div class="chat-input-container" style="bottom:0">
        <input id="doctorChatInput" class="chat-input" placeholder="Type your message…" />
        <button class="send-btn" onclick="sendDoctorMessage()">➤</button>
        <button class="send-btn" style="margin-left:8px" onclick="endChat()">✖</button>
      </div>
    </div>
  </div>
  `,
  bills: `
  <div class="page-header"><button class="back-btn" onclick="showPage('home')">← Back</button><img src="TruHealth_Logo.png" class="header-logo" alt="TruHealth"></div>
  <div class="page-content">
    <div id="uploadSection">
      <button class="view-history-btn" onclick="viewAllBills()">📎 View Bill History (<span id="billCount">0</span>)</button>
      <div class="upload-area" onclick="showBillSelection()">
        <div style="font-size:40px">📤</div>
        <h3>Upload Medical Bill</h3>
        <p>PDF, JPG, or PNG</p>
      </div>
      <div class="how-it-works">
        <h3>How it works</h3>
        <div class="step-item"><div class="step-number">1</div><div class="step-content"><h4>Upload your bill</h4><p>We scan for errors and overcharges</p></div></div>
        <div class="step-item"><div class="step-number">2</div><div class="step-content"><h4>We dispute on your behalf</h4><p>Our team contacts providers and insurance</p></div></div>
        <div class="step-item"><div class="step-number">3</div><div class="step-content"><h4>You save money</h4><p>Get updates and see your savings grow</p></div></div>
      </div>
    </div>
    <div id="scanningSection" class="scanning-animation" style="display:none">
      <div class="loading-spinner" style="margin-bottom:10px"></div>
      <div class="scanner-bar"></div>
      <p>Analyzing Bill…</p>
    </div>
    <div id="analysisSection" style="display:none"></div>
  </div>
  `,
  premium: `
  <div class="page-header"><button class="back-btn" onclick="showPage('home')">← Back</button><img src="TruHealth_Logo.png" class="header-logo" alt="TruHealth"></div>
  <div class="page-content">
    <div class="plan-card">
      <h3>Free Plan — $0/mo</h3>
      <ul style="margin-top:8px; padding-left:18px">
        <li>Basic provider search</li>
        <li>AI assistant (basic)</li>
        <li>Bill error detection (basic)</li>
      </ul>
      <div class="btn-primary" style="margin-top:14px">Current Plan</div>
    </div>
    <div class="plan-card popular">
      <div class="popular-badge">Most Popular</div>
      <h3>Premium — $4.99/mo</h3>
      <ul style="margin-top:8px; padding-left:18px">
        <li>In‑depth search filters</li>
        <li>Advanced AI support</li>
        <li>Detailed bill analyzing</li>
        <li>Priority booking & 24/7 live chat support</li>
        <li>Prescription discounts (up to 80%)</li>
      </ul>
      <div class="btn-primary" style="margin-top:14px">Subscribe — $4.99/month</div>
    </div>
    <div class="plan-card">
      <h3>Premium — $50/year</h3>
      <p>Save $10 compared to monthly!</p>
      <div class="btn-primary" style="margin-top:14px">Subscribe — $50/year</div>
    </div>
  </div>
  `
};

function showPage(p){
  const container = document.getElementById('appContainer');
  container.style.opacity = '0';
  container.style.transform = 'translateY(10px)';
  setTimeout(()=>{
    container.innerHTML = pages[p];
    // mark nav active
    document.querySelectorAll('.nav-item').forEach(x=>x.classList.remove('active'));
    const keys = ['home','search','chatbot','bills','premium'];
    const idx = keys.indexOf(p);
    if (idx>=0) document.querySelectorAll('.nav-item')[idx].classList.add('active');
    window.scrollTo(0,0);
    container.style.transition='all 0.3s ease';
    container.style.opacity='1';
    container.style.transform='translateY(0)';
    // update counters if on home or bills
    updateHomeCounts();
    updateBillCount();
  },150);
}

// Filters
const searchFilters = { experience: 'all', price: 'all', availability: 'any' };
function toggleFilter(el, cat, value){
  el.parentElement.querySelectorAll('.chip').forEach(c=>c.classList.remove('active'));
  el.classList.add('active');
  searchFilters[cat] = value;
}

function searchProviders(){
  const spec = document.getElementById('specialtySelect').value;
  if(!spec){ alert('Please select a specialty'); return; }
  let providers = [];
  if (spec==='chiropractic') providers = [...chiropractors];
  else if (spec==='therapy') providers = [...therapists];
  else if (spec==='family') providers = [...familyDoctors];
  else if (spec==='orthodontist') providers = [...orthodontists];
  else if (spec==='dentist') providers = [...dentists];
  else if (spec==='optometrist') providers = [...optometrists];

  // apply filters
  providers = providers.filter(p=>{
    // experience
    if (searchFilters.experience==='5' && p.experience < 5) return false;
    if (searchFilters.experience==='10' && p.experience < 10) return false;
    if (searchFilters.experience==='15' && p.experience < 15) return false;
    // price
    if (searchFilters.price==='under50' && !(p.price < 50)) return false;
    if (searchFilters.price==='50to100' && !(p.price>=50 && p.price<=100)) return false;
    if (searchFilters.price==='100plus' && !(p.price>100)) return false;
    // availability
    if (searchFilters.availability!=='any' && p.availability!==searchFilters.availability) return false;
    return true;
  });

  // sort insurance match first
  if (userProfile.insuranceProvider){
    providers.sort((a,b)=>{
      const aMatch = a.acceptedInsurance && a.acceptedInsurance.includes(userProfile.insuranceProvider);
      const bMatch = b.acceptedInsurance && b.acceptedInsurance.includes(userProfile.insuranceProvider);
      if (aMatch && !bMatch) return -1; if (!aMatch && bMatch) return 1; return 0;
    });
  }

  const userIns = userProfile.insuranceProvider ? getInsuranceInfo(userProfile.insuranceProvider) : null;
  const resultsHTML = providers.map(p=>{
    let badge = '';
    if (userIns){
      const ok = p.acceptedInsurance && p.acceptedInsurance.includes(userProfile.insuranceProvider);
      badge = ok ? `<span class="insurance-badge accepted">${userIns.icon} ${userIns.shortName} Accepted</span>`:
                   `<span class="insurance-badge not-accepted">❌ ${userIns.shortName} Not Accepted</span>`;
    }
    return `
      <div class="provider-card" onclick="viewProfile(${p.id}, '${p.specialty}')">
        <div class="provider-avatar" style="background:${p.gradient}">${p.avatar}</div>
        <div class="provider-details">
          <h4>${p.name}</h4>
          <div style="margin:4px 0 6px;color:#666">${p.specialtyName} • ${p.distance} mi</div>
          <div class="rating">${'★'.repeat(Math.floor(p.rating))} ${p.rating} (${p.reviews} reviews)</div>
          <div style="margin-top:6px">$${p.price} per visit • ${p.availability.replace('-', ' ')}</div>
          ${badge}
        </div>
      </div>`;
  }).join('');

  const res = document.getElementById('providerResults');
  const noRes = document.getElementById('noResults');
  if (providers.length){ res.style.display='block'; noRes.style.display='none'; res.innerHTML = resultsHTML; }
  else { res.style.display='none'; noRes.style.display='block'; }
  window.scrollTo(0, document.querySelector('.search-section').offsetTop - 10);
}

function viewProfile(providerId, specialty){
  let provider;
  if (specialty==='chiropractic') provider = chiropractors.find(p=>p.id===providerId);
  else if (specialty==='therapy') provider = therapists.find(p=>p.id===providerId);
  else if (specialty==='family') provider = familyDoctors.find(p=>p.id===providerId);
  else if (specialty==='orthodontist') provider = orthodontists.find(p=>p.id===providerId);
  else if (specialty==='dentist') provider = dentists.find(p=>p.id===providerId);
  else if (specialty==='optometrist') provider = optometrists.find(p=>p.id===providerId);
  if (!provider) return;
  currentProvider = provider;

  let insuranceBanner = '';
  if (userProfile.insuranceProvider){
    const userIns = getInsuranceInfo(userProfile.insuranceProvider);
    const accepted = provider.acceptedInsurance && provider.acceptedInsurance.includes(userProfile.insuranceProvider);
    insuranceBanner = accepted ? `
      <div class="profile-section" style="border-left:4px solid #2e7d32">
        <h3>✔ Insurance Accepted</h3>
        <p>${provider.name} accepts ${userIns.name}.</p>
      </div>`:
      `
      <div class="profile-section" style="border-left:4px solid #ff3b30">
        <h3>⚠ Insurance Not Accepted</h3>
        <p>${provider.name} does not accept ${userIns.name}. You may pay out of pocket.</p>
      </div>`;
  }

  const badges = (provider.acceptedInsurance||[]).map(id=>{
    const ins = getInsuranceInfo(id); if(!ins) return ''; return `<span class="insurance-badge accepted">${ins.icon} ${ins.name}</span>`;
  }).join('');

  document.getElementById('appContainer').innerHTML = `
    <div class="page-header"><button class="back-btn" onclick="showPage('search')">← Back</button><img src="TruHealth_Logo.png" class="header-logo"></div>
    <div class="page-content">
      ${insuranceBanner}
      <div class="provider-card" style="cursor:default">
        <div class="provider-avatar" style="background:${provider.gradient}">${provider.avatar}</div>
        <div class="provider-details">
          <h4>${provider.name}</h4>
          <div style="margin-top:4px;color:#666">${provider.specialtyName}</div>
          <div class="rating" style="margin-top:6px">${'★'.repeat(Math.floor(provider.rating))} ${provider.rating} (${provider.reviews} reviews)</div>
        </div>
      </div>
      <div class="profile-section"><h3>About</h3><p>${provider.about}</p></div>
      <div class="profile-section"><h3>Details</h3>
        <p><b>Address:</b> ${provider.address}</p>
        <p><b>Phone:</b> ${provider.phone}</p>
        <p><b>Price:</b> $${provider.price} per visit • <b>Distance:</b> ${provider.distance} miles</p>
        <p><b>Experience:</b> ${provider.experience} years</p>
      </div>
      <div class="profile-section"><h3>Credentials</h3>
        <p><b>Medical School:</b> ${provider.medicalSchool}</p>
        ${provider.residency ? `<p><b>Residency:</b> ${provider.residency}</p>` : ''}
        <p><b>Board Certification:</b> ${provider.boardCert}</p>
      </div>
      <div class="profile-section">
        <h3>Accepted Insurance</h3>
        ${badges || '<p>No insurance listed</p>'}
      </div>
      <div class="profile-section"><h3>Professional Reviews</h3>
        ${provider.professionalReviews.map(r=>`<div class="review-card"><div class="review-text"><b>${r.reviewer}</b> — ${r.date}<br/>${'★'.repeat(r.rating)}<br/>${r.text}</div></div>`).join('')}
      </div>
      <button class="book-button" onclick="showBooking()">Book Appointment</button>
      <button class="report-button" onclick="showReport()">Report Provider</button>
    </div>`;
}

// Booking
let bookedAppointments = [];
let currentMonth = new Date();
function showBooking(){
  currentMonth = new Date();
  document.getElementById('appContainer').innerHTML = `
    <div class="page-header"><button class="back-btn" onclick="viewProfile(${currentProvider.id}, '${currentProvider.specialty || currentProvider.specialty}');">← Back</button><img src="TruHealth_Logo.png" class="header-logo"></div>
    <div class="page-content">
      <div class="booking-section">
        <h3>${currentProvider.name}</h3>
        <div class="month-navigation">
          <button class="month-arrow" onclick="changeMonth(-1)">←</button>
          <div id="monthDisplay" class="month-display"></div>
          <button class="month-arrow" onclick="changeMonth(1)">→</button>
        </div>
        <div class="day-labels"><div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div></div>
        <div class="date-grid" id="dateGrid"></div>
      </div>
      <div class="booking-section">
        <h3>Select Time</h3>
        <div class="time-slot" onclick="selectTime(this)">9:00 AM</div>
        <div class="time-slot" onclick="selectTime(this)">10:30 AM</div>
        <div class="time-slot" onclick="selectTime(this)">1:00 PM</div>
        <div class="time-slot" onclick="selectTime(this)">2:30 PM</div>
        <div class="time-slot" onclick="selectTime(this)">4:00 PM</div>
      </div>
      <div class="booking-section">
        <h3>Reason for Visit</h3>
        <textarea id="reasonText" rows="3" placeholder="Describe your concern…"></textarea>
        <button class="btn-primary" onclick="confirmBooking()">Confirm Appointment</button>
      </div>
    </div>`;
  generateDates();
  window.scrollTo(0,0);
}
function changeMonth(direction){ currentMonth.setMonth(currentMonth.getMonth()+direction); generateDates(); }
function generateDates(){
  const grid = document.getElementById('dateGrid');
  const monthDisplay = document.getElementById('monthDisplay');
  const today = new Date();
  monthDisplay.textContent = currentMonth.toLocaleDateString('en-US', {month:'long', year:'numeric'});
  const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
  const lastDay  = new Date(currentMonth.getFullYear(), currentMonth.getMonth()+1, 0);
  const startDow = firstDay.getDay();
  const totalDays = lastDay.getDate();
  let html = '';
  for(let i=0;i<startDow;i++) html += '<div></div>';
  for(let day=1; day<=totalDays; day++){
    const cellDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const isPast = cellDate < new Date(new Date().toDateString());
    const disabled = isPast ? 'disabled' : '';
    const dateStr = cellDate.toISOString();
    html += `<div class="date-cell ${disabled}" onclick="${disabled? '' : `selectDate(this,'${dateStr}')`}"><div style="font-weight:700">${day}</div></div>`;
  }
  grid.innerHTML = html;
}
function selectDate(cell, dateStr){
  if (cell.classList.contains('disabled')) return;
  document.querySelectorAll('.date-cell').forEach(c=>c.classList.remove('selected'));
  cell.classList.add('selected');
  selectedDate = dateStr;
}
function selectTime(el){ document.querySelectorAll('.time-slot').forEach(s=>s.classList.remove('selected')); el.classList.add('selected'); selectedTime = el.textContent; }
function confirmBooking(){
  if(!selectedDate || !selectedTime){ alert('Please select date and time'); return; }
  const reason = document.getElementById('reasonText').value.trim();
  if(!reason){ alert('Please describe your reason'); return; }
  const apptDate = new Date(selectedDate);
  const appt = {
    id: Date.now(),
    provider: currentProvider.name,
    providerAvatar: currentProvider.avatar,
    specialty: currentProvider.specialtyName,
    date: apptDate.toLocaleDateString('en-US',{weekday:'long', year:'numeric', month:'long', day:'numeric'}),
    time: selectedTime,
    reason,
    address: currentProvider.address
  };
  bookedAppointments.push(appt);
  updateHomeCounts();
  document.getElementById('appContainer').innerHTML = `
    <div class="page-header"><button class="back-btn" onclick="showPage('search')">← Back</button><img src="TruHealth_Logo.png" class="header-logo"></div>
    <div class="page-content">
      <div class="profile-section" style="text-align:center">
        <div style="font-size:56px">✅</div>
        <h3>Appointment Confirmed!</h3>
        <div class="analysis-result" style="margin-top:12px">
          <p><b>Provider:</b> ${appt.provider}</p>
          <p><b>Date:</b> ${appt.date}</p>
          <p><b>Time:</b> ${appt.time}</p>
          <p><b>Location:</b> ${appt.address}</p>
          <p><b>Reason:</b> ${appt.reason}</p>
        </div>
        <button class="btn-primary" onclick="viewAllAppointments()">📅 View All Appointments (${bookedAppointments.length})</button>
        <button class="btn-primary" style="margin-top:10px" onclick="showPage('search')">Back to Search</button>
      </div>
    </div>`;
}
function viewAllAppointments(){
  if(bookedAppointments.length===0){ alert('No appointments booked yet.'); return; }
  document.getElementById('appContainer').innerHTML = `
    <div class="page-header"><button class="back-btn" onclick="showPage('home')">← Back</button><img src="TruHealth_Logo.png" class="header-logo"></div>
    <div class="page-content">
      <h3 style="margin-bottom:10px">Your Appointments (${bookedAppointments.length})</h3>
      ${bookedAppointments.map(a=>`
        <div class="provider-card" style="cursor:default">
          <div class="provider-avatar">${a.providerAvatar}</div>
          <div class="provider-details">
            <h4>${a.provider}</h4>
            <div style="color:#666">${a.specialty}</div>
            <div style="margin-top:6px">${a.date} • ${a.time}</div>
          </div>
        </div>`).join('')}
      <button class="btn-primary" onclick="showPage('search')">Book Another Appointment</button>
    </div>`;
}

// Report
function showReport(){
  document.getElementById('appContainer').innerHTML = `
    <div class="page-header"><button class="back-btn" onclick="viewProfile(${currentProvider.id}, '${currentProvider.specialty || currentProvider.specialty}')">← Back</button><img src="TruHealth_Logo.png" class="header-logo"></div>
    <div class="page-content">
      <h3>Report ${currentProvider.name}</h3>
      <div class="profile-section"><label for="reportText">Describe the issue</label>
      <textarea id="reportText" rows="4" placeholder="Please provide details… (min 20 characters)"></textarea>
      <button class="btn-primary" onclick="submitReport()">Submit Report</button></div>
    </div>`;
}
function submitReport(){
  const txt = (document.getElementById('reportText').value||'').trim();
  if (!txt || txt.length < 20) { alert('Please provide more details (min 20 characters).'); return; }
  const id = Math.random().toString(36).substr(2,9).toUpperCase();
  document.getElementById('appContainer').innerHTML = `
    <div class="page-header"><button class="back-btn" onclick="showPage('search')">← Back</button><img src="TruHealth_Logo.png" class="header-logo"></div>
    <div class="page-content">
      <div class="profile-section" style="text-align:center">
        <div style="font-size:56px">✅</div>
        <h3>Thank You</h3>
        <p>Your report has been received. We will review and take necessary action.</p>
        <p><b>Report ID:</b> ${id}</p>
        <button class="btn-primary" onclick="showPage('search')">Back to Search</button>
      </div>
    </div>`;
}

// AI Assistant (very simple state machine)
let aiContext = { state: 0, data: {} };
function addMsg(html, who){
  const c = document.getElementById('chatContainer');
  const wrap = document.createElement('div');
  wrap.className = `message ${who}`;
  wrap.innerHTML = `<div class="message-bubble">${html.replace(/\n/g,'<br/>')}</div>`;
  c.appendChild(wrap); c.scrollTop = c.scrollHeight;
}
function selectSymptom(symptom){
  aiContext = { state: 1, data: { symptom } };
  addMsg(`I have ${symptom}.`, 'user');
  setTimeout(()=>{
    const prompts = {
      'fever': 'When did your fever start? Do you know your temperature (°F)?',
      'headache': 'When did your headache start? Any sensitivity to light or nausea?',
      'nausea': 'When did the nausea start? Have you been able to keep fluids down?',
      'cough': 'How long have you had the cough? Dry or wet? Any fever or chest pain?',
      'sore throat': 'When did the sore throat start? Any fever or white patches?'
    };
    addMsg(prompts[symptom] || 'When did this start?', 'ai');
  }, 400);
}
function sendMessage(){
  const inp = document.getElementById('chatInput');
  const msg = (inp.value||'').trim();
  if(!msg) return; addMsg(msg,'user'); inp.value='';
  setTimeout(()=>{ processAIResponse(msg.toLowerCase()); }, 500);
}
function processAIResponse(msg){
  if (aiContext.state===0){ addMsg('I can help with fever, headache, nausea, cough, or sore throat. Pick a chip or type a symptom.', 'ai'); return; }
  if (aiContext.state===1){ aiContext.data.duration = msg; aiContext.state = 2; if(aiContext.data.symptom==='fever'){ addMsg('What is your current temperature in °F (or type "no")?', 'ai'); } else { generatePlan(); } return; }
  if (aiContext.state===2 && aiContext.data.symptom==='fever'){
    const m = msg.match(/\d{2,3}/); aiContext.data.temp = m ? parseInt(m[0]) : null; generatePlan(); return;
  }
}
function generatePlan(){
  const { symptom, temp } = aiContext.data;
  let plan = '';
  if (symptom==='fever'){
    plan += temp && temp>=103 ? `<div class="treatment-step urgent"><div class="treatment-step-title">⚠️ High Fever Alert</div><div class="treatment-step-content">A temperature of ${temp}°F is very high. Seek medical attention for trouble breathing, chest pain, or severe headache.</div></div>` : '';
    plan += `
      <div class="treatment-step"><div class="treatment-step-title">Step 1: Check Temperature</div><div class="treatment-step-content">${temp?`Your temperature is ${temp}°F.`:'Use a thermometer (100.4°F+ is fever).'}</div></div>
      <div class="treatment-step"><div class="treatment-step-title">Step 2: Medication</div><div class="treatment-step-content">Over‑the‑counter options like acetaminophen or ibuprofen (follow label instructions).</div></div>
      <div class="treatment-step"><div class="treatment-step-title">Step 3: Hydrate & Rest</div><div class="treatment-step-content">Water, broth, and sleep. Keep the room cool and use a light blanket.</div></div>
      <div class="treatment-step warning"><div class="treatment-step-title">See a clinician if…</div><div class="treatment-step-content">Fever >103°F, lasts >3 days, severe headache/stiff neck, breathing trouble, chest pain, or dehydration.</div></div>`;
  } else if (symptom==='headache'){
    plan = `
      <div class="treatment-step"><div class="treatment-step-title">Step 1: Pain Relief</div><div class="treatment-step-content">Consider acetaminophen or ibuprofen with food (per label).</div></div>
      <div class="treatment-step"><div class="treatment-step-title">Step 2: Hydration & Rest</div><div class="treatment-step-content">Drink water, rest in a dark quiet room, and use a cold compress.</div></div>
      <div class="treatment-step warning"><div class="treatment-step-title">Emergency signs</div><div class="treatment-step-content">“Worst ever” headache, new neuro symptoms, head injury, fever with stiff neck.</div></div>`;
  } else if (symptom==='nausea'){
    plan = `
      <div class="treatment-step"><div class="treatment-step-title">Step 1: Rest Stomach</div><div class="treatment-step-content">Pause solid foods 30–60 minutes. Sit upright.</div></div>
      <div class="treatment-step"><div class="treatment-step-title">Step 2: Clear Fluids</div><div class="treatment-step-content">Small sips of water/clear broth every 5–10 minutes.</div></div>
      <div class="treatment-step"><div class="treatment-step-title">Step 3: Bland Foods</div><div class="treatment-step-content">BRAT diet (bananas, rice, applesauce, toast) once improved.</div></div>`;
  } else if (symptom==='cough'){
    plan = `
      <div class="treatment-step"><div class="treatment-step-title">Step 1: Soothe</div><div class="treatment-step-content">Honey in warm tea, lozenges, and humidifier/steam.</div></div>
      <div class="treatment-step"><div class="treatment-step-title">Step 2: Air Quality</div><div class="treatment-step-content">Avoid smoke/perfumes; use a humidifier.</div></div>`;
  } else {
    plan = `
      <div class="treatment-step"><div class="treatment-step-title">Step 1: Gargle</div><div class="treatment-step-content">Warm salt-water gargles every 2–3 hours.</div></div>
      <div class="treatment-step"><div class="treatment-step-title">Step 2: Hydrate</div><div class="treatment-step-content">Warm liquids (tea, broth) and rest voice.</div></div>`;
  }
  addMsg(plan, 'ai');
  addMsg('Would you like me to help you find a doctor nearby or start a live chat?', 'ai');
  aiContext = { state: 0, data: {} };
}

// Call/Chat doctor flow
let selectedDoctor = null;
function showCallScreen(){ document.getElementById('callScreen').classList.add('active'); }
function hideCallScreen(){
  document.getElementById('callScreen').classList.remove('active');
  document.getElementById('careTypeContent').style.display='block';
  document.getElementById('providerSelectContent').style.display='none';
  document.getElementById('connectionTypeContent').style.display='none';
  document.getElementById('callLoading').style.display='none';
  document.getElementById('activeCall').classList.remove('active');
  document.getElementById('activeChat').classList.remove('active');
}
function selectCareType(type){
  document.getElementById('careTypeContent').style.display='none';
  const list = allProviders.map(p=>`
    <div class="provider-card" onclick="selectDoctorForCall(${p.id}, '${p.name.replace(/'/g,"\'")}', '${p.avatar}', '${p.gradient.replace(/'/g,"\'")}')">
      <div class="provider-avatar" style="background:${p.gradient}">${p.avatar}</div>
      <div class="provider-details">
        <h4>${p.name}</h4>
        <div style="color:#666">${p.specialtyName} • ${p.rating}★</div>
        <div style="margin-top:6px;color:#2e7d32">Available now</div>
      </div>
    </div>`).join('');
  document.getElementById('doctorList').innerHTML = list;
  document.getElementById('providerSelectContent').style.display='block';
}
function selectDoctorForCall(id, name, avatar, gradient){ selectedDoctor = {id,name,avatar,gradient}; document.getElementById('providerSelectContent').style.display='none'; document.getElementById('connectionTypeContent').style.display='block'; }
function initiateCall(){ if(!selectedDoctor) return; document.getElementById('connectionTypeContent').style.display='none'; document.getElementById('callLoading').style.display='block'; setTimeout(()=>{ document.getElementById('callLoading').style.display='none'; document.getElementById('activeCall').classList.add('active'); document.getElementById('callAvatar').textContent = selectedDoctor.avatar; document.getElementById('callDoctorName').textContent = selectedDoctor.name; callTimer=0; callInterval=setInterval(()=>{ callTimer++; const m=Math.floor(callTimer/60), s=callTimer%60; document.getElementById('callTimer').textContent = `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`; },1000); },1500); }
function endCall(){ clearInterval(callInterval); hideCallScreen(); }
function initiateChat(){ if(!selectedDoctor) return; document.getElementById('connectionTypeContent').style.display='none'; document.getElementById('callLoading').style.display='block'; setTimeout(()=>{ document.getElementById('callLoading').style.display='none'; document.getElementById('activeChat').classList.add('active'); document.getElementById('chatDoctorName').textContent = selectedDoctor.name; const msgs = document.getElementById('doctorChatMessages'); msgs.innerHTML = `<div class=\"imessage-bubble doctor\">Hello! I'm ${selectedDoctor.name}. What can I help you with?</div>`; },1500); }
function sendDoctorMessage(){ const inp = document.getElementById('doctorChatInput'); const msg=(inp.value||'').trim(); if(!msg) return; const cont=document.getElementById('doctorChatMessages'); cont.innerHTML += `<div class=\"imessage-bubble user\">${msg}</div>`; inp.value=''; cont.scrollTop=cont.scrollHeight; setTimeout(()=>{ const responses=[ 'I understand. When did this start?', 'Have you experienced this before?', 'Thanks for that info. Any other symptoms?', 'Let me ask a few more questions to help.' ]; const r = responses[Math.floor(Math.random()*responses.length)]; cont.innerHTML += `<div class=\"imessage-bubble doctor\">${r}</div>`; cont.scrollTop=cont.scrollHeight; }, 900); }
function endChat(){ hideCallScreen(); }

// Bills (sample list for quick selection)
const availableBills = [
  {id:'bill001', provider:'St. Mary\'s Hospital', procedure:'Emergency Room Visit', date:'January 15, 2026', originalAmount:4850, errors:[
    {type:'critical', title:'Wrong Diagnosis Code', description:'Billed as complex ER visit (99285) instead of moderate (99284)', savings:1200},
    {type:'warning', title:'Duplicate Lab Test', description:'CBC test charged twice - only performed once', savings:180},
    {type:'warning', title:'Excessive Supply Charges', description:'Basic supplies marked up 400% over standard rates', savings:95},
    {type:'warning', title:'Upcoded Imaging', description:'X-ray billed at level 3, should be level 2', savings:225},
    {type:'info', title:'Missing Insurance Discount', description:'In-network discount not applied to total', savings:340}
  ]},
  {id:'bill002', provider:'City Medical Center', procedure:'Outpatient Surgery', date:'February 3, 2026', originalAmount:12750, errors:[
    {type:'critical', title:'Wrong Procedure Billed', description:'Charged for higher-cost procedure than performed', savings:4500},
    {type:'critical', title:'Duplicate Anesthesia Charge', description:'Anesthesia time billed twice for same period', savings:890},
    {type:'warning', title:'Inflated Facility Fee', description:'OR time charged at premium rate instead of standard', savings:1200},
    {type:'warning', title:'Unnecessary Medication', description:'Medication not administered still billed', savings:340},
    {type:'info', title:'Incorrect Room Classification', description:'Recovery room billed as ICU rate', savings:580}
  ]},
];

function showBillSelection(){
  document.getElementById('uploadSection').style.display='none';
  document.getElementById('scanningSection').style.display='none';
  const html = `
    <h3 style=\"margin-bottom:10px\">Select a Bill to Analyze</h3>
    <div class=\"bill-list\">
      ${availableBills.map(b=>{ const total=b.errors.reduce((s,e)=>s+e.savings,0); const analyzed = analyzedBills.some(x=>x.billId===b.id); const disputed = disputedBillIds.includes(b.id); return `
        <div class=\"bill-item\" onclick=\"selectBillToAnalyze('${b.id}')\">
          <div class=\"bill-icon\">📄</div>
          <div class=\"bill-details\"><h4>${b.provider}</h4><p>${b.procedure} • ${b.date} ${analyzed ? ' • ✓ Previously analyzed' : ''} ${disputed ? ' • ✓ Disputed' : ''}</p></div>
          <div style=\"text-align:right\"><div class=\"bill-amount\">$${b.originalAmount.toLocaleString()}</div><div class=\"bill-savings\">Potential savings $${total.toLocaleString()}</div></div>
        </div>`; }).join('')}
    </div>
    <button class=\"back-btn\" style=\"margin-top:10px\" onclick=\"showPage('bills')\">← Back to Upload</button>
  `;
  const an = document.getElementById('analysisSection');
  an.style.display='block'; an.innerHTML = html; window.scrollTo(0,0);
}
function selectBillToAnalyze(billId){
  const bill = availableBills.find(b=>b.id===billId); if(!bill) return;
  document.getElementById('analysisSection').style.display='none';
  document.getElementById('scanningSection').style.display='block';
  setTimeout(()=>{
    document.getElementById('scanningSection').style.display='none';
    const total = bill.errors.reduce((s,e)=>s+e.savings,0);
    const analyzed = { id: Date.now(), billId: bill.id, provider: bill.provider, procedure: bill.procedure, date: bill.date, originalAmount: bill.originalAmount, savings: total, newAmount: bill.originalAmount-total, errors: bill.errors, disputed: false };
    const idx = analyzedBills.findIndex(x=>x.billId===bill.id);
    if (idx>=0) analyzedBills[idx]=analyzed; else analyzedBills.push(analyzed);
    updateBillCount(); updateHomeCounts();
    showDetailedBillAnalysis(analyzed);
  }, 1500);
}
function showDetailedBillAnalysis(bill){
  const errorHTML = bill.errors.map(err=>{
    const cls = err.type==='critical' ? 'urgent' : err.type==='warning' ? 'warning' : '';
    return `<div class="treatment-step ${cls}"><div class="treatment-step-title">${err.title}</div><div class="treatment-step-content">${err.description}<br/><b>Savings:</b> $${err.savings.toLocaleString()}</div></div>`;
  }).join('');
  const disputed = disputedBillIds.includes(bill.billId);
  const html = `
    <div class=\"savings-badge\"><div style=\"font-size:16px;opacity:0.9\">Estimated Savings</div><h3>$${bill.savings.toLocaleString()}</h3></div>
    <div class=\"profile-section\"><h3>Bill Details</h3><p><b>${bill.provider}</b><br/>Procedure: ${bill.procedure}<br/>Date: ${bill.date}</p></div>
    <div class=\"profile-section\"><h3>Errors Identified</h3>${errorHTML}</div>
    <div class=\"analysis-result\">
      <p><b>Original Total:</b> $${bill.originalAmount.toLocaleString()}</p>
      ${bill.errors.map(e=>`<p>${e.title}: -$${e.savings.toLocaleString()}</p>`).join('')}
      <p><b>Total Savings:</b> -$${bill.savings.toLocaleString()}</p>
      <p><b>New Total:</b> $${bill.newAmount.toLocaleString()}</p>
    </div>
    ${disputed ? '<div class=\"profile-section\"><b>✓ Already Disputed</b></div>' : `<button class=\"btn-primary\" onclick=\"disputeDetailedBill('${bill.billId}')\">Dispute Charges</button>`}
    <button class=\"upload-another-btn\" onclick=\"viewAllBills()\">View All Bills (${analyzedBills.length})</button>
  `;
  const an = document.getElementById('analysisSection'); an.style.display='block'; an.innerHTML = html; window.scrollTo(0,0);
}
function disputeDetailedBill(billId){
  const bill = analyzedBills.find(b=>b.billId===billId); if(!bill) return;
  const html = `
    <div class=\"profile-section\"><h3>Sending to Representative</h3><p>Your bill from ${bill.provider} is being transmitted…</p></div>
    <div class=\"profile-section\"><h3>Negotiating</h3><p>Our rep is contacting ${bill.provider}…</p></div>
    <div class=\"profile-section\"><h3>Sending Dispute Letter</h3><p>Official documentation is being submitted…</p></div>
    <div class=\"analysis-result\"><h3>✅ Dispute Submitted</h3><p><b>Amount:</b> $${bill.originalAmount.toLocaleString()} → $${bill.newAmount.toLocaleString()}<br/><b>Timeframe:</b> 14–21 business days<br/><b>Case ID:</b> ${Math.random().toString(36).substr(2,9).toUpperCase()}-2026</p></div>
    <button class=\"upload-another-btn\" onclick=\"viewAllBills()\">View All Bills</button>`;
  const an = document.getElementById('analysisSection'); an.style.display='block'; an.innerHTML = html; window.scrollTo(0,0);
  if (!disputedBillIds.includes(billId)) disputedBillIds.push(billId);
  const idx = analyzedBills.findIndex(b=>b.billId===billId); if (idx>=0) analyzedBills[idx].disputed = true;
}
function viewAllBills(){
  if (analyzedBills.length===0){ alert('No bills analyzed yet. Upload a bill to get started!'); return; }
  const html = analyzedBills.map(b=>{
    const icon = b.disputed || disputedBillIds.includes(b.billId) ? '✅' : '📄';
    return `<div class=\"bill-item\" onclick=\"showDetailedBillAnalysis(analyzedBills.find(x=>x.billId==='${b.billId}'))\"><div class=\"bill-icon\">${icon}</div><div class=\"bill-details\"><h4>${b.provider}</h4><p>${b.procedure} • ${b.date} ${b.disputed?'• ✓ Disputed':''}</p></div><div style=\"text-align:right\"><div class=\"bill-amount\">$${b.newAmount.toLocaleString()}</div><div class=\"bill-savings\">Saved $${b.savings.toLocaleString()}</div></div></div>`;
  }).join('');
  const an = document.getElementById('analysisSection'); an.style.display='block'; an.innerHTML = `<h3>Your Bills (${analyzedBills.length})</h3>${html}<button class=\"upload-another-btn\" onclick=\"showPage('bills')\">📤 Upload Another Bill</button>`; window.scrollTo(0,0);
}
function updateBillCount(){ const el = document.getElementById('billCount'); if (el) el.textContent = analyzedBills.length; }
function updateHomeCounts(){ const a = document.getElementById('homeApptCount'); const b = document.getElementById('homeBillCount'); if (a) a.textContent = bookedAppointments.length; if (b) b.textContent = analyzedBills.length; }

// Profile
function showProfile(){
  const insurance = userProfile.insuranceProvider ? getInsuranceInfo(userProfile.insuranceProvider) : null;
  document.getElementById('appContainer').innerHTML = `
    <div class="page-header"><button class="back-btn" onclick="showPage('home')">← Back</button><img src="TruHealth_Logo.png" class="header-logo"></div>
    <div class="page-content">
      <div class="profile-section">
        <h3>Your Information ${userProfile.profileComplete? '✓' : ''}</h3>
        <div class="input-group"><label>Full Name</label><input id="profileName" class="search-input" value="${userProfile.fullName||''}" /></div>
        <div class="input-group"><label>Date of Birth</label><input id="profileDOB" type="date" class="search-input" value="${userProfile.dateOfBirth||''}" /></div>
        <div class="input-group"><label>Address</label><input id="profileAddress" class="search-input" value="${userProfile.address||''}" /></div>
        <div class="input-group"><label>Insurance Provider</label>
          <div>
            ${insuranceProviders.map(ins=>`<div class=\"chip ${userProfile.insuranceProvider===ins.id?'active':''}\" onclick=\"selectInsurance('${ins.id}')\">${ins.icon} ${ins.name}</div>`).join('')}
          </div>
        </div>
        <button class="btn-primary" onclick="saveProfileUI()">Save Profile</button>
        ${userProfile.profileComplete? '<button class="upload-another-btn" onclick="clearProfile()">Clear Profile</button>':''}
      </div>
    </div>`;
}
function selectInsurance(id){ userProfile.insuranceProvider = id; showProfile(); }
function saveProfileUI(){
  const name = document.getElementById('profileName').value.trim();
  const dob = document.getElementById('profileDOB').value;
  const address = document.getElementById('profileAddress').value.trim();
  if (!name || !dob || !address || !userProfile.insuranceProvider){ alert('Please fill in all fields'); return; }
  userProfile.fullName = name; userProfile.dateOfBirth = dob; userProfile.address = address; userProfile.profileComplete = true; saveUserProfile(); alert('✅ Profile Saved!'); showPage('home');
}
function clearProfile(){ if(confirm('Clear your saved profile?')){ userProfile = { fullName:'', dateOfBirth:'', address:'', insuranceProvider:null, profileComplete:false }; saveUserProfile(); showProfile(); } }

// Initialize
window.addEventListener('DOMContentLoaded', ()=>{ showPage('home'); updateHomeCounts(); updateBillCount(); console.log('✅ App initialized'); });
