# patient-management-system-api

A complete RESTful API built with **Node.js**, **Express**, and **PostgreSQL** to manage doctors, patients, medical visits, and prescriptions. Designed for clinics, hospitals, or healthcare applications.

---

## Tech Stack

- **Backend**: Node.js, Express
- **Database**: PostgreSQL
- **Authentication**: Password hashing with bcrypt
- **Database Driver**: `pg` (PostgreSQL client for Node.js)

---


---

## Setup Instructions

### 1. Clone the Repository

```bash
https://github.com/shivam1tiwari/patient-management-system-api.git
```
### 2. Install Dependencies( Run command )
```javascript
npm install
```
### 3. Configure the Database Connection
####  Edit db.js to match your local PostgreSQL setup:
```javascript
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  password: '',
  database: 'test-1',
  host: 'localhost',
  port: 5432,
});

module.exports = pool;
```
### 4. Run the Server
```bash
npm start
```
### 5. Database Schema
#### Doctors
```sql
CREATE TABLE IF NOT EXISTS doctors (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) NOT NULL UNIQUE,
  password TEXT NOT NULL,
  hospital_id INTEGER REFERENCES hospitals(id)
);

```
#### Patients
```sql
CREATE TABLE IF NOT EXISTS patients (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) NOT NULL UNIQUE,
  doctor_id INTEGER REFERENCES doctors(id) ON DELETE CASCADE
);
```
#### Prescriptions
```sql
CREATE TABLE IF NOT EXISTS prescriptions (
  id SERIAL PRIMARY KEY,
  medicine_name TEXT,
  dosage TEXT,
  visit_id INTEGER REFERENCES visits(id) ON DELETE CASCADE
);

```
#### Visits
```sql
CREATE TABLE IF NOT EXISTS visits (
  id SERIAL PRIMARY KEY,
  symptoms TEXT,
  diagnosis TEXT,
  visit_date TIMESTAMP DEFAULT NOW(),
  patient_id INTEGER REFERENCES patients(id) ON DELETE CASCADE
);

```
### Table Relationships
- One doctor → many patients
- One patient → many visits
- One visit → many prescriptions
- Deleting a patient also deletes visits and prescriptions

### API Endpoints
#### http://localhost:3000/doctor
- POST  /register -- Register a doctor
- POST  /login -- Doctor login
- DELETE  /delete -- Delete a doctor
##### Resister a doctor sample example
- POST /register
``` json
{
  "name": "Dr. Alice",
  "email": "alice@example.com",
  "password": "secure123",
  "hospital_id": 1
}
```
#### Doctor Login
POST /login
``` json
{
  "email": "alice@example.com",
  "password": "secure123"
}
```
#### Doctor Delete
DELETE /delete
``` json
{
  id: 1
}
```
#### Resister a Patient sample example
#### http://localhost:3000/patient
- POST /register
``` json
{
  "name": "John Doe",
  "email": "john@example.com",
  "doctor_id": 1
}
```
#### Patient Delete
- DELETE /register
``` json
{
  id: 1
}
```
####  Add Visit (example)
##### http://localhost:3000/visits

- POST /visit
``` json
{
  "patient_id": 1,
  "symptoms": "Fever, headache",
  "diagnosis": "Viral infection"
}
```
- GET /visit
``` json
{
  "patient_id": 1,
  "symptoms": "Fever, headache",
  "diagnosis": "Viral infection"
}
```
##### http://localhost:3000/visits
- DELETE /delete
``` json
{
 id: 1
}
```
####  Add Prescription (example)
##### http://localhost:3000/cure
- POST /prescription
``` json
{
  "visit_id": 1,
  "medicine_name": "Paracetamol",
  "dosage": "500mg twice daily"
}

```
##### Delete
- DELETE /delete
``` json
{
 id: 1
}

```



