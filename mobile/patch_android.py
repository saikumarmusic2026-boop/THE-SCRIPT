"""Run after `npx cap add android`: lets Android open .thescript files with THE SCRIPT and gives the app its icon."""
import os, re, sys

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'android', 'app', 'src', 'main')

# 1. A tapped .thescript file (Files app, Drive, WhatsApp download ...) opens THE SCRIPT
manifest = os.path.join(ROOT, 'AndroidManifest.xml')
xml = open(manifest, encoding='utf-8').read()
FILTER = r'''
            <intent-filter>
                <action android:name="android.intent.action.VIEW" />
                <category android:name="android.intent.category.DEFAULT" />
                <category android:name="android.intent.category.BROWSABLE" />
                <data android:scheme="content" />
                <data android:scheme="file" />
                <data android:mimeType="*/*" />
                <data android:host="*" />
                <data android:pathPattern=".*\\.thescript" />
                <data android:pathPattern=".*\\..*\\.thescript" />
                <data android:pathPattern=".*\\..*\\..*\\.thescript" />
                <data android:pathPattern=".*\\..*\\..*\\..*\\.thescript" />
            </intent-filter>
'''
if 'thescript' not in xml:
    i = xml.index('</activity>')
    xml = xml[:i] + FILTER + '        ' + xml[i:]
    open(manifest, 'w', encoding='utf-8').write(xml)
    print('intent filter added')

# 2. The app icon (the logo from app/icon-512.png)
try:
    from PIL import Image
    src = Image.open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'www', 'icon-512.png')).convert('RGBA')
    res = os.path.join(ROOT, 'res')
    for folder in os.listdir(res):
        if folder == 'mipmap-anydpi-v26':                      # the stock adaptive icon would hide ours
            for f in os.listdir(os.path.join(res, folder)):
                os.remove(os.path.join(res, folder, f))
    for folder, px in {'mdpi': 48, 'hdpi': 72, 'xhdpi': 96, 'xxhdpi': 144, 'xxxhdpi': 192}.items():
        d = os.path.join(res, 'mipmap-' + folder)
        if not os.path.isdir(d):
            continue
        icon = src.resize((px, px), Image.LANCZOS)
        for name in ('ic_launcher.png', 'ic_launcher_round.png', 'ic_launcher_foreground.png'):
            icon.save(os.path.join(d, name))
    print('icon replaced')
except Exception as e:                                          # the app still builds with the stock icon
    print('icon not replaced:', e, file=sys.stderr)
