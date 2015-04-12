import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function () {
    // Redirect from root to the expense summary page
    this.transitionTo('expenses.summary');
  }
});
