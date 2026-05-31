import React from 'react';
import { Giant3D } from './Giant3D';

export const DiscFrame = ({ type, paused }) => (
  <div className="disc-frame">
    <Giant3D className="giant-witness" rotation={{ x: 0.1, y: 0.8 }} z={0.2} center={{ x: 0, y: -0.4, z: 0 }} isTrailer={true} paused={paused} />
    <div className="star-field" />
    <div className="light-disc-container">
      <div className="light-disc" />
      <div className="rainbow-halo" />
    </div>
    {type === "grab" && (
      <div className="giant-grab-container">
        <Giant3D className="reaching-extremity" rotation={{ x: -0.4, y: 0.2 }} z={1.2} center={{ x: -0.4, y: 0.3, z: 0.2 }} isTrailer={true} paused={paused} />
      </div>
    )}
  </div>
);
