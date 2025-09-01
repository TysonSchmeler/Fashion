from diffusers import StableDiffusionControlNetPipeline, ControlNetModel, UniPCMultistepScheduler
from diffusers.utils import load_image
from transformers import AutoTokenizer
import torch
from PIL import Image
import numpy as np

# === Настройки ===
device = "cpu"
prompt = "a red sports car, parked on the street, photo"
negative_prompt = "bad anatomy, blurry, distorted"
num_inference_steps = 30
guidance_scale = 7.5

# === Загрузка изображений ===
init_image = Image.open("car_image.jpg").convert("RGB").resize((512, 512))
canny_image = Image.open("canny.png").convert("RGB").resize((512, 512))

# === Загрузка модели ControlNet + StableDiffusion ===
controlnet = ControlNetModel.from_pretrained(
    "lllyasviel/sd-controlnet-canny",
    torch_dtype=torch.float32,
    low_cpu_mem_usage=True
)

pipe = StableDiffusionControlNetPipeline.from_pretrained(
    "runwayml/stable-diffusion-v1-5",
    controlnet=controlnet,
    safety_checker=None,
    torch_dtype=torch.float32,
    low_cpu_mem_usage=True
)

pipe.scheduler = UniPCMultistepScheduler.from_config(pipe.scheduler.config)
pipe.to(device)

# === Генерация ===
output = pipe(
    prompt=prompt,
    negative_prompt=negative_prompt,
    image=canny_image,
    num_inference_steps=num_inference_steps,
    guidance_scale=guidance_scale,
).images[0]

output.save("car_repainted_cpu.jpg")
print("✅ Готово: car_repainted_cpu.jpg")
