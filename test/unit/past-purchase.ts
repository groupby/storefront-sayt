import { Events, Selectors } from '@storefront/core';
import * as sinon from 'sinon';
import PastPurchase from '../../src/past-purchase';
import suite from './_suite';

const PAST = ['a', 'b'];
const STATE = { h: 'j' };

suite('PastPurchase', ({ expect, spy, stub }) => {
  let pastPurchase: PastPurchase;
  let queryPastPurchases: sinon.SinonStub;

  beforeEach(() => {
    PastPurchase.prototype.flux = <any>{ store: { getState: () => STATE } };
    queryPastPurchases = stub(Selectors, 'queryPastPurchases').returns(PAST);
    pastPurchase = new PastPurchase();
  });

  describe('state', () => {
    it('should hold pastPurchases', () => {
      expect(pastPurchase.state).to.eql({
        pastPurchases: PAST
      });
    });
  });

});
