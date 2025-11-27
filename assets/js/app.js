/**
 * Dominic Brause — Solution Architect Portfolio
 * Smooth animations and interactions
 */

(function() {
    'use strict';

    // Wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', init);

    function init() {
        initScrollAnimations();
        initSmoothScroll();
        initNavHighlight();
        initCardHoverEffects();
    }

    /**
     * Scroll-triggered fade-in animations using Intersection Observer
     */
    function initScrollAnimations() {
        // Elements to animate on scroll
        const animatedElements = document.querySelectorAll(
            '.expertise-card, .timeline-item, .initiative-card, .profile-card, .quick-facts, .stack-category'
        );

        // Add initial state class
        animatedElements.forEach(el => {
            el.classList.add('scroll-fade');
        });

        // Create observer
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -50px 0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Stagger the animation slightly
                    const delay = Array.from(animatedElements).indexOf(entry.target) * 50;
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, Math.min(delay, 300));
                    
                    // Stop observing once animated
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        animatedElements.forEach(el => observer.observe(el));
    }

    /**
     * Smooth scroll for navigation links
     */
    function initSmoothScroll() {
        const navLinks = document.querySelectorAll('.nav-link');

        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const headerOffset = 30;
                    const elementPosition = targetSection.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });

                    // Update active state
                    navLinks.forEach(l => l.classList.remove('active'));
                    this.classList.add('active');
                }
            });
        });
    }

    /**
     * Highlight navigation based on scroll position
     */
    function initNavHighlight() {
        const sections = document.querySelectorAll('.section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -60% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === '#' + id) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, observerOptions);

        sections.forEach(section => observer.observe(section));
    }

    /**
     * Enhanced hover effects for cards
     */
    function initCardHoverEffects() {
        const cards = document.querySelectorAll('.expertise-card, .social-link');

        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            });

            card.addEventListener('mouseleave', function() {
                this.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            });
        });

        // Parallax effect on profile image (subtle)
        const profileImage = document.querySelector('.profile-image');
        if (profileImage) {
            const profileCard = profileImage.closest('.profile-card');
            
            profileCard.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;
                
                profileImage.style.transform = `scale(1.02) translate(${x * 5}px, ${y * 5}px)`;
            });

            profileCard.addEventListener('mouseleave', function() {
                profileImage.style.transform = 'scale(1) translate(0, 0)';
            });
        }
    }

})();