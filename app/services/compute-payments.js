// This module provides a function that will compute
// the payments required to settle accounts given an
// array of people models.
// An array of payment objects is returned, each
// containing a 'from' person, 'to' person and an
// amount

// Class storing each persons temporary balance for computation
function BalanceObject (person) {
  this.person = person;
  this.balance = person.get('balance');

  this.canBeClearedFrom = function(balanceObject) {
    var balanceAfter = this.balance + balanceObject.balance;

    // Return true if the balance after clearing is lower
    // in magnitude than the balance before clearing
    return (Math.abs(balanceAfter) - Math.abs(balanceObject.balance) < 0.001);
  };

  this.clearFrom = function(balanceObject) {
    // Adjust balance
    balanceObject.balance += this.balance;

    // Return a payment object
    if (this.balance > 0) {
      return {
        from: balanceObject.person,
        to: this.person,
        amount: Math.abs(this.balance)
      };
    } else {
      return {
        from: this.person,
        to: balanceObject.person,
        amount: Math.abs(this.balance)
      };
    }
  };

  // Check an array of balance objects and
  // find the first one that can clear this balance object
  this.clearBalanceFrom = function(balanceObjects) {
    for (var i=0; i<balanceObjects.length; i++) {
      var object = balanceObjects[i];
      if (this.canBeClearedFrom(object)) {
        return this.clearFrom(object);
      }
    }
  };
}

// Construction of a balance object from a person
function getBalanceObject (person) {
  return new BalanceObject(person);
}

// Function to sort balance objects by ascending balance amount
function compareBalanceObjects(a, b) {
  return (Math.abs(a.balance) - Math.abs(b.balance));
}

var computePayments = function (peopleArray) {
  var payments = [];
  var balanceObjects = peopleArray.map(getBalanceObject);

  // Clear empty balance objects
  balanceObjects = balanceObjects.filter(function (object) {
    return object.balance !== 0;
  });

  // Clear out balance objects until there is just one left
  while (balanceObjects.length > 1) {

    // Pick the lowest balance
    balanceObjects.sort(compareBalanceObjects);
    let currentObject = balanceObjects.shift();

    // Clear the balance from the remaining balance objects
    let payment = currentObject.clearBalanceFrom(balanceObjects);
    if (payment) {
      // Add the returned payment object to the array of payments
      payments.push(payment);
    }
  }

  return payments;
};

export default computePayments;