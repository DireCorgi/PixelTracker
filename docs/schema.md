## Schema Information

### users
| column name | data type | details |
| --- | --- | --- |
| id | integer | not null, primary key |
| username | string | not null, index, unique |
| email | string | not null, index, unique |
| password_digest | string | not null |
| session_token | string | not null, index, unique |

### projects
| column name | data type | details |
| --- | --- | --- |
| id | integer | not null, primary key |
| name | string | not null |
| private | boolean | not null |

### project_members
| column name | data type | details |
| --- | --- | --- |
| id | integer | not null, primary key |
| project_id | integer | not null, index |
| user_id | integer | not null, index |

### stories
| column name | data type | details |
| --- | --- | --- |
| id | integer | not null, primary key |
| title | string | not null |
| category | string | not null |
| points | integer | not null |
| state | string | not null |
| requester_id | integer | not null, index |
| description | text |  |
| project_id | integer | not null, index |
| story_ord | integer | not null |

### story_followers
| column name | data type | details |
| --- | --- | --- |
| id | integer | not null, primary key |
| story_id | integer | not null, index |
| user_id | integer | not null, index |

### story_owners
| column name | data type | details |
| --- | --- | --- |
| id | integer | not null, primary key |
| story_id | integer | not null, index |
| user_id | integer | not null, index |

### tasks
| column name | data type | details |
| --- | --- | --- |
| id | integer | not null, primary key |
| body | string | not null |
| complete | boolean | not null, default false |
| story_id | integer | not null, index |
| task_ord | integer | not null |

### labels
| column name | data type | details |
| --- | --- | --- |
| id | integer | not null, primary key |
| name | string | not null |

### story_labels
| column name | data type | details |
| --- | --- | --- |
| id | integer | not null, primary key |
| story_id | integer | not null, index |
| label_id | integer | not null, index |

### activity
| column name | data type | details |
| --- | --- | --- |
| id | integer | not null, primary key |
| body | string | not null |
| story_id | integer | not null, index |
