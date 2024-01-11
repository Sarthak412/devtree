import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function RadioTogglers({ options, defaultValue, onChange }) {
  return (
    <div className="radio-togglers shadow">
      {options.map((option) => (
        <label key={option.value}>
          <input
            type="radio"
            name="bgType"
            onClick={(e) => onChange(e.target.value)}
            defaultChecked={defaultValue === option.value}
            value={option.value}
          />
          <div>
            <FontAwesomeIcon icon={option.icon} className="h-5" />
            <span>{option.label}</span>
          </div>
        </label>
      ))}
    </div>
  );
}
