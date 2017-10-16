import { alias, tag, Selectors, Tag } from '@storefront/core';

@alias('navigations')
@tag('gb-sayt-navigations', require('./index.html'))
class Navigations {

  state: Navigations.State = {
    onClick: (navigationId, value) => () =>
      this.actions.updateSearch({
        clear: true,
        query: Selectors.autocompleteQuery(this.flux.store.getState()),
        navigationId,
        value
      })
  };
}

interface Navigations extends Tag { }
namespace Navigations {
  export interface State {
    onClick: (field: string, value: string) => () => void;
  }
}

export default Navigations;
