import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  expensesPaid: DS.hasMany('expense', { async: true })
});
