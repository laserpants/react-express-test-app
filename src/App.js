import './App.css';
import React, { useState, useEffect } from 'react';
import axios from './axios';
import { Button, Spinner } from "@chakra-ui/react"
import { ChakraProvider } from "@chakra-ui/react"

function ListRestaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        // THIS IS THE ACTUAL CODE FOR THE REQUEST
        // ---------------------------------------
        //const res = await axios.get('/restaurants');
        //setRestaurants(res.data.collection);
        //setLoading(false);

        // I AM USING A TIMEOUT HERE TO SIMULATE SLOW NETWORK
        // ---------------------------------------
        setTimeout(async () => {
          const res = await axios.get('/restaurants');
          setRestaurants(res.data.collection);
          setLoading(false);
        }, 1000);

      } catch (error) {
        setLoading(false);
        setError(error);
      }
    }
    fetchData();
  }, []);

  const handleClick = async () => {
    const res = await axios.post('/restaurants', {
      name: 'New restaurant',
    });
    setRestaurants(
      [...restaurants, res.data]
    );
  };

  return (
    <>
      {loading ? (
        <div style={{ display: 'flex', width: '100%', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
          <Spinner />
        </div>
      ) : error ? (
        <div>
          error..
        </div>
      ) : (
        <>
          <table>
            <tbody>
              {restaurants.map(({ id, name }, i) => 
                <tr key={i}>
                  <td>
                    {id}
                  </td>
                  <td>
                    {name}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <Button onClick={handleClick}>
            Add new restaurant
          </Button>
        </>
      )}
    </>
  );
}

function App() {
  return (
    <ChakraProvider>
      <ListRestaurants />
    </ChakraProvider>
  );
}

export default App;
