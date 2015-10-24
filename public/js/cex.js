
function triainglesBitches() {
  var container = document.getElementById('container');
  var pattern = Trianglify({
      width: window.innerWidth,
      height: window.innerHeight
  });
  document.body.appendChild(pattern.canvas());
  Trianglify({variance: "1", seed: 'wv44w', x_colors: 'random'}).canvas()
}
