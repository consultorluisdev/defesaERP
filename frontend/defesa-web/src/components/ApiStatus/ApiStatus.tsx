import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import './ApiStatus.css';

type ApiHealth = "checking" | "online" | "offline";

type ApiStatusProps = {
  compact?: boolean;
};

const ApiStatus: React.FC<ApiStatusProps> = ({ compact = false }) => {
  const [status, setStatus] = useState<ApiHealth>("checking");

  useEffect(() => {
    let active = true;
    const apiBaseUrl = api.defaults.baseURL ?? "";
    const healthUrl = apiBaseUrl.startsWith("http")
      ? new URL("/health", apiBaseUrl).toString()
      : "/health";

    const checkHealth = async () => {
      try {
        const response = await fetch(healthUrl, { cache: "no-store" });
        if (!response.ok) {
          throw new Error(`Health check failed with status ${response.status}`);
        }
        if (active) setStatus("online");
      } catch {
        if (active) setStatus("offline");
      }
    };

    void checkHealth();
    const interval = window.setInterval(checkHealth, 30_000);
    return () => {
      active = false;
      window.clearInterval(interval);
    };
  }, []);

  const label = status === "online" ? "API ONLINE" : status === "offline" ? "API OFFLINE" : "API VERIFICANDO";

  return (
    <div
      className={`api-status api-status--${status}${compact ? " api-status--compact" : ""}`}
      title={label}
      aria-live="polite"
    >
      <span className="api-status-dot" aria-hidden="true" />
      {!compact && <span className="api-status-label">{label}</span>}
    </div>
  );
};

export default ApiStatus;
