from urllib import request
from bs4 import BeautifulSoup
import re
import json


city_list = ['auckland', 'wellington','christchurch',\
             'hamilton', 'nelson','napier' ,'hastings', 'dunedin',\
             'palmerston north', 'rotorua', 'new plymouth', 'whangarei', 'invercargill', 'gisborne']

# city_list = ['wellington']


def obj_dict(obj):
    return obj.__dict__

def get_in_city_index(city_list, lineStrip):
    inIndex = None
    cityIndex = None
    for city in city_list:
        if city in lineStrip:
            cityIndex = lineStrip.index(city)
            inIndex = lineStrip.index("in")
            return inIndex,cityIndex


def get_areas(areas):
    for area in areas:
        return area



def get_pricing(data):
    prices = []
    for line in data:
        prices.append(line.string.replace("$", ""))
    return prices

def get_areas(city):
    file = open("subs_"+city+".txt","r")
    f = file.read().lower().replace(" ", "_")
    file.close()
    return f.split("\n")

cities = list()
json_final = None
for city in city_list:
    areas = get_areas(city)
    areas_list = list()
    for area in areas:
        tendencyURL = "https://mbie3.cwp.govt.nz/rent-bond-and-bills/market-rent/?location=" + area + "&action_doSearchValues=Find+Rent"
        page = request.urlopen(tendencyURL)
        soup = BeautifulSoup(page, "html.parser")
        generalData = soup.find("ul", {"class": "list_semantic list_values"})
        if generalData:
            d = generalData.findAll("span", {"class": "price"})
        else:
            continue
        prices = get_pricing(d)
        area_obj = {'name': area, 'bond': prices[0], 'lower': prices[1], 'median': prices[2], 'upper': prices[3]}
        areas_list.append(area_obj)
    city_obj = {'name': city,'areas': areas_list}
    cities.append(city_obj)

jsonFile = open('data.json', 'w')
# json_final = set()
# json_final.add(cities)
json.dump(cities, jsonFile)

jsonFile.close()
