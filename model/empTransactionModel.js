var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var transactionSchema = new Schema(
    {
        transactionType: {
            type: String,
            enum : ['get', 'post', 'update', 'delete'],
            required: true
        }
    },
    {
        collection: 'transaction',
        versionKey: false,
        timestamps: true,
    }
);


var Transaction = mongoose.model('transaction', transactionSchema);

module.exports = Transaction
