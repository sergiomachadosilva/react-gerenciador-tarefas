import React from 'react';
import ReactDOM from 'react-dom'
import GerenciadorTarefas from './gerenciador-tarefas';

test('Deve renderizar o projetos sem erros', () => {
  const div = document.createElement('div')
  ReactDOM.render(<GerenciadorTarefas />, div)
  ReactDOM.unmountComponentAtNode(div)

});
