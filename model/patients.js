const pool = require('../db')

const register = async(req, res) => {
  const {name, email, doctor_id} = req.body
  try{
    const isDuplicate = await pool.query('SELECT email FROM patients WHERE email = $1', [email]);
    console.log(isDuplicate);
    if(isDuplicate.rowCount == 0){
      const createPatient = await pool.query('INSERT INTO patients (name, email, doctor_id) values($1, $2, $3)',[name, email, doctor_id]);
      res.status(200).json({message:"Successfull Registered"});
    }else{
      res.status(200).send({ message: "Patient already registered" });
    }
  }catch{
    res.status(500).json({message: "Internal server Error"})
  }
}

const getPatients = async(req, res) => {
  try{
    const patients = await pool.query('SELECT * FROM patients');

    if(patients.rowCount === 0){
      return res.status(200).json({message: "No patients record available" })
    }
    return res.status(200).json(patients.rows)
  }catch{}
}

const deletePatient = async (req, res) => {
  const { id } = req.body;

  try {
    const response = await pool.query('DELETE FROM patients WHERE id = $1 RETURNING *', [id]);

    if (response.rowCount === 0) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.status(200).json({ message: "Patient deleted successfully", patient: response.rows[0] });
  } catch (error) {

    res.status(500).json({ message: "Internal server error" });
  }
};

const patients = {
  register, getPatients, deletePatient
}

module.exports = patients;