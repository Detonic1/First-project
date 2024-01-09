const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');

const app = express();
const port = 3000;

const users = [];

function generateBackgroundColor(email) {
 return `linear-gradient(29.93deg, #42496f,
         rgba(66,73,111,0) 37.51%), 
         linear-gradient(186.09deg, #434f6c, 
            rgba(67,79,108,0) 39.79%), 
            linear-gradient(235.04deg, 
                #45637b 1.66%, rgba(69,99,123,0) 52.55%), 
                linear-gradient(71.3deg, #725648 6.08%, 
                    rgba(114,86,72,0) 81.88%), 
                    linear-gradient(161.8deg, 
                        #795e65 5.13%, rgba(121,94,101,0) 23.4%), 
                        linear-gradient(293.67deg, #7f5e64 10.87%, 
                            rgba(126,94,98,0) 83.24%), 
                            linear-gradient(0deg, #fff, #fff),
                             linear-gradient(0deg, hsla(0,0%,100%,.05),
                              hsla(0,0%,100%,.05));`;

 
    
   
  
}

const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage
}).single('userImage');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));
app.use(express.static(path.join(__dirname, 'My Path to Tech')));

app.post('/submit-data', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.error(err);
            res.send('An error occurred.');
        } else {
            const formData = req.body;
            const userImage = req.file ? `/uploads/${req.file.filename}` : null;

            const userInfo = {
                name: `${formData.firstName} ${formData.middleName} ${formData.lastName}`,
                email: formData.email,
                github: formData.githubLink,
                linkedin: formData.linkedinLink,
                discord: formData.discordLink,
                image: userImage,
                backgroundColor: generateBackgroundColor(formData.email)
            };

            users.push(userInfo);

            const styledResponse = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>User Profile</title>
                <style>
                  body {
                        background-image: ${userInfo.backgroundColor};
                       
                        background-repeat: no-repeat;
                        background-size: cover;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                    }
                    
                        .navbar {
                        display: flex;
                        background-color: rgba(0,0,0,.5);
                        justify-content: center;
                        margin: 16px;
                        border-radius: 50px;
                        padding: 10px;
                        text-align: center;
                        width: 300px;
                        margin-left: 526px;
                    }
                    .navbar a {
                        margin: 0 17px;
                        text-decoration: none;
                        color: white;
                        font-family: JetBrains mono;
                        font-weight: bold;
                    }
                a{
                    color: white;                  
                    
                }
                    .logos {
                        display: flex;
                        justify-content: space-around;
                        background-color: hsla(0,0%,100%,.4);
                        align-items: center;
                        gap: 20px;
                        margin-top: -19px;
                        border: 2px solid transparent;
                        padding: 10px;
                        border-radius: 10px;
                        width: 80%; /* Adjusting the width for responsiveness */
                        margin-left: auto;
                        margin-right: auto;
                        max-width: 289px;
                    }
                    .logos img {
                        width: 50px;
                        height: 50px;
                    //     display: block;
                    }
                    .logos span {
                        display: block;
                        text-align: center;
                        font-weight: bold; /* Making the text bolder */
                    }
                    .user-container {
                        text-align: center;
                        padding: 20px;
                        margin-top: 21px;
                        font-size: 30px;
                        color: white;
                        border-radius: 5px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0);
                        
                    }
                    .user-image {
                        width: 168px;            
                        height: 168px;          
                        border-radius: 50%;      
                        margin: 0 auto;          
                        display: block;          
                        
                        background-size: cover;
                        background-repeat: no-repeat;
                        border: 1px solid darkgrey;   
                        box-sizing: border-box;  
                        
                        color: transparent;
                       
                       
                    }
                    
                    .custom-footer {
                    color:  #CCCCCC;
                    margin: -7px;
                    height: 2.5rem;
                    text-align: center;
                    font-family: JetBrains mono;
                    background-color: black;
                    padding: 3px;            
                    font-size: 13px;        
                    position: fixed;
                    width: 100%;
                    bottom: 0;
                     z-index: 1000;
}

                    
                        
                    }
                   
                </style>
            </head>
            <body>
             <div class="navbar">
                    <a href="#">Resume</a>
                    <a href="#">Project</a>
                    <a href="#">About</a>
                </div>
                <!-- Your HTML content here -->
                <!-- For example: -->
                <div class="user-container">
                    <img class="user-image" src="${userInfo.image}" alt="User Image">
                    <h2>${userInfo.name}</h2>
                    
                </div>
                       <div class="logos">
                        <div>
                        <a href="${userInfo.linkedin}" target="_blank"> 
                        <img src="/images/linkedin.jpg">
                        <span>LinkedIn</span>
                    </a>
                    
                        </div>
                        <div>
                        <a href="${userInfo.github}" target="_blank"> 
                        <img src="github.png">
                        <span>GitHub</span>
                    </a>
                    
                        </div>
                        <div>
                        <a href="${userInfo.discord}" target="_blank">
                        <img src="">
                        <span>Discord</span>
                    </a>
                    
                        </div>
                        <div>
                        <a href="mailto:${userInfo.email}" target="_blank"> 
                        <img src="">
                        <span>Email</span>
                    </a>
                    
                        </div>
                        <footer class="custom-footer">
                         Designed & Built by ${userInfo.name} using 
                         <span>[Javascript, React, HTML/CSS]</span>
                        </footer>

                    </div>
               
                <div/>

                
               
               
            </body>
            </html>
            `;

            res.send(styledResponse);
        }
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'My Path to Tech', 'tech2.html'));
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

