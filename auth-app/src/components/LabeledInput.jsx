import PropTypes from 'prop-types';

function LabeledInput({  id, label, name, inputType, value, setValue  }) {
  return (
    <div>
    <label
      className="label text-lg"
      htmlFor={id}>{label}</label>
    <input
      id={id}
      type={inputType}
      name={name}
      className="input input-sm input-bordered input-accent w-full"
      value={value}
      onChange={setValue} />
  </div>
  )
}

LabeledInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  inputType: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  setValue: PropTypes.func.isRequired,
}

export default LabeledInput;