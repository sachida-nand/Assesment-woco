var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var employeeSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        }
    },
    {
        collection: 'employee',
        versionKey: false,
        timestamps: true,
    }
);


var Employee = mongoose.model('employee', employeeSchema);

module.exports = Employee
