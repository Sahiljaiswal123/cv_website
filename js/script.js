// ============================================================
// Theme handling
// ============================================================
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const iconSun = document.getElementById('iconSun');
const iconMoon = document.getElementById('iconMoon');

function applyTheme(theme){
  root.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  const isDark = theme === 'dark';
  iconSun.style.display = isDark ? 'none' : 'block';
  iconMoon.style.display = isDark ? 'block' : 'none';
}

(function initTheme(){
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(saved || (prefersDark ? 'dark' : 'light'));
})();

themeToggle.addEventListener('click', () => {
  const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  applyTheme(current === 'dark' ? 'light' : 'dark');
});

// ============================================================
// Mobile nav
// ============================================================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ============================================================
// Nav scroll state + active link + progress bar
// ============================================================
const nav = document.getElementById('nav');
const progressBar = document.getElementById('progressBar');
const sections = document.querySelectorAll('main section[id]');
const navLinkEls = document.querySelectorAll('.nav-link');

function onScroll(){
  nav.classList.toggle('scrolled', window.scrollY > 8);

  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = (docHeight > 0 ? (scrollTop / docHeight) * 100 : 0) + '%';

  let currentId = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 120;
    if (scrollTop >= top) currentId = sec.id;
  });
  navLinkEls.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + currentId);
  });
}
document.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ============================================================
// Back to top
// ============================================================
document.getElementById('backToTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ============================================================
// Footer year
// ============================================================
document.getElementById('year').textContent = new Date().getFullYear();

// ============================================================
// Typed hero subtitle
// ============================================================
const roles = [
  'DevOps Engineer', 'Cloud Engineer', 'Linux Administrator',
  'Platform Engineer', 'SRE Enthusiast', 'Infrastructure Automation'
];
const typedEl = document.getElementById('typed');
let roleIndex = 0, charIndex = 0, deleting = false;

function typeLoop(){
  const current = roles[roleIndex];
  if (!deleting){
    charIndex++;
    typedEl.textContent = current.slice(0, charIndex);
    if (charIndex === current.length){
      deleting = true;
      setTimeout(typeLoop, 1400);
      return;
    }
  } else {
    charIndex--;
    typedEl.textContent = current.slice(0, charIndex);
    if (charIndex === 0){
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(typeLoop, deleting ? 45 : 85);
}
typeLoop();

// ============================================================
// Scroll reveal
// ============================================================
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

function observeReveals(){
  document.querySelectorAll('.reveal:not(.in), .project-card:not(.in), .cert-card:not(.in)')
    .forEach(el => {
      el.classList.add('pre-reveal');
      revealObserver.observe(el);
    });
}

// ============================================================
// Stat counters
// ============================================================
const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseInt(el.dataset.count, 10);
    let cur = 0;
    const step = Math.max(1, Math.round(target / 30));
    const tick = () => {
      cur += step;
      if (cur >= target){ el.textContent = target; return; }
      el.textContent = cur;
      requestAnimationFrame(tick);
    };
    tick();
    countObserver.unobserve(el);
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-num').forEach(el => countObserver.observe(el));

// ============================================================
// Skills data
// ============================================================
const skills = [
  {
    icon: '🐧', title: 'Linux Administration',
    tags: ['User & Group Mgmt', 'File Permissions / ACL', 'Cron Jobs', 'Systemd', 'SSH / SCP / Rsync',
      'LVM & Disk Partitioning', 'Package Management', 'SELinux', 'Shell Scripting', 'NFS / Samba / FTP',
      'DNS / DHCP', 'Apache / Nginx', 'Postfix / Dovecot', 'SSL Certificates']
  },
  {
    icon: '🐳', title: 'DevOps & Containers',
    tags: ['Docker', 'Docker Compose', 'Docker Networking', 'Docker Volumes', 'Image Optimization',
      'Kubernetes', 'Pods / Deployments', 'StatefulSets / DaemonSets', 'ConfigMaps / Secrets',
      'Ingress & Services', 'Helm', 'Autoscaling']
  },
  {
    icon: '☁️', title: 'Cloud (AWS)',
    tags: ['EC2', 'VPC', 'IAM', 'S3', 'CloudWatch', 'Lambda', 'Route53', 'Security Groups',
      'Load Balancer', 'Auto Scaling', 'CloudFormation Basics']
  },
  {
    icon: '🏗️', title: 'Infrastructure as Code',
    tags: ['Terraform', 'Providers & Modules', 'Variables & Outputs', 'State Management',
      'Remote Backend', 'Workspaces', 'Ansible', 'Playbooks & Roles', 'Handlers & Templates']
  },
  {
    icon: '🔁', title: 'CI/CD & Version Control',
    tags: ['Jenkins', 'Declarative Pipelines', 'Webhooks', 'Docker Integration', 'Git', 'GitHub',
      'Branching / Rebase', 'Pull Requests', 'GitHub Actions (Basic)']
  },
  {
    icon: '📊', title: 'Monitoring & Observability',
    tags: ['Grafana', 'Prometheus', 'Node Exporter', 'Alerting', 'Dashboards', 'Container Monitoring']
  },
  {
    icon: '🌐', title: 'Networking (CCNA)',
    tags: ['TCP/IP & OSI Model', 'Subnetting', 'Routing & Switching', 'NAT / ACL / VLAN', 'VPN',
      'DNS / DHCP', 'HTTP(S) / SSH / FTP', 'Cisco Routers & Switches']
  },
  {
    icon: '🔒', title: 'Security',
    tags: ['Linux Security', 'Firewall Configuration', 'VPN', 'SSH Hardening', 'SSL/TLS',
      'IAM & Least Privilege', 'Access Control']
  },
  {
    icon: '💻', title: 'Programming & Web',
    tags: ['Python', 'JavaScript', 'SQL', 'Bash', 'Flask', 'REST APIs', 'JWT Auth',
      'HTML5 / CSS3', 'Bootstrap', 'Firebase']
  },
  {
    icon: '🗄️', title: 'Databases',
    tags: ['MySQL', 'SQLAlchemy', 'SQLite', 'Firebase Firestore', 'Firebase Realtime DB',
      'Database Design', 'CRUD Operations']
  }
];

const skillsGrid = document.getElementById('skillsGrid');
skillsGrid.innerHTML = skills.map(s => `
  <div class="skill-card reveal">
    <div class="skill-card-head">
      <span class="skill-icon">${s.icon}</span>
      <h3>${s.title}</h3>
    </div>
    <div class="skill-tags">
      ${s.tags.map(t => `<span>${t}</span>`).join('')}
    </div>
  </div>
`).join('');

// ============================================================
// Projects data
// ============================================================
const projects = [
  {
    icon: '🩺',
    title: 'Companion WebApp',
    subtitle: 'Healthcare AI · IoT · Remote Motor Symptom Assessment Platform',
    desc: 'A full-stack clinical companion platform for remote assessment of Parkinsonian motor symptoms — combining a smartphone camera, an ESP32 microcontroller and a Raspberry Pi into a home-based kit that captures and scores tremor, bradykinesia and handwriting performance using custom DSP pipelines aligned with MDS-UPDRS-style motor assessments.',
    tech: ['Python', 'Flask', 'Flask-SocketIO', 'NumPy', 'SciPy', 'MediaPipe', 'ESP32', 'Raspberry Pi', 'WebSocket', 'BLE (Bleak)', 'Cryptography'],
    features: [
      'Real-time multi-device sensor fusion (ESP32 IMU, Raspberry Pi force sensors, browser camera)',
      'MediaPipe-based finger-tapping analysis for bradykinesia assessment',
      'IMU-based tremor detection with spectral analysis, entropy & Q-factor estimation',
      'BLE device provisioning with automatic discovery & fallback (Network Scan → BLE → Manual IP)',
      'Encrypted session storage with locally generated TLS certificates',
      'Session history with CSV/JSON export and clinical assessment reports'
    ],
    architecture: 'Smartphone Camera + ESP32 IMU + Raspberry Pi Sensors → WebSocket/BLE → Flask-SocketIO Backend → DSP Pipeline (NumPy/SciPy) → Clinical Motor Scores',
    responsibilities: [
      'Designed the complete Flask backend architecture', 'Built real-time communication via Flask-SocketIO & WebSockets',
      'Implemented the DSP pipeline for tremor & bradykinesia scoring', 'Built BLE device provisioning & pairing workflows',
      'Designed the device discovery & fallback mechanism', 'Integrated MediaPipe for computer-vision movement tracking',
      'Integrated ESP32 & Raspberry Pi firmware', 'Implemented encrypted storage & secure communication'
    ]
  },
  {
    icon: '🅿️',
    title: 'Spot Sense AI',
    subtitle: 'ML + Computer Vision · Smart Parking Management System',
    desc: 'AI-powered smart parking management system that automates vehicle entry, automatic number plate recognition, parking allocation, billing and exit management using computer vision.',
    tech: ['Python', 'Flask', 'OpenCV', 'YOLO', 'MySQL', 'HTML', 'CSS', 'JavaScript', 'Tkinter'],
    features: [
      'Automatic Number Plate Recognition (ANPR)', 'Parking slot allocation & tracking',
      'Real-time parking availability', 'Vehicle entry & exit management',
      'Parking fee calculation & email receipt generation', 'Admin dashboard with parking history & reports'
    ],
    architecture: 'Camera → OpenCV/YOLO → ANPR → MySQL Database → Slot Allocation → Billing → Email Receipt',
    responsibilities: [
      'Developed the Flask backend & APIs', 'Integrated OpenCV-based ANPR',
      'Designed the MySQL database', 'Built authentication & billing modules',
      'Developed the Tkinter interface'
    ]
  },
  {
    icon: '🏥',
    title: 'SCAN Forms Management System',
    subtitle: 'SCAN, IIT Bombay · Patient & Request Management Platform',
    desc: 'A secure request and patient management platform developed for SCAN at IIT Bombay to manage clinical requests, approvals and patient information through real-time workflows, including dynamic disease-specific intake forms.',
    tech: ['Flask', 'Firebase Authentication', 'Firestore', 'Firebase Realtime Database', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
    features: [
      'Firebase Authentication with role-based access control', 'Dynamic, multi-step patient registration & intake workflow',
      'Request submission & tracking with admin approval dashboard', 'Real-time Firestore & Realtime Database synchronization',
      'Search & filtering across patients and requests', 'JWT-secured REST APIs'
    ],
    architecture: 'Browser → HTML/CSS/JS → Flask REST API → Firebase (Auth, Firestore, Realtime DB) + MySQL → Admin Dashboard',
    responsibilities: [
      'Developed the Flask backend & REST APIs', 'Integrated Firebase services (Auth, Firestore, Realtime DB)',
      'Implemented JWT authentication', 'Built the admin approval dashboard',
      'Connected MySQL and Firebase databases', 'Implemented secure role-based authorization'
    ]
  },
  {
    icon: '📋',
    title: 'Request Management System',
    subtitle: 'Order Approval System · Full-Stack Web Application',
    desc: 'A secure web-based Request Management System to streamline the submission, tracking, approval and management of service and purchase requests within an organization, with separate user and administrator portals for real-time request processing and role-based access control.',
    tech: ['Python', 'Flask', 'MySQL', 'SQLAlchemy', 'Firebase Authentication', 'Firebase Firestore', 'Firebase Realtime Database', 'HTML5', 'CSS3', 'JavaScript', 'Docker'],
    features: [
      'Secure registration & login via Firebase Authentication', 'Submit, edit, cancel & track service/purchase requests in real time',
      'Admin approval/rejection workflow with remarks', 'Search, filter & sort requests with dashboard statistics',
      'MySQL + SQLAlchemy backend synced with Firebase Firestore/Realtime Database', 'Dockerized deployment for consistent dev/production environments'
    ],
    architecture: 'Browser (User/Admin) → Flask REST API → SQLAlchemy → MySQL + Firebase (Auth, Firestore, Realtime DB) → Dockerized Deployment',
    responsibilities: [
      'Designed the complete database schema & application architecture', 'Developed the Flask backend & REST APIs',
      'Integrated Firebase Authentication for secure login', 'Connected MySQL using SQLAlchemy ORM',
      'Developed the user & admin dashboards', 'Built request approval & rejection workflows',
      'Implemented real-time updates using Firebase Realtime Database', 'Added search, filtering & request history functionality',
      'Containerized the application using Docker for deployment'
    ]
  },
];

const projectsGrid = document.getElementById('projectsGrid');
projectsGrid.innerHTML = projects.map((p, i) => `
  <article class="project-card">
    <div class="project-top">
      <div>
        <div class="project-icon">${p.icon}</div>
      </div>
    </div>
    <div>
      <h3>${p.title}</h3>
      <p class="project-sub">${p.subtitle}</p>
    </div>
    <p class="project-desc">${p.desc}</p>
    <div class="project-tech">
      ${p.tech.map(t => `<span>${t}</span>`).join('')}
    </div>
    <ul class="project-features">
      ${p.features.slice(0, 4).map(f => `<li>${f}</li>`).join('')}
    </ul>
    <div class="project-more" id="more-${i}" hidden>
      ${p.architecture ? `<p class="project-arch"><strong>Architecture:</strong><br>${p.architecture}</p>` : ''}
      <p class="project-resp-title"><strong>Key contributions:</strong></p>
      <ul class="project-features">
        ${p.responsibilities.map(r => `<li>${r}</li>`).join('')}
      </ul>
    </div>
    <button class="project-toggle" data-target="more-${i}">Show details</button>
  </article>
`).join('');

projectsGrid.querySelectorAll('.project-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const panel = document.getElementById(btn.dataset.target);
    const isHidden = panel.hasAttribute('hidden');
    if (isHidden){
      panel.removeAttribute('hidden');
      btn.textContent = 'Hide details';
    } else {
      panel.setAttribute('hidden', '');
      btn.textContent = 'Show details';
    }
  });
});

// ============================================================
// Certifications data
// ============================================================
const certs = [
  {
    icon: '☁️',
    title: 'Fundamentals of DevOps On AWS',
    issuer: 'SimpliLearn (AWS)',
    date: 'Sept 2026',
    desc: 'Cloud infrastructure, DevOps automation & AWS core services',
    credentialId: '10716430',
    links: [
      { label: 'View Credential', url: 'https://www.credly.com/users/sahiljaiswal24' }
    ]
  },
  {
    icon: '☁️',
    title: 'AWS Cloud Practitioner',
    issuer: 'Amazon Web Services',
    date: '2024',
    desc: 'Cloud infrastructure, provisioning & core services',
    credentialId: null,
    links: []
  },
  {
    icon: '🎩',
    title: 'Red Hat Enterprise Linux (RHEL)',
    issuer: 'Red Hat',
    date: '2023',
    desc: 'Linux administration & system management',
    credentialId: null,
    links: []
  },
  {
    icon: '🌐',
    title: 'Cisco CCNA',
    issuer: 'Cisco Systems',
    date: '2023',
    desc: 'Enterprise networking, routing & switching',
    credentialId: null,
    links: []
  }
];
document.getElementById('certGrid').innerHTML = certs.map(c => `
  <div class="cert-card">
    <div class="cert-badge">${c.icon}</div>
    <h3>${c.title}</h3>
    <p class="cert-issuer">${c.issuer}</p>
    <p class="cert-date">${c.date}</p>
    <p>${c.desc}</p>
    ${c.credentialId ? `<p class="cert-id">ID: ${c.credentialId}</p>` : ''}
    ${c.links.length > 0 ? `
      <div class="cert-links">
        ${c.links.map(link => `<a href="${link.url}" target="_blank" rel="noopener" class="cert-link">${link.label}</a>`).join('')}
      </div>
    ` : ''}
  </div>
`).join('');

// Kick off reveal observation after dynamic content is injected
observeReveals();
