import React from 'react';
import { func } from 'prop-types';

const DropDown = () => {
    const [items, setItems] = React.useState([]);

    React.useEffect(() => {
        async function getCharacters(){
            const response = await fetch("https://swapi.co/api/people");
            const body = await response.json();
            setItems(body.results.map(({name}) => ({label: name, value: name})));
        }
        getCharacters();
    },[])
    
    return (
        <div><select>
            {items.map(({ label, value }) => (
                <option key={value} value={value}>{label}</option>
            ))}
        </select></div>
    );
}

export default DropDown;