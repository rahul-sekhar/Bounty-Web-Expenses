import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function () {
    this.transitionTo('expenses.summary');
  },

  setupController: function(controller, models) {
    controller.set('expenses', models.expenses);
    controller.set('people', models.people);
  }
});
