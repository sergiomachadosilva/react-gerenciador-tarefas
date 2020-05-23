import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard } from '@fortawesome/free-solid-svg-icons';

function ConcluirTarefa(props) {

    const [exibirModal, setExibirModal] = useState(false)

    function handleAbrirModal(event) {
        event.preventDefault();
        setExibirModal(true)
    }

    function handleFecharModal() {
        setExibirModal(false)
    }

    function handleConcluirTarefa(event) {
        event.preventDefault();
        const tarefasDb = localStorage['tarefas'];
        let tarefas = tarefasDb ? JSON.parse(tarefasDb) : [];

        tarefas = tarefas.map(tarefa => {
            if (tarefa.id === props.tarefa.id) {
                tarefa.concluida = true;
            }
            return tarefa
        });

        localStorage['tarefas'] = JSON.stringify(tarefas);
        setExibirModal(false)
        props.recarregarTarefas(true);
    }


    return (
        <React.Fragment>
            <span className={props.className}>
                <Button className="btn-sm mr-1" onClick={handleAbrirModal}
                    data-testid="btn-abrir-modal" title="Concluir tarefa">
                    <FontAwesomeIcon icon={faClipboard} />
                </Button>
            </span>

            <Modal show={exibirModal} onHide={handleFecharModal} data-testid="modal">
                <Modal.Header closeButton>
                    <Modal.Title>Concluir tarefa</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Deseja realmente concluir a seguinte tarefa?
                    <br />
                    <strong>{props.tarefa.nome}</strong>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='success'
                        onClick={handleConcluirTarefa}
                        data-testid="btn-concluir">
                        Sim
                     </Button>
                    <Button
                        variant={'light'} onClick={handleFecharModal} data-testid="btn-fechar-modal">
                        Não
                    </Button>
                </Modal.Footer>
            </Modal>

        </React.Fragment>
    )

}

ConcluirTarefa.propTypes = {
    tarefa: PropTypes.object.isRequired,
    recarregarTarefas: PropTypes.func.isRequired,
    className: PropTypes.string
}

export default ConcluirTarefa;