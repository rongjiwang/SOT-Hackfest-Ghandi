from urllib import request
from bs4 import BeautifulSoup
import re

def get_in_city_index(city_list, lineStrip):
    inIndex = None
    cityIndex = None
    for city in city_list:
        print(lineStrip)
        if city in lineStrip:
            cityIndex = lineStrip.index(city)
            inIndex = lineStrip.index("in")
            return inIndex,cityIndex


def get_areas(areas):
    for area in areas:
        return area

city_list = ['auckland', 'wellington','christchurch',\
             'hamilton', 'nelson','napier' ,'hastings', 'dunedin',\
             'palmerston north', 'rotorua', 'new plymouth', 'whangarei', 'invercargill', 'gisborne', 'whanganui']

sub_list_auckland = ['Royal Oak', '']

for c in city_list:
    f = open("subs_"+c+".txt","r")
    for sub in f.split(","):
        tendencyURL = "https://www.tenancy.govt.nz/rent-bond-and-bills/market-rent/?location=newlands&period=60&action_doSearchValues=Find+Rent"


        page = request.urlopen(tendencyURL)

        soup = BeautifulSoup(page, "html.parser")

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
        print(areas)

        generalData = soup.find("ul", { "class" : "list_semantic list_values" })
        allTables = soup.findAll("table")


        prices = list()
for line in generalData.findAll("span"):
    prices.append(line.string.replace("$",""))
print(prices)
