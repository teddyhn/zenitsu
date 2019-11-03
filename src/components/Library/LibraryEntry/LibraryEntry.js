import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Kitsu from 'kitsu';

import './LibraryEntry.scss';

function LibraryEntry(props) {
    const [content, setContent] = useState([]);

    const api = new Kitsu();

    const mapContent = () => {
        console.log(props.contentIds);

        props.contentIds.map(contentId => {
            api.get(`${props.contentFilter}/${contentId.id}`)
                .then(res => {
                    setContent([]);
                    setContent(content => [ ...content,
                        {
                            title: res.data.canonicalTitle,
                            image: res.data.posterImage.tiny
                        }
                    ])
                })
                .catch(err => {
                    console.log(err);
                })
        })
    }

    useEffect(() => {
        setContent([]);
        mapContent();
    }, [props.contentIds])

    console.log(content);

    return (
        <>
            {content.map(item => {
                return (
                    <Card style={{ width: '18rem' }}>
                        <Card.Img src={item.image} />
                        <Card.Body>
                            <Card.Title>{item.title}</Card.Title>
                        </Card.Body>
                    </Card>
                )
            })}
        </>
    )
}

export default LibraryEntry;