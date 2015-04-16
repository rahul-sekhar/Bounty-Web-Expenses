import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'tr',

  roundedAmount: function () {
    return this.get('payment.amount').toFixed(2);
  }.property('payment.amount'),

  actions: {
    deletePayment: function () {
      let payment = this.get('payment');
      payment.deleteRecord();
      payment.save();
    }
  }
});
