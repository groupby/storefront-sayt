import { alias, tag, Selectors, Tag } from '@storefront/core';
import Autocomplete from '../autocomplete';

@alias('saytCategories')
@tag('gb-sayt-categories', require('./index.html'))
class Categories {

  $autocomplete: Autocomplete.State;

  state: Categories.State = {
    onClick: (value) => () =>
      this.actions.updateSearch({
        clear: true,
        query: Selectors.autocompleteQuery(this.flux.store.getState()),
        navigationId: this.$autocomplete.category,
        value
      })
  };
}

interface Categories extends Tag { }
namespace Categories {
  export interface State {
    onClick: (value: string) => () => void;
  }
}

export default Categories;
