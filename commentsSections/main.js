let increment_button= document.getElementById("increment-rate");
let decrement_button= document.getElementById("decrement-rate");
let rate_count=document.getElementById("rate-count")
var commentsMain=document.querySelector(".comments-sections")
let count_rate=0;



function ListenersActions(){
    increment_button.addEventListener("click",()=>{
        count_rate++
        rate_count.innerHTML= count_rate
    })
    
    decrement_button.addEventListener("click",()=>{
        if(count_rate>0){
            count_rate--
            rate_count.innerHTML= count_rate
        }
    })
}


fetch("./data.json")
.then(response=> {
    return response.json()
})
.then(data=>{
    let finalRender=""

    data.comments.forEach(res=>{
        let commentRender= createCommentCard(res.id, res.user.image.png, res.user.username, res.createAt, res.content, res.score );
        finalRender+=commentRender     
    })

    commentsMain.innerHTML=finalRender
    ListenersActions()
})


function createCommentCard(id, imageavatar, username, time, comment, score ) {
    let content=`
    <div class="comment-card" id="commentid-${id}">
        <div class="header-card">
            <img id="avatar_user" src="${imageavatar}" alt="">
            <a href="#" id="user_nickname">${username}</a>
            <p id="time_comment">${time}</p>
        </div>
        <p id="comentary-content">${comment}</p>
        <div class="actions-card">
            <div class="rate-action">
                <button class="button-style-rate" id="increment-rate"></button>
                <p id="rate-count">${score}</p>
                <button class="button-style-rate" id="decrement-rate"></button>
            </div>
            <div class="reply-comment">Reply</div>
        </div>
    </div>`
    return content
}
