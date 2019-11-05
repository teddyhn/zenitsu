import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getLibraryData } from '../../actions';
import Nav from 'react-bootstrap/Nav';

import LibraryEntry from './LibraryEntry/LibraryEntry';
import './Library.scss';

function Library({ getLibraryData, libraryData, isLoading }) {
    const [contentTypeFilter, setContentTypeFilter] = useState('anime');

    useEffect(() => {
        getLibraryData(contentTypeFilter);
    }, [contentTypeFilter, getLibraryData]);

    return (
        <div className="library-view bg-light col-xl-6 col-lg-8 col-10 rounded mt-5 mx-auto p-4">
            <Nav variant="tabs" defaultActiveKey="anime">
                <Nav.Item>
                    {isLoading ? (
                        <Nav.Link disabled eventKey="anime" onClick={() => setContentTypeFilter('anime')}>Anime</Nav.Link>
                    ) : <Nav.Link eventKey="anime" onClick={() => setContentTypeFilter('anime')}>Anime</Nav.Link>}
                </Nav.Item>
                <Nav.Item>
                    {isLoading ? (
                        <Nav.Link disabled eventKey="manga" onClick={() => setContentTypeFilter('manga')}>Manga</Nav.Link>
                    ): <Nav.Link eventKey="manga" onClick={() => setContentTypeFilter('manga')}>Manga</Nav.Link>}  
                </Nav.Item>
            </Nav>
            <div className="library-cards mt-3">
                {libraryData.map(entry => {
                    return (
                        <LibraryEntry 
                            key={entry.id} 
                            progress={entry.progress} 
                            contentUrl={entry.relationships.media.links.related} 
                        />
                    )
                })}
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        isLoading: state.isLoading,
        libraryData: state.libraryData
    };
  };
  
export default connect(
    mapStateToProps,
    { getLibraryData }
)(Library);
