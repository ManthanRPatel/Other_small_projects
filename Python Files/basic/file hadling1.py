
with open("love.txt",'r',encoding='UTF-8') as rf:
    print(rf.encoding)
    data=rf.read()
    print(data)

with open("file2.txt",'r') as r:
    data=r.read(100)
    while len(data)>0:
        print(data)
        data=r.read(100)


"""
with open("file2.txt",'r') as web:
    with open("output.txt","a") as wf:
        page=web.read()
        link_exist=True
        while link_exist:
            pos = page.find('<a href=')
            if pos==-1:
                link_exist=False
            else:
                firstq = page.find('\"', pos)
                secondq = page.find('\"', firstq + 1)
                url = page[firstq + 1:secondq]
                wf.write(url + "\n")
                page=page[secondq:]

"""




"""
with open('file2.txt','r') as web:
    with open('output2.txt','a') as wf:
        for line in web.readlines():
            if '<a href=' in line:
                pos=line.find('<a href=')
                firstq=line.find('\"',pos)
                secondq=line.find('\"',firstq+1)
                url=line[firstq+1:secondq]
                wf.write(url+"\n")

"""
"""
with open('salary.txt','r') as rf:
    with open('output.txt','a') as wf:
        for line in rf.readlines():
            name,salary=line.split(',')
            wf.write(f"{name}'s   salary is {salary}")
"""
""" #from one file to other
with open('file1.txt','r') as rf:
    with open('file2.txt','w') as wf:
        wf.write(rf.read())
"""
"""
#with block --context manager
#with open("file1.txt","r") as f:
 #   data=f.read()
  #  print(data)

#with open("file2.txt","w") as f:
 #   f.write("this is all data....me manthan....")
  #  print(f)

#with open("file2.txt","a") as f:
 #   f.write("\nit enginneerrr....")
  #  print(f)
#print(f.closed)
with open("file1.txt","r+") as f:
    f.write("1234567890 manthan patel")
    print(f.read())
    f.read()
    #f.seek(len(f.read()))
    f.write("hiiii,,, budddiiiieeeee")
    print(f.read())
"""
"""
#file handling
#f = open(r"C:\python\file1.txt","r") #if file is in other folder
f=open(file1.txt)
print(f.readline(),end="")  #read one line
lines=f.readlines()
print(lines)
for i in lines[:2]:
    print(i,end="")
for i in f.readlines()[:2]:
    print(i,end="")

print("\n",f.name)
print(f.closed)

#print(f"cursor is on ...{f.tell()}")
#print(f.read())
#f.seek(0)
#print(f"now ,,,cursor is on ...{f.tell()}")
#print(f.read())
f.close()
print(f.closed)
"""