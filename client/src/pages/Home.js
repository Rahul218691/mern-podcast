import React,{useContext,useRef,useEffect} from 'react'
import LeftCard from '../components/LeftCard';
import RightCard from '../components/RightCard';
import {Context} from '../context';

const Home = () => {

	const {state} = useContext(Context);
	const audioRef = useRef();

	useEffect(()=>{
		if(state.playerdata && state.playerstatus){
			audioRef.current.play();
		}
	},[state.playerdata,state.playerstatus]);

	useEffect(()=>{
		if(!state.playerstatus){
			audioRef.current.pause()
		}
	},[state.playerstatus])

	return (
		<div className="container mt-4">
			<div className="main_container">
				<div className="row no-gutters">
					<div className="col-md-8">
						<div className="left_card">
							<LeftCard />
						</div>
					</div>
					<div className="col-md-4">
						<div className="right_card">
							<RightCard />
						</div>
					</div>
				</div>
				<div>
					<div className="left_panel_footer footer">
						<audio ref={audioRef} controls src={state.playerdata} controlsList="nodownload" preload="metadata"></audio>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Home