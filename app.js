// Portfolio Data with bilingual content
const portfolioData = [
  {
    id: 1,
    category: "Visual Merchandising & Graphic Design",
    title: {
      en: "Retail Store Display Concept",
      cn: "零售店展示概念"
    },
    description: {
      en: "Created compelling visual merchandising concepts for tech retail stores, increasing foot traffic by 35%. This comprehensive project involved designing store layouts, product displays, and promotional materials that enhanced the customer shopping experience.",
      cn: "为科技零售店创建引人注目的视觉营销概念，客流量增加35%。这个综合项目涉及设计店铺布局、产品展示和促销材料，提升客户购物体验。"
    },
    tags: ["Visual Design", "Retail", "Brand Experience"],
    icon: "fas fa-store"
  },
  {
    id: 2,
    category: "Video & Photography Projects",
    title: {
      en: "星星闪送 Brand Video Campaign",
      cn: "星星闪送品牌视频营销"
    },
    description: {
      en: "Produced promotional video content for XingXing Flash delivery service, achieving 2M+ views across platforms. The campaign included social media videos, promotional content, and brand storytelling that resonated with the target audience.",
      cn: "为星星闪送配送服务制作推广视频内容，跨平台浏览量超过200万次。该活动包括社交媒体视频、推广内容和与目标受众产生共鸣的品牌故事。"
    },
    tags: ["Video Production", "Social Media", "Brand Campaign"],
    icon: "fas fa-video"
  },
  {
    id: 3,
    category: "IP Branding & Web Design",
    title: {
      en: "Character IP Development",
      cn: "角色IP开发"
    },
    description: {
      en: "Designed original mascot characters and brand identity system for emerging lifestyle brand. The project encompassed character design, brand guidelines, merchandise design, and digital asset creation.",
      cn: "为新兴生活方式品牌设计原创吉祥物角色和品牌标识系统。该项目包括角色设计、品牌指南、商品设计和数字资产创建。"
    },
    tags: ["Character Design", "Brand Identity", "IP Creation"],
    icon: "fas fa-paint-brush"
  },
  {
    id: 4,
    category: "Marketing Campaigns",
    title: {
      en: "TikTok Growth Strategy",
      cn: "TikTok增长策略"
    },
    description: {
      en: "Developed viral content strategy resulting in 500K+ followers growth within 3 months. The strategy included content planning, trend analysis, influencer partnerships, and community engagement tactics.",
      cn: "开发病毒式内容策略，3个月内粉丝增长50万+。该策略包括内容规划、趋势分析、网红合作和社区参与策略。"
    },
    tags: ["Social Media", "Content Strategy", "Growth Hacking"],
    icon: "fab fa-tiktok"
  },
  {
    id: 5,
    category: "Operations & HR Experience",
    title: {
      en: "Team Workflow Optimization",
      cn: "团队工作流程优化"
    },
    description: {
      en: "Streamlined cross-department processes reducing project delivery time by 40%. Implemented new communication protocols, project management systems, and performance tracking mechanisms.",
      cn: "简化跨部门流程，项目交付时间缩短40%。实施了新的沟通协议、项目管理系统和绩效跟踪机制。"
    },
    tags: ["Process Optimization", "Team Management", "Efficiency"],
    icon: "fas fa-tasks"
  }
];

// Language data
const translations = {
  en: {
    nav: ["Home", "Portfolio", "About", "Contact", "Blog"],
    categories: [
      "Visual Merchandising & Graphic Design",
      "Video & Photography Projects", 
      "IP Branding & Web Design",
      "Marketing Campaigns",
      "Operations & HR Experience"
    ]
  },
  cn: {
    nav: ["首页", "作品集", "关于我", "联系", "博客"],
    categories: [
      "视觉营销与平面设计",
      "视频与摄影项目",
      "IP品牌与网页设计", 
      "营销活动",
      "运营与人力资源经验"
    ]
  }
};

// Global variables
let currentLanguage = 'en';
let currentFilter = 'all';

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
});

// Initialize Application
function initializeApp() {
  setupLanguageSwitching();
  setupPortfolioFiltering();
  setupNavigation();
  setupMobileMenu();
  setupContactForm();
  setupProjectModals();
  setupScrollEffects();
}

