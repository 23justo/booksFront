#booksFront

Run booksFront service<br/>
clone the repository to your computer<br/>
```git clone git@github.com:23justo/booksFront.git```<br/>

Build Dockerfile<br/>

```docker build -t bookfront .```<br/>
```docker run -d -p 3333:3000 bookfront```<br/>
Now you can go to localhost:3333 and you should be able to see the frontend app.<br/>
![image](https://github.com/user-attachments/assets/57ecbfb0-277b-4849-b04c-de63d5f94e31)

If this is the first time you use it add a book and it after that you will be able to see this page
![image](https://github.com/user-attachments/assets/433a9007-93a5-45bc-be2f-51715b69f9a0)

The requirements for this technical test asked for a delete function on the front, but didnt ask for the endpoint on fastApi, so i decided to just show published books, and the delete sets the book to draft status.
