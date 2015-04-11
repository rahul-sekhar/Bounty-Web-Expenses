import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    addExpense: function () {

      // Load the paidBy person model by id
      var paidByModel = this.get('people')
        .findBy('id', this.get('paidBy'));

      // Create a new expense model
      let newExpense = this.store.createRecord('expense', {
        amount: this.get('amount'),
        paidBy: paidByModel,
      });

      // Add all people as participants
      newExpense.get('participants').pushObjects(this.get('people'));

      // Save the expense
      newExpense.save();

      // Clear inputs
      this.setProperties({
        'amount': '',
        'paidBy': ''
      });
    }
  }
});
