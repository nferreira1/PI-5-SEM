import os
import base64
import requests
import random
import logging
from rich.logging import RichHandler
from PIL import Image
import io

logging.basicConfig(
    level=logging.DEBUG,
    format="[%(asctime)s] %(levelname)-7s %(message)s",
    datefmt="%H:%M:%S",
    handlers=[RichHandler(show_path=False)]
)
logger = logging.getLogger("seed_script")

logging.getLogger("urllib3").setLevel(logging.WARNING)
logging.getLogger("PIL").setLevel(logging.WARNING)

API_BASE = "http://kong:8000"

def convert_image_to_base64(image_path, output_format='JPEG', quality=70, max_size=(800, 800)):
    with Image.open(image_path) as img:
        
        if img.mode in ("RGBA", "LA") or (img.mode == "P" and "transparency" in img.info):
            output_format = "PNG"
        
        if hasattr(Image, 'Resampling'):
            resample_method = Image.Resampling.LANCZOS
        else:
            resample_method = Image.ANTIALIAS

        img.thumbnail(max_size, resample_method)
        
        buffered = io.BytesIO()
        if output_format == "PNG":
            img.save(buffered, format=output_format, optimize=True)
        else:
            img.save(buffered, format=output_format, quality=quality)

        return base64.b64encode(buffered.getvalue()).decode('utf-8')

def create_category(image_path, name, status=True):
    base64_str = convert_image_to_base64(image_path)
    url = f"{API_BASE}/catalog/category"
    payload = {
        "base64": base64_str,
        "name": name,
        "status": status
    }
    response = requests.post(url, json=payload)
    if response.status_code in (200, 201):
        data = response.json()
        logger.info(f"Categoria criada: {data}")
        return data.get("categoryId")
    else:
        logger.error(f"Erro ao criar categoria '{name}': {response.status_code} - {response.text}")
        return None

def create_product_with_images(categoryId, product_dir, name, description, price, stock, status=True):
    images = []
    image_files = [
        os.path.join(product_dir, f)
        for f in os.listdir(product_dir)
        if f.lower().endswith((".png", ".jpg", ".jpeg"))
    ]
    image_files.sort()
    
    if len(image_files) != 4:
        logger.warning(f"A pasta '{product_dir}' possui {len(image_files)} imagens. Esperava 4 imagens.")
    if not image_files:
        logger.error(f"Nenhuma imagem encontrada no diretório '{product_dir}'")
        return None

    for idx, image_path in enumerate(image_files):
        base64_str = convert_image_to_base64(image_path)
        images.append({
            "base64": base64_str,
            "principal": (idx == 0)
        })
    
    url = f"{API_BASE}/catalog/product"
    payload = {
        "categoryId": categoryId,
        "description": description,
        "images": images,
        "name": name,
        "price": price,
        "status": status,
        "stock": stock
    }
    
    response = requests.post(url, json=payload)
    if response.status_code in (200, 201):
        data = response.json()
        logger.info(f"Produto criado: {data}")
        return data
    else:
        logger.error(f"Erro ao criar produto '{name}': {response.status_code} - {response.text}")
        return None

if __name__ == "__main__":
    
    base_images_dir = "./images"
    categories_images_dir = os.path.join(base_images_dir, "categories")
    products_images_dir = os.path.join(base_images_dir, "products")

    categories_dict = {}
    for file in os.listdir(categories_images_dir):
        if file.lower().endswith((".png", ".jpg", ".jpeg")):
            image_path = os.path.join(categories_images_dir, file)
            category_name = os.path.splitext(file)[0]
            cat_id = create_category(image_path, category_name)
            if cat_id:
                categories_dict[category_name] = cat_id

    if not categories_dict:
        logger.error("Nenhuma categoria foi cadastrada. Verifique os dados e tente novamente.")
        exit(1)

    for product_category in os.listdir(products_images_dir):
        category_path = os.path.join(products_images_dir, product_category)
        if not os.path.isdir(category_path):
            continue
        
        category_id = categories_dict.get(product_category)
        if not category_id:
            logger.error(f"Nenhuma categoria cadastrada para: '{product_category}'. Verifique o nome.")
            continue

        for product_item in os.listdir(category_path):
            product_path = os.path.join(category_path, product_item)
            if not os.path.isdir(product_path):
                continue
            prod_name = product_item
            prod_description = f"Descrição do produto '{product_item}' na categoria '{product_category}'"
            prod_price = round(random.uniform(10.0, 500.0), 2)
            prod_stock = random.randint(1, 100)
            
            create_product_with_images(category_id, product_path, prod_name, prod_description, prod_price, prod_stock)
