import numpy as np
import matplotlib as mp
import pandas as pd


# simple linear regression
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression

data=pd.read_csv("company.csv")
data.head(10)
real_x=data.iloc[:,0].values # experience,,first column all row only values
real_y=data.iloc[:,1].values # all salary
real_x=real_x.reshape(-1,1)
real_y=real_y.reshape(-1,1)

train_x,test_x,train_y,test_y=train_test_split(real_x,real_y,test_size=0.3,random_state=0)

lin=LinearRegression()
lin.fit(train_x,train_y) #train data into linear reg

pred_y=lin.predict(test_x) # y ni predected value male
# check y=mx+c
#lin.coef_
l#in.intercept_ #check salary=coef*exp + intercpt


# check by plotting # check test_y[3] is near to pred_y[3]
# training plot
plt.scatter(train_x,train_y,color='g')
plt.plot(train_x,pred_y,color='r')
plt.title("salary,expi train plot")
plt.xlabel("exp")
plt.ylabel("salary")
plt.show()

# testing data plot
plt.scatter(test_x,test_y,color='g')
plt.plot(train_x,pred_y,color='r')
plt.title("salary,expi test plot")
plt.xlabel("exp")
plt.ylabel("salary")
plt.show()
