![Jambo API](https://trello-attachments.s3.amazonaws.com/5ba912dca09a8d0cb6f52b2e/5bb66c81e7d56c343d5b0b6c/89d053030970723402230df2673d4a8d/proxy_form.png)

## JAMBO E-COMMERCE API

This is a SOEN-6841 Project for the the Tam Jambo.

#### Team Members
1. Amir Mohsen Hossein Zadeh
2. Alejandro Bernal
3. Mohamad Jafar Mohamadi Noudeh
4. Mahsa Alsadat Ghoreishi
5. Valeriu Caramanuta
6. Samaneh Shirdel

#### Run Integration Tests
Note: Requires node.js to be installed.

#### 1. Run the Product Service
~~~~
 cd [root directory of repository]/productService/
 mvn spring-boot:run&
~~~~

#### 2. Run the Ordering Service
See the instructions inside the ordering folder

#### 3. Run the code below
~~~~
 cd [root directory of repository]/gateway/
 npm i
 mocha tests
~~~~

#### 4. Run the front end client
~~~~
 cd [root directory of repository]/client/
 npm start
~~~~


![Test Results](/screenshots/productServiceTests.png?raw=true "Product Service Test Results")