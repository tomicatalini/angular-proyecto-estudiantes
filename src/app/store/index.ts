import { ActionReducerMap } from "@ngrx/store";
import { AuthFeatureKey, AuthState, authReducer } from "./auth/auth.reducer";

export interface AppState {
    [AuthFeatureKey]: AuthState,
}

export const appReducer: ActionReducerMap<AppState> = {
    [AuthFeatureKey]: authReducer
} 