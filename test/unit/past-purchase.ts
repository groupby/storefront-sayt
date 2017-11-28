import { Events, Selectors } from '@storefront/core';
import * as sinon from 'sinon';
import PastPurchase from '../../src/past-purchase';
import suite from './_suite';

const PAST = ['a', 'b'];

suite('PastPurchase', ({ expect, spy, stub }) => {
  let pastPurchase: PastPurchase;
  let queryPastPurchases: sinon.SinonStub;

  beforeEach(() => {
    PastPurchase.prototype.select = <any>spy(() => PAST);
    pastPurchase = new PastPurchase();
  });

  describe('state', () => {
    it('should hold pastPurchases', () => {
      expect(pastPurchase.state).to.eql({
        onClick: pastPurchase.state.onClick,
        pastPurchases: PAST.length
      });
      expect(pastPurchase.select).to.be.calledWith(Selectors.saytPastPurchases);
    });

    describe('onClick()', () => {
      it('should ', () => {
        const value = 'past';
        const action = { a: 'b' };
        const emit = spy();
        const dispatch = spy();
        const updatePastPurchaseQuery = spy(() => action);
        pastPurchase.flux = <any>{
          actions: {
            updatePastPurchaseQuery,
          },
          store: {
            dispatch,
          },
          emit,
        };
        pastPurchase.$pastPurchase = { value };
        pastPurchase.state.onClick(<any>{});
        expect(updatePastPurchaseQuery).to.be.calledWithExactly(value);
        expect(dispatch).to.be.calledWithExactly(action);
        expect(emit).to.be.calledWith('sayt:hide');
      });
    });
  });

});
