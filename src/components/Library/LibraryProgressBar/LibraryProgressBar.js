import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Kitsu from 'kitsu';
import ProgressBar from 'react-bootstrap/ProgressBar';

import { reject } from 'bluebird';

function LibraryProgressBar(props) {
    const [progress, setProgress] = useState();

    const api = new Kitsu();

    const userId = localStorage.getItem('userId');

    const getProgress = async id => {
        if (props.contentFilter === 'anime') {
            await api.get(`library-entries`, {
                filter: {
                    userId : userId,
                    animeId : id
                }
            })
            .then(res => {
                setProgress(res.data[0].progress);
            })
            .catch(err => reject(err))
        }

        if (props.contentFilter === 'manga') {
            await api.get(`library-entries`, {
                filter: {
                    userId : userId,
                    mangaId : id
                }
            })
            .then(res => {
                setProgress(res.data[0].progress);
            })
            .catch(err => reject(err))
        }
    }

    useEffect(() => {
        getProgress(props.mediaId);
    }, [props.mediaId])

    return (
        <>
            <ProgressBar now={(progress / props.episodeCount) * 100} />
            {props.episodeCount ? (
                <Card.Text><b>{`Ep. ${progress} of ${props.episodeCount}`}</b></Card.Text>
            ): <Card.Text><b>{`Ch. ${progress}`}</b></Card.Text>}
        </>
    )
}

export default LibraryProgressBar;