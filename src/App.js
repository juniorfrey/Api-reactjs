import React, { useState, useEffect } from 'react'
import Quote from './components/Quote';
import Spinner from './components/Spinner';


const initialQuote = {
    text: 'Quote',
    author:'Autor'
}

function App() {

  const [quote, setQuote] = useState(initialQuote);
  const [loading, setloading] = useState(true);

  const updateQuote = async() => {
    setloading(true);
    const url = `https://www.breakingbadapi.com/api/quote/random`;
    const res = await fetch(url);
    const [newQuote] = await res.json();
    
    const { quote: text, author } = newQuote;

    setQuote({
      text,
      author: author,
    });
    setloading(false);
  }
  useEffect( async() => {
    updateQuote();
  } , [])

  return (
    <div className="app">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/7/77/Breaking_Bad_logo.svg"
        alt="logo"
      />
      <button onClick={() => updateQuote()}>Get Another</button>
      {loading ? <Spinner/> : <Quote quote={quote} />}
    </div>
  );
}

export default App;
