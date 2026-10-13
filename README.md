# Employee Management System

A fullstack web application to maintain employee information and manage employee records efficiently. Built during my Java Fullstack internship.

## What it does
- Add a new employee
- View all employees
- Search an employee by name
- Update (edit) employee details
- Delete an employee
- Manage departments (add, view, delete)
- Display each employee's salary and designation

## Technologies used

| Layer | Technology | Purpose |
|---|---|---|
| Frontend | HTML, CSS, JavaScript | Pages, design, and communication with the backend |
| Backend | Java 21, Spring Boot | REST APIs that handle requests |
| Database | MySQL 8 | Permanent storage of employee and department data |
| Tools | VS Code, Maven, Live Server | Development and running the project |

## How it works
1. The user clicks a button on the website (for example, **Add Employee**).
2. JavaScript sends a request to the Spring Boot backend using `fetch()`.
3. The backend reads or saves the data in the MySQL database.
4. The result is sent back and shown on the page.

## API endpoints

**Employees** (`/api/employees`)

| Action | Method | URL |
|---|---|---|
| View all | GET | `/api/employees` |
| Add | POST | `/api/employees` |
| Update | PUT | `/api/employees/{id}` |
| Delete | DELETE | `/api/employees/{id}` |
| Search | GET | `/api/employees/search?name=...` |

**Departments** (`/api/departments`)

| Action | Method | URL |
|---|---|---|
| View all | GET | `/api/departments` |
| Add | POST | `/api/departments` |
| Delete | DELETE | `/api/departments/{id}` |

## Database
Database name: `employee_management`

- `employees` table: id, name, designation, department, salary, email, phone
- `departments` table: id, name

## How to run the project
1. Install Java 21 and MySQL.
2. Create the database in MySQL: `CREATE DATABASE employee_management;`
3. Open `management/src/main/resources/application.properties` and put your own MySQL password in `spring.datasource.password`.
4. Start the backend: go into the `management` folder and run `./mvnw spring-boot:run`. Wait for `Started ManagementApplication`.
5. Open `Frontend/index.html` with Live Server in VS Code.

## What I learned
- Building a REST API with Spring Boot (Entity, Repository, Controller)
- Connecting a Java backend to a MySQL database using JPA
- Connecting a JavaScript frontend to a backend using `fetch()`
- How the frontend, backend and database work together in a fullstack project

## Author
Archana R