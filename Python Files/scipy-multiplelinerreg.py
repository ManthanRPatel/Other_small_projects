import numpy as np
import matplotlib as mp
import pandas as pd


from sklearn.preprocessing import LabelEncoder,OneHotEncoder
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression

data=pd.read_csv("startup.csv")
data.head(10)

real_x=data.iloc[:,0:4].values
real_y=data.iloc[:,4].values

# dummy var= x1,x3,x2,x4 ,,,,xn
le=LabelEncoder()
real_x[:,3]=le.fit_transform(real_x[:,3}) #beacuse 3rd index have newyork,cali,florida three country..
# check real_x[:,3] is in 0,1,2 format label is encoded
onehe=OneHotEncoder(categorical_features=[3]) # categorical data
real_x=onehe.fit_transform(real_x).toarray()
# now data is encoded

train_x,test_x,train_y,test_y=train_test_split(real_x,real_y,test_size=0.2,random_state=0) # 20% test
mlr=LinearRegression()
mlr.fit(train_x,train_y)

pred_y=mlr.predict(test_x)

#check mlr.coef_  mlr.intercept_
# or test_y == pred_y





####### new technique pip install statsmodels ,,,patsy
import statsmodel.formula.api as sm

data=pd.read_csv("startup.csv")
data.head(10)

real_x=data.iloc[:,0:4].values
real_y=data.iloc[:,4].values

# dummy var= x1,x3,x2,x4 ,,,,xn
le=LabelEncoder()
real_x[:,3]=le.fit_transform(real_x[:,3}) #beacuse 3rd index have newyork,cali,florida three country..
# check real_x[:,3] is in 0,1,2 format label is encoded
onehe=OneHotEncoder(categorical_features=[3]) # categorical data
real_x=onehe.fit_transform(real_x).toarray()
# now data is encoded

real_x=real_x[:,1:]

train_x,test_x,train_y,train_y=train_test_split(real_x,real_y,test_size=0.2,random_state=0) # 20% test
mlr=LinearRegression()
mlr.fit(train_x,train_y)

pred_y=mlr.predict(test_x)

# y=b0 + b1x1 + b2x2 + ,,,,, +bnxn  x0=1

real_x=np.append(arr=np.ones((50,1)).astype(int),values=real_x,axis=1)


x_opt=real_x[:,[0,1,2,3,4,5]]
reg_ols=sm.OLS(endog+real_y,exog=x_opt).fit()
reg_ols.summery()


x_opt=real_x[:,[0,1,3,4,5]]
reg_ols=sm.OLS(endog+real_y,exog=x_opt).fit()
reg_ols.summery()


x_opt=real_x[:,[0,3,4,5]]
reg_ols=sm.OLS(endog+real_y,exog=x_opt).fit()
reg_ols.summery()


x_opt=real_x[:,[0,3,5]]
reg_ols=sm.OLS(endog+real_y,exog=x_opt).fit()
reg_ols.summery()


x_opt=real_x[:,[0,3]]
reg_ols=sm.OLS(endog+real_y,exog=x_opt).fit()
reg_ols.summery()


