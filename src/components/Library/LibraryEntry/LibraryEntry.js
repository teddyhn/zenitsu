import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Kitsu from 'kitsu';

import './LibraryEntry.scss';
import { reject } from 'bluebird';

function LibraryEntry(props) {
    const [content, setContent] = useState([]);
    const api = new Kitsu();

    console.log(props.contentIds);

    const getContent = (contents) => {
        const promises = contents.map(content => new Promise(resolve => {
            api.get(`${content.type}/${content.id}`)
                .then(res => resolve(res.data))
                .catch(err => reject(err))
        }));
    
        Promise.all(promises).then(results => {
            setContent(results);
        });
    };

    useEffect(() => {
        getContent(props.contentIds);
    }, [props.contentIds]);

    console.log(content);

    return (
        <div className="library-cards mt-3">
           {content.map(item => {
               return (
                    <Card key={item.id}>
                        <Card.Img src={item.posterImage.tiny} />
                        <Card.Body>
                            <Card.Text>{item.canonicalTitle}</Card.Text>
                        </Card.Body>
                    </Card>
               )
           })}
        </div>
    )
}

export default LibraryEntry;