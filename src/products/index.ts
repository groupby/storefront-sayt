import { alias, tag, CoreSelectors, Events, Store, Structure, Tag } from '@storefront/core';

@alias('saytProducts')
@tag('gb-sayt-products', require('./index.html'))
class Products {

  state: Products.State = {
    products: []
  };

  init() {
    this.services.autocomplete.registerProducts(this);
    this.flux.on(Events.AUTOCOMPLETE_PRODUCTS_UPDATED, this.updateProducts);
  }

  updateProducts = (products: Store.Product[]) =>
    this.set({
      products: products.map(this.select(CoreSelectors.productTransformer))
    })
}

interface Products extends Tag<any, Products.State> { }
namespace Products {
  export interface State {
    products: any[];
  }
}

export default Products;
