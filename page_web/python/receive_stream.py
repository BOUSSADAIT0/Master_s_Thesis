# import asyncio
# import websockets
# import numpy as np
# from io import BytesIO
# from PIL import Image, UnidentifiedImageError
# from ultralytics import YOLO
# import cv2

# # Charger le modèle YOLOv8
# model = YOLO('C:/Users/dell/OneDrive/Bureau/mastere2/projet_fin_etude/runs/detect/train9/weights/best.pt')

# def is_valid_image(image_bytes):
#     try:
#         Image.open(BytesIO(image_bytes))
#         return True
#     except UnidentifiedImageError:
#         print("Image invalid")
#         return False

# def draw_boxes(image, results):
#     for result in results.xyxy[0].numpy():
#         x1, y1, x2, y2, conf, cls = result
#         image = cv2.rectangle(image, (int(x1), int(y1)), (int(x2), int(y2)), (0, 255, 0), 2)
#         label = f"{model.names[int(cls)]} {conf:.2f}"
#         image = cv2.putText(image, label, (int(x1), int(y1) - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)
#     return image

# async def handle_connection(websocket, path):
#     while True:
#         try:
#             message = await websocket.recv()
#             print(f"Received message of length: {len(message)}")
#             if len(message) > 5000:
#                 if is_valid_image(message):
#                     image = Image.open(BytesIO(message))
#                     image_np = np.array(image)

#                     # Convert RGB to BGR format for OpenCV
#                     image_np = cv2.cvtColor(image_np, cv2.COLOR_RGB2BGR)

#                     # Apply YOLOv8 model to the image
#                     results = model(image_np)

#                     # Process the results
#                     processed_image = draw_boxes(image_np, results)

#                     # Convert BGR back to RGB format for saving
#                     processed_image = cv2.cvtColor(processed_image, cv2.COLOR_BGR2RGB)
#                     processed_image_pil = Image.fromarray(processed_image)

#                     # Save the processed image
#                     processed_image_pil.save("image.jpg")
#                     print("Processed image saved as image.jpg")

#         except websockets.exceptions.ConnectionClosed:
#             print("Connection closed")
#             break

# async def main():
#     server = await websockets.serve(handle_connection, '0.0.0.0', 3001)
#     print("Server started")
#     await server.wait_closed()

# asyncio.run(main())

####################################################################################################################



# import asyncio
# import websockets
# import numpy as np
# from io import BytesIO
# from PIL import Image, UnidentifiedImageError
# from ultralytics import YOLO
# import cv2

# # Charger le modèle YOLOv8
# model = YOLO('C:/Users/dell/OneDrive/Bureau/mastere2/projet_fin_etude/runs/detect/train8/weights/best.pt')

# def is_valid_image(image_bytes):
#     try:
#         Image.open(BytesIO(image_bytes))
#         return True
#     except UnidentifiedImageError:
#         print("Image invalid")
#         return False

# def draw_boxes(image, results):
#     for result in results:
#         boxes = result.boxes.xyxy.numpy()  # Get the bounding boxes
#         confs = result.boxes.conf.numpy()  # Get the confidences
#         classes = result.boxes.cls.numpy()  # Get the class labels

#         for box, conf, cls in zip(boxes, confs, classes):
#             x1, y1, x2, y2 = box
#             image = cv2.rectangle(image, (int(x1), int(y1)), (int(x2), int(y2)), (0, 255, 0), 2)
#             label = f"{model.names[int(cls)]} {conf:.2f}"
#             image = cv2.putText(image, label, (int(x1), int(y1) - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)
#     return image

# async def handle_connection(websocket, path):
#     while True:
#         try:
#             message = await websocket.recv()
#             print(f"Received message of length: {len(message)}")
#             if len(message) > 5000:
#                 if is_valid_image(message):
#                     image = Image.open(BytesIO(message))
#                     image_np = np.array(image)

#                     # Convert RGB to BGR format for OpenCV
#                     image_np = cv2.cvtColor(image_np, cv2.COLOR_RGB2BGR)

#                     # Apply YOLOv8 model to the image
#                     results = model(image_np)

