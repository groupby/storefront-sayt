import { Events, Selectors } from '@storefront/core';
import * as sinon from 'sinon';
import Categories from '../../src/categories';
import suite from './_suite';

const QUERY = 'red dress';

suite('Categories', ({ expect, spy, stub }) => {
  let navigations: Categories;
  let getState: sinon.SinonSpy;
  let selectAutocompleteQuery: sinon.SinonStub;

  beforeEach(() => {
    selectAutocompleteQuery = stub(Selectors, 'autocompleteQuery').returns(QUERY);
    getState = spy();
    Categories.prototype.flux = <any>{ store: { getState } };
    navigations = new Categories();
  });
  afterEach(() => delete Categories.prototype.flux);

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
          selectAutocompleteQuery.returns(query);
          navigations.$autocomplete = <any>{ category: navigationId };
          navigations.actions = <any>{ updateSearch };
          navigations.flux = <any>{ store: { getState: () => state } };

          handler();

          expect(updateSearch).to.be.calledWith({ navigationId, value, query, clear: true });
          expect(selectAutocompleteQuery).to.be.calledWith(state);
        });
      });

      describe('query', () => {
        it('should equal original autocomplete query', () => {
          expect(navigations.state.query).to.eq(QUERY);
        });
      });
    });
  });

  describe('init()', () => {
    it('should listen for AUTOCOMPLETE_QUERY_UPDATED', () => {
      const on = spy();
      navigations.flux = <any>{ on };

      navigations.init();

      expect(on).to.be.calledWithExactly(Events.AUTOCOMPLETE_QUERY_UPDATED, navigations.updateQuery);
    });
  });
});
