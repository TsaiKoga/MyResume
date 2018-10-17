/**
 * @author: TsaiKoga
 * @create_date: 2018-10-15
 */

var $commands = $('#resume').find('.command');
var commandsStr = [];

$commands.each(function(index) {
    var len = this.innerHTML.length;
    commandsStr.push(this.innerHTML);
    this.innerHTML = "";
});


function runCommand(index) {
    var i = 0;
    var cmdT = setTimeout(function() {
        typeCharToDisplayResult(i, index);
    },0);
    if (i > commandsStr[index].length) {
        clearTimeout(cmdT);
    }
}

function typeCharToDisplayResult(i, index) {
    var se = setInterval(function() {
        i++;
        $commands[index].innerHTML = commandsStr[index].slice(0, i) + "|";
        var resume = document.getElementById("resume");
        var screen = document.getElementById("screen");
        screen.scrollTop = screen.scrollHeight - screen.clientHeight;
        console.log(screen.scrollTop);

        if (i == commandsStr[index].length) {
            clearInterval(se);
            $commands[index].innerHTML = commandsStr[index];
            $($commands[index]).next('.direct-output').css('display', 'block');
        }
    }, 10);
}

// var firstT = setTimeout(function() {
//     runCommand(0);
//     var secT = setTimeout(function() {
//         runCommand(1);
//         var thirdT = setTimeout(function() {
//             runCommand(2);
//             console.log(3);
//         }, 1000);
//         console.log(2);
//     }, 1000);
//     console.log(1);
// }, 1000);
function serialRunCMD(index) {
    setTimeout(function() {
        runCommand(index);
        if (index < $commands.length - 1) {
            serialRunCMD(index+1);
        }
    }, 1000);
}

serialRunCMD(0);
