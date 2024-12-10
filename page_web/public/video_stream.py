# video_stream.py
import cv2
import numpy as np
from ultralytics import YOLO
import sys

# Load your YOLO model
model = YOLO('C:/Users/dell/OneDrive/Bureau/mastere2/projet_fin_etude/runs/detect/train9/weights/best.pt')

def gen_frames():
    camera = cv2.VideoCapture('http://192.168.1.44:81/stream')

    while True:
        success, frame = camera.read()
        if not success:
            break
        else:
            # Convert frame to RGB (YOLO expects RGB images)
            img_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            
            # Perform detection
            results = model(img_rgb)
            
            # Iterate over detected objects and draw bounding boxes
            for result in results.xyxy[0]:  # xyxy format: x_min, y_min, x_max, y_max, confidence, class
                x_min, y_min, x_max, y_max, confidence, cls = map(int, result)
                label = f"{model.names[cls]}: {confidence:.2f}"
                cv2.rectangle(frame, (x_min, y_min), (x_max, y_max), (255, 0, 0), 2)
                cv2.putText(frame, label, (x_min, y_min - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 0, 0), 2)
            
            ret, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

if __name__ == "__main__":
    for frame in gen_frames():
        sys.stdout.buffer.write(frame)
        sys.stdout.flush()
