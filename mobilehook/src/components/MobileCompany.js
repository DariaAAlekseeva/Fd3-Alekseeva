import React, { useState, useEffect, useRef } from 'react';
import eventEmitter from '../eventEmitter';
import MobileClient from './MobileClient';
import './MobileCompany.css';
import { v4 as uuidv4 } from 'uuid';

const MobileCompany = ({clients }) => {
  const [clientList, setClientList] = useState(clients);
  const [filter, setFilter] = useState('all');
  const [isAdding, setIsAdding] = useState(false);

  const newFamRef = useRef();
  const newImRef = useRef();
  const newOtchRef = useRef();
  const newBalanceRef = useRef();

  useEffect(() => {
    const updateClient = (updatedClient) => {
      setClientList((prevClients) =>
        prevClients.map((client) =>
          client.id === updatedClient.id ? updatedClient : client
        )
      );
    };

    const deleteClient = (id) => {
      setClientList((prevClients) =>
        prevClients.filter((client) => client.id !== id)
      );
    };

    eventEmitter.on('updateClient', updateClient);
    eventEmitter.on('deleteClient', deleteClient);

    return () => {
      eventEmitter.off('updateClient', updateClient);
      eventEmitter.off('deleteClient', deleteClient);
    };
  }, []);

  const addClient = () => {
    setIsAdding(true);
  };

  const saveNewClient = () => {
    const newClient = {
      id: uuidv4(),
      fam: newFamRef.current.value,
      im: newImRef.current.value,
      otch: newOtchRef.current.value,
      balance: parseFloat(newBalanceRef.current.value) || 0,
    };
    setClientList((prevClients) => [...prevClients, newClient]);
    setIsAdding(false);
  };

  const applyFilter = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  const getFilteredClients = () => {
    if (filter === 'active') return clientList.filter(client => client.balance > 0);
    if (filter === 'blocked') return clientList.filter(client => client.balance <= 0);
    return clientList;
  };

  const clientsCode = getFilteredClients().map((client) => (
    <MobileClient key={client.id} clientRef={client} />
  ));

  return (
    <div className="MobileCompany">
      <div>
        <button onClick={() => applyFilter('all')}>Все</button>
        <button onClick={() => applyFilter('active')}>Активные</button>
        <button onClick={() => applyFilter('blocked')}>Заблокированные</button>
      </div>

      <table className="MobileCompanyTable">
        <thead>
          <tr>
            <th>Фамилия</th>
            <th>Имя</th>
            <th>Отчество</th>
            <th>Баланс</th>
            <th>Статус</th>
            <th>Редактировать</th>
            <th>Удалить</th>
          </tr>
        </thead>
        <tbody>
          {clientsCode}
          {isAdding && (
            <tr>
              <td><input type="text" ref={newFamRef} /></td>
              <td><input type="text" ref={newImRef} /></td>
              <td><input type="text" ref={newOtchRef} /></td>
              <td><input type="number" ref={newBalanceRef} /></td>
              <td></td>
              <td><button onClick={saveNewClient}>Сохранить</button></td>
            </tr>
          )}
        </tbody>
      </table>

      <button onClick={addClient}>Добавить клиента</button>
    </div>
  );
};

export default MobileCompany;
