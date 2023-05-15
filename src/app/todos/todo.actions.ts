import { createAction, props } from "@ngrx/store";

export const crearTodo = createAction( 
    '[TODO] Crea todo', 
    props<{ texto: string }>()
);

export const toggleTodo = createAction(
    '[TODO] Toggle todo',
    props<{ id: number }>()
);

export const editTodo = createAction(
    '[TODO] Edit todo', 
    props<{ texto: string, id: number }>()
);

export const borrarTodo = createAction(
    '[TODO] Borrar todo', 
    props<{ id: number }>()
);

export const toggleAll = createAction(
    '[TODO] Toggle all', 
    props<{ isComplete: boolean }>()
)

export const limpiarCompletados = createAction('[TODO], Limpiar completados');