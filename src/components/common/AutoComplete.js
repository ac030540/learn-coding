/* eslint-disable no-use-before-define */
import React from 'react';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function FixedTags({ title, value, setValue, options }) {
  return (
    <Autocomplete
      multiple
      getOptionSelected={(option, values) => option._id === values._id}
      id={title}
      value={value}
      onChange={(event, newValue) => {
        setValue([...newValue]);
      }}
      options={options}
      getOptionLabel={(option) => option.title}
      renderTags={(tagValue, getTagProps) =>
        tagValue.map((option, index) => (
          <Chip
            onClick={() => window.open(option.link, '_blank')}
            label={option.title}
            {...getTagProps({ index })}
          />
        ))
      }
      renderInput={(params) => (
        <TextField {...params} label={title} variant="outlined" placeholder="Start typing" />
      )}
    />
  );
}
