'use client'
import { TextInput, Box, Text, Group, Combobox, useCombobox, CloseButton, Drawer  } from "@mantine/core";
import { ActionIcon, Burger  } from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react';
import { useState, useEffect, useMemo, useRef } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { useMantineColorScheme, HoverCard, Flex } from '@mantine/core';
import cx from 'clsx';
import classes from '../pages/styles.module.css';
import { useMediaQuery } from 'react-responsive';
import React from 'react';
import MenuLinks from "./MenuLinks";
import useMediaQueries from '../components/useMediaQueries';
import { LuCopyright } from "react-icons/lu";

interface HeaderProps {
  searchTerm: string | null;
  setSearchTerm: React.Dispatch<React.SetStateAction<string | null>>;
  
}

const Header: React.FC<HeaderProps> = ({ searchTerm, setSearchTerm}) => {

  const headerRef = useRef(null);
  const { setColorScheme } = useMantineColorScheme();
  const { colorScheme } = useMantineColorScheme();

const [computedColorScheme, setComputedColorScheme] = useState(colorScheme );

const toggleColorScheme = () => {
  const newColorScheme = computedColorScheme === 'light' ? 'dark' : 'light';
  setComputedColorScheme(newColorScheme);
  setColorScheme(newColorScheme);
};

useEffect(() => {
 
  if (headerRef.current) {
    (headerRef.current as HTMLDivElement).style.setProperty(
      '--header-background',
      computedColorScheme === 'dark' ? 'rgba(32, 32, 32, 1)' : 'white'
    );
  }
}, [colorScheme, computedColorScheme]);

const headerStyle = useMemo(() => {
  const headerBackgroundColor = computedColorScheme === 'dark' ? 'rgba(32, 32, 32, 1)' : 'white';
  return {
    colorScheme: computedColorScheme,
    '--header-background':  headerBackgroundColor,
  };
}, [computedColorScheme]);

    
    const screenSize = useMediaQueries();
  
    const combobox = useCombobox({
      onDropdownClose: () => {
        combobox.resetSelectedOption();
        setSearchTerm(value);
      }
    });
  
    const [books, setBooks] = useState<string[]>([]);
    const [value, setValue] = useState('');

    useEffect(() => {
      // Fetch book titles from the server when the component mounts
      fetch('http://localhost:5000/books/:id/title')
        .then((response) => response.json())
        .then((data) => setBooks(data))
        .catch((error) => console.error('Error fetching book titles:', error));
    }, []);

    const shouldFilterOptions = !books.some((item) => item === value);
    const filteredOptions = shouldFilterOptions
      ? books.filter((item) => item.toLowerCase().includes(value.toLowerCase().trim()))
      : books;
  
    const options = filteredOptions.map((item) => (
      <Combobox.Option value={item} key={item}>
        {item}
      </Combobox.Option>
    ));
  
    const isLargeScreen = useMediaQuery({ minWidth: 769});
    const [drawerOpened, setDrawerOpened] = useState(false);
  
    const toggleDrawer = () => {
      setDrawerOpened(!drawerOpened);
    };
  
    const closeDrawer = () => {
      setDrawerOpened(false);
    };

    return (
  
          <nav className={classes.fixedHeader} ref={headerRef} style={headerStyle}>
       
         <Group>
      <HoverCard width={280} shadow="md" closeDelay={1000}>
        <HoverCard.Target>
      <Flex align="center">
      <Text mx={20} mt={10} size="xs">
        Generated by SRF
      </Text>
      <LuCopyright style={{ marginLeft: -17, marginTop: 2, fontSize: '0.8rem', color: 'gray' }} />
    </Flex>
    </HoverCard.Target>
        <HoverCard.Dropdown>
          <Text size="sm">
            Services Render Finances is a reputed organization that can be highly entrusted for any kind of IT Solutions. Visit Contact Us page for more details.
          </Text>
        </HoverCard.Dropdown>
      </HoverCard>
    </Group>

        <section style={{ display: 'flex', justifyContent: 'center', minHeight: 'auto' }}>
  
        {screenSize !== 'small' ? (
  <div>
    <Text c='red.8' mx={20} mt={4} size='lg' style={{ fontWeight: 'bold' }}>
      Buddha Dhamma School International
    </Text>
  </div>
) : (  <div>
<Text c='red.8' mx={20} mt={4} size='lg' style={{ fontWeight: 'bold' }}>
  BDSI
</Text>
       </div>)}

      <Combobox 
      onOptionSubmit={(optionValue) => {
        setValue(optionValue);
        combobox.closeDropdown();
        setSearchTerm(optionValue);
      }}
      store={combobox}
      withinPortal={false}  
    >
      <Combobox.Target>
        <TextInput
          label=""
          placeholder="Search for Books"
          style={{ width: '100%', maxWidth: isLargeScreen ? 300 : 250 }}
          value={value}
          onChange={(event) => {
            setValue(event.currentTarget.value);
            combobox.openDropdown();
            combobox.updateSelectedOptionIndex();
            setSearchTerm(event.currentTarget.value);
          }}
          
          onClick={() => combobox.openDropdown()}
          onFocus={() => combobox.openDropdown()}
          onBlur={() => {
            // Delay closing the dropdown to allow time for CloseButton onClick to execute first
            setTimeout(() => {
              combobox.closeDropdown();
            }, 100);
          }}

          rightSection={
            value !== null ? (
              <CloseButton
                size="sm"
                onMouseDown={(event) => {event.preventDefault();
                  setValue("");
                  setSearchTerm("");
                }}
               
              aria-label="Clear value"
              />
            ) : (
              <Combobox.Chevron />
            )
          }
          leftSection={
            <AiOutlineSearch />
          }
        />
      </Combobox.Target>
  
      <Combobox.Dropdown>
        <Combobox.Options mah={200} style={{ overflowY: 'auto' }}>
          {options.length === 0 ? <Combobox.Empty>Nothing found</Combobox.Empty> : options}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  
    <div style={{ display: 'flex', justifyContent: 'left' }}>      
    <ActionIcon mx={20}
        
        onClick={toggleColorScheme}
        variant="default"
        size="36px"
        aria-label="Toggle color scheme"
      >
        <IconSun className={cx(classes.icon, classes.light)} stroke={1.5} color='yellow'/>
        <IconMoon className={cx(classes.icon, classes.dark)} stroke={1.5} />
      </ActionIcon>
    </div> 

    <Group  mx={10} justify='between' align='flex-end' style={{ height: '100%', '--group-gap': 'var(--mantine-spacing-md)', '--group-align': 'center', '--group-wrap': 'wrap', '--group-justify': 'space-between', }}>
          <Group gap='40' visibleFrom="md">     
      <div>
        <MenuLinks />
      </div>
          {/* Other content goes here */}
          </Group>
          <Burger size="md" opened={drawerOpened} onClick={toggleDrawer} hiddenFrom='md' aria-label="Toggle navigation"/>
          <Drawer position="left" opened={drawerOpened} onClose={closeDrawer} title={<span style={{ fontWeight: 'bold', zIndex: 1000 }} >Menu</span>}>
          <div >
          {/* Drawer content goes here */}
          <Box className={classes.drawerContent}>
          <div>
        <MenuLinks />  
          </div>
          </Box>
          </div>
          </Drawer>
    </Group>
    </section> 
    </nav>
    
      );

};   

export default Header;