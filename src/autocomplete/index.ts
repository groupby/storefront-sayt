import { tag, Events, Store, Tag } from '@storefront/core';

@tag('gb-sayt-autocomplete', require('./index.html'))
class Autocomplete {

  state: Autocomplete.State = {
    categoryValues: [],
    suggestions: []
  };

  init() {
    this.expose('autocomplete');
    // TODO register with autocomplete service (sayt service?) so it only runs if tags exist
    this.flux.on(Events.AUTOCOMPLETE_UPDATED, this.updateSuggestions);
  }

  // TODO decide on suggestions or searchTerms
  updateSuggestions = ({ suggestions, category: { values: categoryValues } }: Store.Autocomplete) =>
    this.set({ suggestions, categoryValues })
}

interface Autocomplete extends Tag<any, Autocomplete.State> { }
namespace Autocomplete {
  export interface State {
    categoryValues: string[];
    suggestions: string[];
  }
}

export default Autocomplete;
