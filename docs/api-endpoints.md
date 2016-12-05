## API Endpoints
### HTML API
#### Root
* GET / - gets root React web app

### JSON API
#### Users
* POST /api/users
* PATCH /api/users

#### Session
*POST /api/session
*DELETE /api/session

#### Project
* POST /api/projects
* DELETE /api/projects
* GET /api/projects
* GET /api/projects/:id

#### ProjectMembers
* GET /api/projects/:id/members
* POST /api/projects/:id/members
* DELETE /api/projects/:project_id/members/:member_id

#### Story
* POST /api/projects/:id/stories
* DELETE /api/projects/:project_id/stories/:story_id
* GET /api/projects/:project_id/stories/:story_id
* GET /api/projects/:project_id/stories/
* PATCH /api/projects/:project_id/stories/:story_id

### StoryFollowers
* POST /api/storyfollowers/
* DELETE /api/storyfollowers/:id

### StoryOwners
* POST /api/storyowners/
* DELETE /api/storyowners/:id

#### Tasks
* Shows up on story detail view
* POST /api/projects/:project_id/stories/:story_id/tasks
* PATCH /api/projects/:project_id/stories/:story_id/tasks/:task_id
* DELETE /api/projects/:project_id/stories/:story_id/tasks/:task_id

#### Labels
* Shows up on story detail view
* GET /api/labels/
* POST /api/labels/

#### StoryLabels
* POST /api/storylabels
* DELETE /api/storylabels/:id

#### Activity
* Shows up on story detail view
* POST /api/projects/:project_id/stories/:story_id/activities
* PATCH /api/projects/:project_id/stories/:story_id/activities/:activity_id
* DELETE /api/projects/:project_id/stories/:story_id/activities/:activity_id
