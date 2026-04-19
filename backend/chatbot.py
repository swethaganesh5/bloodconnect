from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import Chroma
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import PyPDFLoader
import os

CHROMA_PATH = "chroma_db"

embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)

def load_documents(pdf_path: str):
    loader = PyPDFLoader(pdf_path)
    documents = loader.load()
    splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
    chunks = splitter.split_documents(documents)
    db = Chroma.from_documents(chunks, embeddings, persist_directory=CHROMA_PATH)
    db.persist()
    return len(chunks)

def ask_question(question: str):
    if not os.path.exists(CHROMA_PATH):
        return "No documents loaded yet. Please upload a medical PDF first."
    
    db = Chroma(persist_directory=CHROMA_PATH, embedding_function=embeddings)
    docs = db.similarity_search(question, k=3)
    
    if not docs:
        return "I couldn't find relevant information in the uploaded documents."
    
    context = "\n\n".join([d.page_content for d in docs])
    
    return {
        "answer": f"Based on verified medical documents:\n\n{context}",
        "sources": [d.metadata.get("source", "Medical Document") for d in docs][:2]
    }