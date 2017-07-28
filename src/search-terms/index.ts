import { tag, Selectors, Tag } from '@storefront/core';
import Sayt from '../sayt';

@tag('gb-sayt-search-terms', require('./index.html'))
class SearchTerms {

  props: SearchTerms.Props = {
    onClick: (query) => () => this.actions.search(query),
  };

  init() {
    this.expose('searchTerms', this.props);
  }
}

interface SearchTerms extends Tag<SearchTerms.Props> { }
namespace SearchTerms {
  export interface Props {
    labels?: Sayt.Labels;
    onClick: (query: string) => () => void;
  }
}

export default SearchTerms;
