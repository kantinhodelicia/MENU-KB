import React from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faCcPaypal, faCcMastercard, faCcVisa } from '@fortawesome/free-brands-svg-icons';

const pizzaMenu = [
  { name: "4 Queijos", desc: "Mussarela, provolone, parmesão e gorgonzola", prices: { FAMILIAR: 30.00, MEDIO: 25.00, PEQ: 20.00 } },
  { name: "Quatro Estações", desc: "Mussarela, tomate, azeitona e oregano", prices: { FAMILIAR: 30.00, MEDIO: 25.00, PEQ: 20.00 } },
  // Add more pizzas here...
];

const drinkMenu = [
  { name: "Coca-Cola", desc: "Refrigerante", prices: { UN: 5.00 } },
  { name: "Água", desc: "Água mineral", prices: { UN: 3.00 } },
  // Add more drinks here...
];

const deliveryZones = [
  { name: "Zona 1", price: 5.00 },
  { name: "Zona 2", price: 7.00 },
  { name: "Zona 3", price: 10.00 },
  // Add more zones here...
];

function MenuButton({ text, selected, onClick }) {
  return (
    <button
      className={`px-4 py-2 text-lg font-bold rounded-lg ${selected ? "bg-red-500 text-white" : "bg-gray-200 text-black"}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

function MenuItem({ name, desc, price }) {
  return (
    <div className="bg-gray-200 p-4 rounded-lg">
      <h2 className="text-lg font-bold">{name}</h2>
      <p className="text-sm">{desc}</p>
      <p className="text-lg font-bold">R${price}</p>
    </div>
  );
}

function ZoneItem({ name, price }) {
  return (
    <div className="bg-gray-200 p-4 rounded-lg">
      <h2 className="text-lg font-bold">{name}</h2>
      <p className="text-lg font-bold">R${price}</p>
    </div>
  );
}

function MainComponent() {
  const [selectedSize, setSelectedSize] = React.useState("FAMILIAR");
  const [selectedMenu, setSelectedMenu] = React.useState("PIZZAS");
  const [isZonesOpen, setIsZonesOpen] = React.useState(false);

  const handleMenuChange = (menu) => {
    setSelectedMenu(menu);
    if (menu === "PIZZAS") {
      setSelectedSize("FAMILIAR");
      setIsZonesOpen(false);
    } else if (menu === "BEBIDAS") {
      setSelectedSize("UN");
      setIsZonesOpen(false);
    } else if (menu === "ZONAS") {
      setIsZonesOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white p-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            KANTINHO DELÍCIA
          </h1>
          <div className="flex justify-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faInstagram} className="text-xl" />
              <span>@kantinho_delicia</span>
            </div>
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faFacebook} className="text-xl" />
              <span>PIZZAR.A.C.V</span>
            </div>
          </div>
          <div className="flex justify-center gap-4 text-sm">
            <span>FIXO: 2616090</span>
            <span>SWAG: 5999204</span>
            <span>PLAY: 9352262</span>
          </div>
        </header>

        <nav className="flex justify-center gap-4 mb-8">
          {["PIZZAS", "BEBIDAS", "ZONAS"].map((menu) => (
            <MenuButton 
              key={menu}
              text={menu}
              selected={selectedMenu === menu}
              onClick={() => handleMenuChange(menu)}
            />
          ))}
        </nav>

        {selectedMenu === "PIZZAS" && (
          <div className="flex justify-center gap-4 mb-8">
            {["FAMILIAR", "MEDIO", "PEQ"].map((size) => (
              <MenuButton
                key={size}
                text={size}
                selected={selectedSize === size}
                onClick={() => setSelectedSize(size)}
              />
            ))}
          </div>
        )}

        <main>
          {isZonesOpen ? (
            <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-2">
              {deliveryZones.map((zone, index) => (
                <ZoneItem key={index} {...zone} />
              ))}
            </div>
          ) : (
            <div className="grid gap-4">
              {(selectedMenu === "PIZZAS" ? pizzaMenu : drinkMenu).map((item, index) => (
                <MenuItem
                  key={index}
                  name={item.name}
                  desc={item.desc}
                  price={item.prices[selectedSize]}
                />
              ))}
            </div>
          )}
        </main>

        <footer className="mt-8 text-center text-sm text-gray-400">
          <p>
            {selectedMenu === "PIZZAS" 
              ? "OBS: A ESSES VALORES SERÃO ACRECENTADOS 100$00 DE CAIXA MAIS TAXA DE ENTREGA (DEPENDE DA ZONA)"
              : selectedMenu === "BEBIDAS"
              ? "PREÇOS POR UNIDADE"
              : "TAXAS DE ENTREGA POR ZONA"}
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <FontAwesomeIcon icon={faCcPaypal} className="text-2xl" />
            <FontAwesomeIcon icon={faCc