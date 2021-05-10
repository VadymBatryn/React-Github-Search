import React, { useContext, useState } from 'react';
import { AlertContext } from '../context/alert/alertContext';
import { GithubContext } from '../context/github/githubContext';

export const Search = () => {
  const { show, hide } = useContext(AlertContext);

  const [value, setValue] = useState('');

  const github = useContext(GithubContext);

  const onSubmit = (event) => {
    if (event.key !== 'Enter') {
      return;
    }
    if (value.trim()) {
      hide();
      github.search(value.trim());
    } else {
      show('Enter user data');
      github.clearUsers();
    }
  };

  return (
    <div className={'form-group mb-3'}>
      <input
        type="text"
        className={'form-control'}
        placeholder={'Enter user nickname'}
        onKeyPress={onSubmit}
        onChange={(event) => {
          setValue(event.target.value);
        }}
        value={value}
      />
    </div>
  );
};
