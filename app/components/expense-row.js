import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'tr',

  // Formats the list of participants to a comma separated list
  // of their names
  participantNames: function () {
    return this.get('expense.participants').map(function (person) {
      return person.get('name');
    }).join(', ');
  }.property('expense.participants.[]'),

  actions: {
    deleteExpense: function () {
      let expense = this.get('expense');
      expense.deleteRecord();
      expense.save();
    }
  }
});
