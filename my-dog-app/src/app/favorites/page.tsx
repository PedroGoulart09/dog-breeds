'use client';

import { useSelector } from 'react-redux';
import { Grid, Select, MenuItem, Typography, Box } from '@mui/material';
import { useState, useEffect } from 'react';

export default function Favorites() {
  const favorites = useSelector((state: any) => state.favorites.favorites);
  const [filter, setFilter] = useState('');
  const [breeds, setBreeds] = useState<string[]>([]);

  useEffect(() => {
    const uniqueBreeds = Array.from(new Set(favorites.map((img: string) => img.split('/')[4])));
    setBreeds(uniqueBreeds as any);
  }, [favorites]);

  const filteredFavorites = filter
    ? favorites.filter((img: string) => img.includes(filter))
    : favorites;

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Your Favorite Dog Images
      </Typography>
      
      <Select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        fullWidth
        sx={{ mb: 4 }}
      >
        <MenuItem value="">All Breeds</MenuItem>
        {breeds.map((breed) => (
          <MenuItem key={breed} value={breed}>
            {breed.charAt(0).toUpperCase() + breed.slice(1)}
          </MenuItem>
        ))}
      </Select>

      <Grid container spacing={2}>
        {filteredFavorites.map((image: string) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={image}>
            <Box 
              sx={{ 
                borderRadius: 2, 
                overflow: 'hidden', 
                boxShadow: 2, 
                position: 'relative' 
              }}
            >
              <img 
                src={image} 
                alt="Favorite Dog" 
                style={{ 
                  width: '100%', 
                  height: 'auto', 
                  display: 'block' 
                }} 
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
