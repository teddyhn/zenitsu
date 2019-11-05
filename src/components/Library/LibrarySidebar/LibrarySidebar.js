import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setLibraryContentView } from '../../../actions';
import { Grid, Server } from 'react-feather';
import Nav from 'react-bootstrap/Nav'

import './LibrarySidebar.scss'

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