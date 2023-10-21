from langchain.prompts import PromptTemplate
from langchain.llms import OpenAI
from langchain.chains import LLMChain
from dotenv import load_dotenv
import pandas as pd
import pickle
import json
import urllib.parse
import requests
from bs4 import BeautifulSoup
import os 
import openai

api_key = "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"

openai.api_key = api_key


dir_path = os.path.dirname(os.path.realpath(__file__))


class ProfessorGPT:
    def __init__(self) -> None:
        load_dotenv()

        # os.environ["OPENAI_API_KEY"] = 
        self.llm = OpenAI(temperature=0, openai_api_key= "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")
        self.load_database()
        self.data = pd.read_csv(os.path.join(dir_path,"cleaned_db.csv"))

    def load_database(self):
        with open(os.path.join(dir_path,"db.bin"), 'rb') as f:
            self.db = pickle.load(f)

    def get_chain(self, prompt_template, input_variables):
        return LLMChain(
            llm=self.llm,
            prompt=PromptTemplate(template=prompt_template, input_variables=input_variables)
        )

    def create_user_profile(self, qna: list) -> str:
        prompt_template = "Stwórz opis użytkownika na podstawie pytań i odpowiedzi:\n {qna}?"
        str_qna = ""
        for q, a in qna:
            str_qna += f"{q}\n"
            str_qna += f"{a}\n\n"
        chain = self.get_chain(prompt_template, input_variables=['qna'])
        return chain(str_qna)
    
    def get_docs(self, query: str, k:int = 4) -> list[dict]:
        docs = self.db.similarity_search(query, k=k)
        doc_objs = [doc.dict() for doc in docs]
        return doc_objs
    
    def get_universities(self, doc_objs):
        universities = []
        for doc_obj in doc_objs:
            url = self.data.iloc[doc_obj["metadata"]["row"]]["uczelnia"]
            universities.append(url)
        return universities
    
    def get_references(self, doc_objs):
        urls = []
        for doc_obj in doc_objs:
            url = self.data.iloc[doc_obj["metadata"]["row"]]["link"]
            urls.append(url)
        return urls
    
    def get_majors(self, doc_objs):
        urls = []
        for doc_obj in doc_objs:
            url = self.data.iloc[doc_obj["metadata"]["row"]]["kierunek"]
            urls.append(url)
        return urls
    
    def get_contents(self, doc_objs):
        contents = []
        for doc_obj in doc_objs:
            contents.append(doc_obj["page_content"])
        return contents

    def gold_shot(self, qna):
        prompt_template = "Na podstawie poniższego profilu użytkownika oraz poniższego tekstu zaproponuj kierunki studiów dla użytkownika.\nProfil:\n{profile}\nTekst:{text}"

        user_profile = self.create_user_profile(qna)
        docs = self.get_docs(user_profile)
        contents = self.get_contents(docs)
        majors = self.get_majors(docs)
        references = self.get_references(docs)

        chain = self.get_chain(prompt_template, input_variables=["profile", "text"])
        
        response = chain.run({"profile": user_profile, "text": "\n".join(contents)})
        linked_majors = {major: link for major, link in zip(majors, references)}

        return response, linked_majors
    
    def get_job_titles(self, description):
        prompt_template = "Na podstawie zaproponowanego kierunku studiów, wygeneruj 3 stanowiska pracy po studiach użytkownika. Zwróć to w postaci JSON o schemacie: {{'job_titles': [] }}.\nZaproponowany kierunek studiów wraz z opisem:\n{description}\nJSON:"
        
        chain = self.get_chain(prompt_template, ["description"])
        response = chain.run(description=description)
        
        try:
            obj = json.loads(response.replace("'", '"'))
            return obj["job_titles"]
        except:
            return []
        
    def get_linked_job_offers(self, description):
        linked_job_offers = {}
        job_offers = self.get_job_titles(description)
        pracuj_prefix = "https://www.pracuj.pl/praca/"
        for job_offer in job_offers:
            url = urllib.parse.quote(job_offer)
            url = pracuj_prefix + url + ";kw"

            s = requests.get(url)
            bs = BeautifulSoup(s.text)
            if "a to pech" in bs.text.lower():
                continue
            linked_job_offers = {**linked_job_offers,job_offer: url}
        return linked_job_offers
    
    
    def generate_on_interests(self, interests):
        prompt_template = "Jesteś asystentem AI, który ma doradzić absolwentom liceum kierunki studiów na podstawie zainteresowań użytkownika oraz poniższego tekstu. Zaproponuj kierunki studiów najlepiej pasujące dla niego. Nie podawaj linku. \Zainteresowania:\n{interests}\nTekst:{text}"

        chain = self.get_chain(prompt_template, ["interests", "text"])

        docs = self.get_docs(interests)
        contents = self.get_contents(docs)
        majors = self.get_majors(docs)
        references = self.get_references(docs)
        
        response = chain.run(interests=interests, text= "\n".join(contents))
        linked_majors = {major: link for major, link in zip(majors, references)}
        linked_job_offers = self.get_linked_job_offers(response)

        return response, linked_majors, linked_job_offers
    


if __name__ == "__main__":
    gpt = ProfessorGPT()
    interests = "Lubie nauki scisle. Nie lubie ludzi. Wole siedziec przed komputerem. Lubie gry"
    response, linked_majors, linked_job_offers = gpt.generate_on_interests(interests)
    print(response)
    print(linked_majors)
    print(linked_job_offers)
    docs = gpt.get_docs(interests)
