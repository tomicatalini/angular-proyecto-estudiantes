import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthFeatureKey, AuthState } from "./auth.reducer";

export const selectAuthState = createFeatureSelector<AuthState>(AuthFeatureKey);

export const selectAuthUser = createSelector(selectAuthState, (state) => state.user);

export const selectUserToken = createSelector(selectAuthUser, (user) => user?.token);

export const selectIsAdmin = createSelector(selectAuthUser, (user) => user?.role!.toLowerCase() === 'admin');
export const selectUserName = createSelector(selectAuthUser, (user) => user?.name || null);
export const selectUserRole = createSelector(selectAuthUser, (user) => user?.role || null);