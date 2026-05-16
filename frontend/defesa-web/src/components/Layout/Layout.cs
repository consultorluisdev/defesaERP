.app-layout {
  display: flex;
  min-height: 100vh;
  background: var(--bg-primary);
}

.main-wrapper {
  flex: 1;
  margin-left: 260px;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.page-content {
  padding: 24px;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .main-wrapper {
    margin-left: 0;
  }
}