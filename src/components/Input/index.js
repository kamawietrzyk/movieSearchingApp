import React from 'react'
import './styles.scss'

const Input = ({ inputValue, onClick, onChange, onKeyPress }) => (
    <div className="Input input-group">
        <input
            className="form-control"
            type="text"
            value={inputValue}
            onChange={onChange}
            onKeyPress={onKeyPress}
            placeholder="Search here..."
        />
        <div className="input-group-append">
            <button
                type="button"
                className="btn btn-outline-info"
                onClick={onClick}>
                Search
        </button>
        </div>
    </div>
)

export default Input