#                     # Process the results
#                     processed_image = draw_boxes(image_np, results)

#                     # Convert BGR back to RGB format for saving
#                     processed_image = cv2.cvtColor(processed_image, cv2.COLOR_BGR2RGB)
#                     processed_image_pil = Image.fromarray(processed_image)

#                     # Save the processed image
#                     processed_image_pil.save("image.jpg")
#                     print("Processed image saved as image.jpg")

#                     # Show the processed image
#                     cv2.imshow('Processed Frame', processed_image)
#                     if cv2.waitKey(1) & 0xFF == ord('q'):
#                         break

#         except websockets.exceptions.ConnectionClosed:
#             print("Connection closed")
#             break

# async def main():
#     server = await websockets.serve(handle_connection, '0.0.0.0', 3001)
#     print("Server started")
#     await server.wait_closed()

# asyncio.run(main())


#####################################################################################################


# import asyncio
# import websockets
# import numpy as np
# from io import BytesIO
# from PIL import Image, UnidentifiedImageError
# from ultralytics import YOLO
# import cv2

# # Charger le modèle YOLOv8
# model = YOLO('C:/Users/dell/OneDrive/Bureau/mastere2/projet_fin_etude/runs/detect/train12sleepingposition/weights/best.pt')

# def is_valid_image(image_bytes):
#     try:
#         Image.open(BytesIO(image_bytes))
#         return True
#     except UnidentifiedImageError:
#         print("Image invalid")
#         return False

# def draw_boxes(image, results):
#     for result in results:
#         boxes = result.boxes.xyxy.numpy()  # Get the bounding boxes
#         confs = result.boxes.conf.numpy()  # Get les confidences
#         classes = result.boxes.cls.numpy()  # Get les labels de classes

#         for box, conf, cls in zip(boxes, confs, classes):
#             x1, y1, x2, y2 = box
#             image = cv2.rectangle(image, (int(x1), int(y1)), (int(x2), int(y2)), (0, 255, 0), 2)
#             label = f"{model.names[int(cls)]} {conf:.2f}"
#             image = cv2.putText(image, label, (int(x1), int(y1) - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)
#     return image

# async def handle_connection(websocket, path):
#     # Paramètres de l'algorithme de détection de mouvement
#     kernel_blur = 31  # Utiliser un nombre impair
#     seuil = 30
#     surface = 1000

#     # Variables de référence pour la détection de mouvement
#     originale = None
#     kernel_dilate = np.ones((5, 5), np.uint8)

#     try:
#         while True:
#             try:
#                 message = await websocket.recv()
#                 print(f"Received message of length: {len(message)}")

#                 if len(message) > 5000 and is_valid_image(message):
#                     image = Image.open(BytesIO(message))
#                     image_np = np.array(image)

#                     # Convert RGB to BGR format for OpenCV
#                     image_np = cv2.cvtColor(image_np, cv2.COLOR_RGB2BGR)

#                     # Initialisation de l'image de référence pour la détection de mouvement
#                     if originale is None:
#                         originale = cv2.cvtColor(image_np, cv2.COLOR_BGR2GRAY)
#                         originale = cv2.GaussianBlur(originale, (kernel_blur, kernel_blur), 0)
#                         continue

#                     # Détection de mouvement
#                     gray = cv2.cvtColor(image_np, cv2.COLOR_BGR2GRAY)
#                     gray = cv2.GaussianBlur(gray, (kernel_blur, kernel_blur), 0)
#                     mask = cv2.absdiff(originale, gray)
#                     mask = cv2.threshold(mask, seuil, 255, cv2.THRESH_BINARY)[1]
#                     mask = cv2.dilate(mask, kernel_dilate, iterations=3)
#                     contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

#                     # Dessiner les contours des mouvements détectés
#                     cv2.drawContours(image_np, contours, -1, (0, 255, 0), 2)

#                     # Mise à jour de l'image de référence pour la prochaine itération
#                     originale = gray

#                     # Détection d'objets avec YOLOv8
#                     results = model(image_np)
#                     image_np = draw_boxes(image_np, results)

