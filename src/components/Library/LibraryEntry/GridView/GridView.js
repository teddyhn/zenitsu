import React from 'react';
import Card from 'react-bootstrap/Card';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Kitsu from 'kitsu';

function GridView({ libraryEntryId, getLibraryData, contentInfo, options, progress, status }) {

    const token = localStorage.getItem('token');

    const api = new Kitsu({
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const handleProgressChange = (evt) => {
        api.patch(`library-entries`, {
            id: libraryEntryId,
            progress: evt.target.value
        })
        .then(() => getLibraryData(contentInfo.type))
        .catch(err => console.log(err));
    }

    const handleStatusChange = (evt) => {
        api.patch(`library-entries`, {
                id: libraryEntryId,
                status: evt.target.value
            })
            .then(() => getLibraryData(contentInfo.type))
            .catch(err => console.log(err));
    }

    // Renders options for Library Progress form dropdown
    const createProgressOptions = (num) => {
        return [...Array(num + 1)].map((e, i) => {
            return i === 0 ? null : <option key={i} value={i}>{i}</option>
        })
    }

    return (
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
                                {contentInfo.type === 'anime' ? (
                                    <FormControl
                                        as="select"
                                        defaultValue={progress}
                                        onChange={evt => handleProgressChange(evt)}
                                    >
                                        {createProgressOptions(contentInfo.episodeCount)}
                                    </FormControl>
                                ) : <FormControl
                                        type="number"
                                        defaultValue={progress}
                                        onChange={evt => handleProgressChange(evt)}
                                    />}
                                <InputGroup.Append size="sm">
                                    {contentInfo.type === 'anime' ? <InputGroup.Text>of {contentInfo.episodeCount}</InputGroup.Text> : <InputGroup.Text>of —</InputGroup.Text>}
                                </InputGroup.Append>
                            </InputGroup>
                        </Popover.Content>
                        <Popover.Content className="popover-status-dropdown">
                            Library Status:
                            <FormControl 
                                as="select" 
                                defaultValue={status} 
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
                    switch (status) {
                        case "current":     return <ProgressBar now={(progress / contentInfo.episodeCount) * 100} />;
                        case "planned":     return <ProgressBar variant="info" now={(progress / contentInfo.episodeCount) * 100} />
                        case "completed":   return <ProgressBar variant="success" now={(progress / contentInfo.episodeCount) * 100} />
                        case "on_hold":     return <ProgressBar variant="warning" now={(progress / contentInfo.episodeCount) * 100} />
                        case "dropped":     return <ProgressBar variant="danger" now={(progress / contentInfo.episodeCount) * 100} />
                        default:            return <ProgressBar now={(progress / contentInfo.episodeCount) * 100} />
                    }
                })()}
                {contentInfo.type === 'anime' ? (
                    <Card.Text>{progress === 0 ? <>Not Started</> : <>Ep. {progress} of {contentInfo.episodeCount}</>}</Card.Text>
                ) : <Card.Text>Ch. {progress}</Card.Text>}
            </Card>
            </OverlayTrigger>
        </div>
    )
}

export default GridView;