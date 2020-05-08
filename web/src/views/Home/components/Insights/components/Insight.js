import React from 'react';

/** Material UI */
import Typography from '@material-ui/core/Typography';

import './index.css';

export default function Insight({ number, caption }) {
    return (
        <div className="numberCircle">
            <Typography variant="h4" color="primary"><strong>{number}</strong></Typography>
            <div className="dividerCircle" />
            <Typography variant="body1" color="inherit"><strong>{caption}</strong></Typography>
        </div>
    )
}
