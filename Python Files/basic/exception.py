

""" #debugging
import pdb

pdb.set_trace()
name=input("enter name :")
age=input("enter age: ")
print(f"hello {name} your age is {age}")
age2=int(age)+5
print(f"{name} you will be {age2} in next 5 years...")
# commands in output = n ,l, c, q
"""
""" #custom Exceptions
class NameTooShortError(ValueError):
    pass


def validate(name):
    if len(name)<8:
        raise NameTooShortError("name is too short...")

un=input("enter your name : ")
validate(un)
print(f"hiii {un}")
"""
"""
def divide(a,b):
    try:
        return a/b
    except ZeroDivisionError as err:
        #print("you can't divide by zero")
        print(err)
    except TypeError as err:
        print(err)
        print("numbers must be int od flora")
    except:
        print("unexpected error")

print(divide(20,"3"))
"""
"""
while True:
    try:
        num=int(input("enter number:"))

    except ValueError:
        print("type integer....")
    except:
        print("unexpeted error...")
    else:
        print(f"input ={num}")
        break
    finally:
        print("finally running....")

"""
"""
while True:
    try:
        age=int(input("enter age : "))
        break
    except ValueError:
        print("invalid input.......")
    except:
        print("unknown exception")

if age<18:
    print("you can't play")
else:
    print("you can.....")
"""

"""
class Mobile:
    def __init__(self,name):
        self.name=name

class Mobilestore:
    def __init__(self):
        self.mobiles=[]
    def addmo(self,newmo):
        if isinstance(newmo,Mobile):
            self.mobiles.append(newmo)
        else:
            raise TypeError("new mobile should be object of mobile class")

oneplus=Mobile("one plus 6")
sam='samsung galaxy s6'
mobost = Mobilestore()
mobost.addmo(oneplus)
moph=mobost.mobiles
print(moph[0].name)"""
#(2)
"""class Animal:
    def __init__(self,name):
        self.name=name

    def sound(self):
        raise NotImplementedError('you have miss method in subclass')

class Dog(Animal):
    def __init__(self,name,breed):
        super().__init__(name)
        self.breed=breed
    def sound(self):
        return "bhaaao bhaaao"


class Cat(Animal):
    def __init__(self,name,breed):
        super().__init__(name)
        self.breed = breed

    def sound(self):
        return "meow meow"

doggy=Dog("magan","pug")
cu=Cat("cum","billi")
print(doggy.sound())
print(cu.sound())"""
#(2)
"""def add(a,b):
    if (type(a)==int and type(b)==int):
        return a+b
    raise TypeError("error")


print(add(5,2))
print(a)dd('5','2')"""