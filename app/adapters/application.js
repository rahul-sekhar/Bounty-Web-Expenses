import config from '../config/environment';
import DS from 'ember-data';
import Firebase from 'firebase';
import FirebaseAdapter from 'emberfire/adapters/firebase';

let adapter;

if (config.environment === 'test') {

  // Load the fixture adapter if we're testing
  adapter = DS.FixtureAdapter.extend();
} else {

  // For non test-environments, load the firebase adapter
  adapter = FirebaseAdapter.extend({
    firebase: new Firebase(config.firebase)
  });
}

export default adapter;