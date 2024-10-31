'use client';

import { useSelector, useDispatch } from 'react-redux';
import { Grid, Select, MenuItem, Typography, Box, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import '../globals.css';
import type { RootState } from '../interfaces';
import Image from 'next/image';
import { setFavorites } from '@/app/store/favoriteSlice';

export default function Favorites() {
    const dispatch = useDispatch();
    const favorites = useSelector((state: RootState) => state.favorites.favorites);
    const [filter, setFilter] = useState('');
    const [breeds, setBreeds] = useState<string[]>([]);
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedFavorites = localStorage.getItem('favorites');
            if (storedFavorites) {
                dispatch(setFavorites(JSON.parse(storedFavorites)));
            }
        }
    }, [dispatch]);

    useEffect(() => {
        const uniqueBreedsssss = Array.from(new Set(favorites.map((img: string) => img.split('/')[4])));
        setBreeds(uniqueBreedsssss);
    }, [favorites]);


    const filteredFavorites = filter
        ? favorites.filter((img: string) => img.includes(filter))
        : favorites;

    const handleRemoveFavorites = (favorites: string[], img: string) => {
        const updatedFavorites = favorites.filter((url: string) => url !== img);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        dispatch(setFavorites(updatedFavorites));
    }

    return (
        <Box sx={{ padding: 4 }}>
            {favorites.length === 0 ? (
                <div className='flex justify-center items-center flex-col h-screen gap-5'>
                    <h1 className="text-4xl font-extrabold text-center text-stone-800 mb-4 shadow-lg">
                        No favorite dog images found.
                    </h1>
                    <Button variant={'contained'} onClick={() => router.push('/')}>Choose your favorite DOG</Button>
                </div>
            ) : (
                <>
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
                </>
            )}

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
                            <Image
                                src={image}
                                alt="Favorite Dog"
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    display: 'block'
                                }}
                                width={500}
                                height={500}
                            />
                        </Box>
                            <Button
                                variant="contained"
                                onClick={() => handleRemoveFavorites(favorites, image)}
                                fullWidth
                                style={{ marginTop: '10px' }}
                            >Remove
                            </Button>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}