let currentSlide = 1;
const totalSlides = 12; // Total number of slides

function nextSlide() {
    if (currentSlide < totalSlides) {
        // Hide the current slide
        hideSlide(currentSlide);
        
        // Move to the next slide
        currentSlide++;
        
        // Display the next slide
        displaySlide(currentSlide);
    } else {
        // Handle end of questionnaire
        alert('Thank you for completing the questionnaire!');
        resetSlides();
    }
}

function prevSlide() {
    if (currentSlide > 1) {
        // Hide the current slide
        hideSlide(currentSlide);
        
        // Move to the previous slide
        currentSlide--;
        
        // Display the previous slide
        displaySlide(currentSlide);
    }
}

function displaySlide(slideNumber) {
    document.getElementById('slide' + slideNumber).style.display = 'block';
}

function hideSlide(slideNumber) {
    document.getElementById('slide' + slideNumber).style.display = 'none';
}

function resetSlides() {
    // Reset to the first slide
    currentSlide = 1;
    displaySlide(currentSlide);
    
    // Hide all other slides
    for (let i = 2; i <= totalSlides; i++) {
        hideSlide(i);
    }
}

// Initially display the first slide
displaySlide(currentSlide);

