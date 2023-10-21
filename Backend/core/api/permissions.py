from rest_framework import permissions
from .models import Student

class IsAuthenticated(permissions.BasePermission):
    message = 'Musisz się zalogować.'

    def has_permission(self, request, view):
        if request.method == 'GET':
            if (email := request.GET.get("email", None)) is not None:
                return Student.objects.filter(email=email).exists()
        elif request.method == "POST":
            if (email := request.data.get("email", None) )is not None:
                return Student.objects.filter(email=email).exists()
        return False

