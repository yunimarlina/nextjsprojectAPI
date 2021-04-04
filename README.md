#### YuniMarlina-Pre-test Backend Engineer

### to run at postman, go to: [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/9e560cf55515f7c04909)

### for documentation click this link: https://documenter.getpostman.com/view/13593391/TzCQa6Hn

### how to run:
```
1. First, run npm install in terminal and run the development server with:
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    and connect to mongodb
2. Register User:
  Open Postman and Post method with 
  url: http://localhost:3000/api/register/
  Send to get Response
3. Login User:
  Input Post method with 
  url: http://localhost:3000/api/login
  Send to get Response and access_token
  Input access_token as a header in every end-point
4. Get All Ticket:
  Input limit params,header-access_token and Get method with 
  url: http://localhost:3000/api/ticket?limit=
  Send to get Response
5. Post Ticket:
  Input access_token in header and Post method with 
  url: http://localhost:3000/api/ticket/
  Input Request Body
  Send to get Response
6. Update Status and message Ticket:
  Input access_token in header and Put method with 
  url: http://localhost:3000/api/ticket/:ticket-number
  Input Request Body
  Send to get Response
7. Change Ticket Status to Closed:
  Input access_token in header and Patch method with 
  url: http://localhost:3000/api/ticket/:ticket-number
  Input Request Body
  Send to get Response
8. Delete Ticket:
  Input access_token in header and Delete method with 
  url: http://localhost:3000/api/ticket/:id
  Send to get Response
```