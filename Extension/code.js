
var pressed = false;
var cx, cy;
var n = 0;
var nowDownEvent, nowUpEvent;
setTimeout(function () {


  document.addEventListener('keydown', downKey, true);
  document.addEventListener('keyup', upKey, true);
  document.addEventListener('mousemove', mouseMove)
  function downKey(e) {
    nowDownEvent = performance.now()
    var key = e.key.toLowerCase();
    if (key === 't' && !pressed) {
      e.preventDefault();
      pressed = true;
      chrome.runtime.sendMessage({ eventPlease: "trusted", x: cx, y: cy, mouse: "D" }, function (response) {
        console.log(response.yourEvent);
      });
    }
    else if (key === 'r') {
      let clickEvent = document.createEvent('MouseEvents');
      clickEvent.initEvent('mousedown', true, true);
      document.dispatchEvent(clickEvent);
    }

  }
  function upKey(e) {
    nowUpEvent = performance.now()
    var key = e.key.toLowerCase();
    if (key === 't' && pressed) {
      e.preventDefault();
      pressed = false;
      chrome.runtime.sendMessage({ eventPlease: "trusted", x: cx, y: cy, mouse: "U" }, function (response) {
        console.log(response.yourEvent);
      });
    }
    else if (key === 'r') {
      let clickEvent = document.createEvent('MouseEvents');
      clickEvent.initEvent('mouseup', true, true);
      document.dispatchEvent(clickEvent);
    }

  }


  function mouseMove(e) {
    cx = e.clientX;
    cy = e.clientY;
  }

}, 300);




