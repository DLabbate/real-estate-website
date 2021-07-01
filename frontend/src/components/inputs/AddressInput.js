import React from "react";
import PlacesAutocomplete from "react-places-autocomplete";
import "./AddressInput.css";

const AddressInput = ({
  value,
  onChange,
  onSelect,
  suggestionContainerAbsolute,
}) => {
  const suggestionContainerClass = suggestionContainerAbsolute
    ? "suggestion-container suggestion-container--absolute"
    : "suggestion-container";

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
              // Place a random string for autocomplete attribute so Google chrome does not place autocomplete
              // See https://gist.github.com/niksumeiko/360164708c3b326bd1c8
              autocomplete: "none",
            })}
          />
          <div className={suggestionContainerClass}>
            {loading ? <div>...loading</div> : null}
            {suggestions.map((suggestion) => {
              const className = suggestion.active
                ? "suggestion-item suggestion-item--active"
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
