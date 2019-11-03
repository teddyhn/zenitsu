import React, { useEffect, useState } from 'react';
import axiosWithAuth from '../../utils/axiosWithAuth';
import Kitsu from 'kitsu';
import Nav from 'react-bootstrap/Nav';

import LibraryEntry from './LibraryEntry/LibraryEntry';
import './Library.scss';

function Library() {
    const [contentIds, setContentIds] = useState([]);
    const [contentFilter, setContentFilter] = useState('anime');

    const api = new Kitsu();

    const userId = localStorage.getItem('userId');

    const fetchContentIds = async (contentFilter) => {
      await api.get(`users/${userId}/library-entries`, {
            filter: {
                kind: contentFilter
            }
        })
        .then(res => {
            setContentIds([]);
            const libraryEntries = res.data;
            const urls = libraryEntries.map(entry => {
                return entry.relationships.media.links.self;
            });
            urls.map(url => {
                return axiosWithAuth().get(url)
                    .then(res => {
                        setContentIds(contentIds => [ ...contentIds, { id: res.data.data.id, type: res.data.data.type } ])
                    })
                    .catch(err => console.log(err));
            })
        })
        .catch(err => console.log(err));
    }

    useEffect(() => {
        fetchContentIds(contentFilter);
    }, [contentFilter])

    return (
        <div className="library-view bg-light col-xl-8 col-11 rounded mt-4 mx-auto p-4">
            <Nav variant="tabs" defaultActiveKey="anime">
                <Nav.Item>
                    <Nav.Link eventKey="anime" onClick={() => setContentFilter('anime')}>Anime</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="manga" onClick={() => setContentFilter('manga')}>Manga</Nav.Link>
                </Nav.Item>
            </Nav>
            <LibraryEntry contentFilter={contentFilter} contentIds={contentIds} />
        </div>
    );
}

export default Library;
