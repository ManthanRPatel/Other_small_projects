import numpy as np
import pandas as pd
from matplotlib import pyplot as plt

# chart style
x = np.arange(0,10)
y = x ^ 2
z = x ^ 3
t = x ^ 4

plt.title("Graph Drawing")
plt.xlabel("Time")
plt.ylabel("Distance")
plt.plot(x,y)

plt.annotate(xy=[2,1], s='Second Entry')
plt.annotate(xy=[4,6], s='Third Entry')

plt.plot(x,z)
plt.plot(x,t)
plt.legend(['Race1', 'Race2','Race3'], loc=4)

plt.style.use('fast')
plt.plot(x,z)


#box plots
df = pd.DataFrame(np.random.rand(10, 5), columns=['A', 'B', 'C', 'D', 'E'])
df.plot.box(grid='True')


# heat map
data=[{2,3,4,1},{6,3,5,2},{6,3,5,4},{3,7,5,4},{2,8,1,5}]
Index= ['I1', 'I2','I3','I4','I5']
Cols = ['C1', 'C2', 'C3','C4']
df = pd.DataFrame(data, index=Index, columns=Cols)

plt.pcolor(df)
plt.show()

# scatter plot- Scatterplots show many points plotted in the Cartesian plane. Each point represents the values of two variables. One variable is chosen in the horizontal axis and another in the vertical axis
df = pd.DataFrame(np.random.rand(50, 4), columns=['a', 'b', 'c', 'd'])
df.plot.scatter(x='a', y='b')

#bubble chart-Bubble charts display data as a cluster of circles. The required data to create bubble chart needs to have the xy coordinates, size of the bubble and the colour of the bubbles. The colours can be supplied by the library itself.
x = np.random.rand(40)
y = np.random.rand(40)
z = np.random.rand(40)
colors = np.random.rand(40)

plt.scatter(x, y, s=z*1000,c=colors)
plt.show()

# histogram chart

population_age = [22,55,62,45,21,22,34,42,42,4,2,102,95,85,55,110,120,70,65,55,111,115,80,75,65,54,44,43,42,48]
bins = [0,10,20,30,40,50,60,70,80,90,100]
plt.hist(population_age, bins, histtype='bar', rwidth=0.8)
plt.xlabel('age groups')
plt.ylabel('Number of people')
plt.title('Histogram')
plt.show()

# area plot
days = [1, 2, 3, 4, 5]
sleeping = [7, 8, 6, 11, 7]
eating = [2, 3, 4, 3, 2]
working = [7, 8, 7, 2, 2]
playing = [8, 5, 7, 8, 13]

plt.plot([], [], color='m', label='Sleeping', linewidth=5)
plt.plot([], [], color='c', label='Eating', linewidth=5)
plt.plot([], [], color='r', label='Working', linewidth=5)
plt.plot([], [], color='k', label='Playing', linewidth=5)

plt.stackplot(days, sleeping, eating, working, playing, colors=['m', 'c', 'r', 'k'])

plt.xlabel('x')
plt.ylabel('y')
plt.title('Stack Plot')
plt.legend()
plt.show()

# pie chart
days = [1, 2, 3, 4, 5]

sleeping = [7, 8, 6, 11, 7]
eating = [2, 3, 4, 3, 2]
working = [7, 8, 7, 2, 2]
playing = [8, 5, 7, 8, 13]
slices = [7, 2, 2, 13]
activities = ['sleeping', 'eating', 'working', 'playing']
cols = ['c', 'm', 'r', 'b']

plt.pie(slices,
        labels=activities,
        colors=cols,
        startangle=90,
        shadow=True,
        explode=(0, 0.1, 0, 0),
        autopct='%1.1f%%')

plt.title('Pie Plot')
plt.show()

# multiple plots _ subplots
def f(t):
    return np.exp(-t) * np.cos(2*np.pi*t)
t1 = np.arange(0.0, 5.0, 0.1)
t2 = np.arange(0.0, 5.0, 0.02)
plt.subplot(221)
plt.plot(t1, f(t1), 'bo', t2, f(t2))
plt.subplot(222)
plt.plot(t2, np.cos(2*np.pi*t2))
plt.show()



from mpl_toolkits.mplot3d import axes3d
# 3D charts
chart = plt.figure()
chart3d = chart.add_subplot(111, projection='3d')

# Create some test data.
X, Y, Z = axes3d.get_test_data(0.08)

# Plot a wireframe.
chart3d.plot_wireframe(X, Y, Z, color='r',rstride=15, cstride=10)
plt.show()

# tme series from get details from csv file
data = pd.read_csv('path_to_file/stock.csv')
df = pd.DataFrame(data, columns = ['ValueDate', 'Price'])

# Set the Date as Index
df['ValueDate'] = pd.to_datetime(df['ValueDate'])
df.index = df['ValueDate']
del df['ValueDate']


df.plot(figsize=(15, 6))
plt.show()


# geogrphical data
import cartopy.crs as ccrs

fig = plt.figure(figsize=(15, 10))
ax = fig.add_subplot(1, 1, 1, projection=ccrs.PlateCarree())

    # make the map global rather than have it zoom in to
    # the extents of any plotted data

ax.set_extent((60, 150, 55, -25))

ax.stock_img()
ax.coastlines()

ax.tissot(facecolor='purple', alpha=0.8)

plt.show()








