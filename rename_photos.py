import os
import random
import shutil

# Get list of files in pictures directory
photo_dir = 'pictures'
files = [f for f in os.listdir(photo_dir) if f.endswith('.jpg')]

# Create a list of new names
new_names = [f'pic{i}.jpg' for i in range(1, len(files) + 1)]

# Randomly shuffle the new names
random.shuffle(new_names)

# Create a temporary directory for the renaming process
temp_dir = os.path.join(photo_dir, 'temp')
os.makedirs(temp_dir, exist_ok=True)

# First, move all files to temporary names to avoid conflicts
temp_files = []
for old_name in files:
    temp_name = f'temp_{random.randint(10000, 99999)}.jpg'
    old_path = os.path.join(photo_dir, old_name)
    temp_path = os.path.join(temp_dir, temp_name)
    shutil.move(old_path, temp_path)
    temp_files.append((temp_path, new_names[len(temp_files)]))

# Then, move them back with their new names
for temp_path, new_name in temp_files:
    new_path = os.path.join(photo_dir, new_name)
    shutil.move(temp_path, new_path)

# Remove the temporary directory
os.rmdir(temp_dir)

print("Files have been randomly renamed to pic1.jpg through pic24.jpg") 