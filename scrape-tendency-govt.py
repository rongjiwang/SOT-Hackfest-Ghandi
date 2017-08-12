from urllib import request
from bs4 import BeautifulSoup
import re
import json


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

city_list = ['auckland', 'wellington','christchurch',\
             'hamilton', 'nelson','napier' ,'hastings', 'dunedin',\
             'palmerston north', 'rotorua', 'new plymouth', 'whangarei', 'invercargill', 'gisborne']

sub_list_auckland = ['Royal Oak', '']
visited = set()
data = ""


data += "{"
for c in city_list:
    print(data)
    data += "["
    data += "city: ".format(c)
    data += "{"
    data += "name : " + c


    f = open("subs_"+c+".txt","r")
    file = f.read()

    for sub in re.sub("\W+", " ", file).split(" "):
        tendencyURL = "https://www.tenancy.govt.nz/rent-bond-and-bills/market-rent/?location="+c+"&period=60&action_doSearchValues=Find+Rent"


        page = request.urlopen(tendencyURL)
        soup = BeautifulSoup(page, "html.parser")
        generalData = soup.find("ul", {"class": "list_semantic list_values"})
        allH3 = soup.findAll("h3")

        areas = list()
        for line in allH3:
            cleanLine = re.sub('\W+', ' ', str(line).lower())
            lineSplit = cleanLine.split(" ")
            for city in city_list:
                if city in lineSplit:
                    cityIndex = lineSplit.index(city)
                    inIndex = lineSplit.index("in") + 1
                    areas = lineSplit[inIndex: cityIndex]
                    break

        if areas != [] and str(areas) not in visited:
            data += "{areas: ["
            prices = list()
            for line in generalData.findAll("span"):
                prices.append(line.string.replace("$", ""))
            for area in areas:
                data += "{"
                data += "name : {0}" \
                       "bonds : {1}," \
                       "lower: {2}," \
                       "median: {3}," \
                       "upper: {4}".format(area,prices[0],prices[1],prices[2],prices[3])
                data +=  "},"
                data += "],"
            data += "},"
            visited.add(str(areas))
    data += "],"
data += "}"



jsonFile = open('data.json', 'w')
json.dump(data, jsonFile, ensure_ascii=False)
jsonFile.close()
