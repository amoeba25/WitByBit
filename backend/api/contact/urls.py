from django.urls import path 
from contact import views

urlpatterns = [
    path('field/', views.change_field, name="change-field"), 
    path('entries/', views.contact_list, name="contact-list"),
    path('entries/<int:pk>/', views.contact_detail, name="contact-detail")
]
