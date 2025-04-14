const pool = require('../db')
const addVisit = async (req, res) => {
  const { patient_id, symptoms, diagnosis } = req.body;
  console.log(patient_id, symptoms, diagnosis)
  try {
    const response = await pool.query('INSERT INTO visits (patient_id, symptoms, diagnosis)  values($1, $2, $3) RETURNING *', [patient_id, symptoms, diagnosis]);
    console.log(response)
    if (response.rowCount === 0) {
      return res.status(404).json({ message: "Something went wrong" });
    }
    res.status(200).json({ message: "Patient visited successfully", data: response.rows[0] });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Internal server error" });
  }
};

const allVisit = async(req, res) => {
  const {patient_id} = req.body
  try {
    const response = await pool.query('SELECT * FROM visits WHERE patient_id = $1', [patient_id]);

    if (response.rowCount === 0) {
      return res.status(404).json({ message: "No records available" });
    }
    res.status(200).json({message:"success", data:response.rows[0] });
  } catch (error) {

    res.status(500).json({ message: "Internal server error" });
  }
};
const deleteVisit = async (req, res) => {
  const { id } = req.body;

  try {
    const response = await pool.query('DELETE FROM visits WHERE id = $1 RETURNING *', [id]);

    if (response.rowCount === 0) {
      return res.status(404).json({ message: "Visit not found" });
    }
    res.status(200).json({ message: "Visit deleted successfully", visit: response.rows[0] });
  } catch (error) {

    res.status(500).json({ message: "Internal server error" });
  }
};
const visit = {
  addVisit, allVisit, deleteVisit
}
module.exports = visit;