import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    addExpense: function () {

      // Load the paidBy person model by id
      var paidByModel = this.get('people')
        .findBy('id', this.get('paidBy'));

      // Create and save a new expense model
      let newExpense = this.store.createRecord('expense', {
        amount: this.get('amount'),
        paidBy: paidByModel
      });
      newExpense.save();

      // Clear inputs
      this.setProperties({
        'amount': '',
        'paidBy': ''
      });
    }
  }
});
