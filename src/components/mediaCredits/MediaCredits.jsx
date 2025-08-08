import { useState, useEffect } from "react";
import "./mediaCredits.css";
import Card from "../card/Card";
import SlidingCards from "../slidingCards/SlidingCards";

function MediaCredits({media_type,id}) {
  const [media, setMedia] = useState(null);
  // `https://first-backend-eight.vercel.app/media_credits/${media_type}/${id}`

 useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(
          `https://first-backend-eight.vercel.app/media_credits/${media_type}/${id}`
        );
        let data = await response.json();

        setMedia(data);
  console.log("media -> ",data.cast[0]);

      } catch (e) {
        console.log("error while fetching movie details", e);
      }

    };
    fetchDetails();
  }, [id, media_type]);

  // console.log("media -> ",media);

  return (
    <>
      {/* <SlidingCards media_type={"movie"} id={id}/> */}
      <div className="credits-slider">
        <h1>MediaCredits</h1>
        {
         media && <SlidingCards media_type={"credits"} credits={media.cast} />
        }
      </div>
    </>
      

  );
}

export default MediaCredits;
