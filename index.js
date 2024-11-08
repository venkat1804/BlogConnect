import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
let post=[];
post.push({id:1 , title:"I watched BLACK CLOVER today" , Note:"The series focuses on Asta, a young orphan who is left to be raised in an orphanage alongside his fellow orphan, Yuno. While everyone is born with the ability to utilize mana in the form of magical power, Asta, with no magic instead focuses on physical strength. Conversely, Yuno was born as a prodigy with immense magical power and the talent to control wind magic. Motivated by a desire to become the next Wizard King, an authority figure second to the king of Clover Kingdom, the two youths developed a friendly rivalry. Yuno obtains a legendary four-leaf grimoire held by the kingdom's first Wizard King. The four-leaf grimoire is a rare grimoire, only given to the most immense mages. Asta, despite his lack of magic, obtained an enigmatic five-leaf grimoire that contains mysterious elf swords and a bodiless member of the Devil race who utilizes rare anti-magic. Afterward, he and Yuno each join a Magic Knight squad as the first step to fulfill their ambitions. 43Asta joins the Black Bulls under Yami Sukehiro alongside Noelle Silva, while Yuno becomes a member of the Golden Dawn. They embark on various adventures while contending with an extremist group called the Eye of the Midnight Sun, whose leadership is manipulated by a Devil in avenging an injustice committed against the Elves by the Clover Kingdom at the time of its founding. The Magic Knights then face the Dark Triad of the Spade Kingdom, with Asta and Yuno learning of their Devils' influence on their lives and of the Dark Triad's plan to fully manifest the Devils into their world. Then the Magic Knights face the Dark Triad's eldest sibling, Lucius Zogratis, who wants to create his own perfect world."})
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));
app.get("/" , (req,res)=>
{
    res.render("index.ejs" , 
    {post : post})
});
app.get("/addnew" ,(req,res)=>
{
    res.render("addnew.ejs")
});
app.post("/submit" , (req,res)=>
{
    let title = req.body["title"];
    let Note = req.body["Note"];
    if(post.length == 0)
    {
        post.push({id :1  ,title:title , Note:Note});
    }else{
        post.push({id :post.length + 1  , title:title , Note:Note});
       
    }
    res.render("index.ejs" , {
        post : post
        
    });
    console.log("Saved SuccessFully!!!")
})
app.get("/post/:postId" , (req,res)=>
{
    let reqId = req.params.postId;
     console.log(post[reqId - 1].title);
     console.log(post);
     res.render("edit.ejs",
     {
        title:post[reqId - 1].title,
        para:post[reqId - 1].Note,
        postId:reqId

     });
})
app.post("/delete" , (req,res) =>
{
    const id = req.body.id;
    if(id !== -1 || id !== undefined)
    {
        post.splice(id - 1 , 1);
    }
    for(let i=0;i<post.length;i++)
    post[i].id = (i + 1);
    console.log("Deleted SuccessFully!!!");
    res.render("index.ejs", {post :post})
    
})
app.post("/update" , (req,res)=>
{
    const id = req.body.id;
    console.log(id);
    res.render("update.ejs" , 
    {
        id:id,
        title:post[id - 1].title,
        para : post[id - 1].Note

    })
})
app.post("/updateSave" , (req,res)=>
{
    const id = req.body["id"];
    const new_title = req.body["title"];
    const new_para = req.body["Note"];
    console.log(id+"  "+new_title+"  "+new_para)
    post[id - 1].title = new_title;
    post[id  - 1 ].Note = new_para;
    res.render("index.ejs" , 
    {
        post:post

    })
    
})
app.get("/header.ejs",(req,res)=>
{
    res.render("index.ejs" , 
    {
        post:post

    })
})
app.listen(port , ()=>
{
    console.log(`SuccessFully Listening at ${port} `)
});