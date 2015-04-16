import Ember from 'ember';
import computePayments from 'bounty-web-expenses/services/compute-payments';

export default Ember.Controller.extend({
  paymentsPending: function () {
    return computePayments(this.get('model.people'));
  }.property('model.people.@each.balance')
});
