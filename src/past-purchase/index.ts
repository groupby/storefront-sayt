import { alias, tag, Events, Selectors, Store, Tag } from '@storefront/core';

@alias('saytCategories')
@tag('gb-sayt-past-purchase', require('./index.html'))
class PastPurchase {
  $pastPurchase: Store.Autocomplete.Suggestion;

  state: PastPurchase.State = {
    onClick: (event: MouseEvent) => {
      // todo:
    },
    pastPurchases: this.select(Selectors.orderHistory),
  };
}

interface PastPurchase extends Tag { }
namespace PastPurchase {
  export interface State {
    pastPurchases: Store.Product[];
    onClick(event: MouseEvent): void;
  }
}

export default PastPurchase;
