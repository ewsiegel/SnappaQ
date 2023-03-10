import React from 'react';
import Select from 'react-select';

import "./Dropdown.css";

const PlayerDropdown = (props) => {
  return (
    <form>
      <Select
        className="Dropdown-container"
        aria-labelledby="playerdropdown-label"
        inputId="player-input"
        name="player-dropdown"
        options={[{value: "", label: "Need 1"}].concat(props.profiles)}
        onChange={props.handler}
        ref={(element) => props.innerRef.current[props.index] = element}
        defaultValue={props.default}
      />
    </form>
  );
}

export default PlayerDropdown;