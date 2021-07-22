import React,{useState,useContext,useEffect} from 'react'
import {Link} from 'react-router-dom';
import {countries} from '../countries';
import {Context} from '../context';

const Navbar = () => {

	const objArr = Object.entries(countries);

	const {dispatch} = useContext(Context);

	const [country,setCountry] = useState('in');

	useEffect(()=>{
		dispatch({
			type:"COUNTRY",
			payload:country
		})
	},[country,dispatch]);

	return (
		<nav className="navbar navbar-light bg-light d-flex">
		  <Link className="navbar-brand d-flex" to="#">
		    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Podcasts_%28iOS%29.svg/1024px-Podcasts_%28iOS%29.svg.png" width="30" height="30" alt="" />
		   	<span style={{marginLeft:'5px'}}>Podcast</span>
		  </Link>
		  <select className="form-control" style={{width:'35%'}}
		  value={country}
		  onChange={(e)=>setCountry(e.target.value)}>
		  	{
				objArr.map(([key,value],i) =>(
					<option value={key.trim()} key={i}>{value.trim()}</option>
				))
		  	}
		  </select>
		</nav>
	)
}

export default Navbar;