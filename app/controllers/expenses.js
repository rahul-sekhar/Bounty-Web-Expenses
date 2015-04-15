import Ember from 'ember';

export default Ember.Controller.extend({
  // Alias the list of people from the parent controller
  needs: 'application',
  people: Ember.computed.alias('controllers.application.people'),

  // Use an observer to modify the participants array when the list
  // of people is modified, and on initialise
  setParticipants: function () {
    let people = this.get('people');
    if (!people) {
      return;
    }
    this.set('participants', people.content.copy());
  }.observes('people.[]').on('init'),

  participants: [],

  invalidAmount: false,

  invalidDescription: false,

  actions: {
    addExpense: function () {
      var invalid = false;

      // Reset invalid fields
      this.set('invalidAmount', false);
      this.set('invalidDescription', false);

      // Ensure that amount is a positive integer
      var amount = parseInt(this.get('amount'), 10);
      if (amount <= 0 || isNaN(amount)) {
        this.set('invalidAmount', true);
        invalid = true;
      }

      // Ensure that the description is present
      var description = this.get('description');
      if (!description || !description.trim()) {
        this.set('invalidDescription', true);
        invalid = true;
      }

      // Exit the function if we have invalid fields
      if (invalid) {
        return;
      }

      // Load the paidBy person model by id
      var paidByModel = this.get('people')
        .findBy('id', this.get('paidBy'));

      // Create a new expense model
      let newExpense = this.store.createRecord('expense', {
        description: description,
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
        description: '',
        amount: '',
        participants: this.get('people').content.copy()
      });
    }
  }
});
