import { Events, Selectors } from '@storefront/core';
import * as sinon from 'sinon';
import Categories from '../../src/categories';
import suite from './_suite';

const QUERY = 'red dress';

suite('Categories', ({ expect, spy, stub }) => {
  let categories: Categories;
  let select: sinon.SinonStub;

  beforeEach(() => {
    select = Categories.prototype.select = stub().returns(QUERY);
    Categories.prototype.flux = <any>{};
    categories = new Categories();
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
          const handler = categories.state.onClick({ value });

          select.returns(query);
          categories.$autocomplete = <any>{ category: navigationId };
          categories.actions = <any>{ updateSearch };
          categories.flux = <any>{ store: { getState: () => state } };

          handler();

          expect(updateSearch).to.be.calledWith({ navigationId, value, query, clear: true });
          expect(select).to.be.calledWith(Selectors.autocompleteQuery);
        });
      });

      describe('query', () => {
        it('should equal original autocomplete query', () => {
          expect(categories.state.query).to.eq(QUERY);
        });
      });
    });
  });

  describe('init()', () => {
    it('should listen for AUTOCOMPLETE_QUERY_UPDATED', () => {
      const on = spy();
      categories.flux = <any>{ on };

      categories.init();

      expect(on).to.be.calledWithExactly(Events.AUTOCOMPLETE_QUERY_UPDATED, categories.updateQuery);
    });
  });

  describe('updateQuery()', () => {
    it('should update the query', () => {
      const query = 'test';
      const set = categories.set = spy();

      categories.updateQuery(query);

      expect(set).to.be.calledWithExactly({ query });
    });
  });
});
