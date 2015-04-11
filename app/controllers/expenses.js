import Ember from 'ember';

export default Ember.Controller.extend({
  needs: 'application',

  people: Ember.computed.alias('controllers.application.people'),

  participants: function () {
    return(this.get('people').content.copy());
  }.property('people.[]'),

  invalidAmount: false,

  actions: {
    addExpense: function () {

      // Ensure that amount is a positive integer
      var amount = parseInt(this.get('amount'), 10);
      if (!(amount > 0)) {
        this.set('invalidAmount', true);
        return;
      }

      // Load the paidBy person model by id
      var paidByModel = this.get('people')
        .findBy('id', this.get('paidBy'));

      // Create a new expense model
      let newExpense = this.store.createRecord('expense', {
        amount: amount,
        paidBy: paidByModel,
        createdAt: new Date().getTime()
      });

      // Add all people as participants
      newExpense.get('participants').pushObjects(this.get('participants'));

      // Save the expense
      newExpense.save();

      // Load the expenses list page
      this.transitionToRoute('expenses.list');

      // Clear inputs
      this.setProperties({
        invalidAmount: false,
        amount: '',
        participants: this.get('people').content.copy()
      });
    }
  }
});
