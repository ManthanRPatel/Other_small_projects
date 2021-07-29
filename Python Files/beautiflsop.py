#"""
import bs4
import requests


url="https://www.w3schools.com/python/python_mysql_join.asp"
data = requests.get(url)
soup = bs4.BeautifulSoup(data.text,'html.parser')
# soup = bs4.BeautifulSoup(html_doc,'html.parser')
print(soup.prettify())


# for para in soup.find('p'):
#    print(para)
# for i in soup.find_all('p'):
#     print(i.text)
#
# for link in soup.find_all('a'):
#     links = link.get('href')
#     if links[:3]=="../" and links!="#":
#         print("https://www.tutorialspoint.com"+links[2:len(links)])
#
#     elif links[0]=="/" and links!="#":
#         print("https://www.tutorialspoint.com"+links)
#
#     elif links!="#":
#         print(links)


# url2="https://www.youtube.com/user/tseries"
# data=requests.get(url2)
# soup=bs4.BeautifulSoup(data.text,'html.parser')
# for link in soup.find_all('a'):
#     link=link.get("href")
#     if link[0:3]=="/wa":
#         print("https://www.youtube.com/user/tseries"+link)


#"""