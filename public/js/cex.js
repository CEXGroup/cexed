
function triainglesBitches() {
  var container = document.getElementById('container');
/*   var pattern = Trianglify({
      width: window.innerWidth,
      height: window.innerHeight
  });
  document.body.appendChild(pattern.canvas()); */
document.body.appendChild(Trianglify({variance: "1",
  seed: 'wv44w',
  x_colors: 'YlGnBu',
  width: window.innerWidth,
  height: window.innerHeight
}).canvas());
}
