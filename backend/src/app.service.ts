import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): Record<string, string> {
    return {
      name: 'ranking-parlamentar-api',
      status: 'ok',
      environment: process.env.NODE_ENV ?? 'development',
    };
  }

  getHealth(): Record<string, unknown> {
    return {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      database: process.env.DATABASE_URL ? 'configured' : 'missing',
    };
  }
}
