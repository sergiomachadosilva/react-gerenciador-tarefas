import React, { useState, useEffect } from 'react';
import { A } from 'hookrouter';
import { Table, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import ItensListaTarefas from './itens-lista-tarefas';
import Paginacao from './paginacao'

function ListarTaferas() {

   const ITENS_POR_PAG = 3;

   const [tarefas, setTarefas] = useState([]);
   const [carregarTarefas, setCarregarTarefas] = useState(true);
   const [totalItems, setTotalItems] = useState(0);
   const [paginaAtual, setPaginaAtual] = useState(1)

   useEffect(() => {
      function obterTarefas() {
         const tarefasDb = localStorage['tarefas'];
         let ListaTaferas = tarefasDb ? JSON.parse(tarefasDb) : [];

         //Ordena a lista de tarefas pelo ID
         ListaTaferas.sort(function (a, b) {
            if (a.id < b.id) {
               return 1;
            }
            if (a.id > b.id) {
               return -1;
            }
            return 0;
         });

         setTotalItems(ListaTaferas.length);
         setTarefas(ListaTaferas.splice((paginaAtual - 1) * ITENS_POR_PAG, ITENS_POR_PAG));

      }

      if (carregarTarefas) {
         obterTarefas();
         setCarregarTarefas(false);
      }

   }, [carregarTarefas, paginaAtual])

   function handleMudarPagina(pagina) {
      setPaginaAtual(pagina)
      setCarregarTarefas(true);
   }


   return (
      <React.Fragment>
         <h2 className="text-center mb-5">Tarefas a Fazer</h2>
         <Table striped bordered hover responsive data-testid="table">
            <thead>
               <tr>
                  <th>ID</th>
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

         <div className={tarefas.length === 0 ? 'd-none' : null}>
            <Paginacao
               totalItens={totalItems}
               itemsPorPagina={ITENS_POR_PAG}
               paginaAtual={paginaAtual}
               mudarPagina={handleMudarPagina}
            />
         </div>


         <Card bg="light" text="dark" className={tarefas.length === 0 ? null : 'd-none'}>
            <Card.Body>
               <Card.Title className="mb-0 text-center">Você não possui tarefas cadastradas :(</Card.Title>
            </Card.Body>
         </Card>
      </React.Fragment>
   )
}

export default ListarTaferas;