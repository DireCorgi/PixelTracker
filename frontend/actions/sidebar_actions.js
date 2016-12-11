export const SHOW_COLUMN = 'SHOW_COLUMN';
export const HIDE_COLUMN = 'HIDE_COLUMN';
export const RESET_VIEW = 'RESET_VIEW';

export const showColumn = (columnName) => {
  return {
    type: SHOW_COLUMN,
    columnName,
  };
};

export const hideColumn = (columnName) => {
  return {
    type: HIDE_COLUMN,
    columnName,
  };
};

export const resetView = () => {
  return { type: RESET_VIEW };
};
