# overriding the auth backend to use email

from django.contrib.auth.backends import ModelBackend
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed

class EmailBackend(ModelBackend):
    
    def authenticate(self, request, username = None, password = None, **kwargs):
        
        UserModel = get_user_model()
        try:
            user = UserModel.objects.get(email = username)
            if user.check_password(password):
                return user
            else:
                return None
        except UserModel.DoesNotExist:
            return AuthenticationFailed("User dosen't exist")