// libs/metrics-service.js
import { Trend, Counter } from 'k6/metrics';

export default class MetricsService {
  constructor(prefix = '') {
    this.prefix = prefix ? `${prefix}_` : '';
    this.trends = {};
    this.counters = {};
  }

  getTrend(name) {
    const metricName = `${this.prefix}${name}`;
    if (!this.trends[name]) {
      this.trends[name] = new Trend(metricName);
    }
    return this.trends[name];
  }

  getCounter(name) {
    const metricName = `${this.prefix}${name}`;
    if (!this.counters[name]) {
      this.counters[name] = new Counter(metricName);
    }
    return this.counters[name];
  }

  recordTrend(name, value) {
    const trend = this.getTrend(name);
    trend.add(value);
  }

  recordDuration(name, startTime) {
    const duration = Date.now() - startTime;
    this.recordTrend(name, duration);
    return duration;
  }

  increment(name, value = 1) {
    const counter = this.getCounter(name);
    counter.add(value);
  }
}