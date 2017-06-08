import { alias, tag, Tag } from '@storefront/core';

@alias('navigations')
@tag('gb-sayt-navigations', require('./index.html'))
class Navigations {

  state: Navigations.State = {
    onClick: (field) => () =>
      this.flux.store.dispatch(<any>this.flux.actions.updateSearch({ clear: true }))
  };
}

interface Navigations extends Tag { }
namespace Navigations {
  export interface State {
    onClick: (field: string) => () => void;
  }
}

export default Navigations;
