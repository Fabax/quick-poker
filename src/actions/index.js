export const setHand = hand => {
  //returns an action
  return {
    type: 'SET_HAND',
    payload: hand,
  };
};

export const updateHand = hand => {
  //returns an action
  return {
    type: 'UPDATE_HAND',
    payload: hand,
  };
};
