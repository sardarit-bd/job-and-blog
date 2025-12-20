## This is a web application built with React for the frontend, Inertia.js as the bridge, and Laravel for the backend.

### Tech Information
1. php v8.4
2. Node.js v24.x
3. React v19
4. Laravel 12.x

## Installation
Follow these steps to get the project up and running locally.

### 1. Clone the Repository
 ```
   git clone https://github.com/sardarit-bd/job-and-blog.git
   cd job-and-blog
   ```
### 2. Install Backend Dependencies
   ```
   composer install
   ```
### 3. Set Up Environment File
   ```
   cp .env.example .env
   ```
### 5. Generate Application Key
   ```
   php artisan key:generate
   ```
### 7. Install Frontend Dependencies
   ```
   npm install
   ```
### 9. Set Up the Database
```
php artisan migrate --seed
```
### 11. Run The Project
```
composer run dev
```
