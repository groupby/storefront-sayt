import { alias, tag, Selectors, Tag } from '@storefront/core';

@alias('searchTerms')
@tag('gb-sayt-search-terms', require('./index.html'))
class SearchTerms {

  state: SearchTerms.State = {
    onClick: (query) => () => this.actions.search(query),
  };
}

interface SearchTerms extends Tag<any, SearchTerms.State> { }
namespace SearchTerms {
  export interface State {
    onClick: (query: string) => () => void;
  }
}

export default SearchTerms;
