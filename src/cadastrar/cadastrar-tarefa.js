import React, { useState } from 'react';
import { Button, Form, Modal, Jumbotron } from 'react-bootstrap';
import { navigate, A } from 'hookrouter';


function CadastrarTarefa() {
    return (
        <React.Fragment>
            <h3 className="text-center">Cadastrar</h3>
            <Jumbotron>
                <Form noValidate>
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
                            required />
                        <Form.Control.Feedback type="invalid">
                            A tarefa deve conter ao menos 5 caracteres
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Button variant="success" type="submit" title="Cadastrar">
                            Cadastrar
                        </Button>
                    </Form.Group>
                </Form>
            </Jumbotron>
        </React.Fragment>
    )
}

export default CadastrarTarefa;