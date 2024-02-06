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

/** Enum containing event keys used in terminal. */
export enum TerminalEventKeys {
    ArrowDown = 'ArrowDown',
    ArrowUp = 'ArrowUp',
    ArrowLeft = 'ArrowLeft',
    ArrowRight = 'ArrowRight',
    Backspace = 'Backspace',
    Enter = 'Enter',
    Escape = 'Escape',
    Space = ' ',
}

export const GITHUB_USER_LOGO = ` 
     ██████╗ ███╗   ███╗██╗    ██╗ ██████╗  █████╗ ███████╗
    ██╔═══██╗████╗ ████║██║    ██║██╔═████╗██╔══██╗╚════██║
    ██║██╗██║██╔████╔██║██║ █╗ ██║██║██╔██║╚██████║    ██╔╝
    ██║██║██║██║╚██╔╝██║██║███╗██║████╔╝██║ ╚═══██║   ██╔╝ 
    ╚█║████╔╝██║ ╚═╝ ██║╚███╔███╔╝╚██████╔╝ █████╔╝   ██║  
    ╚╝╚═══╝ ╚═╝     ╚═╝ ╚══╝╚══╝  ╚═════╝  ╚════╝    ╚═╝  `;

export const TERMINAL_DESCRIPTION = `
    \x1b[1m\x1b[1;34m@mw097's\x1B[0m\x1b[0m retro-terminal resume. Check out my GitHub \x1b]8;;https://github.com/mw097\x07profile\x1b]8;;\x07
    Type \x1b[1mhelp\x1b[0m to get list of commands.`;
