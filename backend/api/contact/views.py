from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from contact.models import Contact
from contact.serializers import ContactSerializer
from django.db import connection
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from django.views.generic import View
from rest_framework.parsers import JSONParser

# Create your views here.
@csrf_exempt
def change_field(request):
    '''
    View to add fields to the contact model
    '''
    if request.method == 'POST':
        json_data = request.body.decode('utf-8')  # Decode byte string to UTF-8 string
        data = json.loads(json_data)  # Parse JSON data
        field_name = data.get('field_name')
        field_type = data.get('field_type')
            
        # creating SQL to add a new field 
        sql = f'ALTER TABLE contact_contact ADD COLUMN {field_name} {field_type};'
    
        try:
            with connection.cursor() as cursor:
                cursor.execute(sql)
            return JsonResponse({"message": f'Field "{field_name}" added successfully'}, status=200)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

@csrf_exempt
def contact_list(request):
    if request.method == 'GET':
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM contact_contact")
            contacts = dictfetchall(cursor)
        return JsonResponse(contacts, safe=False)
    
    if request.method == 'POST':
        data = JSONParser().parse(request)
        num_columns = get_column_count("contact_contact")
        
        # if the request data dosen't match the length of columns in table
        # while taking care of sr no option
        if len(data) != num_columns - 1: 
            return JsonResponse({"error": "Mismatch in number of values"}, status = 400)
        
        column_names = ', '.join(data.keys())
        placeholders = ', '.join(['%s'] * len(data))
        sql = f"INSERT INTO contact_contact ({column_names}) VALUES ({placeholders})"
        with connection.cursor() as cursor:
            cursor.execute(sql, list(data.values()))
        return JsonResponse({'message': 'Contact created successfully'}, status=201)

@csrf_exempt
def contact_detail(request, pk):
    '''
    view to EDIT, UPDATE and DELETE rows
    '''
    if request.method == 'GET':
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM contact_contact WHERE id=%s", [pk])
            contact = dictfetchone(cursor)
        if contact:
            return JsonResponse(contact)
        else:
            return JsonResponse({"error": "Contact does not exist"}, status = 404)
        
    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        table_name ='contact_contact'
        num_columns = get_column_count(table_name)
        
         # Validate if the number of values in the request matches the number of columns
        if len(data) != num_columns:
            return JsonResponse({'error': 'Number of values in the request does not match the number of columns'}, status=400)
        
        # Construct the SET clause dynamically based on the keys in the data dictionary
        set_clause = ', '.join([f"{key} = %s" for key in data.keys()])
        
        # Construct and execute the SQL query
        with connection.cursor() as cursor:
            cursor.execute(
                f"UPDATE {table_name} SET {set_clause} WHERE id = %s",
                list(data.values()) + [pk]  # Include the primary key value in the parameter list
            )
        return JsonResponse({'message': 'Contact updated successfully'})
    
    elif request.method == 'DELETE':
        with connection.cursor() as cursor:
            cursor.execute("DELETE FROM contact_contact WHERE id=%s", [pk])
        return JsonResponse({"message": "Contact deleted successfully"}, status = 204)


# helper functions 

def get_column_count(table_name):
    """
    Helper function that will give the 
    column count
    """
    
    with connection.cursor() as cursor:
        cursor.execute(
            """
            SELECT COUNT(*)
            FROM pragma_table_info(%s)
            """,
            [table_name]
        )
        row = cursor.fetchone()
        if row:
            return row[0]
        return 0

# Utility function to convert query results to dictionaries
def dictfetchall(cursor):
    columns = [col[0] for col in cursor.description]
    return [dict(zip(columns, row)) for row in cursor.fetchall()]

def dictfetchone(cursor):
    columns = [col[0] for col in cursor.description]
    return dict(zip(columns, cursor.fetchone()))