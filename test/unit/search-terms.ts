import SearchTerms from '../../src/search-terms';
import suite from './_suite';

suite('SearchTerms', ({ expect, spy }) => {
  let searchTerms: SearchTerms;

  beforeEach(() => searchTerms = new SearchTerms());

  describe('constructor()', () => {
    describe('props', () => {
      describe('onClick()', () => {
        it('should call actions.search()', () => {
          const query = 'hats';
          const search = spy();
          const handler = searchTerms.props.onClick(query);
          searchTerms.actions = <any>{ search };

          handler();

          expect(search).to.be.calledWith(query);
        });
      });
    });
  });

  describe('init()', () => {
    it('should expose props as searchTerms', () => {
      const props = searchTerms.props = <any>{ a: 'b' };
      const expose = searchTerms.expose = spy();

      searchTerms.init();

      expect(expose).to.be.calledWithExactly('searchTerms', props);
    });
  });
});
