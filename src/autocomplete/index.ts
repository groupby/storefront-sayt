import { alias, tag, Events, Store, Tag } from '@storefront/core';

@alias('autocomplete')
@tag('gb-sayt-autocomplete', require('./index.html'))
class Autocomplete {

  state: Autocomplete.State = {
    categoryValues: [],
    suggestions: []
  };

  init() {
    // TODO register with autocomplete service (sayt service?) so it only runs if tags exist
    this.flux.on(Events.AUTOCOMPLETE_SUGGESTIONS_UPDATED, this.updateSuggestions);
    this.flux.on(Events.AUTOCOMPLETE_CATEGORY_UPDATED, this.updateCategoryValues);
  }

  updateSuggestions = (suggestions: string[]) => {
    this.log.warn(suggestions);
    this.set({ suggestions });
  }

  updateCategoryValues = ({ values: categoryValues }: Store.Autocomplete.Category) => {
    this.log.warn(categoryValues);
    this.set({ categoryValues });
  }
}

interface Autocomplete extends Tag<any, Autocomplete.State> { }
namespace Autocomplete {
  export interface State {
    categoryValues: string[];
    suggestions: string[];
  }
}

export default Autocomplete;
