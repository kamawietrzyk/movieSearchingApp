import logo from './logo.svg';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.css';
import { useState } from 'react';
import { API_KEY } from './constants';

const App = () => {
  const [inputValue, setInputValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState()

  const getMovieSearchByValue = async () => {
    try {
      setLoading(true)
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
      console.log(err)
    } finally {
      setLoading(false)
    }

    console.log('data', results)
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

  return (
    <>
      <div className="input-group">
        <input
          className="form-control"
          type="text"
          value={inputValue}
          onChange={onSearchChange}
          placeholder="Search here..."
        />
        <div className="input-group-append">
          <button
            type="button"
            className="btn btn-outline-info"
            onClick={onButtonClick}>
            Search
          </button>
        </div>
      </div>

      <div className="container">
        {results && results.length &&
          <div>
            {results.length}
            {/* TODO: create Card displaying results, then map() */}
          </div>}
      </div>
    </>
  )
}

export default App;
