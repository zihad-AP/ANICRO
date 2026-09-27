import base64
import os

def write_b64(path, b64_str):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'wb') as f:
        f.write(base64.b64decode(b64_str))
    print(f'Wrote {path}')