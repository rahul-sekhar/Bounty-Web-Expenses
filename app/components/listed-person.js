import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    deletePerson: function () {
      let person = this.get('person');
      person.deleteRecord();
      person.save();
    }
  }
});
