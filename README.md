
# 🧑‍🏫 Teacher Portal

A simple and clean web application built with Django for teachers to manage student records — including adding, editing, and deleting students with real-time updates.


## Features

- Secure Login & Logout system (Django authentication)
- Dashboard to view student data
- Add new students via modal popup
- Inline editing of student data (name, subject, marks)
- Confirmation modal before deleting students
- CSRF protection for all form and AJAX requests
- Responsive and modern UI with custom CSS and JavaScript
## Technologies Used

- **Backend:** Django (Python)
- **Frontend:** HTML, CSS, JavaScript (Vanilla)
- **Database:** SQLite
- **Templating:** Django Templates
## 📂 Project Structure

teacher_portal/

    ├── portal/
    │  ├── static/
    │  │ └── portal/
    │  │ ├── css/
    │  │ │ └── style.css
    │  │ └── js/
    │  │ └── main.js
    │  ├── templates/
    │  │ └── portal/
    │  │ ├── login.html
    │  │ └── home.html
    │  ├── models.py
    │  ├── views.py
    │  ├── urls.py
    ├── teacher_portal/
    │   ├── settings.py
    │   ├── urls.py
    ├── db.sqlite3
    ├── manage.py
    ├── requirements.txt
    └── README.md## 🚀 Getting Started

### 🔧 Prerequisites

- Python 3.x
- pip (Python package manager)
- Virtualenv (optional but recommended)

---

### 📥 Installation

# Clone the repository
git clone https://github.com/Thatchana-Murthy-I/Teacher-Portal-Django-Project.git
cd Teacher-Portal-Django-Project

# Create and activate virtual environment
python -m venv venv

# On Windows
venv\Scripts\activate

# On macOS/Linux
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run database migrations
python manage.py migrate

# Create a superuser for admin login
python manage.py createsuperuser

# Start the development server
python manage.py runserver

## 🔐 Login Credentials

Use the superuser credentials you created earlier to log in at:

http://127.0.0.1:8000/login/
## 🙋‍♂️ Author
Feel free to reach out for questions or suggestions!

**Thatchana Murthy I** – [@Thatchana-Murthy-I](https://github.com/Thatchana-Murthy-I)
