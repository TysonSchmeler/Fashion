import requests

KUFAR_API = "https://api.kufar.by/search-api/v2/search/rendered-paginated"

params = {
    "lang": "ru",						# язык
    "rgn": "7", 						# регион
    
    "prn": "17000", 					
    									# категория
    									# 17000 - Телефоны и планшеты
    "cat": "17010", 					
    									# подкатегория
    									# 17010 - Мобильные телефоны

    "pb": "5", 							# количество страниц (нужен ли?)
    
    "phm": "v.or:6147", 		
    									# модель
     									# 6148 - iPhone 16 Pro Max
     									# 6147 - iPhone 16 Pro
     									# 6146 - iPhone 16 Plus
     									# 6145 - iPhone 16
     									# 6088 - iPhone 15 Pro Max
     									# 6087 - iPhone 15 Pro
     									# 6086 - iPhone 15 Plus
     									# 6085 - iPhone 15
    
    "prc": "r:200000,300000", 			# стоимость
    
    "size": "100", 						
    									# количество позиций (как вывести все?)

    "sort": "lst.d", 					# сортировка
}

def fetch_kufar_items(max_pages=5):
    results = []

    response = requests.get(KUFAR_API, params=params)
    response.raise_for_status()
    data = response.json()


    items = data.get("ads", [])

    for item in items:
        ad_id = item.get("ad_id")
        url = item.get("ad_link")
        title = item.get("subject")
        price = item.get("price_byn")
        currency = item.get("currency")
        results.append({
            "id": ad_id,
            "url": url,
            "title": title,
            "price": int(price) / 100,
            "currency": currency,
        })

    return results

if __name__ == "__main__":
    ads = fetch_kufar_items(max_pages=3)
    for ad in ads:
        print(f"{ad['title']} — {ad['price']} {ad['currency']}\n{ad['url']}\n")
