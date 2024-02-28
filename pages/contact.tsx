'use client'
import React from 'react';
import EasyHeader from '../components/EasyHeader';
import Footer from '../components/Footer';
import { Title, Image, Text, Box, Paper, Flex, Container} from '@mantine/core';
import useMediaQueries from '../components/useMediaQueries';
import styles from './styles.module.css';


function Contact () {

  const screenSize = useMediaQueries();

  const handleDownload = async () => {
          // After tracking the download, open the actual download link
          window.open('https://neilranawakebooks.blogspot.com/2024/02/the-unfinished-endeavour-of-king.html', '_blank');
    };

  return (
  <>  
<div >
      <EasyHeader/>    
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

<Container style={{ margin: 'auto', display: 'flex', flexDirection: 'column', maxWidth: '1400px' }}>
        <h4 className={styles.homeTitle}>Contact Us</h4>
    
      <Title order={5} c='blue' p='10' ta="center">Buddhist Counsellors:</Title>
    <Box style={{ margin: 'auto', display: 'flex', flexDirection: 'row', maxWidth: '500px' }}>
      <Image radius="md" h={200}
      w="auto"
      fit="contain" src='Rahu.png' alt='Dhanu' mx="auto"/>
      <div style={{ marginLeft: '20px' }}>
      <Image radius="md" h={200}
      w="auto"
      fit="contain" src='Rahu2.png' alt='Rahu2' mx="auto"/>
      </div>
    </Box>   
      <Text
      p='10px' size="sm" ta="center" >
       Rahubadde Sarath-Chandra
      </Text>

      {screenSize === 'small' ? (
        <div>
      <Box style={{ margin: 'auto', maxWidth: '1000px', justifyContent: 'center', display: 'flex', flexDirection: 'row' }}> 
      <Text p='3px' size="sm" ta="center" c="teal.7">
      Email:  
      </Text>
      <a href="mailto:infoqsa@gmail.com" color="blue" style={{ marginLeft: '5px' }}>
      infoqsa@gmail.com
        </a>
        </Box>
        <Box style={{ margin: 'auto', justifyContent: 'center', display: 'flex', flexDirection: 'row', maxWidth: '1000px' }}>
<Text p='3px' size="sm" ta="center" c="teal.7" style={{ marginLeft: '10px' }}>
Mobile:   
</Text>
<a href="tel:+61732789021" color="blue" style={{ marginLeft: '5px' }}>
   (+61) 732 789 021
</a>
      </Box>
      </div>
      ) : ( <div>
        <Box style={{ margin: 'auto', maxWidth: '1000px', justifyContent: 'center', display: 'flex', flexDirection: 'row' }}> 
        <Text p='3px' size="sm" ta="center" c="teal.7">
      Email:  
      </Text> 
      <a href="mailto:infoqsa@gmail.com" color="blue" style={{ marginLeft: '5px' }}>
      infoqsa@gmail.com
        </a>
        <Text p='3px' size="sm" ta="center" c="teal.7" style={{ marginLeft: '10px' }}>
Mobile:   
</Text>
<a href="tel:+61732789021" color="blue" style={{ marginLeft: '5px' }}>
   (+61) 732 789 021
</a>
        </Box>
      </div>)}
     
      <Image radius="md" h={200}
      w={200}
      fit="contain" src='Tanuja.jpeg' alt='Dhanu' mx="auto" mt='10px'/>
     {/*} <Text
       style={{ color: computedColorScheme === 'light' ? 'dark' : 'light' }}
      p='10px' size="sm" ta="center" >
      Tanuja Yasanga Sarath-Chandra
</Text>*/}
      <Text
      p='10px' size="sm" ta="center" >
      Tanuja Yasanga Sarath-Chandra
      </Text>

      {screenSize === 'small' ? (
        <div>
      <Box style={{ margin: 'auto', maxWidth: '1000px', justifyContent: 'center', display: 'flex', flexDirection: 'row' }}> 
      <Text p='3px' size="sm" ta="center" c="teal.7">
      Email:  
      </Text>
      <a href="mailto:tanuja4@gmail.com" color="blue" style={{ marginLeft: '5px' }}>
      tanuja4@gmail.com
        </a>
        </Box>
        <Box style={{ margin: 'auto', justifyContent: 'center', display: 'flex', flexDirection: 'row', maxWidth: '1000px' }}>
<Text p='3px' size="sm" ta="center" c="teal.7" style={{ marginLeft: '10px' }}>
Mobile:   
</Text>
<a href="tel:+61413485411" color="blue" style={{ marginLeft: '5px' }}>
(+61) 413 485 411
</a>
      </Box>
      </div>
      ) : ( <div>
        <Box style={{ margin: 'auto', maxWidth: '1000px', justifyContent: 'center', display: 'flex', flexDirection: 'row' }}> 
        <Text p='3px' size="sm" ta="center" c="teal.7">
      Email:  
      </Text> 
      <a href="mailto:tanuja4@gmail.com" color="blue" style={{ marginLeft: '5px' }}>
      tanuja4@gmail.com
        </a>
        <Text p='3px' size="sm" ta="center" c="teal.7" style={{ marginLeft: '10px' }}>
Mobile:   
</Text>
<a href="tel:+61413485411" color="blue" style={{ marginLeft: '5px' }}>
(+61) 413 485 411
</a>
        </Box>
      </div>)}

      <Title order={5} c='blue' p='10' ta="center">IT Specialists:</Title>
      <Image radius="md" w={200} h={200}
      
      fit="contain" src='Dhanu.gif' alt='Dhanu' mx="auto"/>
      <Text
      p='10px' size="sm" ta="center">
      Dhanuja Prathapa Ranawake
      </Text>

      {screenSize === 'small' ? (
        <div>
      <Box style={{ margin: 'auto', maxWidth: '1000px', justifyContent: 'center', display: 'flex', flexDirection: 'row' }}> 
      <Text p='3px' size="sm" ta="center" c="teal.7">
      Email:  
      </Text>
      <a href="mailto:dhanujaprathapa@gmail.com" color="blue" style={{ marginLeft: '5px' }}>
      dhanujaprathapa@gmail.com
        </a>
        </Box>
        <Box style={{ margin: 'auto', justifyContent: 'center', display: 'flex', flexDirection: 'row', maxWidth: '1000px' }}>
<Text p='3px' size="sm" ta="center" c="teal.7" style={{ marginLeft: '10px' }}>
Mobile:   
</Text>
<a href="tel:+61472511125" color="blue" style={{ marginLeft: '5px' }}>
(+61) 472 511 125
</a>
      </Box>
      </div>
      ) : ( <div>
        <Box style={{ margin: 'auto', maxWidth: '1000px', justifyContent: 'center', display: 'flex', flexDirection: 'row' }}> 
        <Text p='3px' size="sm" ta="center" c="teal.7">
      Email:  
      </Text> 
      <a href="mailto:dhanujaprathapa@gmail.com" color="blue" style={{ marginLeft: '5px' }}>
      dhanujaprathapa@gmail.com
        </a>
        <Text p='3px' size="sm" ta="center" c="teal.7" style={{ marginLeft: '10px' }}>
Mobile:   
</Text>
<a href="tel:+61472511125" color="blue" style={{ marginLeft: '5px' }}>
(+61) 472 511 125
</a>
        </Box>
      </div>)}

      <Image radius="md" w={200} h={200}
      fit="contain" src='Neil.png' alt='Neil' mx="auto" mt='10px'/>
      <Text
      p='10px' size="sm" ta="center">Neil Ranawake</Text>

      {screenSize === 'small' ? (
        <div>
      <Box style={{ margin: 'auto', maxWidth: '1000px', justifyContent: 'center', display: 'flex', flexDirection: 'row' }}> 
      <Text p='3px' size="sm" ta="center" c="teal.7">
      Email:  
      </Text>
      <a href="mailto:neilranawake@yahoo.com" color="blue" style={{ marginLeft: '5px' }}>
      neilranawake@yahoo.com
        </a>
        </Box>
        <Box style={{ margin: 'auto', justifyContent: 'center', display: 'flex', flexDirection: 'row', maxWidth: '1000px' }}>
<Text p='3px' size="sm" ta="center" c="teal.7" style={{ marginLeft: '10px' }}>
Mobile:   
</Text>
<a href="tel:+94719707828" color="blue" style={{ marginLeft: '5px' }}>
(+94) 71 970 7828
</a>
      </Box>
      </div>
      ) : ( <div>
        <Box style={{ margin: 'auto', maxWidth: '1000px', justifyContent: 'center', display: 'flex', flexDirection: 'row' }}> 
        <Text p='3px' size="sm" ta="center" c="teal.7">
      Email:  
      </Text> 
      <a href="mailto:neilranawake@yahoo.com" color="blue" style={{ marginLeft: '5px' }}>
      neilranawake@yahoo.com
        </a>
        <Text p='3px' size="sm" ta="center" c="teal.7" style={{ marginLeft: '10px' }}>
Mobile:   
</Text>
<a href="tel:+94719707828" color="blue" style={{ marginLeft: '5px' }}>
(+94) 71 970 7828
</a>
        </Box>
      </div>)}
    </Container>
    
    <Container style={{ margin: 'auto', marginTop:'20px', marginBottom:'30px', display: 'flex', flexDirection: 'column', maxWidth: '800px' }}>
    <div onClick={handleDownload} className={styles.cardWrapper}>
    <Paper shadow="lg" radius="md" ta='center' className="p-4">
      <Text style={{ textDecoration: 'none' }} >
      As an author, Neil Ranawake has published two books in sinhala language for the Sri Lankan community in close association of Most Ven Madihe Pannasiha Thero, Ven Gangodawila Soma Thero, Ven Maduluwave Sobhitha Thero etc. who also took precedence at the book launch. You are kindly invited to download and read. Click here to access them
      </Text>
    </Paper>
    </div>
    </Container>

    <div>
    <Footer />
    </div>

      </div>
      </div>
   </>
  )
}
export default Contact;