import cv2
import numpy as np

image = cv2.imread("car_image.jpg")
mask = cv2.imread("mask.png", cv2.IMREAD_GRAYSCALE)

# Обрезаем по маске
masked = cv2.bitwise_and(image, image, mask=mask)

# Применяем фильтр Canny
edges = cv2.Canny(masked, 100, 200, apertureSize=3, L2gradient=True)
cv2.imwrite("canny.png", edges)