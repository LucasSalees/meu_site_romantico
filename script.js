// ===== GLOBAL VARIABLES =====
let currentSlide = 0;
const totalSlides = 7;
let slideInterval;

// Relationship start date
const relationshipStart = new Date('2021-09-07T00:00:00');

// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', function() {
    initializeCarousel();
    initializeTimeCounter();
    initializeSpotifyButton();
    addScrollAnimations();
});

// ===== CAROUSEL FUNCTIONALITY =====
function initializeCarousel() {
    const track = document.querySelector('.carousel-track');
    const prevBtn = document.querySelector('.carousel-btn-prev');
    const nextBtn = document.querySelector('.carousel-btn-next');
    const indicators = document.querySelectorAll('.indicator');
    const polaroids = document.querySelectorAll('.polaroid');

    // Initialize first slide
    updateCarousel();

    // Previous button
    prevBtn.addEventListener('click', () => {
        currentSlide = currentSlide === 0 ? totalSlides - 1 : currentSlide - 1;
        updateCarousel();
        resetAutoPlay();
    });

    // Next button
    nextBtn.addEventListener('click', () => {
        currentSlide = currentSlide === totalSlides - 1 ? 0 : currentSlide + 1;
        updateCarousel();
        resetAutoPlay();
    });

    // Indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentSlide = index;
            updateCarousel();
            resetAutoPlay();
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            currentSlide = currentSlide === 0 ? totalSlides - 1 : currentSlide - 1;
            updateCarousel();
            resetAutoPlay();
        } else if (e.key === 'ArrowRight') {
            currentSlide = currentSlide === totalSlides - 1 ? 0 : currentSlide + 1;
            updateCarousel();
            resetAutoPlay();
        }
    });

    // Touch/swipe support for mobile
    let startX = 0;
    let endX = 0;

    track.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    track.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = startX - endX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next slide
                currentSlide = currentSlide === totalSlides - 1 ? 0 : currentSlide + 1;
            } else {
                // Swipe right - previous slide
                currentSlide = currentSlide === 0 ? totalSlides - 1 : currentSlide - 1;
            }
            updateCarousel();
            resetAutoPlay();
        }
    }

    // Auto-play functionality
    function startAutoPlay() {
        slideInterval = setInterval(() => {
            currentSlide = currentSlide === totalSlides - 1 ? 0 : currentSlide + 1;
            updateCarousel();
        }, 5000); // Change slide every 5 seconds
    }

    function resetAutoPlay() {
        clearInterval(slideInterval);
        startAutoPlay();
    }

    // Start auto-play
    startAutoPlay();

    // Pause auto-play on hover
    const carouselContainer = document.querySelector('.carousel-container');
    carouselContainer.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });

    carouselContainer.addEventListener('mouseleave', () => {
        startAutoPlay();
    });
}

function updateCarousel() {
    const track = document.querySelector('.carousel-track');
    const indicators = document.querySelectorAll('.indicator');
    const polaroids = document.querySelectorAll('.polaroid');

    // Update track position
    const translateX = -currentSlide * 100;
    track.style.transform = `translateX(${translateX}%)`;

    // Update indicators
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
    });

    // Update polaroid active state
    polaroids.forEach((polaroid, index) => {
        polaroid.classList.toggle('active', index === currentSlide);
    });
}

// ===== TIME COUNTER FUNCTIONALITY =====
function initializeTimeCounter() {
    updateTimeCounter();
    
    // Update every second
    setInterval(updateTimeCounter, 1000);
}

function updateTimeCounter() {
    const now = new Date();
    const diff = now - relationshipStart;

    // Calculate time units
    const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
    const months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.44));
    const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    // Update DOM elements with animation
    updateCounterElement('years', years);
    updateCounterElement('months', months);
    updateCounterElement('days', days);
    updateCounterElement('hours', hours);
    updateCounterElement('minutes', minutes);
    updateCounterElement('seconds', seconds);
}

function updateCounterElement(id, value) {
    const element = document.getElementById(id);
    const currentValue = parseInt(element.textContent) || 0;
    
    if (currentValue !== value) {
        // Add animation class
        element.style.transform = 'scale(1.2)';
        element.style.color = '#ff69b4';
        
        // Update value
        element.textContent = value.toString().padStart(2, '0');
        
        // Reset animation
        setTimeout(() => {
            element.style.transform = 'scale(1)';
            element.style.color = '#d63384';
        }, 200);
    }
}

// ===== SPOTIFY FUNCTIONALITY =====
function initializeSpotifyButton() {
    const spotifyBtn = document.getElementById('spotifyBtn');
    const spotifyCover = document.querySelector('.spotify-cover');
    
    // Replace with your actual Spotify playlist URL
    const playlistUrl = 'https://open.spotify.com/playlist/4dWB64xyktLTP3s2O6RR1K?si=VlSvZp7LT0KvlNVc31TyXA&pi=HJIeWCt-TvKI5';
    
    function openSpotifyPlaylist() {
        // Add click animation
        spotifyBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            spotifyBtn.style.transform = 'scale(1)';
        }, 150);
        
        // Open Spotify playlist
        window.open(playlistUrl, '_blank');
        
        // Show success message
        showNotification('Abrindo playlist no Spotify... 🎵');
    }
    
    spotifyBtn.addEventListener('click', openSpotifyPlaylist);
    spotifyCover.addEventListener('click', openSpotifyPlaylist);
}

// ===== SCROLL ANIMATIONS =====
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe sections for scroll animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
}

// ===== UTILITY FUNCTIONS =====
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #d63384, #ff69b4);
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(214, 51, 132, 0.3);
        z-index: 1000;
        font-weight: 500;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// ===== EASTER EGGS & SPECIAL EFFECTS =====
function addHeartEffect(x, y) {
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        font-size: 20px;
        pointer-events: none;
        z-index: 1000;
        animation: floatHeart 2s ease-out forwards;
    `;
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        document.body.removeChild(heart);
    }, 2000);
}

// Add CSS for heart animation
const heartStyle = document.createElement('style');
heartStyle.textContent = `
    @keyframes floatHeart {
        0% {
            transform: translateY(0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) scale(0.5);
            opacity: 0;
        }
    }
    
    .animate-in {
        animation: slideInUp 0.8s ease-out;
    }
    
    @keyframes slideInUp {
        from {
            transform: translateY(50px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(heartStyle);

// Add heart effects on double click
document.addEventListener('dblclick', (e) => {
    addHeartEffect(e.clientX, e.clientY);
});

// ===== PERFORMANCE OPTIMIZATIONS =====
// Debounce function for scroll events
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

// Lazy loading for images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// Initialize lazy loading when DOM is ready
document.addEventListener('DOMContentLoaded', initializeLazyLoading);

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('Erro no site:', e.error);
    // Optionally show user-friendly error message
});

// ===== CONSOLE MESSAGE =====
console.log(`
❤️ Site criado com amor para o Dia dos Namorados ❤️
Desenvolvido com HTML, CSS e JavaScript
Data de início do relacionamento: ${relationshipStart.toLocaleDateString('pt-BR')}
`);

// ===== EXPORT FOR TESTING =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        updateTimeCounter,
        updateCarousel,
        showNotification
    };
}

