/**
 * ============================================
 * PINOY PASKO - Digital Christmas Card
 * Interactive JavaScript functionality
 * ============================================
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initParticles();
    initRevealInteraction();
    initBackgroundMusic();
});

/**
 * ---------- Floating Light Particles ----------
 * Creates subtle floating light particles inspired by parol lights
 */
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = getParticleCount();
    
    // Create particles with staggered animations
    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer, i);
    }
}

/**
 * Determines particle count based on screen size
 * Fewer particles on mobile for performance
 */
function getParticleCount() {
    const width = window.innerWidth;
    if (width < 480) return 8;
    if (width < 768) return 12;
    return 18;
}

/**
 * Creates a single floating particle element
 * @param {HTMLElement} container - Parent container
 * @param {number} index - Particle index for staggering
 */
function createParticle(container, index) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Randomize particle properties
    const size = Math.random() * 3 + 2; // 2-5px
    const left = Math.random() * 100; // 0-100%
    const delay = Math.random() * 15; // 0-15s delay
    const duration = Math.random() * 10 + 12; // 12-22s duration
    const drift = (Math.random() - 0.5) * 100; // Horizontal drift
    
    // Apply styles
    particle.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${left}%;
        animation-delay: ${delay}s;
        animation-duration: ${duration}s;
        --drift: ${drift}px;
    `;
    
    // Add slight color variation (yellow to gold)
    const hue = Math.random() * 20 + 40; // 40-60 (yellow range)
    const saturation = Math.random() * 30 + 70; // 70-100%
    particle.style.background = `hsl(${hue}, ${saturation}%, 55%)`;
    
    // Enhanced floating animation with horizontal drift
    particle.style.animation = `float-up ${duration}s infinite linear`;
    
    container.appendChild(particle);
}

/**
 * ---------- Message Reveal Interaction ----------
 * Handles the "Buksan ang Mensahe" button click
 */
function initRevealInteraction() {
    const revealBtn = document.getElementById('revealBtn');
    const landing = document.getElementById('landing');
    const messageSection = document.getElementById('messageSection');
    const backBtn = document.getElementById('backBtn');
    
    // Reveal message on button click
    revealBtn.addEventListener('click', () => {
        // Fade out landing
        landing.style.animation = 'fade-out 0.5s ease-out forwards';
        
        // After landing fades out, show message
        setTimeout(() => {
            landing.classList.add('hidden');
            messageSection.classList.add('active');
            
            // Reset text animations for fresh reveal
            resetTextAnimations();
            
            // Scroll to top smoothly
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 500);
    });
    
    // Back button to return to landing
    backBtn.addEventListener('click', () => {
        // Fade out message section
        messageSection.style.animation = 'fade-out 0.4s ease-out forwards';
        
        setTimeout(() => {
            messageSection.classList.remove('active');
            messageSection.style.animation = '';
            landing.classList.remove('hidden');
            landing.style.animation = 'fade-in 0.6s ease-out forwards';
        }, 400);
    });
    
    // Add fade-out keyframes dynamically
    addFadeOutKeyframes();
}

/**
 * Adds the fade-out animation keyframes to the document
 */
function addFadeOutKeyframes() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fade-out {
            from {
                opacity: 1;
                transform: translateY(0);
            }
            to {
                opacity: 0;
                transform: translateY(-20px);
            }
        }
    `;
    document.head.appendChild(style);
}

/**
 * Resets text fade-in animations for fresh reveal
 */
function resetTextAnimations() {
    const textElements = document.querySelectorAll('.fade-in-text');
    textElements.forEach((el, index) => {
        // Reset animation
        el.style.animation = 'none';
        el.offsetHeight; // Trigger reflow
        el.style.animation = `text-fade-in 0.6s ease-out forwards`;
        el.style.animationDelay = `${0.2 + (index * 0.2)}s`;
    });
    
    // Reset signature animation
    const signature = document.querySelector('.signature');
    if (signature) {
        signature.style.animation = 'none';
        signature.offsetHeight;
        signature.style.animation = 'signature-reveal 0.6s ease-out 1.5s forwards';
    }
    
    // Reset back button animation
    const backBtn = document.querySelector('.back-btn');
    if (backBtn) {
        backBtn.style.animation = 'none';
        backBtn.offsetHeight;
        backBtn.style.animation = 'fade-in 0.5s ease-out 2s forwards';
    }
}

/**
 * ---------- Background Music ----------
 * Plays Bibingka by Ben&Ben as subtle background music
 */
function initBackgroundMusic() {
    const music = document.getElementById('bgMusic');
    
    // Set volume to 33% for subtle background feel
    music.volume = 0.33;
    
    // Try to play immediately on page load
    music.play().catch(err => {
        // If autoplay is blocked, play on first user interaction
        console.log('Autoplay blocked, waiting for user interaction');
        
        const playOnInteraction = () => {
            music.play();
            document.removeEventListener('click', playOnInteraction);
            document.removeEventListener('touchstart', playOnInteraction);
        };
        
        document.addEventListener('click', playOnInteraction);
        document.addEventListener('touchstart', playOnInteraction);
    });
}

/**
 * ---------- Utility: Debounce Function ----------
 * Limits how often a function can be called
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in ms
 */
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

/**
 * Handle window resize - adjust particle count
 */
window.addEventListener('resize', debounce(() => {
    const particlesContainer = document.getElementById('particles');
    const currentCount = particlesContainer.children.length;
    const targetCount = getParticleCount();
    
    // Only adjust if significant difference
    if (Math.abs(currentCount - targetCount) > 5) {
        particlesContainer.innerHTML = '';
        for (let i = 0; i < targetCount; i++) {
            createParticle(particlesContainer, i);
        }
    }
}, 500));

/**
 * ---------- Easter Egg: Konami Code ----------
 * A little surprise for those who discover it
 */
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 
                   'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 
                   'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateEasterEgg() {
    // Burst of extra particles
    const container = document.getElementById('particles');
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            left: ${Math.random() * 100}%;
            bottom: 0;
            animation: burst-up 3s ease-out forwards;
            background: hsl(${Math.random() * 60 + 20}, 80%, 60%);
        `;
        container.appendChild(particle);
        
        // Remove after animation
        setTimeout(() => particle.remove(), 3000);
    }
    
    // Add burst animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes burst-up {
            0% {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
            100% {
                opacity: 0;
                transform: translateY(-100vh) scale(0);
            }
        }
    `;
    document.head.appendChild(style);
}

// Log a warm greeting in console for developers
console.log('%c🎄 Maligayang Pasko! 🎄', 
    'color: #e8b923; font-size: 20px; font-weight: bold;');
console.log('%cMay your code compile and your bugs be few.', 
    'color: #d4a373; font-style: italic;');
