import React from 'react'
import './styles.scss'
import noImage from './noImage.jpg'

const Movie = ({ res }) => (
    <div className="Movie">
        <img src={res.Poster === 'N/A' ? noImage : res.Poster} alt={res.Title} />
        <div className="p-3">
            <p>Title: {res.Title}</p>
            <p>Year: {res.Year}</p>
        </div>
    </div >
)

export default Movie