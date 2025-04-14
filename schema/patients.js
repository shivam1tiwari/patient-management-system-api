const patientSchema = 'CREATE TABLE IF NOT EXISTS patients (id SERIAL PRIMARY KEY, name VARCHAR(100), email VARCHAR(100) NOT NULL UNIQUE , doctor_id INTEGER REFERENCES doctors(id) ON DELETE CASCADE)';

module.exports = patientSchema