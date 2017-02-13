var mongoose = require('mongoose');

var BudgetSchema = new mongoose.Schema({
    userId: String,
    lastUpdated: Date,
    budgetItems: [{
      name: String,
      category: String,
      initialDate: Date,
      period: String,
      frequency: Number,
      instances:[{
        date: Date,
        amount: Number,
        active: Boolean
      }],
      amount: Number
    }],
    accounts: [{
      name: String,
      accountType: String,
      currentBalance: Number
    }]
}, 
{ collection: 'AccountData' });

var BudgetModel = mongoose.model('BudgetModel', BudgetSchema);

module.exports = BudgetModel;