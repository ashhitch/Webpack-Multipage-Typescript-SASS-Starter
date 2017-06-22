
import 'jQuery';

console.log('page A');

import 'jQuery';

function component () {
  var element = document.createElement('div');

  return element;
}

document.body.appendChild(component());