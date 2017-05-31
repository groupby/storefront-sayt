import { tag, Tag } from '@storefront/core';

@tag('gb-sayt', require('./index.html'))
class Sayt {

  state: Sayt.State = {
    isActive: false
  };

  init() {
    this.expose('sayt');
  }
}

interface Sayt extends Tag<any, Sayt.State> { }
namespace Sayt {
  export interface State {
    isActive: boolean;
  }
}

export default Sayt;
