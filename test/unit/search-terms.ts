import SearchTerms from '../../src/search-terms';
import suite from './_suite';

suite('SearchTerms', ({ expect, spy }) => {
  let searchTerms: SearchTerms;

  beforeEach(() => searchTerms = new SearchTerms());

  describe('constructor()', () => {
    describe('state', () => {
      describe('onClick()', () => {
        it('should call flux.search()', () => {
          const query = 'hats';
          const search = spy();
          const handler = searchTerms.state.onClick(query);
          searchTerms.flux = <any>{ search };

          handler();

          expect(search).to.be.calledWith(query);
        });
      });
    });
  });
});
