"use strict";

/**
 * ============================================
 * PINOY PASKO - Digital Christmas Card
 * Interactive JavaScript functionality
 * ============================================
 */
// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
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
  var particlesContainer = document.getElementById('particles');
  var particleCount = getParticleCount(); // Create particles with staggered animations

  for (var i = 0; i < particleCount; i++) {
    createParticle(particlesContainer, i);
  }
}
/**
 * Determines particle count based on screen size
 * Fewer particles on mobile for performance
 */


function getParticleCount() {
  var width = window.innerWidth;
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
  var particle = document.createElement('div');
  particle.className = 'particle'; // Randomize particle properties

  var size = Math.random() * 3 + 2; // 2-5px

  var left = Math.random() * 100; // 0-100%

  var delay = Math.random() * 15; // 0-15s delay

  var duration = Math.random() * 10 + 12; // 12-22s duration

  var drift = (Math.random() - 0.5) * 100; // Horizontal drift
  // Apply styles

  particle.style.cssText = "\n        width: ".concat(size, "px;\n        height: ").concat(size, "px;\n        left: ").concat(left, "%;\n        animation-delay: ").concat(delay, "s;\n        animation-duration: ").concat(duration, "s;\n        --drift: ").concat(drift, "px;\n    "); // Add slight color variation (yellow to gold)

  var hue = Math.random() * 20 + 40; // 40-60 (yellow range)

  var saturation = Math.random() * 30 + 70; // 70-100%

  particle.style.background = "hsl(".concat(hue, ", ").concat(saturation, "%, 55%)"); // Enhanced floating animation with horizontal drift

  particle.style.animation = "float-up ".concat(duration, "s infinite linear");
  container.appendChild(particle);
}
/**
 * ---------- Message Reveal Interaction ----------
 * Handles the "Buksan ang Mensahe" button click
 */


function initRevealInteraction() {
  var revealBtn = document.getElementById('revealBtn');
  var landing = document.getElementById('landing');
  var messageSection = document.getElementById('messageSection');
  var backBtn = document.getElementById('backBtn'); // Reveal message on button click

  revealBtn.addEventListener('click', function () {
    // Fade out landing
    landing.style.animation = 'fade-out 0.5s ease-out forwards'; // After landing fades out, show message

    setTimeout(function () {
      landing.classList.add('hidden');
      messageSection.classList.add('active'); // Reset text animations for fresh reveal

      resetTextAnimations(); // Scroll to top smoothly

      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 500);
  }); // Back button to return to landing

  backBtn.addEventListener('click', function () {
    // Fade out message section
    messageSection.style.animation = 'fade-out 0.4s ease-out forwards';
    setTimeout(function () {
      messageSection.classList.remove('active');
      messageSection.style.animation = '';
      landing.classList.remove('hidden');
      landing.style.animation = 'fade-in 0.6s ease-out forwards';
    }, 400);
  }); // Add fade-out keyframes dynamically

  addFadeOutKeyframes();
}
/**
 * Adds the fade-out animation keyframes to the document
 */


function addFadeOutKeyframes() {
  var style = document.createElement('style');
  style.textContent = "\n        @keyframes fade-out {\n            from {\n                opacity: 1;\n                transform: translateY(0);\n            }\n            to {\n                opacity: 0;\n                transform: translateY(-20px);\n            }\n        }\n    ";
  document.head.appendChild(style);
}
/**
 * Resets text fade-in animations for fresh reveal
 */


function resetTextAnimations() {
  var textElements = document.querySelectorAll('.fade-in-text');
  textElements.forEach(function (el, index) {
    // Reset animation
    el.style.animation = 'none';
    el.offsetHeight; // Trigger reflow

    el.style.animation = "text-fade-in 0.6s ease-out forwards";
    el.style.animationDelay = "".concat(0.2 + index * 0.2, "s");
  }); // Reset signature animation

  var signature = document.querySelector('.signature');

  if (signature) {
    signature.style.animation = 'none';
    signature.offsetHeight;
    signature.style.animation = 'signature-reveal 0.6s ease-out 1.5s forwards';
  } // Reset back button animation


  var backBtn = document.querySelector('.back-btn');

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
  var music = document.getElementById('bgMusic'); // Set volume to 33% for subtle background feel

  music.volume = 0.33; // Try to play immediately on page load

  music.play()["catch"](function (err) {
    // If autoplay is blocked, play on first user interaction
    console.log('Autoplay blocked, waiting for user interaction');

    var playOnInteraction = function playOnInteraction() {
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
  var timeout;
  return function executedFunction() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var later = function later() {
      clearTimeout(timeout);
      func.apply(void 0, args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
/**
 * Handle window resize - adjust particle count
 */


window.addEventListener('resize', debounce(function () {
  var particlesContainer = document.getElementById('particles');
  var currentCount = particlesContainer.children.length;
  var targetCount = getParticleCount(); // Only adjust if significant difference

  if (Math.abs(currentCount - targetCount) > 5) {
    particlesContainer.innerHTML = '';

    for (var i = 0; i < targetCount; i++) {
      createParticle(particlesContainer, i);
    }
  }
}, 500));
/**
 * ---------- Easter Egg: Konami Code ----------
 * A little surprise for those who discover it
 */

var konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
var konamiIndex = 0;
document.addEventListener('keydown', function (e) {
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
  var container = document.getElementById('particles');

  var _loop = function _loop(i) {
    var particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = "\n            left: ".concat(Math.random() * 100, "%;\n            bottom: 0;\n            animation: burst-up 3s ease-out forwards;\n            background: hsl(").concat(Math.random() * 60 + 20, ", 80%, 60%);\n        ");
    container.appendChild(particle); // Remove after animation

    setTimeout(function () {
      return particle.remove();
    }, 3000);
  };

  for (var i = 0; i < 30; i++) {
    _loop(i);
  } // Add burst animation


  var style = document.createElement('style');
  style.textContent = "\n        @keyframes burst-up {\n            0% {\n                opacity: 1;\n                transform: translateY(0) scale(1);\n            }\n            100% {\n                opacity: 0;\n                transform: translateY(-100vh) scale(0);\n            }\n        }\n    ";
  document.head.appendChild(style);
} // Log a warm greeting in console for developers


console.log('%c🎄 Maligayang Pasko! 🎄', 'color: #e8b923; font-size: 20px; font-weight: bold;');
console.log('%cMay your code compile and your bugs be few.', 'color: #d4a373; font-style: italic;');
//# sourceMappingURL=script.dev.js.map
