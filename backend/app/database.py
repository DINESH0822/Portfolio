import logging
import uuid
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure, ConfigurationError
from app.config import settings

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("Database")

# A lightweight in-memory fallback for MongoDB operations
class MockCollection:
    def __init__(self, name):
        self.name = name
        self._data = {}

    def find(self, filter_query=None):
        results = []
        for doc in self._data.values():
            match = True
            if filter_query:
                for k, v in filter_query.items():
                    if k == "_id":
                        if isinstance(v, dict) and "$in" in v:
                            if doc.get("_id") not in v["$in"]:
                                match = False
                                break
                        elif doc.get("_id") != str(v):
                            match = False
                            break
                    elif doc.get(k) != v:
                        match = False
                        break
            if match:
                results.append(doc.copy())
        return results

    def find_one(self, filter_query):
        results = self.find(filter_query)
        return results[0] if results else None

    def insert_one(self, document):
        doc = document.copy()
        if "_id" not in doc:
            doc["_id"] = str(uuid.uuid4())
        else:
            doc["_id"] = str(doc["_id"])
        self._data[doc["_id"]] = doc
        
        class InsertResult:
            inserted_id = doc["_id"]
        return InsertResult()

    def update_one(self, filter_query, update_dict):
        doc = self.find_one(filter_query)
        if doc:
            # We must update the actual stored document
            stored_doc = self._data[doc["_id"]]
            set_data = update_dict.get("$set", {})
            for k, v in set_data.items():
                stored_doc[k] = v
            class UpdateResult:
                modified_count = 1
            return UpdateResult()
        class UpdateResult:
            modified_count = 0
        return UpdateResult()

    def delete_one(self, filter_query):
        doc = self.find_one(filter_query)
        if doc and doc["_id"] in self._data:
            del self._data[doc["_id"]]
            class DeleteResult:
                deleted_count = 1
            return DeleteResult()
        class DeleteResult:
            deleted_count = 0
        return DeleteResult()

    def count_documents(self, filter_query=None):
        return len(self.find(filter_query))

class MockDatabase:
    def __init__(self):
        self._collections = {}

    def __getitem__(self, name):
        if name not in self._collections:
            self._collections[name] = MockCollection(name)
        return self._collections[name]

# Initialize Database Connection
client = None
db = None
is_mock = False

if not settings.mongodb_uri:
    logger.warning("MONGODB_URI not set. Falling back to in-memory Mock Database.")
    db = MockDatabase()
    is_mock = True
else:
    try:
        # Connect to MongoDB Atlas
        client = MongoClient(settings.mongodb_uri, serverSelectionTimeoutMS=5000)
        # Verify connection
        client.admin.command('ping')
        db = client[settings.db_name]
        logger.info(f"Successfully connected to MongoDB Atlas database: {settings.db_name}")
    except (ConnectionFailure, ConfigurationError) as e:
        logger.error(f"Could not connect to MongoDB Atlas ({e}). Falling back to in-memory Mock Database.")
        db = MockDatabase()
        is_mock = True

def get_db():
    return db

def get_db_status():
    return {
        "status": "connected" if not is_mock else "mock_fallback",
        "database": settings.db_name if not is_mock else "in_memory_mock",
        "is_mock": is_mock
    }
