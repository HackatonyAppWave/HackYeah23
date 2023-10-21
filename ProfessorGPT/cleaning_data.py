import pandas as pd
import os

df = pd.read_csv("db.csv")
print(len(df["tekst"]))
new_data = {"tekst": [], "kierunek": [], "link": [], "uczelnia": []}

for idx, row in df.iterrows():
    text = row["tekst"].strip()
    major = row["kierunek"].strip()
    uni = row["uczelnia"].strip()
    link= row["link"].strip()

    chunks = [x.strip() for x in text.split("\n\n\n") if x.strip()]
    new_data["tekst"] += chunks

    for _ in range(len(chunks)):
        new_data["kierunek"].append(major)
        new_data["link"].append(link)
        new_data["uczelnia"].append(uni)

print(len(new_data["tekst"]))
pd.DataFrame(new_data).to_csv("cleaned_db.csv", index=False)