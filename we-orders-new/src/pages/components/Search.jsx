import React, { useState} from 'react';
import Autosuggest from 'react-autosuggest';
import Fuse from 'fuse.js';

const Search = (props) => {

    const [value, setInputText] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    const options = {
        includeScore: true,
        keys: ['id', 'name']
    }
    const fuse = new Fuse(props.products, options);

    const getSuggestions = value => {
        const inputValue = value.trim().toLowerCase();
        return fuse.search(inputValue).slice(0, 6);
    };

    const getSuggestionValue = suggestion => suggestion.item.name;

    const renderSuggestion = suggestion => (
        <div>
            <div className="ms-2 me-auto">
                <div className="fw-bold">{suggestion.item.name}</div>
                {suggestion.item.id}
            </div>
        </div>
    );

    const onChange = (event, { newValue }) => {
        setInputText(newValue);
    };

    const onSuggestionsFetchRequested = ({ value }) => {
        setSuggestions(getSuggestions(value));
    };

    const onSuggestionsClearRequested = () => {
        setSuggestions([]);
    };

    const onSuggestionSelected = (event, {suggestion}) => {
        setInputText("");
        props.onItemSelected(suggestion);
    }

    const inputProps = {
        placeholder: 'Αναζήτηση',
        value,
        onChange: onChange
    };

    return (
        <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
            highlightFirstSuggestion={true}
            onSuggestionSelected={onSuggestionSelected}
        />
    );

}

export default Search;