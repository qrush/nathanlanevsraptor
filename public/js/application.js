// blatantly stolen from http://www.simonwhatley.co.uk/examples/twitter/prototype/
String.prototype.parseURL = function() {
  return this.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&\?\/.=]+/, function(url) {
    return url.link(url);
  });
};

String.prototype.parseUsername = function() {
  return this.replace(/[@]+[A-Za-z0-9-_]+/, function(u) {
    var username = u.replace("@","")
    return u.link("http://twitter.com/"+username);
  });
};

String.prototype.parseHashtag = function() {
  return this.replace(/[#]+[A-Za-z0-9-_]+/, function(t) {
    var tag = t.replace("#","%23")
    return t.link("http://search.twitter.com/search?q="+tag);
  });
};

Tweet = Backbone.Model.extend({
  initialize: function() {
    _.bindAll(this, 'url');
  },
  url: function() {
    return "/tweets/" + this.term;
  }
});

TweetView = Backbone.View.extend({
  initialize: function() {
    _.bindAll(this, 'render');
    this.model.view = this;
    this.model.bind('change', this.render);
  },
  render: function() {
    var handle = this.model.get("handle"),
        html   = this.model.get("text").replace(new RegExp("(" + this.model.replacement + ")", "i"),
          "<span class='track'>$1</span>").parseURL().parseUsername().parseHashtag();

    this.$("a").text("@" + handle).attr("href", "http://twitter.com/" + handle);
    this.$("p").html(html);
    return this;
  }
});

$(function() {
  var nerdTweet    = new Tweet(),
      dignityTweet = new Tweet();
      nerdView     = new TweetView({
        el: $("#raptor-tweets"),
        model: nerdTweet
      }),
      dignityView  = new TweetView({
        el: $("#nathan-tweets"),
        model: dignityTweet
      });

  nerdTweet.term = "nerds";
  dignityTweet.term = "dignity";

  nerdTweet.replacement = "nerds";
  dignityTweet.replacement = "my dignity";

  setInterval(function() {
    nerdTweet.fetch();
    dignityTweet.fetch();
  }, 1000);
});
