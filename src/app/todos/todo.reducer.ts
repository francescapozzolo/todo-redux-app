import { Action, createReducer, on } from "@ngrx/store";
import { borrarTodo, crearTodo, editTodo, limpiarCompletados, toggleAll, toggleTodo } from "./todo.actions";
import { Todo } from "./models/todo.model";

export const initialState: Todo[] = [
    new Todo('Salvar al mundo'), 
    new Todo('Vencer a Thanos'), 
    new Todo('Comprar traje Ironman'),
    new Todo('Robar escudo capitan américa'), 
];

//Siempre debemos retornar un nuevo estado, evitar modificar el estado original
const _todoReducer = createReducer( initialState, 
    on( crearTodo, ( state, {texto} ) => state = [...state, new Todo(texto)] ),
    
    on( borrarTodo, ( state, {id} ) => state.filter( todo => todo.id !== id )),

    on( limpiarCompletados , state => state.filter( todo => !todo.completado)),

    on( toggleTodo, ( state, {id} )   => {
        return state.map( todo => {
            if(todo.id === id){
                return {
                    ...todo,
                    completado: !todo.completado
                }
            } else {
                return todo;
            }
        })
    }),

    on( editTodo, ( state, {texto, id}) => {
        return state.map( todo => {
            if(todo.id === id){
                return {
                    ...todo,
                    texto
                } 
            } else {
                return todo
            }
        });
    }),

    
    on( toggleAll, ( state, {isComplete}) => {
        return state.map( todo => {
            return {
                ...todo,
                completado: isComplete
            }
        });
    }),

);

export function todoReducer( state: any, action: Action ) {
    return _todoReducer( state, action );
}
