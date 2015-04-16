import {
  moduleForModel,
  test
} from 'ember-qunit';

import Ember from 'ember';

moduleForModel('person', {
  needs: ['model:expense', 'model:payment']
});

test('it exists', function(assert) {
  var model = this.subject();
  assert.ok(!!model);
});

test('balance computed property', function(assert) {
  var store = this.store(),
    model = this.subject();

  // With no expenses
  assert.equal(model.get('balance'), 0);

  // With expenses
  var person1, person2, expense1, expense2, expense3, expense4, payment1, payment2;
  Ember.run(function () {
    person1 = store.createRecord('person', { name: 'Person 1' });
    person2 = store.createRecord('person', { name: 'Person 2' });

    expense1 = store.createRecord('expense', {amount: 50, paidBy: model});
    expense1.get('participants').addObjects([model, person1]);

    expense2 = store.createRecord('expense', {amount: 30, paidBy: model});
    expense2.get('participants').addObjects([model, person1, person2]);

    expense3 = store.createRecord('expense', {amount: 40, paidBy: person1});
    expense3.get('participants').addObjects([model, person1]);

    expense4 = store.createRecord('expense', {amount: 15, paidBy: person2});
    expense4.get('participants').addObjects([model, person1, person2]);

    payment1 = store.createRecord('payment', { from: model, to: person1, amount: 50 });
    payment2 = store.createRecord('payment', { from: person2, to: model, amount: 100 });
  });

  assert.equal(model.get('balance'), -30);
});

test('deletion of dependencies', function(assert) {
  var store = this.store(),
    model = this.subject();

  // Setup expenses
  var person1, person2, expense1, expense2, expense3, expense4, payment1, payment2;
  Ember.run(function () {
    person1 = store.createRecord('person', { name: 'Person 1' });
    person2 = store.createRecord('person', { name: 'Person 2' });

    expense1 = store.createRecord('expense', {amount: 50, paidBy: model});
    expense1.get('participants').addObjects([model, person1]);

    expense2 = store.createRecord('expense', {amount: 30, paidBy: model});
    expense2.get('participants').addObjects([model, person1, person2]);

    expense3 = store.createRecord('expense', {amount: 40, paidBy: person1});
    expense3.get('participants').addObjects([model, person1]);

    expense4 = store.createRecord('expense', {amount: 15, paidBy: person2});
    expense4.get('participants').addObjects([model, person1, person2]);

    payment1 = store.createRecord('payment', { from: model, to: person1, amount: 50 });
    payment2 = store.createRecord('payment', { from: person2, to: model, amount: 100 });
  });

  Ember.run(function () {
    // Delete the record
    model.deleteRecord();
  });

  // The record should be deleted
  assert.ok(model.get('isDeleted'));

  // Payments made and received should get deleted
  assert.ok(payment1.get('isDeleted'));
  assert.ok(payment2.get('isDeleted'));

  // The expenses paid should be deleted
  assert.ok(expense1.get('isDeleted'));
  assert.ok(expense2.get('isDeleted'));

  // The expenses owed should not be deleted
  assert.ok(!expense3.get('isDeleted'));
  assert.ok(!expense4.get('isDeleted'));

  // The expenses owed should have the record removed from their participants
  assert.equal(expense3.get('participants').length, 1);
  assert.equal(expense4.get('participants').length, 2);

  // Test fails because it unloads records at the end
  // that are inFlight. Need to find a way around this
});