#                     # Affichage des informations de paramètres sur le cadre
#                     cv2.putText(image_np, f"[o|l]seuil: {seuil}  [p|m]blur: {kernel_blur}  [i|k]surface: {surface}", 
#                                 (10, 30), cv2.FONT_HERSHEY_COMPLEX_SMALL, 1, (0, 255, 255), 2)

#                     # Affichage de la fenêtre unique
#                     cv2.imshow("Détection de Mouvement et d'Objets", image_np)

#                     # Gestion des entrées clavier pour la détection de mouvement
#                     key = cv2.waitKey(1) & 0xFF
#                     if key == ord('q'):
#                         break

#             except websockets.exceptions.ConnectionClosed:
#                 print("Connection closed")
#                 break
#     finally:
#         # Libération des ressources
#         cv2.destroyAllWindows()

# async def main():
#     server = await websockets.serve(handle_connection, '0.0.0.0', 3001)
#     print("Server started")
#     await server.wait_closed()

# asyncio.run(main())

###############################################################################################

# import asyncio
# import websockets
# import numpy as np
# from io import BytesIO
# from PIL import Image, UnidentifiedImageError
# from ultralytics import YOLO
# import cv2
# from pymongo import MongoClient
# import datetime

# # Charger le modèle YOLOv8
# model = YOLO('C:/Users/dell/OneDrive/Bureau/mastere2/projet_fin_etude/runs/detect/train12sleepingposition/weights/best.pt')

# # Connexion à MongoDB
# mongo_client = MongoClient('mongodb://localhost:27017/')
# db = mongo_client["hopital"]
# collection = db["video"]

# def is_valid_image(image_bytes):
#     try:
#         Image.open(BytesIO(image_bytes))
#         return True
#     except UnidentifiedImageError:
#         print("Image invalid")
#         return False

# def draw_boxes(image, results):
#     for result in results:
#         boxes = result.boxes.xyxy.numpy()  # Get the bounding boxes
#         confs = result.boxes.conf.numpy()  # Get les confidences
#         classes = result.boxes.cls.numpy()  # Get les labels de classes

#         for box, conf, cls in zip(boxes, confs, classes):
#             x1, y1, x2, y2 = box
#             image = cv2.rectangle(image, (int(x1), int(y1)), (int(x2), int(y2)), (0, 255, 0), 2)
#             label = f"{model.names[int(cls)]} {conf:.2f}"
#             image = cv2.putText(image, label, (int(x1), int(y1) - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)
#     return image

# def save_image_to_mongodb(image_np, timestamp):
#     _, buffer = cv2.imencode('.jpg', image_np)
#     image_bytes = buffer.tobytes()
    
#     image_document = {
#         "timestamp": timestamp,
#         "image": image_bytes
#     }
    
#     collection.insert_one(image_document)
#     print(f"Image saved to MongoDB at {timestamp}")

# async def handle_connection(websocket, path):
#     # Paramètres de l'algorithme de détection de mouvement
#     kernel_blur = 31  # Utiliser un nombre impair
#     seuil = 30
#     surface = 1000

#     # Variables de référence pour la détection de mouvement
#     originale = None
#     kernel_dilate = np.ones((5, 5), np.uint8)

#     # Compteur d'images pour MongoDB
#     image_counter = 0
#     max_images = 20

#     try:
#         while True:
#             try:
#                 message = await websocket.recv()
#                 print(f"Received message of length: {len(message)}")

#                 if len(message) > 5000 and is_valid_image(message):
#                     image = Image.open(BytesIO(message))
#                     image_np = np.array(image)

#                     # Convert RGB to BGR format for OpenCV
#                     image_np = cv2.cvtColor(image_np, cv2.COLOR_RGB2BGR)

#                     # Initialisation de l'image de référence pour la détection de mouvement
#                     if originale is None:
#                         originale = cv2.cvtColor(image_np, cv2.COLOR_BGR2GRAY)
#                         originale = cv2.GaussianBlur(originale, (kernel_blur, kernel_blur), 0)
#                         continue

