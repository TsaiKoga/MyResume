/**
 * @author: TsaiKoga
 * @create_date: 2018-10-15
 */

var $commands = $('#resume').find('.command-container .command');
var commandsStr = [];
var commandsLen = [1];
var typeInterval = 100;

$commands.each(function(index) {
    var len = this.innerHTML.length;
    commandsStr.push(this.innerHTML);
    commandsLen.push(len);
    this.innerHTML = "";
});


function typeCharToDisplayResult(index) {
    var i = 0;
    var se = setInterval(function() {
        i++;
        // 隐藏光标
        if ($($commands[index]).parent('.command-container').find('.cursor').css('display') != 'none') {
            $($commands[index]).parent('.command-container').find('.cursor').css('display', 'none');
        }
        $($commands[index]).parent('.command-container').find('.command').css('display', 'inline-block');
        $commands[index].innerHTML = commandsStr[index].slice(0, i) + "▐";

        if (i == commandsStr[index].length) {
            clearInterval(se);
            $commands[index].innerHTML = commandsStr[index];
            $($commands[index]).parent('.command-container').next('.command-output').css('display', 'block');
            $($commands[index]).parent('.command-container').nextAll('.command-container').eq(0).find('p.command-prefix').css('display', 'inline-block');
            // 展示下一行命令的光标
            $($commands[index]).parent('.command-container').nextAll('.command-container').eq(0).find('p.cursor').css('display', 'inline-block');
        }

        var resume = document.getElementById("resume");
        var screen = document.getElementById("screen");
        screen.scrollTop = screen.scrollHeight - screen.clientHeight;
        console.log(screen.scrollHeight, screen.clientHeight, screen.scrollTop);

    }, typeInterval);
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
    var cmdTo = setTimeout(function() {
        typeCharToDisplayResult(index);
        if (index < $commands.length - 1) {
            serialRunCMD(index+1);
            clearTimeout(cmdTo);
        }
    }, commandsLen[index] * 150);
}

serialRunCMD(0);
