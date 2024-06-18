# Project D
This is a prototype for a workspace booking application we made for Peter van der Lee from [Eneco](http://eneco.nl), as a project for the "Project D" class at the [Hogeschool Rotterdam](https://github.com/hogeschool).

## Video Demo
- [YouTube](https://youtu.be/NYj7tgk_1Aw)

## Who made this:
- [@korbindeman](https://github.com/korbindeman) 
- [@pablosanderman](https://github.com/pablosanderman)
- [@schtormm](https://github.com/schtormm)
- [@ByteSizeSkaffy](https://github.com/ByteSizeSkaffy)

(and also [@JimHeukels](https://github.com/JimHeukels))

# How do I use this?
1. Clone the repository
2. Start up a local database using the Dockerfile: ```docker compose up```
3. ```npm install``` or ```bun i``` (depending on if you want to use Node or Bun), to install all the dependencies
4. Create a .env file with these two variables: 

    ```
    DATABASE_URL=[replace this with AN URL pointing to your database, with the correct password and username, port et cetera]
    EXPO_PUBLIC_SERVER_URL=http://[replace this part with your local IPV4 adress]:3020
    ```
5. Create the database schema by running ```npx prisma migrate dev``` or ```bunx prisma migrate dev```
6. Seed some database info by running ```npm run seed``` or ```bun run seed```
7. To start the application: run both the server and the client in different terminal windows by running:
    - Server: ```npm run server``` / ```bun run server```
    - Client: ```npm run client``` / ```bun run client```
8. To start the application on your phone, download the "Expo Go" app for your respective platform and scan the QR code in the terminal you started your client in.
