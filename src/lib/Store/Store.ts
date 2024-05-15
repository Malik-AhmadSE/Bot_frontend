import { configureStore } from '@reduxjs/toolkit'
import user from './features/auth/auth';
export const Store = () => {
  return configureStore({
    reducer: {
      user:user,
    }
  })
}


export type AppStore = ReturnType<typeof Store>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']