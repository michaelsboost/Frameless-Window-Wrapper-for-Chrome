// Global Variables
var webview       = document.querySelector('webview'),
    defaultSite   = "https://michaelsboost.github.io/",
    preloaderAnim = "https://michaelsboost.github.io/kodeWeave/embed/#47618f9fd80204ab1e5deab8e3d900d9?result";

// Toolbar Functions
var maxWindow = function() {
  $(document.body).toggleClass("fullscreen");
  if ( $(".fullscreen").is(":visible") ) {
    chrome.app.window.current().maximize();
  } else {
    chrome.app.window.current().restore();
  }
};
$(".maximize").click(function() {
  maxWindow();
});
$(".minimize").click(function() {
  chrome.app.window.current().minimize();
});
$(".titlebar").dblclick(function() {
  maxWindow();
});
$(".refresh").click(function() {
  webview.reload();
});

$(".choose").click(function() {
  chrome.storage.local.set({key: $(".site").val()});
  $(".url").attr("src", $(".site").val() );
  $(".gear").trigger("click");
});

$(".gear").click(function() {
  $(".webWrap").slideToggle(100);
});
$(".webWrap").hide();

$(".site").keydown(function(e) {
  if (e.which == 13) {
    $(".choose").trigger("click");
  } else {
    chrome.storage.local.set({key: $(".site").val()});
  }
});

// Autoload saved site
chrome.storage.local.get(['key'], function(result) {
  if (!result.key) {
    chrome.storage.local.set({key: defaultSite});
    $(".site").val(defaultSite);
    $(".url").attr("src", defaultSite);
  } else {
    $(".site").val(result.key);
    $(".url").attr("src", result.key);
  }
});

// Trigger action when the contexmenu is about to be shown
$(document).on("contextmenu", ".titlebar", function (event) {

  // Avoid the real one
  event.preventDefault();

  // Show contextmenu
  $(".custom-menu").finish().toggle(100).

  // In the right position (the mouse)
  css({
    top: event.pageY + "px",
    left: event.pageX + "px"
  });
});

// If the document is clicked somewhere
$(document).bind("mousedown", function (e) {

  // If the clicked element is not the menu
  if (!$(e.target).parents(".custom-menu").length > 0) {

    // Hide it
    $(".custom-menu").hide(100);
  }
});

// If the menu element is clicked
$(".custom-menu li").click(function(){

  // This is the triggered action name
  switch($(this).attr("data-action")) {

      // A case for each action. Your actions here
    case "close": chrome.app.window.current().close(); break;
  }

  // Hide it AFTER the action was triggered
  $(".custom-menu").hide(100);
});