// components/bookDownload.tsx
import React, { useEffect, useState } from "react";
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


const BookDownload: React.FC<BookProps> = ({ book }) => {

  const [bookDetails, setBookDetails] = useState<any>(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/books/${book.id}`);
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

  
  return (
  
  <div className={styles.cardWrapper2}>
    <Paper shadow="md"  radius="md" className="p-4" style={{ maxWidth: 440, minWidth: 440 }} >
      
    <div style={{ marginLeft: '10px' }}>  
      <Title order={5}>{title || 'No Title'}</Title>
      <Text size="sm">Downloads : {count || 'No Downloads'}</Text>
      </div>
    </Paper>
  </div>
  
  );
};

export default BookDownload;
