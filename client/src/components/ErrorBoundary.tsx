import React, { Component, ReactNode } from "react";
import { Box, Typography, Button } from "@mui/material";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error boundary component to catch and handle React errors gracefully
 */
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      return (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="100vh"
          padding="2rem"
          textAlign="center"
        >
          <Typography variant="h4" color="error" gutterBottom>
            Oops! Something went wrong
          </Typography>
          <Typography variant="body1" color="textSecondary" mb={3}>
            We apologize for the inconvenience. Please try refreshing the page.
          </Typography>
          {process.env.NODE_ENV === "development" && this.state.error && (
            <Typography
              variant="caption"
              component="pre"
              sx={{
                background: "#f5f5f5",
                padding: "1rem",
                borderRadius: "4px",
                maxWidth: "600px",
                overflow: "auto",
                marginBottom: "1rem",
              }}
            >
              {this.state.error.toString()}
            </Typography>
          )}
          <Button variant="contained" color="primary" onClick={this.handleReset}>
            Go to Dashboard
          </Button>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
