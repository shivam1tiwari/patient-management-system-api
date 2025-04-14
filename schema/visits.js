const visitSchema = 'CREATE TABLE IF NOT EXISTS visits (id SERIAL PRIMARY KEY, symptoms TEXT, diagnosis TEXT, visit_date TIMESTAMP DEFAULT NOW(), patient_id INTEGER REFERENCES patients(id) ON DELETE CASCADE)';

module.exports = visitSchema