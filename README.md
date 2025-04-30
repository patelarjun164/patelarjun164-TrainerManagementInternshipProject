# 🧑‍🏫 Trainer-Subject Management System

A full-stack web application built using **Spring Boot (Java)** for the backend and **React.js** for the frontend.  
It manages trainers, their areas of expertise, and the subjects they are assigned to.

---

## 📁 Project Structure

### 🔙 Backend (`InternshipProject`)

- Spring Boot
- Java
- MySQL
- Maven
- RESTful APIs

### 🔜 Frontend (`internship-project-frontend`)

- React.js
- React Router DOM
- CSS (Responsive Design)
- Axios

---

## 🚀 Features

✅ Add, view, and delete trainers  
✅ Assign multiple subjects to a trainer  
✅ Search trainers by ID or subject  
✅ Add new subjects  
✅ View subject details and their assigned trainers  

---

## 🔗 Backend API Endpoints

### 📌 Trainer
| Method | Endpoint                      | Description                      |
|--------|-------------------------------|----------------------------------|
| POST   | `/trainer`                    | Add a new trainer                |
| GET    | `/trainer`                    | Get all trainers                 |
| GET    | `/trainer/{id}`               | Get trainer by ID                |
| GET    | `/trainer/{subject}/topic`    | Get trainers by subject name     |
| DELETE | `/trainer` (with `empId`)     | Delete trainer                   |

### 📌 Subject
| Method | Endpoint             | Description                                 |
|--------|----------------------|---------------------------------------------|
| POST   | `/subject`           | Add new subject                             |
| GET    | `/subject`           | Get all subjects                            |
| GET    | `/subject/{id}`      | Get subject with trainer details by ID      |

---

## 💡 Sample JSON (Trainer Add)

```json
{
  "name": "Elice Perry",
  "expertise": "Cricket",
  "subjects": [
    { "id": 1 },
    { "id": 3 }
  ]
}
```

---

## 💡 Sample JSON (Subject Add)

```json
{
  "name": "Mathematics",
  "description": "Covers algebra, geometry, and calculus."
}
```

---

## 💻 Frontend Pages (React)

| Route                  | Description                           |
|------------------------|---------------------------------------|
| `/`                    | Home Dashboard                        |
| `/add/trainer`         | Add Trainer                           |
| `/trainers`            | Get All Trainers                      |
| `/delete/trainer`      | Delete Trainer                        |
| `/trainerById`         | Get Trainer By ID                     |
| `/trainer-by-subject`  | Get Trainers By Subject               |
| `/add-subject`         | Add Subject                           |
| `/get-subjects`        | Get All Subjects                      |
| `/subjectById`         | Subject by ID (with Trainer details)  |

---

## 🧪 How to Run the Project

### 📦 Backend (Spring Boot)
1. Open the `InternshipProject` in IntelliJ or your IDE.
2. Make sure MySQL is running and database is set.
3. Configure `application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/your_db
   spring.datasource.username=root
   spring.datasource.password=your_password
   ```
4. Run the Spring Boot application.
5. App will be served at `http://localhost:8080`

### 🌐 Frontend (React)

1. Open terminal inside `internship-project-frontend`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the project:
   ```bash
   npm start
   ```
4. App will open at `http://localhost:3000`

---

## 🔐 CORS Note

Ensure your Spring Boot backend includes this CORS config:

```java
@CrossOrigin(origins = "http://localhost:3000")
```

---

---

## 🤝 Acknowledgments

Made with ❤️ by Arjun Patel for internship project learning and demonstration purposes.

---

## 🧰 Tools Used

- IntelliJ IDEA Community Edition
- POPSQL
- Postman
- VS Code
- React Developer Tools

---

## 📌 License

This project is licensed for learning and demo purposes.
