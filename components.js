function MenuButton({ text, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        menu-button px-4 py-2 rounded-full 
        transition duration-300 ease-in-out
        ${selected 
          ? "bg-red-600 scale-105 shadow-lg" 
          : "bg-gray-700 hover:bg-gray-600"}
      `}
    >
      {text}
    </button>
  );
}

function MenuItem({ name, desc, price }) {
  return (
    <div className="menu-item bg-gray-800 p-4 rounded-lg flex justify-between items-center">
      <div>
        <h3 className="text-xl font-bold">{name}</h3>
        <p className="text-gray-400 text-sm">{desc}</p>
      </div>
      <div className="text-xl font-bold">
        {price ? `${price}$00` : "-"}
      </div>
    </div>
  );
}

function ZoneItem({ name, price }) {
  return (
    <div className="menu-item bg-gray-800 p-3 rounded-lg flex justify-between items-center">
      <span>{name}</span>
      <span className="font-bold">{price}$00</span>
    </div>
  );
}