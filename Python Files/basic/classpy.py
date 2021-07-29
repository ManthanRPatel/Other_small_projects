class Phone:
    disc=10
    def __init__(self,br,md,pr):
        self.model=md
        self.brand=br
        self._price=max(pr,0)

    @property
    def completesp(self):
        return self.model+" "+self.brand+" "+str(self._price)

    @property
    def price(self):
        return self._price

    @price.setter
    def price(self,newprice):
        self._price=max(newprice,0)

    def dsct(self):
       offpr=(self.price*self.disc)/100
       print(f"now your price is {self.price-offpr} ruppess")

    def __str__(self):
        return f"{self.brand}  {self.model} {self.price}"
    def __repr__(self):
        return f" Phone('{self.brand}','{self.price}','{self.model}')"
    def __len__(self):
        return len(self.completesp)
    def __add__(self, other):
        return self.price+ other.price
    def __mul__(self, other):
        return self.price* other.price

class Smartphone(Phone):
    def __init__(self,br,md,pr,ram,rom,camera):
        #Phone.__init__(self,br,md,pr)
        super().__init__(br,md,pr)
        self.ram=ram
        self.rom=rom
        self.camera=camera

class Flagphone(Smartphone):
    disc=50
    def __init__(self,br,md,pr,ram,rom,camera,frontcamera):
        #Phone.__init__(self,br,md,pr)
        super().__init__(br,md,pr,ram,rom,camera)
        self.frontcamera=frontcamera

    def dsct(self):
       offpr=(self.price*self.disc)/100
       print(f"now your price is {self.price-offpr} ruppess")


s1=Smartphone('nokia','bnm',56000,"2gb",'23gb','23mp')
#print(len(s1))
f1=Flagphone('oneplus','dsc',45000,'2gb','128gb','25mp',"23mp")


#print(f1.dsct())
#print(s1.dsct())
#print(s1.completesp)
#print(f1.completesp)
p1=Phone('motorola','moto g',2300)
p2=Phone('motoa','moto r',2700)
print(p1+p2)
print(p1*p2)

class A:
    def amethod(self):
        return "i'm just class a"
    def hello(self):
        return "hello class a"

class B:
    def bmethod(self):
        return "i'm just class b"
    def hello(self):
        return "hello class b"
class C(B,A):
    pass



c1=C()
print(c1.amethod())
print(c1.bmethod())
print(c1.hello())
a1=A()
print(C.mro())
print(a1.amethod())

#print(str(p1))   #print(p1)
#print(repr(p1))
#print(isinstance(s1,Flagphone))
#print(issubclass(Smartphone,Flagphone))
#print(help(Flagphone))
#print(p1.__dict__)