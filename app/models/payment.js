import DS from 'ember-data';

export default DS.Model.extend({
  amount: DS.attr('number'),

  from: DS.belongsTo('person', { inverse: 'paymentsMade' }),

  to: DS.belongsTo('person', { inverse: 'paymentsReceived' }),

  createdAt: DS.attr('number')
});
