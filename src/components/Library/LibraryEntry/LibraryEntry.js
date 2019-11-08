import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
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

    return (
        <>
        {contentInfo && props.contentView === 'grid' ? (
                <div className="card-wrapper">
                    <Card>
                        <Card.Img src={contentInfo.posterImage.small} alt="Poster" />
                        {(() => {
                            switch (props.status) {
                                case "current":     return <ProgressBar now={(props.progress / contentInfo.episodeCount) * 100} />;
                                case "planned":     return <ProgressBar variant="info" now={(props.progress / contentInfo.episodeCount) * 100} />
                                case "completed":   return <ProgressBar variant="success" now={(props.progress / contentInfo.episodeCount) * 100} />
                                case "on_hold":     return <ProgressBar variant="warning" now={(props.progress / contentInfo.episodeCount) * 100} />
                                case "dropped":     return <ProgressBar variant="danger" now={(props.progress / contentInfo.episodeCount) * 100} />
                                default:            return <ProgressBar now={(props.progress / contentInfo.episodeCount) * 100} />
                            }
                        })()}
                        {contentInfo.type === 'anime' ? (
                            <Card.Text>{props.progress === 0 ? <>Not Started</> : <>Ep. {props.progress} of {contentInfo.episodeCount}</>}</Card.Text>
                        ) : <Card.Text>Ch. {props.progress}</Card.Text>}
                    </Card>
                </div>
        ) 
        : null}
        {contentInfo && props.contentView === 'list' ? (
            <tr>
                <td className="align-middle">
                    <div className="list-poster rounded"><img src={contentInfo.posterImage.tiny} alt="Poster" /></div>
                    <p className="list-title-center">{contentInfo.canonicalTitle}</p>
                </td>
                {contentInfo.type === 'anime' ? (
                    <td className="align-middle">{props.progress} / {contentInfo.episodeCount}</td>
                ) : <td className="align-middle">{props.progress} / —</td>}
                <td className="align-middle">{props.status === 'on_hold' ? 'on hold' : props.status}</td>
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