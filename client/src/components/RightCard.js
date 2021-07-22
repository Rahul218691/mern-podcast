import React,{useEffect,useContext,useState} from 'react'
import ListCard from './ListCard';
import {getPodcasts,searchPodcast} from '../api';
import {Context} from '../context';
import {toast} from 'react-toastify';

const RightCard = () => {

	const {state:{podcasts,country},dispatch} = useContext(Context);

	const [search, setSearch] = useState('');

	const fetchdata = async() =>{
		const data = await getPodcasts(dispatch,country);
		dispatch({
			type:'GET_INITIAL_PODCASTS',
			payload:data
		})
	}

	useEffect(()=>{
		fetchdata()// eslint-disable-next-line
	},[])


	const handleSearch = async() =>{
		if(!search){
		 	return toast('Please type something...')
		}else{
			const data = await searchPodcast(search,dispatch,country);
			if(data){
				dispatch({
					type:'SEARCH_PODCAST',
					payload:data
				})			
			}
		}
	}

	return (
		<div className="right_panel">
			<div className="right_panel_header">
				<div className="input-group">
				  <input autoComplete="off" type="text" className="form-control" placeholder="search podcast..." 
				  value={search}
				  onChange={(e)=>setSearch(e.target.value)}/>
				  <div className="input-group-append">
				    <button className="btn btn-primary" type="button" id="button-addon2"
				    onClick={()=>handleSearch()}><i className="fas fa-search"></i></button>
				  </div>			  
				</div>				
			</div>
			<div className="podcast_list mb-2">
				{
					podcasts && podcasts.map((podcast,i) =>(
						<ListCard key={i} data={podcast}/>
					))
				}				
			</div>
		</div>
	)
}

export default RightCard