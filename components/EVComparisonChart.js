'use client';
import { Line } from 'react-chartjs-2';
import evModels from '../data/evModels.json';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend
} from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function EVComparisonChart(){
  const data = {
    labels: evModels.map(e=>e.name),
    datasets: [
      { label: 'Resale %', data: evModels.map(e=>e.resale), tension:0.3 },
      { label: 'Battery %', data: evModels.map(e=>e.battery), tension:0.3 }
    ]
  };
  return <Line data={data} />;
}
