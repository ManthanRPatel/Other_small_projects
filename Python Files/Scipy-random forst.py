import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
from sklearn.ensemble import RandomForestRegressor


data=pd.read_csv("pos.csv")
data.head()


real_x=data.iloc[:,1:2].values # 2D array bani jaaay,,,, only 1 thi (2-1) sudhi jaaay... etle 1st column no 2D array male
real_y=data.iloc[:,2].values

reg=RandomForestRegressor(n_estimators=100,random_state=0) # jem estimator vadeh tem perfect answer
reg.fit(real_x,real_y)

#   checking y_pred=reg.predict(6)

# plotting
x_grid=np.arange(min(real_x),max(real_x),0.01)
x_grid=x_grid.reshape((len(x_grid),1))
plt.scatter(real_x,real_y,color='green')
plt.plot(x_grid,reg.predict(x_grid),color="blue")
plt.title("random forst")
plt.xlabel("pos lavel")
plt.ylabel("salary")
plt.show()






