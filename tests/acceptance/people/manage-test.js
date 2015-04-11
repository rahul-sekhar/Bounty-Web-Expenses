import Ember from 'ember';
import {
  module,
  test
} from 'qunit';
import startApp from 'bounty-web-expenses/tests/helpers/start-app';

// Setup fixtures for people
import Person from 'bounty-web-expenses/models/person';
Person.reopenClass({
  FIXTURES: [
    { id: 1, name: 'Prasanna' },
    { id: 2, name: 'Pierre' },
    { id: 3, name: 'Olaf' }
  ]
});

var application;

module('Acceptance: PeopleManage', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('manage the list of people', function(assert) {

  // Visit the people page
  visit('/people');

  // Check for seeded people
  andThen(function() {
    assert.equal(find('ul.people li').length, 3);
    assert.equal(find('ul.people li:eq(0) .name').text(), 'Prasanna');
    assert.equal(find('ul.people li:eq(1) .name').text(), 'Pierre');
    assert.equal(find('ul.people li:eq(2) .name').text(), 'Olaf');
  });

  // Create a person
  fillIn('input.name', 'Ashish');
  click('button.submit');

  // Check if the person has been added
  andThen(function() {
    assert.equal(find('ul.people li').length, 4);
    assert.equal(find('ul.people li:eq(3) .name').text(), 'Ashish');
  });

  // Try creating a person with no name
  fillIn('input.name', '');
  click('button.submit');

  // Ensure no person has been added
  andThen(function() {
    assert.equal(find('ul.people li').length, 4);
  });

  // Delete a person
  click('ul.people li:contains(Pierre) .delete');

  // Confirm deletion
  andThen(function() {
    assert.equal(find('ul.people li').length, 3);
    assert.equal(find('ul.people li:eq(0) .name').text(), 'Prasanna');
    assert.equal(find('ul.people li:eq(1) .name').text(), 'Olaf');
    assert.equal(find('ul.people li:eq(2) .name').text(), 'Ashish');
  });
});
