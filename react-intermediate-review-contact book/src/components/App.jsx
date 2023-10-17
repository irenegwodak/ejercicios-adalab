//EN CLASE

import { useState, useEffect } from 'react';
// import data from '../services/data.json';
import callToApi from '../services/api';
import '../styles/App.scss';

function App() {
  
  const objectNewContact = {
    name: '',
    lastname: '',
    phone: '',
    email: '',
  };

  // state
  const [contacts, setContacts] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [newContactData, setNewContactData] = useState(objectNewContact);

  //effects
  useEffect(() => {
    callToApi().then((response) => {
      setContacts(response);
    });
  }, []);

  //events
  const handleFormSubmit = (ev) => ev.preventDefault();
  const handleSearch = (ev) => setSearchValue(ev.currentTarget.value);
  const handleNewContactForm = (ev) =>
    setNewContactData({ ...newContactData, [ev.target.id]: ev.target.value });

  const handleNewContactAddBtn = () => {
    setContacts([...contacts, newContactData]);
    setNewContactData(objectNewContact);
  };

  //render helpers
  const renderHeader = () => {
    return (
      <header className="header">
        <h1 className="header__title">Mi agenda de contactos</h1>
        <form onSubmit={handleFormSubmit}>
          <input
            className="header__search"
            autoComplete="off"
            type="search"
            name="search"
            placeholder="Filtrar contactos por nombre"
            value={searchValue}
            onChange={handleSearch}
          />
        </form>
      </header>
    );
  };
  const renderContactList = () => {
    return contacts
      .filter((contact) => {
        return contact.name.toLowerCase().includes(searchValue.toLowerCase());
      })
      .map((contact, i) => {
        return (
          <li key={i} className="contact__item">
            <p className="contact__name">
              <label className="contact__label">Nombre:</label>
              {contact.name} {contact.lastname}
            </p>
            <p className="contact__phone">
              <label className="contact__label">Teléfono:</label>
              <a
                href={`tel:${contact.phone}`}
                title={`Pulsa aquí para llamar a ${contact.name}`}
              >
                {contact.phone}
              </a>
            </p>
            <p className="contact__mail">
              <label className="contact__label">Email:</label>
              <a
                href={`mailto:${contact.email}`}
                title={`Pulsa aquí para escribir a ${contact.name}`}
              >
                {contact.email}
              </a>
            </p>
          </li>
        );
      });
  };
  const renderNewContactSection = () => {
    return (
      <form className="new-contact__form" onSubmit={handleFormSubmit}>
        <h2 className="new-contact__title">Añade un nuevo contacto</h2>
        <input
          className="new-contact__input"
          type="text"
          name="name"
          id="name"
          placeholder="Nombre"
          onChange={handleNewContactForm}
          value={newContactData.name}
        />
        <input
          className="new-contact__input"
          type="text"
          name="lastname"
          id="lastname"
          placeholder="Apellidos"
          onChange={handleNewContactForm}
          value={newContactData.lastname}
        />
        <input
          className="new-contact__input"
          type="phone"
          name="phone"
          id="phone"
          placeholder="Teléfono"
          onChange={handleNewContactForm}
          value={newContactData.phone}
        />
        <input
          className="new-contact__input"
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          onChange={handleNewContactForm}
          value={newContactData.email}
        />
        <input
          className="new-contact__btn"
          type="submit"
          value="Añadir"
          onClick={handleNewContactAddBtn}
        />
      </form>
    );
  };

  return (
    <div className="page">
      {/* header */}
      {renderHeader()}

      <main>
        {/* contact list */}
        <ul className="contact__list">{renderContactList()}</ul>

        {/* new contact */}
        {renderNewContactSection()}
      </main>
    </div>
  );
}

export default App;
