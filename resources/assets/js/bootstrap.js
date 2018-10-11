
import Echo from "laravel-echo";
import Pusher from 'pusher-js';

window._ = require('lodash');
window.Popper = require('popper.js').default;

/**
 * We'll load jQuery and the Bootstrap jQuery plugin which provides support
 * for JavaScript based Bootstrap features such as modals and tabs. This
 * code may be modified to fit the specific needs of your application.
 */

try {
  window.$ = window.jQuery = require('jquery');

  require('bootstrap');
} catch (e) {
  console.error('Unable to load jquery');
}

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

window.axios = require('axios');

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

/**
 * Next we will register the CSRF Token as a common header with Axios so that
 * all outgoing HTTP requests automatically have it attached. This is just
 * a simple convenience so we don't have to attach every token manually.
 */

let token = document.head.querySelector('meta[name="csrf-token"]');

if (token) {
  window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
} else {
  console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
}

/**
 * Require our routes and all the application actions
 */
require('./actions/ActionRepo.js');
require('./routes.js');

var pusher = new Pusher('3258a83179e757b040f9', {
  cluster: 'mt1',
  forceTLS: true
});

var channel = pusher.subscribe('chat');
channel.bind('MessageSend', function(data) {
  alert(data.message);
});

window.Echo = new Echo({
  broadcaster: 'pusher',
  key: '3258a83179e757b040f9',
  cluster: 'mt1',
  encrypted: true
});
