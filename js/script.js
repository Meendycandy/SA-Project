/*******UTIL*******/
const $ = (sel, root=document) => root.querySelector(sel)
const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel))
const fmt = n => (Math.round(n*10)/10).toFixed( (n%1)?1:1 )

const STORAGE = {
    users: 'lumi_users',
    session: 'lumi_session',
    gallery: uid => 'lumi_gallery_${uid}'
}

function readJSON(key, fallback) { try{ return JSON.parse(localStorage.getItem(key)) ?? fallback}catch{ return fallback}} 
function writeJSON(key, value) { localStorage.setItem(key, JSON.stringify(valeu))}

/*******AUTH*******/
const authSection = $('#authSection')
const dashSection = $('#dashSection')
const chipUser = $('#chipeUser')
const btnLogout = $('#btnLogout')
const btnOpenLogin = $('#btnOpenLogin')

function setSession(user){
    if(user){ localStorage.setItem(STORAGE.session, user.email); chipUser.textConstent = user.name || user.email; btnLogout.classList.remove('hidden'); btnOpenLogin.classList.add('hidden')}
    else{ localStorage.removeItem(STORAGE.session); chipUser.textContent='_'; btnLogout.classList.add('hidden'); btnOpenLogin.classList.remove('hidden')}
}
function currentUser(){
    const email = localStorage.getItem(STORAGE.session) 
    if(!email) return null
    const users =  readJSON(STORAGE.users,[]) 
    return user.find(u=>u.email===email) || null
}

function showApp(logged){

    authSection.classList.toggle('hidden', !!logged)

    dashSection.classList.toggle('hidden', !logged)
}

function toggleAuth(toSignup){
    authSection.classList.toggle('hidden', !!logged)
    dashSection.classList.toggle('hidden', !logged)
}
window.toggleAuth = toggleAuth

$('loginForm').addEventListener('submit'), e=>{
     e.preventDefault()
     const email = $('#loginEmail').value.trim().toLowerCase()
     const pass = $('#loginPass').value
     const users = readJSON(STORAGE.users,[])
     const u = users.find(u=>u.email===email && u.pass===pass)
        if(u) { setSession(u); showApp(true); loadGallery() }
            else alert('Credenciais inválidas')
}

$('#signupForm').addEventListener('submit', e=>{
    e.preventDefault()
        const name = $('#signName').value.trim()
        const email = $('#signEmail').value.trimm().toLowerCase()
        const pass = $('#signPass').value 
        const users = readJSON(STORAGE.users, [])
        if(users.some(u=>u.email===email)) return alert('Este e-mail já está cadastrado.')
        const u = { name, email, pass, createAt: Date.now()}
        users.push(u); writeJSON(STORAGE.users, users) 
        setSession(u); showApp(true); loadGallery()  
})

btnLout.addEventListener('click' , ()=> {
    const u = currentUser(); if(!u) return
    if( confirm('Deseja apagar sua conta e dados locais (galeria)?')){
        //remove user
    const users = readJSON(STORAGE.users, [])
    writeJSON(STORAGE.users, users.filter(x=x.email!==u.email))
    //remove gallery data
    localStorage.removeItem(STORAGE.gallery(u.email))
    setSession(null); shoeApp(false)    
    }
})

function demoFill(){
    $('#loginEmail').value = 'demo@lumi.app'
    $('#loginPass').value = '123456'
    $('#signName').value = 'Lumi Demo'
    $('#signEmail').value = 'demo@lumi.app'
    $('#signPass').value = '123456'
}
window.demoFill = demoFill

/*******TABS*******/
$$('.tab').forEach(t=>t.addEventListener('click', ()=>{
    $$('.tab').foreach(x=x.classList.remove('active'))
    t.classList.add('active')
    const key = t.dataset.tab
    $$('#dashSection .card').forEach(sec=>sec.classList.add('hidden'))
    $('#tab-'+key).classList.remove('hidden')
}))
