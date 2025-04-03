const CORRECT_PASSWORD = "05042016";
const totalLayers = 6;
let currentLayer = 1;

// Add your messages here (one for each layer)
const LAYER_MESSAGES = [
    "Your message for layer 1",
    "Your message for layer 2",
    "Your message for layer 3",
    "Your message for layer 4",
    "Your message for layer 5",
    "Your message for layer 6"
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
    panels.forEach(panel => {
        const leftDoor = panel.querySelector('.door-left');
        const rightDoor = panel.querySelector('.door-right');
        
        // Add click handlers to both doors
        [leftDoor, rightDoor].forEach(door => {
            door.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent panel click
                panel.classList.toggle('opened');
            });
        });
    });
}

// Unlock the box and show first layer
function openBox() {
    const passwordForm = document.querySelector('.password-form');
    const panels = document.querySelectorAll('.picture-panel');
    const navButtons = document.querySelectorAll('.nav-btn');
    
    // Hide password form with fade out
    passwordForm.style.opacity = '0';
    
    // Show panels after password form fades
    setTimeout(() => {
        passwordForm.style.display = 'none';
        
        // Make panels visible and start falling animations
        panels.forEach((panel, index) => {
            panel.style.display = 'block';
            // Ensure both doors are visible
            const leftDoor = panel.querySelector('.door-left');
            const rightDoor = panel.querySelector('.door-right');
            if (leftDoor) leftDoor.style.display = 'block';
            if (rightDoor) rightDoor.style.display = 'block';
            
            // Force reflow
            void panel.offsetWidth;
            
            // Add fall class with delay based on position
            setTimeout(() => {
                panel.classList.add('fall');
                panel.style.opacity = '1';
            }, index * 200); // Stagger the animations
        });

        // Show navigation and initialize first layer
        setTimeout(() => {
            navButtons.forEach(btn => btn.classList.add('visible'));
            showLayer(1);
            updateLayerColors(1);
            initializeDoors(); // Initialize door handlers after panels are visible
        }, 1500); // Wait for panels to fall
    }, 300); // Wait for password form fade
}

// Change to a different layer
function changeLayer(direction) {
    const newLayer = currentLayer + direction;
    if (newLayer >= 1 && newLayer <= totalLayers) {
        // Close all panels in current layer
        const panels = document.querySelectorAll('.picture-panel');
        panels.forEach(panel => {
            panel.classList.remove('opened');
        });
        
        // Change layer after brief delay
        setTimeout(() => {
            currentLayer = newLayer;
            showLayer(currentLayer);
            updateLayerColors(currentLayer);
            updateNavigationButtons();
        }, 600); // Wait for doors to close
    }
}

// Show specific layer content
function showLayer(layerNum) {
    const centerArea = document.querySelector(".center-area");
    const panels = document.querySelectorAll(".picture-panel");
    
    // Update center content with the corresponding message
    centerArea.innerHTML = `
        <h2>Note (part ${layerNum}/6)</h2>
        <p>${LAYER_MESSAGES[layerNum - 1]}</p>
        <div class="nav-arrows">
            <span class="nav-arrow prev" onclick="changeLayer(-1)">←</span>
            <span class="nav-arrow next" onclick="changeLayer(1)">→</span>
        </div>
    `;
    
    // Update images
    panels.forEach((panel, index) => {
        const img = panel.querySelector("img");
        const imgNum = (layerNum - 1) * 4 + (index + 1);
        img.src = `pictures/pic${imgNum}.jpg`;
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

// Initialize panels
document.addEventListener("DOMContentLoaded", () => {
    // Focus on password input
    const passwordInput = document.getElementById("password");
    if (passwordInput) {
        passwordInput.focus();
    }
    
    // Hide panels initially but ensure doors are properly set up
    const panels = document.querySelectorAll('.picture-panel');
    panels.forEach(panel => {
        panel.style.display = 'none';
        panel.style.opacity = '0';
        
        // Ensure doors are properly initialized
        const leftDoor = panel.querySelector('.door-left');
        const rightDoor = panel.querySelector('.door-right');
        if (leftDoor) leftDoor.style.display = 'block';
        if (rightDoor) rightDoor.style.display = 'block';
    });
    
    // Initialize navigation
    updateNavigationButtons();
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => btn.classList.remove('visible'));
}); 