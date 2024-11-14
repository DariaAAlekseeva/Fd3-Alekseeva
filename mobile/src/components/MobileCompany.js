import React from 'react';
import eventEmitter from '../eventEmitter';
import MobileClient from './MobileClient';
import './MobileCompany.css';

class MobileCompany extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      clients: props.clients,
      filter: 'all',
      isAdding: false, 
    };

    this.newFamRef = React.createRef();
    this.newImRef = React.createRef();
    this.newOtchRef = React.createRef();
    this.newBalanceRef = React.createRef();
  }

  componentDidMount() {
    console.log("MobileCompany componentDidMount");
    eventEmitter.on('updateClient', this.updateClient);
    eventEmitter.on('deleteClient', this.deleteClient);
  }

  componentWillUnmount() {
    console.log("MobileCompany componentWillUnmount");
    eventEmitter.off('updateClient', this.updateClient);
    eventEmitter.off('deleteClient', this.deleteClient);
  }

  updateClient = (updatedClient) => {
    this.setState(prevState => ({
      clients: prevState.clients.map(client =>
        client.id === updatedClient.id ? updatedClient : client
      ),
    }));
  };

  deleteClient = (id) => {
    this.setState(prevState => ({
      clients: prevState.clients.filter(client => client.id !== id),
    }));
  };

  addClient = () => {
    this.setState({ isAdding: true });
  };

  saveNewClient = () => {
    const newClient = {
      id: Date.now(),
      fam: this.newFamRef.current.value,
      im: this.newImRef.current.value,
      otch: this.newOtchRef.current.value,
      balance: parseFloat(this.newBalanceRef.current.value) || 0,
    };
    this.setState(prevState => ({
      clients: [...prevState.clients, newClient],
      isAdding: false,
    }));
  };

  filterClients = (filter) => {
    this.setState({ filter });
  };

  getFilteredClients = () => {
    const { clients, filter } = this.state;
    if (filter === 'active') return clients.filter(client => client.balance > 0);
    if (filter === 'blocked') return clients.filter(client => client.balance <= 0);
    return clients;
  };

  render() {
    const clientsCode = this.getFilteredClients().map(client => (
      <MobileClient key={client.id} clientRef={client} />
    ));

    return (
      <div className='MobileCompany'>
        <div>
          <button onClick={() => this.filterClients('all')}>Все</button>
          <button onClick={() => this.filterClients('active')}>Активные</button>
          <button onClick={() => this.filterClients('blocked')}>Заблокированные</button>
        </div>
        
        <table className='MobileCompanyTable'>
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
            {this.state.isAdding && (
              <tr>
                <td><input type="text" ref={this.newFamRef} /></td>
                <td><input type="text" ref={this.newImRef} /></td>
                <td><input type="text" ref={this.newOtchRef} /></td>
                <td><input type="number" ref={this.newBalanceRef} /></td>
                <td></td>
                <td><button onClick={this.saveNewClient}>Сохранить</button></td>
              </tr>
            )}
          </tbody>
        </table>
        
        <button onClick={this.addClient}>Добавить клиента</button>
      </div>
    );
  }
}

export default MobileCompany;
