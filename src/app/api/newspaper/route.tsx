import fs from 'fs';
import { NextResponse } from 'next/server';

const folderPath = './public/uploads/dorfzeitung';

export async function GET(req: Request) {
  // Get all PDF files from the folder
  const files = fs.readdirSync(folderPath).filter((file) => file.endsWith('.pdf'));

  // Return the files via JSON
  return NextResponse.json({ files }, { status: 200 });
}

export async function POST(req: Request) {
  const { title, pdfString } = await req.json();

  const pdfBufferString = pdfString.replace(/^data:application\/pdf;base64,/, '');
  if (pdfString) {
    // Convert the base64 string back to a Buffer
    const pdfBuffer = Buffer.from(pdfBufferString, 'base64');

    // Define the file path
    const filePath = `${folderPath}/${title}`;

    // Write the Buffer to a file
    fs.writeFileSync(filePath, pdfBuffer);

    // Return success response
    return NextResponse.json({ success: true }, { status: 200 });
  }

  // Return error response if no base64 string is provided
  return NextResponse.json({ error: 'No base64 string provided' }, { status: 400 });
}
