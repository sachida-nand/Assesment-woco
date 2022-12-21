const EmployeeModel = require('../model/employeModel');
const TransactionModel = require('../model/empTransactionModel');


let employeeController = {

    addEmployeeData : async (req, res) =>{
        try{
            let {firstName, lastName} = req.body;

            firstName = firstName.toLowerCase()
            lastName = lastName.toLowerCase()

            console.log('first name', firstName);
            console.log('last name', lastName);

            await EmployeeModel.create({
                firstName:firstName,
                lastName:lastName
            }).then(async result =>{
                await employeeController.saveTransactionDetails('post')
                res.send({'status':true, 'message':'Data saved','data':result})
            }).catch(err =>{
                res.send({'status':false, 'message':err.message})
                return false;
            })    
        }catch(err){
            res.send({'status':false, 'message':err.message})
            return false;
        }
    },

    getaAllEmployeeData : async (req, res) =>{
        try{
            let EmployeeData = await EmployeeModel.find({})
            
            await employeeController.saveTransactionDetails('get');
          

            EmployeeData.forEach(ele =>{
                ele.firstName = ele.firstName.charAt(0).toUpperCase() + ele.firstName.slice(1);
                ele.lastName = ele.lastName.charAt(0).toUpperCase() + ele.lastName.slice(1);
            })
            return res.render('index.ejs', {'data':EmployeeData})
            res.send({'status':true,'data':EmployeeData})
            return true;
        }catch(err){
            res.send({'status':false, 'message':err.message})
        }
    },

    getEmployeeDataById : async (req, res) =>{
        try{
            let id = req.params.id;
            let EmployeeData = await EmployeeModel.findOne({_id:id})
            await employeeController.saveTransactionDetails('get')

            console.log(EmployeeData);


            EmployeeData.firstName = EmployeeData.firstName.charAt(0).toUpperCase() + EmployeeData.firstName.slice(1);
            EmployeeData.lastName = EmployeeData.lastName.charAt(0).toUpperCase() + EmployeeData.lastName.slice(1);

            res.send({'status':true,'data':EmployeeData})
            return true;
        }catch(err){
            res.send({'status':false, 'message':err.message})
        }
    },


    updateEmployeeData : async (req, res) =>{
        try{
            let {firstName, lastName, id} = req.body;
            console.log(req.body);

            firstName = firstName.toLowerCase()
            lastName = lastName.toLowerCase()

            let EmployeeData = await EmployeeModel.findOneAndUpdate({_id:id}, {$set:{
                firstName:firstName,
                lastName:lastName
            }}).then(async result=>{
                await employeeController.saveTransactionDetails('update')
                res.send({'status':true, 'message':'Data updated', 'data':result});
                return true
            }).catch(err =>{
                res.send({'status':false, 'message':err.message});
                return false;
            })
        }catch(err){
            res.send({'status':false, 'message':err.message})
        }
    },

    deleteEmployeData : async (req, res) =>{
        try{
            let id = req.params.id

            EmployeeModel.findByIdAndDelete({_id:id}).then(async result => {
                await employeeController.saveTransactionDetails('delete')
                res.send({'status':true, 'message':'Data has been deleted'});
                return true
            })
        }catch(err) {
            res.send({'status':false, 'message':err.message})
        }

    },


    saveTransactionDetails : async (reqType) =>{
        await TransactionModel.create({
            transactionType : reqType
        }).then(success =>{
            return true
        }).catch(err =>{
            return false;
        })
    }



}

module.exports = employeeController
