from django.db import models

class Contact(models.Model):
    '''
    Making a model where dynamic data
    can be added for fields
    '''
    
    full_name = models.CharField(max_length=255, default= None, blank=True)

