import numpy as np
import matplotlib as mp
import pandas as pd
from sklearn.cross_validation import train_test_split ## model_selection
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import confusion_matrix

data=pd.read_csv("ads.csv")
data.head(10)


real_x=data.iloc[:,[2,3]].values
real_y=data.iloc[:,4].values

train_x,test_x,train_y,test_y= train_test_split(real_x,real_y,test_size=0.25,random_state=0)

## feature scalling
s_c=StandardScaler()
train_x=s_c.fit_transform(train_x)
test_x=s_c.fit_transform(test_x)


####### classifier
cls=KNeighborsClassifier(n_neighbors=5,metric='minkowski',p=2)
## training
cls.fit(train_x,train_y)

##predi
y_pred=cls.predict(test_x) ##now check test_y= y_pred

####confision metrix __ check right,wrong
c_m= confusion_matrix(test_y,y_pred) #### print c_m -- array([[64,4],[3,29]])--- 64+29 right --- 4+3=7% wrong



### plot training set

x_set,y_set=train_x,train_y
X1,X2 = np.meshgrid(np.arange(start=x_set[:,0].min()-1,stop=x_set[:,0].max()+1,step=0.01),
                    np.arange(start=x_set[:,1].min()-1,stop=x_set[:,1].max()+1,step=0.01))
plt.countourf(X1,X2,cls.predict(np.array([X1.ravel,X2.ravel()]).T).reshape(X1.shape),
              alpha=0.75,cmap=ListedColormap(("red","green")))    ###### countourf- logistic regression ne devide kare  && ravel--- midpoint kadhwa
plt.xlim(X1.min(),X1.max())  #### limit banavi
plt.ylim(X2.min(),X2.max())

for i,j in enumerate(np.unique(y_set)):
    plt.scatter(x_set[y_set==j,0],x_set[y_set==j,1],
                c=ListedColormap(('red','green'))(i),label=j)

plt.title("KNN training set")
plt.xlabel("age")
plt.ylabel("estimated salary")
plt.legend()
plt.show()

######### testing plotting sets-- jetla dots etls wrong predict

x_set,y_set=test_x,test_y
X1,X2 = np.meshgrid(np.arange(start=x_set[:,0].min()-1,stop=x_set[:,0].max()+1,step=0.01),
                    np.arange(start=x_set[:,1].min()-1,stop=x_set[:,1].max()+1,step=0.01))
plt.countourf(X1,X2,cls.predict(np.array([X1.ravel,X2.ravel()]).T).reshape(X1.shape),
              alpha=0.75,cmap=ListedColormap(("red","green")))    ###### countourf- logistic regression ne devide kare  && ravel--- midpoint kadhwa
plt.xlim(X1.min(),X1.max())  #### limit banavi
plt.ylim(X2.min(),X2.max())

for i,j in enumerate(np.unique(y_set)):
    plt.scatter(x_set[y_set==j,0],x_set[y_set==j,1],
                c=ListedColormap(('red','green'))(i),label=j)

plt.title("KNN testing set")
plt.xlabel("age")
plt.ylabel("estimated salary")
plt.legend()
plt.show()














