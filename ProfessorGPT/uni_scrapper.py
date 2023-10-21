import requests
from bs4 import BeautifulSoup
from urllib.request import urlopen
import pandas as pd
import re

table = {"tekst": [], "uczelnia": [], "kierunek": [], "link": []}

def main():
    ofertaASP()
    ofertaWUM()
    ofertaPL()
    ofertaUJ()
    print(pd.DataFrame(table))
    df = pd.DataFrame(table).to_csv("db.csv")

def scrapper(url):
    r = requests.get(url)
    s = BeautifulSoup(r.text, "html.parser")
    return s.text

def addToTable(tekst, uczelnia, kierunek, link):
    table["tekst"].append(tekst)
    table["uczelnia"].append(uczelnia)
    table["kierunek"].append(kierunek)
    table["link"].append(link)

def ofertaPL():
    url = urlopen("https://rekrutacja.p.lodz.pl/pl/lista-kierunkow-0")
    s = BeautifulSoup(url.read(), 'html.parser')

    links = []
    names = []

    tds = s.find_all("td")
    for td in tds:
        course = td.find_all("a")
        if len(course) == 1:
            links.append(course[0].get("href"))
            names.append(course[0].contents[0].text)

    for course in zip(names, links):
        addToTable(scrapper(course[1]), "Politechnika Łódzka", course[0], course[1])

def ofertaUJ():
    url = urlopen("https://studia.uj.edu.pl/kierunki/wydzialy")
    s = BeautifulSoup(url.read(), "html.parser")

    names = []
    links = []

    regex = "/kierunki/[A-Za-z]+/"

    lis = s.find_all("li")
    for li in lis:
        course = li.find_all("a")
        if len(course) == 1:
            link = course[0].get("href")
            if re.search(regex, link) is not None:
                links.append("https://studia.uj.edu.pl/" + link)
                names.append(course[0].contents[0].text)

    for course in zip(names, links):
        addToTable(scrapper(course[1]), "Uniwersytet Jagielloński", course[0], course[1])

def ofertaASP():
    url = urlopen("https://www.asp.lodz.pl/index.php/pl/rekrutacja-kierunki-studiow")
    s = BeautifulSoup(url.read(), "html.parser")

    names = []
    links = []

    h2s = s.find_all("h2")

    for h2 in h2s:
        course = h2.find_all("a")
        if len(course) == 1:
            links.append("https://www.asp.lodz.pl" + course[0].get("href"))
            name = course[0].contents[0].text
            name = name[name.find(":") + 2 :]
            name = name[: name.find("\t")]
            names.append(name)
    
    for course in zip(names, links):
        addToTable(scrapper(course[1]), "Akademia Sztuk Pięknych im. Władysława Strzemińskiego", course[0], course[1])

def ofertaWUM():
    url = urlopen("https://www.wum.edu.pl/kierunki-studiow?field_rodzaj_value=All")
    s = BeautifulSoup(url.read(), 'html.parser')

    names = []
    links = []

    spans = s.find_all("span", class_="field-content")
    for span in spans:
        course = span.find_all("a")
        if len(course) == 1:
            link = course[0].get("href")
            if link[-1] == '0' or link[-1] == '1':
                continue
            links.append("https://www.wum.edu.pl" + link)
    
    h3s = s.find_all("h3", class_="js-views-accordion-group-header")
    for h3 in h3s:
        name = h3.contents[0].text.lower()
        names.append(name)

    for course in zip(names, links):
        addToTable(scrapper(course[1]), "Warszawski Uniwersytet Medyczny", course[0], course[1])


if __name__ == "__main__":
    main()