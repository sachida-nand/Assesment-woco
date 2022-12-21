let express = require('express');
let router = express.Router();
let EmployeeController = require('../controller/employeeController')

router.post('/employee', EmployeeController.addEmployeeData);
router.get('/employee', EmployeeController.getaAllEmployeeData);
router.get('/employee/:id', EmployeeController.getEmployeeDataById);
router.patch('/employee', EmployeeController.updateEmployeeData);
router.delete('/employee/:id', EmployeeController.deleteEmployeData);

module.exports = router;
