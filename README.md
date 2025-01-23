#booksFront

Run booksFront service<br/>
clone the repository to your computer<br/>
```git clone git@github.com:23justo/booksFront.git```<br/>

Build Dockerfile<br/>

```docker build -t bookfront .```<br/>
```docker run -d -p 3333:3000 bookfront```<br/>
Now you can go to localhost:3333 and you should be able to see the frontend app.<br/>