import React from 'react';
import eventEmitter from '../eventEmitter';

class MobileClient extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
    };
    this.famRef = React.createRef();
    this.imRef = React.createRef();
    this.otchRef = React.createRef();
    this.balanceRef = React.createRef();
  }

  toggleEdit = () => {
    this.setState({ isEditing: !this.state.isEditing });
  };

  saveChanges = () => {
    const updatedClient = {
      ...this.props.clientRef,
      fam: this.famRef.current.value,
      im: this.imRef.current.value,
      otch: this.otchRef.current.value,
      balance: parseFloat(this.balanceRef.current.value) || 0,
    };
    eventEmitter.emit('updateClient', updatedClient);
    this.setState({ isEditing: false });
  };

  getStatus = () => (this.props.clientRef.balance > 0 ? 'Активный' : 'Неактивный');
  getStatusStyle = () => ({ color: this.props.clientRef.balance > 0 ? 'green' : 'red' });

  render() {
    console.log(`MobileClient render: ${this.props.clientRef.fam} ${this.props.clientRef.im}`);

    const { fam, im, otch, balance } = this.props.clientRef;
    const { isEditing } = this.state;

    return (
      <tr className='MobileClient'>
        {isEditing ? (
          <>
            <td><input type="text" defaultValue={fam} ref={this.famRef} /></td>
            <td><input type="text" defaultValue={im} ref={this.imRef} /></td>
            <td><input type="text" defaultValue={otch} ref={this.otchRef} /></td>
            <td><input type="number" defaultValue={balance} ref={this.balanceRef} /></td>
            <td style={this.getStatusStyle()}>{this.getStatus()}</td>
            <td><button onClick={this.saveChanges}>Сохранить</button></td>
          </>
        ) : (
          <>
            <td>{fam}</td>
            <td>{im}</td>
            <td>{otch}</td>
            <td>{balance}</td>
            <td style={this.getStatusStyle()}>{this.getStatus()}</td>
            <td><button onClick={this.toggleEdit}>Редактировать</button></td>
          </>
        )}
        <td><button onClick={() => eventEmitter.emit('deleteClient', this.props.clientRef.id)}>Удалить</button></td>
      </tr>
    );
  }
}

export default MobileClient;
