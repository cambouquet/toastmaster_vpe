export class HealthService {
  static check(state, logs) {
    const report = {
      status: 'OPERATIONAL',
      hooks: {
        useSystemLogs: typeof logs !== 'undefined',
        clearLogsAvailable: typeof logs?.length !== 'undefined'
      },
      state: { screen: state?.currentScreen, members: state?.members?.length },
      timestamp: new Date().toISOString()
    };
    window._lastHealthReport = report;
    console.log(`[SYS] DIAG_COMPLETE: ${report.status}`);
    return report;
  }
}
