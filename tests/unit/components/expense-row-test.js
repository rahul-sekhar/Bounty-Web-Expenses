import {
  moduleForComponent,
  test
} from 'ember-qunit';

import Ember from 'ember';

moduleForComponent('expense-row', {
  // Specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar']
});

test('it renders', function(assert) {
  assert.expect(2);

  // Creates the component instance
  var component = this.subject();
  assert.equal(component._state, 'preRender');

  // Renders the component to the page
  this.render();
  assert.equal(component._state, 'inDOM');
});

test('participantNames computed property', function (assert) {
  var component = this.subject();

  // Mock expense participants
  component.set('expense', {
    participants: [
      Ember.Object.create({ name: 'Asha' }),
      Ember.Object.create({ name: 'Gayatri' }),
      Ember.Object.create({ name: 'Brigita' })
    ]
  });

  // Check for comma separated list of names
  assert.equal(component.get('participantNames'), 'Asha, Gayatri, Brigita');
});

test('deleteExpense action', function (assert) {
  var component = this.subject();

  // Mock expense
  var expense = {
    deleteRecord: sinon.spy(),
    save: sinon.spy()
  };
  component.set('expense', expense);

  // Run the action
  component.send('deleteExpense');

  // It deletes the record
  assert.ok(expense.deleteRecord.calledOnce);

  // It saves the deletion on the server
  assert.ok(expense.save.calledOnce);
});
