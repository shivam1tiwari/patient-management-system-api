// const { response } = require('express')
const pool = require('../db')
const bcrypt = require('bcrypt')

const signUp = async(req, res) => {
  try{
    const {name, email, password, hospital_id} = req.body
    // const createDocTable = await pool.query('CREATE TABLE IF NOT EXISTS DOCTORS (id SERIAL PRIMARY KEY, name VARCHAR(100), email VARCHAR(100) NOT NULL UNIQUE , password TEXT NOT NULL , hospital_id INTEGER REFERENCES hospitals(id))');
    const isDuplicate = await pool.query('SELECT email FROM doctors WHERE email = $1', [email]);

    if(!isDuplicate.rows[0]){
      const hashPassword = await bcrypt.hash(password, 10);
      const createDoctors = await pool.query('INSERT INTO doctors (name, email, password, hospital_id) values($1, $2, $3, $4)',[name, email, hashPassword, hospital_id]);
      res.status(200).send("success");
    }else{
      res.status(200).send({ message: "Doctor already registered" });

    }
}catch(error){
  res.status(500).json({ message: "Internal server error" });
}
}

const login = async(req, res) => {
 const {email, password} = req.body;

  try{
    const doctor = await pool.query('SELECT id,name, email, password FROM doctors WHERE email = $1',[email]);
    console.log(doctor.rows[0].password)
    const token = await bcrypt.compare(password, doctor.rows[0].password);
    if(token){
    return  res.status(200).json(
      {data:{id:doctor.rows[0].id, name:doctor.rows[0].   name, email:doctor.rows[0].email},
      message: "Login successful"})
    }else{
      return  res.status(200).json({data:{},message: "Invalid creadential"})
    }
  }catch (error){
    res.status(500).json({ message: "Internal server error" });
  }
 
}

const deleteDoctor = async (req, res) => {
  const { id } = req.body;

  try {
    const response = await pool.query('DELETE FROM doctors WHERE id = $1 RETURNING *', [id]);

    if (response.rowCount === 0) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.status(200).json({ message: "Doctor deleted successfully", doctor: response.rows[0] });
  } catch (error) {

    res.status(500).json({ message: "Internal server error" });
  }
};

const methods = {
  signUp, login, deleteDoctor
}
module.exports = methods