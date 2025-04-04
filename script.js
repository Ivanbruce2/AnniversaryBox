const CORRECT_PASSWORD = "05042015";
const totalLayers = 6;
let currentLayer = 1;

// Track door states for each layer
const doorStates = {
    layer1: { top: false, right: false, bottom: false, left: false },
    layer2: { top: false, right: false, bottom: false, left: false },
    layer3: { top: false, right: false, bottom: false, left: false },
    layer4: { top: false, right: false, bottom: false, left: false },
    layer5: { top: false, right: false, bottom: false, left: false },
    layer6: { top: false, right: false, bottom: false, left: false }
};

// Add your messages here (one for each layer)
const LAYER_MESSAGES = [
    "<b>To my beloved wife,</b><br>Happy dating anniversary! It has been 10 years since we started dating, and I'm still in awe that we are an item. From being strangers, partners in ministry, dating, almost breaking up, and eventually getting married—what a journey it has been. As I've always said, I'm so glad that it's you I'm married to!",
    "Although we are different in some ways, we always find a way to complement each other's weaknesses. I remember back when we were dating and things felt awkward—I worried about how life would turn out for us. ",
    "But thank God we've learned to communicate better, and now we truly enjoy being in each other's presence, giving funny nicknames, and behaving like kids. Life with you is fun and entertaining, and I look forward to more of these moments when you're back.",
    "As we celebrate this day, I can't help but recall the time 12 years ago when I had to lay you down on this date. But trusting in the goodness of God, He has proven Himself to be a good Father by bringing us back together. ",
    "It is significant that your stint in BCW coincides with this date—it serves as a reminder for us to always trust God, even when we are separated from one another. We can be whole in Him and not dependent on each other to feel complete.",
    "I'm so proud of you for taking this step of faith to go to BCW. As we count down to the day we reunite, I pray that you will find your breakthrough and calling in Him as you seek Him there. Love you, and let's focus on family building once you're back! Once again, happy anniversary! I love you! <br><br><b>Small Bo, 05/04/2025</b>"
];

// Handle password input
function handleKeyPress(event) {
    if (event.key === "Enter") {
        const password = document.getElementById("password").value;
        if (password === CORRECT_PASSWORD) {
            openBox();
        } else {
            alert('Incorrect password. Please try again.');
        }
    }
}

// Initialize door click handlers
function initializeDoors() {
    const panels = document.querySelectorAll('.picture-panel');
    panels.forEach((panel, index) => {
        const leftDoor = panel.querySelector('.door-left');
        const rightDoor = panel.querySelector('.door-right');
        
        // Add click handlers to both doors
        [leftDoor, rightDoor].forEach(door => {
            door.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent panel click
                
                // Toggle door state for current layer and position
                const position = getPanelPosition(panel);
                const layerKey = `layer${currentLayer}`;
                doorStates[layerKey][position] = !doorStates[layerKey][position];
                
                // Toggle opened class based on current state
                if (doorStates[layerKey][position]) {
                    panel.classList.add('opened');
                } else {
                    panel.classList.remove('opened');
                }
            });
        });
    });
}

// Helper function to get panel position
function getPanelPosition(panel) {
    if (panel.classList.contains('panel-top')) return 'top';
    if (panel.classList.contains('panel-right')) return 'right';
    if (panel.classList.contains('panel-bottom')) return 'bottom';
    if (panel.classList.contains('panel-left')) return 'left';
    return '';
}

// Update door states when changing layers
function updateDoorStates() {
    const panels = document.querySelectorAll('.picture-panel');
    const layerKey = `layer${currentLayer}`;
    
    panels.forEach((panel) => {
        const position = getPanelPosition(panel);
        if (doorStates[layerKey][position]) {
            panel.classList.add('opened');
        } else {
            panel.classList.remove('opened');
        }
    });
}

