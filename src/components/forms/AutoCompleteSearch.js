import React, { Component } from 'react';

class AutoCompleteSearch extends Component {
    constructor(props){
        super(props);
        this.state = {
            value:'',
            suggestions:[]
        }
    }
    
    onChange = e => {
        let searchValue = e.target.value;
        const suggestionsArray = ["Luke","Laksh","Luck","Obi","R2","Me"];
        console.log(suggestionsArray);
        console.log(searchValue);
        if (!searchValue.trim()) {
          this.setState({ suggestions: [] })
          return ;
        }
  
        if (searchValue.length >= 1) {
            this.setState({ value : searchValue, suggestions: suggestionsArray.filter((a) => a.toLowerCase().startsWith(searchValue.toLowerCase())) });
        }
    }

    searchCharacterByName(text){
        const response =  fetch("https://swapi.co/api/people");
        return response;
    };

    selectItemFromList(suggestionObject) {
        this.setState({
          value: suggestionObject.name ,
          suggestions: [suggestionObject]
        });
        console.log(this);
      }

    render() {
        
        let renderItems = () => {
            let listItems = this.state.suggestions.map((suggestion, index) => {
            let suggestionObject = suggestion;
                return (<li key={suggestionObject}>{suggestionObject}</li>
                //<li onClick={() => this.selectItemFromList(suggestionObject)} key={index}>
                //{suggestionObject.name}
                //</li>
                );
            });
            return (
            <div>
                <ul className="doctor-list">
                {listItems}
                </ul>
            </div>
            );

        }
        console.log(this.state.value);

        return (
            <div>
                <input 
                type="text" 
                id="characterSearch" 
                placeholder="start typing a character name" 
                onChange={this.onChange} 
                value={this.state.value}
                ></input>
                {this.state.value}
                {this.state.suggestions?.length > 0 ? renderItems() : null}
            </div>
        );
    }
}

export default AutoCompleteSearch;