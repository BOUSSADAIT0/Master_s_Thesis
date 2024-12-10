import serial
import time
import sys


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
