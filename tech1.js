// JavaScript Code to Handle Profile Information

// Function to save profile information
function saveProfile() {
    const githubLink = document.getElementById("githubLink").value;
    const linkedinLink = document.getElementById("linkedinLink").value;
    
    // Get uploaded image
    const uploadedImage = document.getElementById("profileImage").files[0];
    const imageUrl = URL.createObjectURL(uploadedImage);
    
    // Display the uploaded image and links
    document.getElementById("uploadedImage").src = imageUrl;
    document.getElementById("displayGithub").href = githubLink;
    document.getElementById("displayGithub").textContent = githubLink;
    document.getElementById("displayLinkedIn").href = linkedinLink;
    document.getElementById("displayLinkedIn").textContent = linkedinLink;
  }
  
  // Add event listener to the Save Button
  document.getElementById("saveButton").addEventListener("click", saveProfile);
  