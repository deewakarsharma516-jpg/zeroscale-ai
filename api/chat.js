export default async function handler(req,res){
res.setHeader('Access-Control-Allow-Origin','*');
res.setHeader('Access-Control-Allow-Methods','POST');
if(req.method==='OPTIONS'){res.status(200).end();return;}
if(req.method!=='POST'){res.status(405).end();return;}
try{
const r=await fetch('https://api.groq.com/openai/v1/chat/completions',{
method:'POST',
headers:{
'Content-Type':'application/json',
'Authorization':'Bearer '+process.env.GROQ_KEY
},
body:JSON.stringify(req.body)
});
const d=await r.json();
res.status(200).json(d);
}catch(e){
res.status(500).json({error:'Server error'});
}
}
