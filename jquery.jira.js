/**
 * jQuery Jira Wrapper v0.1 (https://github.com/taurgis/jQuery-JiraWrapper)
 *
 * Copyright 2015, Thomas Theunen
 * https://www.thomastheunen.eu
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 ***/

var Jira = {
  options: {
    ssl: true,
    debug: false,
    oauth: false
  },
  init: function(options) {
    this.options = $.extend({}, this.options, options);

    this.authenticate();
  },
  authenticate: function() {
    //Do nothing here yet.
  },
  request: function(location) {
    var requestURL = this.options.baseUrl + location;

    return $.ajax({
      url: requestURL,
      dataType: 'json',
      async: false,
      headers: {
        'Authorization': "Basic " + btoa(Jira.options.username + ":" + Jira.options.password)
      }
    }).responseJSON;
  },
  issue: function(ticketNo) {
    return this.request("rest/api/2/issue/" + ticketNo);
  }
};
