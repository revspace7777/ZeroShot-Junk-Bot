"""
Deploy junk_pricing module to Odoo server.

This script:
1. Zips the junk_pricing module
2. Uploads it to the Odoo server via SCP (requires SSH access)
   OR creates instructions for manual upload
"""

import os
import zipfile
import shutil
from pathlib import Path

MODULE_DIR = Path(__file__).parent / 'junk_pricing'
OUTPUT_ZIP = Path(__file__).parent / 'junk_pricing.zip'

def create_module_zip():
    """Create a zip file of the module for deployment"""
    if OUTPUT_ZIP.exists():
        OUTPUT_ZIP.unlink()
    
    with zipfile.ZipFile(OUTPUT_ZIP, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(MODULE_DIR):
            # Skip __pycache__
            dirs[:] = [d for d in dirs if d != '__pycache__']
            
            for file in files:
                if file.endswith('.pyc'):
                    continue
                file_path = Path(root) / file
                arcname = file_path.relative_to(MODULE_DIR.parent)
                zipf.write(file_path, arcname)
                print(f"  Added: {arcname}")
    
    print(f"\nCreated: {OUTPUT_ZIP}")
    print(f"Size: {OUTPUT_ZIP.stat().st_size / 1024:.1f} KB")
    return OUTPUT_ZIP

def main():
    print("=== Junk Pricing Module Deployment ===")
    print()
    
    if not MODULE_DIR.exists():
        print(f"Error: Module directory not found: {MODULE_DIR}")
        return
    
    # Create zip
    print("Creating module zip...")
    zip_path = create_module_zip()
    
    print()
    print("=" * 50)
    print("DEPLOYMENT INSTRUCTIONS")
    print("=" * 50)
    print()
    print("Option 1: Upload via SSH/SCP")
    print("-" * 30)
    print(f"scp {zip_path} user@sagebrush.zero.sbs:/tmp/")
    print("ssh user@sagebrush.zero.sbs")
    print("cd /opt/odoo_sagebrush/addons")
    print("unzip /tmp/junk_pricing.zip")
    print("sudo systemctl restart odoo_sagebrush")
    print()
    print("Option 2: Use Odoo Apps Install")
    print("-" * 30)
    print("1. Log in to Odoo as admin")
    print("2. Go to Apps → Update Apps List")
    print("3. Search for 'Junk Pricing'")
    print("4. Click Install")
    print()
    print("After installation, test at:")
    print("  https://sagebrush.zero.sbs/junk/pricing")

if __name__ == '__main__':
    main()
