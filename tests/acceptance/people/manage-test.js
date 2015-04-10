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

test('view people', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(currentPath(), '/');
    assert.equal(find('ul.people li').length, 3);
    assert.equal(find('ul.people li:eq(0)').text(), 'Prasanna');
    assert.equal(find('ul.people li:eq(1)').text(), 'Pierre');
    assert.equal(find('ul.people li:eq(2)').text(), 'Olaf');
  });
});


test('create a person', function(assert) {
  visit('/');
  fillIn('input.name', 'Ashish');
  click('button.submit');

  andThen(function() {
    assert.equal(find('ul.people li').length, 4);
    assert.equal(find('ul.people li:eq(3)').text(), 'Ashish');
  });
});
