import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setLibraryContentView } from '../../../actions';
import { Grid, Server } from 'react-feather';
import ListGroup from 'react-bootstrap/ListGroup';

import './LibrarySidebar.scss';

function LibrarySidebar({ setLibraryContentView }) {
    const [activeView, setActiveView] = useState('grid')

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
                <ListGroup.Item className="list-all">
                    All
                </ListGroup.Item>
                <ListGroup.Item className="list-current">
                    Currently Watching
                </ListGroup.Item>
                <ListGroup.Item className="list-want">
                    Want to Watch
                </ListGroup.Item>
                <ListGroup.Item className="list-completed">
                    Completed
                </ListGroup.Item>
                <ListGroup.Item className="list-hold">
                    On Hold
                </ListGroup.Item>
                <ListGroup.Item className="list-dropped">
                    Dropped
                </ListGroup.Item>
            </ListGroup>
        </div>
    )
}

const mapStateToProps = state => {
    return {
    };
};
  
export default connect(
    mapStateToProps,
    { setLibraryContentView }
)(LibrarySidebar);