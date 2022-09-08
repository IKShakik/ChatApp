var connection = new signalR.HubConnectionBuilder()
    .withUrl('/user-list')
    .build();

    connection.start().catch(err => console.error(err.toString()));

    //send message
    document.getElementById('sendMessage').addEventListener('click', event => {
        const user = document.getElementById("userName").value;
        const message = document.getElementById("userMessage").value; 
        
        connection.invoke("SendMessage", user, message).catch(err=> console.error(err.toString()));
        event.preventDefault();
    });

    //receive message
    connection.on("ReceiveMessage", (user, message)=>{
        const rec_msg = user + ": " + message;
        const li = document.createElement("li");
        li.textContent = rec_msg;
        document.getElementById("messagesList").appendChild(li);
    });

    