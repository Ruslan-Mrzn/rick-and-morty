import { Component, type ReactNode } from 'react';

import ErrorFallback from './ErrorFallback';

type TErrorBoundaryProps = {
  children: ReactNode;
};

type TErrorBoundaryState = {
  hasError: boolean;
};

class ErrorBoundary extends Component<
  TErrorBoundaryProps,
  TErrorBoundaryState
> {
  constructor(props: TErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  static getDerivedStateFromError(): TErrorBoundaryState {
    return { hasError: true };
  }

  handleGoHomePage = (): void => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return <ErrorFallback onReset={this.handleGoHomePage} />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
