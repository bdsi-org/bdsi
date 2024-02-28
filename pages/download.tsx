import React, { useEffect, useState } from "react";
import { Title } from "@mantine/core";
import BookDownload, {BookProps} from "../components/bookDownload";

function download() {

    const [books, setBooks] = useState<BookProps[]>([]);

    useEffect(() => {
      const fetchBooks = async () => {
        try {
          const response = await fetch("http://localhost:5000/books");
          if (response.ok) {
            const data = await response.json();
            setBooks(data);
          } else {
            console.error("Error fetching books:", response.statusText);
          }
        } catch (error) {
          console.error("Error fetching books:", error);
        }
      };
  
      fetchBooks();
    }, []);

  return (
    <div>
        <Title>Books Download Count </Title>
        {books.map((book) => (
        <BookDownload key={book.id} book={book} />
      ))}

    </div>


  )
}

export default download