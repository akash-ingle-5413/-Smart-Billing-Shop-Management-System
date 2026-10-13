(function(){
  var form=document.getElementById('login'),email=document.getElementById('email'),pw=document.getElementById('password'),
      eErr=document.getElementById('email-err'),pErr=document.getElementById('pw-err'),
      btn=document.getElementById('submit'),status=document.getElementById('status'),toggle=document.getElementById('toggle');

  toggle.addEventListener('click',function(){
    var show=pw.type==='password';
    pw.type=show?'text':'password';
    toggle.textContent=show?'Hide':'Show';
    toggle.setAttribute('aria-pressed',String(show));
    toggle.setAttribute('aria-label',show?'Hide password':'Show password');
  });

  function setErr(input,el,msg){el.textContent=msg;input.setAttribute('aria-invalid',msg?'true':'false');}

  form.addEventListener('submit',function(ev){
    ev.preventDefault();
    var ok=true,v=email.value.trim();
    status.className='status';
    if(!v){setErr(email,eErr,'Enter your email address.');ok=false;}
    else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)){setErr(email,eErr,'Enter a valid email, like name@shop.com.');ok=false;}
    else setErr(email,eErr,'');
    if(!pw.value){setErr(pw,pErr,'Enter your password.');ok=false;}
    else if(pw.value.length<6){setErr(pw,pErr,'Password must be at least 6 characters.');ok=false;}
    else setErr(pw,pErr,'');
    if(!ok)return;

    btn.disabled=true;btn.textContent='Logging in…';
    /* TODO: replace this block with your real login request, e.g.
       fetch('/api/login',{method:'POST',headers:{'Content-Type':'application/json'},
         body:JSON.stringify({email:v,password:pw.value})}) */
    setTimeout(function(){
      btn.disabled=false;btn.textContent='Log in';
     status.textContent = "Checking...";

fetch("http://localhost:8080/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        email: document.getElementById("email").value.trim(),
        password: document.getElementById("password").value
    })
})
.then(res => res.json())
.then(data => {
    if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.user));
        window.location.href = "index.html";
    } else {
        status.textContent = data.message;
    }
})
.catch(() => {
    status.textContent = "Server not reachable";
});
      status.className='status show';
    },700);
  });
})();

const registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const data = {
            shopName: document.getElementById("shopName").value.trim(),
            fullName: document.getElementById("fullName").value.trim(),
            email: document.getElementById("regEmail").value.trim(),
            password: document.getElementById("regPassword").value
        };

        fetch("http://localhost:8080/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(result => {
            const msg = document.getElementById("regMessage");
            msg.textContent = result.message;

            if (result.success) {
                setTimeout(() => window.location.href = "loginPage.html", 1000);
            }
        })
        .catch(() => {
            document.getElementById("regMessage").textContent = "Server not reachable";
        });
    });
}