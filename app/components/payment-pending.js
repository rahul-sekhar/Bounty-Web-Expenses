import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',

  roundedAmount: function () {
    return this.get('payment.amount').toFixed(2);
  }.property('payment.amount')
});
