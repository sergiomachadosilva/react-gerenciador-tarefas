import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Modal, Jumbotron } from 'react-bootstrap';
import { navigate, A } from 'hookrouter';

function AtualizarTarefa(props) {

    const [exibirModal, setExibirModal] = useState(false);
    const [formValidado, setFormValidado] = useState(false);
    const [tarefa, setTarefa] = useState('');
    const [carregarTarefa, setCarregarTarefa] = useState(true);

    useEffect(() => {
        if (carregarTarefa) {

            const tarefasDb = localStorage['tarefas'];
            const tarefas = tarefasDb ? JSON.parse(tarefasDb) : [];

            const tarefa = tarefas.filter(
                t => t.id === parseInt(props.id)
            )[0];

            setTarefa(tarefa.nome)

            setCarregarTarefa(false);
        }
    }, [carregarTarefa, props]);



    function handleFecharModal(event) {
        setExibirModal(false)
        navigate('/')

    }

    function atualizar(event) {
        event.preventDefault();
        setFormValidado(true);

        if (event.currentTarget.checkValidity() === true) {
            // obtém as tarefas
            const tarefasDb = localStorage['tarefas'];
            let tarefas = tarefasDb ? JSON.parse(tarefasDb) : [];

            // persistir a tarefa atualizada
            tarefas = tarefas.map(tarefaObj => {
                if (tarefaObj.id === parseInt(props.id)) {
                    tarefaObj.nome = tarefa;
                }

                return tarefaObj;
            });

            localStorage['tarefas'] = JSON.stringify(tarefas)

            setExibirModal(true)
        }
    }

    function handleTxtTarefa(event) {
        setTarefa(event.target.value)
    }

    return (
        <React.Fragment>
            <h2 className="text-center mb-5">Editar tarefa</h2>
            <Jumbotron>

                <Form onSubmit={atualizar} noValidate validated={formValidado}>
                    <Form.Group className="text-right">
                        <A href="/" className="btn btn-info btn-sm" title="Voltar">
                            Voltar
                        </A>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Tarefa</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Digite a tarefa"
                            minLength="5"
                            maxLength="100"
                            required
                            value={tarefa}
                            onChange={handleTxtTarefa}
                            data-testid="txt-tarefa" />
                        <Form.Control.Feedback type="invalid">
                            A tarefa deve conter ao menos 5 caracteres
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Button variant="success" type="submit" title="Salvar" data-testid="btn-atualizar">
                            Salvar
                        </Button>
                    </Form.Group>
                </Form>
            </Jumbotron>

            <Modal show={exibirModal} onHide={handleFecharModal} data-testid="modal">
                <Modal.Header closeButton>
                    <Modal.Title>Sucesso</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Tarefa atualizada com sucesso
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='success'
                        onClick={handleFecharModal}
                        data-testid="btn-concluir">
                        Continuar
                     </Button>
                </Modal.Footer>
            </Modal>

        </React.Fragment>
    )
}

AtualizarTarefa.propTypes = {
    id: PropTypes.number.isRequired
}

export default AtualizarTarefa;