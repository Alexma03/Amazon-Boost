import type { ChartConfiguration } from 'chart.js';
import { caseChartSeries } from '../data/home-showcase.ts';

export type CaseChartKey = keyof typeof caseChartSeries;
export function createCaseChartConfig(key: CaseChartKey, reducedMotion: boolean): ChartConfiguration<'line'> {
  const series = caseChartSeries[key];
  const euro = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' });
  return {
    type: 'line',
    data: { labels: [...series.labels], datasets: [{ label: series.approximate ? 'Facturación aproximada' : 'Ventas de productos encargados', data: [...series.values], borderColor: '#c66b00', backgroundColor: '#ff9900', borderWidth: 3, pointRadius: 4, pointHoverRadius: 7, pointHitRadius: 24, pointBorderColor: '#fff', pointBorderWidth: 2, tension: series.approximate ? .25 : 0, fill: false }] },
    options: {
      responsive: true, maintainAspectRatio: false,
      animation: reducedMotion ? false : { duration: 700 },
      interaction: { mode: 'nearest', axis: 'x', intersect: false },
      plugins: { legend: { display: false }, tooltip: { displayColors: false, backgroundColor: '#101010', titleColor: '#ffb240', bodyColor: '#fff', padding: 12, callbacks: { label: (context) => `${series.approximate ? 'Aprox. ' : ''}${euro.format(context.parsed.y ?? 0)}` } } },
      scales: {
        x: { grid: { display: false }, border: { display: false }, ticks: { color: '#5f6266', maxRotation: 0, maxTicksLimit: 6, font: { size: 11 } } },
        y: { beginAtZero: true, border: { display: false }, grid: { color: '#ececee' }, ticks: { color: '#5f6266', maxTicksLimit: 6, callback: (value) => euro.format(Number(value)) } },
      },
    },
  };
}
