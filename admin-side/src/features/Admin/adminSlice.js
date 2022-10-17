import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { setMessage } from '../../auth/message-slice';
import adminAPI from './adminAPI';

export const getAllCars = createAsyncThunk(
  'admin/getAllCars',
  async ({ name, category, isRented, minPrice, maxPrice, page, pageSize }, thunkAPI) => {
    try {
      const response = await adminAPI.getAllCars(name, category, isRented, minPrice, maxPrice, page, pageSize);
      thunkAPI.dispatch(setMessage('done'));
      return response.data;
    } catch (err) {
      const message = err.message.data || err.message || err.message.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);
export const postCar = createAsyncThunk('admin/postCar', async ({ name, category, price, status, image }, thunkAPI) => {
  try {
    const response = await adminAPI.postCar(name, category, price, status, image);
    thunkAPI.dispatch(setMessage('done'));
    return response.data;
  } catch (err) {
    const message = err.message.data || err.message || err.message.toString();
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue();
  }
});
export const getCarById = createAsyncThunk('admin/getCarById', async ({ id }, thunkAPI) => {
  try {
    const response = await adminAPI.getCarById(id);
    thunkAPI.dispatch(setMessage('done'));
    return response.data;
  } catch (err) {
    const message = err.message.data || err.message || err.message.toString();
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue();
  }
});
export const updateCarById = createAsyncThunk(
  'admin/updateCarById',
  async ({ id, name, category, price, status, image }, thunkAPI) => {
    try {
      const response = await adminAPI.updateCarById(id, name, category, price, status, image);
      thunkAPI.dispatch(setMessage('done'));
      return response.data;
    } catch (err) {
      const message = err.message.data || err.message || err.message.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);
export const deleteCarById = createAsyncThunk('admin/deleteCarById', async ({ id }, thunkAPI) => {
  try {
    const response = await adminAPI.deleteCar(id);
    thunkAPI.dispatch(setMessage('done'));
    return response.data;
  } catch (err) {
    const message = err.message.data || err.message || err.message.toString();
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue();
  }
});
export const getAllOrder = createAsyncThunk('admin/getAllOrder', async ({ from, until }, thunkAPI) => {
  try {
    const response = await adminAPI.getAllOrder(from, until);
    thunkAPI.dispatch(setMessage('done'));
    return response.data;
  } catch (err) {
    const message = err.message.data || err.message || err.message.toString();
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue();
  }
});
export const getOrderById = createAsyncThunk('admin/getOrderById', async ({ id }, thunkAPI) => {
  try {
    const response = await adminAPI.getOrderById(id);
    thunkAPI.dispatch(setMessage('done'));
    return response.data;
  } catch (err) {
    const message = err.message.data || err.message || err.message.toString();
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue();
  }
});
export const changeOrderStatus = createAsyncThunk('admin/changeOrderStatus', async ({ id, status }, thunkAPI) => {
  try {
    const response = await adminAPI.changeOrderStatus(id, status);
    thunkAPI.dispatch(setMessage('done'));
    return response.data;
  } catch (err) {
    const message = err.message.data || err.message || err.message.toString();
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue();
  }
});
export const deleteOrder = createAsyncThunk('admin/deleteOrder', async ({ id }, thunkAPI) => {
  try {
    const response = await adminAPI.deleteOrder(id);
    thunkAPI.dispatch(setMessage('done'));
    return response.data;
  } catch (err) {
    const message = err.message.data || err.message || err.message.toString();
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue();
  }
});
export const getListOrder = createAsyncThunk('admin/getListOrder', async ({ sort, page, pageSize }, thunkAPI) => {
  try {
    const response = await adminAPI.getListOrder(sort, page, pageSize);
    thunkAPI.dispatch(setMessage('done'));
    return response.data;
  } catch (err) {
    const message = err.message.data || err.message || err.message.toString();
    thunkAPI.dispatch(setMessage(message));
    return thunkAPI.rejectWithValue();
  }
});

const initialState = {
  cars: null,
  orders: null
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  extraReducers: {
    [getAllCars.fulfilled]: (state, action) => {
      state.cars = action.payload;
    },
    [getAllCars.rejected]: (state, action) => {
      state.cars = null;
    },
    [postCar.fulfilled]: (state, action) => {
      state.cars = action.payload;
    },
    [postCar.rejected]: (state, action) => {
      state.cars = null;
    },
    [getCarById.fulfilled]: (state, action) => {
      state.cars = action.payload;
    },
    [getCarById.rejected]: (state, action) => {
      state.cars = null;
    },
    [updateCarById.fulfilled]: (state, action) => {
      state.cars = action.payload;
    },
    [updateCarById.rejected]: (state, action) => {
      state.cars = null;
    },
    [deleteCarById.fulfilled]: (state, action) => {
      state.cars = action.payload;
    },
    [deleteCarById.rejected]: (state, action) => {
      state.cars = null;
    },
    [getAllOrder.fulfilled]: (state, action) => {
      state.orders = action.payload;
    },
    [getAllOrder.rejected]: (state, action) => {
      state.orders = null;
    },
    [getOrderById.fulfilled]: (state, action) => {
      state.orders = action.payload;
    },
    [getOrderById.rejected]: (state, action) => {
      state.orders = null;
    },
    [changeOrderStatus.fulfilled]: (state, action) => {
      state.orders = action.payload;
    },
    [changeOrderStatus.rejected]: (state, action) => {
      state.orders = null;
    },
    [deleteOrder.fulfilled]: (state, action) => {
      state.orders = action.payload;
    },
    [deleteOrder.rejected]: (state, action) => {
      state.orders = null;
    },
    [getListOrder.fulfilled]: (state, action) => {
      state.orders = action.payload;
    },
    [getListOrder.rejected]: (state, action) => {
      state.orders = null;
    }
  }
});

const { reducer } = adminSlice;
export default reducer;
