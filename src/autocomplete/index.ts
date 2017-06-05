import { alias, tag, Events, Store, Tag } from '@storefront/core';

@alias('autocomplete')
@tag('gb-sayt-autocomplete', require('./index.html'))
class Autocomplete {

  state: Autocomplete.State = {
    category: this.flux.store.getState().data.autocomplete.category.field,
    categoryValues: this.flux.store.getState().data.autocomplete.category.values,
    suggestions: this.flux.store.getState().data.autocomplete.suggestions,
    navigations: this.flux.store.getState().data.autocomplete.navigations
  };

  init() {
    // TODO register with autocomplete service (sayt service?) so it only runs if tags exist
    this.flux.on(Events.AUTOCOMPLETE_SUGGESTIONS_UPDATED, this.updateSuggestions);
  }

  updateSuggestions = ({ suggestions, navigations, category: { values: categoryValues } }: Store.Autocomplete) => {
    this.set({ suggestions, navigations, categoryValues });
  }
}

interface Autocomplete extends Tag<any, Autocomplete.State> { }
namespace Autocomplete {
  export interface State {
    category: string;
    categoryValues: string[];
    suggestions: string[];
    navigations: Store.Autocomplete.Navigation[];
  }
}

export default Autocomplete;
