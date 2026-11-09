"""Create public delivery copies; never write to items/. Requires ffmpeg and PyMuPDF."""
from pathlib import Path
import shutil
import subprocess
import fitz

root = Path(__file__).resolve().parent.parent
source = root / 'items'
for folder in ['videos', 'images/media', 'documents']:
    (root / 'public' / folder).mkdir(parents=True, exist_ok=True)

documents = {
    'new skin seal catalog.pdf': 'skinseal-catalogue.pdf',
    'Skin Seal Insert.pdf': 'skinseal-insert.pdf',
    'How to Use Skin Seal.pdf': 'skinseal-application-guide.pdf',
    'new skin seal presentation.pdf': 'skinseal-presentation.pdf',
    'Skin Seal Use in Surgiries.pdf': 'skinseal-surgical-guide.pdf',
    'Using Skin Seal in a delivery device instead of ampoule and dropper.pdf': 'skinseal-delivery-device.pdf',
    'How Skin Seal is Better than Sutures.pdf': 'skinseal-sutures-comparison.pdf',
}
for original, destination in documents.items():
    shutil.copyfile(source / original, root / 'public/documents' / destination)

for original, stem, width, poster_time in [
    ('AI Video of Skin Seal .mp4', 'skinseal-ai-brand', 480, 4),
    ('skin seal vet.mp4', 'skinseal-veterinary', 1280, 4),
]:
    output = root / f'public/videos/{stem}.mp4'
    subprocess.run(['ffmpeg', '-y', '-hide_banner', '-loglevel', 'error', '-i', str(source / original),
        '-map', '0:v:0', '-map', '0:a:0?', '-vf', f'scale={width}:-2', '-c:v', 'libx264',
        '-preset', 'medium', '-crf', '25', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '96k',
        '-movflags', '+faststart', str(output)], check=True)
    subprocess.run(['ffmpeg', '-y', '-hide_banner', '-loglevel', 'error', '-ss', str(poster_time),
        '-i', str(output), '-frames:v', '1', '-c:v', 'libwebp', '-quality', '85',
        str(root / f'public/images/media/{stem}.webp')], check=True)

with fitz.open(source / 'new skin seal catalog.pdf') as pdf:
    # Only an authentic cover preview, without rewriting or recreating the artwork.
    from PIL import Image
    pix = pdf[0].get_pixmap(matrix=fitz.Matrix(1.5, 1.5))
    Image.frombytes('RGB', [pix.width, pix.height], pix.samples).save(
        root / 'public/images/media/catalogue-cover.webp', quality=85)
print('Prepared two complete videos, two posters, seven PDFs and a catalogue cover.')
