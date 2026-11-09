"""Refresh licensed representative photographs; never edits company source material."""
from pathlib import Path
from PIL import Image
from concurrent.futures import ThreadPoolExecutor
import subprocess
photos={'surgical':6291089,'minor-cuts-care':5721552,'paediatric':7789705,'dermatology':5069609,'emergency':263402,'dental':15688027,'veterinary':7469233}
out=Path('.recovery/redesign/stock-originals');out.mkdir(parents=True,exist_ok=True)
def refresh(item):
    name,number=item;dest=out/f'{name}.jpg'
    subprocess.run(['curl.exe','-sS','-L',f'https://images.pexels.com/photos/{number}/pexels-photo-{number}.jpeg?auto=compress&cs=tinysrgb&w=1800','-o',str(dest),'--max-time','30'],check=True)
    image=Image.open(dest).convert('RGB')
    width=min(1600,image.width);height=round(image.height*width/image.width)
    image=image.resize((width,height),Image.Resampling.LANCZOS)
    image.save(Path('public/images/applications')/f'{name}.webp',quality=85,method=6)
    return f'{name}: {width} x {height}'
with ThreadPoolExecutor(max_workers=5) as pool:
    for result in pool.map(refresh,photos.items()):print(result)
