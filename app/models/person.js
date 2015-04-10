import DS from 'ember-data';

let Person = DS.Model.extend({
  name: DS.attr('string')
});

export default Person;
