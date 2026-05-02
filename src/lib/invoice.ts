import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

export const generateInvoicePDF = (order: any) => {
  console.log('Generating Invoice for order:', order)
  try {
    const doc = new jsPDF()
    const pageWidth = doc.internal.pageSize.width

    // Header - Logo Placeholder & Company Info
    doc.setFillColor(41, 31, 31)
    doc.rect(0, 0, pageWidth, 40, 'F')

    doc.setTextColor(255, 255, 255)
    doc.setFontSize(28)
    doc.setFont('helvetica', 'bold')
    doc.text('CODEEDEX', 14, 25)
    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.text('ECOMMERCE SOLUTIONS', 14, 32)
    
    doc.setFontSize(20)
    doc.text('INVOICE', pageWidth - 14, 25, { align: 'right' })
    doc.setFontSize(10)
    doc.text(`DATE: ${new Date().toLocaleDateString()}`, pageWidth - 14, 32, { align: 'right' })

    // Seller Details (from the first item's vendor)
    const firstItem = order.items[0]
    const vendor = firstItem?.variant?.product?.vendor || firstItem?.product?.vendor
    
    doc.setTextColor(0, 0, 0)
    doc.setFontSize(10)
    doc.setFont('helvetica', 'bold')
    doc.text('SOLD BY (SELLER):', 14, 50)
    doc.setFont('helvetica', 'normal')
    doc.text(vendor?.BusinessName || vendor?.name || 'CODEEDEX ECOMMERCE PVT LTD', 14, 55)
    doc.text(vendor?.BusinessAddress || '123, Tech Park, Silicon Valley, Bangalore', 14, 60)
    doc.text(`GSTIN: ${vendor?.GSTNumber || '29AAAAA0000A1Z5'}`, 14, 65)
    doc.text('Email: support@codeedex.com', 14, 70)


    // Order Details & Bill To
    doc.setFont('helvetica', 'bold')
    doc.text('ORDER INFO:', 14, 90)
    doc.setFont('helvetica', 'normal')
    doc.text(`Order Number: #${order.orderNumber}`, 14, 95)
    doc.text(`Order Date: ${new Date(order.createdAt).toLocaleDateString()}`, 14, 100)
    doc.text(`Payment Status: ${order.paymentStatus}`, 14, 105)

    doc.setFont('helvetica', 'bold')
    doc.text('BILL TO:', 140, 90)
    doc.setFont('helvetica', 'normal')
    doc.text(order.address?.fullName || 'Customer', 140, 95)
    doc.text(`${order.address?.street}, ${order.address?.city}`, 140, 100)
    doc.text(`${order.address?.state}, ${order.address?.pincode}`, 140, 105)
    doc.text(`Phone: ${order.address?.phone || 'N/A'}`, 140, 110)

    // Items Table
    const tableData = order.items.map((item: any) => [
      item.productName || 'Product',
      item.id.split('-')[0].toUpperCase(),
      item.quantity,
      `INR ${item.price.toLocaleString()}`,
      `INR ${(item.quantity * item.price).toLocaleString()}`,
    ])

    autoTable(doc, {
      startY: 120,
      head: [['Product', 'SKU', 'Qty', 'Unit Price', 'Total']],
      body: tableData,
      theme: 'grid',
      headStyles: { fillColor: [0, 0, 0], textColor: 255, fontStyle: 'bold' },
      styles: { fontSize: 9, cellPadding: 5 },
      columnStyles: {
        0: { cellWidth: 80 },
        1: { cellWidth: 30 },
        2: { cellWidth: 20, halign: 'center' },
        3: { cellWidth: 30, halign: 'right' },
        4: { cellWidth: 30, halign: 'right' },
      },
    })

    // Summary
    // @ts-ignore
    const finalY = doc.lastAutoTable.finalY + 15
    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.text('Subtotal:', pageWidth - 60, finalY)
    doc.text(`INR ${order.totalAmount.toLocaleString()}`, pageWidth - 14, finalY, { align: 'right' })
    
    doc.text('Tax (0%):', pageWidth - 60, finalY + 7)
    doc.text('INR 0', pageWidth - 14, finalY + 7, { align: 'right' })
    
    doc.text('Shipping:', pageWidth - 60, finalY + 14)
    doc.text('INR 0', pageWidth - 14, finalY + 14, { align: 'right' })

    doc.setDrawColor(0)
    doc.setLineWidth(0.5)
    doc.line(pageWidth - 60, finalY + 18, pageWidth - 14, finalY + 18)

    doc.setFontSize(12)
    doc.setFont('helvetica', 'bold')
    doc.text('Grand Total:', pageWidth - 60, finalY + 25)
    doc.text(`INR ${order.totalAmount.toLocaleString()}`, pageWidth - 14, finalY + 25, { align: 'right' })

    // Footer / Terms
    doc.setFontSize(9)
    doc.setFont('helvetica', 'bold')
    doc.text('Terms & Conditions:', 14, finalY + 45)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    doc.text('1. Goods once sold will not be taken back or exchanged.', 14, finalY + 52)
    doc.text('2. All disputes are subject to local jurisdiction.', 14, finalY + 57)
    doc.text('3. This is a computer generated invoice and does not require a signature.', 14, finalY + 62)

    // Save the PDF
    doc.save(`invoice_${order.orderNumber}.pdf`)
    console.log('Invoice generated successfully')
  } catch (error) {
    console.error('Error generating invoice PDF:', error)
    alert('Failed to generate invoice. Please check the console for details.')
  }
}


