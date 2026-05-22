# Best Store - E-commerce Web Application

![PHP](https://img.shields.io/badge/PHP-7.4%2B-777BB4?logo=php)
![MySQL](https://img.shields.io/badge/MySQL-8.0%2B-4479A1?logo=mysql)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.0%2B-7952B3?logo=bootstrap)
![License](https://img.shields.io/badge/License-MIT-green)

## 📋 Overview
Best Store is a modern e-commerce platform where users can register, login, update their profile, and manage their account. It is built using PHP, MySQL, and Bootstrap for responsive design.

## ✨ Features
- **User Registration & Login** - Secure account creation and authentication
- **Profile Management** - View and update personal information
- **Responsive Design** - Mobile-friendly interface with Bootstrap 5
- **Dynamic Copyright Year** - Auto-updating footer
- **Session Management** - Secure authentication system

## 🛠️ Technologies

| Layer | Technology |
|-------|------------|
| **Frontend** | HTML, CSS, Bootstrap 5 |
| **Backend** | PHP, MySQL |
| **Authentication** | Session management |

## 🚀 Installation

### Prerequisites
- PHP 7.4 or higher
- MySQL or MariaDB
- Apache or any web server

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/BYUMVUHOREAimable/beststore.git
   cd beststore
   ```
2. **Set up the database**

```bash
CREATE DATABASE best_store;

USE best_store;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100) UNIQUE,
    phone VARCHAR(20),
    address TEXT,
    password VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

3. ***Configure database connection***
-Edit tools/db.php with your database credentials.**

-Start the server

```bash
php -S localhost:8000
📖 Usage
Register: /register.php - Create a new account

Login: /login.php - Sign in to your account

Profile: /profile.php - View and edit profile information

Logout: /logout.php - End your session

📄 License
MIT License - see the LICENSE file for details.
```

***📞 Contact***
-For any questions or support, contact:

-Email: aimablebyumvuhore@gmail.com
