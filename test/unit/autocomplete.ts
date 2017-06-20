import { Events } from '@storefront/core';
import Autocomplete from '../../src/autocomplete';
import suite from './_suite';

const CATEOGORY = 'brand';
const CATEOGORY_VALUES = ['a', 'b', 'c'];
const SUGGESTIONS = ['d', 'e', 'f'];
const NAVIGATIONS = ['g', 'h', 'i'];

suite('Autocomplete', ({ expect, spy }) => {
  let autocomplete: Autocomplete;

  beforeEach(() => {
    Autocomplete.prototype.flux = <any>{
      store: {
        getState: () => ({
          data: {
            autocomplete: {
              category: {
                field: CATEOGORY,
                values: CATEOGORY_VALUES
              },
              suggestions: SUGGESTIONS,
              navigations: NAVIGATIONS
            }
          }
        })
      }
    };
    autocomplete = new Autocomplete();
  });
  afterEach(() => delete Autocomplete.prototype.flux);

  describe('constructor()', () => {
    describe('state', () => {
      it('should set initial value', () => {
        expect(autocomplete.state).to.eql({
          selected: -1,
          category: CATEOGORY,
          categoryValues: CATEOGORY_VALUES,
          suggestions: SUGGESTIONS,
          navigations: NAVIGATIONS
        });
      });
    });
  });

  describe('init()', () => {
    it('should listen for flux events', () => {
      const on = spy();
      autocomplete.flux = <any>{ on };
      autocomplete.services = <any>{ autocomplete: { registerAutocomplete: () => null } };

      autocomplete.init();

      expect(on).to.have.callCount(4)
        .and.calledWith(Events.AUTOCOMPLETE_SUGGESTIONS_UPDATED, autocomplete.updateSuggestions)
        .and.calledWith('sayt:activate_next', autocomplete.activateNext)
        .and.calledWith('sayt:activate_previous', autocomplete.activatePrevious)
        .and.calledWith('sayt:select_active', autocomplete.selectActive);
    });

    it('should register with autocomplete service', () => {
      const registerAutocomplete = spy();
      autocomplete.services = <any>{ autocomplete: { registerAutocomplete } };
      autocomplete.flux = <any>{ on: () => null };

      autocomplete.init();

      expect(registerAutocomplete).to.be.calledWith(autocomplete);
    });
  });

  describe('activationTargets()', () => {
    it('should return a NodeList of .gb-autocomplete-target elements', () => {
      const targets = ['a', 'b'];
      const querySelectorAll = spy(() => targets);
      autocomplete.root = <any>{ querySelectorAll };

      const selected = autocomplete.activationTargets();

      expect(selected).to.eq(targets);
      expect(querySelectorAll).to.be.calledWith('.gb-autocomplete-target');
    });
  });

  describe('activateNext()', () => {
    const targets = ['a', 'b', 'c'];

    it('should deactivate old target if it exists', () => {
      const selected = 1;
      const setActivation = autocomplete.setActivation = spy();
      autocomplete.state = <any>{ selected };
      autocomplete.activationTargets = (): any => targets;
      autocomplete.isActive = () => true;

      autocomplete.activateNext();

      expect(setActivation).to.be.calledTwice
        .and.calledWith(targets, selected, false)
        .and.calledWith(targets, selected + 1, true);
    });

    it('should only activate next if no old target exists', () => {
      const selected = 1;
      const setActivation = autocomplete.setActivation = spy();
      autocomplete.state = <any>{ selected };
      autocomplete.activationTargets = (): any => targets;
      autocomplete.isActive = () => false;

      autocomplete.activateNext();

      expect(setActivation).to.be.calledOnce
        .and.calledWith(targets, selected + 1, true);
    });

    it('should not move activation if at end of targets', () => {
      autocomplete.setActivation = () => expect.fail();
      autocomplete.state = <any>{ selected: 2 };
      autocomplete.activationTargets = (): any => targets;

      autocomplete.activateNext();
    });
  });

  describe('activatePrevious()', () => {
    const targets = ['a', 'b', 'c'];

    it('should deactivate old target if it exists', () => {
      const selected = 1;
      const setActivation = autocomplete.setActivation = spy();
      autocomplete.state = <any>{ selected };
      autocomplete.activationTargets = (): any => targets;
      autocomplete.isActive = () => true;

      autocomplete.activatePrevious();

      expect(setActivation).to.be.calledTwice
        .and.calledWith(targets, selected, false)
        .and.calledWith(targets, selected - 1, true);
    });

    it('should not activate previous if at beginning of targets', () => {
      const selected = 0;
      const setActivation = autocomplete.setActivation = spy();
      autocomplete.state = <any>{ selected };
      autocomplete.activationTargets = (): any => targets;
      autocomplete.isActive = () => true;

      autocomplete.activatePrevious();

      expect(setActivation).to.be.calledOnce
        .and.calledWith(targets, selected, false);
    });

    it('should not change activate element if no current active element', () => {
      autocomplete.setActivation = () => expect.fail();
      autocomplete.activationTargets = (): any => targets;
      autocomplete.isActive = () => false;

      autocomplete.activatePrevious();
    });
  });

  describe('selectActive()', () => {
    it('should click anchor tag in selected element', () => {
      const click = spy();
      const querySelector = spy(() => ({ click }));
      const set = autocomplete.set = spy();
      autocomplete.state = <any>{ selected: 1 };
      autocomplete.activationTargets = (): any => [{}, { querySelector }, {}];
      autocomplete.isActive = () => true;

      autocomplete.selectActive();

      expect(querySelector).to.be.calledWith('a');
      expect(click).to.be.called;
      expect(set).to.be.calledWith({ selected: -1 });
    });

    it('should not remove selection if no active element', () => {
      autocomplete.set = () => expect.fail();
      autocomplete.isActive = () => false;

      autocomplete.selectActive();
    });
  });

  describe('updateSuggestions()', () => {
    const suggestions = ['1', '2', '3'];
    const navigations = ['4', '5', '6'];
    const categoryValues = ['7', '8', '9'];

    it('should set values and not change activation', () => {
      const set = autocomplete.set = spy();
      autocomplete.flux = <any>{ emit: () => null };
      autocomplete.isActive = () => false;
      autocomplete.setActivation = () => expect.fail();

      autocomplete.updateSuggestions(<any>{ suggestions, navigations, category: { values: categoryValues } });

      expect(set).to.be.calledWith({ suggestions, navigations, categoryValues, selected: -1 });
    });

    it('should deactivate selected element', () => {
      const selected = 1;
      const targets = ['a', 'b', 'c'];
      const set = autocomplete.set = spy();
      const setActivation = autocomplete.setActivation = spy();
      autocomplete.flux = <any>{ emit: () => null };
      autocomplete.activationTargets = (): any => targets;
      autocomplete.state = <any>{ selected };
      autocomplete.isActive = () => true;

      autocomplete.updateSuggestions(<any>{ suggestions, navigations, category: { values: categoryValues } });

      expect(set).to.be.calledWith({ suggestions, navigations, categoryValues, selected: -1 });
      expect(setActivation).to.be.calledWith(targets, selected, false);
    });

    it('should inactivate sayt when there are no suggestions', () => {
      const emit = spy();
      autocomplete.flux = <any>{ emit };
      autocomplete.set = () => null;

      autocomplete.updateSuggestions(<any>{ suggestions: [], navigations: [], category: { values: [] } });

      expect(emit).to.be.calledWith('sayt:hide');
    });

    it('should activate sayt when there are suggestions', () => {
      const emit = spy();
      autocomplete.flux = <any>{ emit };
      autocomplete.set = () => null;

      autocomplete.updateSuggestions(<any>{ suggestions, navigations, category: { values: categoryValues } });

      expect(emit).to.be.calledWith('sayt:show');
    });
  });

  describe('setActivation()', () => {
    it('should add gb-active to classList if activating and update state', () => {
      const add = spy();
      const state = autocomplete.state = <any>{ selected: 4 };

      autocomplete.setActivation(<any>[{}, { classList: { add } }, {}], 1, true);

      expect(add).to.be.calledWith('gb-active');
      expect(state.selected).to.eq(1);
    });

    it('should remove gb-active from classList if deactivating', () => {
      const remove = spy();
      const selected = 4;
      const state = autocomplete.state = <any>{ selected };

      autocomplete.setActivation(<any>[{}, { classList: { remove } }, {}], 1, false);

      expect(remove).to.be.calledWith('gb-active');
      expect(state.selected).to.eq(selected);
    });
  });

  describe('isActive()', () => {
    it('should return true if there is an active selection', () => {
      autocomplete.state = <any>{ selected: 3 };

      expect(autocomplete.isActive()).to.be.true;
    });

    it('should return false if there is no active selection', () => {
      autocomplete.state = <any>{ selected: -1 };

      expect(autocomplete.isActive()).to.be.false;
    });
  });
});
