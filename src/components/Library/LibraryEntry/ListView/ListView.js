import React from 'react';
import FormControl from 'react-bootstrap/FormControl';

function ListView({ contentInfo, handleStatusChange, progress, status, options }) {
    return (
        <tr>
            <td className="align-middle">
                <div className="list-poster rounded"><img src={contentInfo.posterImage.tiny} alt="Poster" /></div>
                <p className="list-title-center">{contentInfo.canonicalTitle}</p>
            </td>
            <td className="align-middle list-status">
                <FormControl 
                    as="select" 
                    defaultValue={status} 
                    size="sm"
                    onChange={evt => handleStatusChange(evt)}
                >
                    {options}
                </FormControl>
            </td>
            {contentInfo.type === 'anime' ? (
                <td className="align-middle">
                    {progress} / {contentInfo.episodeCount}
                </td>
            ) : <td className="align-middle">{progress} / —</td>}
        </tr>
    )
}

export default ListView;