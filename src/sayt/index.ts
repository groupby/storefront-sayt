import { alias, configurable, origin, tag, utils, Events, Selectors, Tag } from '@storefront/core';
import * as escapeRegexp from 'escape-string-regexp';

@configurable
@alias('sayt')
@origin('sayt')
@tag('gb-sayt', require('./index.html'))
class Sayt {

  props: Sayt.Props = {
    labels: {
      trending: 'Trending'
    }
  };
  state: Sayt.State = {
    isActive: true,
    showRecommendations: false,
    showProducts: true,
    highlight: (value, replacement) => {
      const query = Selectors.autocompleteQuery(this.flux.store.getState());
      return value.replace(new RegExp(escapeRegexp(query), 'i'), replacement);
    }
  };

  init() {
    this.services.autocomplete.register(this);
    this.flux.on('sayt:show', this.setActive);
    this.flux.on('sayt:hide', this.setInactive);
    this.flux.on(Events.URL_UPDATED, this.setInactive);
    if (this.props.recommendations) {
      this.flux.on('sayt:show_recommendations', this.setRecommendationsActive);
      this.flux.on(Events.AUTOCOMPLETE_QUERY_UPDATED, this.setRecommendationsInactive);
    }
    utils.WINDOW().document.addEventListener('click', this.checkRootNode);
  }

  onMount() {
    // initialize as active to initialize child component
    this.setInactive();
  }

  setActive = () => !this.state.isActive && this.set({ isActive: true });

  setInactive = () => this.state.isActive && this.set({ isActive: false });

  checkRootNode = ({ target }: MouseEvent & { target: Node }) =>
    !this.root.contains(target) && this.setInactive()

  setRecommendationsActive = () =>
    !this.state.showRecommendations && this.set({ isActive: true, showRecommendations: true })

  setRecommendationsInactive = () =>
    this.state.showRecommendations && this.set({ showRecommendations: false })
}

interface Sayt extends Tag<any, Sayt.State> { }
namespace Sayt {
  export interface Props {
    labels?: Labels;
    recommendations?: boolean;
  }

  export interface State {
    isActive: boolean;
    showRecommendations: boolean;
    showProducts: boolean;
    highlight: (value: string, replacement: string) => string;
  }

  export interface Labels {
    trending?: string;
  }
}

export default Sayt;
