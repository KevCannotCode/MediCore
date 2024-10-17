# MediCore
The MediCore web app manages patient health records securely, allowing doctors, patients, and admin to access and manage critical medical data , and appointments. The app ensures security through role-based access and aims to streamline hospital workflows while keeping patient information safe and accessible.

# Dependencies Installation
Before you begin, ensure you have the following installed:

Node.js: Download and install from nodejs.org
MongoDB: Set up MongoDB locally or use a cloud instance. More details can be found at mongodb.com
Postman: For testing APIs. Download and install from postman.com

## Install MongoDB
### For Windows:

Download the MongoDB installer from the official MongoDB website.
Run the installer and follow the prompts.
Choose "Complete" setup and select "Install MongoDB as a Service" during installation for easy management.
Add MongoDB to your system's PATH to access it from the command line.

### For macOS:

Use Homebrew to install MongoDB by running:
    
    brew tap mongodb/brew
    brew install mongodb-community@6.0

After installation, start MongoDB:

brew services start mongodb-community@6.0

### For Linux (Ubuntu):
Import the MongoDB public GPG key:
    
    wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -

Create a list file for MongoDB:
  
    echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

Reload the package database and install MongoDB:
    
    sudo apt-get update
    sudo apt-get install -y mongodb-org

Start MongoDB:
    
    sudo systemctl start mongod

# Run

To run the backend and frontend, naviguate to each directories and run the following commands:

npm install
npm start 

The backend server will be listening on http://localhost:3000.
The frontend server will be listening on http://localhost:8080.
These are the usual ports unless they are already in use.