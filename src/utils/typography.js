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
    "@media (min-width: 35rem)": {
      html: {
        fontSize: "18px"
      },
      body: {
        backgroundColor: "#eee"
      }
    }
  })
});

export default typography;
