'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button, ListItem } from '@mui/material';
import './globals.css';

export default function Home() {
  const [breeds, setBreeds] = useState<string[]>([]);

  useEffect(() => {
    fetch('https://dog.ceo/api/breeds/list/all')
      .then((response) => response.json())
      .then((data) => setBreeds(Object.keys(data.message)));
  }, []);

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
