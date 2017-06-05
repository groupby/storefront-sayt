import { alias, tag, Tag } from '@storefront/core';

@alias('navigations')
@tag('gb-sayt-navigations', require('./index.html'))
class Navigations {

  state: Navigations.State = {
    onClick: (field) => (event) =>
      this.flux.store.dispatch(<any>this.flux.actions.updateSearch({ clear: true }))
  };
}

interface Navigations extends Tag { }
namespace Navigations {
  export interface State {
    onClick: (field: string) => (event: MouseEvent) => void;
  }
}

export default Navigations;
