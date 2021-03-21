/* eslint-disable no-use-before-define */
import React, { useState } from 'react';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CustomBackdrop from '../../common/Backdrop';

export default function FixedTags({ title, value, setValue }) {
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [search, setSearch] = useState('');

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      setLoading(true);
      // searching when enter key is pressed
      fetch(`${process.env.REACT_APP_SERVER_URL}/references/search?input=${search}`, {
        method: 'GET',
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            setOptions(data.data);
            setLoading(false);
          }
        });
    }
  };

  const onSearchChange = (e) => {
    setSearch(e.target.value);
    setOptions([]);
  };

  return (
    <>
      <CustomBackdrop open={loading} />
      <Autocomplete
        multiple
        getOptionSelected={(option, values) => option._id === values._id}
        id={title}
        value={value}
        onChange={(event, newValue) => {
          setValue([...newValue]);
        }}
        options={options}
        noOptionsText="No references found"
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
          <TextField
            {...params}
            value={search}
            onChange={onSearchChange}
            onKeyPress={handleSearch}
            onClick={onSearchChange}
            label={title}
            variant="outlined"
            placeholder="Type the keywords and press enter to find the references"
          />
        )}
      />
    </>
  );
}
