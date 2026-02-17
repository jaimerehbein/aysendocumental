-- Script de Corrección de Contenido (Generated)

-- Eliminar video roto 'Atlas Audiovisual: Calafate'
DELETE FROM videos WHERE id = 39;

-- Corregir thumbnails rotos (Fallback a hqdefault)
UPDATE videos SET thumbnail_url = 'https://img.youtube.com/vi/N2JC34fccmY/hqdefault.jpg' WHERE id = 29;
UPDATE videos SET thumbnail_url = 'https://img.youtube.com/vi/u8gTnmP5_Z0/hqdefault.jpg' WHERE id = 164;
UPDATE videos SET thumbnail_url = 'https://img.youtube.com/vi/A2vP8U61Q0c/hqdefault.jpg' WHERE id = 32;
UPDATE videos SET thumbnail_url = 'https://img.youtube.com/vi/kYI_U7uCunA/hqdefault.jpg' WHERE id = 19;
UPDATE videos SET thumbnail_url = 'https://img.youtube.com/vi/XshFqY7A_c0/hqdefault.jpg' WHERE id = 30;
UPDATE videos SET thumbnail_url = 'https://img.youtube.com/vi/QyOKDNUlELo/hqdefault.jpg' WHERE id = 12;
UPDATE videos SET thumbnail_url = 'https://img.youtube.com/vi/hxhQIgkz78n/hqdefault.jpg' WHERE id = 14;
UPDATE videos SET thumbnail_url = 'https://img.youtube.com/vi/0kH8fN6XW_w/hqdefault.jpg' WHERE id = 23;
UPDATE videos SET thumbnail_url = 'https://img.youtube.com/vi/UaVKKFgkv4Y/hqdefault.jpg' WHERE id = 168;
UPDATE videos SET thumbnail_url = 'https://img.youtube.com/vi/jRdjc3fBp3k/hqdefault.jpg' WHERE id = 158;
UPDATE videos SET thumbnail_url = 'https://img.youtube.com/vi/QyOKDNUlELo/hqdefault.jpg' WHERE id = 159;
