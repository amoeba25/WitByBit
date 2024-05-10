# WitByBit

An assignment done for WitByBit, implementing user management and adding entries

## Backend setup

- Create a virtual environment

  ```
  > python -m venv "assignment_venv"
  ```

- Activate the virtual environment
  ```
  > assignment_venv/Scripts/activate.bat
  ```
- Install the requirements.txt, after activating the venv

  ```
  pip install requirements.txt
  ```

- Move to the project directory and run migrations

  ```
    > cd api
    > python manage.py makemigrations
    > python manage.py migrate
  ```

- Run the backend on port 5000
  ```
  > python manage.py runserver
  ```

## Frontend setup

- Move to the frontend directory and install dependencies

  ```
  > cd frontend
  > npm install
  ```

- Run the frontend server on port 5137
  ```
  > npm run dev
  ```
