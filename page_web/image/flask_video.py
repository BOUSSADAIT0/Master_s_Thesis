from flask import Flask, render_template
from pymongo import MongoClient
import base64

app = Flask(__name__)

# Connexion à MongoDB
mongo_client = MongoClient('mongodb://localhost:27017/')
db = mongo_client["hopital"]
collection = db["video"]

def get_images():
    images = collection.find()
    image_data = []
    for image_document in images:
        image_bytes = image_document["image"]
        timestamp = image_document["timestamp"]

        # Convert bytes to base64 string
        image_base64 = base64.b64encode(image_bytes).decode('utf-8')
        image_data.append({'timestamp': timestamp, 'image_base64': image_base64})

    return image_data

@app.route('/')
def index():
    images = get_images()
    return render_template('index.html', images=images)

if __name__ == '__main__':
    app.run(debug=True, port=5005)
