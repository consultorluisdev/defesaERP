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

  const apiLabel =
    status === "online"
      ? "API ONLINE · C# .NET"
      : status === "offline"
        ? "API OFFLINE · C# .NET"
        : "API VERIFICANDO · C# .NET";
  const agentLabel = "API PENDENTE - RUST";

  return (
    <div className={`api-status-stack${compact ? " api-status-stack--compact" : ""}`}>
      <div
        className={`api-status api-status--${status}${compact ? " api-status--compact" : ""}`}
        title={apiLabel}
        aria-live="polite"
      >
        <span className="api-status-dot" aria-hidden="true" />
        {!compact && <span className="api-status-label">{apiLabel}</span>}
      </div>
      <div
        className={`agent-status${compact ? " agent-status--compact" : ""}`}
        title={agentLabel}
      >
        <span className="agent-status-dot" aria-hidden="true" />
        {!compact && <span className="agent-status-label">{agentLabel}</span>}
      </div>
    </div>
  );
};

export default ApiStatus;
