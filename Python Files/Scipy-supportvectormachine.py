import numpy as np
import matplotlib as plt
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.svm import SVC
from sklearn.metrics import confusion_matrix

data= pd.read_csv("ads.csv")
data.head(10)

real_x=data.iloc[:,[2,3]].values
real_y=data.iloc[:,4].values

train_x,test_x,train_y,test_y= train_test_split(real_x,real_y,test_size=0.25,random_state=0)

########## feature scalling
s_c=StandardScaler()
train_x=s_c.fit_transform(train_x)
test_x=s_c.fit_transform(test_x)

cls_svc=SVC(kernel='linear',random_state=0) #### plotting line malshe,,,
cls_svc.fit(train_x,train_y)

y_pred=cls_svc.predict(test_x) ## now print(y_pred)=test_y

########## confusion metix
c_m = confusion_matrix(test_y,y_pred)
##### now print(c_m) array([[66,2],[8,24]])--- 66+24=90% correct


##### plotting trainig data setsssss --- red can't buy,,, green can,, red in green & green in red is wrong prediction
x_set,y_set=train_x,train_y
X1,X2 = np.meshgrid(np.arange(start=x_set[:,0].min()-1,stop=x_set[:,0].max()+1,step=0.01),
                    np.arange(start=x_set[:,1].min()-1,stop=x_set[:,1].max()+1,step=0.01))
plt.countourf(X1,X2,cls_svc.predict(np.array([X1.ravel,X2.ravel()]).T).reshape(X1.shape),
              alpha=0.75,cmap=ListedColormap(("red","green")))    ###### countourf- logistic regression ne devide kare  && ravel--- midpoint kadhwa
plt.xlim(X1.min(),X1.max())  #### limit banavi
plt.ylim(X2.min(),X2.max())

for i,j in enumerate(np.unique(y_set)):
    plt.scatter(x_set[y_set==j,0],x_set[y_set==j,1],
                c=ListedColormap(('red','green'))(i),label=j)

plt.title("SVM training set")
plt.xlabel("age")
plt.ylabel("estimated salary")
plt.legend()
plt.show()

######### plotting testing setsss
x_set,y_set=test_x,test_y
X1,X2 = np.meshgrid(np.arange(start=x_set[:,0].min()-1,stop=x_set[:,0].max()+1,step=0.01),
                    np.arange(start=x_set[:,1].min()-1,stop=x_set[:,1].max()+1,step=0.01))
plt.countourf(X1,X2,cls_svc.predict(np.array([X1.ravel,X2.ravel()]).T).reshape(X1.shape),
              alpha=0.75,cmap=ListedColormap(("red","green")))    ###### countourf- logistic regression ne devide kare  && ravel--- midpoint kadhwa
plt.xlim(X1.min(),X1.max())  #### limit banavi
plt.ylim(X2.min(),X2.max())

for i,j in enumerate(np.unique(y_set)):
    plt.scatter(x_set[y_set==j,0],x_set[y_set==j,1],
                c=ListedColormap(('red','green'))(i),label=j)

plt.title("SVM testing set")
plt.xlabel("age")
plt.ylabel("estimated salary")
plt.legend()
plt.show()















