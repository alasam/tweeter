$(document).ready(function() {
  $("#tweet-text").on("input", function() {
    const charLimit = 140;
    const charLeft = charLimit - $(this).val().length;
    const counter = $(this).parent().find(".counter");
    counter.text(charLeft);
  });
});
