import React from 'react';
export type ChartHatchProps = {
    id: string;
};
/** A reusable SVG paint pattern; bounds and reference meaning belong to the chart. */
const ChartHatch = ({ id }: ChartHatchProps) => <pattern id={id} width="4" height="4" patternUnits="userSpaceOnUse"><path d="M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2" stroke="color-mix(in srgb,var(--main-active-color) 65%,var(--white))" strokeWidth="1" strokeOpacity="0.35"/></pattern>;
export default ChartHatch;
