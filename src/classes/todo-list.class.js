import { Todo } from "./todo.class";

export class TodoList{

    constructor(){
        //Array para meter todas las tareas
        //this.todos = [];
        this.cargarLocalStorage();
    }

    //Agregar tarea al array
    nuevoTodo( todo ){
        this.todos.push( todo );
        this.guardarLocalStorage();
    }

    //Borrar todo
    eliminarTodo( id ){
        this.todos = this.todos.filter( todo => todo.id != id );
        this.guardarLocalStorage();
    }

    //Si estaba completado a no completado y viceversa Toggle
    marcarCompletado( id ){

        for(const todo of this.todos ){
            console.log(id, todo.id);
            if( todo.id == id ){
                
                todo.completado = !todo.completado;
                this.guardarLocalStorage();
                break;
            }
        }

    }

    //Borrar todas las tareas completadas
    eliminarCompletados(){
        this.todos = this.todos.filter( todo => !todo.completado );
        this.guardarLocalStorage();
    }

    //Guardar en localStorage
    guardarLocalStorage(){
        localStorage.setItem('todo', JSON.stringify( this.todos ));
    }

    //Cargar desde localStorage
    cargarLocalStorage(){
        this.todos = (localStorage.getItem('todo'))
                      ? JSON.parse( localStorage.getItem('todo'))
                      : [];
        
        this.todos = this.todos.map( obj => Todo.fromJson( obj ) );
    }

    

    
}



