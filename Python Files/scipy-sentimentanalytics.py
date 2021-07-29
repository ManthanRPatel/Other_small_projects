from textblob import TextBlob
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd


Feedback1="the food at Radison was awesome"
Feedback2="the food at Radison was very good"

blob1=TextBlob(Feedback1)
blob2=TextBlob(Feedback2)

print(blob1.sentiment)
print(blob2.sentiment)
######### check polarity & subjectivity


####### 2nd twitter sentiment anaytics ------import tweepy












