var login = true;


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

function changeScreen() {
  if(login) {
    $('#container').addClass('inactiveDiv');
    $('#container').removeClass('activeDiv');

    $('#chat_container').removeClass('inactiveDiv');
    $('#chat_container').addClass('activeDiv');

    login = false;
  } else {
    $('#chat_container').removeClass('activeDiv');
    $('#chat_container').addClass('inactiveDiv');

    $('#container').removeClass('inactiveDiv');
    $('#container').addClass('activeDiv');
    login = true;
  }
}

$(document).keypress(function(e) {
    if(e.which == 13) {
        changeScreen();
    }
});