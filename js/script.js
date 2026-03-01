// Looping Typing Animation Effect
document.addEventListener('DOMContentLoaded', () => {
    const textToType = "Hi I am Roj";
    const typingElement = document.getElementById('typewriter-text');
    let charIndex = 0;
    let isDeleting = false;

    function typeWriter() {
        // If deleting, decrement index. If typing, increment.
        if (isDeleting) {
            charIndex--;
        } else {
            charIndex++;
        }

        // Update text content
        typingElement.textContent = textToType.substring(0, charIndex);

        // Determine typing/deleting speed
        // Deleting is usually faster than typing
        let typingSpeed = isDeleting ? 50 : Math.floor(Math.random() * (120 - 50 + 1)) + 50;

        // Handle state changes when a word is fully typed or fully deleted
        if (!isDeleting && charIndex === textToType.length) {
            // Pause at the end before deleting
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Pause before typing again
            isDeleting = false;
            typingSpeed = 500;
        }

        setTimeout(typeWriter, typingSpeed);
    }

    // Start typing after the initial page fade-in completes (800ms)
    setTimeout(typeWriter, 800);
});

// Copy to Clipboard Functionality
document.querySelectorAll('.copy-email').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault(); 
        
        const email = this.getAttribute('data-email');
        const textElement = this.querySelector('.btn-text');
        const originalText = textElement.textContent;

        navigator.clipboard.writeText(email).then(() => {
            textElement.textContent = 'Copied to clipboard!';
            this.style.color = 'var(--bg-color)';
            this.style.backgroundColor = 'var(--accent-color)';
            this.style.borderColor = 'var(--accent-color)';

            // Revert back after 2 seconds
            setTimeout(() => {
                textElement.textContent = originalText;
                this.style.color = '';
                this.style.backgroundColor = '';
                this.style.borderColor = '';
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy email: ', err);
        });
    });
});