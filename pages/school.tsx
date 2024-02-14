'use client'
import React from 'react';
import { useState, useEffect } from 'react';
import Book, {BookProps} from "../components/bookCard";
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Title, Center, Text, Box, Grid, Container, Pagination } from '@mantine/core';
import useMediaQueries from '../components/useMediaQueries';
import getItemsPerPage  from '../components/itemsPerPage';
import styles from './styles.module.css';

function School() {

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
  {/* Fixed Header */}
<div >
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
    <Box style={{ margin: 'auto', display: 'flex', flexDirection: 'column', maxWidth: '1400px' }}>
        <h4 className={styles.homeTitle}>School</h4>
      <Title order={5} c='blue' p='10'>School structure:</Title>
      <Text p='10px' size="sm" ta="center">
      The purpose of the Buddha Dhamma School International is to help an interested person to learn Buddhism from the beginning, essentially by reading the recommended books and consulting a Buddhist Counsellor when necessary. The author is familiar with Theravada Buddhism; his knowledge of Mahayana Buddhism is limited. However, the text of the books does not attempt at raising the profile of any single tradition of Buddhism.</Text>
      <Text p='10px' size="sm" ta="center" c="red.7">
The first 12 books are aimed at students in the primary and secondary schools in the school systems of most English-speaking countries. 
Any level study after the secondary level is called post-secondary.
Material suited to individuals is covered in the self-development level.
</Text>
<Text p='10px' size="sm" ta="center">
Adults will find it useful to read from the grade 1 book upwards though they might think these are too simple. Looking at these closely, the material is not that simple. The material might be easy to understand. This is suggested irrespective of whether the reader is a Buddhist or otherwise. It will also equip them to becomes teachers, or Buddhist Counsellors in the future. 

      </Text>
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
  )
}

export default School;