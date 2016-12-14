export const newPixelState = (curState) => {
  switch (curState) {
    case 'Unstarted':
      return 'Started';
    case 'Started':
      return 'Finished';
    case 'Finished':
      return 'Delivered';
    case 'Delivered':
      return 'Accepted';
    case 'Rejected':
      return 'Started';
    default:
      return curState;
  }
};

export const buttonName = (curState) => {
  switch (curState) {
    case 'Unstarted':
      return 'Start';
    case 'Started':
      return 'Finish';
    case 'Finished':
      return 'Deliver';
    case 'Delivered':
      return 'Accept';
    case 'Rejected':
      return 'Restart';
    default:
      return 'none';
  }
};
