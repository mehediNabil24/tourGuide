import YouTube from '@u-wave/react-youtube';
import React from 'react';

const Overview = () => {
    const opts = {
        // height: "300",
        width: "100%",
        playerVars: {
          autoplay: 1, // Autoplay enabled
        },
    };

    return (
        <div className='flex justify-center h-[200px] md:h-[450px]  '>
            <YouTube video="QNUSIOMb6vI" {...opts}  />
        </div>
    );
};

export default Overview;
