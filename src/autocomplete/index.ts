import { alias, tag, Events, Selectors, Store, Tag } from '@storefront/core';

@alias('autocomplete')
@tag('gb-sayt-autocomplete', require('./index.html'))
class Autocomplete {

  constructor() {
    const state = this.flux.store.getState();
    const suggestions = Selectors.autocompleteSuggestions(state);
    const category = Selectors.autocompleteCategoryField(state);
    const categoryValues = Selectors.autocompleteCategoryValues(state);
    const navigations = Selectors.autocompleteNavigations(state);
    this.state = { suggestions, navigations, category, categoryValues, selected: -1 };
  }

  init() {
    this.services.autocomplete.registerAutocomplete(this);
    this.flux.on(Events.AUTOCOMPLETE_SUGGESTIONS_UPDATED, this.updateSuggestions);
    this.flux.on('sayt:activate_next', this.activateNext);
    this.flux.on('sayt:activate_previous', this.activatePrevious);
    this.flux.on('sayt:select_active', this.selectActive);
  }

  activationTargets() {
    return this.root.querySelectorAll('.gb-autocomplete-target');
  }

  activateNext = () => {
    const targets = this.activationTargets();
    let selected = this.state.selected;
    if (selected < targets.length - 1) {
      if (this.isActive()) {
        this.setActivation(targets, selected, false);
      }
      this.setActivation(targets, ++selected, true);
    }
  }

  activatePrevious = () => {
    const targets = this.activationTargets();
    if (this.isActive()) {
      let selected = this.state.selected;
      this.setActivation(targets, selected, false);
      if (--selected !== -1) {
        this.setActivation(targets, selected, true);
      }
    }
  }

  selectActive = () => {
    if (this.isActive()) {
      this.activationTargets()[this.state.selected].querySelector('a').click();
      this.set({ selected: -1 });
    }
  }

  updateSuggestions = ({ suggestions, navigations, category: { values: categoryValues } }: Store.Autocomplete) => {
    if (this.isActive()) {
      this.setActivation(this.activationTargets(), this.state.selected, false);
    }
    this.set({ suggestions, navigations, categoryValues, selected: -1 });
    if (suggestions.length + navigations.length + categoryValues.length === 0) {
      this.flux.emit('sayt:hide');
    } else {
      this.flux.emit('sayt:show');
    }
  }

  setActivation(targets: NodeListOf<Element>, index: number, activate: boolean) {
    targets[index].classList[activate ? 'add' : 'remove']('gb-active');
    if (activate) {
      this.state.selected = index;
    }
  }

  isActive() {
    return this.state.selected !== -1;
  }
}

interface Autocomplete extends Tag<any, Autocomplete.State> { }
namespace Autocomplete {
  export interface State {
    selected: number;
    category: string;
    categoryValues: string[];
    suggestions: Store.Autocomplete.Suggestion[];
    navigations: Store.Autocomplete.Navigation[];
  }
}

export default Autocomplete;
