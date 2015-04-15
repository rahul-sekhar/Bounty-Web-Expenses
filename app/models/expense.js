import DS from 'ember-data';

export default DS.Model.extend({
  description: DS.attr('string'),

  amount: DS.attr('number'),

  paidBy: DS.belongsTo('person', { inverse: 'expensesPaid' }),

  participants: DS.hasMany('person', { inverse: 'expensesOwed' }),

  createdAt: DS.attr('number')
});
