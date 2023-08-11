import './App.css';
import { useQuery, useMutation } from "@apollo/client";
import {GET_BOOKS, ADD_BOOK} from "./books.query";
import { Book } from './book.interface';
import { useState } from 'react';


function App() {
  const { data, loading, error } = useQuery(GET_BOOKS);
  const [ addBook] = useMutation(ADD_BOOK);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const handleAddBook = () => {                  
      addBook({
        variables: {
          title,
          author,
        },
        refetchQueries: [{ query: GET_BOOKS }],
      });
    };
  

  if (loading) return "Loading...";
  if (error) return <pre>{error.message}</pre>

  return (
    <div>      
      <div>
      <form onSubmit={handleAddBook}>
          <div>
            <label>
              Title:
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </label>
          </div>
          <div>
            <label>
              Author:
              <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
            </label>
          </div>
          <button type="button" onClick={handleAddBook}>Add book</button>
        </form>      
        {data.books.map((book: Book) => (
          <div key={book.id}>{book.title}</div>
        ))}
      </div>
    </div>
  );
}

export default App
