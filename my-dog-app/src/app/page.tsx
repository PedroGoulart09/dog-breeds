'use client';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Button, ListItem } from '@mui/material';
import './globals.css';

export default function Home() {
    const [breeds, setBreeds] = useState<string[]>([]);

    const fetchImage = useCallback(() => {
        fetch('https://dog.ceo/api/breeds/list/all')
            .then((response) => response.json())
            .then((data) => setBreeds(Object.keys(data.message)))
            .catch((error) => console.error('Error:', error));
    }, []);

    useEffect(() => {
        fetchImage()
    }, [fetchImage]);


    if (breeds.length === 0) {
        return (
            <div className='flex items-center justify-center min-h-screen'>
                <div className='loader' />
            </div>
        )
    }

    return (
        <div className='flex flex-col items-center justify-center min-h-screen p-4'>
            <h1 className='text-3xl font-bold mb-6'>Dog Breeds</h1>
            <div className='flex flex-wrap justify-center gap-4'>
                {breeds.map((breed) => (
                    <ListItem key={breed}>
                        <Link href={`/breeds/${breed}`}>
                            <Button variant="contained" className='min-w-[120px]'>
                                {breed}
                            </Button>
                        </Link>
                    </ListItem>
                ))}
            </div>
            <Link href="/favorites">
                <Button variant="outlined" className='mt-4'>
                    View Favorites
                </Button>
            </Link>
        </div>
    );
}
