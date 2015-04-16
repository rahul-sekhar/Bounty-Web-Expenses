import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),

  expensesPaid: DS.hasMany('expense', { inverse: 'paidBy', async: true }),

  expensesOwed: DS.hasMany('expense', { inverse: 'participants', async: true }),

  paymentsMade: DS.hasMany('payment', { inverse: 'from', async: true }),

  paymentsReceived: DS.hasMany('payment', { inverse: 'to', async: true }),

  // The balance property is calculated from the expenses paid, expenses owed and payments made and received
  balance: function () {
    let balance = 0;

    // Add paid expenses to the balance
    this.get('expensesPaid').forEach(function (expense) {
      balance += expense.get('amount');
    });

    // Subtract owed expenses from the balance
    this.get('expensesOwed').forEach(function (expense) {
      balance -= expense.get('amount') / expense.get('participants').length;
    });

    // Subtract payments received from the balance
    this.get('paymentsReceived').forEach(function (payment) {
      balance -= payment.get('amount');
    });

    // Add payments made to the balance
    this.get('paymentsMade').forEach(function (payment) {
      balance += payment.get('amount');
    });

    // Return the balance
    return balance;
  }.property('expensesPaid.@each.amount,expensesOwed.@each.amount,paymentsMade.@each.amount,paymentsReceived.@each.amount'),

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
