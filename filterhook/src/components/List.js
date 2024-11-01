import React from "react";

const List = ({ words }) => {

    return (
        <div style={{ whiteSpace: 'pre' }}>
            {words.join('\n')}
        </div>
    )
}
export default List;