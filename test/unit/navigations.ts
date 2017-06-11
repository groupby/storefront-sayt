import Navigations from '../../src/navigations';
import suite from './_suite';

suite('Navigations', ({ expect, spy }) => {
  let navigations: Navigations;

  beforeEach(() => navigations = new Navigations());

  describe('constructor()', () => {
    describe('state', () => {
      describe('onClick()', () => {
        it('should dispatch actions.updateSearch()', () => {
          const field = 'author';
          const action = { a: 'b' };
          const dispatch = spy();
          const updateSearch = spy(() => action);
          const handler = navigations.state.onClick(field);
          navigations.flux = <any>{ store: { dispatch }, actions: { updateSearch } };

          handler();

          expect(updateSearch).to.be.calledWith({ clear: true });
          expect(dispatch).to.be.calledWith(action);
        });
      });
    });
  });
});
