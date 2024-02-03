/** @fileoverview File with app wide constants. */

/** Text displayed as a prompt. */
export const PROMPT = '$>';

/** Enum containing character used in terminal to handle input. */
export enum TerminalCharacters {
    Return = '\r',
    Backspace = '\u007f', // Delete
    CtrlC = '\u0003', // EndOfText
    Back = '\b',
};

export const GITHUB_USER_LOGO = ` 
     ██████╗ ███╗   ███╗██╗    ██╗ ██████╗  █████╗ ███████╗
    ██╔═══██╗████╗ ████║██║    ██║██╔═████╗██╔══██╗╚════██║
    ██║██╗██║██╔████╔██║██║ █╗ ██║██║██╔██║╚██████║    ██╔╝
    ██║██║██║██║╚██╔╝██║██║███╗██║████╔╝██║ ╚═══██║   ██╔╝ 
    ╚█║████╔╝██║ ╚═╝ ██║╚███╔███╔╝╚██████╔╝ █████╔╝   ██║  
    ╚╝╚═══╝ ╚═╝     ╚═╝ ╚══╝╚══╝  ╚═════╝  ╚════╝    ╚═╝  `;

export const TERMINAL_DESCRIPTION = `
    \x1b[1;34m@mw097's\x1B[0m resume website`;