import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Kitsu from 'kitsu';

import './LibraryEntry.scss';

function LibraryEntry(props) {
    const [contentInfo, setContentInfo] = useState();

    const api = new Kitsu();

    useEffect(() => {
        const getContentInfo = (url) => {
            const promise = new Promise((resolve, reject) => {
                api.get(url.slice(26))
                    .then(res => {
                        resolve(res.data);
                    })
                    .catch(err => reject(err))
            })
    
            Promise.resolve(promise).then(result => {
                setContentInfo(result);
            });
        }
        getContentInfo(props.contentUrl);
    }, [])

    return (
        <>
        {contentInfo ? (
                <div className="card-wrapper">
                    <Card>
                        <Card.Img src={contentInfo.posterImage.small} />
                        {(props.progress / contentInfo.episodeCount === 1) ? (
                            <ProgressBar variant="success" now={(props.progress / contentInfo.episodeCount) * 100} />
                        ): <ProgressBar now={(props.progress / contentInfo.episodeCount) * 100} />}
                        <Card.Text>Ep. {props.progress} of {contentInfo.episodeCount}</Card.Text>
                    </Card>
                </div>
        ) : null}
        </>
    )
}

export default LibraryEntry;