import requests
import bs4

#Make a simple GET request (just fetching a page)
# r=requests.get("https://blog.hartleybrody.com/web-scraping-cheat-sheet/")
# print(r.text)

#Make a POST requests (usually used when sending information to the server like submitting a form)
# r=requests.post("http://google.com",data=dict("hiiii"))

#Pass query arguments aka URL parameters (usually used when making a search query or paging through results)
# r=requests.get("http://example.com/page",params=dict(query="web scraping",page=2))

from requests import get
url = 'http://www.imdb.com/search/title?release_date=2017&sort=num_votes,desc&page=1'
response = get(url)
print(response.text[:500])
html_soup = BeautifulSoup(response.text, 'html.parser')
movie_containers = html_soup.find_all('div', class_ = 'lister-item mode-advanced')
print(type(movie_containers))
print(len(movie_containers))


