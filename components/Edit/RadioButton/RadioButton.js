import styles from "./RadioButton.module.css";

const RadioButton = ({
  title,
  options,
  handleOptionChange,
  selectedOption,
}) => {
  return (
    <div className={styles.main}>
      <h4 className={styles.left}>{title}</h4>
      <div className={styles.right}>
        {options.map((option) => (
          <label key={option.value} className={styles.label}>
            <input
              type="radio"
              key={option.value}
              name={title}
              className={styles.label_input}
              value={option.value}
              checked={selectedOption === option.value}
              onChange={(e) => handleOptionChange(e.target.value)}
            />
            {option.label}
          </label>
        ))}
      </div>
    </div>
  );
};

export default RadioButton;
