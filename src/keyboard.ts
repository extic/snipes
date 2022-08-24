const pressedKeys: { [key: string]: boolean } = {};

export function isKeyPressed(key: string) {
  return pressedKeys[key];
}

export function registerKeyHandlers() {
  window.onkeyup = function (e) {
    pressedKeys[e.code] = false;
  };
  window.onkeydown = function (e) {
    pressedKeys[e.code] = true;
  };
}
