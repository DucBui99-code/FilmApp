import zalo from '../assets/zalo.png';
import atmCard from '../assets/AtmCard.png';
import momo from '../assets/momo.png';
import bank from '../assets/bank.png';

const ImageDescription = ({ img }) => {
  return (
    <div className="flex items-center justify-center">
      <img src={img} alt="" className="w-[30px]" />
    </div>
  );
};

const TYPE_LOGIN = {
  byGoogle: 'byGoogle',
  byPass: 'byPass',
};
const MOVIE_TYPE = {
  movieRent: 'movieRent',
  movieFree: 'movieFree',
};
const MIN_LENGTH_PASSWORD = 3;
const MAX_LENGTH_PASSWORD = 15;
const LIST_PAYMENT_METHOD = [
  {
    _id: 'ZaloPay',
    name: 'Zalo Pay',
    icon: <ImageDescription img={zalo} />,
  },
  {
    _id: 'Bank',
    name: 'Bank',
    icon: <ImageDescription img={bank} />,
  },
  {
    _id: 'ATMCard',
    name: 'ATM Card',
    icon: <ImageDescription img={atmCard} />,
  },
  {
    _id: 'MoMo',
    name: 'Ví MoMo',
    icon: <ImageDescription img={momo} />,
  },
];
const LINK_AVATAR_DEFAULT =
  'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y';

export {
  TYPE_LOGIN,
  MOVIE_TYPE,
  MIN_LENGTH_PASSWORD,
  MAX_LENGTH_PASSWORD,
  LIST_PAYMENT_METHOD,
  LINK_AVATAR_DEFAULT,
};
