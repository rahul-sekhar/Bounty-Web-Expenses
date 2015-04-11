import Ember from 'ember';

export default Ember.Route.extend({
  setupController: function(controller, models) {
    controller.set('model', models.expenses);
  }
});
