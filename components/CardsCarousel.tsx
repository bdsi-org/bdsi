import React, { useState } from 'react';
import { useMediaQuery } from '@mantine/hooks';
import { Center, Paper, Text, Title, Button, useMantineTheme, useMantineColorScheme} from '@mantine/core';
import classes from './CardsCarousel.module.css';

interface CardProps {
  image: string;
  title: string;
  category: string;
}

function Card({ image, title, category }: CardProps) {

  return (
    <Paper
      shadow="md"
      p="xl"
      radius="md"
      style={{ backgroundImage: `url(${image})`,
      height: '90vh',
      width: '100%',
      padding: "20px",
      borderRadius: "8px",
      color: "white",
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      objectFit: 'cover',
    }}
      className={classes.card}
    >
      <div>
        <Text className={classes.category} size="xs">
          {category}
        </Text>
        <Title order={3} className={classes.title}>
          {title}
        </Title>
      </div>
    </Paper>
  );
}

const data = [
  {
    image:
      '/flags.jpg',
    title: 'Being united under Lion Flag',
    category: 'unity',
  },
  {
    image:
      'dagaba.jpg',
    title: 'The origin of the pagoda can be traced to the stupa (3rd century BCE). The stupa, a dome shaped monument, was used as a commemorative monument to house sacred relics and writings',
    category: 'pagoda or dāgaba (relic womb/chamber)',
  },
  {
    image:
      'pooja.jpg',
    title: 'Buddhist devotional practices commonly consist of giving offerings and chanting pali stanzas (vandana gatha) in front of Buddha statues',
    category: 'offerings',
  },
  {
    image:
      'bo-tree.jpg',
    title: 'Gautama Buddha attained enlightenment (bodhi) while meditating underneath a Ficus religiosa (Bo Tree)',
    category: 'nature',
  },
  {
    image:
      'meditation.jpg',
    title: 'Buddhist meditation is the practice of meditation in Buddhism. The closest words for meditation in the classical languages of Buddhism are bhāvanā (mental development) and jhāna/dhyāna (mental training resulting in a calm and luminous mind)',
    category: 'meditation',
  },
  {
    image:
      'meditation2.jpg',
    title: 'Buddhists pursue meditation as part of the path toward liberation from defilements (kleshas) and clinging and craving (upādāna), also called awakening, which results in the attainment of Nirvana',
    category: 'meditation',
  },
  {
    image:
      'perahara.jpg',
    title: 'Being a part of Triple Gems (Buddha, Dhamma, Sangha) in Buddhism, sangha refers to the monastic communities of bhikkhu (monks) and bhikkhuni (nuns)',
    category: 'sangha',
  },
  {
    image:
      'pooja2.jpg',
    title: 'The three most common offerings are flowers, incense, and light (as candles, oil lamps or lanterns)',
    category: 'offerings',
  },
  {
    image:
      'vesak.jpg',
    title: 'The most important Buddhist festival "Vesak" commemorates the birth, enlightenment (Nibbāna) and passing (Parinirvāna) of Gautama Buddha',
    category: 'vesak',
  },
  {
    image:
      'perahara.png',
    title: 'Religious or otherwise, processions have in all peoples and at all times been a natural form of public celebration, as forming an orderly and impressive ceremony',
    category: 'procession',
  },
  {
    image:
      'vesak2.jpg',
    title: 'A tradition is a system of beliefs or behaviors passed down within a society with symbolic meaning or special significance with origins in the past',
    category: 'tradition',
  },
  {
    image:
      'culture.png',
    title: 'Although culture is often attributed to a specific region, cultural events can be globaly used for education',
    category: 'culture',
  },
  {
    image:
      'dagaba2.jpg',
    title: 'Teaching the society to respect and protect nature and environment is the most important part of all teachings',
    category: 'nature',
  },
  {
    image:
      'culture2.png',
    title: 'BDSI is fully devoted to researching current methods of Dhamma communication and make decisive improvements. Information technology and Sciense play a greater role as well as aesthetic subjects in Dhamma education',
    category: 'art',
  },
  {
    image:
      'dana.jpg',
    title: 'In Buddhism, both "almsgiving" and "giving" are called "dāna". Such giving is one of the three elements of the path of practice as formulated by the Buddha. This path of practice is dāna, sīla and bhāvanā',
    category: 'armsgiving',
  },
  {
    image:
      'social.jpg',
    title: 'Social welfare is a type of government support intended to ensure that members of a society can meet basic human needs. But this field is globally and broadly used for religious communication',
    category: 'social welfare',
  },
];

export function CardsCarousel() {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const [currentSlide, setCurrentSlide] = useState(0);
  const {colorScheme} = useMantineColorScheme();


  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? data.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev === data.length - 1 ? 0 : prev + 1));
  };

  const slides = data.map((item, index) => (
    <div key={item.title} className={index === currentSlide ? classes.activeSlide : classes.slide}>
      <Card {...item} />
    </div>
  ));

  return (
    <Center mt='10px' mb='10'>
    <div className={classes.carousel}>
    <div className={classes.slidesContainer}>{slides}</div>
      <div className={classes.buttonContainer}>
        <Button variant="white" color="dark" className={classes.button}
         onClick={handlePrevSlide}>
        &lt;
        </Button>
        <Button variant="white" color="dark" className={classes.button}
         onClick={handleNextSlide}>
        &gt;
        </Button>
      </div>
    </div>
    </Center>
  );

} export default CardsCarousel;   