// Language Switching
function setupLanguageSwitching() {
  const langButtons = document.querySelectorAll('.lang-btn');
  
  langButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const lang = this.id === 'lang-en' ? 'en' : 'cn';
      switchLanguage(lang);
    });
  });
}

function switchLanguage(lang) {
  currentLanguage = lang;
  
  // Update language button states
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  document.getElementById(`lang-${lang}`).classList.add('active');
  
  // Update document language attribute
  document.documentElement.lang = lang;
  
  // Update all translatable elements
  const translatableElements = document.querySelectorAll('[data-en][data-cn]');
  translatableElements.forEach(element => {
    const translation = element.getAttribute(`data-${lang}`);
    if (translation) {
      element.textContent = translation;
    }
  });
  
  // Update portfolio filter buttons
  updatePortfolioFilterButtons(lang);
  
  // Update project modal if open
  const modal = document.getElementById('project-modal');
  if (modal.classList.contains('active')) {
    const projectId = modal.getAttribute('data-project-id');
    if (projectId) {
      showProjectModal(parseInt(projectId));
    }
  }
}

function updatePortfolioFilterButtons(lang) {
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach((btn, index) => {
    if (index === 0) return; // Skip "All" button
    
    const categoryIndex = index - 1;
    if (translations[lang].categories[categoryIndex]) {
      btn.textContent = translations[lang].categories[categoryIndex];
    }
  });
}

// Portfolio Filtering
function setupPortfolioFiltering() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  
  filterButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const filter = this.getAttribute('data-filter');
      filterPortfolio(filter);
      
      // Update active button
      filterButtons.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
    });
  });
}

function filterPortfolio(filter) {
  currentFilter = filter;
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  
  portfolioItems.forEach(item => {
    const category = item.getAttribute('data-category');
    
    if (filter === 'all' || category === filter) {
      item.classList.remove('hidden');
      // Add animation delay for staggered effect
      setTimeout(() => {
        item.style.opacity = '1';
        item.style.transform = 'scale(1)';
      }, Math.random() * 200);
    } else {
      item.classList.add('hidden');
      item.style.opacity = '0';
      item.style.transform = 'scale(0.8)';
    }
  });
}

// Navigation
function setupNavigation() {
  const navLinks = document.querySelectorAll('.nav-links a, .footer-nav a');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          smoothScrollTo(targetElement);
          updateActiveNavLink(href);
        }
      }
    });
  });
  
  // Update active nav link on scroll
  window.addEventListener('scroll', updateActiveNavOnScroll);
}

function smoothScrollTo(element) {
  const headerHeight = document.querySelector('.header').offsetHeight;
  const targetPosition = element.offsetTop - headerHeight - 20;
  
  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth'
  });
}

function updateActiveNavLink(href) {
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === href) {
      link.classList.add('active');
    }
  });
}

function updateActiveNavOnScroll() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPosition = window.scrollY + 100;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      updateActiveNavLink(`#${sectionId}`);
    }
  });
}

// Mobile Menu
function setupMobileMenu() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      this.classList.toggle('active');
    });
  }
  
  // Close mobile menu when clicking on a link
  const mobileNavLinks = document.querySelectorAll('.nav-links a');
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', function() {
      navLinks.classList.remove('active');
      mobileMenuBtn.classList.remove('active');
    });
  });
}

// Contact Form
function setupContactForm() {
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(this);
      const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message')
      };
      
      // Validate form
      if (validateContactForm(data)) {
        submitContactForm(data);
      }
    });
  }
}

function validateContactForm(data) {
  const formStatus = document.getElementById('form-status');
  
  // Basic validation
  if (!data.name || !data.email || !data.subject || !data.message) {
    showFormStatus('error', currentLanguage === 'en' ? 'Please fill in all fields.' : '请填写所有字段。');
    return false;
  }
  
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    showFormStatus('error', currentLanguage === 'en' ? 'Please enter a valid email address.' : '请输入有效的邮箱地址。');
    return false;
  }
  
  return true;
}

