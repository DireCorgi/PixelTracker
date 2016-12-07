# Pixel Tracker

[Live Website](www.pixeltracker.org)
[Trello](https://trello.com/b/hOvAm6f2/pixeltracker)

### Minimum Viable Product

Pixel Tracker is an agile project management app based off of the popular
Pivotal Tracker.

#### Features
- [ ] New account creation, login, and guest/demo login
- [ ] Projects/Project Page
- [ ] Stories
- [ ] Story Workflow
- [ ] Drag and Drop Prioritization
- [ ] A production README
- [ ] Hosting on Heroku

### Design Docs
1. [Wireframes](/docs/wireframes)
2. [React Components](/docs/component-hierarchy.md)
3. [Sample State](/docs/sample-state.md)
4. [DB Schema](/docs/schema.md)
5. [API Endponts](/docs/api-endpoints.md)

### Implementation Timeline
#### Phase 1: User Authentication (2 days)
__Objective:__ Complete full back-end and front-end user authentication
#### Phase 2: Projects (2 days)
__Objective:__ Create projects homepage and the ability to create new projects. Also create the singular project page layout with no stories.
#### Phase 3: Stories Back-End and Components (2 days)
__Objective:__ Have the ability to create, update, and view stories, as well as add labels, activity, and tasks through the api.
#### Phase 4: Stories Display (1 day)
__Objective:__ All new stories should be displayed in the icebox in the main project page.
#### Phase 5: Story Workflow (1 day)
__Objective:__ Story status changes will move them to the appropriate display categories in the main project page. Users will have the ability to restart the chain of events by rejecting at the final step.
#### Phase 6: Drag and Drop Prioritization (1 day)
__Objective:__ By default items with higher points will be placed on top, but users can manually drag and drop items to change the order. These can only apply to stories with similar statuses.  

#### Additional Features
- [ ] Iterations
- [ ] Velocity
- [ ] User Permissions
