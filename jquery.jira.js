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
  request: function(location, successMethod, failureMethod) {
    var requestURL = this.options.baseUrl + location;

    $.ajax({
      url: requestURL,
      dataType: 'json',
      beforeSend: function(xhr) {
        if (!Jira.options.oauth) {
          xhr.setRequestHeader("Authorization", "Basic " + Jira.options.username + ":" + Jira.options.password);
        }
      },
      success: successMethod,
      failure: failureMethod
    });
  },
  issue: function(ticketNo) {
    this.request("rest/api/2/issue/" + ticketNo,
      function(data) {
        alert(data);
      },
      function() {});
  }
};
