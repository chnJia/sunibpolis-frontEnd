import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface City {
    cityId: number;
    cityName: string;
}

export function City() {
    const [cityData, setCityData] = useState<City[]>([]);
    const [selectedCity, setSelectedCity] = useState<number | null>(null);

    useEffect(() => {
        axios.get('https://localhost:7234/api/City')
            .then(response => {
                const responseData = response.data.data;
                setCityData(responseData);
            })
            .catch(error => {
                console.error('Error fetching city data:', error);
            });
    }, []);

    const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCityId = parseInt(event.target.value, 10);
        setSelectedCity(selectedCityId);
    };

    return (
        <div>
            <select
                id="select-city"
                onChange={handleCityChange}
                value={selectedCity || ''}
                style={{
                    padding: '8px',
                    fontSize: '16px',
                    borderRadius: '20px ',
                    border: '3px solid rgb(129, 143, 180)',
                    width: '200px',
                    backgroundColor: 'rgb(43, 43, 90)',
                    color: 'white'
                }}
            >
                <option value="" disabled>Select a city</option>
                {cityData.map(city => (
                    <option key={city.cityId} value={city.cityId}>
                        {city.cityName}
                    </option>
                ))}
            </select>
        </div>
    );
}