#                     # Détection de mouvement
#                     gray = cv2.cvtColor(image_np, cv2.COLOR_BGR2GRAY)
#                     gray = cv2.GaussianBlur(gray, (kernel_blur, kernel_blur), 0)
#                     mask = cv2.absdiff(originale, gray)
#                     mask = cv2.threshold(mask, seuil, 255, cv2.THRESH_BINARY)[1]
#                     mask = cv2.dilate(mask, kernel_dilate, iterations=3)
#                     contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

#                     if len(contours) > 0:
#                         # Save image to MongoDB if movement is detected
#                         timestamp = datetime.datetime.now()
#                         save_image_to_mongodb(image_np, timestamp)
#                         image_counter += 1
#                         # if image_counter >= max_images:
#                         #     print(f"Reached maximum of {max_images} images. Stopping.")
#                         #     break

#                     # Dessiner les contours des mouvements détectés
#                     cv2.drawContours(image_np, contours, -1, (0, 255, 0), 2)

#                     # Mise à jour de l'image de référence pour la prochaine itération
#                     originale = gray

#                     # Détection d'objets avec YOLOv8
#                     results = model(image_np)
#                     image_np = draw_boxes(image_np, results)

#                     # Affichage des informations de paramètres sur le cadre
#                     cv2.putText(image_np, f"[o|l]seuil: {seuil}  [p|m]blur: {kernel_blur}  [i|k]surface: {surface}", 
#                                 (10, 30), cv2.FONT_HERSHEY_COMPLEX_SMALL, 1, (0, 255, 255), 2)

#                     # Affichage de la fenêtre unique
#                     cv2.imshow("Détection de Mouvement et d'Objets", image_np)

#                     # Gestion des entrées clavier pour la détection de mouvement
#                     key = cv2.waitKey(1) & 0xFF
#                     if key == ord('q'):
#                         break

#             except websockets.exceptions.ConnectionClosed:
#                 print("Connection closed")
#                 break
#     finally:
#         # Libération des ressources
#         cv2.destroyAllWindows()

# async def main():
#     server = await websockets.serve(handle_connection, '0.0.0.0', 3001)
#     print("Server started")
#     await server.wait_closed()

# asyncio.run(main())

##################################################################################################################
import asyncio
import websockets
import numpy as np
from io import BytesIO
from PIL import Image, UnidentifiedImageError
from ultralytics import YOLO
import cv2
from pymongo import MongoClient
import datetime
from alert import send_order
from alert import get_today_phone_numbers

# Charger les modèles YOLOv8
model1 = YOLO('C:/Users/dell/OneDrive/Bureau/mastere2/projet_fin_etude/runs/detect/train7/weights/best.pt')
model2 = YOLO('C:/Users/dell/OneDrive/Bureau/mastere2/projet_fin_etude/runs/detect/train13etatpatient/weights/best.pt')

#Connexion à MongoDB
mongo_client = MongoClient('mongodb://localhost:27017/')
db = mongo_client["hopital"]
collection = db["video"]
message_alerte = "Attention un patient a fait une crise convulsive ( les images sont enregistrer) "
phone_number=get_today_phone_numbers()

def is_valid_image(image_bytes):
    try:
        Image.open(BytesIO(image_bytes))
        return True
    except UnidentifiedImageError:
        print("Image invalid")
        return False

