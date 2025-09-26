// Global variables
let currentlyPlayingAudio = null;

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeBurgerMenu();
    initializeVideoControls();
    initializeBioExpansion();
    initializeReleaseToggles();
    initializeAudioControls();
    initializeCommentForm();
    initializeSmoothScrolling();
});

// Burger Menu Functionality
function initializeBurgerMenu() {
    const burgerMenu = document.getElementById('burgerMenu');
    const navMenu = document.getElementById('navMenu');
    
    burgerMenu.addEventListener('click', function() {
        burgerMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            burgerMenu.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!burgerMenu.contains(event.target) && !navMenu.contains(event.target)) {
            burgerMenu.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// Video Controls
function initializeVideoControls() {
    const video = document.getElementById('introVideo');
    const muteToggle = document.getElementById('muteToggle');
    
    if (video && muteToggle) {
        muteToggle.addEventListener('click', function() {
            if (video.muted) {
                video.muted = false;
                muteToggle.textContent = '🔊';
            } else {
                video.muted = true;
                muteToggle.textContent = '🔇';
            }
        });
    }
}

// Biography Expansion
function initializeBioExpansion() {
    const expandButtons = document.querySelectorAll('.expand-bio');
    
    expandButtons.forEach(button => {
        button.addEventListener('click', function() {
            const artistFrame = this.closest('.artist-frame');
            const bioPreview = artistFrame.querySelector('.bio-preview');
            const bioFull = artistFrame.querySelector('.bio-full');
            
            if (bioFull.style.display === 'none' || bioFull.style.display === '') {
                bioPreview.style.display = 'none';
                bioFull.style.display = 'block';
                this.textContent = 'Text einklappen';
            } else {
                bioPreview.style.display = 'block';
                bioFull.style.display = 'none';
                this.textContent = 'Text erweitern';
            }
        });
    });
}

// Release Toggle Functionality
function initializeReleaseToggles() {
    const releaseItems = document.querySelectorAll('.release-item');
    
    releaseItems.forEach(item => {
        item.addEventListener('click', function() {
            const releaseId = this.getAttribute('data-release');
            const player = document.getElementById(`player-${releaseId}`);
            const artistFrame = this.closest('.artist-frame');
            const allPlayers = artistFrame.querySelectorAll('.release-player');
            
            // Close all other players in this artist frame
            allPlayers.forEach(p => {
                if (p.id !== `player-${releaseId}`) {
                    p.style.display = 'none';
                }
            });
            
            // Toggle current player
            if (player.style.display === 'none' || player.style.display === '') {
                player.style.display = 'block';
                // Scroll to player
                player.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } else {
                player.style.display = 'none';
            }
        });
    });
}

// Audio Controls - Stop other audio when new one starts
function initializeAudioControls() {
    const audioElements = document.querySelectorAll('audio');
    
    audioElements.forEach(audio => {
        audio.addEventListener('play', function() {
            // Stop currently playing audio
            if (currentlyPlayingAudio && currentlyPlayingAudio !== this) {
                currentlyPlayingAudio.pause();
                currentlyPlayingAudio.currentTime = 0;
            }
            
            // Stop video audio if playing
            const video = document.getElementById('introVideo');
            if (video && !video.muted) {
                video.muted = true;
                document.getElementById('muteToggle').textContent = '🔇';
            }
            
            currentlyPlayingAudio = this;
        });
        
        audio.addEventListener('ended', function() {
            currentlyPlayingAudio = null;
        });
        
        audio.addEventListener('pause', function() {
            if (currentlyPlayingAudio === this) {
                currentlyPlayingAudio = null;
            }
        });
    });
}

// Comment Form
function initializeCommentForm() {
    const commentForm = document.getElementById('commentForm');
    
    if (commentForm) {
        commentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Here you would typically send the data to your email service
            // For now, we'll show an alert
            alert('Vielen Dank für Ihre Nachricht! Wir werden uns bald bei Ihnen melden.');
            
            // Reset form
            this.reset();
        });
    }
}

// Smooth Scrolling for Navigation
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Utility function to stop all audio
function stopAllAudio() {
    const audioElements = document.querySelectorAll('audio');
    audioElements.forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
    });
    currentlyPlayingAudio = null;
}

// Handle window resize for responsive behavior
window.addEventListener('resize', function() {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768) {
        const burgerMenu = document.getElementById('burgerMenu');
        const navMenu = document.getElementById('navMenu');
        
        if (burgerMenu && navMenu) {
            burgerMenu.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});