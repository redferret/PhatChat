
import $ from 'jquery';

let axiosDefaults = require('axios/lib/defaults');

function getCSRF() {
  try {
    return window.axios.defaults.headers.common['X-CSRF-TOKEN']
  } catch (error) {
    return 'Not Defined';
  }
}

const HEADERS = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'X-CSRF-TOKEN': getCSRF()
};

class Router {
  constructor() {
    this._routes = new Map();
    try {
      axiosDefaults.baseURL = $('meta[name="baseURL"]').attr('content');
    } catch(error) {
      // Do nothing... who cares
    }
  }

  registerRoute(name, route) {
    this._routes.set(name, route);
  }

  route(name, args) {
    return `${axiosDefaults.baseURL}${this.getRoute(name, args)}`;
  }

  getRoute(name, args) {
    let route = this._routes.get(name);
    if (route instanceof Function) {
      return route(args);
    }
    console.error(`The route ${name} was not registered or is not a function`);
  }

  relocateTo(url) {
    window.location.replace(url);
  }

  setUrl(url) {
    window.location.href = url;
  }

  request(type, routeName, data, routeArgs) {
    if (typeof data == 'undefined' || data == null) {
      data = {
        _token: getCSRF()
      }
    } else {
      data._token = getCSRF();
    }

    return {
      method: type,
      url: this.getRoute(routeName, routeArgs),
      headers: HEADERS,
      data: data
    }
  }
}

export function handleError(error) {
  console.error('HTTP request failed', error);
}

export function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    var error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

export function parseJSON(response) {
  return response.json();
}

export default new Router();
