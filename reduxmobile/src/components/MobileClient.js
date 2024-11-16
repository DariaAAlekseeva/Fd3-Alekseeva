import React, { useState, useRef } from 'react';
import eventEmitter from '../eventEmitter';

const MobileClient = React.memo(({ clientRef }) => {
  const [isEditing, setIsEditing] = useState(false);

  const famRef = useRef();
  const imRef = useRef();
  const otchRef = useRef();
  const balanceRef = useRef();

  const toggleEdit = () => setIsEditing(!isEditing);

  const saveChanges = () => {
    const updatedClient = {
      ...clientRef,
      fam: famRef.current.value,
      im: imRef.current.value,
      otch: otchRef.current.value,
      balance: parseFloat(balanceRef.current.value) || 0,
    };
    eventEmitter.emit('updateClient', updatedClient);
    setIsEditing(false);
  };

  const getStatus = () => (clientRef.balance > 0 ? 'Активный' : 'Неактивный');
  const getStatusStyle = () => ({ color: clientRef.balance > 0 ? 'green' : 'red' });

  console.log(`MobileClient render: ${clientRef.fam} ${clientRef.im}`);

  return (
    <tr className="MobileClient">
      {isEditing ? (
        <>
          <td><input type="text" defaultValue={clientRef.fam} ref={famRef} /></td>
          <td><input type="text" defaultValue={clientRef.im} ref={imRef} /></td>
          <td><input type="text" defaultValue={clientRef.otch} ref={otchRef} /></td>
          <td><input type="number" defaultValue={clientRef.balance} ref={balanceRef} /></td>
          <td style={getStatusStyle()}>{getStatus()}</td>
          <td><button onClick={saveChanges}>Сохранить</button></td>
        </>
      ) : (
        <>
          <td>{clientRef.fam}</td>
          <td>{clientRef.im}</td>
          <td>{clientRef.otch}</td>
          <td>{clientRef.balance}</td>
          <td style={getStatusStyle()}>{getStatus()}</td>
          <td><button onClick={toggleEdit}>Редактировать</button></td>
        </>
      )}
      <td><button onClick={() => eventEmitter.emit('deleteClient', clientRef.id)}>Удалить</button></td>
    </tr>
  );
}, (prevProps, nextProps) => {
  return prevProps.clientRef === nextProps.clientRef;
});

export default MobileClient;
