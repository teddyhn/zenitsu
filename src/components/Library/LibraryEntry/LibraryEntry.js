import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Kitsu from 'kitsu';
import LibraryProgressBar from '../LibraryProgressBar/LibraryProgressBar';

import './LibraryEntry.scss';
import { reject } from 'bluebird';

function LibraryEntry(props) {
    const [content, setContent] = useState([]);

    const api = new Kitsu();

    // Promises allow requests to be completed asynchronously, avoiding duplicate requests
    const getContent = (contentIds) => {
        const promises = contentIds.map(content => new Promise(resolve => {
            api.get(`${content.type}/${content.id}`)
                .then(res => resolve(res.data))
                .catch(err => reject(err))
        }));
    
        Promise.all(promises).then(results => {
            console.log(results);
            setContent(results);
        });
    };

    useEffect(() => {
        getContent(props.contentIds);
    }, [props.contentIds]);

    // Write getProgress function that will return current episode/chapter count for each content

    return (
        <div className="library-cards mt-3">
           {content.map(item => {
               return (
                    <Card key={item.id}>
                        <Card.Img src={item.posterImage.tiny} />
                        <LibraryProgressBar contentFilter={props.contentFilter} mediaId={item.id} episodeCount={item.episodeCount} />
                    </Card>
               )
           })}
        </div>
    )
}

export default LibraryEntry;