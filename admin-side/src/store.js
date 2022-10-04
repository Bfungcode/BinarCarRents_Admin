import {configureStore} from "@reduxjs/toolkit"
import authReducer from './auth/auth-slice';
import messageReducer from './auth/message-slice';




const store = configureStore({
  reducer : {
    auth : authReducer,
    message : messageReducer,
  },
  devTools: true,
});

export default store;