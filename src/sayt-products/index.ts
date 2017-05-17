import { view, Component, Events, Store } from '@storefront/core';

@view('gb-sayt-products', require('./index.html'))
class SaytProducts extends Component {

  state: SaytProducts.State = { products: [] };

  constructor() {
    super();
    this.flux.on(Events.AUTOCOMPLETE_PRODUCTS_UPDATED, this.updateProducts);
  }

  updateProducts = (products: Store.Product[]) => this.set({ products });
}

namespace SaytProducts {
  export interface State {
    products: Store.Product[];
  }
}

export default SaytProducts;
