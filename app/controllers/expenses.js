import Ember from 'ember';

export default Ember.Controller.extend({
  // Alias the list of people from the parent controller
  needs: 'application',
  people: Ember.computed.alias('controllers.application.people'),

  // Use an observer to modify the participants array when the list
  // of people is modified, and on initialise
  setParticipants: function () {
    console.log('hai');
    this.set('participants', this.get('people').content.copy());
  }.observes('people.[]').on('init'),

  participants: [],

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
