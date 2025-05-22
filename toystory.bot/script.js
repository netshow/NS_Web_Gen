document.addEventListener("DOMContentLoaded", () => {
    // Story Carousel Functionality
    const storyCards = document.querySelectorAll(".story-card")
    const dots = document.querySelectorAll(".dot")
    const prevBtn = document.getElementById("prev-story")
    const nextBtn = document.getElementById("next-story")
    let currentIndex = 0
  
    function showStory(index) {
      // Hide all stories
      storyCards.forEach((card) => {
        card.classList.remove("active")
      })
  
      // Deactivate all dots
      dots.forEach((dot) => {
        dot.classList.remove("active")
      })
  
      // Show the current story and activate its dot
      storyCards[index].classList.add("active")
      dots[index].classList.add("active")
    }
  
    // Initialize dots click events
    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        currentIndex = index
        showStory(currentIndex)
      })
    })
  
    // Previous button click
    prevBtn.addEventListener("click", () => {
      currentIndex = currentIndex === 0 ? storyCards.length - 1 : currentIndex - 1
      showStory(currentIndex)
    })
  
    // Next button click
    nextBtn.addEventListener("click", () => {
      currentIndex = currentIndex === storyCards.length - 1 ? 0 : currentIndex + 1
      showStory(currentIndex)
    })
  
    // Auto-rotate stories every 5 seconds
    setInterval(() => {
      currentIndex = currentIndex === storyCards.length - 1 ? 0 : currentIndex + 1
      showStory(currentIndex)
    }, 5000)
  
    // Story Generator Functionality
    const generateBtn = document.getElementById("generate-btn")
    const storyResult = document.getElementById("story-result")
    const characterNameInput = document.getElementById("character-name")
    const storyThemeSelect = document.getElementById("story-theme")
    const ageRangeSelect = document.getElementById("age-range")
  
    // Sample story templates
    const storyTemplates = {
      fantasy: [
        "Once upon a time in the magical kingdom of Eldoria, there lived a brave young {character} who discovered they had the power to talk to animals. One day, a small bird told {character} about a sleeping dragon who guarded a treasure that could save their village from a terrible drought.",
        "In the enchanted forest of Whisperwood, {character} stumbled upon a tiny door hidden between the roots of an ancient oak tree. When {character} knocked, they were greeted by a family of thumb-sized fairies who needed help finding their missing queen.",
      ],
      space: [
        "Captain {character} was on a routine mission to Saturn when their spaceship detected an unusual signal coming from one of its moons. After landing, {character} discovered a friendly alien civilization that had been watching Earth for centuries.",
        "Space explorer {character} and their robot companion Blip were collecting star dust samples when they accidentally flew through a wormhole. They found themselves in a galaxy where planets were shaped like donuts and the stars sang lullabies at night.",
      ],
      animals: [
        "{character} was visiting their grandparents' farm when they noticed the animals acting strangely. That night, under the full moon, {character} discovered that the farm animals could talk and were planning a talent show to entertain the humans.",
        "While camping in the woods, {character} left a trail of blueberries that attracted a family of bears. Instead of being scary, the bears invited {character} to their home for honey pancakes and taught them how to find the sweetest berries in the forest.",
      ],
      underwater: [
        "During a beach vacation, {character} found a special seashell that gave them the ability to breathe underwater. They explored the ocean depths and befriended a young mermaid who showed them the hidden city of Atlantis.",
        "Marine biologist {character} was testing their new submarine when they discovered a colorful reef city populated by talking fish. The fish elected {character} as their ambassador to the human world to help keep the oceans clean.",
      ],
    }
  
    // Age-appropriate vocabulary and complexity adjustments
    const ageAdjustments = {
      "3-5": {
        sentenceLength: 10,
        vocabulary: "simple",
        paragraphs: 3,
      },
      "6-8": {
        sentenceLength: 15,
        vocabulary: "moderate",
        paragraphs: 5,
      },
      "9-12": {
        sentenceLength: 20,
        vocabulary: "advanced",
        paragraphs: 7,
      },
    }
  
    // Generate a story based on user inputs
    generateBtn.addEventListener("click", () => {
      const characterName = characterNameInput.value.trim() || "Alex"
      const theme = storyThemeSelect.value
      const ageRange = ageRangeSelect.value
  
      // Select a random story template for the chosen theme
      const templates = storyTemplates[theme]
      const randomTemplate = templates[Math.floor(Math.random() * templates.length)]
  
      // Replace placeholder with character name
      let story = randomTemplate.replace(/{character}/g, characterName)
  
      // Add age-appropriate details and complexity
      const ageSettings = ageAdjustments[ageRange]
  
      // Add additional paragraphs based on age range
      for (let i = 0; i < ageSettings.paragraphs - 1; i++) {
        if (i === 0) {
          story += "\n\n" + generateAdditionalParagraph(theme, characterName, ageSettings)
        } else if (i === ageSettings.paragraphs - 2) {
          story += "\n\n" + generateEndingParagraph(theme, characterName, ageSettings)
        } else {
          story += "\n\n" + generateAdditionalParagraph(theme, characterName, ageSettings)
        }
      }
  
      // Display the generated story with animation
      storyResult.innerHTML = "<h3>Your Story</h3>"
  
      const storyParagraphs = story.split("\n\n")
      let paragraphHTML = ""
  
      storyParagraphs.forEach((paragraph) => {
        paragraphHTML += `<p>${paragraph}</p>`
      })
  
      storyResult.innerHTML += paragraphHTML
  
      // Scroll to the story result
      storyResult.scrollIntoView({ behavior: "smooth" })
  
      // Animate the cartoon character to show excitement
      const character = document.querySelector(".cartoon-character")
      character.style.animation = "none"
      setTimeout(() => {
        character.style.animation = "characterFloat 4s ease-in-out infinite"
      }, 10)
  
      // Update speech bubble
      const speechBubble = document.querySelector(".speech-bubble p")
      speechBubble.textContent = "Wow! What a great story!"
      setTimeout(() => {
        speechBubble.textContent = "Let's create another one!"
      }, 5000)
    })
  
    // Helper function to generate additional story paragraphs
    function generateAdditionalParagraph(theme, character, ageSettings) {
      const themeParagraphs = {
        fantasy: [
          `${character} gathered courage and ventured deeper into the magical realm, where trees whispered secrets and flowers glowed in the dark.`,
          `A wise old wizard appeared and gave ${character} a magical amulet that would help on the journey ahead.`,
          `The path led to a crystal cave where ${character} had to solve a riddle to continue the adventure.`,
        ],
        space: [
          `${character}'s spaceship computer detected unusual energy readings coming from a nearby asteroid field.`,
          `The alien friends taught ${character} how to use their advanced technology to communicate across galaxies.`,
          `A space storm was approaching, and ${character} had to find shelter on the nearest moon.`,
        ],
        animals: [
          `The wise old owl invited ${character} to the midnight forest council where all the animals gathered.`,
          `${character} learned to speak the secret language of the woodland creatures.`,
          `A baby fox had wandered away from its family, and ${character} promised to help find them.`,
        ],
        underwater: [
          `The coral palace was preparing for the annual sea celebration, and ${character} was invited as the guest of honor.`,
          `A group of playful dolphins showed ${character} a hidden underwater cave filled with glowing pearls.`,
          `The king of the ocean needed ${character}'s help to solve a mystery in the deep sea trenches.`,
        ],
      }
  
      const paragraphs = themeParagraphs[theme]
      return paragraphs[Math.floor(Math.random() * paragraphs.length)]
    }
  
    // Helper function to generate ending paragraphs
    function generateEndingParagraph(theme, character, ageSettings) {
      const themeEndings = {
        fantasy: [
          `After completing the magical quest, ${character} returned home with new friends and wonderful stories to tell. Everyone in the village celebrated ${character}'s bravery, and they lived happily ever after.`,
          `The magical adventure taught ${character} that true courage comes from the heart. With a pocket full of fairy dust and memories to last a lifetime, ${character} knew this was just the beginning of many magical journeys.`,
        ],
        space: [
          `Captain ${character} established peace between Earth and the new alien civilization. The space journey had been the greatest adventure ever, but ${character} was happy to return home with amazing stories of distant worlds.`,
          `With the mission complete, ${character} set coordinates for Earth, carrying special gifts from their new alien friends. This was just the first of many space explorations for the brave young adventurer.`,
        ],
        animals: [
          `Thanks to ${character}'s help, the animals of the forest lived in harmony. Whenever ${character} visits the woods now, the animals greet their human friend with happy sounds and playful gestures.`,
          `${character} promised to keep the animals' secret and visit often. With a heart full of joy and new animal friends, ${character} knew that the forest would always be a magical place.`,
        ],
        underwater: [
          `The underwater kingdom awarded ${character} with a special pearl that would allow them to visit the ocean depths anytime. With waves of goodbye from all the sea creatures, ${character} swam back to shore, already planning the next underwater adventure.`,
          `After helping save the coral reef, ${character} was named an honorary citizen of the underwater world. Anytime ${character} visits the beach now, colorful fish jump out of the water to say hello to their special human friend.`,
        ],
      }
  
      const endings = themeEndings[theme]
      return endings[Math.floor(Math.random() * endings.length)]
    }
  
    // Create Story Button in Hero Section
    const createStoryBtn = document.getElementById("create-story-btn")
    createStoryBtn.addEventListener("click", () => {
      document.getElementById("try-it").scrollIntoView({ behavior: "smooth" })
    })
  
    // Add some animation to the floating elements
    const elements = document.querySelectorAll(".element")
    elements.forEach((element) => {
      // Add random delay to each element
      const delay = Math.random() * 5
      element.style.animationDelay = `${delay}s`
    })
  
    // Make the cartoon character interactive
    const character = document.querySelector(".cartoon-character")
    character.addEventListener("click", function () {
      const speechBubble = document.querySelector(".speech-bubble p")
      const phrases = [
        "Hi there! I'm your story buddy!",
        "Let's make a magical story together!",
        "What kind of adventure do you want?",
        "I love telling stories!",
        "You're going to be the hero of this tale!",
      ]
  
      // Change the speech bubble text
      const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)]
      speechBubble.textContent = randomPhrase
  
      // Add a little bounce animation
      this.style.animation = "none"
      setTimeout(() => {
        this.style.animation = "characterFloat 4s ease-in-out infinite"
      }, 10)
    })
  })
  