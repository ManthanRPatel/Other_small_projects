

"""
from csv import DictWriter,DictReader
with open("file4.csv","r") as rf:
    with open("final.csv","w",newline="") as wf:
        csv_rdr=DictReader(rf)
        csv_wr=DictWriter(wf,fieldnames=['first_name','last_name','age_'])
        csv_wr.writeheader()
        for i in csv_rdr:
            fn,ln,g=i['first name'],i['last name'],i['age']
            csv_wr.writerow({
                "first_name":fn.upper(),
                'last_name':ln,
                'age_':g
            })
"""
"""
from csv import DictWriter

with open("file4.csv","w",newline='') as f:
    wr=DictWriter(f,fieldnames=['first name','last name','age'])
    wr.writeheader()
    wr.writerow({
        'first name':'mohit',
        'last name':'patel',
        'age':20
    })
    wr.writerow({
        'first name': 'manthan',
        'last name': 'patel',
        'age': 20
    })
    wr.writerows([{'first name':'mohit','last name':'patel','age':20}
                     ,{'first name': 'manthan','last name': 'patel','age': 20}])

"""
""" #write csv writer
from csv import writer

with open("file3.txt",'w') as f:
    csvwr=writer(f)
    csvwr.writerow(['name','country'])
    csvwr.writerow(['manthan', 'india'])
    csvwr.writerow(['vipul', 'canada'])
    csvwr.writerow(['jeel', 'india'])
    csvwr.writerows([['manthan', 'india'],['manthan', 'india'],['manthan', 'india']])
"""
"""
from csv import DictReader

with open("fill.csv",'r') as f:
    csv_reader = DictReader(f,delimiter='|')
    for i in csv_reader:
        print(i['name'],i['email'],i['phone'])
"""
""" #reader file reading,,...
from csv import reader

with open("fill.csv",'r') as f:
    csv_reader=reader(f)
    next(csv_reader)
    for i in csv_reader:
        print(i)
"""