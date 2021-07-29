import os
import shutil

os.chdir(r"D:\py files")
fileiter=os.walk(r"D:\py files")
for crnt_path,fldr_name,file_name in fileiter:
    print(f"current path : {crnt_path}")
    print(f"folder name : {fldr_name}")
    print(f"file names : {file_name}")

#shutil.rmtree('new') #permenant delete
#shutil.copytree('mama',r'mama\nana') #copy folder
#shutil.copy('fill.csv',r'mama\nana\fill2.txt')
#os.makedirs('new\movies') #folder ma folder banava

#shutil.move(r'D:\py files\uif tftyt\6d6d.txt',r'D:\py files\uif tftyt\nana')

"""
import os

print(os.getcwd())

#open('file.txt','a').close()
#print(os.path.exists('movie'))
#os.mkdir('movie')
#os.mkdir(r'D:\py files\movies')
#os.chdir(r"D:\py files") #change current working directory
#print(os.listdir(r'D:\py files'))

for i in os.listdir(r'D:\py files'):  #from where to list files,folders
    print(os.path.join('D:\py files',i))

"""