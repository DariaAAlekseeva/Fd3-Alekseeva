import React from 'react';
import Shop from './Shop';
import './App.css';

function App() {
  const products = [
    {
      name: 'Кастрюля',
      price: 200,
      imageUrl: 'https://posuda-pro.ru//userfiles/shop/product/3/22160_kastryulya-5875-l-d-50-sm-h-30-sm-be.jpg',
      stock: 5,
    },
    {
      name: 'Ложка',
      price: 50,
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOtTr13tR-aZ4uqIqX6Jc6yDl0fvkxBIoGGQ&s',
      stock: 3,
    },
    {
      name: 'Кресло',
      price: 7000,
      imageUrl: 'https://annihaus.ru/upload/iblock/bff/bff090a49e7104b2638df36b0802b2fc.jpg',
      stock: 2,
    },
  ];



  return (
    <div className="App">
      <Shop name = 'Интернет-магазин "Тысяча мелочей"' address = 'www.tysyacha-shop.com' products = {products} />
    </div>
  );
}

export default App;
