import React from 'react';
import { Link } from 'react-router';

const ListMenu = ['Miễn phí', 'Phim Gói', 'Truyền Hình'];

function Navigation() {
  return (
    <div className="flex items-center justify-center gap-5">
      <div className="flex items-center justify-between gap-6">
        {ListMenu.map((el) => (
          <Link to={`/${el}`}>{el}</Link>
        ))}
      </div>
    </div>
  );
}

export default Navigation;
