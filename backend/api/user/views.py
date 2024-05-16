from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth import logout, login
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from user.serializers import LoginSerializer

# Create your views here.
def index(request):
    return HttpResponse("<h1> Hello World </h1>")

# login view
class LoginAPIView(APIView):
    """
    Logs a user in, provided the correct email and password

    returns email and user-type as response
    """
    serializer_class = LoginSerializer
    
    def post(self, request):
        serializer = self.serializer_class(data = request.data)
        serializer.is_valid(raise_exception= True)
        user = serializer.validated_data['user']
        role = 'admin' if user.is_staff else 'user' # set the role as admin or non-admin member
        
        # login to create a session
        login(request, user)
        return Response({"email": user.email, "role": role}, status=status.HTTP_200_OK)

class LogoutAPIView(APIView):
    """
    Logs out, a logged-in user
    """
    def get(self, request):
        logout(request)
        return Response({"message": "Logged out successfully"}, status = status.HTTP_200_OK)
    