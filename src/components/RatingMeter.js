import React, { useEffect } from 'react'

import { useRef } from 'react'

import styled from 'styled-components'

const Rating = styled.div`
font-family: 'Lato', sans-serif;
font-size: 12px;
top: 9px;
left: 7px;
`;

const RatingMeter = styled.div`
background: #081C22;
border-radius: 100%;
overflow: hidden;
top: -19px;
`;

export default ({ rating }) => {
  const normalizedRating = rating / 10;
  const displayedRating = `${(normalizedRating * 100).toFixed(0)}%`;

  const canvas = useRef(null);

  function mounted() {
    const cvs = canvas.current;

    if (cvs && cvs.getContext) {
      const ctx = cvs.getContext('2d');

      drawInnerCircle(cvs, ctx);
      drawRating(cvs, ctx);
    }
  }

  function lerpHsl(t, hue0, hue1, s = 1, l = 1) {
    var hue = (t * (hue1 - hue0)) + hue0;

    return `hsl(${hue}, ${(s * 100).toFixed(0)}%, ${(l * 100).toFixed(0)}%)`
  }

  function greenToRed(t, s = 1, l = 1) {
    return lerpHsl(t, 0, 120, s, l);
  }

  function drawInnerCircle(cvs, ctx) {
    const lineWidth = 2;
    const R = (cvs.width / 2) - lineWidth - 1;
    const cx = cvs.width / 2;
    const cy = cvs.width / 2;

    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = greenToRed(normalizedRating, 1, 0.25);
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, 2 * Math.PI);
    ctx.stroke();
  }

  function drawRating(cvs, ctx) {
    const lineWidth = 3;
    const C = 2 * Math.PI;
    const start = (3/4) * C;
    const end = start + normalizedRating * C;
    const R = (cvs.width / 2) - lineWidth;
    const cx = cvs.width / 2;
    const cy = cvs.width / 2;

    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = greenToRed(normalizedRating, 1, 0.4);
    ctx.beginPath();
    ctx.arc(cx, cy, R, start, end);
    ctx.stroke();
  }

  useEffect(() => {
    mounted();
  }, []);

  return (
    <RatingMeter className="rating-meter position-absolute">
      <Rating className="rating text-white position-absolute">
        {displayedRating}
      </Rating>
      <canvas className="d-block" width="36" height="36"ref={canvas}/>
    </RatingMeter>
  )
}