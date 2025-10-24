'use client';

export default function DownloadReport() {
  const generate = async () => {
    const node = document.getElementById('report');
    if (!node) return;

    // ✅ Import dynamically (browser only)
    const html2pdf = (await import('html2pdf.js')).default;
    html2pdf().from(node).save('VoltYaan_Report.pdf');
  };

  return (
    <button
      onClick={generate}
      className="bg-emerald-600 text-white px-4 py-2 rounded"
    >
      Download Report
    </button>
  );
}
