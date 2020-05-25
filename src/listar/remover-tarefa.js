import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

function RemoverTarefa(props) {

    const [exibirModal, setExibirModal] = useState(false);

    function handleAbrirModal(event) {
        event.preventDefault();
        setExibirModal(true);
    }

    function handleFecharModal() {
        setExibirModal(false);
    }

    function handleRemoverTarefa(event) {
        event.preventDefault();
        // Pega os valores contidos no localStorage na coluna 'tarefas'
        const tarefasDb = localStorage['tarefas'];

        // Converte para o formato JSON
        let tarefas = tarefasDb ? JSON.parse(tarefasDb) : [];

        // Retornar apenas as tarefas onde o id for diferente da tarefa da tr
        tarefas = tarefas.filter(tarefa => tarefa.id !== props.tarefa.id);

        // Converte o novo array para string e salva novamente no localStorage
        localStorage['tarefas'] = JSON.stringify(tarefas);
        setExibirModal(false);

        props.recarregarTarefas(true);

    }

    return (
        <React.Fragment>
            <Button variant="danger"
                className="btn-sm"
                onClick={handleAbrirModal}
                data-testid="btn-abrir-modal" title="Remover tarefa">
                <FontAwesomeIcon icon={faTrashAlt} />
            </Button>

            <Modal show={exibirModal} onHide={handleFecharModal} data-testid="modal">
                <Modal.Header closeButton>
                    <Modal.Title>Remover tarefa</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Deseja realmente remover a seguinte tarefa?
                    <br />
                    <strong>{props.tarefa.nome}</strong>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='success'
                        onClick={handleRemoverTarefa}
                        data-testid="btn-remover">
                        Sim
                     </Button>
                    <Button
                        onClick={handleFecharModal}
                        variant={'light'} data-testid="btn-fechar-modal">
                        Não
                    </Button>
                </Modal.Footer>
            </Modal>

        </React.Fragment>
    )

}

RemoverTarefa.propTypes = {
    tarefa: PropTypes.object.isRequired,
    recarregarTarefas: PropTypes.func.isRequired
}

export default RemoverTarefa;