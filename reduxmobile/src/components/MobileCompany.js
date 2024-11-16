import React, { useState, useEffect, useRef } from 'react';
import eventEmitter from '../eventEmitter';
import MobileClient from './MobileClient';
import './MobileCompany.css';
import { v4 as uuidv4 } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';
import { addClient, deleteClient, updateClient as updateClientAction, fetchClients } from '../redux/clientsSlice';

const MobileCompany = () => {
  const clients = useSelector((state) => state.clients.clients);
  const companyName = useSelector((state) => state.clients.companyName);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchClients());
  }, [dispatch]);

  const [filter, setFilter] = useState('all');
  const [isAdding, setIsAdding] = useState(false);

  const newFamRef = useRef();
  const newImRef = useRef();
  const newOtchRef = useRef();
  const newBalanceRef = useRef();

  const updateClient = (updatedClient) => {
    dispatch(updateClientAction(updatedClient));
  };

  const handleDeleteClient = (id) => {
    dispatch(deleteClient(id));
  };

  useEffect(() => {
    eventEmitter.on('updateClient', updateClient);
    eventEmitter.on('deleteClient', handleDeleteClient);

    return () => {
      eventEmitter.off('updateClient', updateClient);
      eventEmitter.off('deleteClient', handleDeleteClient);
    };
  }, [dispatch]);

  const addNewClient = () => {
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
    dispatch(addClient(newClient));
    setIsAdding(false);
  };

  const applyFilter = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  const getFilteredClients = () => {
    if (filter === 'active') return clients.filter(client => client.balance > 0);
    if (filter === 'blocked') return clients.filter(client => client.balance <= 0);
    return clients;
  };

  const clientsCode = getFilteredClients().map((client) => (
    <MobileClient key={client.id} clientRef={client} />
  ));

  return (
    <div className="MobileCompany">
      <h1>{companyName || 'Название компании не загружено'}</h1>

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

      <button onClick={addNewClient}>Добавить клиента</button>
    </div>
  );
};

export default MobileCompany;
