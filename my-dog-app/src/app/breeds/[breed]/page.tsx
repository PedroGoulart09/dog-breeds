'use client';

import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Button, Grid, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import '../../globals.css';
import { toggleFavorite } from '@/app/store/favoriteSlice';
import type { RootState } from '@/app/interfaces';
import Image from 'next/image';

export default function BreedPictures() {
    const [image, setImage] = useState<string | null>(null);
    const params = useParams();
    const { breed } = params;
    const favorites = useSelector((state: RootState) => state.favorites.favorites);
    const dispatch = useDispatch();

    const fetchImage = useCallback(() => {
        fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
            .then((response) => response.json())
            .then((data) => setImage(data.message))
            .catch((error) => console.error('Error:', error));
    }, [breed]);

    useEffect(() => {
        fetchImage();
    }, [fetchImage]);

    const handleFavorite = (imageUrl: string) => {
        dispatch(toggleFavorite(imageUrl));
    };

    if (!image) {
        return (
            <div className='flex items-center justify-center min-h-screen'>
                <div className='loader' />
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center p-4">
            <h1 className="text-4xl font-extrabold text-center text-stone-800 mb-4 shadow-lg">
                {breed} - Random Picture
            </h1>
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} sm={8} md={6} lg={4}>
                     <Image
                        src={image}
                        alt='dog-images'
                        width={500}
                        height={500}
                        style={{ width: '100%', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)' }}
                    />
                    <Button
                        variant={favorites.includes(image) ? 'contained' : 'outlined'}
                        onClick={() => handleFavorite(image)}
                        fullWidth
                        style={{ marginTop: '10px' }}
                    >
                        {favorites.includes(image) ? 'Unlike' : 'Like'}
                    </Button>
                    <Button
                        variant={'contained'}
                        onClick={fetchImage}
                        fullWidth
                        style={{ marginTop: '10px' }}
                    >
                        Refresh Image
                    </Button>
                    {favorites.includes(image) && (
                        <Button
                            variant={'text'}
                            fullWidth
                            href='/favorites'
                            style={{ marginTop: '10px' }}
                        >
                            Go to Favorites
                        </Button>
                    )}
                </Grid>
            </Grid>
        </div>
    );
}