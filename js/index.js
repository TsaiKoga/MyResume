var str = document.getElementById('resume').innerHTML.toString();
var i = 0;
document.getElementById('resume').innerHTML = "";


setTimeout(function() {
    var se = setInterval(function() {
        i++;
        document.getElementById('resume').innerHTML = str.slice(0, i) + "|";
        if (i == str.length) {
            clearInterval(se);
            document.getElementById('resume').innerHTML = str;
        }
    }, 10);
},0);
