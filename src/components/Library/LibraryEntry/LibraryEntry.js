import React, { useState, useEffect } from 'react';
import { getLibraryData } from '../../../actions';
import { connect } from 'react-redux';
import Card from 'react-bootstrap/Card';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Kitsu from 'kitsu';

import './LibraryEntry.scss';

function LibraryEntry(props) {
    const [contentInfo, setContentInfo] = useState();

    const token = localStorage.getItem('token');

    const api = new Kitsu({
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const handleProgressChange = (evt) => {
        api.patch(`library-entries`, {
            id: props.libraryEntryId,
            progress: evt.target.value
        })
        .then(() => props.getLibraryData(contentInfo.type))
        .catch(err => console.log(err));
    }

    const handleStatusChange = (evt) => {
        api.patch(`library-entries`, {
                id: props.libraryEntryId,
                status: evt.target.value
            })
            .then(() => props.getLibraryData(contentInfo.type))
            .catch(err => console.log(err));
    }

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


    // Renders options for Library Progress form dropdown in popover
    const createProgressOptions = (num) => {
        return [...Array(num + 1)].map((e, i) => {
            return i === 0 ? null : <option value={i}>{i}</option>
        })
    }

    // Renders options for Library Status form dropdown in popover
    var options;
    if (contentInfo && contentInfo.type === 'anime') {
        options = (
            <>
                <option value="current">Currently Watching</option>
                <option value="planned">Want to Watch</option>
                <option value="completed">Completed</option>
                <option value="on_hold">On Hold</option>
                <option value="dropped">Dropped</option>
            </>
        )
    } else options = (
        <>
            <option value="current">Currently Reading</option>
            <option value="planned">Want to Read</option>
            <option value="completed">Completed</option>
            <option value="on_hold">On Hold</option>
            <option value="dropped">Dropped</option>
        </>
    )

    return (
        <>
        {contentInfo && props.contentView === 'grid' ? (
                <div className="card-wrapper">
                    <OverlayTrigger
                        trigger="click"
                        key={contentInfo.id}
                        placement="right"
                        rootClose
                        overlay={
                            <Popover>
                                <Popover.Title as="h3">{contentInfo.canonicalTitle} <span className="title-year">| {contentInfo.startDate.slice(0,4)}</span></Popover.Title>
                                <Popover.Content>
                                    <div className="popover-synopsis-overlay">
                                        <p className="popover-synopsis">{contentInfo.synopsis}</p>
                                    </div>
                                </Popover.Content>
                                <Popover.Content className="popover-progress-dropdown">
                                    Progress:
                                    <InputGroup size="sm">
                                        <FormControl
                                            as="select"
                                            defaultValue={props.progress}
                                            onChange={evt => handleProgressChange(evt)}
                                        >
                                            {createProgressOptions(contentInfo.episodeCount)}
                                        </FormControl>
                                        <InputGroup.Append size="sm">
                                            <InputGroup.Text>of {contentInfo.episodeCount}</InputGroup.Text>
                                        </InputGroup.Append>
                                    </InputGroup>
                                </Popover.Content>
                                <Popover.Content className="popover-status-dropdown">
                                    Library Status:
                                    <FormControl 
                                        as="select" 
                                        defaultValue={props.status} 
                                        size="sm"
                                        onChange={evt => handleStatusChange(evt)}
                                    >
                                        {options}
                                    </FormControl>
                                </Popover.Content>
                            </Popover>
                        }
                    >
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
                    </OverlayTrigger>
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
    { getLibraryData }
)(LibraryEntry);