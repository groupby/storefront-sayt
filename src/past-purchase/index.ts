import { alias, tag, Events, Selectors, Tag } from '@storefront/core';
import Autocomplete from '../autocomplete';

@alias('saytCategories')
@tag('gb-sayt-past-purchase', require('./index.html'))
class PastPurchase {
  $autocomplete: Autocomplete.State;

  state: PastPurchase.State = {
    // onClick: ({ matchAll, value }) => () =>
    //   this.actions.updateSearch({
    //     clear: true,
    //     query: Selectors.autocompleteQuery(this.flux.store.getState()),
    //     ...(<any>matchAll || {
    //       navigationId: this.$autocomplete.category,
    //       value
    //     })
    //   }),
    query: Selectors.autocompleteQuery(this.flux.store.getState()),
    pastPurchases: Selectors.queryPastPurchases(this.flux.store.getState()),
    onHover: (event: MouseEvent) => {
      this.$autocomplete.onHover(event, false);
      this.flux.emit('autocomplete_products_updated', this.state.pastPurchases);
    }
  };

  init() {
    this.flux.on(Events.AUTOCOMPLETE_QUERY_UPDATED, this.updateQuery);
  }

  updateQuery = (query: string) => this.set({ query });
}

interface PastPurchase extends Tag { }
namespace PastPurchase {
  export interface State {
    query: string;
    pastPurchases: any[];
    onHover: any;
  }
}

export default PastPurchase;
