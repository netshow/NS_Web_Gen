document.addEventListener('DOMContentLoaded', () => {
    // --- Navbar Toggler for Mobile ---
    const navToggler = document.getElementById('nav-toggler');
    const navMenu = document.querySelector('.nav-menu');
    if (navToggler) {
        navToggler.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = navToggler.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
    }
    document.querySelectorAll('.nav-link, .nav-btn').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggler.querySelector('i').classList.remove('fa-times');
                navToggler.querySelector('i').classList.add('fa-bars');
            }
        });
    });

    // --- Smooth Scrolling for Nav Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href').length > 1 && this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - navbarHeight - 15;
                    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
                }
            }
        });
    });

    // --- Scroll Animations ---
    const scrollElements = document.querySelectorAll(".animate-on-scroll");
    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };
    const displayScrollElement = (element) => { element.classList.add("is-visible"); };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.05)) {
                displayScrollElement(el);
            }
        });
    };
    window.addEventListener("scroll", handleScrollAnimation);
    handleScrollAnimation();


    // --- Story Generator Logic ---
    const storyGeneratorModule = document.getElementById('generate-story');
    if (storyGeneratorModule) {
        const screens = Array.from(storyGeneratorModule.querySelectorAll('.screen')); // Convert NodeList to Array
        const nextButtons = storyGeneratorModule.querySelectorAll('.btn-next');
        const backButtons = storyGeneratorModule.querySelectorAll('.btn-back');
        const newStoryButton = document.getElementById('btn-new-story');
        const generatePromptButton = document.getElementById('btn-generate-prompt');
        const finalGenerateButton = document.getElementById('btn-generate-story-final');
        const startOverButton = document.getElementById('btn-start-over');

        const promptDisplay = document.getElementById('prompt-display');
        const storyContentDisplay = document.getElementById('story-content');

        const placeholderImg = (text = "Icon", w=80, h=80, bgColor="F0E68C",textColor="5D4037", type="Cute") =>
            `https://via.placeholder.com/${w}x${h}/${bgColor}/${textColor}?Text=${encodeURIComponent(type+" "+text)}`;

        const genres = [
            // { id: 'adventure', name: 'Big Adventure!', img: placeholderImg("Map", 80,70,"FF9800") },
            { id: 'adventure', name: 'Big Adventure!', img: 'images/adventure.png' },
            { id: 'bffs', name: 'Best Friends Forever', img: 'images/bffs.png' },
            { id: 'bedtime', name: 'Sleepy Time Story', img: 'images/bedtime.png' },
            { id: 'funny', name: 'Silly Giggles', img: 'images/funny.png' },
            { id: 'magic', name: 'Magic Wonders', img: 'images/magic.png' },
            { id: 'animals', name: 'Animal Pals', img: 'images/animal.png' },
        ];
        const characters = [
            { id: 'braveKnight', name: 'Brave Knight', img: 'images/brave_knight.png' },
            { id: 'sillyDragon', name: 'Silly Dragon', img: 'images/dragon.png' },
            { id: 'talkingSquirrel', name: 'Talking Squirrel', img: 'images/squirrel.png' },
            { id: 'magicalFairy', name: 'Magical Fairy', img: 'images/fairy.png' },
            { id: 'robotSidekick', name: 'Robot Sidekick', img: 'images/robot.png' },
            { id: 'curiousCat', name: 'Curious Cat', img: 'images/cute_cat.png' },
        ];
        const ideas = [
            { id: 'magicKey', name: 'Magic Key', img: 'images/key.png' },
            { id: 'talkingTree', name: 'Talking Tree', img: 'images/tree.png' },
            { id: 'flyingShoes', name: 'Flying Shoes', img: 'images/flying_shoes.png' },
            { id: 'treasureMap', name: 'Treasure Map', img: 'images/map.png' },
            { id: 'gigglePotion', name: 'Giggle Potion', img: 'images/potion.png' },
        ];
        const settings = [
            { id: 'candyCastle', name: 'Candy Castle', img: 'images/castle.png' },
            { id: 'sparkleForest', name: 'Sparkle Forest', img: 'images/forest.png' },
            { id: 'cloudKingdom', name: 'Cloud Kingdom', img: 'images/cloud.png' },
            { id: 'rainbowRiver', name: 'Rainbow River', img: 'images/river.png' },
        ];

        let storySelections = {
            language: 'english', chapters: 1, voiceProvider: 'openai',
            imageStyle: 'default', voiceName: 'alloy', genre: null,
            characters: [], ideas: [], settings: []
        };
        let currentScreenIndex = 0;

        function showScreen(targetIndex, direction = 'next') {
            if (targetIndex < 0 || targetIndex >= screens.length || targetIndex === currentScreenIndex) return;

            const currentScreen = screens[currentScreenIndex];
            const nextScreen = screens[targetIndex];

            // Remove all animation classes before adding new ones
            screens.forEach(s => s.classList.remove('slide-out-left', 'slide-in-right', 'slide-out-right', 'slide-in-left'));
            currentScreen.classList.remove('active-screen'); // Deactivate current immediately for class application

            if (direction === 'next') {
                currentScreen.classList.add('slide-out-left');
                nextScreen.classList.add('slide-in-right');
            } else { // 'prev'
                currentScreen.classList.add('slide-out-right');
                nextScreen.classList.add('slide-in-left');
            }
            nextScreen.classList.add('active-screen'); // Activate next screen
            
            // The CSS animation will handle the display none/block change via animation-fill-mode
            // No need to remove classes in timeout for this setup, CSS handles active state
            currentScreenIndex = targetIndex;
            storyGeneratorModule.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
        }
        
        // Initial screen setup
        screens.forEach((screen, index) => {
            screen.classList.remove('slide-out-left', 'slide-in-right', 'slide-out-right', 'slide-in-left');
            if (index === 0) screen.classList.add('active-screen');
            else screen.classList.remove('active-screen');
        });

        function getScreenIndexById(screenId) { return screens.findIndex(s => s.id === screenId); }

        populateOptions('genre-options', genres, 'genre', 1);
        populateOptions('character-options', characters, 'characters', 4);
        populateOptions('idea-options', ideas, 'ideas', 4);
        populateOptions('setting-options', settings, 'settings', 2);

        if (newStoryButton) {
            newStoryButton.addEventListener('click', () => {
                storySelections.language = document.getElementById('language').value;
                storySelections.chapters = document.getElementById('chapters').value;
                storySelections.voiceProvider = document.getElementById('voice-provider').value;
                storySelections.imageStyle = document.getElementById('image-style').value;
                storySelections.voiceName = document.getElementById('voice-name').value;
                showScreen(getScreenIndexById('screen-2-genre'), 'next');
            });
        }

        nextButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetScreenId = button.dataset.target;
                if (targetScreenId === 'screen-3-characters' && !storySelections.genre) { alert('Whee! Pick a story type first, little adventurer!'); return; }
                if (targetScreenId === 'screen-4-ideas' && storySelections.characters.length === 0) { alert('Whoops! Your story needs at least one hero or silly pal!'); return; }
                if (targetScreenId === 'screen-5-settings' && storySelections.ideas.length === 0) { alert('Hmm, what cool things will be in the story? Pick some ideas!'); return; }
                showScreen(getScreenIndexById(targetScreenId), 'next');
            });
        });

        backButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetScreenId = button.dataset.target;
                showScreen(getScreenIndexById(targetScreenId), 'prev');
            });
        });

        if (generatePromptButton) {
            generatePromptButton.addEventListener('click', () => {
                 if (storySelections.settings.length === 0) { alert('Oh no! Where will the story happen? Pick a setting!'); return; }
                generateAndDisplayPrompt();
                showScreen(getScreenIndexById('screen-6-prompt'), 'next');
            });
        }
        
        function populateOptions(containerId, items, selectionKey, maxSelections) {
            const container = document.getElementById(containerId);
            if (!container) return;
            container.innerHTML = '';
            items.forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.classList.add('option-item');
                itemDiv.dataset.id = item.id;
                itemDiv.dataset.name = item.name;
                const img = document.createElement('img');
                img.src = item.img; img.alt = item.name;
                const p = document.createElement('p');
                p.textContent = item.name;
                itemDiv.appendChild(img); itemDiv.appendChild(p);
                if (maxSelections === 1) { if (storySelections[selectionKey]?.id === item.id) itemDiv.classList.add('selected'); }
                else { if (storySelections[selectionKey].find(s => s.id === item.id)) itemDiv.classList.add('selected'); }
                itemDiv.addEventListener('click', () => toggleSelection(itemDiv, item, selectionKey, maxSelections, containerId));
                container.appendChild(itemDiv);
            });
        }
        function toggleSelection(element, itemData, selectionKey, maxSelections, containerId) {
            const selectedItemsContainer = document.getElementById(containerId).querySelectorAll('.option-item.selected');
            if (maxSelections === 1) {
                if (storySelections[selectionKey]?.id === itemData.id) { element.classList.remove('selected'); storySelections[selectionKey] = null; }
                else { selectedItemsContainer.forEach(el => el.classList.remove('selected')); element.classList.add('selected'); storySelections[selectionKey] = itemData; }
            } else {
                const index = storySelections[selectionKey].findIndex(selected => selected.id === itemData.id);
                if (index > -1) { storySelections[selectionKey].splice(index, 1); element.classList.remove('selected'); }
                else if (storySelections[selectionKey].length < maxSelections) { storySelections[selectionKey].push(itemData); element.classList.add('selected'); }
                else { alert(`Wowza! You can pick up to ${maxSelections} awesome ${selectionKey.replace(/s$/, '')}(s).`); }
            }
        }
        function generateAndDisplayPrompt() {
            let promptHTML = `<p>Please make a <strong>${storySelections.genre?.name || 'story'}</strong> kind of story</p>`;
            if (storySelections.characters.length > 0) promptHTML += `<p>with the characters of: <strong>${storySelections.characters.map(c => c.name).join(', ')}</strong></p>`;
            if (storySelections.ideas.length > 0) promptHTML += `<p>include in the storyline somewhere with the items of: <strong>${storySelections.ideas.map(i => i.name).join(', ')}</strong></p>`;
            if (storySelections.settings.length > 0) {
                const settingNames = storySelections.settings.map(s => s.name);
                const hiddenWorldSelected = storySelections.settings.find(s => s.id === 'hiddenWorld'); // Assuming 'hiddenWorld' is an ID
                const otherSettings = settingNames.filter(name => name.toLowerCase() !== "hidden world").join(' and ');
                let settingText = "in the setting of ";
                if (otherSettings) settingText += `<strong>${otherSettings}</strong>`;
                if (hiddenWorldSelected) { if (otherSettings) settingText += " "; settingText += `and they keep with the plot of a <strong>Hidden World</strong>`;}
                promptHTML += `<p>${settingText.trim()}</p>`;
            }
            promptHTML += `<hr><p style="font-size:0.9em; opacity:0.8;"><em>Language: ${storySelections.language}, Chapters: ${storySelections.chapters}, Voice: ${storySelections.voiceName} (${storySelections.voiceProvider}), Image Style: ${storySelections.imageStyle}</em></p>`;
            promptDisplay.innerHTML = promptHTML;
        }

        if (finalGenerateButton) {
            finalGenerateButton.addEventListener('click', () => {
                storyContentDisplay.innerHTML = `<p>Abracadabra! Your super story is appearing... almost there!</p><img src="${placeholderImg("MagicSparkles", 200, 100, "FFD700", "000000", "Loading")}" alt="Loading animation">`;
                showScreen(getScreenIndexById('screen-7-story-output'), 'next');
                setTimeout(() => {
                    const charactersText = storySelections.characters.map(c => c.name).join(" and ");
                    const genreText = storySelections.genre?.name || "magical";
                    const settingsText = storySelections.settings.map(s => s.name).join(" & ");
                    const ideasText = storySelections.ideas.map(i => i.name).join(", ");
                    storyContentDisplay.innerHTML = `<h3>Your ${genreText} Adventure!</h3><img src="${placeholderImg(genreText + ' Story', 300, 200, "87CEEB", "FFFFFF", "Yay")}" alt="Story Illustration"><p>Once upon a time, ${charactersText || 'some brave heroes'} embarked on an exciting ${genreText} journey. Their adventure took them through the wondrous lands of ${settingsText || 'a mysterious place'}.</p><p>They encountered ${ideasText || 'many interesting things'} and had a fantastic time!</p><p>And so concludes this chapter of their tale, brought to you in ${storySelections.language} with the voice of ${storySelections.voiceName}.</p>`;
                }, 2500);
            });
        }
        if (startOverButton) {
            startOverButton.addEventListener('click', () => {
                storySelections = { language: document.getElementById('language').value, chapters: document.getElementById('chapters').value, voiceProvider: document.getElementById('voice-provider').value, imageStyle: document.getElementById('image-style').value, voiceName: document.getElementById('voice-name').value, genre: null, characters: [], ideas: [], settings: [] };
                storyGeneratorModule.querySelectorAll('.option-item.selected').forEach(el => el.classList.remove('selected'));
                showScreen(getScreenIndexById('screen-1-setup'), 'prev'); // Or 'next' if it makes more sense, but prev for reset
            });
        }
    }

    // --- Footer Current Year ---
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
});