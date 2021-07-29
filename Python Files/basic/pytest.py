import threading
import time

def prtime(thrdnm,delay):
    count=0
    while(count<5):
        time.sleep(delay)
        count+=1
        print(f"{thrdnm}    {time.ctime(time.time())}")


try:
    threading.
"""  #time threading
import time
import threading


def sqr(num):
    print("calculate square")
    for n in num:
        time.sleep(0.2)
        print('square : ',n*n)

def cube(num):
    print("calculate cubes")
    for n in num:
        time.sleep(0.2)
        print('cube : ',n*n*n)

arr=[2,3,4,5,6]
t=time.time()

t1=threading.Thread(target=sqr,args=(arr,))
t2=threading.Thread(target=cube,args=(arr,))

t1.start()
t2.start()

t1.join()
t2.join()

sqr(arr)
cube(arr)
print("done ,,,",time.time()-t)
print("hahhh,,,work over")
"""