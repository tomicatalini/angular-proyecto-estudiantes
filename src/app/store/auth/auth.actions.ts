import { createActionGroup, props } from "@ngrx/store";
import { User } from "src/app/featured/user/models/models";

export const AuthActions = createActionGroup({
    source: 'Auth',
    events: {
        'Set Auth User': props<{ payload: User | null }>(),
        'Set User Token': props<{ token: string }>()
    }
})