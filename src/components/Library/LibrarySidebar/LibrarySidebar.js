import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setLibraryContentView, getFilteredLibraryEntries, getLibraryData } from '../../../actions';
import { Grid, Server } from 'react-feather';
import ListGroup from 'react-bootstrap/ListGroup';

import './LibrarySidebar.scss';

function LibrarySidebar({ setLibraryContentView, statusFilter, contentTypeFilter, getFilteredLibraryEntries, getLibraryData }) {
    const [activeView, setActiveView] = useState('grid');

    return (
        <div className="library-sidebar bg-light col-xl-2 p-4 rounded shadow">
            <div className="view-toggle-icons text-right">
                {activeView === 'grid' ? (
                    <Grid className="active grid-view mr-1" onClick={() => setLibraryContentView('grid')} />
                ) : <Grid
                        className="grid-view mr-1" 
                        onClick={() => {
                            setLibraryContentView('grid');
                            setActiveView('grid');
                        }} 
                    />}
                {activeView === 'list' ? (
                    <Server className="active list-view" height={22} onClick={() => setLibraryContentView('list')} />
                ) : <Server
                        className="list-view" 
                        height={22} 
                        onClick={() => {
                            setLibraryContentView('list');
                            setActiveView('list');
                        }}
                    />}
            </div>
            <hr />
            <ListGroup>

                <ListGroup.Item action onClick={() => getLibraryData(contentTypeFilter)}>
                    {`All ${contentTypeFilter.charAt(0).toUpperCase() + contentTypeFilter.substring(1)}`}
                </ListGroup.Item>

                <ListGroup.Item action variant="primary" onClick={() => getFilteredLibraryEntries(contentTypeFilter, 'current')}>
                    {contentTypeFilter === 'anime' ? (
                        <>Currently Watching</>
                    ) : <>Currently Reading</>}
                </ListGroup.Item>

                <ListGroup.Item action variant="info" onClick={() => getFilteredLibraryEntries(contentTypeFilter, 'planned')}>
                    {contentTypeFilter === 'anime' ? (
                        <>Want to Watch</>
                    ) : <>Want to Read</>}
                </ListGroup.Item>

                <ListGroup.Item action variant="success" onClick={() => getFilteredLibraryEntries(contentTypeFilter, 'completed')}>
                    Completed
                </ListGroup.Item>

                <ListGroup.Item action variant="warning" onClick={() => getFilteredLibraryEntries(contentTypeFilter, 'on_hold')}>
                    On Hold
                </ListGroup.Item>

                <ListGroup.Item action variant="danger" onClick={() => getFilteredLibraryEntries(contentTypeFilter, 'dropped')}>
                     Dropped
                </ListGroup.Item>
                    
            </ListGroup>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        statusFilter: state.statusFilter
    };
};
  
export default connect(
    mapStateToProps,
    { setLibraryContentView, getFilteredLibraryEntries, getLibraryData }
)(LibrarySidebar);