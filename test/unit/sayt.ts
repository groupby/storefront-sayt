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
        expect(sayt.state.showRecommendations).to.be.false;
        expect(sayt.state.showProducts).to.be.true;
      });

      describe('highlight()', () => {
        it('should replace the current autocomplete query', () => {
          const query = 'yellow tie';
          const select = sayt.select = spy(() => query);

          const highlighted = sayt.state.highlight('flamboyant yellow tie', '<i>$&</i>');

          expect(highlighted).to.eq('flamboyant <i>yellow tie</i>');
          expect(select).to.be.calledWith(Selectors.autocompleteQuery);
        });

        it('should be case insensitive', () => {
          const query = 'YelLoW tIE';
          sayt.select = spy(() => query);

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

      sayt.init();

      expect(register).to.be.calledWith(sayt);
    });

    it('should listen for sayt:show', () => {
      const on = spy();
      stub(utils, 'WINDOW').returns({ document: { addEventListener: () => null } });
      sayt.flux = <any>{ on };
      sayt.services = <any>{ autocomplete: { register: () => null } };

      sayt.init();

      expect(on).to.be.calledWith('sayt:show', sayt.setActive);
    });

    it('should listen for sayt:hide', () => {
      const on = spy();
      stub(utils, 'WINDOW').returns({ document: { addEventListener: () => null } });
      sayt.flux = <any>{ on };
      sayt.services = <any>{ autocomplete: { register: () => null } };

      sayt.init();

      expect(on).to.be.calledWith('sayt:hide', sayt.setInactive);
    });

    it('should listen for sayt:show_recommendations when recommendations on', () => {
      const on = spy();
      stub(utils, 'WINDOW').returns({ document: { addEventListener: () => null } });
      sayt.flux = <any>{ on };
      sayt.services = <any>{ autocomplete: { register: () => null } };
      sayt.props = { recommendations: true };

      sayt.init();

      expect(on).to.be.calledWith('sayt:show_recommendations', sayt.setRecommendationsActive);
    });

    it('should not listen for sayt:show_recommendations when recommendations off', () => {
      const on = spy();
      stub(utils, 'WINDOW').returns({ document: { addEventListener: () => null } });
      sayt.flux = <any>{ on };
      sayt.services = <any>{ autocomplete: { register: () => null } };

      sayt.init();

      expect(on).to.not.be.calledWith('sayt:show_recommendations');
    });

    it('should listen for URL_UPDATED when recommendations on', () => {
      const on = spy();
      stub(utils, 'WINDOW').returns({ document: { addEventListener: () => null } });
      sayt.flux = <any>{ on };
      sayt.services = <any>{ autocomplete: { register: () => null } };
      sayt.props = { recommendations: true };

      sayt.init();

      expect(on).to.be.calledWith(Events.AUTOCOMPLETE_QUERY_UPDATED, sayt.setRecommendationsInactive);
    });

    it('should not listen for URL_UPDATED when recommendations off', () => {
      const on = spy();
      stub(utils, 'WINDOW').returns({ document: { addEventListener: () => null } });
      sayt.flux = <any>{ on };
      sayt.services = <any>{ autocomplete: { register: () => null } };

      sayt.init();

      expect(on).to.not.be.calledWith(Events.AUTOCOMPLETE_QUERY_UPDATED);
    });

    it('should listen for URL_UPDATED', () => {
      const on = spy();
      stub(utils, 'WINDOW').returns({ document: { addEventListener: () => null } });
      sayt.flux = <any>{ on };
      sayt.services = <any>{ autocomplete: { register: () => null } };

      sayt.init();

      expect(on).to.be.calledWith(Events.URL_UPDATED, sayt.setInactive);
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
    it('should call unregisterClickAwayHandler()', () => {
      const unregisterClickAwayHandler = sayt.unregisterClickAwayHandler = spy();
      sayt.select = spy();
      sayt.set = () => null;
      sayt.flux = <any>{ emit: () => null};

      sayt.setInactive();

      expect(unregisterClickAwayHandler).to.be.called;
    });

    it('should set isActive', () => {
      const query = 'apple';
      const state = { a: 'b' };
      const set = sayt.set = spy();
      sayt.unregisterClickAwayHandler = () => null;
      sayt.state.isActive = true;

      sayt.setInactive();

      expect(set).to.be.calledWith({ isActive: false });
    });

    it('should not set isActive if not already active', () => {
      sayt.set = () => expect.fail();
      sayt.unregisterClickAwayHandler = () => null;
      sayt.state.isActive = false;

      sayt.setInactive();
    });
  });

  describe('setRecommendationsActive()', () => {
    it('should set showRecommendations', () => {
      const set = sayt.set = spy();
      sayt.state.showRecommendations = false;

      sayt.setRecommendationsActive();

      expect(set).to.be.calledWithExactly({ isActive: true, showRecommendations: true });
    });

    it('should not set showRecommendations if already active', () => {
      sayt.set = () => expect.fail();
      sayt.state.showRecommendations = true;

      sayt.setRecommendationsActive();
    });
  });

  describe('setRecommendationsInactive()', () => {
    it('should set showRecommendations', () => {
      const set = sayt.set = spy();
      sayt.state.showRecommendations = true;

      sayt.setRecommendationsInactive();

      expect(set).to.be.calledWithExactly({ showRecommendations: false });
    });

    it('should not set showRecommendations if not already active', () => {
      sayt.set = () => expect.fail();
      sayt.state.showRecommendations = false;

      sayt.setRecommendationsInactive();
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

  describe('registerClickAwayHandler()', () => {
    it('should add click handler to window.document', () => {
      const addEventListener = spy();
      stub(utils, 'WINDOW').returns({ document: { addEventListener } });

      sayt.registerClickAwayHandler();

      expect(addEventListener).to.be.calledWithExactly('click', sayt.checkRootNode);
    });
  });

  describe('unregisterClickAwayHandler()', () => {
    it('should add a one-time event listener to re-register the click handler', () => {
      const once = spy();
      sayt.flux = <any>{ once };
      stub(utils, 'WINDOW').returns({ document: { removeEventListener: () => null } });

      sayt.unregisterClickAwayHandler();

      expect(once).to.be.calledWithExactly(Events.AUTOCOMPLETE_QUERY_UPDATED, sayt.registerClickAwayHandler);
    });

    it('should remove click handler from window.document', () => {
      const removeEventListener = spy();
      sayt.flux = <any>{ once: () => null };
      stub(utils, 'WINDOW').returns({ document: { removeEventListener } });

      sayt.unregisterClickAwayHandler();

      expect(removeEventListener).to.be.calledWithExactly('click', sayt.checkRootNode);
    });
  });
});
