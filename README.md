# MediCore
The MediCore web app manages patient health records securely, allowing doctors, patients, and admin to access and manage critical medical data , and appointments. The app ensures security through role-based access and aims to streamline hospital workflows while keeping patient information safe and accessible.

# FastAPI Installation Guide
Overview
FastAPI is a modern, fast (high-performance) web framework for building APIs with Python 3.7+ based on standard Python type hints.

# Prerequisites
Before you install FastAPI, ensure you have Python 3.7 or higher installed on your machine. You can download Python from python.org.

# Installation Steps
Step 1: Setup a Virtual Environment
It's a good practice to use a virtual environment to manage dependencies for your project. You can create a virtual environment by running this command in the terminal:

python -m venv fastapi-env


Activate the virtual environment:

Windows: 
fastapi-env\Scripts\activate

macOS/Linux: 
source fastapi-env/bin/activate

Step 2: Install FastAPI
With your virtual environment activated, you can install FastAPI using pip:

pip install fastapi

Run your application using Uvicorn:
The main.py files has a basic server running. Navigate to the medicore-app/backend and run this command to start it:
uvicorn main:app --reload

The --reload option allows the server to automatically reload your application when you make changes to the code.

You should see output indicating that the server is running on http://127.0.0.1:8000. Open this URL in your web browser to see your API in action.

#Install MongoDB
For Windows:
Download the MongoDB installer from the official MongoDB website.
Run the installer and follow the prompts.
Choose "Complete" setup and select "Install MongoDB as a Service" during installation for easy management.
Add MongoDB to your system's PATH to access it from the command line.

#For macOS:
Use Homebrew to install MongoDB by running:
brew tap mongodb/brew
brew install mongodb-community@6.0

#After installation, start MongoDB:
brew services start mongodb-community@6.0

#For Linux (Ubuntu):
Import the MongoDB public GPG key:
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -

#Create a list file for MongoDB:
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

#Reload the package database and install MongoDB:
sudo apt-get update
sudo apt-get install -y mongodb-org

#Start MongoDB:
sudo systemctl start mongod


