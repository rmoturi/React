import React, { useState, useEffect } from 'react';
import './AutoComplete.css';

const AutoCompleteSearch = () => {
    const [display, setDisplay] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        if (searchValue && !searchValue.trim()) {
            return ;
        }
        
        if (searchValue.length >= 1) {
            setSearchValue(searchValue);
            async function getCharacters(){
                const response = await fetch("https://swapi.co/api/people");
                const body = await response.json();
                console.log(body);
                setSuggestions(
                    body.results.filter(({name}) => name.toLowerCase().startsWith(searchValue.toLowerCase()))
                    .map(({name}) => ({label: name, value: name}))
                );
                console.log(suggestions);

            }
            getCharacters();
        }
    }, [searchValue]);

    // function searchCharacterByName(text) {
    //     const response =  fetch("https://swapi.co/api/people");
    //     return response;
    // };

    const selectItemFromList = (suggestionObject) => {
        setSearchValue(suggestionObject.label);
        setDisplay(false);
    }
      
    let renderItems = () => {
        let listItems = suggestions.map((suggestion, index) => {
            let suggestionObject = suggestion;
            return (
                <li onClick={() => selectItemFromList(suggestionObject)} key={index}>
                    {suggestionObject.label}
                </li>
            );
        });
        return (
            <div className="autocomplete dropdown">
                <ul>
                {listItems}
                </ul>
            </div>
        );
    }

    return (
        <div>
            <input 
            type="text" 
            id="characterSearch" 
            placeholder="start typing a character name" 
            onClick={() => setDisplay(!display)}
            onChange={(e) => setSearchValue(e.target.value)} 
            value={searchValue}
            ></input>
            
            {suggestions?.length > 0 ? renderItems() : null}
            <span>Search Text: {searchValue}</span>
        </div>
    );
}

export default AutoCompleteSearch;
