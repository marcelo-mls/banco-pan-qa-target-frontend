import React, { useState, useEffect } from 'react';
import { fetchSpaceContent } from '../src/utils/api';
import Header from './components/Header';
import Main from './components/Main';
import GlobalStyles from './styles/GlobalStyles';
import './styles/App.css';

function App() {
  const [selectedSpace, setSelectedSpace] = useState('dashResumo1');
  const [errorMessage, setErrorMessage] = useState('');
  const [spaceData, setSpaceData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getSpaceContent = async () => {
    setErrorMessage('');
    setIsLoading(true);

    // const existingToken = localStorage.getItem('token');
    const selectedSpaceClean = selectedSpace.replace(/\s/g, '').toLowerCase();
    const response = await fetchSpaceContent(selectedSpaceClean);

    if (response.status) {
      setErrorMessage(response.message);
      setSpaceData([]);
    } else {
      setErrorMessage('');
      setSpaceData(response);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getSpaceContent();
  }, [selectedSpace]);

  return (
    <>
      <GlobalStyles />
      <Header
        selectedSpace={selectedSpace}
        setSelectedSpace={setSelectedSpace}
        getSpaceContent={getSpaceContent}
        errorMessage={errorMessage}
      />
      <Main
        errorMessage={errorMessage}
        isLoading={isLoading}
        spaceData={spaceData}
      />
    </>
  );
}

export default App;
