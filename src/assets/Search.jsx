import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from "./Api";


const Search = ({onSearchChange}) => {

    const [search,setSearch] = useState(null)

    const loadOptions = (inputValue) => {
        return (
            fetch(`${GEO_API_URL}/cities?minPopulation=100000&namePrefix=${inputValue}`, geoApiOptions)
                .then(response => response.json())
                .then(response => {
                    return {
                        options: response.data.map((city) => {
                            return {
                                value: `${city.latitude} ${city.longitude}`,
                                label: `${city.name}, ${city.countryCode}`
                            }
                        })
                    }
                   
                })
                .catch(err => console.error(err))
        )
    }

    const handleOnChange = (searchData) => { //Passing Data
        setSearch(searchData) //setting the new value
        onSearchChange(searchData) //calling the onSearchChange function and passing the new value
    }

    const customStyles = {
        control: (provided, state) => ({
          ...provided,
          borderTopRightRadius: 0,
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 16,
          borderBottomRightRadius: 16,
          border: "2px solid #ccc",
          padding: 10,
          marginTop: -30,
          width: "100%",
          "&:hover": {
            border: "2px solid #aaa",
          },
        }),
        dropdownIndicator: (provided, state) => ({
          ...provided,
            margin: "auto",
            marginTop: 0,
            marginBottom: 0,
        }),
        indicatorSeparator: () => ({}),
        input: (provided, state) => ({
          ...provided,
          paddingRight: 10,
          "&::placeholder": {
            color: "#000",
            
          },
        }),
        option: (provided, state) => ({
          ...provided,
          backgroundColor: state.isSelected ? "#f5f5f5" : "#fff",
          color: "#000",
          "&:hover": {
            backgroundColor: "#f5f5f5",
          },
        }),
        singleValue: (provided, state) => ({
          ...provided,
          marginLeft: 1,
        }),
      }
      

      return (
        <div style={{ position: "relative", marginRight: 75, marginLeft: 75}}>
            <AsyncPaginate
            styles={customStyles}
            debounceTimeout={600}
            value={search}
            onChange={handleOnChange}
            loadOptions={loadOptions}
            placeholder="Search City Here..."
            />
        </div>
      )
}

export default Search