import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    addPerson: function () {
      // Do nothing if name is blank
      if (!this.get('name')) {
        return;
      }

      // Create and save a new person model
      let newPerson = this.store.createRecord('person', {
        name: this.get('name')
      });
      newPerson.save();

      // Clear inputs
      this.setProperties({
        'name': ''
      });
    }
  }
});
