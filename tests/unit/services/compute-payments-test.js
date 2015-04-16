import {
  moduleFor,
  test
} from 'ember-qunit';

import Ember from 'ember';

import computePayments from 'bounty-web-expenses/services/compute-payments';

function createPerson(balance) {
  return Ember.Object.create({
    balance: balance
  });
}

function hasPayment(payments, from, to, amount) {
  for(var i=0; i<payments.length; i++) {
    if (payments[i].from === from &&
      payments[i].to === to &&
      payments[i].amount === amount
      ) {
      payments.splice(i, 1);
      return true;
    }
  }
  return false;
}

test('with two people', function (assert) {
  var person1 = createPerson(500);
  var person2 = createPerson(-500);

  var payments = computePayments([person1, person2]);

  assert.equal(payments.length, 1);
  assert.ok(hasPayment(payments, person2, person1, 500));
  assert.equal(payments.length, 0);
});

test('with three people', function (assert) {
  var person1 = createPerson(200);
  var person2 = createPerson(-300);
  var person3 = createPerson(100);

  var payments = computePayments([person1, person2, person3]);

  assert.equal(payments.length, 2);
  assert.ok(hasPayment(payments, person2, person1, 200));
  assert.ok(hasPayment(payments, person2, person3, 100));
  assert.equal(payments.length, 0);
});

test('with four people', function (assert) {
  var person1 = createPerson(-50);
  var person2 = createPerson(85);
  var person3 = createPerson(10);
  var person4 = createPerson(-45);

  var payments = computePayments([person1, person2, person3, person4]);

  assert.equal(payments.length, 3);
  assert.ok(hasPayment(payments, person1, person2, 50));
  assert.ok(hasPayment(payments, person4, person2, 35));
  assert.ok(hasPayment(payments, person4, person3, 10));
  assert.equal(payments.length, 0);
});