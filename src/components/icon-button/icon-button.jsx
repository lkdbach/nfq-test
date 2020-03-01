import React, { memo } from 'react';
import * as PropTypes from 'prop-types';
import './style.css';

const IconButton = ({ iconName, size }) => {
  return (
    <div className="icon-btn">
    </div>
  );
};

IconButton.defaultProps = {
  size: 'sm'
};

IconButton.propTypes = {
  iconName: PropTypes.object.isRequired,
  size: PropTypes.string
};

export default memo(IconButton);
