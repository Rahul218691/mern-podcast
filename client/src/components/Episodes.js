import React,{useContext} from 'react'
import {Context} from '../context';


const Episodes = ({data,img}) => {

	const {dispatch,state} = useContext(Context)

	const playAudio = (url,title) =>{
		if(url){
			dispatch({
				type:"PLAY_URL",
				payload:url
			})
			dispatch({
				type:"PLAYER_STAT",
				payload:true
			})
			dispatch({
				type:"CURRENT_PLAYING",
				payload:title
			})
		}
	}


	const pauseAudio = (url) =>{
		if(url){
			dispatch({
				type:"PLAYER_STAT",
				payload:false
			});
		}
	}

	return (
		<div className="card">
		  <div className="card-body d-flex justify-content-between align-items-center">
		  		<div className="left_card_body">
			    	<img alt=""
			    	src={img}
			    	className="img-fluid"
			    	style={{width:'50px'}}/>
			    	<span style={{marginLeft:'5px'}}>{data.title}</span>
		  		</div>
		  		<div className="left_card_body_btn">
		  			{
		  				state.playerdata === data.url  && state.playerstatus?
		  				(
		  					<span onClick={()=>pauseAudio(data.url)}><i className="fas fa-pause"></i></span>
		  				) :
		  				(
		  					<span onClick={()=>playAudio(data.url,data.title)}><i className="fas fa-play"></i></span>
		  				)
		  			}
		  		</div>
		  </div>
		</div>
	)
}

export default Episodes