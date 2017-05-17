import { view, Component, Events, Store } from '@storefront/core';

@view('gb-sayt-autocomplete', require('./index.html'))
class SaytAutocomplete extends Component {

  state: SaytAutocomplete.State = {
    suggestions: []
  };

  constructor() {
    super();
    this.expose('autocomplete');
    // TODO register with autocomplete service (sayt service?) so it only runs if tags exist
    this.flux.on(Events.AUTOCOMPLETE_UPDATED, this.updateSuggestions);
  }

  // TODO decide on suggestions or searchTerms
  updateSuggestions = ({ suggestions, category: { values: categoryValues } }: Store.Autocomplete) =>
    this.set({ suggestions, categoryValues })
}

namespace SaytAutocomplete {
  export interface State {
    suggestions: string[];
  }
}

export default SaytAutocomplete;
