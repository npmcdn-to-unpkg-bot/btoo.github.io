//converts line to path

var lines = document.querySelectorAll('line');
lines.forEach((line)=>{
  var svgNS = line.ownerSVGElement.namespaceURI;
  var path = document.createElementNS(svgNS,'path');
  var M = 'M'+line.getAttribute('x1')+','+line.getAttribute('y1');
  var L = 'L'+line.getAttribute('x2')+','+line.getAttribute('y2');
  path.setAttribute('stroke-width',line.getAttribute('stroke-width'));
  path.setAttribute('stroke-linecap',line.getAttribute('stroke-linecap'));
  path.setAttribute('stroke',line.getAttribute('stroke'));
  path.setAttribute('d',M+L);
  line.parentNode.replaceChild(path,line);
});