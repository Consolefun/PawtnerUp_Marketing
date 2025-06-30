// PawtnerUp Marketing Landing Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
        
        lastScrollTop = scrollTop;
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // App preview tab functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const previewScreenshots = document.querySelectorAll('.preview-screenshot');
    const featureHighlights = document.querySelectorAll('.feature-highlight');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetScreen = this.getAttribute('data-screen');
            
            // Remove active class from all tabs
            tabButtons.forEach(btn => btn.classList.remove('active'));
            previewScreenshots.forEach(img => img.classList.remove('active'));
            featureHighlights.forEach(highlight => highlight.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Show corresponding screenshot
            const targetScreenshot = document.querySelector(`.preview-screenshot[data-screen="${targetScreen}"]`);
            if (targetScreenshot) {
                targetScreenshot.classList.add('active');
            }
            
            // Show corresponding feature highlight
            const targetHighlight = document.querySelector(`.feature-highlight[data-screen="${targetScreen}"]`);
            if (targetHighlight) {
                targetHighlight.classList.add('active');
            }
        });
    });

    // Auto-cycle through app preview tabs
    let currentTabIndex = 0;
    let autoTabCycleInterval = null;
    let userInteractionTimeout = null;
    let isUserInteracting = false;

    function startAutoTabCycle() {
        // Clear any existing interval first
        if (autoTabCycleInterval) {
            clearInterval(autoTabCycleInterval);
        }
        
        autoTabCycleInterval = setInterval(() => {
            if (!isUserInteracting && tabButtons.length > 0) {
                currentTabIndex = (currentTabIndex + 1) % tabButtons.length;
                tabButtons[currentTabIndex].click();
            }
        }, 5000); // Change every 5 seconds (slower)
    }

    function stopAutoTabCycle() {
        if (autoTabCycleInterval) {
            clearInterval(autoTabCycleInterval);
            autoTabCycleInterval = null;
        }
    }

    function resetAutoTabCycle() {
        isUserInteracting = true;
        stopAutoTabCycle();
        
        // Clear existing timeout
        if (userInteractionTimeout) {
            clearTimeout(userInteractionTimeout);
        }
        
        // Restart auto-cycle after 8 seconds of no interaction
        userInteractionTimeout = setTimeout(() => {
            isUserInteracting = false;
            // Update current index to match active tab
            const activeTabIndex = Array.from(tabButtons).findIndex(btn => btn.classList.contains('active'));
            if (activeTabIndex !== -1) {
                currentTabIndex = activeTabIndex;
            }
            startAutoTabCycle();
        }, 8000);
    }

    // Start the auto-cycle initially
    startAutoTabCycle();

    // Add click listeners to tabs
    tabButtons.forEach((button, index) => {
        button.addEventListener('click', (e) => {
            // Only reset auto-cycle if this was a manual click
            if (e.isTrusted) {
                currentTabIndex = index;
                resetAutoTabCycle();
            }
        });
    });

    // Pause auto-cycle when page is not visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopAutoTabCycle();
        } else if (!isUserInteracting) {
            startAutoTabCycle();
        }
    });


    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate feature cards
                if (entry.target.classList.contains('feature-card')) {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(30px)';
                    setTimeout(() => {
                        entry.target.style.transition = 'all 0.6s ease';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 200);
                }


                // Animate floating emojis
                if (entry.target.classList.contains('floating-emojis')) {
                    const emojis = entry.target.querySelectorAll('.emoji');
                    emojis.forEach((emoji, index) => {
                        setTimeout(() => {
                            emoji.style.opacity = '1';
                            emoji.style.animation = `floatEmoji 4s ease-in-out infinite`;
                            emoji.style.animationDelay = `${index * 0.5}s`;
                        }, index * 200);
                    });
                }

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.feature-card').forEach(card => observer.observe(card));
    document.querySelectorAll('.floating-emojis').forEach(container => observer.observe(container));

    // Phone mockup hover effects
    const phoneMockups = document.querySelectorAll('.phone-mockup');
    phoneMockups.forEach(phone => {
        phone.addEventListener('mouseenter', function() {
            this.style.transform = 'perspective(1000px) rotateY(0deg) scale(1.05)';
        });
        
        phone.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateY(-10deg) scale(1)';
        });
    });

    // Add sparkle effect to buttons
    function createSparkle(button) {
        const sparkle = document.createElement('div');
        sparkle.style.position = 'absolute';
        sparkle.style.width = '6px';
        sparkle.style.height = '6px';
        sparkle.style.background = '#ffd93d';
        sparkle.style.borderRadius = '50%';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '1000';
        
        const rect = button.getBoundingClientRect();
        sparkle.style.left = rect.left + Math.random() * rect.width + 'px';
        sparkle.style.top = rect.top + Math.random() * rect.height + 'px';
        
        document.body.appendChild(sparkle);
        
        sparkle.animate([
            { opacity: 1, transform: 'scale(0) translateY(0)' },
            { opacity: 0, transform: 'scale(1) translateY(-20px)' }
        ], {
            duration: 1000,
            easing: 'ease-out'
        }).onfinish = () => sparkle.remove();
    }

    // Add sparkle effect to primary buttons
    document.querySelectorAll('.btn-primary, .download-btn').forEach(button => {
        button.addEventListener('mouseenter', function() {
            const sparkleInterval = setInterval(() => createSparkle(this), 200);
            this.addEventListener('mouseleave', () => clearInterval(sparkleInterval), { once: true });
        });
    });

    // Easter egg: Konami code for special pet animation
    let konamiCode = [];
    const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA

    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.keyCode);
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (konamiCode.join(',') === konamiSequence.join(',')) {
            // Trigger special pet animation
            const pawPrints = document.querySelectorAll('.paw-print');
            pawPrints.forEach((paw, index) => {
                setTimeout(() => {
                    paw.style.fontSize = '60px';
                    paw.style.color = '#ff6b6b';
                    paw.style.opacity = '1';
                    paw.style.animation = 'bounce 0.5s ease-in-out 3';
                    
                    setTimeout(() => {
                        paw.style.fontSize = '30px';
                        paw.style.color = 'rgba(255, 255, 255, 0.3)';
                        paw.style.opacity = '0.1';
                        paw.style.animation = 'float 8s ease-in-out infinite';
                    }, 2000);
                }, index * 100);
            });
            
            // Show congratulations message
            const message = document.createElement('div');
            message.textContent = '🐾 Pawsome! You found the secret! 🐾';
            message.style.position = 'fixed';
            message.style.top = '50%';
            message.style.left = '50%';
            message.style.transform = 'translate(-50%, -50%)';
            message.style.background = 'linear-gradient(45deg, #667eea, #764ba2)';
            message.style.color = 'white';
            message.style.padding = '20px 40px';
            message.style.borderRadius = '50px';
            message.style.fontSize = '1.5rem';
            message.style.fontWeight = '600';
            message.style.zIndex = '10000';
            message.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.3)';
            
            document.body.appendChild(message);
            
            setTimeout(() => {
                message.style.transition = 'all 0.5s ease';
                message.style.opacity = '0';
                message.style.transform = 'translate(-50%, -50%) scale(0.8)';
                setTimeout(() => message.remove(), 500);
            }, 3000);
            
            konamiCode = [];
        }
    });

    // Parallax effect for background elements
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.paw-print');
        
        parallaxElements.forEach((element, index) => {
            const speed = (index % 3 + 1) * 0.1;
            element.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.05}deg)`;
        });
    });

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });

    console.log('🐾 PawtnerUp Marketing Page Loaded! Ready to connect pets and their people! 🐾');
});
