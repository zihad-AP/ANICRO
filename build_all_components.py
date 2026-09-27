# Generator for ANTICRO CR-1 Components and Pages
import os
import pathlib

def write(path, text):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(text.strip())
    print(f'Created {path}')
