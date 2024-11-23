from django.urls import path
from .views import add_cars_test, add_car

urlpatterns = [
    path("add_car_test", view=add_cars_test),
    path("add_car", view=add_car),
]
