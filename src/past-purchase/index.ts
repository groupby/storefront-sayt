import { alias, tag, Events, Selectors, Store, Tag } from '@storefront/core';

@alias('pastPurchaseItem')
@tag('gb-sayt-past-purchase', require('./index.html'))
class PastPurchase {
  $pastPurchase: Store.Autocomplete.Suggestion;

  state: PastPurchase.State = {
    onClick: (event: MouseEvent) => {
      this.flux.store.dispatch(this.flux.actions.updatePastPurchaseQuery(this.$pastPurchase.value));
      this.flux.emit('sayt:hide');
    },
    pastPurchases: this.select(Selectors.saytPastPurchases).length
  };

  init() {
    this.flux.on(Events.SAYT_PAST_PURCHASES_UPDATED, this.updatePastPurchases);
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
  }
}

export default PastPurchase;
