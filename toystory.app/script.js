document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
    
    // Story Creator Functionality
    const steps = document.querySelectorAll('.creator-step');
    const indicators = document.querySelectorAll('.indicator');
    const nextButtons = document.querySelectorAll('.btn-next');
    const backButtons = document.querySelectorAll('.btn-back');
    const generateButton = document.querySelector('.btn-generate');
    const newStoryButton = document.querySelector('.btn-new-story');
    const options = document.querySelectorAll('.option');
    const storyPrompt = document.getElementById('storyPrompt');
    
    let currentStep = 0;
    let selections = {
        language: 'English',
        voice: 'OpenAI - Alloy',
        style: 'Default',
        genre: '',
        characters: [],
        items: [],
        settings: []
    };
    
    // Initialize selects
    const languageSelect = document.getElementById('language');
    const voiceSelect = document.getElementById('voice');
    const styleSelect = document.getElementById('style');
    
    if (languageSelect) {
        languageSelect.addEventListener('change', function() {
            selections.language = this.value;
            updatePrompt();
        });
    }
    
    if (voiceSelect) {
        voiceSelect.addEventListener('change', function() {
            selections.voice = this.value;
            updatePrompt();
        });
    }
    
    if (styleSelect) {
        styleSelect.addEventListener('change', function() {
            selections.style = this.value;
            updatePrompt();
        });
    }
    
    // Option selection
    options.forEach(option => {
        option.addEventListener('click', function() {
            const value = this.getAttribute('data-value');
            const step = this.closest('.creator-step').id;
            
            if (step === 'step2') { // Genre selection (max 1)
                options.forEach(opt => {
                    if (opt.closest('.creator-step').id === step) {
                        opt.classList.remove('selected');
                    }
                });
                this.classList.add('selected');
                selections.genre = value;
            } else if (step === 'step3') { // Character selection (max 4)
                if (this.classList.contains('selected')) {
                    this.classList.remove('selected');
                    selections.characters = selections.characters.filter(char => char !== value);
                } else if (selections.characters.length < 4) {
                    this.classList.add('selected');
                    selections.characters.push(value);
                }
            } else if (step === 'step4') { // Item selection (max 4)
                if (this.classList.contains('selected')) {
                    this.classList.remove('selected');
                    selections.items = selections.items.filter(item => item !== value);
                } else if (selections.items.length < 4) {
                    this.classList.add('selected');
                    selections.items.push(value);
                }
            } else if (step === 'step5') { // Setting selection (max 2)
                if (this.classList.contains('selected')) {
                    this.classList.remove('selected');
                    selections.settings = selections.settings.filter(setting => setting !== value);
                } else if (selections.settings.length < 2) {
                    this.classList.add('selected');
                    selections.settings.push(value);
                }
            }
            
            updatePrompt();
        });
    });
    
    // Navigation buttons
    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (currentStep < steps.length - 1) {
                steps[currentStep].classList.remove('active');
                steps[currentStep + 1].classList.add('active');
                
                if (indicators[currentStep]) {
                    indicators[currentStep].classList.remove('active');
                }
                
                if (indicators[currentStep + 1]) {
                    indicators[currentStep + 1].classList.add('active');
                }
                
                currentStep++;
            }
        });
    });
    
    backButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (currentStep > 0) {
                steps[currentStep].classList.remove('active');
                steps[currentStep - 1].classList.add('active');
                
                if (indicators[currentStep]) {
                    indicators[currentStep].classList.remove('active');
                }
                
                if (indicators[currentStep - 1]) {
                    indicators[currentStep - 1].classList.add('active');
                }
                
                currentStep--;
            }
        });
    });
    
    // Generate story
    if (generateButton) {
        generateButton.addEventListener('click', function() {
            steps[currentStep].classList.remove('active');
            document.getElementById('result').classList.add('active');
            
            // Simulate story generation
            setTimeout(() => {
                document.querySelector('.story-loading').style.display = 'none';
                document.querySelector('.story-content').style.display = 'block';
                
                // Set story content based on selections
                const storyTitle = generateStoryTitle();
                document.getElementById('storyTitle').textContent = storyTitle;
                
                const storyText = generateStoryPreview();
                document.getElementById('storyText').textContent = storyText;
            }, 3000);
        });
    }
    
    // New story button
    if (newStoryButton) {
        newStoryButton.addEventListener('click', function() {
            // Reset everything
            document.getElementById('result').classList.remove('active');
            steps[0].classList.add('active');
            
            indicators.forEach((indicator, index) => {
                if (index === 0) {
                    indicator.classList.add('active');
                } else {
                    indicator.classList.remove('active');
                }
            });
            
            options.forEach(option => {
                option.classList.remove('selected');
            });
            
            selections = {
                language: 'English',
                voice: 'OpenAI - Alloy',
                style: 'Default',
                genre: '',
                characters: [],
                items: [],
                settings: []
            };
            
            currentStep = 0;
            updatePrompt();
            
            document.querySelector('.story-loading').style.display = 'block';
            document.querySelector('.story-content').style.display = 'none';
        });
    }
    
    // Update story prompt
    function updatePrompt() {
        if (!storyPrompt) return;
        
        let promptText = '';
        
        if (selections.genre) {
            promptText += `please make an ${selections.genre} kind of story\n\n`;
        }
        
        if (selections.characters.length > 0) {
            promptText += `with the characters of a ${selections.characters.join(', ')}\n\n`;
        }
        
        if (selections.items.length > 0) {
            promptText += `include in the storyline somewhere with the items of an ${selections.items.join(', ')}\n\n`;
        }
        
        if (selections.settings.length > 0) {
            promptText += `in the setting of a ${selections.settings.join(', ')}`;
        }
        
        storyPrompt.textContent = promptText || 'Please select options to generate your story prompt.';
    }
    
    // Generate a story title based on selections
    function generateStoryTitle() {
        const titles = [
            "The Magical Adventure",
            "Friends Forever",
            "The Hidden Treasure",
            "Journey to the Unknown",
            "The Secret World"
        ];
        
        if (selections.genre && selections.characters.length > 0) {
            if (selections.genre === 'bffs') {
                return `BFF Adventures: The ${selections.characters[0]} and Friends`;
            } else if (selections.genre === 'adventure') {
                return `The Great Adventure of ${selections.characters[0]}`;
            } else if (selections.genre === 'bedtime') {
                return `Goodnight ${selections.characters[0]}`;
            }
        }
        
        return titles[Math.floor(Math.random() * titles.length)];
    }
    
    // Generate a story preview based on selections
    function generateStoryPreview() {
        let story = "Once upon a time, ";
        
        if (selections.characters.length > 0) {
            if (selections.characters.length === 1) {
                story += `there was a ${selections.characters[0]} `;
            } else {
                const lastChar = selections.characters.pop();
                story += `there were ${selections.characters.join(', ')} and ${lastChar} `;
                selections.characters.push(lastChar); // Restore the array
            }
        } else {
            story += "there were four friends ";
        }
        
        if (selections.settings.length > 0) {
            story += `who lived in ${selections.settings[0]}. `;
        } else {
            story += "who lived in a magical land. ";
        }
        
        story += "One day, they discovered ";
        
        if (selections.items.length > 0) {
            story += `a mysterious ${selections.items[0]}. `;
        } else {
            story += "a mysterious treasure map. ";
        }
        
        story += "This was the beginning of an adventure they would never forget...";
        
        return story;
    }
    
    // Audio player functionality
    const playButton = document.querySelector('.btn-play');
    const pauseButton = document.querySelector('.btn-pause');
    const progressBar = document.querySelector('.progress-bar');
    
    if (playButton && pauseButton) {
        playButton.addEventListener('click', function() {
            playButton.style.display = 'none';
            pauseButton.style.display = 'flex';
            
            // Simulate audio progress
            let progress = 0;
            const interval = setInterval(() => {
                progress += 1;
                if (progressBar) {
                    progressBar.style.width = `${progress}%`;
                }
                
                if (progress >= 100) {
                    clearInterval(interval);
                    pauseButton.style.display = 'none';
                    playButton.style.display = 'flex';
                    if (progressBar) {
                        progressBar.style.width = '0%';
                    }
                }
            }, 100);
        });
        
        pauseButton.addEventListener('click', function() {
            pauseButton.style.display = 'none';
            playButton.style.display = 'flex';
        });
    }
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animated text effect for hero heading
    const animatedText = document.querySelector('.animated-text');
    if (animatedText) {
        animatedText.style.backgroundSize = '200% auto';
    }
});
