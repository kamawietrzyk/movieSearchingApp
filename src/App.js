import React from 'react';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.css';
import { useState } from 'react';
import { API_KEY } from './constants';
import Input from '../src/components/Input'
import Movie from './components/Movie';

const App = () => {
  const [inputValue, setInputValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState([])
  const [errors, setErrors] = useState(null)

  const getMovieSearchByValue = async () => {
    try {
      setLoading(true)
      setErrors(null)

      const url = `http://www.omdbapi.com/?s=${inputValue}&apikey=${API_KEY}`;
      const response = await fetch(url, { method: 'GET' });
      const data = await response.json()

      if (data.Search) {
        return setResults(data.Search)
      }

      if (data.Response === 'False') {
        return setResults([])
      }
    }
    catch (err) {
      setErrors(err)
    } finally {
      setLoading(false)
    }
  }

  const onSearchChange = (e) => {
    setInputValue(e.target.value)
  }

  const onButtonClick = () => {
    if (inputValue.length > 0) {
      getMovieSearchByValue(inputValue)
      setInputValue('')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      getMovieSearchByValue(inputValue)
      setInputValue('')
    }
  }

  return (
    <div className="App">
      <h1>Movies Searching App</h1>
      <small>Created by Kama Swoboda-Wietrzyk</small>
      <Input inputValue={inputValue} onClick={onButtonClick} onChange={onSearchChange} onKeyPress={handleKeyPress} />
      <div className="App__content">
        {loading &&
          <div className="spinner-border text-info mb-4">
            <span className="sr-only">Loading...</span>
          </div>
        }
        {errors &&
          <h2 className="text-danger">{errors}</h2>}
        {results.length > 0 ? (
          <div className="results">
            {results.map((res) => (
              <Movie res={res} />
            ))}
          </div>
        ) : (
            <h2>{loading ? '' : 'No results'}</h2>
          )}
      </div>
    </div>
  )
}

export default App;
