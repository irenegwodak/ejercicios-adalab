import { useEffect, useState } from 'react';
import callToApi from '../services/api';
import Header from './Header';
import Dummy from './Dummy';
import SolutionLetters from './SolutionLetters';
import ErrorLetters from './ErrorLetters';

import '../styles/App.scss';

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
  const handleKeyDown = (ev) => {
    ev.target.setSelectionRange(0, 1);
  };

  const handleInputLetter = (event) => {
    const regExp = /^[A-Za-zñÑ´Á-Úá-ú¨üÜ\s]*$/;
    const regExpToNotInclude = /^(|[´¨\s])$/;
    const inputValue = event.currentTarget.value;
    if (regExp.test(inputValue)) {
      setLastLetter(inputValue);
      if (!regExpToNotInclude.test(inputValue) && !userLetters.includes(inputValue)) {
        setUserLetters([...userLetters, inputValue]);
      }
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
        <Header/>
        
        <main className="main">
          <section>
            <SolutionLetters word={word} userLetters={userLetters}/>
            <ErrorLetters word={word} userLetters={userLetters}/>
            
            <form className="form">
              <label className="title" htmlFor="last-letter">
                Escribe una letra:
              </label>
              <input
                autoComplete="off"
                className="form__input"
                maxLength="1"
                type="text"
                name="last-letter"
                id="last-letter"
                value={lastLetter}
                onKeyDown={handleKeyDown}
                onChange={handleInputLetter}
              />
            </form>
          </section>
          <Dummy numberOfErrors={getNumberOfErrors()}/>
        </main>
      </div>
    </>
  );
}

export default App;