// Add confetti creation function
function createConfetti() {
    const colors = ['red', 'blue', 'green', 'yellow', 'purple'];
    const confettiCount = 50;
    const container = document.querySelector('.container');

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = `confetti ${colors[Math.floor(Math.random() * colors.length)]}`;
        
        // Random position and delay
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.animationDelay = Math.random() * 3 + 's';
        
        // Random shape
        if (Math.random() > 0.5) {
            confetti.style.borderRadius = '50%';
        } else {
            confetti.style.width = '8px';
            confetti.style.height = '8px';
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        }
        
        container.appendChild(confetti);
        
        // Remove confetti after animation
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

// Unlock the box and show first layer
function openBox() {
    const passwordForm = document.querySelector('.password-form');
    const panels = document.querySelectorAll('.picture-panel');
    const navButtons = document.querySelectorAll('.nav-btn');
    const centerArea = document.querySelector('.center-area');
    
    // Add fade-out class to password form
    passwordForm.classList.add('fade-out');
    
    // Show panels after password form fades
    setTimeout(() => {
        passwordForm.style.display = 'none';
        
        // Create confetti for successful login
        createConfetti();
        
        // Make panels visible and start animations
        panels.forEach((panel, index) => {
            panel.style.display = 'block';
            
            // Stagger the panel animations
            setTimeout(() => {
                panel.classList.add('animate-in');
            }, index * 200);
        });

        // Animate in the center area with shake
        centerArea.style.display = 'block';
        centerArea.classList.add('fade-in');
        setTimeout(() => centerArea.classList.add('shake'), 500);

        // Show navigation with delay
        setTimeout(() => {
            navButtons.forEach(btn => {
                btn.classList.add('visible');
                btn.style.animation = 'fadeInScale 0.5s ease forwards';
            });
            showLayer(1);
            updateLayerColors(1);
            initializeDoors();
            
            // Remove shake animation
            setTimeout(() => centerArea.classList.remove('shake'), 1000);
        }, 800);
    }, 500);
}

// Change to a different layer with animation
function changeLayer(direction) {
    const newLayer = currentLayer + direction;
    if (newLayer >= 1 && newLayer <= totalLayers) {
        // Get elements
        const panels = document.querySelectorAll('.picture-panel');
        const centerArea = document.querySelector('.center-area');
        
        // Add transition classes
        panels.forEach(panel => {
            panel.classList.add('layer-transition', 'fade-out');
            // Close all doors during transition
            panel.classList.remove('opened');
        });
        centerArea.classList.add('fade-out');
        
        // Change layer after animation
        setTimeout(() => {
            currentLayer = newLayer;
            
            // Update content
            showLayer(currentLayer);
            updateLayerColors(currentLayer);
            updateNavigationButtons();
            
            // Remove transition classes and add animations
            panels.forEach(panel => {
                panel.classList.remove('layer-transition', 'fade-out');
                panel.classList.add('fade-in');
            });
            centerArea.classList.remove('fade-out');
            centerArea.classList.add('fade-in');
            
            // Update door states for new layer
            updateDoorStates();
            
            // Create confetti effect
            createConfetti();
            
            // Add shake animation
            centerArea.classList.add('shake');
            
            // Remove animation classes after they complete
            setTimeout(() => {
                panels.forEach(panel => panel.classList.remove('fade-in'));
                centerArea.classList.remove('fade-in', 'shake');
            }, 1000);
        }, 500);
    }
}

// Show specific layer content with animations
function showLayer(layerNum) {
    const centerArea = document.querySelector(".center-area");
    const panels = document.querySelectorAll(".picture-panel");
    
    // Update center content with animation
    centerArea.style.opacity = '0';
    centerArea.innerHTML = `
        <p>${LAYER_MESSAGES[layerNum - 1]}</p>
        <div class="nav-arrows">
            ${layerNum > 1 ? `<span class="nav-arrow prev" onclick="changeLayer(-1)">‹</span>` : ''}
            ${layerNum < totalLayers ? `<span class="nav-arrow next" onclick="changeLayer(1)">›</span>` : ''}
        </div>
    `;
    
    // Fade in center content
    setTimeout(() => {
        centerArea.style.opacity = '1';
    }, 50);
    
    // Update images with fade effect
    panels.forEach((panel, index) => {
        const img = panel.querySelector("img");
        const imgNum = (layerNum - 1) * 4 + (index + 1);
        
        // Fade out
        img.style.opacity = '0';
        setTimeout(() => {
            img.src = `pictures/pic${imgNum}.jpg`;
            // Fade in
            img.style.opacity = '1';
        }, 300);
    });
}

// Update navigation button states
function updateNavigationButtons() {
    const prevBtn = document.querySelector(".nav-btn.prev");
    const nextBtn = document.querySelector(".nav-btn.next");
    
    prevBtn.disabled = currentLayer === 1;
    nextBtn.disabled = currentLayer === totalLayers;
}

// Update layer colors
function updateLayerColors(layer) {
    const panels = document.querySelectorAll('.picture-panel');
    panels.forEach(panel => {
        // Remove all layer-specific classes
        panel.classList.remove('layer-1', 'layer-2', 'layer-3', 'layer-4', 'layer-5', 'layer-6');
        // Add current layer class
        panel.classList.add(`layer-${layer}`);
    });
    
    // Update center area color
    const centerArea = document.querySelector('.center-area');
    centerArea.classList.remove('layer-1', 'layer-2', 'layer-3', 'layer-4', 'layer-5', 'layer-6');
    centerArea.classList.add(`layer-${layer}`);
}

// Initialize panels on DOM load
document.addEventListener("DOMContentLoaded", () => {
    // Focus on password input
    const passwordInput = document.getElementById("password");
    if (passwordInput) {
        passwordInput.focus();
    }
    
    // Hide panels initially
    const panels = document.querySelectorAll('.picture-panel');
    panels.forEach(panel => {
        panel.style.display = 'none';
        panel.style.opacity = '0';
        
        // Ensure doors are visible
        const leftDoor = panel.querySelector('.door-left');
        const rightDoor = panel.querySelector('.door-right');
        if (leftDoor) leftDoor.style.display = 'block';
        if (rightDoor) rightDoor.style.display = 'block';
    });
    
    // Hide nav buttons initially
    updateNavigationButtons();
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => btn.classList.remove('visible'));
});
