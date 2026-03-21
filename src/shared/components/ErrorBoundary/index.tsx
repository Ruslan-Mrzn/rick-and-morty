import { Component, type ReactNode } from 'react';

import { Link } from 'react-router';

import styles from './ErrorBoundary.module.scss';

type TErrorBoundaryProps = {
  children: ReactNode;
};

type TErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
};

class ErrorBoundary extends Component<
  TErrorBoundaryProps,
  TErrorBoundaryState
> {
  constructor(props: TErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  static getDerivedStateFromError(error: Error): TErrorBoundaryState {
    return { hasError: true, error };
  }

  handleGoHomePage = (): void => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.container}>
          <div className={styles.content}>
            <h1 className={styles.title}>Oops! Something went wrong</h1>

            <div className={styles.errorContainer}>
              <p className={styles.message}>
                An unexpected error has occurred. Our team has been notified.
              </p>
            </div>

            <Link
              to='/'
              className={styles.button}
              onClick={this.handleGoHomePage}
            >
              Go to Homepage
            </Link>

            <p className={styles.helpText}>
              If the problem persists, please contact support
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
