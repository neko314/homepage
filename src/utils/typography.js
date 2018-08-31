import Typography from "typography";

const romanFontFamily = [
  "-apple-system",
  "BlinkMacSystemFont",
  "Segoe UI",
  "Roboto",
  "Oxygen",
  "Ubuntu",
  "Cantarell",
  "Fira Sans",
  "Droid Sans",
  "Helvetica Neue",
];
const japaneseFontFamily = [
  "YuGothic",
  "Yu Gothic",
  "Hiragino Kaku Gothic ProN",
  "Meiryo"
];

const typography = new Typography({
  baseFontSize: "16px",
  baseLineHeight: 2,
  headerFontFamily: [...romanFontFamily, ...japaneseFontFamily, "sans-serif"],
  bodyFontFamily: [...romanFontFamily, ...japaneseFontFamily, "sans-serif"],
  overrideStyles: () => ({
    "h1,h2,h3,h4,h5,h6": {
      lineHeight: 1.5,
      fontFeatureSettings: "'palt' 1"
    },
    "@media (min-width: 35rem)": {
      html: {
        fontSize: "18px"
      },
      body: {
        backgroundColor: "#ddd"
      }
    }
  })
});

export default typography;
