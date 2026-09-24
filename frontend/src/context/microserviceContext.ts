// import {
//   createContext,
//   useReducer,
//   type Dispatch,
//   type ReactNode,
// } from "react";

// import type { Microservice } from "../types";

// interface State {
// services: Microservice[];
// loading: boolean;
// error: string | null;
// }
// type Action =
// | { type: 'SET_AUTH'; payload: { user: any; token: string } }
// | { type: 'LOGOUT' }
// // | { type: 'SET_ENV_FILTER'; payload: Environment | 'ALL' }
// | { type: 'FETCH_SERVICES_SUCCESS'; payload: Microservice[] }
// | { type: 'CREATE_SERVICE_SUCCESS'; payload: Microservice }
// | { type: 'UPDATE_SERVICE_SUCCESS'; payload: Microservice }
// | { type: 'DELETE_SERVICE_SUCCESS'; payload: string }
// | { type: 'SET_ERROR'; payload: string | null };

// const initialState: State = {
//     services: [],
//     loading: false,
//     error: null,
// };

// const microserviceReducer = (state: State, action: Action): State => {
//   switch (action.type) {
//     case "SET_AUTH":
//       return {...state, user: action.payload.user, token: action.payload.token, loading: false, error: null };
//     case "LOGOUT":
//       return { ...state, user: null, token: null, appointments: [], loading: false, error: null };
//     case "FETCH_SERVICES_SUCCESS":
//       return { ...state, loading: false, services: action.payload };
//     case "SET_ERROR":
//       return { ...state, loading: false, error: action.payload };
//     case "CREATE_SERVICE_SUCCESS":
//       return { ...state, services: [...state.services, action.payload] };
//     case "UPDATE_SERVICE_SUCCESS":
//       return {
//         ...state,
//         services: state.services.map((i) =>
//           i.id === action.payload.id ? action.payload : i,
//         ),
//       };
//     case "DELETE_SERVICE_SUCCESS":
//       return {
//         ...state,
//         services: state.services.filter((i) => i.id !== action.payload),
//       };
//     default:
//       return state;
//   }
// };

// export const microserviceContext = createContext<
//   { state: State; dispatch: Dispatch<Action> } | undefined
// >(undefined);
// export const microserviceProvider: React.FC<{ children: ReactNode }> = ({
//   children,
// }) => {
//   const [state, dispatch] = useReducer(microserviceReducer, initialState);
//   return (
//     <MicroserviceContext.Provider value={{ state, dispatch }}>
//       {children}
//     </MicroserviceContext.Provider>
//   );
// };