function submitContactForm(data) {
  const formStatus = document.getElementById('form-status');
  const submitBtn = document.querySelector('#contact-form button[type="submit"]');
  
  // Simulate form submission
  submitBtn.disabled = true;
  submitBtn.textContent = currentLanguage === 'en' ? 'Sending...' : '发送中...';
  
  // Simulate API call delay
  setTimeout(() => {
    showFormStatus('success', 
      currentLanguage === 'en' 
        ? 'Thank you for your message! I\'ll get back to you soon.' 
        : '感谢您的留言！我会尽快回复您。'
    );
    
    // Reset form
    document.getElementById('contact-form').reset();
    
    // Reset button
    submitBtn.disabled = false;
    submitBtn.textContent = currentLanguage === 'en' ? 'Send Message' : '发送信息';
  }, 2000);
}

function showFormStatus(type, message) {
  const formStatus = document.getElementById('form-status');
  formStatus.className = `form-status ${type}`;
  formStatus.textContent = message;
  
  // Hide after 5 seconds
  setTimeout(() => {
    formStatus.style.display = 'none';
  }, 5000);
}

// Project Modals
function setupProjectModals() {
  const viewDetailsButtons = document.querySelectorAll('.view-details');
  const modal = document.getElementById('project-modal');
  const closeModal = document.querySelector('.close-modal');
  
  viewDetailsButtons.forEach((btn, index) => {
    btn.addEventListener('click', function() {
      const projectIndex = index % portfolioData.length;
      showProjectModal(projectIndex);
    });
  });
  
  if (closeModal) {
    closeModal.addEventListener('click', hideProjectModal);
  }
  
  if (modal) {
    modal.addEventListener('click', function(e) {
      if (e.target === this) {
        hideProjectModal();
      }
    });
  }
  
  // Close modal with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      hideProjectModal();
    }
  });
}

function showProjectModal(projectIndex) {
  const project = portfolioData[projectIndex];
  const modal = document.getElementById('project-modal');
  
  if (!project || !modal) return;
  
  // Update modal content
  document.getElementById('modal-title').textContent = project.title[currentLanguage];
  document.getElementById('modal-description').textContent = project.description[currentLanguage];
  document.getElementById('modal-icon').className = project.icon;
  
  // Update tags
  const modalTags = document.getElementById('modal-tags');
  modalTags.innerHTML = '';
  project.tags.forEach(tag => {
    const tagElement = document.createElement('span');
    tagElement.className = 'tag';
    tagElement.textContent = tag;
    modalTags.appendChild(tagElement);
  });
  
  // Store project ID for language switching
  modal.setAttribute('data-project-id', projectIndex);
  
  // Show modal
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function hideProjectModal() {
  const modal = document.getElementById('project-modal');
  modal.classList.remove('active');
  document.body.style.overflow = '';
  modal.removeAttribute('data-project-id');
}

// Scroll Effects
function setupScrollEffects() {
  // Header background on scroll
  window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
      header.style.background = 'rgba(255, 255, 255, 0.98)';
      header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
      header.style.background = 'rgba(255, 255, 255, 0.95)';
      header.style.boxShadow = 'none';
    }
  });
  
  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Observe elements for scroll animations
  const animateElements = document.querySelectorAll('.skill-category, .portfolio-item, .blog-post, .timeline-item');
  animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

// Utility Functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Handle window resize
window.addEventListener('resize', debounce(function() {
  // Recalculate any layout-dependent functionality
  if (window.innerWidth > 768) {
    const navLinks = document.querySelector('.nav-links');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    if (navLinks) navLinks.classList.remove('active');
    if (mobileMenuBtn) mobileMenuBtn.classList.remove('active');
  }
}, 250));

// Performance optimization - lazy load portfolio images
function setupLazyLoading() {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        // Add any actual image loading logic here
        observer.unobserve(img);
      }
    });
  });
  
  const portfolioImages = document.querySelectorAll('.portfolio-img, .blog-img');
  portfolioImages.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', setupLazyLoading);

// Export functions for potential external use
window.EddiePortfolio = {
  switchLanguage,
  filterPortfolio,
  showProjectModal,
  hideProjectModal
};