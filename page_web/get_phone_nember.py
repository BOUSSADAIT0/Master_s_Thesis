from pymongo import MongoClient
from datetime import datetime
import locale

current_time = datetime.today().strftime('%A')
# print(current_time)

# Access date and time components
# current_date = datetime.date.today()
# print(current_date)

def get_today_phone_numbers():
    # Définir la localisation en français pour obtenir le jour en français
    locale.setlocale(locale.LC_TIME, 'fr_FR.UTF-8')

    # Récupérer le jour d'aujourd'hui en français
    today = datetime.today().strftime('%A')
    # print(today)

    # Connecter à la base de données MongoDB
    client = MongoClient('mongodb://localhost:27017/')  # Remplacez par l'URL de connexion de votre base de données
    db = client['hopital']  # Remplacez par le nom de votre base de données
    collection = db['medecins']  # Remplacez par le nom de votre collection

    # Rechercher les numéros de téléphone des médecins dont le service correspond au jour d'aujourd'hui
    results = collection.find({'service': today}, {'_id': 0, 'phone': 1})

    # Extraire et retourner les numéros de téléphone
    phone_numbers = [result['phone'] for result in results]
    return phone_numbers

