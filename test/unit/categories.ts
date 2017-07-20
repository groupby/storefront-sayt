import { Selectors } from '@storefront/core';
import Categories from '../../src/categories';
import suite from './_suite';

suite('Categories', ({ expect, spy, stub }) => {
  let navigations: Categories;

  beforeEach(() => navigations = new Categories());

  describe('constructor()', () => {
    describe('state', () => {
      describe('onClick()', () => {
        it('should dispatch actions.updateSearch()', () => {
          const navigationId = 'author';
          const value = 'margaret atwood';
          const query = 'handmaid';
          const action = { a: 'b' };
          const state = { c: 'd' };
          const updateSearch = spy(() => action);
          const handler = navigations.state.onClick(value);
          const autocompleteQuerySelector = stub(Selectors, 'autocompleteQuery').returns(query);
          navigations.$autocomplete = <any>{ category: navigationId };
          navigations.actions = <any>{ updateSearch };
          navigations.flux = <any>{ store: { getState: () => state } };

          handler();

          expect(updateSearch).to.be.calledWith({ navigationId, value, query, clear: true });
          expect(autocompleteQuerySelector).to.be.calledWith(state);
        });
      });
    });
  });
});
