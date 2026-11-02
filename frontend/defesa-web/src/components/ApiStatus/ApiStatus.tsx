import React from 'react';
import './ApiStatus.css';

const ApiStatus: React.FC = () => {
  return (
    <div className="api-status" title="Status da API">
      <span className="api-status-dot" aria-hidden="true" />
      <span className="api-status-label">API ONLINE</span>
    </div>
  );
};

export default ApiStatus;
