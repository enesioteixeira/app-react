import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [tarefas, setarTarefas] = useState([]);
  const [modal, setModal] = useState(false);
  const [edicaoAtiva, setEdicaoAtiva] = useState(false);
  const [tarefaEditando, setTarefaEditando] = useState({ id: '', tarefa: '' });

  const salvarTarefa = () => {
    const tarefaInput = document.getElementById('content-tarefa');
    const novaTarefa = {
      id: new Date().getTime(),
      tarefa: tarefaInput.value,
      finalizada: false
    };

    setarTarefas([...tarefas, novaTarefa]);
    tarefaInput.value = '';
    setModal(false);
  };

  const marcarConcluida = (id) => {
    const novasTarefas = tarefas.map((tarefa) => {
      if (tarefa.id === id) {
        return { ...tarefa, finalizada: true };
      }
      return tarefa;
    });
    setarTarefas(novasTarefas);
    window.localStorage.setItem('tarefas', JSON.stringify(novasTarefas));
  };

  const editarTarefa = (id, tarefa) => {
    setEdicaoAtiva(true);
    setTarefaEditando({ id, tarefa });
    setModal(true);
  };

  const atualizarTarefa = () => {
    const tarefaInput = document.getElementById('content-tarefa');
    const tarefaAtualizada = {
      id: tarefaEditando.id,
      tarefa: tarefaInput.value,
      finalizada: tarefaEditando.finalizada
    };

    const novasTarefas = tarefas.map((tarefa) => {
      if (tarefa.id === tarefaEditando.id) {
        return tarefaAtualizada;
      }
      return tarefa;
    });

    setarTarefas(novasTarefas);
    tarefaInput.value = '';
    setEdicaoAtiva(false);
    setTarefaEditando({ id: '', tarefa: '' });
    window.localStorage.setItem('tarefas', JSON.stringify(novasTarefas));
    setModal(false);
  };

  const abrirModal = () => {
    setModal(!modal);
    setEdicaoAtiva(false);
    setTarefaEditando({ id: '', tarefa: '' });
  };

  useEffect(() => {
    const storedTarefas = window.localStorage.getItem('tarefas');
    if (storedTarefas) {
      setarTarefas(JSON.parse(storedTarefas));
    }
  }, []);

  return (
    <div className="App">
      {modal ? (
        <div className="modal">
          <div className="modalContent">
            <h3>{edicaoAtiva ? 'Editar tarefa' : 'Adicionar sua tarefa'}</h3>
            <input id="content-tarefa" type="text" defaultValue={tarefaEditando.tarefa} />
            {edicaoAtiva ? (
              <button onClick={atualizarTarefa}>Atualizar</button>
            ) : (
              <button onClick={salvarTarefa}>Salvar!</button>
            )}
          </div>
        </div>
      ) : (
        <div></div>
      )}
      
      <div onClick={abrirModal} className="addTarefa">
        +
      </div>

      <h1>ESTÉTICA VALADARES</h1>
      <div className="boxTarefas">      
        <h2>AGENDAS DO DIA</h2>
        {tarefas.map((val) => {
          if (!val.finalizada) {
            return (
              <p onClick={() => marcarConcluida(val.id)} onDoubleClick={() => editarTarefa(val.id, val.tarefa)}>
                {val.tarefa}
              </p>
            );
          } else {
            return (
              <p
                onClick={() => marcarConcluida(val.id)}
                onDoubleClick={() => editarTarefa(val.id, val.tarefa)}
                style={{ textDecoration: 'line-through' }}
              >
                {val.tarefa}
              </p>
            );
          }
        })}
      </div>
      </div>
    
  );
}

export default App;
