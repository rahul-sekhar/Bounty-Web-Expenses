import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'tr',

  roundedBalance: function () {
    return this.get('person.balance').toFixed(2);
  }.property('person.balance')
});
