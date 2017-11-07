import { alias, tag, Events, Selectors, Store, Tag } from '@storefront/core';

@alias('saytCategories')
@tag('gb-sayt-past-purchase', require('./index.html'))
class PastPurchase {
  $pastPurchase: Store.Autocomplete.Suggestion;

  state: PastPurchase.State = {
    onClick: (event: MouseEvent) => {
      return 3;
    },
    url: () =>
      this.services.url.beautifier.build('pastPurchase', {
        query: this.$pastPurchase.value,
        page: 1,
        pageSize: 10,
        refinements: [],
        sort: {field: "pdpData.salePrice", descending: true},
        collection: 'alternate',
      }),
    pastPurchases: this.select(Selectors.orderHistory).length
  };

  init() {
    this.flux.on(Events.ORDER_HISTORY_UPDATED, this.updatePastPurchases);
  }

  updatePastPurchases = (pastPurchases: Store.ProductWithMetadata[]) =>
    this.set({
      pastPurchases: pastPurchases.length
    })
}

interface PastPurchase extends Tag { }
namespace PastPurchase {
  export interface State {
    pastPurchases: number;
    onClick(event: MouseEvent): void;
    url: Function;
  }
}

export default PastPurchase;
