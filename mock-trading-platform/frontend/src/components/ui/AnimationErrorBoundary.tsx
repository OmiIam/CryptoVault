'use client';

import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface AnimationErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface AnimationErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

class AnimationErrorBoundary extends React.Component<AnimationErrorBoundaryProps, AnimationErrorBoundaryState> {
  constructor(props: AnimationErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): AnimationErrorBoundaryState {
    console.warn('Animation Error:', error);
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.warn('Animation Error Boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Minimal fallback UI
      return (
        <div className="flex items-center justify-center p-8 text-white/60">
          <AlertTriangle className="h-6 w-6 mr-2" />
          <span className="text-sm">Loading content...</span>
        </div>
      );
    }

    return this.props.children;
  }
}

export default AnimationErrorBoundary;