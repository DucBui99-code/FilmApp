import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Typography,
} from '@material-tailwind/react';
import React, { useState } from 'react';

function EpisodesMovie({ data, currentEpisode, setCurrentEpisode }) {
  const [showEpisodes, setShowEpisodes] = useState(true);

  const RenderEpisodes = ({ Episodes, CurrentEpisode }) => {
    const normalizeEpisodes = Episodes?.split(' ')[0];

    const handelChangeEpisode = (i) => {
      if (i === currentEpisode) {
        return;
      }
      setCurrentEpisode(i);
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
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
              {index + 1 >= 10 ? index + 1 : '0' + (index + 1)}
            </div>
          ) : (
            <div
              key={index}
              className={`bg-gray-800 rounded-lg px-4 py-1 font-bold text-primary cursor-pointer hover:opacity-70 ${
                index === currentEpisode && 'border border-primary'
              }`}
              onClick={() => handelChangeEpisode(index)}
            >
              {index + 1 >= 10 ? index + 1 : '0' + (index + 1)}
            </div>
          )
        )}
      </div>
    );
  };
  return (
    <div className="mt-4 p-3 text-white">
      <Accordion open={showEpisodes}>
        <AccordionHeader onClick={() => setShowEpisodes(!showEpisodes)}>
          <div className="flex items-center gap-4">
            <Typography className="text-white text-2xl font-bold">
              Danh sách tập
            </Typography>
            |
            <Typography className="text-white text-2xl font-bold">
              {data.episode_total?.split(' ')[0] + ' Tập'}
            </Typography>
            |
            <div
              className={`bg-gray-800 rounded-lg px-2 py-1 font-bold first-letter:uppercase ${
                data.status === 'ongoing' ? 'text-yellow-500' : 'text-primary'
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
              CurrentEpisode={data?.episode_current?.split(' ')[1]}
            ></RenderEpisodes>
          </div>
        </AccordionBody>
      </Accordion>
    </div>
  );
}

export default EpisodesMovie;
