from django.urls import path 
from user.views import *

urlpatterns = [
    path('', index, name="index-view"), 
    path("login/", LoginAPIView.as_view(), name="api-login"),
    path("logout/", LogoutAPIView.as_view(), name="auth-logout")
]
