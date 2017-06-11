import Sayt from '../../src/sayt';
import suite from './_suite';

suite('Sayt', ({ expect, spy }) => {
  let sayt: Sayt;

  beforeEach(() => sayt = new Sayt());

  describe('constructor()', () => {
    describe('state', () => {
      it('should set initial value', () => {
        expect(sayt.state.isActive).to.be.false;
        expect(sayt.state.showProducts).to.be.true;
      });

      describe('highlight()', () => {
        it('should replace the current autocomplete query', () => {
          const query = 'yellow tie';
          sayt.flux = <any>{ store: { getState: () => ({ data: { autocomplete: { query } } }) } };

          const highlighted = sayt.state.highlight('flamboyant yellow tie', '<i>$&</i>');

          expect(highlighted).to.eq('flamboyant <i>yellow tie</i>');
        });

        it('should be case insensitive', () => {
          const query = 'YelLoW tIE';
          sayt.flux = <any>{ store: { getState: () => ({ data: { autocomplete: { query } } }) } };

          const highlighted = sayt.state.highlight('flamboyant YElLOw Tie', '<p>$&</p>');

          expect(highlighted).to.eq('flamboyant <p>YElLOw Tie</p>');
        });
      });
    });
  });

  describe('init()', () => {
    it('should register with autocomplete service', () => {
      const register = spy();
      sayt.services = <any>{ autocomplete: { register } };
      sayt.flux = <any>{ on: () => null };

      sayt.init();

      expect(register).to.be.calledWith(sayt);
    });

    it('should listen for sayt:show', () => {
      const on = spy();
      sayt.flux = <any>{ on };
      sayt.services = <any>{ autocomplete: { register: () => null } };

      sayt.init();

      expect(on).to.be.calledWith('sayt:show', sayt.setActive);
    });

    it('should listen for sayt:hide', () => {
      const on = spy();
      sayt.flux = <any>{ on };
      sayt.services = <any>{ autocomplete: { register: () => null } };

      sayt.init();

      expect(on).to.be.calledWith('sayt:hide', sayt.setInactive);
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

  describe('setInctive()', () => {
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
});
