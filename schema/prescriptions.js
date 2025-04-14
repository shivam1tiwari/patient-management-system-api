const prescriptionsSchema = 'CREATE TABLE IF NOT EXISTS prescriptions (id SERIAL PRIMARY KEY, medicine_name TEXT, dosage TEXT, visit_id INTEGER REFERENCES visits(id) ON DELETE CASCADE)';

module.exports = prescriptionsSchema;