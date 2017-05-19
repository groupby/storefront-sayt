import { view, Component } from '@storefront/core';

@view('gb-sayt', require('./index.html'))
class Sayt extends Component {

  state: Sayt.State = { isActive: false };

  constructor() {
    super();
    this.expose('sayt');
  }
}

namespace Sayt {
  export interface State {
    isActive: boolean;
  }
}

export default Sayt;
