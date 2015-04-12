import {
  moduleForComponent,
  test
} from 'ember-qunit';

moduleForComponent('listed-person', {
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

test('deletePerson action', function (assert) {
  var component = this.subject();

  // Mock person
  var person = {
    deleteRecord: sinon.spy(),
    save: sinon.spy()
  };
  component.set('person', person);

  // Run the action
  component.send('deletePerson');

  // It deletes the record
  assert.ok(person.deleteRecord.calledOnce);

  // It saves the deletion on the server
  assert.ok(person.save.calledOnce);
});
