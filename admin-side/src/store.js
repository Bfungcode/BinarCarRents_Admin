import { configureStore } from "@reduxjs/toolkit"
import authReducer from './auth/auth-slice';
import messageReducer from './auth/message-slice';
import adminReducer from './features/Admin/adminSlice';




const store = configureStore({
  reducer: {
    auth: authReducer,
    message: messageReducer,
    admin: adminReducer,
  },
  devTools: true,
});

export default store;