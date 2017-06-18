import { alias, tag, Tag } from '@storefront/core';
import Autocomplete from '../autocomplete';

@alias('saytCategories')
@tag('gb-sayt-categories', require('./index.html'))
class Categories {

  $autocomplete: Autocomplete.State;

  state: Categories.State = {
    onClick: (value) => () =>
      this.flux.store.dispatch(<any>this.flux.actions.updateSearch({
        clear: true,
        query: this.flux.store.getState().data.autocomplete.query,
        navigationId: this.$autocomplete.category,
        value
      }))
  };
}

interface Categories extends Tag { }
namespace Categories {
  export interface State {
    onClick: (value: string) => () => void;
  }
}

export default Categories;
