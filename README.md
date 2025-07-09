# YouTube Clone (React + Django)

This is a simple full-stack YouTube Clone project built using React for the frontend and Django with Django REST Framework for the backend. It allows users to register, upload and watch videos, like them, and more.

---

## Features

- User Registration and Login (JWT-based authentication)
- Video Upload (with title and optional description)
- Display all uploaded videos on the homepage
- Play video in a separate player view
- Like and Unlike videos
- Save videos to "Watch Later"
- Copy and share video links
- User dashboard showing uploaded videos

---

## Technologies Used

### Frontend:
- React (with Vite)
- React Router
- Axios
- LocalStorage for managing tokens

### Backend:
- Django 5+
- Django REST Framework
- JWT Authentication
- Media file handling (video uploads)

---

## Getting Started

### 1. Clone the Repository


cd ytclone


2. Setup the Backend (Django)

cd backend
python -m venv venv
venv\Scripts\activate 
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py runserver



3. Setup the Frontend (React)

cd frontend
npm install
npm run dev
Authentication Details
When a user logs in, an access token is saved in localStorage.
Protected endpoints (like video upload or like/unlike) send the token like this:
headers: {
  Authorization: `Bearer <access_token>`
}

Folder Structure:
ytclone/
├── backend/
│   ├── api/
│   ├── backend/
├── frontend/
│   ├── pages/
│   ├── components/

