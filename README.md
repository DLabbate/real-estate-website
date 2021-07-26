<img src="frontend/src/assets/logo/logo.svg" width=75 align="left"/>

# Acasa
#### *Your dream home is only a few clicks away!*

<br/>

## Overview
Acasa is a simple to use real estate platform that offers the ability to search for homes, organize favorites into different categories, and even create your own listing!

<br/>

## Features
🔎 Filter listings by **location** (using Google Maps API), **radius**, and **price**

❤️ Add listings to favorites

❌ Remove listings from favorites

📁 Organize listings into different categories (Drag and Drop)

🏡 Create your own listing

🗑️ Delete your listing

<br/>

## Tech Stack
### Frontend
<img alt="React" src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB"/> <img alt="JavaScript" src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E"/> <img alt="HTML5" src="https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white"/> <img alt="CSS3" src="https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white"/>

### Backend
<img alt="NodeJS" src="https://img.shields.io/badge/node.js-%2343853D.svg?style=for-the-badge&logo=node-dot-js&logoColor=white"/> <img alt="Express.js" src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB"/> <img alt="MongoDB" src ="https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white"/> <img alt="AWS" src="https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white"/>

### Testing
<img alt="Jest" src="https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white"/> <img alt="Testing-Library" src="https://img.shields.io/badge/-TestingLibrary-%23E33332?style=for-the-badge&logo=testing-library&logoColor=white"/>

### Libraries/API
Name | Overview | Link
:--- | :--- | :---
`Google Maps` | Google Maps API used for searching locations + autocomplete | https://github.com/hibiken/react-places-autocomplete
`bcrypt` | Encrypted user password with hashing + salt | https://github.com/kelektiv/node.bcrypt.js/
`jsonwebtoken` | JSON Web Tokens used for route protection | https://github.com/auth0/node-jsonwebtoken
`react-beautiful-dnd` | Drag and drop for lists with React | https://github.com/atlassian/react-beautiful-dnd

<br/>

## Tutorials

### Browse Page
###### Search for listings with the option to filter by 📍 Location, 🌐 Radius, and 💸 Price 
<img src="frontend/src/assets/tutorials/browse.gif" />

***

### Add To Favorites
<img src="frontend/src/assets/tutorials/favorites.gif" />

***

### Notes Page
###### Drag and drop listings into the following categories: Queue (by default, favorited listings are placed here), Not Interested, Interested, Offers
<img src="frontend/src/assets/tutorials/notes.gif" />

***

### Remove From Favorites
<img src="frontend/src/assets/tutorials/favorites-delete.gif" />

***

### Create Listing
###### Create your own listing! (A user can only have one active listing at a time)
<img src="frontend/src/assets/tutorials/listing-create.gif" />

***

### Delete Listing
###### Delete your listing when it gets sold!
<img src="frontend/src/assets/tutorials/listing-delete.gif" />

## Architecture

### UML
The overall structure consists of the following models:
* `User`
* `Listing`
* `Note`
* `Column`
* `Board` (where a user organizes notes. For instance, reordering, moving to a different column, etc.)
<br/>

<img src="frontend/src/assets/architecture/uml-architecture.svg" />

***

### Frontend
Frontend uses an API module pattern. In particular, JS modules that contains HTTP logic organized by business domain (namely `User`, `Listing`, `Note` and `Board`).
<br/>

<img src="frontend/src/assets/architecture/frontend-architecture.svg" />

***

### Backend
Backend structured using a layered approach in order to organize logic.
<br/>

<img src="frontend/src/assets/architecture/backend-architecture.svg" />
