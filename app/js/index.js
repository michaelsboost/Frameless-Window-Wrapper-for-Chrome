$(".minimize").click(function() {
  chrome.app.window.current().minimize();
});

// Maximize window function
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
$(".titlebar").dblclick(function() {
  maxWindow();
});

var ValSetTest = function() {
  $(".site").val("http://myrrord.sf.net/");
  $(".url").attr("src", "http://myrrord.sf.net/");
  $(".webWrap").slideDown(100);
};

var TestMaximize = function() {
  ValSetTest();
  
  $(".titlebar").trigger("dblclick");
  $(".titlebar").trigger("dblclick");
  $(".maximize").trigger("click");
  $(".maximize").trigger("click");
}

setTimeout(function() { 
  ValSetTest();
}, 300);

$(".choose").click(function() {
  $(".url").attr("src", $(".site").val() );
  $(".webWrap").slideToggle(100);
});

$(".site").keydown(function(e) {
  if (e.which == 13) {
    $(".choose").click();
  }
});

$(".gear").click(function() {
  $(".webWrap").slideToggle(100);
});
$(".webWrap").hide();

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
    case "close": window.close(); break;
  }

  // Hide it AFTER the action was triggered
  $(".custom-menu").hide(100);
});

// function runTest() {
//   $(".site").val("http://whatsmybrowsersize.com/").change();
//   $(".choose").click();
// }
// runTest();