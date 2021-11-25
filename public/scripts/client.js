/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Renders tweets using the blueprint from createTweetElement function and push to #old-tweets
const renderTweets = function(tweets) {
  for (let tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $('#old-tweets').prepend($tweet);
  }
  $('#tweet-text').val('');
};

// Using AJAX to GET data for new tweets
const loadTweets = function() {
  $.ajax("/tweets", {
    method: "GET"})
    .then(function(tweets) {
      renderTweets(tweets);
    });
};

// Blueprint for tweets to be filled with data
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
};


// Calling new Tweets, preventing page from refreshing
$(document).ready(function() {
  $("#post-tweet").submit(function(event) {
    event.preventDefault();

// Checking if tweet is valid and posting, and if not producing correct error display
    const userEntry = $(this).find("#tweet-text").val();
    if (!userEntry) {
      generateError("#error", "&#9940;Your tweet cannot be blank!&#9940;");
    } else if (userEntry.length > 140) {
      generateError("#error", "&#9940;Your tweet is too long!&#9940;");
    } else {
      $.ajax("/tweets", {
        type: "POST",
        data: $("#post-tweet").serialize(),
        success: successfulTweet()
      })
        .then(() => {
          $.ajax({
            url: "http://localhost:8080/tweets",
            method: "GET",
          });
        });
    }
  });
  loadTweets();
});


// Extra Functions

// Function for successful tweet action
const successfulTweet = function() {
  loadTweets();
  $("#counter").val("140");
};

// Function for generating error message
const generateError = function(location, message) {
  return $(location).html(message).show().slidedown(
  );
};

// Function for preventing cross-site attacks
const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};


