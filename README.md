# jQuery-JiraWrapper

A basic jQuery wrapper for the Jira REST API. If you want to use this on your website, remind to allow CORS  on the JIRA server as this is not enabled by default. Information on how to do this is available here: https://jira.atlassian.com/browse/JRA-30371

Currently only basic authentication is supported, but I will look at OAth later on.

## HOW TO

### Requirements

To work this plugin requires jQuery 1.8 or higher.

### Initialization

You can initialize the plugin with the following code:

'''javascript
Jira.init({
  baseUrl: 'https://jira.atlassian.com/',
  username: 'username',
  password: 'password'
});
'''

### Fetching/updating/deleting an issue

It is possible to fetch an issue and modify it.

'''javascript
  Jira.issue('TICKET-001');
'''

The following code deletes the issue if you have the permissions!

'''javascript
  Jira.issue('TICKET-001').delete();
'''

Or you can update a ticket using one of the following functions

'''javascript
  Jira.issue('TICKET-001').updateSummary('Summary Text');
  Jira.issue('TICKET-001').updateName('Name of the ticket');
'''

Off course if you are planning to do multiple operations to the same ticket it is best to do that with less server requests like this:

'''javascript
  var issue = Jira.issue('TICKET-001'):

  issue.updateSummary('Summary Text');
  issue.updateName('Name of the ticket');
'''

Another option is to do multiple updates within the same request:

'''javascript
  var ticketUpdate = {
    "update": {
        "summary": [
            {
                "set": "Bug in business logic"
            }
        ],
        "timetracking": [
            {
                "edit": {
                    "originalEstimate": "1w 1d",
                    "remainingEstimate": "4d"
                }
            }
        ],
        "labels": [
            {
                "add": "triaged"
            },
            {
                "remove": "blocker"
            }
        ],
        "components": [
            {
                "set": ""
            }
        ]
    }
  };

  Jira.issue('TICKET-001').update(ticketUpdate);
'''
