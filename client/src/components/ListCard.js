import React,{useContext} from 'react'
import {Context} from '../context';
import {feedPlayer} from '../api';

const ListCard = ({data}) => {

	const {dispatch} = useContext(Context);

	const handleSelected = (data) =>{
		dispatch({
			type:'SELECT_PODCAST',
			payload:data
		});
		dispatch({
			type:"ADD_EPISODES",
			payload:[]
		});
		dispatch({
			type:"LOADING"
		})
		getMyfeedUrl(data.feed);
	}


	const getMyfeedUrl = async(url) =>{
		const data = await feedPlayer(url,dispatch);
		if(data){
			dispatch({
				type:"ADD_EPISODES",
				payload:data
			})
			dispatch({
				type:"LOADING"
			})			
		}
	}

	return (
		<ul className="list-group">
		  <li className="list-group-item d-flex" style={{cursor:'pointer'}} onClick={()=>handleSelected(data)}>
		  <img src={data.image}
		  alt="" className="img-fluid" style={{width:'50px',borderRadius:'50%'}}/>
		 	{" "}<span>{data.name}</span></li>
		</ul>
	)
}

export default ListCard