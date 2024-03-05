'use client'
import React from 'react';
import { useState, useEffect } from 'react';
import Book, {BookProps} from "../components/myBookCard";
import EasyHeader from '../components/EasyHeader';
import Footer from '../components/Footer';
import { Title, Image, Center, Text, Box, Paper, Container} from '@mantine/core';
import useMediaQueries from '../components/useMediaQueries';
import styles from './styles.module.css';
import Link from 'next/link';


function Mybooks() {

  const [booksData, setBooksData] = useState<any[]>([]);
  //const books: BookProps[] = booksData.map((book) => ({ book }));
  const screenSize = useMediaQueries();
  const [filteredBooks, setFilteredBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

   // Use the useEffect hook to fetch data when the component mounts
   useEffect(() => {
    // Define a function to fetch books from the server
    const fetchmyBooksData = async () => {
      try {
        // Make a GET request to your server's /books endpoint
        const response = await fetch('https://api.buddhadhammaschool.org/myBooks');
        const data = await response.json();

        // Update the state with the fetched data
        setBooksData(data);
        setFilteredBooks(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    // Call the fetchBooks function
    fetchmyBooksData();
   
  }, []); // The empty dependency array ensures that the effect runs only once when the component mounts
 

  return (
    <>
   
    <div className={styles.body}>
    <Container style={{ margin: 'auto', marginTop:'20px', display: 'flex', flexDirection: 'column', maxWidth: '800px' }}>

    <Paper shadow="lg" radius="md" ta='center' className="p-4">
      <Text style={{ textDecoration: 'none' }} >
      As an author, Neil Ranawake has published two books in sinhala language for the Sri Lankan community in close association of Most Ven Madihe Pannasiha Thero, Ven Gangodawila Soma Thero, Ven Maduluwave Sobhitha Thero etc. who also took precedence at the book launch. You are kindly invited to download and read them
      </Text>
    </Paper>
   
    </Container>
   

{/* Grid Container for Books */}
{filteredBooks.length > 0 ? (
<Container style={{ margin: 'auto', display: 'flex', flexWrap: 'wrap', marginTop:'20px'}}>
           {filteredBooks.map((book, index) => ( 
               <Center key={index} style={{ margin: 'auto', display: 'flex', marginBottom: '16px'}}>
               <Book book={book} />
               </Center>
           ))}        
</Container>
           
) : (
  
  <p>Database not connected ! No books to display...</p>)}

</div>

</>
  )
}

export default Mybooks