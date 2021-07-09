import React, {useState, useEffect} from 'react';
import aws from 'aws-sdk';
import dotenv from 'dotenv'
import $ from 'jquery';

dotenv.config();

const Test = () => {
    
    const[datas, setDatas] = useState([]);
    // const fetchApi = ()=> fetch("https://api-football-v1.p.rapidapi.com/v3/timezone", {
    //     "method": "GET",
    //     "headers": {
    //         "x-rapidapi-key": "ee0519fb21msh7df9d1bd34bf2b5p1ed797jsna7ed75b2d782",
    //         "x-rapidapi-host": "api-football-v1.p.rapidapi.com"
    //     }
    // })
    // .then(res => res.json())
    // .then(data =>setDatas(data['response']))
    // // .finally(res => console.log(res))
    // .catch(err =>console.error(err));
    // useEffect(()=>fetchApi(), []);
    aws.config.update({
        accessKeyId: 'AKIA5DQUSKJTV3BHBD46',
        secretAccessKey: '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',
        region: 'ca-central-1'
    });

    const albumBucketName = "mshenoudabucket";
    // Show the photos that exist in an album.
    var s3 = new aws.S3({
        apiVersion: '2006-03-01',
        params: {
            Bucket: albumBucketName
        }
        }   
    );

    function viewAlbum(albumName) {
        const albumPhotosKey = encodeURIComponent(albumName) + '/';
        s3.listObjects({Prefix: albumPhotosKey}, function(err, data) {
        if (err) {
            return alert('There was an error viewing your album: ' + err.message);
        }
        // 'this' references the AWS.Request instance that represents the response
        const href = this.request.httpRequest.endpoint.href;
        const bucketUrl = href + albumBucketName +'/';
        const photoUrls = data.Contents.map(photo => bucketUrl + photo['Key']);
        console.log(photoUrls);
        setDatas(photoUrls);
        });
    }   
        
    useEffect(()=>{viewAlbum('Company')}, []);
    // console.log(viewAlbum('Company'));

    return (
        <>
            <h1>Start of the code here</h1>
            <img src="https://mshenoudabucket.s3.ca-central-1.amazonaws.com/Company/redlen.png" alt="page"/>
            <div>
                {datas.map(photo => photo.includes('.png') && <img key={photo} src={photo} width='50px' height='50px' />)}
            </div>
        </>
    );
}
export default Test;


