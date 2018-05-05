import { Events, ProductTransformer } from '@storefront/core';
import Products from '../../src/products';
import suite from './_suite';

const STRUCTURE = { a: 'b' };

suite('Products', ({ expect, spy, stub }) => {
  let products: Products;

  beforeEach(() => {
    Products.prototype.config = <any>{ structure: STRUCTURE };
    products = new Products();
  });
  afterEach(() => delete Products.prototype.config);

  describe('constructor()', () => {
    it('should set initial values', () => {
      expect(products.structure).to.eq(STRUCTURE);
    });

    describe('state', () => {
      it('should set initial value', () => {
        expect(products.state).to.eql({ products: [] });
      });
    });
  });

  describe('init()', () => {
    it('should register with autocomplete service', () => {
      const registerProducts = spy();
      products.services = <any>{ autocomplete: { registerProducts } };
      products.subscribe = () => null;

      products.init();

      expect(registerProducts).to.be.calledWith(products);
    });

    it('should listen for AUTOCOMPLETE_PRODUCTS_UPDATED', () => {
      const subscribe = products.subscribe = spy();
      products.services = <any>{ autocomplete: { registerProducts: () => null } };

      products.init();

      expect(subscribe).to.be.calledWith(Events.AUTOCOMPLETE_PRODUCTS_UPDATED, products.updateProducts);
    });
  });

  describe('updateProducts()', () => {
    it('should set products', () => {
      const set = products.set = spy();
      const transform = spy(() => 'x');
      const transformer = stub(ProductTransformer, 'transformer').returns(transform);

      products.updateProducts(<any[]>['a', 'b', 'c']);

      expect(set).to.be.calledWith({ products: ['x', 'x', 'x'] });
      expect(transform).to.be.calledWith('a').calledWith('b').calledWith('c');
    });
  });
});
