import pandas as pd


df = pd.read_csv("db.csv")

sum_ = sum([len(t.split(" ")) for t in df["tekst"]])
len_ = len(df["tekst"])
print(sum_)
print(len_)
print(sum_//len_)