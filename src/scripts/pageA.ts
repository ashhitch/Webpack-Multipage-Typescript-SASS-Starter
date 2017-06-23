
import 'jQuery';

console.log('page A loaded');


$('body').addClass('loaded-page-a');

function component () {
  var element = document.createElement('div');

  return element;
}

document.body.appendChild(component());