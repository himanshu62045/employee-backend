// Controller/EmployeeController.js
const Employee = require('../Model/Employee');

//Create Employee ---
exports.createEmployee = async (req, res) => {
    try {
      const existingEmployee = await Employee.findOne({ employee_id: req.body.employee_id });
      if (existingEmployee) {
        return res.status(400).send({
          success: false,
          message: `Employee with ID '${req.body.employee_id}' already exists`
        });
      }
      const employee = new Employee(req.body);
      await employee.save();
      res.status(201).send({
        success: true,
        message: "Employee created successfully",
      });
    } catch (err) {
      res.status(400).send({
        success: false,
        message: "Failed to create employee",
        error: err.message
      });
    }
  };
  
  

//Get Employee by ID
exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.send(employees);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).send({ error: 'Employee not found' });
    res.send(employee);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

// Update employee
exports.updateEmployee = async (req, res) => {
    try {
      const employee = await Employee.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true } );
  
      if (!employee) {
        return res.status(404).send({
          success: false,
          message: 'Employee not found'
        });
      }
      res.status(200).send({
        success: true,
        message: 'Employee updated successfully',
      });
    } 
    catch (err) {
      res.status(400).send({
        success: false,
        message: 'Failed to update employee',
        error: err.message
      });
    }
  };
  

// Delete employee
exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee)
     return res.status(404).send({   success: false, error: 'Employee not found' });
     res.status(200).send({
        success: true,
        message: 'Employee Deleted successfully',
      });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};


// 5. List Employees by Department (sorted by joining_date DESC)
exports.getEmployeesByDepartment = async (req, res) => {
    try {
      const { department } = req.query;
      if (!department) {
        return res.status(400).send({
          success: false,
          message: "Department query parameter is required"
        });
      }
      const employees = await Employee.find({ department })
        .sort({ joining_date: -1 }); 
      res.status(200).send({
        success: true,
        message: `Employees from department '${department}' sorted by joining_date (newest first)`,
        data: employees
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: "Failed to fetch employees",
        error: err.message
      });
    }
  };
  



  // 6. Average Salary by Department
exports.getAverageSalaryByDepartment = async (req, res) => {
    try {
      const result = await Employee.aggregate([
        {
          $group: {
            _id: "$department",
            averageSalary: { $avg: "$salary" },
            totalEmployees: { $sum: 1 }
          }
        },
        {
          $sort: { averageSalary: -1 } 
        }
      ]);
      res.status(200).send({
        success: true,
        message: "Average salary by department",
        data: result.map(dept => ({
          department: dept._id,
          averageSalary: Math.round(dept.averageSalary),
          totalEmployees: dept.totalEmployees
        }))
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: "Failed to calculate average salary",
        error: err.message
      });
    }
  };
  


  // Average Salary grouped by Department
exports.getAverageSalaryGroupedDeprt = async (req, res) => {
    try {
      const result = await Employee.aggregate([
        {
          $group: {
            _id: "$department",
            avg_salary: { $avg: "$salary" }
          }
        },
        {
          $project: {
            _id: 0,
            department: "$_id",
            avg_salary: { $round: ["$avg_salary", 0] } // round to nearest integer
          }
        }
      ]);
  
      res.status(200).send(result);
    } catch (err) {
      res.status(500).send({
        error: err.message
      });
    }
  };
  

  // Search Employees by Skill
exports.searchBySkill = async (req, res) => {
    try {
      const { skill } = req.query;
  
      if (!skill) {
        return res.status(400).send({
          success: false,
          message: "Skill query parameter is required"
        });
      }
      const employees = await Employee.find({ skills: skill });
      res.status(200).send({
        success: true,
        message: `Employees with skill '${skill}'`,
        data: employees
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: "Failed to fetch employees by skill",
        error: err.message
      });
    }
  };
  