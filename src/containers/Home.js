import React from 'react';
import Products from './Products';
import Filters from './Filters';

function Home() {
  return (
   <div className="container">
     <div className="row">
        <Filters />
        <Products />
     </div>
  </div>
  );
}

export default Home;
