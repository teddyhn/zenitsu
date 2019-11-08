import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setLibraryContentView, setLibraryStatusFilter } from '../../../actions';
import { Grid, Server } from 'react-feather';
import ListGroup from 'react-bootstrap/ListGroup';

import './LibrarySidebar.scss';

function LibrarySidebar({ setLibraryContentView, setLibraryStatusFilter, statusFilter, contentTypeFilter }) {
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

                {statusFilter === 'all' ? (
                    <ListGroup.Item action>
                        {`All ${contentTypeFilter.charAt(0).toUpperCase() + contentTypeFilter.substring(1)}`}
                    </ListGroup.Item>
                ) : <ListGroup.Item action onClick={() => setLibraryStatusFilter('all')}>
                        {`All ${contentTypeFilter.charAt(0).toUpperCase() + contentTypeFilter.substring(1)}`}
                    </ListGroup.Item>}

                {statusFilter === 'current' ? (
                    <ListGroup.Item action variant="primary">
                        {contentTypeFilter === 'anime' ? (
                            <>Currently Watching</>
                        ) : <>Currently Reading</>}
                    </ListGroup.Item>
                ) : <ListGroup.Item action variant="primary" onClick={() => setLibraryStatusFilter('current')}>
                        {contentTypeFilter === 'anime' ? (
                            <>Currently Watching</>
                        ) : <>Currently Reading</>}
                    </ListGroup.Item>}

                {statusFilter === 'planned' ? (
                    <ListGroup.Item action variant="info">
                        {contentTypeFilter === 'anime' ? (
                            <>Want to Watch</>
                        ) : <>Want to Read</>}
                    </ListGroup.Item>
                ) : <ListGroup.Item action variant="info" onClick={() => setLibraryStatusFilter('planned')}>
                        {contentTypeFilter === 'anime' ? (
                            <>Want to Watch</>
                        ) : <>Want to Read</>}
                    </ListGroup.Item>}

                {statusFilter === 'completed' ? (
                    <ListGroup.Item action variant="success">
                        Completed
                    </ListGroup.Item>
                ) : <ListGroup.Item action variant="success" onClick={() => setLibraryStatusFilter('completed')}>
                        Completed
                    </ListGroup.Item>}

                {statusFilter === 'on_hold' ? (
                    <ListGroup.Item action variant="warning">
                        On Hold
                    </ListGroup.Item>
                ) : <ListGroup.Item action variant="warning" onClick={() => setLibraryStatusFilter('on_hold')}>
                        On Hold
                    </ListGroup.Item>}

                {statusFilter === 'dropped' ? (
                    <ListGroup.Item action variant="danger">
                        Dropped
                    </ListGroup.Item>
                ) : <ListGroup.Item action variant="danger" onClick={() => setLibraryStatusFilter('dropped')}>
                        Dropped
                    </ListGroup.Item>}
                    
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
    { setLibraryContentView, setLibraryStatusFilter }
)(LibrarySidebar);