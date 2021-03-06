import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',

  classNames: ['list-group-item'],

  roundedAmount: function () {
    return this.get('payment.amount').toFixed(2);
  }.property('payment.amount'),

  actions: {
    makePayment: function () {
      this.sendAction('action', this.get('payment'));
    }
  }
});
