import style from "./select.module.css";

const Select = ({ title, options, submit }) => {
  return (
    <div className={style.selectcontainer}>
      <label for={"select-" + title} name="Select">
        {title}
      </label>
      <select onChange={(e) => submit(e.target.value)} id={"select-" + title}>
        {options.map((opt, index) => (
          <option value={opt.value} key={"option-" + index}>
            {opt.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
