// routes/api.js
const express = require('express');

const EmployeeController = require('../Controller/EmployeeController');

const router = express.Router();

router.get('/employees/avg-salary', EmployeeController.getAverageSalaryByDepartment);
router.get('/employees/avg-salary-group-depart', EmployeeController.getAverageSalaryGroupedDeprt);
router.get('/employees/search', EmployeeController.searchBySkill);

router.post('/employees', EmployeeController.createEmployee);
router.get('/employees', EmployeeController.getEmployees);
router.get('/employees/:id', EmployeeController.getEmployeeById);
router.put('/employees/:id', EmployeeController.updateEmployee);
router.delete('/employees/:id', EmployeeController.deleteEmployee);



// Register Route

module.exports = router;
