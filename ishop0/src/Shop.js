import React from "react";

function Shop(props) {
  return (
    <div>
      <h1>{props.name}</h1>
      <p>Адрес: {props.address}</p>

      <table border="1" style={{ width: "100%", textAlign: "left" }}>
        <thead>
          <tr>
            <th>Фото</th>
            <th>Название</th>
            <th>Цена</th>
            <th>Остаток</th>
          </tr>
        </thead>
        <tbody>
          {props.products.map((product, index) => (
            <tr key={index}>
              <td>
                <img src={product.imageUrl} alt={product.name} width="100" />
              </td>
              <td>{product.name}</td>
              <td>{product.price} руб.</td>
              <td>{product.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Shop;
