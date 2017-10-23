import { alias, tag, Tag } from '@storefront/core';

@alias('past-purchases')
@tag('gb-sayt-past-purchases', require('./index.html'))
class PastPurchases {

  state: PastPurchases.State = {
  };
}

interface PastPurchases extends Tag { }
namespace PastPurchases {
    export interface State {
    }
}

export default PastPurchases;
