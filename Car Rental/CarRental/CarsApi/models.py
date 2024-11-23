from django.db import models


class Car(models.Model):
    brand = models.CharField(max_length=100)  # Brand (e.g., Toyota, Ford)
    # Model name (e.g., Camry, Mustang)
    model = models.CharField(max_length=100)
    year = models.IntegerField()  # Year of manufacture
    color = models.CharField(max_length=50)  # Car color
    mileage = models.IntegerField(null=True, blank=True)  # Optional mileage
    price = models.DecimalField(
        max_digits=10, decimal_places=2)  # Price of the car
    description = models.TextField(blank=True)  # Optional description
    # image = models.ImageField(upload_to='car_images/',
    #                           null=True, blank=True)
    # Optional image field

    def __str__(self):
        return f"{self.year} {self.brand} {self.model}"
