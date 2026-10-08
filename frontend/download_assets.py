import urllib.request
import json
import os
import sys

assets = ['fern_02', 'rock_moss_set_01', 'tree_stump_01', 'stone_01', 'modular_fort_01', 'boulder_01']
base_dir = r'd:\Astra\astra\frontend\public\models'

for asset in assets:
    target_dir = os.path.join(base_dir, asset)
    os.makedirs(target_dir, exist_ok=True)
    
    print(f'Fetching metadata for {asset}...')
    try:
        req = urllib.request.Request(f'https://api.polyhaven.com/files/{asset}', headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = json.loads(resp.read().decode())
    except Exception as e:
        print(f'Error fetching {asset}: {e}')
        continue
    
    gltf_info = data.get('gltf', {}).get('1k', {}).get('gltf', {})
    if not gltf_info:
        print(f'No 1k gltf for {asset}')
        continue
    
    main_url = gltf_info.get('url')
    main_name = f'{asset}_1k.gltf'
    main_path = os.path.join(target_dir, main_name)
    if not os.path.exists(main_path):
        print(f'Downloading {main_name}...')
        urllib.request.urlretrieve(main_url, main_path)
    
    includes = gltf_info.get('include', {})
    for inc_name, inc_meta in includes.items():
        inc_url = inc_meta.get('url')
        inc_path = os.path.join(target_dir, inc_name.replace('/', os.sep))
        os.makedirs(os.path.dirname(inc_path), exist_ok=True)
        if not os.path.exists(inc_path):
            size_kb = inc_meta.get('size', 0) // 1024
            print(f'  Downloading {inc_name} ({size_kb} KB)...')
            try:
                urllib.request.urlretrieve(inc_url, inc_path)
            except Exception as e:
                print(f'  Failed {inc_name}: {e}')

print('Asset download complete!')
