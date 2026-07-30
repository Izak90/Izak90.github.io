from pathlib import Path
import re

root = Path(__file__).resolve().parent.parent
html_files = list(root.rglob('*.html'))

insert_text = (
    '    <link rel="manifest" href="/isaac_treinos_ar_livre/manifest.webmanifest">\n'
    '    <meta name="theme-color" content="#2A9D8F">\n'
    '    <meta name="mobile-web-app-capable" content="yes">\n'
    '    <meta name="apple-mobile-web-app-capable" content="yes">\n'
    '    <meta name="apple-mobile-web-app-status-bar-style" content="default">\n'
    '    <link rel="apple-touch-icon" href="/isaac_treinos_ar_livre/img/logo-black.png">\n'
)
icon_pattern = re.compile(r'(<link\s+rel=["\]?icon["\]?.*?>)', re.IGNORECASE)
manifest_pattern = re.compile(r'rel=["\]?manifest["\]?', re.IGNORECASE)

updated_files = []
for html_path in html_files:
    text = html_path.read_text(encoding='utf-8')
    if manifest_pattern.search(text):
        continue
    match = icon_pattern.search(text)
    if match:
        text = text[:match.end()] + '\n' + insert_text + text[match.end():]
        html_path.write_text(text, encoding='utf-8')
        updated_files.append(str(html_path.relative_to(root)))

print(f'Updated {len(updated_files)} HTML files:')
for path in updated_files:
    print(path)
