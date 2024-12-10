import serial
import time
import sys

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


# Configuration du port série
arduino_port = "COM6"  # Remplacez par le port série utilisé par votre Arduino
baud_rate = 9600  # Doit correspondre à la vitesse de transmission de l'Arduino

def send_order(phone_number, message):
    ser = None
    try:
        # Création de l'objet série
        ser = serial.Serial(arduino_port, baud_rate, timeout=1)
        
        # Attendre que le port série soit prêt
        time.sleep(2)
        
        # Vider le buffer d'entrée
        ser.reset_input_buffer()
        
        # Formater l'ordre
        order = f"{phone_number};{message}\n"
        print(f"Sending order: {order}")
        
        # Envoyer l'ordre
        ser.write(order.encode())

        # Lire les réponses de l'Arduino
        end_time = time.time() + 10  # Limite de temps pour la lecture des réponses
        while time.time() < end_time:
            if ser.in_waiting > 0:
                response = ser.readline().decode('utf-8').strip()
                if response:
                    print(f"Arduino response: {response}")

    except serial.SerialException as e:
        print(f"Error opening/using serial port: {e}")
    finally:
        if ser and ser.is_open:
            ser.close()  # Fermer le port série

if __name__ == "__main__":
    # Exemple d'utilisation
    if len(sys.argv) != 3:
        exit(-1)
    phone_number = sys.argv[1]
    bed = int(sys.argv[2])
    message = f"anomalie dans le lit : {bed}"
    
    #send_order(phone_number, message)
