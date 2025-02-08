const API_BASE_URL = 'http://localhost:3000/api/clients'; // Replace with your actual API endpoint

function ClientForm({ client, onSubmit, onCancel }) {
  const [formData, setFormData] = React.useState(client || {
    name: '',
    phone: '',
    address: '',
    email: '',
    interests: '',
    notes: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg w-96">
      <h2 className="text-2xl font-bold mb-4 text-white">
        {client ? 'Editar Cliente' : 'Cadastrar Cliente'}
      </h2>
      <form onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }}>
        <input type="text" name="name" placeholder="Nome" value={formData.name} onChange={handleChange}
          className="w-full p-2 bg-gray-700 rounded mb-2 text-white" required />
        <input type="tel" name="phone" placeholder="Telefone" value={formData.phone} onChange={handleChange}
          className="w-full p-2 bg-gray-700 rounded mb-2 text-white" required />
        <input type="text" name="address" placeholder="Morada" value={formData.address} onChange={handleChange}
          className="w-full p-2 bg-gray-700 rounded mb-2 text-white" required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange}
          className="w-full p-2 bg-gray-700 rounded mb-2 text-white" />
        <textarea name="interests" placeholder="Interesses" value={formData.interests} onChange={handleChange}
          className="w-full p-2 bg-gray-700 rounded mb-2 text-white"></textarea>
        <textarea name="notes" placeholder="Observações" value={formData.notes} onChange={handleChange}
          className="w-full p-2 bg-gray-700 rounded mb-2 text-white"></textarea>

        <div className="flex justify-end">
          <button type="button" onClick={onCancel}
            className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded mr-2">Cancelar</button>
          <button type="submit"
            className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded">
            {client ? 'Salvar' : 'Cadastrar'}
          </button>
        </div>
      </form>
    </div>
  );
}

function ClientList() {
  const [clients, setClients] = React.useState([]);
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [editingClient, setEditingClient] = React.useState(null);

  React.useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      setClients(response.data);
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
      alert('Não foi possível carregar os clientes. Tente novamente.');
    }
  };

  const handleAddClient = async (newClient) => {
    try {
      const response = await axios.post(API_BASE_URL, newClient);
      setClients([...clients, response.data]);
      setIsFormOpen(false);
    } catch (error) {
      console.error('Erro ao adicionar cliente:', error);
      alert('Não foi possível adicionar o cliente. Tente novamente.');
    }
  };

  const handleUpdateClient = async (updatedClient) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/${updatedClient.id}`, updatedClient);
      const updatedClients = clients.map(client =>
        client.id === updatedClient.id ? response.data : client
      );
      setClients(updatedClients);
      setEditingClient(null);
    } catch (error) {
      console.error('Erro ao atualizar cliente:', error);
      alert('Não foi possível atualizar o cliente. Tente novamente.');
    }
  };

  const handleDeleteClient = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      const newClients = clients.filter(client => client.id !== id);
      setClients(newClients);
    } catch (error) {
      console.error('Erro ao excluir cliente:', error);
      alert('Não foi possível excluir o cliente. Tente novamente.');
    }
  };

  return (
    <div className="container mx-auto p-4 bg-gray-900">
      <h1 className="text-3xl font-bold mb-4 text-white">Lista de Clientes</h1>
      <button onClick={() => setIsFormOpen(true)}
        className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded mb-4">
        Cadastrar Cliente
      </button>

      {isFormOpen &&
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <ClientForm onSubmit={handleAddClient} onCancel={() => setIsFormOpen(false)} />
        </div>}

      {editingClient &&
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <ClientForm client={editingClient} onSubmit={handleUpdateClient}
            onCancel={() => setEditingClient(null)} />
        </div>}

      <table className="w-full border-collapse text-white">
        <thead>
          <tr className="bg-gray-700">
            <th className="p-2">Nome</th>
            <th className="p-2">Telefone</th>
            <th className="p-2">Morada</th>
            <th className="p-2">Email</th>
            <th className="p-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {clients.map(client => (
            <tr key={client.id} className="border-b border-gray-700 hover:bg-gray-700">
              <td className="p-2">{client.name}</td>
              <td className="p-2">{client.phone}</td>
              <td className="p-2">{client.address}</td>
              <td className="p-2">{client.email}</td>
              <td className="p-2 flex gap-2">
                <button onClick={() => setEditingClient(client)}
                  className="bg-blue-600 hover:bg-blue-500 text-white px-2 py-1 rounded">
                  Editar
                </button>
                <button onClick={() => handleDeleteClient(client.id)}
                  className="bg-red-600 hover:bg-red-500 text-white px-2 py-1 rounded">
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

ReactDOM.render(<ClientList />, document.getElementById('root'));