'use client';
import { createSlice } from '@reduxjs/toolkit';

interface FavoritesState {
  favorites: string[];
}

const initialState: FavoritesState = {
  favorites: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setFavorites: (state, action) => {
      state.favorites = action.payload;
    },
    toggleFavorite: (state, action) => {
      const imageUrl = action.payload;
      if (state.favorites.includes(imageUrl)) {
        state.favorites = state.favorites.filter((url) => url !== imageUrl);
      } else {
        state.favorites.push(imageUrl);
      }
      if (typeof window !== 'undefined') {
        localStorage.setItem('favorites', JSON.stringify(state.favorites));
      }
    },
  },
});

export const { toggleFavorite, setFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;