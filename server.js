// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const PORT = 5000;


// Initialize SQLite database connection
const db = new sqlite3.Database('./db/database.sqlite', (err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to the database');
  }
});

// Enable CORS middleware
app.use(cors());
// Middleware to parse JSON
app.use(express.json());

// Middleware to validate request body
function validateBookData(req, res, next) {
  const { id, title, author, genre, published, downloadLink, imageLink } = req.body;

  if (!title || !author || !genre || !published || !downloadLink || !imageLink) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Additional validation logic if needed

  next();
}

// Middleware to authenticate users
function authenticateUser(req, res, next) {
  const { apikey } = req.headers;
  if (apikey !== process.env.API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  next();
}


// Middleware to handle errors
function errorHandler(err, req, res, next) {
  console.error('Error Occurred:', err);

  // Respond with a generic error message
  res.status(500).json({ error: 'Internal Server Error' });
}

// Add error handling middleware to the app
app.use(errorHandler);


// Create a new book with given id or generate a new id if not provided
app.post('/books', authenticateUser, validateBookData, (req, res) => {
  const { id, title, author, genre, published, downloadLink, imageLink } = req.body;
  if (id !== undefined) {
    // If id is provided, insert a book with the given id and count as 0
    db.run(
      'INSERT INTO books (id, count, title, author, genre, published, downloadLink, imageLink) VALUES (?, 0, ?, ?, ?, ?, ?, ?)',
      [id, title, author, genre, published, downloadLink, imageLink],
      function (err) {
        if (err) {
          console.error('Error creating a new book:', err);
          res.status(500).send('Internal Server Error');
          return;
        }

        res.status(201).json({ id });
      }
    );
  } else {
    // If id is not provided, generate a new id and insert a book with count as 0
    db.run(
      'INSERT INTO books (count, title, author, genre, published, downloadLink, imageLink) VALUES (0, ?, ?, ?, ?, ?, ?)',
      [title, author, genre, published, downloadLink, imageLink],
      function (err) {
        if (err) {
          console.error('Error creating a new book:', err);
          res.status(500).send('Internal Server Error');
          return;
        }

        const newBookId = this.lastID; // Retrieve the ID of the last inserted row

        res.status(201).json({ id: newBookId });
      }
    );
  }
});


// Retrieve the count value of a given book
app.get('/books/:id/count', (req, res) => {
  const { id } = req.params;

  db.get('SELECT count FROM books WHERE id = ?', [id], (err, row) => {
    if (err) {
      console.error('Error retrieving book count:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    if (!row) {
      res.status(404).send('Book not found');
      return;
    }

    res.json({ count: row.count });
  });
});

// Retrieve the count value of a given book
app.get('/myBooks/:id/count', (req, res) => {
  const { id } = req.params;

  db.get('SELECT count FROM myBooks WHERE id = ?', [id], (err, row) => {
    if (err) {
      console.error('Error retrieving book count:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    if (!row) {
      res.status(404).send('Book not found');
      return;
    }

    res.json({ count: row.count });
  });
});

// Retrieve details of a given book
app.get('/books/:id', (req, res) => {
  const { id } = req.params;

  db.get('SELECT count, title, author, genre, published, downloadLink, imageLink FROM books WHERE id = ?', [id], (err, row) => {
    if (err) {
      console.error('Error retrieving book:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    if (!row) {
      res.status(404).send('Book not found');
      return;
    }

   res.json(row);
  });
});

// Retrieve details of a given book
app.get('/myBooks/:id', (req, res) => {
  const { id } = req.params;

  db.get('SELECT count, title, author, genre, published, downloadLink, imageLink FROM myBooks WHERE id = ?', [id], (err, row) => {
    if (err) {
      console.error('Error retrieving book:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    if (!row) {
      res.status(404).send('Book not found');
      return;
    }

   res.json(row);
  });
});

app.get('/books', (req, res) => {
  db.all('SELECT * FROM books', (err, rows) => {
    if (err) {
      console.error('Error retrieving book titles:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    res.json(rows);
  });
});

app.get('/myBooks', (req, res) => {
  db.all('SELECT * FROM myBooks', (err, rows) => {
    if (err) {
      console.error('Error retrieving book titles:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    res.json(rows);
  });
});


// Retrieve all books Titles
app.get('/books/:id/title', (req, res) => {
  db.all('SELECT title FROM books', (err, rows) => {
    if (err) {
      console.error('Error retrieving book titles:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    const titles = rows.map((row) => row.title);
    res.json(titles);
  });
});


// Update the count value of a given book
app.put('/books/:id/count', (req, res) => {
  const { id } = req.params;
  const { count } = req.body;

  db.run('UPDATE books SET count = ? WHERE id = ?', [count, id], (err) => {
    if (err) {
      console.error('Error updating book count:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    res.send('Book count updated successfully');
  });
});

// Update the count value of a given book
app.put('/myBooks/:id/count', (req, res) => {
  const { id } = req.params;
  const { count } = req.body;

  db.run('UPDATE myBooks SET count = ? WHERE id = ?', [count, id], (err) => {
    if (err) {
      console.error('Error updating book count:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    res.json({ success: true });
  });
});

// Delete a book
app.delete('/books/:id', authenticateUser, (req, res) => {
  const { id } = req.params;

  db.run('DELETE FROM books WHERE id = ?', [id], (err) => {
    if (err) {
      console.error('Error deleting book:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    res.send('Book deleted successfully');
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

