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
        pastPurchases: PAST
      });
      expect(pastPurchase.select).to.be.calledWith(Selectors.queryPastPurchases);
    });

    describe('onClick()', () => {
      it('should ', () => {
        pastPurchase.state.onClick(<any>{});
      });
    });
  });

});
