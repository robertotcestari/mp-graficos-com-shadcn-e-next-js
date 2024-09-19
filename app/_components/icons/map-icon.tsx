import { SVGProps } from 'react';

const MapIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={24}
    height={24}
    {...props}
  >
    <g clipPath="url(#a)">
      <path d="M22.393 4.127A.666.666 0 0 0 21.8 4l-6.407 2-6.42-3.26a.667.667 0 0 0-.56 0L1.747 5.467a.667.667 0 0 0-.414.62V19.74a.666.666 0 0 0 .92.613l6.414-2.633L15.06 21c.095.049.2.074.307.073.066.01.133.01.2 0l6.666-2.08a.666.666 0 0 0 .467-.666V4.667a.667.667 0 0 0-.307-.54Zm-1.06 13.706-5.546 1.734V18.04H14.72v1.333L9.12 16.5v-1.127H8.053v1.147l-5.386 2.22V6.527l5.386-2.22v1.566H9.12v-1.56l5.6 2.867v1.4h1.067V7.333l5.546-1.76v12.26Z" />
      <path d="M14.72 10.04h1.067v2.54H14.72v-2.54ZM14.72 14.04h1.067v2.54H14.72v-2.54ZM8.053 7.373H9.12v2.54H8.053v-2.54ZM8.053 11.42H9.12v2.5H8.053v-2.5Z" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default MapIcon;
