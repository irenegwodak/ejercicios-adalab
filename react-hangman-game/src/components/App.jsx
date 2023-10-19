//React
import { useEffect, useState } from 'react';

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

function App() {
  //states
  const [word, setWord] = useState('');
  const [userLetters, setUserLetters] = useState([]);
  const [lastLetter, setLastLetter] = useState('');

  useEffect(() => {
    callToApi().then((response) => {
      setWord(response);
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
          <section>
            <SolutionLetters word={word} userLetters={userLetters} />
            <ErrorLetters word={word} userLetters={userLetters} />
            <Form
              lastLetter={lastLetter}
              handleInputLetter={handleInputLetter}
            />
          </section>
          <Dummy numberOfErrors={getNumberOfErrors()} />
        </main>
      </div>
    </>
  );
}

export default App;
