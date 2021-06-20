import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import "./Form.css";
import "./AddressInput.css";

const AddressInput = ({ value, onChange, onSelect }) => {
  return (
    <PlacesAutocomplete value={value} onChange={onChange} onSelect={onSelect}>
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div className="address-container">
          <input
            {...getInputProps({
              name: "address",
              placeholder: "Address",
              className: "form__field form__field--lightgrey ",
              maxLength: 80,
            })}
          />
          <div className="suggestion-container">
            {loading ? <div>...loading</div> : null}
            {suggestions.map((suggestion) => {
              const className = suggestion.active
                ? "suggestion-item--active"
                : "suggestion-item";
              const key = suggestion.description;
              return (
                <div
                  key={key}
                  {...getSuggestionItemProps(suggestion, {
                    className,
                  })}
                >
                  {suggestion.description}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
};

export default AddressInput;
