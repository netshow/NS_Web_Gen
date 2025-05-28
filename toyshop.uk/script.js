document.addEventListener('DOMContentLoaded', () => {
    const navToggler = document.getElementById('nav-toggler');
    const navMenu = document.querySelector('.nav-menu');
    if (navToggler) {
        navToggler.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => navMenu.classList.remove('active'));
    });

    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) currentYearSpan.textContent = new Date().getFullYear();

    const screens = document.querySelectorAll('.screen');
    let currentScreen = 0;
    const nextButtons = document.querySelectorAll('.btn-next');
    const backButtons = document.querySelectorAll('.btn-back');

    function showScreen(index) {
        screens[currentScreen].classList.remove('active-screen');
        currentScreen = index;
        screens[currentScreen].classList.add('active-screen');
    }

    nextButtons.forEach(btn => {
        btn.addEventListener('click', () => showScreen(Array.from(screens).findIndex(s => s.id === btn.dataset.target)));
    });
    backButtons.forEach(btn => {
        btn.addEventListener('click', () => showScreen(Array.from(screens).findIndex(s => s.id === btn.dataset.target)));
    });

    const genres = [
        { id: 'adventure', name: 'Adventure', color: '#FF8A65' },
        { id: 'magic', name: 'Magic', color: '#4FC3F7' },
        { id: 'funny', name: 'Funny', color: '#FFB74D' }
    ];
    const characters = [
        { id: 'wizard', name: 'Wizard', color: '#81C784' },
        { id: 'robot', name: 'Robot', color: '#FF8A65' },
        { id: 'knight', name: 'Knight', color: '#4FC3F7' }
    ];

    const selections = { genre: null, characters: [] };

    populateOptions('genre-options', genres, 'genre', 1);
    populateOptions('character-options', characters, 'characters', 2);

    document.getElementById('btn-generate').addEventListener('click', () => {
        const prompt = `Tell me a ${selections.genre?.name || ''} story with ${selections.characters.map(c => c.name).join(' and ')}`;
        document.getElementById('prompt-display').textContent = prompt;
        document.getElementById('story-display').textContent = `${prompt}... Once upon a time...`;
        showScreen(Array.from(screens).findIndex(s => s.id === 'screen-4'));
    });

    document.getElementById('btn-restart').addEventListener('click', () => {
        selections.genre = null; selections.characters = [];
        document.querySelectorAll('.option-item.selected').forEach(el => el.classList.remove('selected'));
        showScreen(0);
    });

    function populateOptions(containerId, items, key, limit) {
        const container = document.getElementById(containerId);
        items.forEach(item => {
            const div = document.createElement('div');
            div.className = 'option-item';
            div.innerHTML = `<div class="option-icon" style="background:${item.color}">${item.name[0]}</div><p>${item.name}</p>`;
            div.addEventListener('click', () => toggle(div, item, key, limit));
            container.appendChild(div);
        });
    }

    function toggle(element, item, key, limit) {
        if (key === 'genre') {
            document.querySelectorAll('#genre-options .option-item').forEach(el => el.classList.remove('selected'));
            element.classList.add('selected');
            selections.genre = item;
        } else {
            if (element.classList.contains('selected')) {
                element.classList.remove('selected');
                selections.characters = selections.characters.filter(c => c.id !== item.id);
            } else if (selections.characters.length < limit) {
                element.classList.add('selected');
                selections.characters.push(item);
            }
        }
    }
});
