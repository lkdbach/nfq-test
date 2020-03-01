import React from 'react'
import * as PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledIcon = styled.svg`
  & > g {
    width: ${props => props.width};
    height: ${props => props.height};
  }
  & * {
    &[stroke] {
      stroke: ${props => props.color};
    }
    
    &[fill] {
      fill: ${props => props.color};
    }
    
    &[stroke=none] {
      stroke: none;
    }
    &[fill=none] {
      fill: none;
    }
  }
`

const CreateSvgIcon = ({ color, width, height, children, className, viewBox }) => {
  return (
    <StyledIcon
      className={className}
      color={color}
      height={height}
      viewBox={viewBox}
      width={width}
    >
      {children}
    </StyledIcon>
  )
}

CreateSvgIcon.propTypes = {
  children: PropTypes.node,
  color: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  className: PropTypes.string,
  viewBox: PropTypes.string,
}

CreateSvgIcon.defaultProps = {
  children: null,
  color: '#222222',
  width: '24px',
  height: '24px',
  className: '',
  viewBox: '0 0 24 24',
}

export default CreateSvgIcon