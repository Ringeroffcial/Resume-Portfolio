       document.addEventListener('DOMContentLoaded', function() {

            const date = document.getElementById("date");
const formatter = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
});
date.textContent = formatter.format(new Date());

            // Smooth scrolling
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    if (targetId === '#') return;
                    
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        const headerHeight = document.querySelector('.header').offsetHeight;
                        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                });
            });

            // Active navigation
            const sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('.nav-link');

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const id = entry.target.getAttribute('id');
                        navLinks.forEach(link => {
                            link.classList.remove('active');
                            if (link.getAttribute('href') === `#${id}`) {
                                link.classList.add('active');
                            }
                        });
                    }
                });
            }, {
                threshold: 0.3,
                rootMargin: '-100px 0px -100px 0px'
            });

            sections.forEach(section => observer.observe(section));

            // Form submission
            const contactForm = document.getElementById('contact-form');
            if (contactForm) {
                contactForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    
                    // Get form data
                    const name = this.querySelector('#name').value;
                    const email = this.querySelector('#email').value;
                    const subject = this.querySelector('#subject').value;
                    const message = this.querySelector('#message').value;
                    
                    // Simple validation
                    if (!name || !email || !subject || !message) {
                        alert('Please fill in all fields');
                        return;
                    }
                    
                    // Simulate form submission
                    const submitBtn = this.querySelector('button[type="submit"]');
                    const originalText = submitBtn.innerHTML;
                    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                    submitBtn.disabled = true;
                    
                    setTimeout(() => {
                        alert(`Thank you, ${name}! Your message has been sent successfully. I'll get back to you soon.`);
                        this.reset();
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                    }, 1500);
                });
            }

            // Button functionality
            document.getElementById('view-work-btn').addEventListener('click', () => {
                document.querySelector('#about').scrollIntoView({ behavior: 'smooth' });
            });

            document.getElementById('download-cv-btn').addEventListener('click', () => {
                window.location.href="CV.html"
            });

            // Header scroll effect
            let lastScroll = 0;
            window.addEventListener('scroll', () => {
                const currentScroll = window.pageYOffset;
                const header = document.querySelector('.header');
                
                if (currentScroll <= 0) {
                    header.style.boxShadow = 'none';
                } else {
                    header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
                }
                
                lastScroll = currentScroll;
            });
        });