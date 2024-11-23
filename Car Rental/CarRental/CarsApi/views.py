from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from .models import Car
import json
# Create your views here.


@csrf_exempt
def add_cars_test(request):

    if request.method == "POST":
        data = json.loads(request.body)  # retrieve data from json
        print(data)
        return JsonResponse({"message": "Your data has been submitted..", "data": data}, safe=False)


@csrf_exempt
def add_car(request):

    if request.method == "POST":
        try:
            data = json.loads(request.body)
            car = Car(**data)
            car.save()
            return JsonResponse({"message": {"success": "Car added successfully"}, "state": 'success'}, safe=False)
        except Exception:
            return JsonResponse({"message": {"error": "There is a problem to server.."}, "state": "failed"}, status=500)

    return JsonResponse({"message": {"error": "This api end point only support POST method."}, "state": "rejected"}, status=501)
