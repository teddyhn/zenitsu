import React, { useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { setLibraryData } from '../../../actions/';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';

function LibrarySearch({ setLibraryData, contentTypeFilter }) {
    const [query, setQuery] = useState('');
    const [cancel, setCancel] = useState();
    const [cache, setCache] = useState({});

    const userId = localStorage.getItem('userId');

    const searchLibraryEntries = (query, contentTypeFilter) => {
        if (cache[query]) {
            setLibraryData(cache[query]);
            return;
        }

        // Rapidly backspacing input to zero query length will resolve to an API call with query.length === 1, this sets it to no query
        if (query.length < 3) {
            query = '';
        }

        const searchUrl = `https://kitsu.io/api/edge/library-entries?filter[userId]=${userId}&filter[kind]=${contentTypeFilter}&filter[title]=${query}`;

        const createCancelToken = () => axios.CancelToken.source();

        if (cancel) {
            cancel.cancel();
        }
        const cancelToken = createCancelToken();
        setCancel(cancelToken);
        axios.get(searchUrl, {
                cancelToken: cancelToken.token
            })
            .then(res => {
                const entries = res.data.data;
                // Makes search API call consistent with initial fetch of Library data
                entries.map(entry => {
                    return (
                        entry.progress = entry.attributes.progress, 
                        entry.status = entry.attributes.status
                    );
                })
                setCache(cache => ({ ...cache, [query]: entries }));
                setLibraryData(entries);
            })
            .catch(error => {
                if (axios.isCancel(error) || error) {
                    console.log(error);
                }
            });
    }

    const handleInputChange = evt => {
        setQuery(evt.target.value);
        searchLibraryEntries(evt.target.value, contentTypeFilter);
    }

    return (
        <InputGroup>
            <FormControl
                placeholder="Search Library..."
                value={query.value}
                onChange={evt => handleInputChange(evt)}
            />
        </InputGroup>
    )
}


const mapStateToProps = state => {
    return {
        
    };
};
  
export default connect(
    mapStateToProps,
    { setLibraryData }
)(LibrarySearch);