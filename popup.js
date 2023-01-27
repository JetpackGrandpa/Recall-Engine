import fetch from 'node-fetch';
import mongoose from 'mongoose';
import express from 'express';



const postSchema = new mongoose.Schema({
    playlist_title : {
        type: String,
        required: true
    },
    videos_cnt : {
        type: String,
        required: true
    },
    playlist_views : {
        type: String,
        required: true
    },
    vdo_data : {
        type: Array,
        required: true
    }
});




mongoose.set('strictQuery',true);
mongoose.connect("mongodb://127.0.0.1:27017/RecallE",{
    useNewUrlParser : true,
    useUnifiedTopology : true
});




const Post = mongoose.model('Post',postSchema);

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'd54b0880f9msh6f4c5725dfcc6afp1c7806jsnb9785b071048',
		'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com'
	}
};


async function getpID(){
    
    const data = await fetch("https://youtube-search-and-download.p.rapidapi.com/playlist?id=PLpVg7pgd-JzPZwZ-4BzZY9vhHvuTkXgxN", options)
    const res = await data.json();
    console.log(res);

    let vid_arr = new Array();
    let vtit_arr = new Array();
    let vdur_arr = new Array();
    let vthmb_arr = new Array();


    for(let i=0;i<(res.contents.length);i++){
            vid_arr[i] = res.contents[i].video.videoId;
            vtit_arr[i] = res.contents[i].video.title;
            vdur_arr[i] = res.contents[i].video.lengthText;
            vthmb_arr[i] = res.contents[i].video.thumbnails[0].url;
    }

    let temp_arr = new Array();
    let vdo_data_arr = new Array();
    //let emt_arr = [];

    for(let j=0;j<(vid_arr.length);j++){
        temp_arr.push(vid_arr[j]);
        temp_arr.push(vtit_arr[j]);
        temp_arr.push(vdur_arr[j]);
        temp_arr.push(vthmb_arr[j]);
        vdo_data_arr[j]=temp_arr;
        temp_arr = [];
        //console.log("temp_arr " + j + " :" + temp_arr + "\n");
        // console.log("emt_arr " + j + " :" + emt_arr + "\n");
    }

        const post = new Post({
            //con_tents : res.contents,
            playlist_title : res.title,
            videos_cnt : res.videosCount,
            playlist_views : res.views,
            vdo_data : vdo_data_arr
            });
    post.save();
    
}getpID();