// components/myBookCard.tsx
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Paper, Text, Title } from "@mantine/core";
import styles from '../pages/styles.module.css';

export interface BookProps {
  book: {
    id: number;
    count: number;
    title?: string | null;
    author?: string | null;
    genre?: string | null;
    published?: number | null;
    downloadLink?: string | null;
    imageLink?: string | null;
  };
}


const Book: React.FC<BookProps> = ({ book }) => {

  const [bookDetails, setBookDetails] = useState<any>(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(`https://api.buddhadhammaschool.org/myBooks/${book.id}`);
        if (response.ok) {
          const data = await response.json();
          setBookDetails(data);
        } else {
          console.error('Error fetching book details:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };

    fetchBookDetails();
  }, [book.id, bookDetails]);

  if (!bookDetails) {
    return null; // You might want to render a loading state here
  }

  const { id, count, title, author, genre, published, downloadLink, imageLink } = bookDetails || {};



  const handleDownload = async () => {
    try {
      // Fetch the current count from the server
      const response = await fetch(`https://api.buddhadhammaschool.org/myBooks/${book.id}/count`);
      const data = await response.json();
  
      if (response.ok) {
        // Increment the count and send it back to the server
        const updatedCount = data.count + 1;
  
        const updateResponse = await fetch(`https://api.buddhadhammaschool.org/myBooks/${book.id}/count`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ count: updatedCount }),
        });
  
        if (updateResponse.ok) {
          // After tracking the download, open the actual download link
          window.open(downloadLink, '_blank');
        } else {
          console.error('Error incrementing book count:', updateResponse.statusText);
        }
      } else {
        console.error('Error fetching book count:', response.statusText);
      }
    } catch (error) {
      console.error('Error tracking download:', error);
    }
  };

  
  return (
  
  <div onClick={handleDownload} className={styles.cardWrapper}>
    <Paper shadow="md" radius="md" className="p-4" style={{ maxWidth: 340, minWidth: 340 }} >
      <Image src={imageLink || ''} alt={title || ''} width={340} height={470} />
      <div style={{ marginLeft: '10px' }}>
      <Title order={5}>{title || 'No Title'}</Title>
      <Text size="sm">Author: {author || 'Unknown Author'}</Text>
      <Text size="sm">Genre: {genre || 'Unknown Genre'}</Text>
      <Text size="sm">Published: {published || 'Unknown Date'}</Text>
      <span className="text-blue-500 hover:text-red-700">
         Click on Card to Download
        </span>
      </div> 
    </Paper>
  </div>
  

  );
};

export default Book;
