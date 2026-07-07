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
    icon: '🅿️',
    title: 'Spot Sense AI',
    subtitle: 'ML + Computer Vision · Smart Parking System · M.Sc. Final Year Project',
    desc: 'AI-powered parking management platform that automates the full parking lifecycle — number-plate detection, slot allocation, entry/exit logging, automatic billing, email notifications and payments — via a Flask web portal and a Tkinter desktop GUI.',
    tech: ['Python', 'Flask', 'OpenCV', 'OCR', 'Tkinter', 'SQL', 'SMTP', 'Payment Gateway'],
    features: [
      'OCR-based vehicle number-plate detection', 'User auth with sessions',
      'Automatic slot allocation & live status', 'Duration-based automatic billing',
      'Email confirmations & payment receipts', 'Admin dashboard with revenue reports'
    ],
    architecture: 'Camera → OpenCV → OCR Detection → Vehicle Number → Database → Slot Allocation → Billing → Email + Payment',
    responsibilities: [
      'Designed the end-to-end architecture', 'Built the Flask backend & SQL database',
      'Built the Tkinter desktop GUI with camera integration', 'Integrated OCR, billing, email and payment workflows'
    ]
  },
  {
    icon: '🏥',
    title: 'SCAN Patient Information System',
    subtitle: 'SCAN, IIT Bombay · Healthcare Management System',
    desc: 'A web-based patient information system for managing records across hospitals and departments, with dynamic disease-specific forms and a MySQL-backed admin console — including a dedicated Alzheimer’s patient intake form.',
    tech: ['Flask', 'HTML/CSS/JS', 'MySQL', 'SQLAlchemy', 'JWT', 'Docker'],
    features: [
      'Hospital, department & doctor selection', 'Dynamic, multi-step patient registration forms',
      'Alzheimer’s-specific medical intake form', 'Admin dashboard: search, filter, review submissions',
      'Session/JWT authentication', 'Dockerized Flask + MySQL deployment'
    ],
    architecture: 'Browser → HTML/CSS/JS → Flask API → SQLAlchemy → MySQL → Admin Dashboard',
    responsibilities: [
      'Full-stack development end-to-end', 'Database design & MySQL/SQLAlchemy integration',
      'Built dynamic multi-step forms', 'Docker deployment of the full stack'
    ]
  },
  {
    icon: '📝',
    title: 'Request Management System',
    subtitle: 'SCAN, IIT Bombay · Approval Workflow Portal',
    desc: 'A request-approval portal where users submit requests and admins approve or reject them in real time, backed by Firebase for auth/data and a JWT-secured Flask REST API.',
    tech: ['Flask', 'Firebase Firestore', 'Firebase Auth', 'MySQL', 'JWT', 'JavaScript'],
    features: [
      'User & admin login with role-based access', 'Submit requests & view request history',
      'Approve / reject dashboard for admins', 'Real-time updates via Firestore',
      'Search & filter across requests', 'JWT-secured REST CRUD APIs'
    ],
    responsibilities: [
      'Firebase (Firestore, Auth, Realtime DB) integration', 'JWT authentication & REST APIs on Flask',
      'Built both user and admin dashboards'
    ]
  },
  {
    icon: '🐋',
    title: 'Dockerized Flask + MySQL Application',
    subtitle: 'Production Deployment on Synology NAS',
    desc: 'A production-style multi-container deployment of a Flask + MySQL application, with a static-IP macvlan network for direct LAN addressing and persistent storage on a Synology NAS.',
    tech: ['Docker', 'Docker Compose', 'Flask', 'MySQL', 'SQLAlchemy'],
    features: [
      'Multi-container app via Docker Compose', 'Static IP with macvlan networking',
      'Persistent volumes for database storage', 'Environment-variable driven config',
      'Reverse proxy support'
    ],
    responsibilities: [
      'Wrote Dockerfiles & Compose configuration', 'Configured macvlan networking & static IP',
      'Set up MySQL persistence & container lifecycle management'
    ]
  },
  {
    icon: '📧',
    title: 'Enterprise Mail Server',
    subtitle: 'SCAN, IIT Bombay · Ubuntu Server',
    desc: 'A self-hosted enterprise mail server providing secure organizational email, group addresses and authenticated SMTP/IMAP for internal communication.',
    tech: ['Postfix', 'Dovecot', 'SMTP', 'IMAP', 'DNS', 'SSL'],
    features: [
      'Organizational & group email addresses', 'Secure authenticated SMTP/IMAP',
      'DNS & SSL/TLS configuration', 'User & mailbox management'
    ],
    responsibilities: [
      'Installed & configured Postfix + Dovecot', 'Set up DNS records & SSL certificates',
      'Managed user accounts & group email lists'
    ]
  },
  {
    icon: '🔐',
    title: 'Full JWT Authentication System',
    subtitle: 'Reusable Auth Framework for Flask Apps',
    desc: 'A complete, reusable authentication and authorization framework built for Flask applications, covering token issuance, protected routes and role-based access.',
    tech: ['Flask', 'JWT', 'MySQL'],
    features: [
      'Registration & login with password hashing', 'JWT issuance & validation',
      'Protected/role-guarded routes', 'Admin vs. user role separation', 'Session management'
    ],
    responsibilities: [
      'Designed token-based auth & authorization flow', 'Implemented protected routes & API security'
    ]
  }
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
  { icon: '☁️', title: 'AWS Cloud Certification', desc: 'Cloud infrastructure, provisioning & core services' },
  { icon: '🎩', title: 'Red Hat Enterprise Linux (RHEL)', desc: 'Linux administration & system management' },
  { icon: '🌐', title: 'Cisco CCNA', desc: 'Enterprise networking, routing & switching' }
];
document.getElementById('certGrid').innerHTML = certs.map(c => `
  <div class="cert-card">
    <div class="cert-badge">${c.icon}</div>
    <h3>${c.title}</h3>
    <p>${c.desc}</p>
  </div>
`).join('');

// Kick off reveal observation after dynamic content is injected
observeReveals();
