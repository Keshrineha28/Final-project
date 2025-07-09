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

cd Backup

### 2. Setup the Backend (Django)

```bash
cd backend
python -m venv env
env\Scripts\activate
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```
You also need to install the packages of Django (like Django, djangorestframework, etc.)

settings.py:
```bash
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
```

add this to urls.py:
```bash
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    #  urls here
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
```

### 3. Setup the Frontend (React)

```bash
cd frontend
npm install
npm run dev
```

frontend runs on http://localhost:5173
backend runs on http://127.0.0.1:8000

Authentication Details
When a user logs in, an access token is saved in localStorage.
Protected endpoints (like video upload or like/unlike) send the token like this:
headers: {
  Authorization: `Bearer <access_token>`
}

### 4. Folder Structure:

```bash
Backup/
├── backend/
│   ├── api/
│   ├── backend/
├── frontend/
│   ├── pages/
│   ├── components/