def draw_boxes(image, results, model):
    for result in results:
        boxes = result.boxes.xyxy.numpy()  # Get the bounding boxes
        confs = result.boxes.conf.numpy()  # Get les confidences
        classes = result.boxes.cls.numpy()  # Get les labels de classes

        for box, conf, cls in zip(boxes, confs, classes):
            x1, y1, x2, y2 = box
            image = cv2.rectangle(image, (int(x1), int(y1)), (int(x2), int(y2)), (0, 255, 0), 2)
            label = f"{model.names[int(cls)]} {conf:.2f}"
            image = cv2.putText(image, label, (int(x1), int(y1) - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)
    return image

def save_image_to_mongodb(image_np, timestamp):
    _, buffer = cv2.imencode('.jpg', image_np)
    image_bytes = buffer.tobytes()
    
    image_document = {
        "timestamp": timestamp,
        "image": image_bytes
    }
    
    collection.insert_one(image_document)
    print(f"Image saved to MongoDB at {timestamp}")

async def handle_connection(websocket, path):
    # Paramètres de l'algorithme de détection de mouvement
    kernel_blur = 3 # Utiliser un nombre impair
    seuil = 30
    surface = 1000

    # Variables de référence pour la détection de mouvement
    originale = None
    kernel_dilate = np.ones((5, 5), np.uint8)

    # Compteur d'images pour MongoDB
    image_counter = 0
    max_images = 20

    try:
        while True:
            try:
                message = await websocket.recv()
                print(f"Received message of length: {len(message)}")

                if len(message) > 5000 and is_valid_image(message):
                    image = Image.open(BytesIO(message))
                    image_np = np.array(image)

                    # Convert RGB to BGR format for OpenCV
                    image_np = cv2.cvtColor(image_np, cv2.COLOR_RGB2BGR)

                    # Initialisation de l'image de référence pour la détection de mouvement
                    if originale is None:
                        originale = cv2.cvtColor(image_np, cv2.COLOR_BGR2GRAY)
                        originale = cv2.GaussianBlur(originale, (kernel_blur, kernel_blur), 0)
                        continue

                    # Détection de mouvement
                    gray = cv2.cvtColor(image_np, cv2.COLOR_BGR2GRAY)
                    gray = cv2.GaussianBlur(gray, (kernel_blur, kernel_blur), 0)
                    mask = cv2.absdiff(originale, gray)
                    mask = cv2.threshold(mask, seuil, 255, cv2.THRESH_BINARY)[1]
                    mask = cv2.dilate(mask, kernel_dilate, iterations=3)
                    contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

                    # if len(contours) > 0:
                    #     # Save image to MongoDB if movement is detected
                    #     timestamp = datetime.datetime.now()
                    #     save_image_to_mongodb(image_np, timestamp)
                    #     image_counter += 1
                    #     # if image_counter >= max_images:
                    #     #     print(f"Reached maximum of {max_images} images. Stopping.")
                    #     #     break

                    # Dessiner les contours des mouvements détectés
                    cv2.drawContours(image_np, contours, -1, (0, 255, 0), 2)

                    # Mise à jour de l'image de référence pour la prochaine itération
                    originale = gray

                    # Détection d'objets avec le premier modèle YOLOv8
                    results1 = model1(image_np)
                    image_np = draw_boxes(image_np, results1, model1)

                    # Détection d'objets avec le deuxième modèle YOLOv8
                    results2 = model2(image_np)
                    image_np = draw_boxes(image_np, results2, model2)
                       
                    if len(contours) > 0:
                        # send_order(phone_number[0], message_alerte):
                        print("un alerte est envoyer")
                        # Save image to MongoDB if movement is detected
                        timestamp = datetime.datetime.now()
                        save_image_to_mongodb(image_np, timestamp)
                        image_counter += 1
                        
                        # if image_counter >= max_images:
                        #     print(f"Reached maximum of {max_images} images. Stopping.")
                        #     break

                    # Affichage des informations de paramètres sur le cadre
                    cv2.putText(image_np, f"[o|l]seuil: {seuil}  [p|m]blur: {kernel_blur}  [i|k]surface: {surface}", 
                                (10, 30), cv2.FONT_HERSHEY_COMPLEX_SMALL, 1, (0, 255, 255), 2)

                    # Affichage de la fenêtre unique
                    cv2.imshow("Détection de Mouvement et d'Objets", image_np)

                    # Gestion des entrées clavier pour la détection de mouvement
                    key = cv2.waitKey(1) & 0xFF
                    if key == ord('q'):
                        break

            except websockets.exceptions.ConnectionClosed:
                print("Connection closed")
                break
    finally:
        # Libération des ressources
        cv2.destroyAllWindows()

async def main():
    server = await websockets.serve(handle_connection, '0.0.0.0', 3001)
    print("Server started")
    await server.wait_closed()

asyncio.run(main())

################################################################

