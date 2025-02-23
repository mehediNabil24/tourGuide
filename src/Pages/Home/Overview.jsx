import YouTube from '@u-wave/react-youtube';
import React from 'react';

const Overview = () => {
    const opts = {
        height: "450",
        width: "100%",
        playerVars: {
          autoplay: 1, // Autoplay enabled
        },
    };

    return (
        <div className='flex justify-center'>
            <YouTube video="QNUSIOMb6vI" {...opts}  />
        </div>
    );
};

export default Overview;
