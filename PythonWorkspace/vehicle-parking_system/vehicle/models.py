from django.db import models
from django.core.validators import MinValueValidator

class Vehicle(models.Model):
    COLORS = [
        ("black", "Black"),
        ("white", "White"),
        ("silver", "Silver"),
        ("gray", "Gray"),
        ("red", "Red"),
        ("blue", "Blue"),
        ("green", "Green"),
        ("yellow", "Yellow"),
        ("brown", "Brown"),
        ("orange", "Orange"),
        ("purple", "Purple"),
        ("metallic_black", "Metallic Black"),
        ("metallic_silver", "Metallic Silver"),
        ("metallic_gray", "Metallic Gray"),
        ("metallic_red", "Metallic Red"),
        ("metallic_blue", "Metallic Blue"),
        ("metallic_green", "Metallic Green"),
        ("metallic_brown", "Metallic Brown"),
        ("pearl_white", "Pearl White"),
        ("matte_black", "Matte Black"),
        ("chrome", "Chrome"),
        ("gold", "Gold"),
        ("custom", "Custom Color"),
    ]
    TRANSMISSION = [("manual", "Manual"), ("automatic", "Automatic")]
    STATUS = [("active", "Active"), ("inactive", "Inactive"), ("sold", "Sold")]

    # Basic Information
    vin = models.CharField(max_length=17, unique=True)  # Vehicle Identification Number
    color = models.CharField(max_length=20, choices=COLORS)
    body_type = models.CharField(max_length=50)
    transmission = models.CharField(max_length=50, choices=TRANSMISSION)
    status = models.CharField(max_length=20, choices=STATUS)

    class Meta:
        db_table = "vehicles"  # To force the naming of the table
