import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('person', {
  needs: ['model:expense']
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});
