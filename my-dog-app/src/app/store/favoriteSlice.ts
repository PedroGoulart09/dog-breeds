'use client'
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favorites: JSON.parse(localStorage.getItem('favorites') || '[]') ?? [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const imageUrl = action.payload;
      if (state.favorites.includes(imageUrl)) {
        state.favorites = state.favorites.filter((url: string) => url !== imageUrl);
      } else {
        state.favorites.push(imageUrl);
      }
      
        localStorage.setItem('favorites', JSON.stringify(state.favorites));
      
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
