// Create floating hearts background
function createHearts() {
    const heartsContainer = document.querySelector('.hearts-background');
    const hearts = ['💕', '💖', '💗', '💓', '💝', '💘', '❤️', '🧡', '💛'];
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDelay = Math.random() * 2 + 's';
        heartsContainer.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 6000);
    }, 300);
}

// Initialize hearts
createHearts();

// Get buttons
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const celebration = document.getElementById('celebration');
const content = document.querySelector('.content');

// Track mouse position
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Get No button position
    const noBtnRect = noBtn.getBoundingClientRect();
    const noBtnCenterX = noBtnRect.left + noBtnRect.width / 2;
    const noBtnCenterY = noBtnRect.top + noBtnRect.height / 2;
    
    // Calculate distance from cursor to No button center
    const distance = Math.sqrt(
        Math.pow(mouseX - noBtnCenterX, 2) + 
        Math.pow(mouseY - noBtnCenterY, 2)
    );
    
    // If cursor is within 200px of the No button, move it away (increased detection range)
    if (distance < 200) {
        // Calculate angle from No button to cursor
        const angle = Math.atan2(mouseY - noBtnCenterY, mouseX - noBtnCenterX);
        
        // Move No button away from cursor (opposite direction) - much faster now
        const moveDistance = 200 - distance;
        // Increased multiplier from 0.5 to 1.5 for faster movement
        const moveX = Math.cos(angle + Math.PI) * moveDistance * 1.5;
        const moveY = Math.sin(angle + Math.PI) * moveDistance * 1.5;
        
        // Apply transform to move the button
        noBtn.style.transform = `translate(${moveX}px, ${moveY}px)`;
        
        // Highlight Yes button when cursor is near No
        yesBtn.classList.add('highlighted');
    } else {
        // Gradually reset No button position when cursor is far (but not instantly)
        const currentTransform = noBtn.style.transform;
        if (currentTransform && currentTransform !== 'translate(0, 0)') {
            // Slowly return to center
            noBtn.style.transform = 'translate(0, 0)';
        }
        yesBtn.classList.remove('highlighted');
    }
});

// Yes button click handler
yesBtn.addEventListener('click', () => {
    content.style.display = 'none';
    celebration.style.display = 'block';
    
    // Create confetti effect
    createConfetti();
});

// Try Again button click handler
const tryAgainBtn = document.getElementById('tryAgainBtn');
tryAgainBtn.addEventListener('click', () => {
    celebration.style.display = 'none';
    content.style.display = 'block';
    
    // Reset No button position
    noBtn.style.transform = 'translate(0, 0)';
    yesBtn.classList.remove('highlighted');
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// No button click handler (just in case they somehow click it)
noBtn.addEventListener('click', (e) => {
    // Move button away even more aggressively
    const randomX = (Math.random() - 0.5) * 400;
    const randomY = (Math.random() - 0.5) * 400;
    noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
    
    // Highlight Yes button even more
    yesBtn.classList.add('highlighted');
    
    // Prevent default action
    e.preventDefault();
    return false;
});

// Also make No button move on mouseenter (when mouse enters button area)
noBtn.addEventListener('mouseenter', (e) => {
    const randomX = (Math.random() - 0.5) * 300;
    const randomY = (Math.random() - 0.5) * 300;
    noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
    yesBtn.classList.add('highlighted');
});

// Confetti effect
function createConfetti() {
    const colors = ['#ff6b6b', '#ee5a6f', '#ffd93d', '#6bcf7f', '#4d96ff', '#9b59b6'];
    const confettiCount = 100;
    
    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-10px';
            confetti.style.borderRadius = '50%';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '9999';
            confetti.style.animation = `confettiFall ${2 + Math.random() * 3}s linear forwards`;
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }, i * 20);
    }
}

// Add confetti animation to style
const style = document.createElement('style');
style.textContent = `
    @keyframes confettiFall {
        to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Function to add images/GIFs (for later use)
function addImage(src, alt = '') {
    const imageContainer = document.getElementById('imageContainer');
    const img = document.createElement('img');
    img.src = src;
    img.alt = alt;
    img.style.margin = '10px';
    imageContainer.appendChild(img);
}

// Function to add GIFs (for later use)
function addGif(src, alt = '') {
    const imageContainer = document.getElementById('imageContainer');
    const img = document.createElement('img');
    img.src = src;
    img.alt = alt;
    img.style.margin = '10px';
    imageContainer.appendChild(img);
}

// Make functions available globally for easy use
window.addImage = addImage;
window.addGif = addGif;
