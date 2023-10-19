//React
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

//Styles
import '../styles/App.scss';

//Services
import callToApi from '../services/api';

//Components
import Header from './Header';
import Dummy from './Dummy';
import SolutionLetters from './SolutionLetters';
import ErrorLetters from './ErrorLetters';
import Form from './Form';
import Footer from './Footer';
import Instructions from './Instructions';
import Options from './Options';
import Loading from './Loading';

function App() {
  //states
  const [word, setWord] = useState('');
  const [userLetters, setUserLetters] = useState([]);
  const [lastLetter, setLastLetter] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    callToApi().then((response) => {
      setWord(response);
      setIsLoading(false);
    });
  }, []);

  //events
  const handleInputLetter = (value) => {
    setLastLetter(value);
    const caracToNotInclude = /^(|[´¨\s])$/;
    if (!caracToNotInclude.test(value) && !userLetters.includes(value)) {
      setUserLetters([...userLetters, value]);
    }
  };
  const handleInputOptions = (value) => {
    setUserLetters([]);
    setLastLetter('');
    return setWord(value);
  };
  //renders
  const getNumberOfErrors = () => {
    const errorLetters = userLetters.filter((letter) => !word.includes(letter));
    return errorLetters.length;
  };

  return (
    <>
      <div className="page">
        <Header />
        <main className="main">
          <Routes>
            <Route
              path="/"
              element={
                <section>
                  <Loading loading={isLoading} />
                  <SolutionLetters word={word} userLetters={userLetters} />
                  <ErrorLetters word={word} userLetters={userLetters} />
                  <Form
                    lastLetter={lastLetter}
                    handleInputLetter={handleInputLetter}
                  />
                </section>
              }
            />
            <Route path="/instructions" element={<Instructions />} />
            <Route
              path="/options"
              element={<Options handleInputOptions={handleInputOptions} />}
            />
          </Routes>
          <Dummy numberOfErrors={getNumberOfErrors()} />
        </main>

        <Footer />
      </div>
    </>
  );
}

export default App;
