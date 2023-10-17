import { useEffect, useState } from 'react';
import callToApi from '../services/api';
import '../styles/app.scss';

function App() {
  //states
  // const [numberOfErrors, setNumberOfErrors] = useState(0);
  const [lastLetter, setLastLetter] = useState('');
  const [userLetters, setUserLetters] = useState([]);
  const [word, setWord] = useState('');

  useEffect(() => {
    callToApi().then((response) => {
      setWord(response);
    });
  }, []);

  //events
  const handleInputLetter = (event) => {
    const regExp = /^[A-Za-zñÑ´Á-Úá-ú¨üÜ\s]*$/;
    const regExpToNoInclude = /^(|[´¨\s])$/;
    const inputValue = event.currentTarget.value;
    if (regExp.test(inputValue)) {
      setLastLetter(inputValue);
      if (!regExpToNoInclude.test(inputValue)) {
        setUserLetters([...userLetters, inputValue]);
      }
    }
  };

  //renders
  const renderSolutionLetters = () => {
    const wordLetters = word.split('');
    return wordLetters.map((letter, i) => {
      const exists = userLetters.includes(letter);
      return (
        <li className="letter" key={i}>
          {exists ? letter : ''}
        </li>
      );
    });
  };
  const renderErrorLetters = () => {
    const errorLetters = userLetters.filter((letter) => !word.includes(letter));
    return errorLetters.map((letter, i) => {
      return (
        <li className="letter" key={i}>
          {letter}
        </li>
      );
    });
  };
  const getNumberOfErrors = () => {
    const errorLetters = userLetters.filter((letter) => !word.includes(letter));
    return errorLetters.length;
  };

  return (
    <>
      <div className="page">
        <header>
          <h1 className="header__title">Juego del ahorcado</h1>
        </header>
        <main className="main">
          <section>
            <div className="solution">
              <h2 className="title">Solución:</h2>
              <ul className="letters">{renderSolutionLetters()}</ul>
            </div>
            <div className="error">
              <h2 className="title">Letras falladas:</h2>
              <ul className="letters">{renderErrorLetters()}</ul>
            </div>
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
                onChange={handleInputLetter}
              />
            </form>
          </section>
          <section className={`dummy error-${getNumberOfErrors()}`}>
            <span className="error-13 eye"></span>
            <span className="error-12 eye"></span>
            <span className="error-11 line"></span>
            <span className="error-10 line"></span>
            <span className="error-9 line"></span>
            <span className="error-8 line"></span>
            <span className="error-7 line"></span>
            <span className="error-6 head"></span>
            <span className="error-5 line"></span>
            <span className="error-4 line"></span>
            <span className="error-3 line"></span>
            <span className="error-2 line"></span>
            <span className="error-1 line"></span>
          </section>
        </main>
      </div>
    </>
  );
}

export default App;
