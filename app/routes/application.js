import Ember from 'ember';

export default Ember.Route.extend({
  model: function () {
    return Ember.RSVP.hash({
      expenses: this.store.find('expense'),
      people: this.store.find('person'),
      payments: this.store.find('payment')
    });
  },

  setupController: function(controller, models) {
    controller.set('expenses', models.expenses);
    controller.set('people', models.people);
    controller.set('payments', models.payments);
  }
});
