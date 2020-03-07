import React, { useState } from 'react';
import Component from '../../lib/index';
import data from './data';

export default () => {
  const [d, setD] = useState(data);
  const onChange = _ => {
    console.warn(_);
    setD(
      Object.assign({}, _, {
        a: Math.random(),
      }),
    );
  };

  return (
    <div style={{ padding: '100px' }}>
      <Component data={d} onChange={onChange} />
    </div>
  );
};
