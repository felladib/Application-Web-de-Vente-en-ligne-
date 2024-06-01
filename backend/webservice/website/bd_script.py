import os
import django

# Définir le chemin d'accès au fichier settings.py de votre projet Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'webservice.settings')

# Configurer l'environnement Django
django.setup()

# Importer les modèles Django
from .models import Category, Product

# Créer la catégorie "Maquillage"
category_makeup_1 = Category.objects.create(name="yeux")
category_makeup_2 = Category.objects.create(name="visage")
category_makeup_3 = Category.objects.create(name="levers")


# Créer et associer des produits de maquillage avec leurs images
product1 = Product.objects.create(
    name="Fond de teint",
    description="Fond de teint liquide pour une couverture parfaite.",
    price=29.99,
    quantity=50,
    category=category_makeup_2,
    image='products/fond_de_teint.png'  # Chemin relatif vers l'image du produit
)

product2 = Product.objects.create(
    name="Palette d'ombres à paupières",
    description="Palette d'ombres à paupières avec une gamme de couleurs vives.",
    price=39.99,
    quantity=30,
    category=category_makeup_1,
    image='products/fond_de_teint.png'  # Chemin relatif vers l'image du produit
)
product3 = Product.objects.create(
    name="Mascara volumisant",
    description="Mascara pour des cils volumineux.",
    price=19.99,
    quantity=50,
    category=category_makeup_1,
    image='products/fond_de_teint.png'  # Chemin relatif vers l'image du produit
)

product4 = Product.objects.create(
    name="Fond de teint hydratant",
    description="Fond de teint hydratant pour un teint lumineux.",
    price=29.99,
    quantity=30,
    category=category_makeup_2,
    image='products/fond_de_teint.png'  # Chemin relatif vers l'image du produit
)
product5= Product.objects.create(
    name="Rouge à lèvres longue tenue",
    description="Rouge à lèvres longue tenue pour des lèvres sublimes toute la journée.",
    price=24.99,
    quantity=40,
    category=category_makeup_3,
    image='products/fond_de_teint.png'  # Chemin relatif vers l'image du produit
)

product6 = Product.objects.create(
    name="Palette d'ombres à paupières",
    description="Palette d'ombres à paupières avec une gamme de couleurs vives.",
    price=39.99,
    quantity=30,
    category=category_makeup_1,
    image='products/fond_de_teint.png'  # Chemin relatif vers l'image du produit
)
product7 = Product.objects.create(
    name="Fond de teint",
    description="Fond de teint liquide pour une couverture parfaite.",
    price=29.99,
    quantity=50,
    category=category_makeup_2,
    image='products/fond_de_teint.png'  # Chemin relatif vers l'image du produit
)

product8 = Product.objects.create(
    name="Palette d'ombres à paupières",
    description="Palette d'ombres à paupières avec une gamme de couleurs vives.",
    price=39.99,
    quantity=30,
    category=category_makeup_1,
    image='products/fond_de_teint.png'  # Chemin relatif vers l'image du produit
)
product9 = Product.objects.create(
    name="Fond de teint",
    description="Fond de teint liquide pour une couverture parfaite.",
    price=29.99,
    quantity=50,
    category=category_makeup_2,
    image='products/fond_de_teint.png'  # Chemin relatif vers l'image du produit
)

product10 = Product.objects.create(
    name="Palette d'ombres à paupières",
    description="Palette d'ombres à paupières avec une gamme de couleurs vives.",
    price=39.99,
    quantity=30,
    category=category_makeup_1,
    image='products/fond_de_teint.png'  # Chemin relatif vers l'image du produit
)
product11 = Product.objects.create(
    name="Fond de teint",
    description="Fond de teint liquide pour une couverture parfaite.",
    price=29.99,
    quantity=50,
    category=category_makeup_2,
    image='products/fond_de_teint.png'  # Chemin relatif vers l'image du produit
)

product12 = Product.objects.create(
    name="Palette d'ombres à paupières",
    description="Palette d'ombres à paupières avec une gamme de couleurs vives.",
    price=39.99,
    quantity=30,
    category=category_makeup_1,
    image='products/fond_de_teint.png'  # Chemin relatif vers l'image du produit
)
product13 = Product.objects.create(
    name="Fond de teint",
    description="Fond de teint liquide pour une couverture parfaite.",
    price=29.99,
    quantity=50,
    category=category_makeup_2,
    image='products/fond_de_teint.png'  # Chemin relatif vers l'image du produit
)

product14 = Product.objects.create(
    name="Palette d'ombres à paupières",
    description="Palette d'ombres à paupières avec une gamme de couleurs vives.",
    price=39.99,
    quantity=30,
    category=category_makeup_1,
    image='products/fond_de_teint.png'  # Chemin relatif vers l'image du produit
)
product15 = Product.objects.create(
    name="Fond de teint",
    description="Fond de teint liquide pour une couverture parfaite.",
    price=29.99,
    quantity=50,
    category=category_makeup_2,
    image='products/fond_de_teint.png'  # Chemin relatif vers l'image du produit
)

product16 = Product.objects.create(
    name="Palette d'ombres à paupières",
    description="Palette d'ombres à paupières avec une gamme de couleurs vives.",
    price=39.99,
    quantity=30,
    category=category_makeup_1,
    image='products/fond_de_teint.png'  # Chemin relatif vers l'image du produit
)
product17 = Product.objects.create(
    name="Fond de teint",
    description="Fond de teint liquide pour une couverture parfaite.",
    price=29.99,
    quantity=50,
    category=category_makeup_2,
    image='products/fond_de_teint.png'  # Chemin relatif vers l'image du produit
)

product18 = Product.objects.create(
    name="Palette d'ombres à paupières",
    description="Palette d'ombres à paupières avec une gamme de couleurs vives.",
    price=39.99,
    quantity=30,
    category=category_makeup_1,
    image='products/fond_de_teint.png'  # Chemin relatif vers l'image du produit
)
product19 = Product.objects.create(
    name="Fond de teint",
    description="Fond de teint liquide pour une couverture parfaite.",
    price=29.99,
    quantity=50,
    category=category_makeup_2,
    image='products/fond_de_teint.png'  # Chemin relatif vers l'image du produit
)

product20 = Product.objects.create(
    name="Palette d'ombres à paupières",
    description="Palette d'ombres à paupières avec une gamme de couleurs vives.",
    price=39.99,
    quantity=30,
    category=category_makeup_1,
    image='products/fond_de_teint.png'  # Chemin relatif vers l'image du produit
)


# Afficher les produits de maquillage créés
for category in Category.objects.all():
    print(f"Produits de la catégorie {category.name} :")
    for product in category.products.all():
        print(product.name)
        
