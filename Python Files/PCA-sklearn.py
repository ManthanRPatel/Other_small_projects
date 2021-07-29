import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
from sklearn.preprocessing import StandardScaler



x=df[["calory","breakfast","lunch","dinner","exercise"]]
y=df[["body_shape"]]

x_std=StandardScaler().fit_transform(x)
######## print(x_std)

features = x_std.T

















