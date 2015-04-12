import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),

  expensesPaid: DS.hasMany('expense', { inverse: 'paidBy', async: true }),

  expensesOwed: DS.hasMany('expense', { inverse: 'participants', async: true }),

  // The balance property is calculated from the expenses paid by the person, and the expenses owed by him
  balance: function () {
    let balance = 0;

    // Add paid expenses to the balance
    this.get('expensesPaid').forEach(function (expense) {
      balance += parseInt(expense.get('amount'), 10);
    });

    // Remove owed expenses from the balance
    this.get('expensesOwed').forEach(function (expense) {
      balance -= parseInt(expense.get('amount'), 10) / expense.get('participants').length;
    });

    // Return the balance, formatted to two decimal places
    return balance.toFixed(2);
  }.property('expensesPaid.@each.amount,expensesOwed.@each.amount'),

  // Handle dependencies on destruction
  deleteRecord: function () {
    // Delete any expenses paid by this person
    this.get('expensesPaid').toArray().forEach(function (item) {
      item.deleteRecord();
      item.save();
    });

    // Remove this person as a participant from all expenses
    this.get('expensesOwed').toArray().forEach(function (item) {
      item.get('participants').removeObject(this);
      item.save();
    });

    // Delete this record
    this._super();
  }
});
