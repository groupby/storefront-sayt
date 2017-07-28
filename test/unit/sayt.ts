import { utils, Events, Selectors } from '@storefront/core';
import Sayt from '../../src/sayt';
import suite from './_suite';

suite('Sayt', ({ expect, spy, stub, itShouldBeConfigurable, itShouldHaveAlias }) => {
  let sayt: Sayt;

  beforeEach(() => sayt = new Sayt());

  itShouldBeConfigurable(Sayt);
  itShouldHaveAlias(Sayt, 'sayt');

  describe('constructor()', () => {
    describe('props', () => {
      it('should set initial value', () => {
        expect(sayt.props).to.eql({ labels: { trending: 'Trending' } });
      });
    });

    describe('state', () => {
      it('should set initial value', () => {
        expect(sayt.state.isActive).to.be.true;
        expect(sayt.state.showProducts).to.be.true;
      });

      describe('highlight()', () => {
        it('should replace the current autocomplete query', () => {
          const query = 'yellow tie';
          const state = { a: 'b' };
          const autocompleteQuerySelector = stub(Selectors, 'autocompleteQuery').returns(query);
          sayt.flux = <any>{ store: { getState: () => state } };

          const highlighted = sayt.state.highlight('flamboyant yellow tie', '<i>$&</i>');

          expect(highlighted).to.eq('flamboyant <i>yellow tie</i>');
          expect(autocompleteQuerySelector).to.be.calledWith(state);
        });

        it('should be case insensitive', () => {
          const query = 'YelLoW tIE';
          stub(Selectors, 'autocompleteQuery').returns(query);
          sayt.flux = <any>{ store: { getState: () => null } };

          const highlighted = sayt.state.highlight('flamboyant YElLOw Tie', '<p>$&</p>');

          expect(highlighted).to.eq('flamboyant <p>YElLOw Tie</p>');
        });
      });
    });
  });

  describe('init()', () => {
    it('should register with autocomplete service', () => {
      const register = spy();
      stub(utils, 'WINDOW').returns({ document: { addEventListener: () => null } });
      sayt.services = <any>{ autocomplete: { register } };
      sayt.flux = <any>{ on: () => null };
      sayt.expose = () => null;

      sayt.init();

      expect(register).to.be.calledWith(sayt);
    });

    it('should listen for sayt:show', () => {
      const on = spy();
      stub(utils, 'WINDOW').returns({ document: { addEventListener: () => null } });
      sayt.flux = <any>{ on };
      sayt.services = <any>{ autocomplete: { register: () => null } };
      sayt.expose = () => null;

      sayt.init();

      expect(on).to.be.calledWith('sayt:show', sayt.setActive);
    });

    it('should listen for sayt:hide', () => {
      const on = spy();
      stub(utils, 'WINDOW').returns({ document: { addEventListener: () => null } });
      sayt.flux = <any>{ on };
      sayt.services = <any>{ autocomplete: { register: () => null } };
      sayt.expose = () => null;

      sayt.init();

      expect(on).to.be.calledWith('sayt:hide', sayt.setInactive);
    });

    it('should listen for URL_UPDATED', () => {
      const on = spy();
      stub(utils, 'WINDOW').returns({ document: { addEventListener: () => null } });
      sayt.flux = <any>{ on };
      sayt.services = <any>{ autocomplete: { register: () => null } };
      sayt.expose = () => null;

      sayt.init();

      expect(on).to.be.calledWith(Events.URL_UPDATED, sayt.setInactive);
    });

    it('should add document click listener to hide itself', () => {
      const addEventListener = spy();
      stub(utils, 'WINDOW').returns({ document: { addEventListener } });
      sayt.flux = <any>{ on: () => null };
      sayt.services = <any>{ autocomplete: { register: () => null } };
      sayt.expose = () => null;

      sayt.init();

      expect(addEventListener).to.be.calledWith('click', sayt.checkRootNode);
    });
  });

  describe('onMount()', () => {
    it('should inactivate sayt', () => {
      const setInactive = sayt.setInactive = spy();

      sayt.onMount();

      expect(setInactive).to.be.called;
    });
  });

  describe('setActive()', () => {
    it('should set isActive', () => {
      const set = sayt.set = spy();
      sayt.state.isActive = false;

      sayt.setActive();

      expect(set).to.be.calledWith({ isActive: true });
    });

    it('should not set isActive if already active', () => {
      sayt.set = () => expect.fail();
      sayt.state.isActive = true;

      sayt.setActive();
    });
  });

  describe('setInactive()', () => {
    it('should set isActive', () => {
      const set = sayt.set = spy();
      sayt.state.isActive = true;

      sayt.setInactive();

      expect(set).to.be.calledWith({ isActive: false });
    });

    it('should not set isActive if not already active', () => {
      sayt.set = () => expect.fail();
      sayt.state.isActive = false;

      sayt.setInactive();
    });
  });

  describe('checkRootNode()', () => {
    it('should not setInactive() if target found', () => {
      const stubSetInactive = stub(sayt, 'setInactive');
      const event: any = { target: { nodeName: 'gb-sayt' } };
      stub(sayt, 'root').value({ contains: () => true });

      sayt.checkRootNode(event);

      expect(stubSetInactive).to.not.be.called;
    });

    it('should setInactive() if target not found', () => {
      const stubSetInactive = stub(sayt, 'setInactive');
      const event: any = { target: { nodeName: 'html' } };
      stub(sayt, 'root').value({ contains: () => false });

      sayt.checkRootNode(event);

      expect(stubSetInactive).to.be.called;
    });
  });
});
