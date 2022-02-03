import React, { useState, createContext, useEffect, useMemo, useContext } from "react";
import { LocationContext } from "../location/location.context";

import { restaurantsRequest, restaurantTransform } from "./restaurants.service";

export const RestaurantsContext = createContext();

export const RestaurantsContextProvider = ({ children }) => {

    const [restaurants, setRestaurants ] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const LocationContext = useContext(LocationContext);

    const retrieveRestaurants = () => {
        setIsLoading(true);
        setTimeout(() => {
            restaurantsRequest()
            .then(restaurantTransform)
            .then((results) => {
                setIsLoading(false);
                setRestaurants(results);
            })
            .catch((err) => {
                setIsLoading(false);
                setError(err);
            });
        }, 2000)
    };
    useEffect(() => {
        retrieveRestaurants();
    }, []);
    return (
        <RestaurantsContext.Provider 
        value={{ 
            restaurants, isLoading,error
        }}
        >
            {children}
        </RestaurantsContext.Provider>
    )
}