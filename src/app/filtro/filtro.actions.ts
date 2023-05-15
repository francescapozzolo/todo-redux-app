import { createAction, props } from "@ngrx/store";

export type filtrosValidos = 'todos' | 'completados' | 'pendientes';

export const setFiltro = createAction(
    '[FILTRO], Set filtro', 
    props<{ filtro: filtrosValidos }>()
);