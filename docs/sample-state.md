```javascript
{
  currentUser: {
    id: 1,
    username: 'guest',
    errors: [],
  },
  projects: {
    1: {
      id: 1,
      name: 'Sample Project',    
    }
    2: {
      id: 2,
      name: 'Sample Project 2',
    }
  }
  stories: {
    5: {
      id: 5,
      category: 'chore',
      state: 'accepted',
      labels: ['deployment, epic'],
      followers: [],
      points: 0,
      ord: 1,
    }
    7: {
      id: 7,
      category: 'feature',
      state: 'started',
      labels: ['important'],
      followers: [],
      points: 3,
      ord: 2,
    }
  }
  storyDetails: {
    7: {
      id: 7,
      category: 'feature',
      points: 3,
      state: 'started',
      requester: { id: 1, username: 'guest'},
      owners: [{id: 1, username: 'guest'}],
      followers: [],
      description: 'description would go here',
      updated_at: 10-4-2016,
      labels: ['important'],
      tasks: {
        3: {
          id: 3,
          name: 'task',
          complete: false,
          ord: 1,
        }
      }
      activity: [
        {
          id: 3,
          body: 'activity here',
          username: 'guest',
          created-at: 'Dec 4 9:59pm'
        }
      ]
    }
  }

  members: {
    1: {
      id: 1,
      username: 'guest',
    }
    2: {
      id: 2,
      username: 'frankye',
    }
  }


}

```
