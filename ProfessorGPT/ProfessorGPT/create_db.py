from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.vectorstores import FAISS
from langchain.document_loaders import CSVLoader
# from langchain.embeddings import HuggingFaceInstructEmbeddingss
from dotenv import load_dotenv
import pickle
import os
from langchain.text_splitter import CharacterTextSplitter

load_dotenv()


embeddings = OpenAIEmbeddings()

loader = CSVLoader("cleaned_db.csv")
documents = loader.load()
text_splitter = CharacterTextSplitter(separator = '\n\n\n',chunk_size=1000, chunk_overlap=200)
docs = text_splitter.split_documents(documents)
db = FAISS.from_documents(documents, embeddings)

with open(f'db.bin', 'wb') as f:
  pickle.dump(db, f)
db.save_local(f"faiss_index")


# DB_PATH = "cleaned_db"

# db_files = os.listdir(DB_PATH)
# embeddings = OpenAIEmbeddings()

# db_file = db_files[0]

# loader = CSVLoader(os.path.join(DB_PATH, db_file))
# documents = loader.load()
# db = FAISS.from_documents(documents, embeddings)

# with open(f'db/{db_file}.bin', 'wb') as f:
#   pickle.dump(db, f)
# db.save_local(f"faiss_indexes/{db_file}")


# for idx, db_file in enumerate(db_files[1:]):
#   loader = CSVLoader(os.path.join(DB_PATH, db_file))
#   documents = loader.load()
#   new_db = FAISS.from_documents(documents, embeddings)

#   with open(f'db/{db_file}.bin', 'wb') as f:
#     pickle.dump(new_db, f)
#   new_db.save_local(f"faiss_indexes/{db_file}")

#   db.merge_from(new_db)

# with open(f'db.bin', 'wb') as f:
#   pickle.dump(db, f)
# db.save_local(f"faiss_index")




# # with open('db.bin', 'rb') as f:
# #     db = pickle.load(f)
 
# # query = "W przyszlosci chcialbym stosowac aparature medyczna."
# # docs = new_db.similarity_search(query)

# # print(print(docs[0].dict()))