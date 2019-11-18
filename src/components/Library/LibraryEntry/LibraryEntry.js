import React, { useState, useEffect } from 'react';
import { getLibraryData } from '../../../actions';
import { connect } from 'react-redux';
import Kitsu from 'kitsu';

import GridView from './GridView/GridView';
import ListView from './ListView/ListView';

import './LibraryEntry.scss';

function LibraryEntry(props) {
    const [contentInfo, setContentInfo] = useState();

    const token = localStorage.getItem('token');

    const api = new Kitsu({
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

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

    // Renders options for Library Status form dropdown
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
            <GridView
                libraryEntryId={props.libraryEntryId}
                getLibraryData={props.getLibraryData}
                contentInfo={contentInfo}
                options={options}
                progress={props.progress}
                status={props.status}
            />
        ) 
        : null}
        {contentInfo && props.contentView === 'list' ? (
            <ListView
                contentInfo={contentInfo}
                handleStatusChange={handleStatusChange}
                progress={props.progress}
                status={props.status}
                options={options}
            />
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