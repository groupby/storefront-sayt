import { alias, tag, Events, ProductTransformer, Store, Structure, Tag } from '@storefront/core';

@alias('saytProducts')
@tag('gb-sayt-products', require('./index.html'))
class Products {

  structure: Structure = this.config.structure;
  state: Products.State = {
    products: []
  };

  init() {
    this.flux.on(Events.AUTOCOMPLETE_PRODUCTS_UPDATED, this.updateProducts);
  }

  updateProducts = (products: Store.Product[]) =>
    this.set({
      products: products.map(ProductTransformer.transformer(this.structure))
    })
}

interface Products extends Tag<any, Products.State> { }
namespace Products {
  export interface State {
    products: any[];
  }
}

export default Products;
