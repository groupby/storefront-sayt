import { alias, tag, Events, Selectors, Tag } from '@storefront/core';
import Autocomplete from '../autocomplete';

@alias('saytCategories')
@tag('gb-sayt-categories', require('./index.html'))
class Categories {

  $autocomplete: Autocomplete.State;

  state: Categories.State = {
    onClick: ({ matchAll, value }) => () =>
      this.actions.updateSearch({
        clear: true,
        query: Selectors.autocompleteQuery(this.flux.store.getState()),
        ...(<any>matchAll || {
          navigationId: this.$autocomplete.category,
          value: value
        })
      }),
    query: Selectors.autocompleteQuery(this.flux.store.getState())
  };

  init() {
    this.flux.on(Events.AUTOCOMPLETE_QUERY_UPDATED, this.updateQuery);
  }

  updateQuery = (query: string) => this.set({ query });
}

interface Categories extends Tag { }
namespace Categories {
  export interface State {
    query: string;
    onClick: (category: { value?: string, matchAll?: boolean }) => () => void;
  }
}

export default Categories;
