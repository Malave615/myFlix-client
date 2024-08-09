import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    favorites: [],
  },
  reducers: {
    setUser: (state, action) => action.payload,
  },
  addFavorite: (state, action) => {
    if (!state.favorites.includes(action.payload)) {
      state.favorites.push(action.payload);
    }
  },
  removeFavorite: (state, action) => {
    state.favorites = state.favorites.filter((fav) => fav !== action.payload);
  },
});

export const { setUser, addFavorite, removeFavorite } = userSlice.actions;

export default userSlice.reducer;
