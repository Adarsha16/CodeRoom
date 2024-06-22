FROM gcc:latest


WORKDIR /usr/src/app

# RUN apt-get update && apt-get install -y \
#     g++


COPY . .

# RUN g++ -o myapp app.cpp

EXPOSE 8000

CMD ["sh","-c","g++ -o myapp app.cpp && ./myapp"]
