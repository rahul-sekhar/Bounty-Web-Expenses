import Ember from 'ember';

export default Ember.Route.extend({
  model: function () {
    return Ember.RSVP.hash({
      expenses: this.store.find('expense'),
      people: this.store.find('person'),
    });
  },

  setupController: function(controller, models) {
    controller.set('expenses', models.expenses);
    controller.set('people', models.people);
  }
});
