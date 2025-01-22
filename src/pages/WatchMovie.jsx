import React, { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import { useNavigate, useParams } from "react-router";
import getMoviesServices from "../services/getMovies";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import {
  ArrowLeftIcon,
  ClockIcon,
  EyeIcon,
  HeartIcon,
  LanguageIcon,
  ShareIcon,
} from "@heroicons/react/16/solid";

function WatchMovie() {
  const { name } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState({});
  const [episodes, setEpisodes] = useState([]);
  const [currentEpisode, setCurrentEpisode] = useState(0);
  const [showEpisodes, setShowEpisodes] = useState(true);

  useEffect(() => {
    if (name) {
      getMoviesServices
        .getMovieBySlug({ slug: name })
        .then((res) => {
          setData(res.movie);
          setEpisodes(res.episodes);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  const clearContent = (text) => {
    return DOMPurify.sanitize(text, { ALLOWED_TAGS: [] });
  };

  const RenderEpisodes = ({ Episodes, CurrentEpisode }) => {
    const normalizeEpisodes = Episodes?.split(" ")[0];
    console.log(normalizeEpisodes);

    const handelChangeEpisode = (i) => {
      if (i == currentEpisode) {
        return;
      }
      setCurrentEpisode(i);
    };

    if (!normalizeEpisodes || normalizeEpisodes <= 0) {
      return <div className="text-gray-500">No episodes found</div>;
    }

    return (
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: normalizeEpisodes }, (_, index) =>
          index + 1 > CurrentEpisode ? (
            <div
              key={index}
              className="bg-gray-800 rounded-lg px-4 py-1 font-bold text-gray-600 cursor-not-allowed"
            >
              {index + 1 >= 10 ? index + 1 : "0" + (index + 1)}
            </div>
          ) : (
            <div
              key={index}
              className={`bg-gray-800 rounded-lg px-4 py-1 font-bold text-primary cursor-pointer hover:opacity-70 ${
                index == currentEpisode && "border border-primary"
              }`}
              onClick={() => handelChangeEpisode(index)}
            >
              {index + 1 >= 10 ? index + 1 : "0" + (index + 1)}
            </div>
          )
        )}
      </div>
    );
  };

  return (
    <div>
      <div className="flex items-center justify-start gap-2 p-2">
        <IconButton onClick={() => navigate(-1)}>
          <ArrowLeftIcon className="w-6 text-white"></ArrowLeftIcon>
        </IconButton>
        <Typography className="text-white font-bold uppercase">
          {data?.name +
            " - Tập " +
            episodes[0]?.server_data[currentEpisode]?.name}
        </Typography>
      </div>
      <div className="relative">
        <iframe
          src={episodes[0]?.server_data[currentEpisode].link_embed}
          width="100%"
          height="600"
          frameborder="0"
          allow="autoplay; fullscreen"
        ></iframe>
        <Typography className="absolute top-0 right-2" color="white" as={"h2"}>
          Helô
        </Typography>
      </div>
      <div className="mt-4 p-3 flex flex-col items-center justify-between gap-5 lg:flex-row">
        <div className="self-center w-full lg:self-start lg:w-1/4">
          <img
            src={data.poster_url}
            className="w-full h-96 object-cover rounded-sm"
            alt="Poster"
          ></img>
        </div>
        <div className="self-center w-full lg:self-start lg:w-2/4">
          <Typography className="text-white font-bold uppercase text-2xl">
            {data?.name}
          </Typography>
          <div className="flex items-center gap-4 mt-2">
            <IconButton>
              <HeartIcon className="w-6 text-primary "></HeartIcon>
            </IconButton>
            <IconButton>
              <ShareIcon className="w-6 text-primary "></ShareIcon>
            </IconButton>
          </div>
          <div className="flex items-center gap-4 mt-2 text-white">
            <div className="border-[1px] px-2 py-1 rounded-md text-white text-sm">
              {data.quality}
            </div>
            |
            <div className="bg-gray-800 rounded-lg px-2 py-1 text-primary font-bold">
              T13
            </div>
          </div>
          <div className="mt-4 text-white flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <EyeIcon className="w-6"></EyeIcon>
              <Typography as={"small"} className="font-bold">
                {data.view} Views
              </Typography>
            </div>
            <div className="flex items-center gap-2">
              <ClockIcon className="w-5"></ClockIcon>
              <Typography as={"small"} className="font-bold">
                {data.time}
              </Typography>
            </div>
            <div className="flex items-center gap-2">
              <LanguageIcon className="w-5"></LanguageIcon>
              <Typography as={"small"} className="font-bold">
                {data.lang}
              </Typography>
            </div>
          </div>
          <div className="mt-4">
            <Typography className="text-white font-bold">
              {clearContent(data.content)}
            </Typography>
          </div>
        </div>
        <div className="self-center w-full lg:self-start lg:w-1/4 flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <Typography className="text-gray-700 font-bold">
              Đạo diễn:{" "}
            </Typography>
            <Typography className="text-white font-bold">
              {data?.director?.length && data?.director[0]
                ? data.director.join(",")
                : "Not Found Information"}
            </Typography>
          </div>
          <div className="flex items-center gap-4">
            <Typography className="text-gray-700 font-bold">
              Diễn viên:{" "}
            </Typography>
            <Typography className="text-white font-bold">
              {data?.actor?.length && data?.actor[0]
                ? data.actor.join(", ")
                : "Not Found Information"}
            </Typography>
          </div>
          <div className="flex items-center gap-4">
            <Typography className="text-gray-700 font-bold">
              Danh mục:
            </Typography>
            <Typography className="text-white font-bold first-letter:uppercase">
              {data?.type ? data.type : "Not Found Information"}
            </Typography>
          </div>
          <div className="flex items-center gap-4">
            <Typography className="text-gray-700 font-bold">
              Quốc gia:
            </Typography>
            <Typography className="text-white font-bold">
              {data?.country?.length && data?.country[0]
                ? data.country.map((c) => c.name).join(", ")
                : "Not Found Information"}
            </Typography>
          </div>
          <div className="flex items-center gap-4">
            <Typography className="text-gray-700 font-bold">
              Thể loại:
            </Typography>
            <Typography className="text-white font-bold">
              {data?.category && data?.category?.length > 0
                ? data.category.map((c) => c.name).join(", ")
                : "Not Found Information"}
            </Typography>
          </div>
          <div className="flex items-center gap-4">
            <Typography className="text-gray-700 font-bold">
              Năm phát hành:
            </Typography>
            <Typography className="text-white font-bold">
              {data?.year ? data.year : "Not Found Information"}
            </Typography>
          </div>
        </div>
      </div>
      <div className="mt-4 p-3 text-white">
        <Accordion open={showEpisodes}>
          <AccordionHeader onClick={() => setShowEpisodes(!showEpisodes)}>
            <div className="flex items-center gap-4">
              <Typography className="text-white text-2xl">
                Danh sách tập
              </Typography>
              |
              <Typography className="text-white text-2xl">
                {data.episode_total?.split(" ")[0] + " Tập"}
              </Typography>
              |
              <div
                className={`bg-gray-800 rounded-lg px-2 py-1 font-bold first-letter:uppercase ${
                  data.status == "ongoing" ? "text-yellow-500" : "text-primary"
                } first-letter:uppercas`}
              >
                {data.status}
              </div>
            </div>
          </AccordionHeader>
          <AccordionBody>
            <div>
              <RenderEpisodes
                Episodes={data.episode_total}
                CurrentEpisode={data?.episode_current?.split(" ")[1]}
              ></RenderEpisodes>
            </div>
          </AccordionBody>
        </Accordion>
      </div>
    </div>
  );
}

export default WatchMovie;
