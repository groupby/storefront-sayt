import { alias, tag, Events, Selectors, Store, Tag } from '@storefront/core';

@alias('saytCategories')
@tag('gb-sayt-past-purchase', require('./index.html'))
class PastPurchase {
  $pastPurchase: Store.Autocomplete.Suggestion;

  state: PastPurchase.State = {
    onClick: (event: MouseEvent) => {
      // todo:
    },
    pastPurchases: this.select(Selectors.orderHistoryLength)
  };
}

interface PastPurchase extends Tag { }
namespace PastPurchase {
  export interface State {
    pastPurchases: number;
    onClick(event: MouseEvent): void;
  }
}

export default PastPurchase;
