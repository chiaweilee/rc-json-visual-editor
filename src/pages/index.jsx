import React, { useState } from 'react';
import Component from '../../dist/index.esm';
import data from './data';

export default () => {
  const [d, setD] = useState(data);
  const onChange = _ => {
    console.warn(_);
    setD(
      Object.assign({}, _, {
        [Math.floor(Math.random() * 1000)]: Math.random(),
      }),
    );
  };

  return (
    <div style={{ padding: '100px' }}>
      <Component data={d} onChange={onChange} />
    </div>
  );
};
