import React from 'react';
import Select from 'react-select';

const PlayerDropdown = (props) => {
  return (
    <form>
      <Select
        aria-labelledby="playerdropdown-label"
        inputId="player-input"
        name="player-dropdown"
        options={props.profiles}
        onChange={props.handler}
        ref={props.innerRef}
      />
    </form>
  );
}

export default PlayerDropdown;