import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

export default Router.map(function() {
  this.route('people');
  this.route('expenses', function () {
    this.route('summary');
    this.route('list');
    this.route('payments');
  });
});
