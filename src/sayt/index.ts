import { alias, tag, Tag } from '@storefront/core';

@alias('sayt')
@tag('gb-sayt', require('./index.html'))
class Sayt {

  state: Sayt.State = {
    isActive: false,
    showProducts: true
  };

  init() {
    this.services.autocomplete.register(this);
    this.flux.on('sayt:show', this.setActive);
    // this.flux.on('sayt:hide', this.setInactive);
  }

  setActive = () => this.set({ isActive: true });

  setInactive = () => this.set({ isActive: false });
}

interface Sayt extends Tag<any, Sayt.State> { }
namespace Sayt {
  export interface State {
    isActive: boolean;
    showProducts: boolean;
  }
}

export default Sayt;
