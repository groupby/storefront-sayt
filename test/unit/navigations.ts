import { Selectors } from '@storefront/core';
import Navigations from '../../src/navigations';
import suite from './_suite';

suite('Navigations', ({ expect, spy, stub }) => {
  let navigations: Navigations;

  beforeEach(() => navigations = new Navigations());

  describe('constructor()', () => {
    describe('state', () => {
      describe('onClick()', () => {
        it('should dispatch actions.updateSearch()', () => {
          const navigationId = 'author';
          const value = 'margaret atwood';
          const query = 'hat';
          const action = { a: 'b' };
          const updateSearch = spy(() => action);
          const handler = navigations.state.onClick(navigationId, value);
          navigations.flux = <any>{ store: { getState: () => 1 }};
          navigations.actions = <any>{ updateSearch };

          stub(Selectors, 'autocompleteQuery').returns(query);

          handler();

          expect(updateSearch).to.be.calledWith({ navigationId, value, query, clear: true });
        });
      });
    });
  });
});
