import Ember from 'ember';

export default Ember.Controller.extend({
  paymentsPending: function () {
    let payments = [];

    let balances = this.get('model.people').map(function (person) {
      return { person: person, balance: person.get('balance') };
    });

    // Clear out at least one balance on each iteration
    for (var i=0; i<balances.length; i++) {
      // Sort people from the lowest absolute balance amount to highest
      balances.sort(function (a, b) {
        return (Math.abs(a.balance) - Math.abs(b.balance));
      });

      // Skip to the next iteration if this person has no balance to clear
      let balanceToBeCleared = balances[i].balance;
      if (!balanceToBeCleared) {
        continue;
      }

      // Find the first balance that can be used to clear this
      for (var j=i+1; j<balances.length; j++) {
        let balanceToCheck = balances[j].balance;

        // Check whether the balance can be cleared by balanceToCheck
        // Checking with a delta to account for float inaccuracies
        if (Math.abs(balanceToCheck + balanceToBeCleared) - Math.abs(balanceToCheck) < 0.001) {

          // Set up the payment
          if (balanceToCheck > balanceToBeCleared) {
            payments.push({
              from: balances[i].person,
              to: balances[j].person,
              amount: Math.abs(balanceToBeCleared)
            });
          } else {
            payments.push({
              from: balances[j].person,
              to: balances[i].person,
              amount: Math.abs(balanceToBeCleared)
            });
          }

          // Adjust balances
          balances[i].balance -= balanceToBeCleared;
          balances[j].balance += balanceToBeCleared;

          break;
        }
      }
    }

    return payments;
  }.property('model.people.@each.balance')
});
