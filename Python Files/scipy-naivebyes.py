from sklearn.naive_bayes import GaussianNB,MultinomialNB
import urllib
import numpy as np
import matplotlib as plt
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report



## load set
dataset=dataset.load_iris()

# make a maodel
model=GaussianNB()
model.fit(dataset.data,dataset.target)
 ########### print(model)

 expected=dataset.target
 predicted=model.predict(dataset.data)

print(metrics.classification_report(expected,predicted))
print(metrics.confusion_matrix(expected,predicted))
####   [[50 0 0][0 47 3][0 3 47]]







