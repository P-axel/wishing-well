// == Import : npm
import React from 'react';
import PropTypes from 'prop-types';

import {
  Form,
} from 'react-bootstrap';

// == Import : local

const Field = ({
  value,
  type,
  name,
  placeholder,
  onChange,
}) => {
  const handleChange = (evt) => {
    onChange(evt.target.value, name);
    console.log('evt.target.value:', evt.target.value);
    console.log('name:', name);
  };

  const inputId = `field-${name}`;

  return (

    <Form.Group className="connexion_input">
      <Form.Label
        htmlFor={inputId}
        className="field-label"
      />
      <Form.Control
        value={value}
        onChange={handleChange}
        // infos de base
        id={inputId}
        type={type}
        className="field-input"
        placeholder={placeholder}
        name={name}
      />
      <Form.Text className="text-muted" />
    </Form.Group>
  );
};

// == Export
Field.propTypes = {
  value: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

// Valeurs par défaut pour les props
Field.defaultProps = {
  value: '',
  type: 'text',
};

export default Field;
