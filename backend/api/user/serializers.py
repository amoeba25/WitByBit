from rest_framework import serializers
from django.contrib.auth import authenticate
from rest_framework.response import Response
from user.models import CustomUser

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(style = {"input_type": "password"})
    type = serializers.CharField()
    
    def validate(self, data):
        email = data.get('email')
        password = data.get('password')
        type = data.get('type')
        
        custom_user = CustomUser.objects.get(email = email)
        role = 'admin' if custom_user.is_staff else 'user'

        if email and password:
            user = authenticate(username = email, password = password)
            
            # check if user type matches
            if type != role:
                raise serializers.ValidationError("Incorrect user type")
            
            if not user:
                raise serializers.ValidationError("Incorrect email or password")
        else:
            raise serializers.ValidationError("Must include email and password")

        data['user'] = user
        return data
    