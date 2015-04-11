import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'tr',
  participantNames: function () {
    return this.get('expense.participants').map(function (person) {
      return person.get('name');
    }).join(', ');
  }.property('expense.participants.[]')
});