import React from 'react';
import Select from 'react-select';

const PlayerDropdown = (props) => {
  return (
    <form>
      <Select
        aria-labelledby="playerdropdown-label"
        inputId="player-input"
        name="player-dropdown"
        options={[{value: "", label: "Need 1"}].concat(props.profiles)}
        onChange={props.handler}
        ref={props.innerRef}
        defaultValue={props.default}
      />
    </form>
  );
}

export default PlayerDropdown;