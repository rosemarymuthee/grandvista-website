document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Rooms Tab Switching
    const roomTabBtns = document.querySelectorAll('.room-tab');
    const roomContents = document.querySelectorAll('.room-content');

    roomTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            roomTabBtns.forEach(b => b.classList.remove('active'));
            roomContents.forEach(c => c.classList.remove('active'));

            // Add active class to clicked button
            btn.classList.add('active');

            // Show corresponding content
            const targetId = btn.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    // Form Submission (Prevent default for demo)
    const reservationForm = document.querySelector('.reservation-form');
    if (reservationForm) {
        reservationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = reservationForm.querySelector('.btn-submit');
            const originalText = btn.textContent;
            
            btn.textContent = 'RESERVATION CONFIRMED!';
            btn.style.backgroundColor = '#10b981'; // Success green
            
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.backgroundColor = ''; // Reset to default
                reservationForm.reset();
            }, 3000);
        });
    }

    // Header Background and Sticky Scroll
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;

    // Add transition for transform
    header.style.transition = 'transform 0.3s ease, background-color 0.3s ease, padding 0.3s ease';

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        // Hide/Show logic
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            // Scrolling down & past 100px - hide header
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up - show header
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;

        // Background logic
        if (currentScrollY > 50) {
            header.style.backgroundColor = 'rgba(11, 48, 91, 0.95)'; // Deep blue with opacity
            header.style.backdropFilter = 'blur(10px)';
            header.style.padding = '1rem 0';
        } else {
            if (header.classList.contains('header-interior')) {
                header.style.backgroundColor = '#0b305b'; // Solid primary color
            } else {
                header.style.backgroundColor = 'transparent';
            }
            header.style.backdropFilter = 'none';
            header.style.padding = '1.5rem 0';
        }
    });
});
