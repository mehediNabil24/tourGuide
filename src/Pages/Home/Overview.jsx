import React from "react";
import YouTube from "react-youtube";
import { Parallax } from "react-parallax";

const Overview = () => {
    const opts = {
        height: "315",
        width: "560",
        playerVars: {
          autoplay: 0,         // Do not autoplay
          modestbranding: 1,   // Hide YouTube logo
          rel: 0,              // Disable related videos (only works for embedded playlists)
          showinfo: 0,         // Hide video title and uploader info (deprecated)
          controls: 0,         // Hide player controls
          disablekb: 1,        // Disable keyboard controls
          fs: 0,               // Disable fullscreen button
          iv_load_policy: 3,   // Hide annotations
          cc_load_policy: 0,   // Disable closed captions
          playsinline: 1,      // Ensures the video plays inline on mobile devices
        },
      };
      

  return (
    <Parallax
      blur={{ min: -5, max: 7 }}
      strength={200}
      bgImage="../../../src/assets/home/rajvinder-singh-S9rlt7gI9HM-unsplash (1).jpg"
      className="relative"
    >
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>

      <div className="flex flex-col justify-center items-center text-center text-white px-4 py-20 relative">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">Explore the Bangladesh with Us</h1>
        <p className="text-lg md:text-xl w-[80%] md:w-[60%] mb-6">
          Discover breathtaking destinations and embark on unforgettable adventures.
        </p>

        <div className="rounded-lg shadow-lg overflow-hidden ">
          <YouTube videoId="rDYdeq3JW_E" opts={opts} />
        </div>
      </div>
    </Parallax>
  );
};

export default Overview;
