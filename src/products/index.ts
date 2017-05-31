import { tag, Events, Store, Tag } from '@storefront/core';

@tag('gb-sayt-products', require('./index.html'))
class Products {

  state: Products.State = {
    products: []
  };

  init() {
    this.flux.on(Events.AUTOCOMPLETE_PRODUCTS_UPDATED, this.updateProducts);
  }

  updateProducts = (products: Store.Product[]) => this.set({ products });
}

interface Products extends Tag<any, Products.State> { }
namespace Products {
  export interface State {
    products: Store.Product[];
  }
}

export default Products;
