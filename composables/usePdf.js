// composables/usePdf.js
import { PDFDocument, rgb } from 'pdf-lib'

export const generateReportPDF = async (report) => {
  const pdfDoc = await PDFDocument.create()
  // Jika ingin font custom, bisa gunakan embedFont, tapi tanpa registerFontkit
  // const fontUrl = 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff'
  // const fontBytes = await fetch(fontUrl).then(res => res.arrayBuffer())
  // const customFont = await pdfDoc.embedFont(fontBytes)
  // Untuk default font:
  const customFont = pdfDoc.getFont('Helvetica')

  // Tambah halaman
  const page = pdfDoc.addPage([600, 800])
  const { height } = page.getSize()

  let y = height - 60

  // Fungsi helper tulis teks
  const write = (text, size = 12, color = rgb(0, 0, 0), bold = false) => {
    page.drawText(text, {
      x: 50,
      y: y,
      size,
      font: customFont,
      color,
      fontWeight: bold ? 'bold' : 'normal'
    })
    y -= size + 8
  }

  // Header
  write('LAPORAN KINERJA TIM', 20, rgb(0, 0.3, 0.6), true)
  write(`Tim: ${report.tim}`, 14, rgb(0.1, 0.1, 0.1))
  write(`Periode: ${report.period}`, 12, rgb(0.3, 0.3, 0.3))
  y -= 20

  // Garis pemisah
  page.drawLine({
    start: { x: 50, y: y },
    end: { x: 550, y: y },
    thickness: 1,
    color: rgb(0.7, 0.7, 0.7)
  })
  y -= 30

  // Ringkasan
  write('Ringkasan Kinerja', 16, rgb(0, 0, 0), true)
  write(`Total Tugas: ${report.totalTasks}`)
  write(`Selesai: ${report.completed}`)
  write(`Dalam Proses: ${report.inProgress}`)
  write(`Terlambat: ${report.late}`)
  y -= 20

  // Tren Mingguan
  write('Tren Progres Mingguan', 14, rgb(0, 0, 0), true)
  if (report.weeklyData) {
    report.weeklyData.forEach(d => {
      write(`${d.day}: ${d.value}%`)
    })
  }
  y -= 20

  // Daftar Tugas
  write('Daftar Tugas', 14, rgb(0, 0, 0), true)
  if (report.tasks && report.tasks.length > 0) {
    report.tasks.forEach(task => {
      const status = task.status === 'completed' ? '✅' : 
                     task.status === 'in-progress' ? '🟡' : '🔴'
      write(`${status} ${task.task} (${task.nama})`)
    })
  } else {
    write('Tidak ada tugas dalam periode ini.')
  }

  // Footer
  y -= 30
  page.drawText('Manajemen Kinerja © 2025', {
    x: 50,
    y: 50,
    size: 10,
    font: customFont,
    color: rgb(0.5, 0.5, 0.5)
  })

  // Generate PDF
  const pdfBytes = await pdfDoc.save()

  // Download
  const blob = new Blob([pdfBytes], { type: 'application/pdf' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `Laporan_Tim_${report.tim}_${report.period}.pdf`
  a.click()
  URL.revokeObjectURL(url)
}