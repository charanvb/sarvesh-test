# This Dockerfile is used to build a Docker image for a simple Flask application.
# It starts with a base image of Python 3.9 slim, sets the working directory
# to /app, copies the current directory's contents into the container, installs
# the required Python packages from requirements.txt, exposes port 8080, and
 
FROM python:3.9-slim
 
WORKDIR /app
 
COPY . .
 
RUN pip install --no-cache-dir -r requirements.txt
 
EXPOSE 8080
 
CMD ["python","app.py"]