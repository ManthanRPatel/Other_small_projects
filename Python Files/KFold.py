import numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC
from sklearn.ensemble import RandomForestClassifier
from sklearn.datasets import load_digits




digits=load_digits()
######### first do with train spliting
from sklearn.model_selection import train_test_split

train_x,test_x,train_y,test_y= train_test_split(digits.data,digits.target,test_size=0.3)

lr=LogisticRegression()
lr.fit(train_x,train_y)
lr.score(train_x,train_y)

svs=SVC()
svs.fit(train_x,train_y)
svs.score(train_x,train_y)

rf=RandomForestClassifier(n_estimators=40)
rf.fit(train_x,train_y)
rf.score(train_x,train_y)

########### now doing with kfold spliting and testing

from sklearn.model_selection import  KFold

kf=KFold(n_splits=3)
##### pritn(kf)
###### fro checking
for train_index,test_index in kf.split([1,2,3,4,5,6,7,8,9]):
    print(train_index,test_index)

### now actual implementation

def get_score(model,X_train,Y_train,X_test,Y_test):
    model.fit(X_train,Y_train)
    return model.score(X_test,Y_test)

get_score(LogisticRegression(),train_x,train_y,test_x,test_y)
get_score(SVC(),train_x,train_y,test_x,test_y)
get_score(RandomForestClassifier(),train_x,train_y,test_x,test_y)

########## now for staritical kfold---- staritical category in unifrom way,,,
from sklearn.model_selection import StratifiedKFold

folds= StratifiedKFold(n_splits=3)
score_LR=[]
score_SVC=[]
score_RF=[]

for train_index,test_index in kf.split(digits.data):
    X_train,Y_train,X_test,Y_test=digits.data[train_index],digits.data[test_index],digits.target[train_index],digits.target[test_index]
    score_LR.append(get_score(LogisticRegression(),X_train,Y_train,X_test,Y_test))
    score_SVC.append(get_score(SVC(),X_train,Y_train,X_test,Y_test))
    score_RF.append(get_score(RandomForestClassifier(n_estimators=40),X_train,Y_train,X_test,Y_test))

print(score_RF)
print(score_LR)
print(score_SVC)

########## similar upper thing is done by
from sklearn.model_selection import cross_val_score

print(cross_val_score(LogisticRegression(),digits.data,digits.target))
print(cross_val_score(SVC(),digits.data,digits.target))
print(cross_val_score(RandomForestClassifier(n_estimators=40),digits.data,digits.target))


