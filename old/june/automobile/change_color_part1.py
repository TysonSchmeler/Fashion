import torch
import numpy as np
import cv2
from segment_anything import sam_model_registry, SamAutomaticMaskGenerator

# === Загрузка модели ===
sam_checkpoint = "sam_vit_b_01ec64.pth"
model_type = "vit_b"

device = "cuda" if torch.cuda.is_available() else "cpu"

sam = sam_model_registry[model_type](checkpoint=sam_checkpoint)
sam.to(device=device)

# === Загрузка изображения ===
image_path = "car_image.jpg"
image_bgr = cv2.imread(image_path)
image_rgb = cv2.cvtColor(image_bgr, cv2.COLOR_BGR2RGB)

# === Генерация масок ===
mask_generator = SamAutomaticMaskGenerator(sam)
masks = mask_generator.generate(image_rgb)

# === Найти самую крупную маску (предполагаем, что это кузов) ===
largest_mask = max(masks, key=lambda x: x['area'])
segmentation = largest_mask['segmentation']

# === Сохранить маску ===
mask_uint8 = (segmentation.astype(np.uint8)) * 255
cv2.imwrite("mask.png", mask_uint8)

print("Маска сохранена как mask.png")