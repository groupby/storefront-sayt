import * as chai from 'chai';
import * as mock from 'mock-require';
import * as sinonChai from 'sinon-chai';

chai.use(sinonChai);

mock('../src/sayt/index.html', {});
mock('../src/autocomplete/index.html', {});
mock('../src/categories/index.html', {});
mock('../src/navigations/index.html', {});
mock('../src/products/index.html', {});
mock('../src/refinements/index.html', {});
mock('../src/search-terms/index.html', {});
