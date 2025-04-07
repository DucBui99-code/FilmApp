import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from '@material-tailwind/react';
import React from 'react';
import Comment from './Comment';
import {
  ChatBubbleBottomCenterIcon,
  StarIcon,
} from '@heroicons/react/16/solid';
import Rate from './Rate';

function CommentMovie(props) {
  const data = [
    {
      label: 'Đánh Giá',
      value: 'rate',
      icon: StarIcon,
      element: <Rate props={props}></Rate>,
    },
    {
      label: 'Bình Luận ',
      value: 'comment',
      icon: ChatBubbleBottomCenterIcon,
      element: <Comment props={props}></Comment>,
    },
  ];
  const [activeTab, setActiveTab] = React.useState('rate');
  return (
    <div className="p-3">
      <Tabs value="rate">
        <TabsHeader
          className="rounded-none bg-transparent p-0 w-1/3"
          indicatorProps={{
            className:
              'bg-transparent border-b-2 border-primary shadow-none rounded-none',
          }}
        >
          {data.map(({ label, value, icon }) => (
            <Tab key={value} value={value}>
              <div
                onClick={() => setActiveTab(value)}
                className={`text-white flex items-center gap-2`}
              >
                {React.createElement(icon, { className: 'w-5 h-5' })}
                <p className="hidden md:block">{label}</p>
              </div>
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody>
          {data.map(({ value, element }) => (
            <TabPanel key={value} value={value}>
              {element}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </div>
  );
}

export default CommentMovie;
