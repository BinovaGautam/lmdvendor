import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'users',
  initialState: { name: 'vivek Kumar', age: 33 },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase('UPDATE_NAME_SUCCESS', (state, action: any) => {
      state.name = action.payload;
    });
  },
});

export default userSlice.reducer;
