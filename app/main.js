/**
 * @author: TsaiKoga
 * @create_date: 2019-01-11
 */

import Promise from 'bluebird'
import './css/index.sass'
import $ from 'jquery'

const typeInterval = 100    // Time interval for each letter input 每次输入字母时间间隔
const enterInterval = 1000  // Time interval for each enter type   每次按下回车时间间隔
const $commands = $('#resume').find('.command-container .command')

let commandsStr = []
let commandsLen = []

async function typeCharToDisplayResult(index) {
    let i = 0
    while(i < commandsLen[index]) {
        i++
        // hide cursor 隐藏光标
        if ($($commands[index]).parent('.command-container').find('.cursor').css('display') != 'none') {
            $($commands[index]).parent('.command-container').find('.cursor').css('display', 'none')
        }
        $($commands[index]).parent('.command-container').find('.command').css('display', 'inline-block')
        $commands[index].innerHTML = commandsStr[index].slice(0, i) + "▐"

        if (i == commandsStr[index].length) {
            $commands[index].innerHTML = commandsStr[index];
            $($commands[index]).parent('.command-container').next('.command-output').css('display', 'block')
            $($commands[index]).parent('.command-container').nextAll('.command-container').eq(0).find('p.command-prefix').css('display', 'inline-block')
            // display the cursor on next command 展示下一行命令的光标
            $($commands[index]).parent('.command-container').nextAll('.command-container').eq(0).find('p.cursor').css('display', 'inline-block')
        }

        let resume = document.getElementById("resume")
        let screen = document.getElementById("screen")
        screen.scrollTop = screen.scrollHeight - screen.clientHeight
        await Promise.delay(typeInterval)
    }

}

async function runEachCMD(index) {
    while (index < $commands.length) {
        await typeCharToDisplayResult(index)
        await Promise.delay(enterInterval)
        index ++
    }
}

async function runMyResume() {
    $commands.each(function(index) {
        let len = this.innerHTML.length
        commandsStr.push(this.innerHTML)
        commandsLen.push(len)
        this.innerHTML = ""
    })
    await Promise.delay(enterInterval);
    runEachCMD(0)
}

runMyResume()
