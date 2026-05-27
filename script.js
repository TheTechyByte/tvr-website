// Smooth anchoring for user navigation actions
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetElement = document.querySelector(this.getAttribute('href'));
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer configuration for continuous fade-in animations on scroll
const animationOptions = {
    root: null,
    rootMargin: '0px 0px -100px 0px', 
    threshold: 0.15
};

const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // If the element has a staggered list inside, animate the children sequentially
            const staggerList = entry.target.querySelectorAll('.stagger-list li');
            if (staggerList.length > 0) {
                staggerList.forEach((li, index) => {
                    li.style.opacity = '0';
                    li.style.transform = 'translateX(-20px)';
                    li.style.transition = 'all 0.5s ease forwards';
                    setTimeout(() => {
                        li.style.opacity = '1';
                        li.style.transform = 'translateX(0)';
                    }, index * 150); // 150ms delay between each list item
                });
            }
            
            observer.unobserve(entry.target); 
        }
    });
}, animationOptions);

// Initialize observers on DOM structural elements
document.addEventListener("DOMContentLoaded", () => {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(element => scrollObserver.observe(element));
    
    // Pre-hide list items for the custom JS stagger effect
    document.querySelectorAll('.stagger-list li').forEach(li => {
        li.style.opacity = '0';
    });
});