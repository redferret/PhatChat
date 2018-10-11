import Actions from '../AppActions.js';
import Axios from 'axios';
import Router from '../../router.js';

import { LOG_OUT, LOG_IN } from '../../constants.js';

Actions.register(LOG_OUT, payload => {
  Axios(Router.request('POST', LOG_OUT))
  .then(response => {
    // Router.setUrl(response.request.responseURL);
  });
});
