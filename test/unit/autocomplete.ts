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
          category: CATEOGORY,
          categoryValues: CATEOGORY_VALUES,
          suggestions: SUGGESTIONS,
          navigations: NAVIGATIONS
        });
      });
    });
  });

  describe('init()', () => {
    it('should listen for AUTOCOMPLETE_SUGGESTIONS_UPDATED', () => {
      const on = spy();
      autocomplete.flux = <any>{ on };

      autocomplete.init();

      expect(on).to.be.calledWith(Events.AUTOCOMPLETE_SUGGESTIONS_UPDATED, autocomplete.updateSuggestions);
    });
  });

  describe('updateSuggestions()', () => {
    it('should set values', () => {
      const suggestions = ['1', '2', '3'];
      const navigations = ['4', '5', '6'];
      const categoryValues = ['7', '8', '9'];
      const set = autocomplete.set = spy();

      autocomplete.updateSuggestions(<any>{ suggestions, navigations, category: { values: categoryValues } });

      expect(set).to.be.calledWith({ suggestions, navigations, categoryValues });
    });
  });
});
