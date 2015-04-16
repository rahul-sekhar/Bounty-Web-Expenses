import Ember from 'ember';

export default Ember.Route.extend({
  setupController: function(controller, models) {
    // Load model from the parent controller
    controller.set('model', models.payments);
  }
});
