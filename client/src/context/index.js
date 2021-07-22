import {useReducer,createContext} from 'react';

const initialState = {
	podcasts:[],
	selectedPodcast:null,
	playerdata:null,
	episodes:[],
	playerstatus:false,
	title:null,
	error:null,
	loading:false,
	country:null
};

const Context = createContext();

const rootReducer = (state,action) =>{
	switch (action.type) {
		case "GET_INITIAL_PODCASTS":
			return {...state,podcasts:action.payload}
		case "SELECT_PODCAST":
			return{
				...state,
				selectedPodcast:action.payload
			}
		case "SEARCH_PODCAST":
			return{
				...state,
				podcasts:action.payload
			}
		case "ADD_EPISODES":
			return{
				...state,
				episodes:action.payload
			}
		case "PLAY_URL":
			return{
				...state,
				playerdata:action.payload
			}
		case "PLAYER_STAT":
			return{
				...state,
				playerstatus:action.payload
			}
		case "CURRENT_PLAYING":
			return{
				...state,
				title:action.payload
			}
		case "ERROR":
			return{
				...state,
				error:action.payload
			}
		case "LOADING":
			return{
				...state,
				loading: !state.loading
			}
		case "COUNTRY":
			return{
				...state,
				country:action.payload
			}
		default:
			return state;
	}
}


const Provider = ({children}) =>{
	const [state,dispatch] = useReducer(rootReducer,initialState);

	return(
			<Context.Provider value={{ state, dispatch }}>
				{children}
			</Context.Provider>
		)
}

export {Context,Provider};