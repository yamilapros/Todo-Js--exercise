import { Todo } from '../classes';
import { todoList } from '../index';
//Referencias
const divTodoList = document.querySelector('.todo-list');
const inputTxt    = document.querySelector('.new-todo');
const btnBorrar   = document.querySelector('.clear-completed');
const ulFilter    = document.querySelector('.filters');
const anchorFilters = document.querySelectorAll('.filtro');


export const crearTodoHtml = ( todo ) => {
    const todoHtml = `
        <li class="${ ( todo.completado ) ? 'completed' : '' }" data-id="${ todo.id }">
            <div class="view">
                <input class="toggle" type="checkbox" ${ ( todo.completado ) ? 'checked' : '' }>
                <label>${ todo.tarea }</label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="Create a TodoMVC template">
        </li>`;
    
    const div = document.createElement('div');
    div.innerHTML = todoHtml;
    divTodoList.append(div.firstElementChild);

    return div.firstElementChild;
}

//Eventos
inputTxt.addEventListener('keyup', (event) => {
   if(event.keyCode == 13 && inputTxt.value.length > 0){
       console.log(inputTxt.value);
       const nuevoTodo = new Todo( inputTxt.value );
       todoList.nuevoTodo( nuevoTodo );
       console.log(todoList);
       crearTodoHtml( nuevoTodo );
       inputTxt.value = '';
    }
});

divTodoList.addEventListener('click', (event) => {
    const nombreElemento = event.target.localName;
    const todoElemento   = event.target.parentElement.parentElement;
    const todoId         = todoElemento.getAttribute('data-id');
    
    if( nombreElemento.includes('input') ){
        todoList.marcarCompletado( todoId );
        todoElemento.classList.toggle('completed');
    }else if( nombreElemento.includes('button') ){
        //Eliminarlo del Array
        todoList.eliminarTodo( todoId );
        //Eliminarlo del HTML
        divTodoList.removeChild( todoElemento );
    }
});


btnBorrar.addEventListener('click', () => {
    todoList.eliminarCompletados();

    //Recorrer los elementos para borrar los completados
    for( let i= divTodoList.children.length -1; i >= 0; i-- ){
        const elemento = divTodoList.children[i];
        console.log(elemento);
        
        if( elemento.classList.contains('completed') ){
            divTodoList.removeChild( elemento );
        }
    }
});

ulFilter.addEventListener('click', ( event ) => {
    const filtro = event.target.text;
    if( !filtro ){
        return;
    }
    anchorFilters.forEach( elem => elem.classList.remove('selected') );
    event.target.classList.add('selected');

    for( const elemento of divTodoList.children ){
        //console.log(elemento);
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');
        switch( filtro ){

            case 'Pendientes':
                if( completado ){
                    elemento.classList.add('hidden');
                }
            break;
            case 'Completados':
                if( !completado ){
                    elemento.classList.add('hidden');
                }
            break;
        }
    }
});