'use client';
import { Bar } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import {
  Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend
} from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function EVRegistrationsChart(){
  const [rows,setRows]=useState([]);
  useEffect(()=>{ fetch('/api/evdata').then(r=>r.json()).then(setRows).catch(()=>{}); },[]);
  const labels = rows.map(r=>r.State || r.state).slice(0,10);
  const data = { labels, datasets: [{ label: 'EV Registrations', data: rows.map(r=>Number(r.Registrations||r.registrations||0)).slice(0,10) }] };
  return <Bar data={data} />;
}
