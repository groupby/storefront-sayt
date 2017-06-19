import { alias, tag, utils, Tag } from '@storefront/core';
import * as escapeRegexp from 'escape-string-regexp';

@alias('sayt')
@tag('gb-sayt', require('./index.html'))
class Sayt {

  state: Sayt.State = {
    isActive: false,
    showProducts: true,
    highlight: (value, replacement) => {
      const query = this.flux.store.getState().data.autocomplete.query;
      return value.replace(new RegExp(escapeRegexp(query), 'i'), replacement);
    }
  };

  init() {
    this.services.autocomplete.register(this);
    this.flux.on('sayt:show', this.setActive);
    this.flux.on('sayt:hide', this.setInactive);
    utils.WINDOW.document().addEventListener('click', this.setInactive);
  }

  setActive = () =>
    !this.state.isActive && this.set({ isActive: true })

  setInactive = () =>
    this.state.isActive && this.set({ isActive: false })
}

interface Sayt extends Tag<any, Sayt.State> { }
namespace Sayt {
  export interface State {
    isActive: boolean;
    showProducts: boolean;
    highlight: (value: string, replacement: string) => string;
  }
}

export default Sayt;
