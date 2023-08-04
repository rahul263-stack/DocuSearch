from os import getenv
from dotenv import load_dotenv

from pymilvus import connections, utility

load_dotenv()

milvus_host = getenv("MILVUS_HOST")
milvus_port = getenv("MILVUS_PORT")

connections.connect(host=milvus_host,port=milvus_port)

utility.list_collections()

#utility.drop_collection('LangChainCollection')