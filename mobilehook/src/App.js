import React from 'react';

import MobileCompany from './components/MobileCompany';


let clientsArr=[ 
  {id:101, fam:"Иванов", im:"Иван", otch:"Иванович", balance:200}, 
  {id:105, fam:"Сидоров", im:"Сидор", otch:"Сидорович", balance:250}, 
  {id:110, fam:"Петров", im:"Пётр", otch:"Петрович", balance:180},
  {id:120, fam:"Григорьев", im:"Григорий", otch:"Григорьевич", balance:220},
];


function App() {

  return (
    <MobileCompany 
   
    clients={clientsArr}
  />
 
  )
}

export default App;
