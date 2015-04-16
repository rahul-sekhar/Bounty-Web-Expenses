import Ember from 'ember';
import computePayments from 'bounty-web-expenses/services/compute-payments';

export default Ember.Controller.extend({
  paymentsPending: function () {
    return computePayments(this.get('model.people'));
  }.property('model.people.@each.balance'),

  actions: {
    makePayment: function (payment) {
      // Create a payment model
      let newPayment = this.store.createRecord('payment', {
        from: payment.from,
        to: payment.to,
        amount: payment.amount
      });

      // Save the payment
      newPayment.save();

      // Load the payments list page
      this.transitionToRoute('expenses.payments');
    }
  }
});
