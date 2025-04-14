
const doctorSchema = 'CREATE TABLE IF NOT EXISTS DOCTORS (id SERIAL PRIMARY KEY, name VARCHAR(100), email VARCHAR(100) NOT NULL UNIQUE , password TEXT NOT NULL , hospital_id INTEGER REFERENCES hospitals(id))';

module.exports = doctorSchema;