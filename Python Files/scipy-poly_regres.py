import numpy as np
import matplotlib as plt
import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import PolynomialFeatures

data=pd.read_csv("pos_salary.csv")
data.head(10)

real_x=data.iloc[:,1:2].values
real_y=data.iloc[:,2].values

lin_reg=LinearRegression() # this is fro simple linear regression
lin_reg.fit(real_x,real_y)

poly_reg=PolynomialFeatures(degree=4) # this is for polynomial regression
real_x_poly= poly_reg.fit_transform(real_x) # now check this value
poly_reg.fit(real_x_poly,real_y)

lin_reg2=LinearRegression()
lin_reg2.fit(real_x_poly,real_y)

# plotting for checki

plt.scatter(real_x,real_y,color='red')
plt.plot(real_x,lin_reg.predict(real_x),color='blue')
plt.title("linear model")
plt.xlabel("posistion level")
plt.ylabel("salary")
plt.show()


# plotting
plt.scatter(real_x,real_y,color='red')
plt.plot(real_x,lin_reg2.predict(real_x_poly),color='blue')
plt.title("polynomial model")
plt.xlabel("posistion level")
plt.ylabel("salary")
plt.show()

############### check

# lin_reg.predict(6.5)
# lin_reg2.predict(poly_reg.fit_transform(6.5))




