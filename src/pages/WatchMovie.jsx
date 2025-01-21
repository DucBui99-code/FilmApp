import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import getMoviesServices from "../services/getMovies";
import { Typography } from "@material-tailwind/react";

function WatchMovie() {
  const { name } = useParams();

  const [data, setData] = useState({ movie: {}, episodes: [] });

  useEffect(() => {
    if (name) {
      getMoviesServices
        .getMovieBySlug({ slug: name })
        .then((res) => setData(res))
        .catch((err) => console.log(err));
    }
  }, []);

  console.log(data);

  return (
    <div>
      <div></div>
      <div className="relative">
        <iframe
          src="https://vip.opstream16.com/share/7362b26d78069dd38f4b45743fddc7ee"
          width="100%"
          height="500"
          frameborder="0"
          allow="autoplay; fullscreen"
        ></iframe>
        <Typography className="absolute top-0 right-2" color="white" as={"h2"}>
          Helô
        </Typography>
      </div>
    </div>
  );
}

export default WatchMovie;
