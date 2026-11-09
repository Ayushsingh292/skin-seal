"""Read-only source audit. Derived previews go to ignored .recovery/redesign/."""
from pathlib import Path
import json, hashlib, fitz, cv2
from PIL import Image, ImageDraw

out=Path('.recovery/redesign');out.mkdir(parents=True,exist_ok=True)
inventory=[]; thumbs=[]
for path in sorted(Path('items').rglob('*')):
    if not path.is_file(): continue
    item={'path':path.as_posix(),'bytes':path.stat().st_size,'sha256':hashlib.sha256(path.read_bytes()).hexdigest()}
    if path.suffix.lower() in ['.jpg','.jpeg','.png']:
        im=Image.open(path);item.update(width=im.width,height=im.height,format=im.format);thumbs.append((path.name,im.copy()))
    elif path.suffix.lower()=='.pdf':
        doc=fitz.open(path);item['pages']=len(doc)
        (out/(path.stem+'.txt')).write_text('\n'.join(p.get_text() for p in doc),encoding='utf-8')
        for i,page in enumerate(doc):
            if not page.get_text().strip():
                pix=page.get_pixmap(matrix=fitz.Matrix(1.4,1.4));thumbs.append((path.stem+f' p{i+1}',Image.frombytes('RGB',[pix.width,pix.height],pix.samples)))
    elif path.suffix.lower()=='.mp4':
        cap=cv2.VideoCapture(str(path));fps=cap.get(cv2.CAP_PROP_FPS);total=cap.get(cv2.CAP_PROP_FRAME_COUNT)
        item.update(width=int(cap.get(3)),height=int(cap.get(4)),fps=round(fps,3),seconds=round(total/fps,2))
        for i,fraction in enumerate([.03,.2,.4,.6,.8,.95]):
            cap.set(cv2.CAP_PROP_POS_FRAMES,int(total*fraction));ok,frame=cap.read()
            if ok:
                im=Image.fromarray(cv2.cvtColor(frame,cv2.COLOR_BGR2RGB));thumbs.append((path.stem+f' {int(fraction*100)}%',im))
        cap.release()
    inventory.append(item)
(out/'inventory.json').write_text(json.dumps(inventory,indent=2),encoding='utf-8')
for batch in range(0,len(thumbs),12):
    chunk=thumbs[batch:batch+12];sheet=Image.new('RGB',(1440,((len(chunk)+3)//4)*360),'#eef2f4');draw=ImageDraw.Draw(sheet)
    for i,(label,im) in enumerate(chunk):
        im.thumbnail((348,320));sheet.paste(im,(i%4*360,i//4*360));draw.text((i%4*360+3,i//4*360+325),label[:48],fill='black')
    sheet.save(out/f'assets-{batch//12}.jpg')
# The supplied PDF embeds authentic original product imagery at higher resolution.
doc=fitz.open('items/new skin seal catalog.pdf')
for row in doc[0].get_images(full=True):
    print('Embedded image',row[:5])
    if row[2]>2000 and row[3]<600:
        pix=fitz.Pixmap(doc,row[0])
        if pix.colorspace.n!=3:pix=fitz.Pixmap(fitz.csRGB,pix)
        if row[1]:pix=fitz.Pixmap(pix,fitz.Pixmap(doc,row[1]))
        pix.save(out/'authentic-applicator.png')
print(json.dumps(inventory,indent=2))
