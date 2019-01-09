import { SET_SMALL_MENU } from '../actions/types';

const initState = {
  smallRightBar: false
};


export default (state = initState, action ) => {
  switch (action.type) {
    case SET_SMALL_MENU:
      return {
        ...state,
        smallRightBar: !state.smallRightBar
      };
    default:
      return state;
  }
}
