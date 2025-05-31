// Digital Clock Functionality
function updateClock() {
    const now = new Date();

    // Format time
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    // Format date
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    const dateString = now.toLocaleDateString('en-US', options);

    // Update display
    document.getElementById('digitalClock').textContent = `${hours}:${minutes}:${seconds}`;
    document.getElementById('dateDisplay').textContent = dateString;
}

// Theme Switching Functionality
function switchTheme(themeName) {
    const body = document.body;
    const buttons = document.querySelectorAll('.theme-btn');

    // Remove all theme classes
    body.className = '';

    // Add new theme class
    body.classList.add(`theme-${themeName}`);

    // Update active button
    buttons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.theme === themeName) {
            btn.classList.add('active');
        }
    });

    // Handle matrix rain effect
    const matrixRain = document.getElementById('matrixRain');
    if (themeName === 'matrix') {
        createMatrixRain();
        matrixRain.style.display = 'block';
    } else {
        matrixRain.style.display = 'none';
        matrixRain.innerHTML = '';
    }
}

// Matrix Rain Effect
function createMatrixRain() {
    const matrixRain = document.getElementById('matrixRain');
    matrixRain.innerHTML = '';

    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const columns = Math.floor(window.innerWidth / 14);

    for (let i = 0; i < columns; i++) {
        createMatrixColumn(i, chars);
    }
}

function createMatrixColumn(columnIndex, chars) {
    const matrixRain = document.getElementById('matrixRain');

    function dropChar() {
        const char = document.createElement('div');
        char.className = 'matrix-char';
        char.textContent = chars[Math.floor(Math.random() * chars.length)];
        char.style.left = columnIndex * 14 + 'px';
        char.style.animationDuration = (Math.random() * 3 + 2) + 's';
        char.style.animationDelay = Math.random() * 2 + 's';

        matrixRain.appendChild(char);

        // Remove char after animation
        setTimeout(() => {
            if (char.parentNode) {
                char.parentNode.removeChild(char);
            }
        }, 5000);
    }

    // Create chars at intervals
    setInterval(dropChar, Math.random() * 1000 + 500);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function () {
    // Initialize clock
    updateClock();
    setInterval(updateClock, 1000);

    // Theme button event listeners
    document.querySelectorAll('.theme-btn').forEach(button => {
        button.addEventListener('click', function () {
            switchTheme(this.dataset.theme);
        });
    });

    // Initialize with neon theme
    switchTheme('neon');
});

// Handle window resize for matrix effect
window.addEventListener('resize', function () {
    if (document.body.classList.contains('theme-matrix')) {
        createMatrixRain();
    }
});

// Add some interactive effects
document.addEventListener('mousemove', function (e) {
    const clock = document.querySelector('.digital-clock');
    const rect = clock.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Subtle parallax effect
    clock.style.transform = `translate(${x * 0.01}px, ${y * 0.01}px)`;
});