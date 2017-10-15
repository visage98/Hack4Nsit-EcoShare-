# EmoShare
## Created By- DegenX
### Aim
The main goal of creating any project is to create a real life hack that can be used in the everyday life to solve an issue/project which we face quite frequently. Our Project, EMOSHARE, is a similar product when it comes to solving the above mentioned problem.
According to the given problem set ,the main motive of the project was to  cheer the user up if he was in a disgusted mood.
The solution to this problem is to just let him/her know about the happy stories posted at the common platform. Reading these happy stories will ultimately put him in a better mood.
### Summary
The project consists of a common platform where all the users can simultaneously post stories in their particular moods.
According to the mood of the user, he/she is shown those stories from the common platform which would specifically cheer him up.
The flow depicting all the stages of the project have been explained in detail as follows :


1.	Landing Page

 ![page1](https://user-images.githubusercontent.com/25061477/31582030-9ead4ba0-b196-11e7-887f-ac50012b87bd.png)
The project begins with a login/sign-up page. The user has to either directly log in to one of his registered accounts or create a new account to be a part of the community.

2.	Mood
 ![mood](https://user-images.githubusercontent.com/25061477/31582028-9e365f04-b196-11e7-8056-e7334841b4d5.png)
Once a user logs in to any of his registered accounts, he lands at a page that asks him his current mood. The user is given an option to select any value between -50 to 50 according to his level of happiness where 50 denotes the level of extreme happiness and -50 denotes the level of extreme sadness.
After selecting a level, the user presses the Go button to redirect to the Stories page.
Other than the happiness meter, the page has a header consisting of three parts-


a)	Profile and Logout embedded in a drop down menu
 ![profile](https://user-images.githubusercontent.com/25061477/31582031-9ed8a6e2-b196-11e7-85f5-fe900be78800.png)
The Profile button redirects the user to a page where the basic details of the user(which were asked during registration) are shown.

![logout](https://user-images.githubusercontent.com/25061477/31582027-9dbf2772-b196-11e7-914d-2bac45a45187.png)
 
The logout button logs out the user and redirects to a page where his overall session progress is shown-about the level of happiness he had started and the level of happiness at which he ends the session, thus showing him the total progress he has made during the session, along with a “SEE YOU SOON” conclusive note.

b)	My Posts
 ![myposts](https://user-images.githubusercontent.com/25061477/31582029-9e83de64-b196-11e7-9bb4-169bfd769a3c.png)
On clicking the My Posts button of the header, the user is redirected to a page which shows all of his recent posts. Each post carries the author’s name, story text, happiness level and the date of post.

c)	Mood 
This button is used to redirect back to the Mood page from the My Posts page.

3.Stories 

![stories](https://user-images.githubusercontent.com/25061477/31582033-9fc492b4-b196-11e7-8f5d-6ce8e847aac3.png)
	
This page consists of three different sections:

a)	Read stories
This part consists of the relevant stories for the user according to his level of happiness. Suppose the user is sad (he/she had entered a value between -50 to 0),then he/she is shown only happy stories(having happiness level >0 and <50) so as to make his mood better.

b)	Write stories

This part consists of a simple textbox and a share button. Additional features like attaching an 
image, document etc. are to be included but could not be because of the time constraints.

c)	Mood-O-Meter 
This circular progress bar denotes the current level of user’s happiness. As the user views and likes the stories of other users, this meter value increases too, because he only sees happy stories and his mood becomes better on reading and liking each happy story.

System Configuration, Languages used, Configuration, User Interface
Operating System: Ubuntu
Languages used: Javascript,HTML,CSS,Node.js
Database Used: MongoDB(using mongoose)
Authentication (LogIn and SignUp) has been done using passportJS package. All back-end servers are express (Node.js) servers. Different routes have been created for different pages with appropriate POST and GET requests. All Front-end work has been done using simple HTML and CSS. Additional packages like body-parser, ejs, bcrypt-nodejs ,momentjs ,cookie-parser,async etc.

Future Scope
The following features could not be implemented due to shortage of time, but will surely be added after this hackathon period:
a)	Personal Message

A separate button in each story will be added denoting a personal reply to the author. A chat window will be opened on clicking the button. Some replies like “Thanks”,” Congrats”, etc. will be pre-defined for the convenience of the author.

b)	Attaching image ,video ,GIFs and docs in the story post.

A drop-down menu will be created for attaching the above elements in any post. Attachments will be made using browse windows by specifying the paths.

c)	Along with the like activity on stories (which has been implemented), a comments section will also be provided.
This will be done by adding another attribute in the story object that has been created on the server. 

 d)Another feature that will be added to the story object will be an audio button. This button when clicked will read the text of the story along with the author’s name.
This will be done using the Window.speechSysnthesis (entry point for Web Speech API). Speak function of this object will be used.
	
e) Judging the genre of story 

We will classify the stories in categories and if some other user is interested in stories of a particular genre, he/she can select the genre from a drop-down menu.
This will be done using a suitable API which judges the intent of the sentence provided to it as input.

f) UI improvements will be done.  
	
Future Scope
	Once the above mentioned limitations are handled, we see this product as a potential hot selling website. In the era where teenagers are playing games like BlueWhale , this product will act just opposite and move the air to positivity and happiness. With buzzing presence of applications like Facebook and Snapchat, EmoShare can be a competitor if given proper resources and time which will surely be given.

Challenges Faced
   a) A Lot of time was wasted in connecting our MongoDB database with college Wi-Fi.
   b) About an hour was wasted to find a logical error in our hefty codes. Using “val” instead of “value” was the sole reason.
   c) 2- 3 hours were invested just to incorporate the like feature.
  



Experience
Since it was the first hackathon of all our team members, it was quite difficult to manage time. We learnt how to multitask and produce the best output in the least amount of time. It was a great experience and we all look forward to attend more and more Hackathons to increase our skills and compete with the real world.






























