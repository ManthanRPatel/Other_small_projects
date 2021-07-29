import requests


req=requests.get('http://www.edureka.co/')
print(req.encoding,'',req.history,'',req.status_code,'',req.url)  # returns 'utf-8'
req.elapsed  # returns datetime.timedelta(0, 1, 666890)
req.url  # returns 'https://edureka.co/'# returns [&lt;Response [301]&gt;, &lt;Response [301]&gt;]
req.headers['Content-Type']

# query = {'q': 'Forest', 'order': 'popular', 'min_width': '800', 'min_height': '600'}
# req = requests.get('https://pixabay.com/en/photos/', params=query)
# print(req.url)
# returns 'text/html; charset=utf-8'

# req = requests.post('https://en.wikipedia.org/w/index.php', data = {'search':'Nanotechnology'})
# req.raise_for_status()
# with open('Nanotechnology.html', 'wb') as fd:
#     for chunk in req.iter_content(chunk_size=50000):
#         fd.write(chunk)