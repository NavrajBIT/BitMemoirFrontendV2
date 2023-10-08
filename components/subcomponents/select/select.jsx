import style from "./select.module.css";

const Select = ({ title, options, submit }) => {
  return (
    <div className={style.selectcontainer}>
      <select onChange={(e) => submit(e.target.value)}>
        <option>{title}</option>
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
