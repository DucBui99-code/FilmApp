import { Typography } from '@material-tailwind/react';
import React from 'react';
import { Link } from 'react-router-dom';

const CareSlider = () => {
  const topics = [
    {
      title: 'Hành động',
      color: {
        to: '#E90000',
        from: '#FAA6FF',
      },
      router: '/hanh-dong',
    },
    {
      title: 'Bí Ẩn',
      color: {
        from: '#EF88BB',
        to: '#291850',
      },
      router: '/bi-an',
    },
    {
      title: 'Kinh dị',
      color: {
        from: '#E21C34',
        to: '#500B28',
      },
      router: '/kinh-di',
    },
    {
      title: 'Gia đình',
      color: {
        from: '#CCFFAA',
        to: '#1E5B53',
      },
      router: '/gia-dinh',
    },
    {
      title: 'Hài hước',
      color: {
        from: '#FFE998',
        to: '#57370D',
      },
      router: '/hai-huoc',
    },
    {
      title: 'Viến tưởng',
      color: {
        to: '#353A5F',
        from: '#9EBAF3',
      },
      router: '/vien-tuong',
    },
  ];

  return (
    <div className="w-full px-4 py-8">
      <Typography as={'h1'} className="text-white text-2xl font-bold mb-3">
        Bạn đang quan tâm đến chủ đề nào?
      </Typography>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
        {topics.map((topic, index) => (
          <div
            key={index}
            className="rounded-lg p-6 text-white transition hover:shadow-lg hover:-translate-y-1 cursor-pointer"
            style={{
              background: `linear-gradient(to left, ${topic.color.from}, ${topic.color.to})`,
            }}
          >
            <h3 className="text-lg font-extrabold">{topic.title}</h3>
            <Link
              to={`chu-de${topic.router}`}
              className="inline-block mt-2 text-sm hover:underline"
            >
              Xem chủ đề &gt;
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CareSlider;
