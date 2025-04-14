const pool = require('../db')

const addPrescription = async (req, res) => {
  const { visit_id, medicine_name, dosage} = req.body;
  console.log(visit_id, medicine_name, dosage)

  try {
    const response = await pool.query('INSERT INTO prescriptions (visit_id, medicine_name, dosage)  values($1, $2, $3) RETURNING *', [visit_id, medicine_name, dosage]);
    console.log(response)
    if (response.rowCount === 0) {
      return res.status(404).json({ message: "Something went wrong" });
    }
    res.status(200).json({ message: "Patient prescribed successfully", data: response.rows[0] });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Internal server error" });
  }
};

const allPrescription = async(req, res) => {
  const {visit_id} = req.body
  console.log(visit_id)
  try {
    const response = await pool.query('SELECT * FROM prescriptions WHERE visit_id = $1', [visit_id]);

    if (response.rowCount === 0) {
      return res.status(404).json({ message: "No records available" });
    }
    res.status(200).json({message:"success", data:response.rows[0] });
  } catch (error) {

    res.status(500).json({ message: "Internal server error" });
  }
};

const deletePrescription = async (req, res) => {
  const { id } = req.body;

  try {
    const response = await pool.query('DELETE FROM prescriptions WHERE id = $1 RETURNING *', [id]);

    if (response.rowCount === 0) {
      return res.status(404).json({ message: "Prescription not found" });
    }
    res.status(200).json({ message: "Prescription deleted successfully", prescription: response.rows[0] });
  } catch (error) {

    res.status(500).json({ message: "Internal server error" });
  }
};
const Prescription = {
  addPrescription, allPrescription, deletePrescription
}
module.exports = Prescription;