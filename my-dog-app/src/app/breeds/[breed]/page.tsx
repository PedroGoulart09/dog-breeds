'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Button, Grid, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import '../../globals.css'
import { toggleFavorite } from '@/app/store/favoriteSlice';

export default function BreedPictures() {
  const params = useParams();
  const { breed } = params;
  const [image, setImage] = useState<string | null>(null);
  const favorites = useSelector((state: any) => state.favorites.favorites);
  const dispatch = useDispatch();

  useEffect(() => {
    if (breed) {
      fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
        .then((response) => response.json())
        .then((data) => setImage(data.message));
    }
  }, [breed]);
  
  const handleFavorite = (imageUrl: string) => {
    dispatch(toggleFavorite(imageUrl));
  };

  if (!image) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='loader' />
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center p-4">
      <Typography variant="h4" gutterBottom>
        {breed} - Random Picture
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <img 
            src={image} 
            alt='dog-images' 
            style={{ width: '100%', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)' }} 
            onClick={() => handleFavorite(image)}
          />
          <Button
            variant={favorites.includes(image) ? 'contained' : 'outlined'}
            onClick={() => handleFavorite(image)}
            fullWidth
            style={{ marginTop: '10px' }}
          >
            {favorites.includes(image) ? 'Unlike' : 'Like'}
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
