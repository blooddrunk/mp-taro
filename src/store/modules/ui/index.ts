import { combineReducers } from 'redux';

import { toast } from './toast';

export const ui = combineReducers({
  toast,
});
