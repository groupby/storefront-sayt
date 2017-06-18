import { alias, tag, Tag } from '@storefront/core';

@alias('navigations')
@tag('gb-sayt-navigations', require('./index.html'))
class Navigations {

  state: Navigations.State = {
    onClick: (navigationId, value) => () =>
      this.flux.store.dispatch(<any>this.flux.actions.updateSearch({
        clear: true,
        query: null,
        navigationId,
        value
      }))
  };
}

interface Navigations extends Tag { }
namespace Navigations {
  export interface State {
    onClick: (field: string, value: string) => () => void;
  }
}

export default Navigations;
