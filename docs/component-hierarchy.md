### Component Hierarchy

##### AuthformContainer
* AuthForm

##### DashboardContainer
* Header
* ProjectIndex

##### ProjectContainer
* ProjectHeader
* Sidebar
* StoryIndex

##### NewProjectContainer
* NewProject

##### StoryContainer
* StoryDetailView

##### MemberContainer
* ProjectHeader
* NewMember
* MemberIndex

##### ProjectIndex
* ProjectSummaryView

##### StoryIndex
* StoryFilterColumn
  * StorySummaryView

##### StoryDetailView
* StoryName
* StoryTags
* StoryDescription
* LabelsContainer
  * LabelsIndex
  * NewLabels
* TasksContainer
  * TasksIndex
  * NewTasks
* ActivityContainer
  * ActivityIndex
  * NewActivity

### Routes
| Path | Component |
| --- | --- |
| /signup | AuthformContainer |
| /signin | AuthformContainer |
| /dashboard | DashboardContainer |
| /projects/new | NewProjectContainer |
| /projects/:projectid | ProjectContainer |
| /projects/:projectid/stories/:storyid | StoryContainer |
| /projects/:projectid/members/ | MemberContainer |
