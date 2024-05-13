from rest_framework import serializers
from contact.models import Contact
import json

class ContactSerializer(serializers.ModelSerializer):
    '''
    
    '''
    class Meta:
        model = Contact
        fields = '__all__'
    