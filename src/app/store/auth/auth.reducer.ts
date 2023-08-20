import { createReducer, on } from "@ngrx/store";
import { User } from "src/app/featured/user/models/models";
import { AuthActions } from "./auth.actions";

export const AuthFeatureKey = 'auth';
export interface AuthState {
    user: User | null,
    token: string | null
}

const initialState: AuthState = {
    user: null,
    token: null,
}

export const authReducer = createReducer(initialState, 
    on(AuthActions.setAuthUser, (currentState, action) => {
        return {
            ...currentState,
            user: action.payload
        }
    }),
    on(AuthActions.setUserToken, (curretState, action) => {
        return {
            ...curretState,
            token: action.token
        }
    })
)