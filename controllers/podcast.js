const axios = require('axios');
const {parseString} = require('xml2js');

const topPodcast = async(req,res) =>{
	try {
		const {country} = req.params;
		const url = `https://itunes.apple.com/search?term=news&country=${country}&media=podcast`;
		const {data} = await axios({
			url,
			method:'get',
			options:{
				headers:{
					Accept:'application/json'
				}
			}
		});
		const {results} = data;
		const podcasts = results.map(podcast => {
			return{
				name:podcast.artistName,
				trackName:podcast.trackName,
				image:podcast.artworkUrl600,
				genres:podcast.genres,
				feed:podcast.feedUrl
			}
		});
		res.json(podcasts);
	} catch(err) {
		return res.status(500).json({msg:err.message});
	}
}


const podcastSearch = async(req,res) =>{
	try {
		const {country} = req.params;
		const search = req.body.search.toLowerCase().trim();
		if(!search) return res.status(400).json({msg:'Provide search term'});
		const url = `https://itunes.apple.com/search?term=${search}&country=${country}&media=podcast`;
		const {data} = await axios({
			url,
			method:'post',
			options:{
				headers:{
					Accept:'application/json'
				}
			}
		});
		const {results} = data;
		const podcasts = results.map(podcast => {
			return{
				name:podcast.artistName,
				trackName:podcast.trackName,
				image:podcast.artworkUrl600,
				genres:podcast.genres,
				feed:podcast.feedUrl
			}
		});
		res.json(podcasts);		
	} catch(err) {
		return res.status(500).json({msg:err.message});
	}
}


const getPlayerurl = async(req,res) =>{
	try {
		const {url} = req.body;
		if(url === undefined) return res.status(400).json({msg:'Audio not found'})
		const {data} = await axios({
			url,
			method:'GET'
		});
		parseString(data,(err,json) =>{
			if(err) return res.status(400).json({msg:'Failed to parse xml'});
			const {rss} = json;
			const {channel} = rss;
			const payload = channel[0];
			res.json(payload)
		})
	} catch(err) {
		return res.status(500).json({msg:err.message});
	}
}

module.exports = {
	topPodcast,
	podcastSearch,
	getPlayerurl
}