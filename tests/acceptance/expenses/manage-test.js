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

// Setup fixtures for expenses
import Expense from 'bounty-web-expenses/models/expense';
Expense.reopenClass({
  FIXTURES: [
    { id: 1, paidBy: 3, amount: 500 },
    { id: 2, paidBy: 1, amount: 750 }
  ]
});

var application;

module('Acceptance: ExpensesManage', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('manage expenses', function(assert) {

  // Visit the expenses page
  visit('/');

  // Check for seeded expenses
  andThen(function() {
    assert.equal(find('ul.expenses li').length, 2);
    assert.equal(find('ul.expenses li:eq(0)').text().trim(), 'Rs. 500, paid by Olaf');
    assert.equal(find('ul.expenses li:eq(1)').text().trim(), 'Rs. 750, paid by Prasanna');
  });

  // Create an expense
  fillIn('input.amount', 300);
  fillIn('select#paid-by', 2);
  click('button.submit');

  // Check if the expense has been added
  andThen(function() {
    assert.equal(find('ul.expenses li').length, 3);
    assert.equal(find('ul.expenses li:eq(2)').text().trim(), 'Rs. 300, paid by Pierre');
  });
});
