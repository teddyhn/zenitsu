import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getLibraryData } from '../../actions';
import Nav from 'react-bootstrap/Nav';
import Table from 'react-bootstrap/Table';

import LibraryEntry from './LibraryEntry/LibraryEntry';
import LibrarySearch from './LibrarySearch/LibrarySearch';
import LibrarySidebar from './LibrarySidebar/LibrarySidebar';
import './Library.scss';

function Library({ getLibraryData, libraryData, isLoading, contentView, statusFilter }) {
    const [contentTypeFilter, setContentTypeFilter] = useState('anime');

    useEffect(() => {
        getLibraryData(contentTypeFilter);
    }, [contentTypeFilter]);

    console.log(libraryData);

    return (
        <div className="library-view">
            <div className="content-view bg-light col-xl-6 col-lg-8 col-10 rounded shadow p-4">
                <Nav variant="tabs" defaultActiveKey="anime">
                    <Nav.Item>
                        {isLoading ? (
                            <Nav.Link disabled eventKey="anime">Anime</Nav.Link>
                        ) : <Nav.Link eventKey="anime" onClick={() => setContentTypeFilter('anime')}>Anime</Nav.Link>}
                    </Nav.Item>
                    <Nav.Item>
                        {isLoading ? (
                            <Nav.Link disabled eventKey="manga">Manga</Nav.Link>
                        ): <Nav.Link eventKey="manga" onClick={() => setContentTypeFilter('manga')}>Manga</Nav.Link>}  
                    </Nav.Item>
                    <Nav.Item className="library-search">
                        <LibrarySearch libraryData={libraryData} contentTypeFilter={contentTypeFilter} />
                    </Nav.Item>
                </Nav>
                {contentView === 'grid' ? (
                    <div className="library-cards">
                        {statusFilter !== 'all' ? (      
                            libraryData.filter(entry => entry.status === statusFilter).map(entry => {
                                return (
                                    <LibraryEntry 
                                        key={entry.id} 
                                        progress={entry.progress} 
                                        contentUrl={entry.relationships.media.links.related} 
                                    />
                                )
                            })
                        ) : libraryData.map(entry => {
                                return (
                                    <LibraryEntry 
                                        key={entry.id} 
                                        progress={entry.progress} 
                                        contentUrl={entry.relationships.media.links.related} 
                                    />
                                )
                            })
                        }
                    </div>
                ) : <Table striped bordered>
                        <thead>
                            <tr>
                                <th></th>
                                <th width="12%">Progress</th>
                                <th width="14%">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {statusFilter !== 'all' ? (
                                libraryData.filter(entry => entry.status === statusFilter).map(entry => {
                                    return (
                                        <LibraryEntry 
                                            key={entry.id} 
                                            progress={entry.progress}
                                            status={entry.status}
                                            contentUrl={entry.relationships.media.links.related} 
                                        />
                                    )
                                })
                            ) : libraryData.map(entry => {
                                    return (
                                        <LibraryEntry 
                                            key={entry.id} 
                                            progress={entry.progress}
                                            status={entry.status}
                                            contentUrl={entry.relationships.media.links.related} 
                                        />
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                }
            </div>

            <LibrarySidebar contentTypeFilter={contentTypeFilter} />
        </div>
    );
}

const mapStateToProps = state => {
    return {
        isLoading: state.isLoading,
        libraryData: state.libraryData,
        cached: state.cached,
        contentView: state.contentView,
        statusFilter: state.statusFilter
    };
  };
  
export default connect(
    mapStateToProps,
    { getLibraryData }
)(Library);
