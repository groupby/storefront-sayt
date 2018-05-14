import { provide, tag, Selectors, Tag } from '@storefront/core';
import Sayt from '../sayt';

@provide('searchTerms', (props) => props)
@tag('gb-sayt-search-terms', require('./index.html'))
class SearchTerms {
  props: SearchTerms.Props = {
    onClick: (query) => () => this.actions.search(query),
  };
}

interface SearchTerms extends Tag<SearchTerms.Props> {}
namespace SearchTerms {
  export interface Props extends Tag.Props {
    labels?: Sayt.Labels;
    onClick: (query: string) => () => void;
  }
}

export default SearchTerms;
