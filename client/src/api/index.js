import axios from 'axios';


export const getPodcasts = async(dispatch,country) =>{
	try {
		country = country ? country : "in";
		const {data} = await axios.get(`/api/best_podcast/${country}`,{
			headers:{
				"content-type": "application/json"
			}
		});
		return data;
	} catch(err) {
		dispatch({
			type:"ERROR",
			payload:err.response.data.msg
		})
		dispatch({
			type:"LOADING"
		})
	}
}

export const searchPodcast = async(search,dispatch,country) =>{
	try {
		country = country ? country : "in";
		const {data} = await axios.post(`/api/search/${country}`,{search},{
			headers:{
				"content-type": "application/json"
			}			
		});
		return data;
	} catch(err) {
		dispatch({
			type:"ERROR",
			payload:err.response.data.msg
		})
		dispatch({
			type:"LOADING"
		})
	}
}

export const feedPlayer = async(url,dispatch) =>{
	try {
		const {data} = await axios.post('/api/feed',{url},{
			headers:{
				"content-type": "application/json"
			}				
		});
		const {item} = data;
		const tracks = item.map((t,i) =>{
			return {
				title:t.title[0],
				url:t.enclosure[0]['$'].url
			}
		});
		return tracks;
	} catch(err) {
		dispatch({
			type:"ERROR",
			payload:err.response.data.msg
		})
		dispatch({
			type:"LOADING"
		})
	}
}
