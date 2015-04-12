import MultiselectCheckboxesComponent from 'ember-multiselect-checkboxes/components/multiselect-checkboxes';

// Add the inline list class to the multiselect checkbox containing ul, for twitter bootstrap styling
export default MultiselectCheckboxesComponent.extend({
  classNames: ['list-inline']
});