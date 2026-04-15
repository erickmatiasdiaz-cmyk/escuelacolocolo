import { existsSync } from 'fs';
import { mkdir, writeFile } from 'fs/promises';
import { join } from 'path';
import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth-middleware';

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);

function sanitizeFilename(name: string) {
  const ext = name.includes('.') ? name.slice(name.lastIndexOf('.')).toLowerCase() : '';
  const baseName = name.replace(ext, '').toLowerCase();
  const safeBaseName = baseName.replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
  return `${Date.now()}-${safeBaseName || 'imagen'}${ext}`;
}

export async function POST(request: NextRequest) {
  try {
    const auth = await verifyAuth(request);
    if (!auth.authorized) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file');

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (!ALLOWED_TYPES.has(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPG, PNG, and WEBP are allowed.' },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 5MB.' },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = sanitizeFilename(file.name);
    const uploadDir = join(process.cwd(), 'public', 'uploads');

    try {
      if (!existsSync(uploadDir)) {
        await mkdir(uploadDir, { recursive: true });
      }

      const filePath = join(uploadDir, filename);
      await writeFile(filePath, new Uint8Array(buffer));

      return NextResponse.json({
        success: true,
        url: `/uploads/${filename}`,
        filename,
        storage: 'filesystem',
      });
    } catch (storageError) {
      console.error('Upload filesystem fallback:', storageError);

      const dataUrl = `data:${file.type};base64,${buffer.toString('base64')}`;

      return NextResponse.json({
        success: true,
        url: dataUrl,
        filename,
        storage: 'inline',
      });
    }
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'No se pudo subir la imagen.' },
      { status: 500 }
    );
  }
}
