import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { setLibraryData } from '../../../actions/';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';

function LibrarySearch({ cached, setLibraryData, contentTypeFilter }) {
    const [query, setQuery] = useState('');
    const [cancel, setCancel] = useState();

    const userId = localStorage.getItem('userId');

    const searchLibraryEntries = (query, contentTypeFilter) => {
        if (query.length === 1) {
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
                console.log(res.data.data);
                setLibraryData(res.data.data);
            })
            .catch(error => {
                if (axios.isCancel(error) || error) {
                    console.log(error);
                }
            });
    }

    const handleInputChange = evt => {
        setQuery(evt.target.value);
        searchLibraryEntries(query, contentTypeFilter);
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
        cached: state.cached
    };
  };
  
export default connect(
    mapStateToProps,
    { setLibraryData }
)(LibrarySearch);