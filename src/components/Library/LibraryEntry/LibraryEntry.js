import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { setLibraryContentView } from '../../../actions';
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
    }, [props.contentUrl])

    console.log(contentInfo);

    return (
        <>
        {contentInfo && props.contentView === 'grid' ? (
                <div className="card-wrapper">
                    <Card>
                        <Card.Img src={contentInfo.posterImage.small} />
                        {(props.progress / contentInfo.episodeCount === 1) ? (
                            <ProgressBar variant="success" now={(props.progress / contentInfo.episodeCount) * 100} />
                        ) : <ProgressBar now={(props.progress / contentInfo.episodeCount) * 100} />}
                        {contentInfo.type === 'anime' ? (
                            <Card.Text><b>Ep. {props.progress} of {contentInfo.episodeCount}</b></Card.Text>
                        ) : <Card.Text><b>Ch. {props.progress}</b></Card.Text>}
                    </Card>
                </div>
        ) 
        : null}
        {contentInfo && props.contentView === 'list' ? (
            <tr>
                <td className="align-middle">
                    <div className="list-poster rounded"><img src={contentInfo.posterImage.tiny} /></div>
                    <p className="list-title-center">{contentInfo.canonicalTitle}</p>
                </td>
                {contentInfo.type === 'anime' ? (
                    <td className="align-middle">{props.progress} / {contentInfo.episodeCount}</td>
                ) : <td className="align-middle">{props.progress} / —</td>}
                <td className="align-middle">{props.status}</td>
            </tr>
        ) : null}
        </>
    )
}

const mapStateToProps = state => {
    return {
        contentView: state.contentView
    };
  };
  
export default connect(
    mapStateToProps,
    { }
)(LibraryEntry);