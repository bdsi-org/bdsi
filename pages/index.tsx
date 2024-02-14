'use client'
import React from 'react';
import { useState, useEffect } from 'react';
import Book, { BookProps } from "../components/bookCard";
import Header from '../components/Header';
import Footer from '../components/Footer';
import { BackgroundImage, Center, Text, Box, Grid, Container, Pagination } from '@mantine/core';
import useMediaQueries from '../components/useMediaQueries';
import getItemsPerPage  from '../components/itemsPerPage';
import styles from './styles.module.css';
import classes from '../components/CardsCarousel.module.css';


export default function IndexPage() {

  const [booksData, setBooksData] = useState<any[]>([]);
  //const books: BookProps[] = booksData.map((book) => ({ book }));
  const screenSize = useMediaQueries();
  const [activePage, setActivePage] = useState(1);
  const [searchTerm, setSearchTerm] = useState<string | null>(null);
  const [filteredLength, setFilteredLength] = useState<number>(0);
  const [filteredBooks, setFilteredBooks] = useState<any[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage(screenSize));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize itemsPerPage with the correct value based on screen size
    setItemsPerPage(getItemsPerPage(screenSize));
  }, [screenSize]);

   // Use the useEffect hook to fetch data when the component mounts
  useEffect(() => {
    // Fetch books data when the component mounts
    const fetchBooksData = async () => {
      try {
        const response = await fetch('http://localhost:5000/books');
        const data = await response.json();
        setBooksData(data);
        setFilteredBooks(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching books:', error);
        // Execute API route to start server
        try {
          await fetch('/api/start-server');
        } catch (error) {
          console.error('Error starting server:', error);
        }
      }
    };

    fetchBooksData();
  }, []);

  useEffect(() => {
    // Filter books based on search term
    const filtered = booksData.filter(({ title }) => {
  const lowerCasedTitle = (title || '').toLowerCase();
  return lowerCasedTitle.includes((searchTerm || '').toLowerCase().trim());
});
    // Ensure active page doesn't exceed the total number of pages
    const totalPages = Math.ceil((filtered.length ) / itemsPerPage);
    let validActivePage = activePage > totalPages ? totalPages : activePage;
  
    if (!validActivePage) {
      validActivePage = 1;
    }

    // Update active page to a valid page if needed
    if (activePage !== validActivePage) {
      setActivePage(validActivePage);
    }
  
    // Update filteredBooks with the current range
    const startIndex = (validActivePage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, filtered.length);
    const newFilteredBooks = filtered.slice(startIndex, endIndex);
    setFilteredBooks(newFilteredBooks);
    setFilteredLength(filtered.length);

  }, [searchTerm, itemsPerPage, activePage, screenSize, booksData, filteredLength]);
  
  return (
<>
{/* Fixed Header  className={classes.fixedHeader} */}
<div>
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />    
</div>
    
    <div className={styles.wrapper}>
    <div className={styles.body}>   
    {screenSize === 'small' && (
  <div>
    <Text c='red.8' mx={20} mt={4} size='lg' ta='center' style={{ fontWeight: 'bold' }}>
      Buddha Dhamma School International
    </Text>
  </div>
)}
        <h4 className={styles.homeTitle}>Homepage</h4>
      <Box maw='auto' mx="auto">
      <BackgroundImage
        src="/stairs.jpg"
        radius="sm"
        h='50vh'
        style={{ marginBottom: '20px' }}
      >
        {screenSize === 'small' ? (
  <div>
    <Center p="md" style={{ textAlign: 'center'}}>
<Text style={{ color:"red", fontWeight:'700' }} >
Buddha Dhamma School International is not just another Dhamma School. It aims at a specific goal. Spiritual progress of every individual right up to enlightenment is our aim
</Text>
</Center>
  </div>
) : ( <Center p="md" style={{ textAlign: 'center'}}>
<Text className={classes.title} >
Buddha Dhamma School International is not just another Dhamma School. It aims at a specific goal. Spiritual progress of every individual right up to enlightenment is our aim
</Text>
</Center>
)}  
      </BackgroundImage>   
      </Box>

{/* Grid Container for Books */}
{filteredBooks.length > 0 ? (
<Container size="2xl" style={{ margin: 'auto', display: 'flex', flexDirection: 'row', maxWidth: '1400px', marginTop:'10px'}}>
         <Grid justify="center" align="flex-start" gutter='xl' >
           {filteredBooks.map((book, index) => (
             <Grid.Col span={{ xs: 12, sm: 6, md: 5, lg: 4, xl: 3 }} key={index} style={{ margin: 'auto', display: 'flex', flexDirection: 'row', marginBottom: '16px'}}>
               <Center>
               <Book book={book} />
               </Center>
             </Grid.Col>
           ))}
         </Grid>
           </Container>
           
) : (
  
  <p>Database not connected or no book selection...</p>)}

<Pagination style={{ marginBottom: '10px', display: 'flex',
    justifyContent: 'center'}} value={activePage} onChange={setActivePage} total={Math.ceil(filteredLength / itemsPerPage)} withEdges />

    <div>
    <Footer />
    </div>
  </div>
  </div> 
  </>   
    );
  };

