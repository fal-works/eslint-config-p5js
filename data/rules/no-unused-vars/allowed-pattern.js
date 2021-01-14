const variablenames = [
  "preload",
  "setup",
  "draw",
  "windowResized",
  "keyTyped",
  "keyPressed",
  "keyReleased",
  "mouseMoved",
  "mouseDragged",
  "mousePressed",
  "mouseReleased",
  "mouseClicked",
  "doubleClicked",
  "mouseWheel",
  "touchStarted",
  "touchMoved",
  "touchEnded",
  "deviceMoved",
  "deviceTurned",
  "deviceShaken",
];
const pattern = variablenames.join("|");
module.exports = pattern;
