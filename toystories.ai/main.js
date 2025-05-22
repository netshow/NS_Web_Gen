document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start' // Aligns to top, can be 'center'
                });
            }
        });
    });

    // --- Basic Story Generator Placeholder Logic ---
    const generateButton = document.getElementById('generate-button');
    const storyPrompt = document.getElementById('story-prompt');
    const storyOutput = document.getElementById('story-output');
    const outputPlaceholderInitialText = "Your magical story will appear here soon!"; // Store initial text

    if (generateButton && storyPrompt && storyOutput) {
        const placeholderP = storyOutput.querySelector('.placeholder-text');

        generateButton.addEventListener('click', () => {
            const prompt = storyPrompt.value.trim();

            if (!prompt) {
                alert("Please enter an idea for your story!");
                storyPrompt.focus();
                return;
            }

            storyOutput.innerHTML = `<p class="placeholder-text">✨ Our AI is writing your magical story...</p>`; // Clear and set loading
            storyOutput.classList.add('loading');
            generateButton.disabled = true;
            generateButton.innerHTML = "Generating... <span class='spinner'></span>"; // Add a spinner or loading text

            setTimeout(() => {
                const generatedStory = `
                    <p>Once upon a time, in a land filled with bouncy jellybean hills and rivers of lemonade, there was ${getArticle(prompt)} ${prompt.toLowerCase()}.</p>
                    <p>This curious character loved to explore. One day, while chasing a giggling sunbeam, they stumbled upon a hidden door shaped like a giant cookie!</p>
                    <p>With a heart full of excitement and a tummy rumbling for adventure (and cookies!), they pushed open the door. What wonders awaited them on the other side?</p>
                    <p>Maybe they found a castle made of clouds, or a forest where animals told jokes! The rest of the story is up to your amazing imagination!</p>
                `;

                storyOutput.innerHTML = generatedStory;
                storyOutput.classList.remove('loading');
                generateButton.disabled = false;
                generateButton.textContent = "Generate My Story! ✨";

            }, 2500);
        });
    }

    function getArticle(text) {
        const firstWord = text.split(' ')[0].toLowerCase();
        const vowels = 'aeiou';
        return vowels.includes(firstWord[0]) ? 'an' : 'a';
    }

    // --- Scroll Animation Logic ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target); // Optional: stop observing once animated
                }
            });
        }, {
            threshold: 0.1 // Trigger when 10% of the element is visible
        });

        animatedElements.forEach(el => {
            observer.observe(el);
        });
    }

});