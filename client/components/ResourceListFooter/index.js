import React from 'react';

// import './ResourceListFooter.css';
const style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '24px 16px',
  borderTop: '1px solid #dfe4e8' /* sky */
};

export default function ResourceListFooter(props) {
  return <div style={style}>{props.children}</div>;
}