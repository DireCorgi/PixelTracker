export const createTask = (task) => {
  return $.ajax({
    url: 'api/tasks/',
    method: 'POST',
    data: { task },
  });
};

export const updateTask = (task) => {
  return $.ajax({
    url: `api/tasks/${task.id}`,
    method: 'PATCH',
    data: { task },
  });
};

export const deleteTask = (taskId) => {
  return $.ajax({
    url: `api/tasks/${taskId}`,
    method: 'DELETE',
  });
};
