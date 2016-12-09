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

### pixels
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
| pixel_ord | integer | not null |

### pixel_followers
| column name | data type | details |
| --- | --- | --- |
| id | integer | not null, primary key |
| pixel_id | integer | not null, index |
| user_id | integer | not null, index |

### pixel_owners
| column name | data type | details |
| --- | --- | --- |
| id | integer | not null, primary key |
| pixel_id | integer | not null, index |
| user_id | integer | not null, index |

### tasks
| column name | data type | details |
| --- | --- | --- |
| id | integer | not null, primary key |
| body | string | not null |
| complete | boolean | not null, default false |
| pixel_id | integer | not null, index |
| task_ord | integer | not null |

### labels
| column name | data type | details |
| --- | --- | --- |
| id | integer | not null, primary key |
| name | string | not null |

### pixel_labels
| column name | data type | details |
| --- | --- | --- |
| id | integer | not null, primary key |
| pixel_id | integer | not null, index |
| label_id | integer | not null, index |

### comments
| column name | data type | details |
| --- | --- | --- |
| id | integer | not null, primary key |
| body | string | not null |
| pixel_id | integer | not null, index |
