import React,{useContext} from 'react'
import {Context} from '../context';
import Episodes from './Episodes';
import {searchPodcast} from '../api';
import Loading from './Loading';

const LeftCard = () => {

	const {state,dispatch} = useContext(Context)

	const handleSearch = async(search) =>{
		if(!search) return;
		const data = await searchPodcast(search,dispatch,state.country);
		if(data){
			dispatch({
				type:'SEARCH_PODCAST',
				payload:data
			})			
		}
	}

	return (
		<div className="left_panel">
			<div className="left_panel_header">
				{
					!state.selectedPodcast || !state.title ?
						(
						<h5 className="text-center">Listen to your favourite podcasts</h5>
						) : null
				}
				{
					state.title && (
						<h5 className="text-center"><b>Playing:</b> {state.title}</h5>	
					)
				}
			</div>
			<hr />
			<div className="left_panel_body text-center">
				{
					state.selectedPodcast === null && (
							<>
							<img className="img-fluid" 
								src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Podcasts_%28iOS%29.svg/1024px-Podcasts_%28iOS%29.svg.png"
								alt="" style={{width:'100px'}}
								/>
								<h5>Choose a podcast to play</h5>
							</>
						)
				}
				{
					state.selectedPodcast !==null &&(
							<>
								<img className="img-fluid"
								src={state.selectedPodcast.image}
								alt=""
								style={{width:'100px',borderRadius:'15%',objectFit:'cover'}}/>
								<h5>{state.selectedPodcast.name}</h5>
								<h5><b>Track: </b>{state.selectedPodcast.trackName}</h5>
								<p>Genres</p>
								<div className="genres">
									{
										state.selectedPodcast.genres.map((genre,i) =>(
												<span key={i} className="badge badge-primary" onClick={()=>handleSearch(genre)}>{genre}</span>
											))
									}
								</div>
							</>
						)
				}
			</div>
			{
				state.loading && (
						<Loading />
					)
			}
			{
				state.episodes && state.episodes.length > 0 && (
					<div className="episodes_panel mt-1">
							{
								state.episodes && state.episodes.map((episode,i) =>(
										<Episodes key={i} data={episode} img={state.selectedPodcast.image}/>
									))	
							}
					</div>
					)
			}
		</div>
	)
}

export default LeftCard
