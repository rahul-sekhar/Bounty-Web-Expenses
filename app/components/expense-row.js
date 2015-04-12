import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'tr',

  // Formats the list of participants to a comma separated list
  // of their names
  participantNames: function () {
    let participants = this.get('expense.participants');
    if (!participants) {
      return null;
    }
    return participants.map(function (person) {
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
