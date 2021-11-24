/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const renderTweets = function(tweets) {
  for (let tweet of tweets) {
    const $tweet = createTweetElement(tweet);
      $('#old-tweets').prepend($tweet);
  }
};

const createTweetElement = function(tweetData) {
  const {user, content, created_at} = tweetData;
  const tweetTemplate = $(`<article>
      <header>
        <div class="icon-name"></div>
        <img src="${user.avatars}" class="icon">
          <span class="name">${user.name}</span>
        </div>

        <div class="tweet-user">      
          <span>${user.handle}</span>
        </div>

      </header>
     <div class="tweet-message">${content.text}</div>
      <footer class="tweet-footer">
        <output name="date" class="date" for="old-tweets">${timeago.format(created_at)}</output>
    
        <div class="tweet-icons">
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
        </div>
      </footer>
    </article>`);
  return tweetTemplate;
}

const loadTweets = function () {
  $.ajax("/tweets", {
    method: "GET"})
    .then(function(tweets) {
      renderTweets(tweets);
  });
}

$(document).ready(function() {

  $("#post-tweet").submit(function(event) {
    event.preventDefault();

    $.ajax({
      type: "POST",
      data: $("#post-tweet").serialize(),
    });


  });



  loadTweets();
})


