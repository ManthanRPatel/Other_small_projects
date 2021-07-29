import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTimeout } from '@fuse/hooks';
// import { ProgressBarProvider as ProgressBar } from 'react-redux-progress';
import { ProgressBarProvider } from 'react-redux-progress';

function ProgressLoader(props) {
    const { progressDisplay } = useSelector(({ fuse }) => fuse.loader.linearProgressDisplay);
    const [isActive, setActive] = useState(false);
    const [stopTimer, setStopTimer] = useState(true);

    useEffect(() => {
        if (progressDisplay && !isActive) {
            setActive(true);
            setStopTimer(false);
        } else if (!progressDisplay && isActive) {
            setActive(false);
            setStopTimer(true);
        }
        else {
            setActive(false);
            setStopTimer(true);
        }
    }, [progressDisplay]);
    // useTimeout(() => setActive(false), isActive ? 10000 : null);
    useTimeout(() => {
        setStopTimer(false);
        setActive(true);
        setActive(false);
    }, (!isActive && stopTimer) ? 500 : null);

    return (
        <React.Fragment>
            <ProgressBarProvider isActive={isActive} />
        </React.Fragment>
    );
}

export default React.memo(ProgressLoader);