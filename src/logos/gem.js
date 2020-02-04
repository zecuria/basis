import React from "react";
import PropTypes from "prop-types";
import useTheme from "../hooks/useTheme";
import useBackground from "../hooks/useBackground";
import useResponsivePropsCSS from "../hooks/useResponsivePropsCSS";
import { responsiveHeightType } from "../hooks/useResponsiveProp";
import { responsiveHeight } from "../utils/css";
import { mergeProps } from "../utils/component";

const COLORS = ["primary.blue.t100", "black", "white"];

const DEFAULT_PROPS = {
  color: "primary.blue.t100",
  height: "7"
};

function GemLogo(props) {
  const theme = useTheme();
  const { background } = useBackground();
  const inheritedColor =
    background === "primary.blue.t100" ? "white" : "primary.blue.t100";
  const inheritedProps = {
    color: inheritedColor
  };
  const mergedProps = mergeProps(props, DEFAULT_PROPS, inheritedProps, {
    color: color => COLORS.includes(color)
  });
  const { color, testId } = mergedProps;
  const responsivePropsCSS = useResponsivePropsCSS(mergedProps, DEFAULT_PROPS, {
    height: responsiveHeight
  });

  return (
    <svg
      css={{
        display: "flex",
        ...responsivePropsCSS
      }}
      viewBox="0 0 548.23 233.65"
      focusable="false"
      role="img"
      aria-label="Gem by Latitude logo"
      data-testid={testId}
    >
      <path
        d="M139.08 21.05C122.68 7.17 104 .14 83.31.14c-22.88 0-42.68 8.2-58.87 24.36S0 60.47 0 83.45s8.22 42.71 24.43 58.92 36 24.4 58.88 24.4c19.82 0 37.35-6.13 52.22-18.25a62.79 62.79 0 01-13.3 19.15C111 178.9 97.88 184.36 82.1 184.36S53 178.9 41.8 167.68c-1.39-1.4-7-7.88-7-7.88L9 169s9.3 12.92 14 17.53c16.3 16.11 36.16 24.33 59.12 24.33s42.65-8.19 58.82-24.34c15.17-15.2 23.87-37.36 23.87-60.8V12.47h-25.73zM83.33 140.69a57.1 57.1 0 1157.1-57.1 57.09 57.09 0 01-57.1 57.1zm433-104.32a18.42 18.42 0 016.18 13.8v112.66h25.71V51.94c0-12.76-3.86-23.27-13.16-33.11S511.69 4.26 498.5 4.26c-12.49 0-29.36 4.28-38.85 13.8 0 0-.44.42-1.1 1.12-.34-.36-.67-.71-1-1.05-8.57-8.69-22-13.87-35.9-13.87-11.29 0-26.16 3.5-36 11.24-6.37-8.52-13.8-9-18.21-9a24.59 24.59 0 00-17.2 6.63c-10.33 9.82-17.65 18.75-24.93 52l-.07.37c-5.54 33.53-25.74 56.61-27.08 58.11-11.89 11.13-25.06 16.54-40.26 16.54-13.16 0-24.13-3.34-32.66-9.94l98.5-98.48-6.74-7.38C298.67 6 277.51 0 257.92 0 235 0 215.19 8.22 199 24.43s-24.43 36-24.43 58.89 8.22 42.83 24.43 59.05 36 24.4 58.9 24.4c24.08 0 44-8.27 59.17-24.57 24.68-26.45 32.29-67.1 33.54-74.87v-.18c2.37-12.52 8.58-29.88 14.17-29.88 1.08 0 4.45.16 4.06 9.35v116.21h25.55V52.31a21.39 21.39 0 016.41-16c3.88-3.81 13.89-6.37 20.8-6.37 5.71 0 13.43 2 17.85 6.38 3.9 3.81 6.18 8.12 6.18 13.22v113.29h25.7V51.51a21.25 21.25 0 016.36-15.16c3.88-3.81 13.89-6.35 20.81-6.35 11.35 0 17.84 6.37 17.84 6.37zM201.08 83.32c0-15.87 5.46-29 16.68-40.22a55.17 55.17 0 0140.16-16.61c11.28 0 20.67 2.29 28 6.81l-78 78c-4.55-7.3-6.84-16.72-6.84-27.98zm46.35 144.59l-.5 1.13a8 8 0 01-2.21 3.27 6.14 6.14 0 01-3.78 1.34 7.34 7.34 0 01-4.4-1.35l1.3-3a4.17 4.17 0 003 1.17 2.88 2.88 0 001.84-.62 5 5 0 001.3-2l.26-.6-7.47-17.25h3.46l5.77 13.23 5.76-13.23h3.45zm-26-12.75a6.32 6.32 0 00-4.75-10.5H205v22.15h13a6.32 6.32 0 003.4-11.65zm-13.23-7.33h8.48a3.17 3.17 0 010 6.33h-8.48zm9.8 15.82h-9.83v-6.33H218a3.17 3.17 0 010 6.33zm69.28-22.72h-3.7v25.88h18.79v-3.69H287.3zm260.93 3.7v-3.7h-18.76v25.88h18.78v-3.69h-15.08v-7.4h13V212h-13v-7.4zm-157.14 22.18h3.7v-25.88h-3.7zm20.36-22.18h8.85v22.18H424v-22.18h8.85v-3.7h-21.4zm-58.43 0h8.86v22.18h3.69v-22.18h8.86v-3.7H353zm-22-3.7l11.76 25.88h-3.88l-3.24-7.39h-13l-3.24 7.39h-3.8l11.71-25.88zm3 14.79l-4.87-11.09-4.86 11.09zm179.23-1.85c0 8.31-6.1 12.94-13.63 12.94H489v-25.88h10.65c7.5 0 13.6 4.63 13.6 12.94zm-3.75 0c0-5.93-4.49-9.24-10.14-9.24h-6.69v18.49h6.69c5.66 0 10.16-3.31 10.16-9.25zm-41.94 1.23c0 4.66-1.86 8.34-7.25 8.34s-7.24-3.68-7.24-8.34v-14.17h-3.7v14.72c0 5 2 11.46 10.94 11.46s10.95-6.48 10.95-11.46v-14.72h-3.7z"
        fill={theme.getColor(color)}
      />
    </svg>
  );
}

GemLogo.propTypes = {
  color: PropTypes.oneOf(COLORS),
  ...responsiveHeightType,
  testId: PropTypes.string
};

export default GemLogo;
