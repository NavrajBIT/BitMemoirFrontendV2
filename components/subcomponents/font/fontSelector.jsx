import style from "./font.module.css";

const FontSelector = ({ value, onChange }) => {
  const font_lib = [
    "Crimson",
    "Lato",
    "Montserrat",
    "Open_Sans",
    "Playfair_Display",
    "PT_Sans",
    "Quicksand",
    "Roboto",
    "Source_Sans_3",
  ];

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={style.fontContainer}
      style={{}}
    >
      {font_lib.map((font, index) => (
        <option
          value={font_lib[font]}
          key={font + "-" + index}
          style={{ fontFamily: font + "-normal" }}
        >
          {font}
        </option>
      ))}
    </select>
  );
};

export default FontSelector;
