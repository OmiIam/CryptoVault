import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Basic health check for the frontend
    return NextResponse.json({
      status: 'healthy',
      message: 'Mock Trading Platform Frontend is running',
      timestamp: new Date().toISOString(),
      service: 'frontend'
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: 'unhealthy',
        message: 'Frontend service unavailable',
        timestamp: new Date().toISOString(),
        service: 'frontend'
      },
      { status: 503 }
    );
  }
}