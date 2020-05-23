import React, { useState, useEffect } from 'react';
import { A } from 'hookrouter';
import { Table, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import ItensListaTarefas from './itens-lista-tarefas';

function ListarTaferas() {

   const [tarefas, setTarefas] = useState([]);
   const [carregarTarefas, setCarregarTarefas] = useState(true);

   useEffect(() => {
      function obterTarefas() {
         const tarefasDb = localStorage['tarefas'];
         let ListarTaferas = tarefasDb ? JSON.parse(tarefasDb) : [];
         setTarefas(ListarTaferas);
      }

      if (carregarTarefas) {
         obterTarefas();
         setCarregarTarefas(false);
      }

   }, [carregarTarefas])


   return (
      <React.Fragment>
         <h2 className="text-center mb-5">Tarefas a Fazer</h2>
         <Table striped bordered hover responsive data-testid="table">
            <thead>
               <tr>
                  <th>#</th>
                  <th className="text-center">Tarefa</th>
                  <th className="text-center">
                     <A href="/cadastrar"
                        className="btn btn-success btn-sm"
                        data-testid="btn-nova-tarefa"
                        title="Nova tarefa">
                        <FontAwesomeIcon className="mr-1" icon={faPlus} />
                       Nova tarefa
                     </A>
                  </th>
               </tr>
            </thead>
            <tbody>
               <ItensListaTarefas
                  tarefas={tarefas}
                  recarregarTarefas={setCarregarTarefas}
               />
            </tbody>
         </Table>

         <Card bg="light" text="dark" className="d-none">
            <Card.Body>
               <Card.Title className="mb-0 text-center">Você não têm tarefas cadastradas :(</Card.Title>
            </Card.Body>
         </Card>
      </React.Fragment>
   )
}

export default ListarTaferas;