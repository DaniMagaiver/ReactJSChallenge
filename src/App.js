import React, { useEffect, useState } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [getState, setState] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => setState(response.data));
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: 'Formulário com ReactJS',
      url: 'https://github.com/Rocketseat/bootcamp-gostack-desafios/tree/master/desafio-conceitos-reactjs',
      techs: ['ReactJS', 'NodeJS']
    });

    setState([...getState, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    const projects = getState.filter(project => project.id !== id);
    setState(projects);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {getState.map(project => {
          return (
            <li key={project.id}>
              {project.title}
              <button onClick={() => handleRemoveRepository(project.id)}>Remover</button>
            </li>)
        })
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
