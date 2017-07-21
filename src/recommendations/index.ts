import { alias, tag, Events, ProductTransformer, Selectors, Store, Structure, Tag } from '@storefront/core';

@alias('recommendations')
@tag('gb-recommendations', require('./index.html'))
class Recommendations {

  structure: Structure = this.config.structure;
  state: Recommendations.State = {
    products: this.mapProducts(Selectors.recommendationsProducts(this.flux.store.getState()))
  };

  init() {
    this.flux.on(Events.RECOMMENDATIONS_PRODUCTS_UPDATED, this.updateProducts);
  }

  updateProducts = (products: Store.Product[]) =>
    this.set({
      products: this.mapProducts(products)
    })

  mapProducts(products: Store.Product[]) {
    return products.map(ProductTransformer.transformer(this.structure));
  }
}

interface Recommendations extends Tag<any, Recommendations.State> { }
namespace Recommendations {
  export interface State {
    products: any[];
  }
}

export default Recommendations;
