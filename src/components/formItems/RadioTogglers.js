import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function RadioTogglers({ options }) {
  return (
    <div className="radio-togglers shadow">
      {options.map((option) => (
        <label key={option.label}>
          <input type="radio" name="bgType" value={option.value} />
          <div className=" -mt-16 mr-3 rounded-full">
            <FontAwesomeIcon icon={option.icon} className="h-5" />
            {/* <span>{option.label}</span> */}
          </div>
        </label>
      ))}
    </div>
  );
}
