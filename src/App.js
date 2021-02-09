import logo from './logo.svg';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.css';
import { useState } from 'react';
import { API_KEY } from './constants';
import Input from '../src/components/Input'

const App = () => {
  const [inputValue, setInputValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState([])
  const [errors, setErrors] = useState(null)

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
      setErrors(err)
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

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      getMovieSearchByValue(inputValue)
      setInputValue('')
    }
  }

  return (
    <>
      <Input inputValue={inputValue} onClick={onButtonClick} onChange={onSearchChange} onKeyPress={handleKeyPress} />
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
