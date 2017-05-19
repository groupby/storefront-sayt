import * as pkg from '../../src';
import Sayt from '../../src/sayt';
import SaytAutocomplete from '../../src/sayt-autocomplete';
import SaytCategories from '../../src/sayt-categories';
import SaytNavigations from '../../src/sayt-navigations';
import SaytProducts from '../../src/sayt-products';
import SaytRefinements from '../../src/sayt-refinements';
import suite from './_suite';

suite('package', ({ expect }) => {
  it('should expose Sayt', () => {
    expect(pkg.Sayt).to.eq(Sayt);
  });

  it('should expose SaytAutocomplete', () => {
    expect(pkg.SaytAutocomplete).to.eq(SaytAutocomplete);
  });

  it('should expose SaytCategories', () => {
    expect(pkg.SaytCategories).to.eq(SaytCategories);
  });

  it('should expose SaytNavigations', () => {
    expect(pkg.SaytNavigations).to.eq(SaytNavigations);
  });

  it('should expose SaytProducts', () => {
    expect(pkg.SaytProducts).to.eq(SaytProducts);
  });

  it('should expose SaytRefinements', () => {
    expect(pkg.SaytRefinements).to.eq(SaytRefinements);
  });
});
