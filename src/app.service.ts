import { Injectable } from '@nestjs/common';
import { formatDateTime, formatDuration } from './lib/utils/formatter.utils';

@Injectable()
export class AppService {
  private timestamp = (ts: Date = new Date()) => {
    return formatDateTime(ts, 'D MMM YYYY');
  };

  // Welcome Home
  welcomeHome() {
    return {
      key: 'Bearer <YOU_CAN_LIVE_HERE_IF_YOU_HAVE_A_KEY>',
      health: 'Worried if HOME is sanitized? Check "/health" for a vibe check.',
      docs: 'Lost? "/docs" —  read them like your job depends on it (because it does).',
      rules: ['Need a key? Visit "/api/auth/login"'],
      timestamp: this.timestamp(),
    };
  }

  // Health Check
  checkHealth() {
    return {
      alive: formatDuration(process.uptime(), true),
      checks: {
        databases: ['MongoDB', 'PostgreSQL', 'Redis'],
      },
      timestamp: this.timestamp(),
    };
  }

  // Documentation
  documentation() {
    return {
      _: 'Preparing! Will be published soon.',
      timestamp: this.timestamp(),
    };
  }
}
