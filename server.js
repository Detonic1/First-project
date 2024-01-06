const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer'); // Import multer

const app = express();
const port = 3000;

// Temporary storage for user information
const users = [];

// Set storage engine for multer
const storage = multer.diskStorage({
    destination: './public/uploads/', // Specify the destination directory
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Initialize upload
const upload = multer({
    storage: storage
}).single('userImage'); // Ensure the input field name matches

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from the 'My Path to Tech' directory
app.use(express.static(path.join(__dirname, 'My Path to Tech')));

// Handle form submission
app.post('/submit-data', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.error(err);
            res.send('An error occurred.');
        } else {
            const formData = req.body;
            const userImage = req.file ? `/uploads/${req.file.filename}` : null; // Update the image path
            
            // Extract the required information from the form data
            const userInfo = {
                name: `${formData.firstName} ${formData.middleName} ${formData.lastName}`,
                email: formData.email,
                github: formData.githubLink,
                linkedin: formData.linkedinLink,
                image: userImage // Store the updated image path
            };
            
            // Store the user information in the temporary storage
            users.push(userInfo);
            
            // Create a styled HTML response with the user's information
            const styledResponse = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>User Information</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-image: linear-gradient(29.93deg, #42496f,
                            rgba(66,73,111,0) 37.51%),linear-gradient(186.09deg,#434f6c,rgba(67,79,108,0) 39.79%),
                            linear-gradient(235.04deg,#45637b 1.66%,rgba(69,99,123,0) 52.55%),linear-gradient(71.3deg,#725648 6.08%,
                            rgba(114,86,72,0) 81.88%),linear-gradient(161.8deg,#795e65 5.13%,rgba(121,94,101,0) 23.4%),
                            linear-gradient(293.67deg,#7f5e64 10.87%,rgba(126,94,98,0) 83.24%),linear-gradient(0deg,#fff,#fff),
                            linear-gradient(0deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,.05));
                        justify-content: center;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                    }
                    .navbar {
                        display: flex;
                        justify-content: center;
                        margin-bottom: 20px;
                        border: 2px solid black;
                        padding: 10px;
                    }
                    .navbar a {
                        margin: 0 15px;
                        text-decoration: none;
                        color: #000;
                        text-align: center;
                        font-weight: bold; /* Making the text bolder */
                    }
                    .logos {
                        display: flex;
                        justify-content: space-around;
                        background-color: hsla(0,0%,100%,.4);
                        align-items: center;
                        gap: 20px;
                        margin-top: 177px;
                        border: 2px solid transparent;
                        padding: 10px;
                        border-radius: 10px;
                        width: 80%; /* Adjusting the width for responsiveness */
                        margin-left: auto;
                        margin-right: auto;
                        max-width: 357px; /* Setting max-width to avoid too much stretching on zoom */
                    }
                    .logos img {
                        width: 50px;
                        height: 50px;
                        display: block;
                    }
                    .logos span {
                        display: block;
                        text-align: center;
                        font-weight: bold; /* Making the text bolder */
                    }
                    .user-container {
                        text-align: center;
                        padding: 20px;
                        margin-top: 168px;
                        
                        border-radius: 5px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0);
                    }
                    .user-image {
                        width: 100px;
                        height: 100px;
                        border-radius: 50%;
                        margin-bottom: 20px;
                    }
                </style>
            </head>
            <body>
                <div class="navbar">
                    <a href="#">Resume</a>
                    <a href="#">Project</a>
                    <a href="#">About</a>
                </div>
                <div class="user-container">
                    <img class="user-image" src="${userInfo.image}" alt="User Image">
                    <h2>${userInfo.name}</h2>
                    <div class="logos">
                        <div>
                            <img src="" alt="">
                            <span>LinkedIn</span>
                        </div>
                        <div>
                            <img src="path_to_github_logo.png" alt="">
                            <span>GitHub</span>
                        </div>
                        <div>
                            <img src="path_to_discord_logo.png" alt="">
                            <span>Discord</span>
                        </div>
                        <div>
                            <img src="path_to_email_logo.png" alt="">
                            <span>Email</span>
                        </div>
                    </div>
                </div>
            </body>
            </html>
            
            `;

            // Send the styled HTML response
            res.send(styledResponse);
        }
    });
});

// Serve 'tech1.html' for GET requests to the root endpoint
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'My Path to Tech', 'tech2.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
