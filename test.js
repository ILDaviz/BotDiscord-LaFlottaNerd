//Scaricare un file.

client.on(`message`,function(msg){
    if(msg.attachments.first()){//checks if an attachment is sent
        if(msg.attachments.first().filename === `png`){//Download only png (customize this)
            download(msg.attachments.first().url);//Function I will show later
        }
    }
});

let request = require(`request`);
let fs = require(`fs`);
function download(url){
    request.get(url)
        .on('error', console.error)
        .pipe(fs.createWriteStream('meme.png'));
}





//Inviare un file

message.channel.send("Testing message.", { files: ["./images/headpat1.png"] });