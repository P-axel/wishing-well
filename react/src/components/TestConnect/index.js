import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TestConnect = () => {
  const [token, setToken] = useState(null);
  useEffect(() => {
    axios
      .post('http://54.208.46.110/api/login_check', {
        username: 'user4@k.s',
        password: '1234',
      })
      .then((response) => {
        setToken(response.data.token);
        console.log('REPONSE DU POST', response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get('http://54.208.46.110/api/v1/whishlists', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log('ICI LA REPONSE', response);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return (
    <div>Le token est : {token}</div>
  );
};

export default TestConnect;
