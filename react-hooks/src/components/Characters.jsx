import React, {useState, useEffect, useContext, useReducer} from 'react'
import {NameColor} from '../context/ThemeContext'

const InitialState ={
    favorites: []
}

const favoriteReducer = (state, action) =>{
    switch (action.type) {
        case 'ADD_TO_FAVORITE':
            return {
                ...state, 
                favorites: [...state.favorites, action.payload]
            };
            default:
                return state;
    }
}

const Character = () =>{

    const [characters, setCharacter] = useState([]);
    const color = useContext(NameColor)
    const [favorites, dispatch] = useReducer(favoriteReducer, InitialState);

    useEffect(()=>{
        fetch('https://rickandmortyapi.com/api/character/')
        .then(response => response.json())
        .then(data => setCharacter(data.results));
    }, []);

    const  handleClick = favorite =>{
        dispatch({ type: 'ADD_TO_FAVORITE', payload: favorite })
    }
    return (
        <div className="Characters">

            {favorites.favorites.map(favorite =>(
                <li key = {favorite.id}>
                    {favorite.name}

                </li>
            ))}

            <h1 style={ {color} }>Name of the characters</h1>
            {characters.map(character => (
                <div className="item" key ={character.id}>
                    <h2>{character.name}</h2>
                    <button type="button" onClick={()=>handleClick(character)}>Add to favorite
                    </button>
                </div>
            ))}
        </div>
    );
}

export default Character;