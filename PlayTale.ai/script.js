document.addEventListener('DOMContentLoaded', () => {
    // --- Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // --- Smooth Scrolling for Nav Links ---
    document.querySelectorAll('#navbar a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = navbar ? navbar.offsetHeight : 0;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Animate Letters in Hero H1 ---
    const heroH1 = document.querySelector('#hero h1.animate-letters');
    if (heroH1) {
        const text = heroH1.textContent;
        heroH1.innerHTML = ''; 
        text.split('').forEach((letter, index) => {
            const span = document.createElement('span');
            span.textContent = letter === ' ' ? '\u00A0' : letter; 
            span.style.animationDelay = `${index * 0.07}s`;
            heroH1.appendChild(span);
        });
    }
    
    // --- Intersection Observer for Scroll Animations ---
    const animatedElements = document.querySelectorAll(
        '.animate-fade-in-up, .animate-pop-in, .animate-slide-in-left, .animate-slide-in-right, .animate-slide-in-bottom, .animate-feature-card'
    );

    if (window.IntersectionObserver) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target); 
                }
            });
        }, {
            threshold: 0.1 
        });
        animatedElements.forEach(el => {
            observer.observe(el);
        });
    } else { // Fallback for older browsers
        animatedElements.forEach(el => el.classList.add('is-visible'));
    }


    // --- AI STORY GENERATOR LOGIC ---
    const storyGeneratorApp = document.getElementById('story-generator-app');
    if (storyGeneratorApp) { 
        const steps = Array.from(storyGeneratorApp.querySelectorAll('.step:not(#story-result-display)')); 
        const allPossibleSteps = Array.from(storyGeneratorApp.querySelectorAll('.step')); 

        const nextButtons = storyGeneratorApp.querySelectorAll('.next-btn');
        const backButtons = storyGeneratorApp.querySelectorAll('.back-btn');
        
        let currentStep = 0; 
        const selections = {
            language: 'english', chapters: '1', voiceProvider: 'openai', imageStyle: 'default', voiceType: 'alloy',
            genre: [], characters: [], ideas: [], settings: []
        };

        // --- DATA FOR SELECTION GRIDS ---
        // !!! IMPORTANT: Populate these with ALL your items and correct image paths !!!
        const genreData = [ 
            { id: 'custom', name: 'Custom Story', img: 'images/custom_story.png' },
            { id: 'adventure', name: 'Adventure', img: 'images/adventure.png' },
            { id: 'day-in-life', name: 'A Day in the Life', img: 'images/day_in_a_life.png' },
            { id: 'new-experience', name: 'A New Experience', img: 'images/experience.png' },
            { id: 'animal-friends', name: 'Animal Friends', img: 'images/animal.png' },
            { id: 'bffs', name: "BFF's", img: 'images/bffs.png', selected: true }, 
            { id: 'bedtime', name: 'Bedtime Story', img: 'images/bedtime.png' },
            // ... Add ALL other genres from your list with correct 'images/icon-...' paths
        ];
        const characterData = [ 
            { id: 'custom1', name: 'Custom Character 1', img: 'images/question_mark.png' },
            { id: 'custom2', name: 'Custom Character 2', img: 'images/question_mark.png' },
            { id: 'custom3', name: 'Custom Character 3', img: 'images/question_mark.png' },
            { id: 'custom4', name: 'Custom Character 4', img: 'images/question_mark.png' },
            { id: 'alien', name: 'Alien', img: 'images/alien.png' },
            { id: 'cowboy', name: 'Cowboy', img: 'images/character-cowboy.png', selected: true },
            { id: 'clown', name: 'Clown', img: 'images/character-clown.png', selected: true },
            { id: 'cowgirl', name: 'Cowgirl', img: 'images/character-cowgirl.png', selected: true },
            { id: 'horse', name: 'Horse', img: 'images/character-horse.png', selected: true },
            // ... Add ALL other characters
        ];
        const ideaData = [ 
            { id: 'custom-idea1', name: 'Custom Idea 1', img: 'images/question_mark.png' },
            { id: 'custom-idea2', name: 'Custom Idea 2', img: 'images/question_mark.png' },
            { id: 'custom-idea3', name: 'Custom Idea 3', img: 'images/question_mark.png' },
            { id: 'custom-idea4', name: 'Custom Idea 4', img: 'images/question_mark.png' },
            { id: 'crystal-ball', name: 'Crystal Ball', img: 'images/item-crystal-ball.png', selected: true },
            { id: 'dragon-egg', name: 'Dragon Egg', img: 'images/item-dragon-egg.png', selected: true },
            { id: 'fortune-cookie', name: 'Fortune Cookie', img: 'images/item-fortune-cookie.png', selected: true },
            { id: 'hamburger', name: 'Hamburger', img: 'images/item-hamburger.png', selected: true },
            // ... Add ALL other ideas
        ];
        const settingData = [ 
            { id: 'custom-setting1', name: 'Custom Setting 1', img: 'images/question_mark.png' },
            { id: 'custom-setting2', name: 'Custom Setting 2', img: 'images/question_mark.png' },
            { id: 'atlantis', name: 'Atlantis', img: 'images/setting-atlantis.png', selected: true },
            { id: 'ghost-town', name: 'Ghost Town', img: 'images/ghost_town.png', selected: true },
            { id: 'hidden-world-plot', name: 'Hidden World (Plot)', img: 'images/hidden_world.png' }, // Example plot point
            // ... Add ALL other settings
        ];

        const storyResultDisplaySection = storyGeneratorApp.querySelector('#story-result-display');
        const generatedStoryTextElement = storyGeneratorApp.querySelector('#generated-story-text');
        const createNewStoryBtn = storyGeneratorApp.querySelector('#create-new-story-btn');

        function populateGrid(gridId, data, selectionKey) {
            const grid = storyGeneratorApp.querySelector(`#${gridId}`);
            if (!grid) return;
            grid.innerHTML = ''; 

            data.forEach(item => {
                const div = document.createElement('div');
                div.classList.add('grid-item');
                div.dataset.id = item.id;
                div.innerHTML = `
                    <img src="${item.img}" alt="${item.name}">
                    <span>${item.name}</span>
                `;
                if (item.selected) {
                    div.classList.add('selected');
                    if (!selections[selectionKey].includes(item.name)) {
                         selections[selectionKey].push(item.name);
                    }
                }
                grid.appendChild(div);
            });
        }

        populateGrid('genre-grid', genreData, 'genre');
        populateGrid('character-grid', characterData, 'characters');
        populateGrid('idea-grid', ideaData, 'ideas');
        populateGrid('setting-grid', settingData, 'settings');

        function showStep(stepElementToShow) {
            allPossibleSteps.forEach(s => s.classList.remove('active', 'slide-out-left', 'slide-out-right', 'slide-in-left', 'slide-in-right'));
            if (stepElementToShow) {
                stepElementToShow.classList.add('active');
            }
        }

        function updateStep(newStepIndex, direction) {
            if (newStepIndex < 0 || newStepIndex >= steps.length) return; 

            const oldStep = steps[currentStep];
            const newStep = steps[newStepIndex];

            allPossibleSteps.forEach(s => s.classList.remove('active','slide-out-left', 'slide-out-right', 'slide-in-left', 'slide-in-right'));

            if (oldStep && newStep) { 
                if (direction === 'next') {
                    oldStep.classList.add('slide-out-left');
                    newStep.classList.remove('slide-in-left', 'slide-out-right'); 
                    newStep.classList.add('slide-in-right');
                } else if (direction === 'back') {
                    oldStep.classList.add('slide-out-right');
                    newStep.classList.remove('slide-in-right', 'slide-out-left'); 
                    newStep.classList.add('slide-in-left');
                }

                setTimeout(() => {
                    oldStep.classList.remove('active', 'slide-out-left', 'slide-out-right');
                    newStep.classList.add('active');
                    newStep.classList.remove('slide-in-left', 'slide-in-right');
                    currentStep = newStepIndex;
                }, 500); 
            } else if (newStep) { 
                 newStep.classList.add('active');
                 currentStep = newStepIndex;
            }
        }

        nextButtons.forEach(button => {
            button.addEventListener('click', () => {
                const nextStepId = button.dataset.next;
                const nextStepIndex = steps.findIndex(step => step.id === nextStepId);

                if (nextStepIndex !== -1) {
                    if (steps[currentStep] && steps[currentStep].id === 'step-1') { 
                        selections.language = storyGeneratorApp.querySelector('#language').value;
                        selections.chapters = storyGeneratorApp.querySelector('#chapters').value;
                        selections.voiceProvider = storyGeneratorApp.querySelector('#voice-provider').value;
                        selections.imageStyle = storyGeneratorApp.querySelector('#image-style').value;
                        selections.voiceType = storyGeneratorApp.querySelector('#voice-type').value;
                    }
                    if (button.id === 'show-prompt-btn') {
                        generatePromptSummary();
                    }
                    updateStep(nextStepIndex, 'next');
                }
            });
        });

        backButtons.forEach(button => {
            button.addEventListener('click', () => {
                const prevStepId = button.dataset.prev;
                const prevStepIndex = steps.findIndex(step => step.id === prevStepId);
                if (prevStepIndex !== -1) {
                    updateStep(prevStepIndex, 'back');
                }
            });
        });

        storyGeneratorApp.querySelectorAll('.selection-grid').forEach(grid => {
            const maxSelection = parseInt(grid.dataset.maxSelection);
            const selectionKey = grid.id.split('-')[0] + 's';

            grid.addEventListener('click', (e) => {
                const item = e.target.closest('.grid-item');
                if (!item) return;
                const itemName = item.querySelector('span').textContent;

                if (item.classList.contains('selected')) {
                    item.classList.remove('selected');
                    selections[selectionKey] = selections[selectionKey].filter(s => s !== itemName);
                } else {
                    if (selections[selectionKey].length < maxSelection) {
                        item.classList.add('selected');
                        selections[selectionKey].push(itemName);
                    } else if (maxSelection === 1 && selections[selectionKey].length === 1) {
                        const currentSelected = grid.querySelector('.grid-item.selected');
                        if (currentSelected) currentSelected.classList.remove('selected');
                        item.classList.add('selected');
                        selections[selectionKey] = [itemName];
                    } else {
                        alert(`You can only select a maximum of ${maxSelection} ${selectionKey.replace('s','')}(s).`);
                    }
                }
            });
        });
        
        function generatePromptSummary() {
            const promptTextarea = storyGeneratorApp.querySelector('#prompt-summary');
            if (!promptTextarea) return;

            let prompt = `Please make a ${selections.genre.join(', ') || 'story'} kind of story.\n\n`;
            prompt += `With the characters of a ${selections.characters.join(', ') || 'few interesting characters'}.\n\n`;
            prompt += `Include in the storyline somewhere with the items of a ${selections.ideas.join(', ') || 'some interesting items'}.\n\n`;
            
            let settingPlot = "";
            const settingsOnly = selections.settings.filter(s => !s.toLowerCase().includes('(plot)'));
            const plotPoints = selections.settings.filter(s => s.toLowerCase().includes('(plot)'));

            if (settingsOnly.length > 0) {
                settingPlot += `In the setting of ${settingsOnly.join(' and ')}.`;
            }
            if (plotPoints.length > 0) {
                settingPlot += (settingsOnly.length > 0 ? " " : "") + `They keep with the plot of ${plotPoints.join(' and ').replace(/\s*\(Plot\)/gi,'')}.`;
            }
            if (!settingPlot) {
                settingPlot = "In an interesting place with an exciting plot.";
            }

            prompt += settingPlot.trim() + '\n\n';
            prompt += `The story should be in ${selections.language}, about ${selections.chapters} chapter(s) long.`;
            prompt += ` Use ${selections.voiceProvider} voice (${selections.voiceType}) and ${selections.imageStyle} image style.`;

            promptTextarea.value = prompt;
        }

        const finalGenerateBtn = storyGeneratorApp.querySelector('.generate-final-btn');
        if (finalGenerateBtn && storyResultDisplaySection && generatedStoryTextElement) {
            finalGenerateBtn.addEventListener('click', () => {
                const storyPromptElement = storyGeneratorApp.querySelector('#prompt-summary');
                if(!storyPromptElement) return;
                const storyPrompt = storyPromptElement.value;

                const generatedStory = `🌈 Once upon a time, in a land full of wonder... 🌈

${storyPrompt}

...And so, their incredible adventure concluded, leaving smiles and happy memories that would last forever! 🌟 
(This is a placeholder story. In a real app, AI would generate unique content here.)`;
                
                generatedStoryTextElement.textContent = generatedStory; 

                if (steps[currentStep]) {
                    steps[currentStep].classList.remove('active');
                }
                showStep(storyResultDisplaySection); // Show the story result section

                storyResultDisplaySection.scrollIntoView({ behavior: 'smooth', block: 'center' });
            });
        }

        if (createNewStoryBtn) {
            createNewStoryBtn.addEventListener('click', () => {
                showStep(null); // Hide current step (story result)

                selections.language = 'english'; selections.chapters = '1'; selections.voiceProvider = 'openai'; 
                selections.imageStyle = 'default'; selections.voiceType = 'alloy';   
                selections.genre = []; selections.characters = []; selections.ideas = []; selections.settings = [];

                storyGeneratorApp.querySelectorAll('.selection-grid .grid-item.selected').forEach(item => {
                    item.classList.remove('selected');
                });
                
                populateGrid('genre-grid', genreData, 'genre');
                populateGrid('character-grid', characterData, 'characters');
                populateGrid('idea-grid', ideaData, 'ideas');
                populateGrid('setting-grid', settingData, 'settings');

                storyGeneratorApp.querySelector('#language').value = 'english';
                storyGeneratorApp.querySelector('#chapters').value = '1';
                storyGeneratorApp.querySelector('#voice-provider').value = 'openai';
                storyGeneratorApp.querySelector('#image-style').value = 'default';
                storyGeneratorApp.querySelector('#voice-type').value = 'alloy';

                if (steps.length > 0 && steps[0]) {
                    showStep(steps[0]); 
                    currentStep = 0;
                }

                storyGeneratorApp.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        }
        
        if (steps.length > 0 && steps[0]) {
           showStep(steps[0]); 
        }

    } 
});
