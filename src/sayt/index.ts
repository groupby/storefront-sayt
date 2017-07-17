import { alias, origin, tag, utils, Events, Tag } from '@storefront/core';
import * as escapeRegexp from 'escape-string-regexp';

@alias('sayt')
@origin('sayt')
@tag('gb-sayt', require('./index.html'))
class Sayt {

  state: Sayt.State = {
    isActive: true,
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
    this.flux.on(Events.URL_UPDATED, this.setInactive);
    utils.WINDOW().document.addEventListener('click', this.setInactive);
  }

  onMount() {
    // initialize as active to initialize child component
    this.setInactive();
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
