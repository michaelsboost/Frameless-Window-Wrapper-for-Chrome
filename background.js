/**
 * Listens for the app launching, then creates the window.
 *
 * @see http://developer.chrome.com/apps/app.runtime.html
 * @see http://developer.chrome.com/apps/app.window.html
 */
chrome.app.runtime.onLaunched.addListener(function(launchData) {
  chrome.app.window.create("app/index.html", {
    id: "mainWindow",
    "bounds": {
        "width" :    800,
        "height":   520
    },
    minWidth : 240,
    minHeight: 320,
    frame    : "none"
  });
});