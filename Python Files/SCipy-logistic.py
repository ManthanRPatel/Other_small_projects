import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.cross_validation import train_test_split ## model_selection
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import confusion_matrix
from matplotlib.colors import ListedColormap

data=pd.read_csv("ads.csv")
data.head()

real_x=data.iloc[:,[2,3]].values
real_y=data.iloc[:,4].values

train_x,test_x,train_y,test_y= train_test_split(real_x,real_y,test_size=0.25,random_state=0)

# feature scalling= age,slary ne [-2,2} ni range ma kari naakhe..
scalar = StandardScaler()
train_x=scalar.fit_transform(train_x)
test_x=scalar.fit_transform(test_x)

### now logistic
classfyr_lr=LogisticRegression(random_state=0)
classfyr_lr.fit(train_x,train_y)


### prediction
y_pred=classfyr_lr.predict(test_x)
### check value y_pred is equal to test_y
# confusion matric - separate rigth prediction and wrong prediction
c_m=confusion_matrix(test_y,y_pred)
## array([[63,5],[7,25]])---63+25=88% right --- 7+5=wrong


###### plotting
x_set,y_set=train_x,train_y
X1,X2 = np.meshgrid(np.arange(start=x_set[:,0].min()-1,stop=x_set[:,0].max()+1,step=0.01),
                    np.arange(start=x_set[:,1].min()-1,stop=x_set[:,1].max()+1,step=0.01))
plt.countourf(X1,X2,classfyr_lr.predict(np.array([X1.ravel,X2.ravel()]).T).reshape(X1.shape),
              alpha=0.75,cmap=ListedColormap(("red","green")))    ###### countourf- logistic regression ne devide kare  && ravel--- midpoint kadhwa
plt.xlim(X1.min(),X1.max())  #### limit banavi
plt.ylim(X2.min(),X2.max())

for i,j in enumerate(np.unique(y_set)):
    plt.scatter(x_set[y_set==j,0],x_set[y_set==j,1],
                c=ListedColormap(('red','green'))(i),label=j)

plt.title("Logistic reg training set")
plt.xlabel("age")
plt.ylabel("estimated salary")
plt.legend()
plt.show()




#######    testing flotting   #########
## red area ma green dot & green ma red wrong observation
x_set,y_set=test_x,test_y
X1,X2 = np.meshgrid(np.arange(start=x_set[:,0].min()-1,stop=x_set[:,0].max()+1,step=0.01),
                    np.arange(start=x_set[:,1].min()-1,stop=x_set[:,1].max()+1,step=0.01))
plt.countourf(X1,X2,classfyr_lr.predict(np.array([X1.ravel,X2.ravel()]).T).reshape(X1.shape),
              alpha=0.75,cmap=ListedColormap(("red","green")))    ###### countourf- logistic regression ne devide kare  && ravel--- midpoint kadhwa
plt.xlim(X1.min(),X1.max())  #### limit banavi
plt.ylim(X2.min(),X2.max())

for i,j in enumerate(np.unique(y_set)):
    plt.scatter(x_set[y_set==j,0],x_set[y_set==j,1],
                c=ListedColormap(('red','green'))(i),label=j)

plt.title("Logistic reg testing set")
plt.xlabel("age")
plt.ylabel("estimated salary")
plt.legend()
plt.show()









