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
  request: function(location, method, data) {
    var requestURL = this.options.baseUrl + location;

    if (!method) {
      method = "GET";
    }

    return $.ajax({
      url: requestURL,
      dataType: 'JSON',
      method: method,
      contentType: 'application/json',
      async: false,
      data: JSON.stringify(data),
      headers: {
        'Authorization': 'Basic ' + btoa(Jira.options.username + ':' + Jira.options.password)
      }
    }).responseJSON;
  },
  dashboard: function(dashboardId) {
    return this.request('rest/api/2/dashboard' + ((dashboardId) ? '/' + dashboardId : ''));
  },
  issue: function(ticketNo) {
    var jiraTicket = this.request('rest/api/2/issue/' + ticketNo);

    return {
      id: jiraTicket.id,
      key: jiraTicket.key,
      summary: jiraTicket.fields.summary,
      description: jiraTicket.fields.description,
      priority: jiraTicket.fields.priority,
      status: jiraTicket.fields.status,
      project: jiraTicket.fields.project,
      created: jiraTicket.fields.created,
      creator: jiraTicket.fields.creator,
      reporter: jiraTicket.fields.reporter,
      assignee: jiraTicket.fields.assignee,
      progress: {
        progress: jiraTicket.fields.progress.progress,
        percent: jiraTicket.fields.progress.percent,
        total: jiraTicket.fields.progress.total,
        aggregated: jiraTicket.fields.aggregateprogress,
        estimate: jiraTicket.fields.aggregatetimeestimate,
        originalestimate: jiraTicket.fields.aggregatetimeoriginalestimate,
        timespent: jiraTicket.fields.aggregatetimespent
      },
      links: jiraTicket.fields.issuelinks,
      attachments: jiraTicket.fields.attachment,
      comments: jiraTicket.fields.comment.comments,
      worklog: jiraTicket.fields.worklog.worklogs,
      jiraObject: jiraTicket,
      update: function(updateObject) {
        return Jira.request('rest/api/2/issue/' + this.key, 'PUT', updateObject);
      },
      updateSummary: function(summary) {
        var ticketUpdate = {
          'update': {
            'summary': [{
              'set': summary
            }]
          }
        };

        this.update(ticketUpdate);
      },
      updateDescription: function(description) {
        var ticketUpdate = {
          'update': {
            'description': [{
              'set': description
            }]
          }
        };

        this.update(ticketUpdate);
      },
      assign: function(user) {
        var data = {
          'name': (typeof user === 'string') ? user : user.name
        };

        return Jira.request('rest/api/2/issue/' + this.key + '/assignee', 'PUT', data);
      },
      addComment: function(message) {
        var data = {
          "body": message,
        };

        return Jira.request('rest/api/2/issue/' + this.key + '/comment', 'POST', data);
      },
      delete: function() {
        return Jira.request('rest/api/2/issue/' + this.key, 'DELETE');
      }
    };
  },
  project: function(projectId) {
    var jiraProject = this.request('rest/api/2/project/' + projectId);

    return {
      id: jiraProject.id,
      key: jiraProject.key,
      name: jiraProject.name,
      description: jiraProject.description,
      avatar: jiraProject.avatarUrls,
      lead: jiraProject.lead,
      roles: jiraProject.roles,
      jiraObject: jiraProject
    };
  },
  user: function(username) {
    var jiraUser = this.request('rest/api/2/user?username=' + username);

    return {
      key: jiraUser.key,
      name: jiraUser.name,
      displayName: jiraUser.displayName,
      emailAddress: jiraUser.emailAddress,
      avatar: jiraUser.avatarUrls,
      timezone: jiraUser.timeZone,
      groups: jiraUser.groups,
      jiraObject: jiraUser
    };
  },
  group: function(group) {
    var jiraGroup = this.request('rest/api/2/group' + ((group) ? '?groupName=' + group : ''));

    return jiraGroup;
  }
};
