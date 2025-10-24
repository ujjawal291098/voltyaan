'use client';
import html2pdf from 'html2pdf.js';
export default function DownloadReport(){
  const generate = ()=>{
    const node = document.getElementById('report');
    if(!node) return;
    html2pdf().from(node).save('VoltYaan_Report.pdf');
  };
  return <button onClick={generate} className="bg-emerald-600 text-white px-4 py-2 rounded">Download Report</button>;
}
