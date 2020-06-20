const express = require("express");
const router = express.Router();
const calculateSalaryFrom = require("./helpers/salary");

router.get("/salario/:salario", async (req, res) => {
  try {
    const value = req.params.salario;
    const salaryObject = calculateSalaryFrom(value);
    return res.json(salaryObject);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

module.exports = router;
