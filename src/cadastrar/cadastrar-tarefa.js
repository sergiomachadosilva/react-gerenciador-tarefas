import React, { useState } from 'react';
import { Button, Form, Modal, Jumbotron } from 'react-bootstrap';
import { navigate, A } from 'hookrouter';
import Tarefa from '../models/tarefa.model';


function CadastrarTarefa() {

    const [tarefa, setTarefa] = useState('');
    const [formValidado, setFormValidado] = useState(false);
    const [exibirModal, setExibirModal] = useState(false);


    function cadastrar(event) {
        event.preventDefault();
        setFormValidado(true);
        if (event.currentTarget.checkValidity() === true) {

            // obtém as tarefas
            const tarefasDb = localStorage['tarefas'];
            //Converte as informações do localStorage para o tipo json
            const tarefas = tarefasDb ? JSON.parse(tarefasDb) : [];

            // persistir a tarega 
            tarefas.push(new Tarefa(new Date().getTime(), tarefa, false));
            //Converter o json para para string
            localStorage['tarefas'] = JSON.stringify(tarefas)

            setExibirModal(true)

        }

    }

    function handleTxtTarefa(event) {
        setTarefa(event.target.value)
    }

    function handleFecharModal(event) {
        //setExibirModal(false)
        navigate('/')

    }

    return (
        <React.Fragment>
            <h2 className="text-center mb-5">Cadastrar</h2>
            <Jumbotron>
                <Form validated={formValidado} noValidate onSubmit={cadastrar}>
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
                        <Button variant="success" type="submit" title="Cadastrar" data-testid="btn-cadastrar">
                            Cadastrar
                        </Button>
                    </Form.Group>
                </Form>
            </Jumbotron>

            <Modal show={exibirModal} onHide={handleFecharModal} data-testid="modal">
                <Modal.Header closeButton>
                    <Modal.Title>Sucesso</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Tarefa adicionada com sucesso!
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant={'success'} onClick={handleFecharModal}>
                        Continuar
                    </Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    )
}

export default CadastrarTarefa;