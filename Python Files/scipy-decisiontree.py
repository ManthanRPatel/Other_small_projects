import numpy as np
import matplotlib as plt
import pandas as pd
from sklearn.tree import DecisionTreeRegressor

data= pd.read_csv("pos.slary.csv")
data.head(10)

real_x=data.iloc[:,1:2].values
real_y=data.iloc[:,2].values

reg=DecisionTreeRegressor(random_state=0)
reg.fit(real_x,real_y)

# check y_pred=reg.predict(6)

x_grid=np.arange(min(real_x),max(real_x),0.01)
x_grid= x_grid.reshape((len(x_grid),1))
plt.scatter(real_x,real_y,color='green')
plt.plot(x_grid, reg.predict(x_grid),color='blue')
plt.title("decision tree")
plt.xlabel("pos level")
plt.ylabel("Salary")
plt.show()








