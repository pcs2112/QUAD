import { getWindowWidth, getWindowHeight } from 'javascript-utils/lib/device';

const windowWith = getWindowWidth();
const windowHeight = getWindowHeight();
const mainMenuWidth = 250;

let mainContainerWidth = windowWith - mainMenuWidth;
if (mainContainerWidth < 1150) {
  mainContainerWidth = 1150;
}

const lighterSteelBlue = '#ECF1F3';
const lightSteelBlue = '#84b4D3';
const mediumTurquoise = '#60AACD';
const darkTurquoise = '#0494CB';
const darkCyan = '#046CA4';
const steelBlue = '#5493BC';
const darkSlateBlue = '#345B8C';
const midnightBlue = '#141D55';
const paleGreen = '#9EE0AC';
const green = '#21BA45';
const red = '#ff0000';
const yellow = '#e8bf03';
const rowHighLight = '#DFE9F3';

export const colors = {
  lighterSteelBlue,
  lightSteelBlue,
  mediumTurquoise,
  darkTurquoise,
  darkCyan,
  steelBlue,
  darkSlateBlue,
  midnightBlue,
  paleGreen,
  green,
  red,
  yellow,
  rowHighLight
};

export default {
  mainMenuWith: `${mainMenuWidth}px`,
  mainContainerWidth: `${mainContainerWidth}px`,
  mainTableHeight: `${windowHeight - 220}px`,
  colors
};
