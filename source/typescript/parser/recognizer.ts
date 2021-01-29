
type BooleanTokenCheck = (l: Lexer) => boolean;
type TokenCheck = (l: Lexer) => boolean;
const action_array_offset: u32 = 382976;
const error_array_offset: u32 = 4577280;
const TokenSpace: u32 = 1;
const TokenNumber: u32 = 2;
const TokenIdentifier: u32 = 4;
const TokenNewLine: u32 = 8;
const TokenSymbol: u32 = 16;
const id: u16 = 2;
const num: u16 = 4;
let mark_: u32 = 0;
let action_ptr: u32 = 0;
let error_ptr: u32 = 0;
let stack_ptr: u32 = 0;
let FAILED: boolean = false;
let prod: i32 = -1;
let probe_index: u32 = 1;
let str: string;
function getTypeAt(code_point: u32): u32 {
    switch (load<u16>(code_point << 1) & 255) {
        default:
        case 0:
            return TokenSymbol;
        case 1:
            return TokenIdentifier;
        case 2:
            return TokenSpace;
        case 3:
        case 4:
            return TokenNewLine;
        case 5:
            return TokenNumber;
    }
    return 0;
}
class Lexer {
    ty: i32;
    tl: i32;
    off: i32;
    utf: i32;
    prev_off: i32;
    constructor() {
        this.ty = 0;
        this.tl = 0;
        this.off = 0;
        this.utf = 0;
        this.prev_off = 0;
    }
    copy(destination: Lexer = new Lexer()): Lexer {
        destination.utf = this.utf;
        destination.ty = this.ty;
        destination.tl = this.tl;
        destination.off = this.off;
        destination.prev_off = this.prev_off;
        return destination;
    }
    sync(marker: Lexer = new Lexer()): void {
        marker.copy(this);
    }
    isSym(): boolean {
        return this.ty == TokenSymbol;
    }
    isNL(): boolean {
        return this.ty == TokenNewLine;
    }
    isSP(): boolean {
        return this.ty == TokenSpace;
    }
    isNum(): boolean {
        if (this.ty == TokenNumber) {
            this.consumeNumeric();
            return true;
        }
        return false;
    }
    isID(): boolean {
        if (this.ty == TokenIdentifier) {
            this.consumeIdentifier();
            return true;
        }
        return false;
    }
    typeIs(flag: i32): boolean {
        return (this.ty & flag) == this.ty;
    }
    consumeNumeric(): void {
        const l: i32 = str.length;
        let off: i32 = this.off;
        this.tl = 1;
        while ((++off < l) && (num & (load<u16>(0 + (str.codePointAt(off) << 1)) >> 8))) {
            this.tl++;
        }
    }
    consumeIdentifier(): void {
        const l: i32 = str.length;
        let off: i32 = this.off;
        this.tl = 1;
        while ((++off < l) && ((num | id) & (load<u16>(0 + (str.codePointAt(off) << 1)) >> 8))) {
            this.tl++;
        }
    }
    getUTF(delta: i32 = 0): u32 {
        return str.codePointAt(this.off + delta);
    }
    getOffsetRegionDelta(): u32 {
        return this.off - this.prev_off;
    }
    advanceOffsetRegion(): void {
        this.prev_off = this.off + this.tl;
    }
    syncOffsetRegion(): void {
        this.prev_off = this.off;
    }
    typeAt(offset: i32 = 0): i32 {
        offset = this.off + offset;
        if (offset >= str.length) {
            return 0;
        }
        return getTypeAt(str.codePointAt(offset));
    }
    next(): Lexer {
        this.off = this.off + this.tl;
        this.tl = 1;
        if (this.off >= str.length) {
            this.ty = 0;
            this.tl = 0;
            this.utf = -1;
            this.off = str.length;
        } else {
            this.utf = str.codePointAt(this.off);
            this.ty = getTypeAt(this.utf);
        }
        return this;
    }
    END(): boolean {
        return this.off >= str.length;
    }
}
function cp00a86e9e_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    if ((l.typeAt(2) != TokenIdentifier) && ((l.getUTF(1) == 115) && (l.getUTF(0) == 97))) {
        l.ty = TokenSymbol;
        l.tl = 2;
        ACCEPT = true;
    }
    return ACCEPT;
}
function cp01881f9c_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    let val: u32 = 0;
    if (l.getUTF(0) == 102) {
        val = l.getUTF(1);
        if (val == 117) {
            if ((l.typeAt(8) != TokenIdentifier) && ((((((l.getUTF(7) == 110) && (l.getUTF(6) == 111)) && (l.getUTF(5) == 105)) && (l.getUTF(4) == 116)) && (l.getUTF(3) == 99)) && (l.getUTF(2) == 110))) {
                l.ty = TokenSymbol;
                l.tl = 8;
                ACCEPT = true;
            }
        } else if (val == 111) {
            if ((l.typeAt(3) != TokenIdentifier) && (l.getUTF(2) == 114)) {
                l.ty = TokenSymbol;
                l.tl = 3;
                ACCEPT = true;
            }
        } else if (val == 105) {
            if ((l.typeAt(7) != TokenIdentifier) && (((((l.getUTF(6) == 121) && (l.getUTF(5) == 108)) && (l.getUTF(4) == 108)) && (l.getUTF(3) == 97)) && (l.getUTF(2) == 110))) {
                l.ty = TokenSymbol;
                l.tl = 7;
                ACCEPT = true;
            }
        }
    }
    return ACCEPT;
}
function cp0725ae43_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    if ((l.typeAt(2) != TokenIdentifier) && ((l.getUTF(1) == 110) && (l.getUTF(0) == 105))) {
        l.ty = TokenSymbol;
        l.tl = 2;
        ACCEPT = true;
    }
    return ACCEPT;
}
function cp0ac89158_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    let val: u32 = 0;
    if (l.getUTF(0) == 43) {
        l.ty = TokenSymbol;
        l.tl = 1;
        ACCEPT = true;
        if (l.getUTF(1) == 43) {
            l.ty = TokenSymbol;
            l.tl = 2;
            ACCEPT = true;
        }
    }
    return ACCEPT;
}
function cp0adacb73_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    if ((l.typeAt(1) != TokenIdentifier) && (l.getUTF(0) == 97)) {
        l.ty = TokenSymbol;
        l.tl = 1;
        ACCEPT = true;
    }
    return ACCEPT;
}
function cp0b554d4a_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    let val: u32 = 0;
    if (l.getUTF(0) == 62) {
        if (l.getUTF(1) == 62) {
            l.ty = TokenSymbol;
            l.tl = 2;
            ACCEPT = true;
            if (l.getUTF(2) == 62) {
                l.ty = TokenSymbol;
                l.tl = 3;
                ACCEPT = true;
            }
        }
    }
    return ACCEPT;
}
function cp0bb67c25_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    if (((l.getUTF(2) == 61) && (l.getUTF(1) == 60)) && (l.getUTF(0) == 60)) {
        l.ty = TokenSymbol;
        l.tl = 3;
        ACCEPT = true;
    }
    return ACCEPT;
}
function cp0dd8c784_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    let val: u32 = 0;
    if (l.getUTF(0) == 63) {
        l.ty = TokenSymbol;
        l.tl = 1;
        ACCEPT = true;
        val = l.getUTF(1);
        if (val == 63) {
            l.ty = TokenSymbol;
            l.tl = 2;
            ACCEPT = true;
        } else if (val == 46) {
            l.ty = TokenSymbol;
            l.tl = 2;
            ACCEPT = true;
        }
    }
    return ACCEPT;
}
function cp10383e4e_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    if ((l.typeAt(4) != TokenIdentifier) && ((((l.getUTF(3) == 101) && (l.getUTF(2) == 115)) && (l.getUTF(1) == 108)) && (l.getUTF(0) == 101))) {
        l.ty = TokenSymbol;
        l.tl = 4;
        ACCEPT = true;
    }
    return ACCEPT;
}
function cp1ec153e7_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    if ((l.getUTF(1) == 60) && (l.getUTF(0) == 60)) {
        l.ty = TokenSymbol;
        l.tl = 2;
        ACCEPT = true;
    }
    return ACCEPT;
}
function cp1f027896_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    if ((l.typeAt(5) != TokenIdentifier) && (((((l.getUTF(4) == 115) && (l.getUTF(3) == 115)) && (l.getUTF(2) == 97)) && (l.getUTF(1) == 108)) && (l.getUTF(0) == 99))) {
        l.ty = TokenSymbol;
        l.tl = 5;
        ACCEPT = true;
    }
    return ACCEPT;
}
function cp1f6ac4c1_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    if ((l.typeAt(7) != TokenIdentifier) && (((((((l.getUTF(6) == 116) && (l.getUTF(5) == 108)) && (l.getUTF(4) == 117)) && (l.getUTF(3) == 97)) && (l.getUTF(2) == 102)) && (l.getUTF(1) == 101)) && (l.getUTF(0) == 100))) {
        l.ty = TokenSymbol;
        l.tl = 7;
        ACCEPT = true;
    }
    return ACCEPT;
}
function cp228079b2_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    let val: u32 = 0;
    if (l.getUTF(0) == 47) {
        l.ty = TokenSymbol;
        l.tl = 1;
        ACCEPT = true;
        if (l.getUTF(1) == 61) {
            l.ty = TokenSymbol;
            l.tl = 2;
            ACCEPT = true;
        }
    }
    return ACCEPT;
}
function cp241648a0_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    let val: u32 = 0;
    if (l.getUTF(0) == 116) {
        val = l.getUTF(1);
        if (val == 121) {
            if ((l.typeAt(6) != TokenIdentifier) && ((((l.getUTF(5) == 102) && (l.getUTF(4) == 111)) && (l.getUTF(3) == 101)) && (l.getUTF(2) == 112))) {
                l.ty = TokenSymbol;
                l.tl = 6;
                ACCEPT = true;
            }
        } else if (val == 114) {
            if ((l.typeAt(3) != TokenIdentifier) && (l.getUTF(2) == 121)) {
                l.ty = TokenSymbol;
                l.tl = 3;
                ACCEPT = true;
            }
        } else if (val == 104) {
            val = l.getUTF(2);
            if (val == 114) {
                if ((l.typeAt(5) != TokenIdentifier) && ((l.getUTF(4) == 119) && (l.getUTF(3) == 111))) {
                    l.ty = TokenSymbol;
                    l.tl = 5;
                    ACCEPT = true;
                }
            } else if (val == 105) {
                if ((l.typeAt(4) != TokenIdentifier) && (l.getUTF(3) == 115)) {
                    l.ty = TokenSymbol;
                    l.tl = 4;
                    ACCEPT = true;
                }
            }
        }
    }
    return ACCEPT;
}
function cp248c12d4_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    if ((l.typeAt(3) != TokenIdentifier) && (((l.getUTF(2) == 116) && (l.getUTF(1) == 101)) && (l.getUTF(0) == 115))) {
        l.ty = TokenSymbol;
        l.tl = 3;
        ACCEPT = true;
    }
    return ACCEPT;
}
function cp26550362_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    if ((l.typeAt(1) != TokenIdentifier) && (l.getUTF(0) == 99)) {
        l.ty = TokenSymbol;
        l.tl = 1;
        ACCEPT = true;
    }
    return ACCEPT;
}
function cp27956077_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    if ((l.typeAt(3) != TokenIdentifier) && (((l.getUTF(2) == 114) && (l.getUTF(1) == 97)) && (l.getUTF(0) == 118))) {
        l.ty = TokenSymbol;
        l.tl = 3;
        ACCEPT = true;
    }
    return ACCEPT;
}
function cp28cc5037_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    if ((l.typeAt(6) != TokenIdentifier) && ((((((l.getUTF(5) == 116) && (l.getUTF(4) == 101)) && (l.getUTF(3) == 103)) && (l.getUTF(2) == 114)) && (l.getUTF(1) == 97)) && (l.getUTF(0) == 116))) {
        l.ty = TokenSymbol;
        l.tl = 6;
        ACCEPT = true;
    }
    return ACCEPT;
}
function cp29720e9d_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    if ((l.getUTF(1) == 61) && (l.getUTF(0) == 47)) {
        l.ty = TokenSymbol;
        l.tl = 2;
        ACCEPT = true;
    }
    return ACCEPT;
}
function cp2c3ac106_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    let val: u32 = 0;
    if (l.getUTF(0) == 62) {
        l.ty = TokenSymbol;
        l.tl = 1;
        ACCEPT = true;
        val = l.getUTF(1);
        if (val == 62) {
            l.ty = TokenSymbol;
            l.tl = 2;
            ACCEPT = true;
            val = l.getUTF(2);
            if (val == 61) {
                l.ty = TokenSymbol;
                l.tl = 3;
                ACCEPT = true;
            } else if (val == 62) {
                l.ty = TokenSymbol;
                l.tl = 3;
                ACCEPT = true;
                if (l.getUTF(3) == 61) {
                    l.ty = TokenSymbol;
                    l.tl = 4;
                    ACCEPT = true;
                }
            }
        } else if (val == 61) {
            l.ty = TokenSymbol;
            l.tl = 2;
            ACCEPT = true;
        }
    }
    return ACCEPT;
}
function cp2d4154bd_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    let val: u32 = 0;
    if (l.getUTF(0) == 42) {
        l.ty = TokenSymbol;
        l.tl = 1;
        ACCEPT = true;
        if (l.getUTF(1) == 42) {
            l.ty = TokenSymbol;
            l.tl = 2;
            ACCEPT = true;
            if (l.getUTF(2) == 61) {
                l.ty = TokenSymbol;
                l.tl = 3;
                ACCEPT = true;
            }
        }
    }
    return ACCEPT;
}
function cp2d6537dd_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    let val: u32 = 0;
    if (l.getUTF(0) == 101) {
        val = l.getUTF(1);
        if (val == 120) {
            val = l.getUTF(2);
            if (val == 116) {
                if ((l.typeAt(7) != TokenIdentifier) && ((((l.getUTF(6) == 115) && (l.getUTF(5) == 100)) && (l.getUTF(4) == 110)) && (l.getUTF(3) == 101))) {
                    l.ty = TokenSymbol;
                    l.tl = 7;
                    ACCEPT = true;
                }
            } else if (val == 112) {
                if ((l.typeAt(6) != TokenIdentifier) && (((l.getUTF(5) == 116) && (l.getUTF(4) == 114)) && (l.getUTF(3) == 111))) {
                    l.ty = TokenSymbol;
                    l.tl = 6;
                    ACCEPT = true;
                }
            }
        } else if (val == 108) {
            if ((l.typeAt(4) != TokenIdentifier) && ((l.getUTF(3) == 101) && (l.getUTF(2) == 115))) {
                l.ty = TokenSymbol;
                l.tl = 4;
                ACCEPT = true;
            }
        }
    }
    return ACCEPT;
}
function cp2e37be7d_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    if ((l.typeAt(6) != TokenIdentifier) && ((((((l.getUTF(5) == 116) && (l.getUTF(4) == 114)) && (l.getUTF(3) == 111)) && (l.getUTF(2) == 112)) && (l.getUTF(1) == 109)) && (l.getUTF(0) == 105))) {
        l.ty = TokenSymbol;
        l.tl = 6;
        ACCEPT = true;
    }
    return ACCEPT;
}
function cp2f3a2b3c_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    if ((l.getUTF(1) == 46) && (l.getUTF(0) == 63)) {
        l.ty = TokenSymbol;
        l.tl = 2;
        ACCEPT = true;
    }
    return ACCEPT;
}
function cp2f772376_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    let val: u32 = 0;
    if (l.getUTF(0) == 102) {
        val = l.getUTF(1);
        if (val == 117) {
            if ((l.typeAt(8) != TokenIdentifier) && ((((((l.getUTF(7) == 110) && (l.getUTF(6) == 111)) && (l.getUTF(5) == 105)) && (l.getUTF(4) == 116)) && (l.getUTF(3) == 99)) && (l.getUTF(2) == 110))) {
                l.ty = TokenSymbol;
                l.tl = 8;
                ACCEPT = true;
            }
        } else if (val == 114) {
            if ((l.typeAt(4) != TokenIdentifier) && ((l.getUTF(3) == 109) && (l.getUTF(2) == 111))) {
                l.ty = TokenSymbol;
                l.tl = 4;
                ACCEPT = true;
            }
        }
    }
    return ACCEPT;
}
function cp35644963_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    let val: u32 = 0;
    if (l.getUTF(0) == 61) {
        if (l.getUTF(1) == 61) {
            l.ty = TokenSymbol;
            l.tl = 2;
            ACCEPT = true;
            if (l.getUTF(2) == 61) {
                l.ty = TokenSymbol;
                l.tl = 3;
                ACCEPT = true;
            }
        }
    }
    return ACCEPT;
}
function cp3617ce6e_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    if ((l.typeAt(4) != TokenIdentifier) && ((((l.getUTF(3) == 100) && (l.getUTF(2) == 105)) && (l.getUTF(1) == 111)) && (l.getUTF(0) == 118))) {
        l.ty = TokenSymbol;
        l.tl = 4;
        ACCEPT = true;
    }
    return ACCEPT;
}
function cp3b3b9dc5_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    if ((l.typeAt(5) != TokenIdentifier) && (((((l.getUTF(4) == 101) && (l.getUTF(3) == 115)) && (l.getUTF(2) == 108)) && (l.getUTF(1) == 97)) && (l.getUTF(0) == 102))) {
        l.ty = TokenSymbol;
        l.tl = 5;
        ACCEPT = true;
    }
    return ACCEPT;
}
function cp3c57f5ab_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    if ((l.typeAt(2) != TokenIdentifier) && ((l.getUTF(1) == 102) && (l.getUTF(0) == 105))) {
        l.ty = TokenSymbol;
        l.tl = 2;
        ACCEPT = true;
    }
    return ACCEPT;
}
function cp3cdaf3c5_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    let val: u32 = 0;
    if (l.getUTF(0) == 61) {
        l.ty = TokenSymbol;
        l.tl = 1;
        ACCEPT = true;
        if (l.getUTF(1) == 61) {
            l.ty = TokenSymbol;
            l.tl = 2;
            ACCEPT = true;
            if (l.getUTF(2) == 61) {
                l.ty = TokenSymbol;
                l.tl = 3;
                ACCEPT = true;
            }
        }
    }
    return ACCEPT;
}
function cp3e88794b_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    if ((l.typeAt(5) != TokenIdentifier) && (((((l.getUTF(4) == 100) && (l.getUTF(3) == 108)) && (l.getUTF(2) == 101)) && (l.getUTF(1) == 105)) && (l.getUTF(0) == 121))) {
        l.ty = TokenSymbol;
        l.tl = 5;
        ACCEPT = true;
    }
    return ACCEPT;
}
function cp3ed7c1f5_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    if ((l.typeAt(2) != TokenIdentifier) && ((l.getUTF(1) == 102) && (l.getUTF(0) == 111))) {
        l.ty = TokenSymbol;
        l.tl = 2;
        ACCEPT = true;
    }
    return ACCEPT;
}
function cp40cf8450_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    let val: u32 = 0;
    if (l.getUTF(0) == 45) {
        l.ty = TokenSymbol;
        l.tl = 1;
        ACCEPT = true;
        val = l.getUTF(1);
        if (val == 61) {
            l.ty = TokenSymbol;
            l.tl = 2;
            ACCEPT = true;
        } else if (val == 45) {
            l.ty = TokenSymbol;
            l.tl = 2;
            ACCEPT = true;
        }
    }
    return ACCEPT;
}
function cp42a2a37f_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    if ((l.typeAt(6) != TokenIdentifier) && ((((((l.getUTF(5) == 116) && (l.getUTF(4) == 114)) && (l.getUTF(3) == 111)) && (l.getUTF(2) == 112)) && (l.getUTF(1) == 120)) && (l.getUTF(0) == 101))) {
        l.ty = TokenSymbol;
        l.tl = 6;
        ACCEPT = true;
    }
    return ACCEPT;
}
function cp47b3f727_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    if ((l.typeAt(3) != TokenIdentifier) && (((l.getUTF(2) == 116) && (l.getUTF(1) == 101)) && (l.getUTF(0) == 103))) {
        l.ty = TokenSymbol;
        l.tl = 3;
        ACCEPT = true;
    }
    return ACCEPT;
}
function cp4a63017e_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    let val: u32 = 0;
    if (l.getUTF(0) == 100) {
        val = l.getUTF(1);
        if (val == 111) {
            l.ty = TokenSymbol;
            l.tl = 2;
            ACCEPT = true;
        } else if (val == 101) {
            val = l.getUTF(2);
            if (val == 108) {
                if ((l.typeAt(6) != TokenIdentifier) && (((l.getUTF(5) == 101) && (l.getUTF(4) == 116)) && (l.getUTF(3) == 101))) {
                    l.ty = TokenSymbol;
                    l.tl = 6;
                    ACCEPT = true;
                }
            } else if (val == 102) {
                if ((l.typeAt(7) != TokenIdentifier) && ((((l.getUTF(6) == 116) && (l.getUTF(5) == 108)) && (l.getUTF(4) == 117)) && (l.getUTF(3) == 97))) {
                    l.ty = TokenSymbol;
                    l.tl = 7;
                    ACCEPT = true;
                }
            } else if (val == 98) {
                if ((l.typeAt(8) != TokenIdentifier) && (((((l.getUTF(7) == 114) && (l.getUTF(6) == 101)) && (l.getUTF(5) == 103)) && (l.getUTF(4) == 103)) && (l.getUTF(3) == 117))) {
                    l.ty = TokenSymbol;
                    l.tl = 8;
                    ACCEPT = true;
                }
            }
        }
    }
    return ACCEPT;
}
function cp4aefdd15_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    let val: u32 = 0;
    if (l.getUTF(0) == 124) {
        l.ty = TokenSymbol;
        l.tl = 1;
        ACCEPT = true;
        if (l.getUTF(1) == 124) {
            l.ty = TokenSymbol;
            l.tl = 2;
            ACCEPT = true;
        }
    }
    return ACCEPT;
}
function cp4cd44fa7_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    if ((l.typeAt(5) != TokenIdentifier) && (((((l.getUTF(4) == 116) && (l.getUTF(3) == 105)) && (l.getUTF(2) == 97)) && (l.getUTF(1) == 119)) && (l.getUTF(0) == 97))) {
        l.ty = TokenSymbol;
        l.tl = 5;
        ACCEPT = true;
    }
    return ACCEPT;
}
function cp511a448f_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    if ((l.typeAt(1) != TokenIdentifier) && (l.getUTF(0) == 70)) {
        l.ty = TokenSymbol;
        l.tl = 1;
        ACCEPT = true;
    }
    return ACCEPT;
}
function cp54e87682_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    if ((l.typeAt(6) != TokenIdentifier) && ((((((l.getUTF(5) == 110) && (l.getUTF(4) == 114)) && (l.getUTF(3) == 117)) && (l.getUTF(2) == 116)) && (l.getUTF(1) == 101)) && (l.getUTF(0) == 114))) {
        l.ty = TokenSymbol;
        l.tl = 6;
        ACCEPT = true;
    }
    return ACCEPT;
}
function cp56c09138_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    if ((l.typeAt(6) != TokenIdentifier) && ((((((l.getUTF(5) == 104) && (l.getUTF(4) == 99)) && (l.getUTF(3) == 116)) && (l.getUTF(2) == 105)) && (l.getUTF(1) == 119)) && (l.getUTF(0) == 115))) {
        l.ty = TokenSymbol;
        l.tl = 6;
        ACCEPT = true;
    }
    return ACCEPT;
}
function cp5a8be194_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    if ((l.typeAt(6) != TokenIdentifier) && ((((((l.getUTF(5) == 102) && (l.getUTF(4) == 111)) && (l.getUTF(3) == 101)) && (l.getUTF(2) == 112)) && (l.getUTF(1) == 121)) && (l.getUTF(0) == 116))) {
        l.ty = TokenSymbol;
        l.tl = 6;
        ACCEPT = true;
    }
    return ACCEPT;
}
function cp5da57c06_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    if ((l.typeAt(4) != TokenIdentifier) && ((((l.getUTF(3) == 97) && (l.getUTF(2) == 116)) && (l.getUTF(1) == 101)) && (l.getUTF(0) == 109))) {
        l.ty = TokenSymbol;
        l.tl = 4;
        ACCEPT = true;
    }
    return ACCEPT;
}
function cp5ee5ce67_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    if ((l.typeAt(8) != TokenIdentifier) && ((((((((l.getUTF(7) == 114) && (l.getUTF(6) == 101)) && (l.getUTF(5) == 103)) && (l.getUTF(4) == 103)) && (l.getUTF(3) == 117)) && (l.getUTF(2) == 98)) && (l.getUTF(1) == 101)) && (l.getUTF(0) == 100))) {
        l.ty = TokenSymbol;
        l.tl = 8;
        ACCEPT = true;
    }
    return ACCEPT;
}
function cp600b6f48_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    if ((l.getUTF(1) == 124) && (l.getUTF(0) == 124)) {
        l.ty = TokenSymbol;
        l.tl = 2;
        ACCEPT = true;
    }
    return ACCEPT;
}
function cp612a3504_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    let val: u32 = 0;
    if (l.getUTF(0) == 42) {
        l.ty = TokenSymbol;
        l.tl = 1;
        ACCEPT = true;
        if (l.getUTF(1) == 42) {
            l.ty = TokenSymbol;
            l.tl = 2;
            ACCEPT = true;
        }
    }
    return ACCEPT;
}
function cp62236cc7_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    if ((l.typeAt(5) != TokenIdentifier) && (((((l.getUTF(4) == 101) && (l.getUTF(3) == 108)) && (l.getUTF(2) == 105)) && (l.getUTF(1) == 104)) && (l.getUTF(0) == 119))) {
        l.ty = TokenSymbol;
        l.tl = 5;
        ACCEPT = true;
    }
    return ACCEPT;
}
function cp628ccfc7_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    if ((l.getUTF(1) == 63) && (l.getUTF(0) == 63)) {
        l.ty = TokenSymbol;
        l.tl = 2;
        ACCEPT = true;
    }
    return ACCEPT;
}
function cp65c0e04e_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    if ((l.typeAt(4) != TokenIdentifier) && ((((l.getUTF(3) == 109) && (l.getUTF(2) == 111)) && (l.getUTF(1) == 114)) && (l.getUTF(0) == 102))) {
        l.ty = TokenSymbol;
        l.tl = 4;
        ACCEPT = true;
    }
    return ACCEPT;
}
function cp6730a980_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    if ((l.typeAt(1) != TokenIdentifier) && (l.getUTF(0) == 65)) {
        l.ty = TokenSymbol;
        l.tl = 1;
        ACCEPT = true;
    }
    return ACCEPT;
}
function cp6ce5d4c3_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    if ((l.typeAt(3) != TokenIdentifier) && (((l.getUTF(2) == 114) && (l.getUTF(1) == 111)) && (l.getUTF(0) == 102))) {
        l.ty = TokenSymbol;
        l.tl = 3;
        ACCEPT = true;
    }
    return ACCEPT;
}
function cp709acfcd_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    let val: u32 = 0;
    if (l.getUTF(0) == 43) {
        l.ty = TokenSymbol;
        l.tl = 1;
        ACCEPT = true;
        val = l.getUTF(1);
        if (val == 61) {
            l.ty = TokenSymbol;
            l.tl = 2;
            ACCEPT = true;
        } else if (val == 43) {
            l.ty = TokenSymbol;
            l.tl = 2;
            ACCEPT = true;
        }
    }
    return ACCEPT;
}
function cp742d6419_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    let val: u32 = 0;
    if (l.getUTF(0) == 99) {
        val = l.getUTF(1);
        if (val == 111) {
            if (l.getUTF(2) == 110) {
                val = l.getUTF(3);
                if (val == 116) {
                    if ((l.typeAt(8) != TokenIdentifier) && ((((l.getUTF(7) == 101) && (l.getUTF(6) == 117)) && (l.getUTF(5) == 110)) && (l.getUTF(4) == 105))) {
                        l.ty = TokenSymbol;
                        l.tl = 8;
                        ACCEPT = true;
                    }
                } else if (val == 115) {
                    if ((l.typeAt(5) != TokenIdentifier) && (l.getUTF(4) == 116)) {
                        l.ty = TokenSymbol;
                        l.tl = 5;
                        ACCEPT = true;
                    }
                }
            }
        } else if (val == 108) {
            if ((l.typeAt(5) != TokenIdentifier) && (((l.getUTF(4) == 115) && (l.getUTF(3) == 115)) && (l.getUTF(2) == 97))) {
                l.ty = TokenSymbol;
                l.tl = 5;
                ACCEPT = true;
            }
        } else if (val == 97) {
            val = l.getUTF(2);
            if (val == 116) {
                if ((l.typeAt(5) != TokenIdentifier) && ((l.getUTF(4) == 104) && (l.getUTF(3) == 99))) {
                    l.ty = TokenSymbol;
                    l.tl = 5;
                    ACCEPT = true;
                }
            } else if (val == 115) {
                if ((l.typeAt(4) != TokenIdentifier) && (l.getUTF(3) == 101)) {
                    l.ty = TokenSymbol;
                    l.tl = 4;
                    ACCEPT = true;
                }
            }
        }
    }
    return ACCEPT;
}
function cp744cb68c_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    let val: u32 = 0;
    if (l.getUTF(0) == 62) {
        l.ty = TokenSymbol;
        l.tl = 1;
        ACCEPT = true;
        if (l.getUTF(1) == 61) {
            l.ty = TokenSymbol;
            l.tl = 2;
            ACCEPT = true;
        }
    }
    return ACCEPT;
}
function cp749f34fc_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    if ((l.typeAt(3) != TokenIdentifier) && (((l.getUTF(2) == 121) && (l.getUTF(1) == 114)) && (l.getUTF(0) == 116))) {
        l.ty = TokenSymbol;
        l.tl = 3;
        ACCEPT = true;
    }
    return ACCEPT;
}
function cp7ab88329_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    if ((l.typeAt(1) != TokenIdentifier) && (l.getUTF(0) == 69)) {
        l.ty = TokenSymbol;
        l.tl = 1;
        ACCEPT = true;
    }
    return ACCEPT;
}
function cp7b8b1d3a_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    if ((l.typeAt(2) != TokenIdentifier) && ((l.getUTF(1) == 111) && (l.getUTF(0) == 100))) {
        l.ty = TokenSymbol;
        l.tl = 2;
        ACCEPT = true;
    }
    return ACCEPT;
}
function cp7d15091b_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    let val: u32 = 0;
    if (l.getUTF(0) == 38) {
        l.ty = TokenSymbol;
        l.tl = 1;
        ACCEPT = true;
        if (l.getUTF(1) == 61) {
            l.ty = TokenSymbol;
            l.tl = 2;
            ACCEPT = true;
        }
    }
    return ACCEPT;
}
function cp7d807160_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    if ((l.typeAt(10) != TokenIdentifier) && ((((((((((l.getUTF(9) == 102) && (l.getUTF(8) == 111)) && (l.getUTF(7) == 101)) && (l.getUTF(6) == 99)) && (l.getUTF(5) == 110)) && (l.getUTF(4) == 97)) && (l.getUTF(3) == 116)) && (l.getUTF(2) == 115)) && (l.getUTF(1) == 110)) && (l.getUTF(0) == 105))) {
        l.ty = TokenSymbol;
        l.tl = 10;
        ACCEPT = true;
    }
    return ACCEPT;
}
function cp7e436356_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    let val: u32 = 0;
    if (l.getUTF(0) == 94) {
        l.ty = TokenSymbol;
        l.tl = 1;
        ACCEPT = true;
        if (l.getUTF(1) == 61) {
            l.ty = TokenSymbol;
            l.tl = 2;
            ACCEPT = true;
        }
    }
    return ACCEPT;
}
function cp7e787cb3_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    if ((l.typeAt(1) != TokenIdentifier) && (l.getUTF(0) == 98)) {
        l.ty = TokenSymbol;
        l.tl = 1;
        ACCEPT = true;
    }
    return ACCEPT;
}
function cp7fa4386a_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    if (((l.getUTF(2) == 46) && (l.getUTF(1) == 46)) && (l.getUTF(0) == 46)) {
        l.ty = TokenSymbol;
        l.tl = 3;
        ACCEPT = true;
    }
    return ACCEPT;
}
function cp7fe59e4d_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    if ((l.typeAt(1) != TokenIdentifier) && (l.getUTF(0) == 102)) {
        l.ty = TokenSymbol;
        l.tl = 1;
        ACCEPT = true;
    }
    return ACCEPT;
}
function cp8485b2d7_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    let val: u32 = 0;
    if (l.getUTF(0) == 45) {
        val = l.getUTF(1);
        if (val == 45) {
            l.ty = TokenSymbol;
            l.tl = 2;
            ACCEPT = true;
        } else if (val == 61) {
            l.ty = TokenSymbol;
            l.tl = 2;
            ACCEPT = true;
        }
    }
    return ACCEPT;
}
function cp8595dc97_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    if ((l.typeAt(3) != TokenIdentifier) && (((l.getUTF(2) == 119) && (l.getUTF(1) == 101)) && (l.getUTF(0) == 110))) {
        l.ty = TokenSymbol;
        l.tl = 3;
        ACCEPT = true;
    }
    return ACCEPT;
}
function cp8687cbf2_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    let val: u32 = 0;
    if (l.getUTF(0) == 42) {
        l.ty = TokenSymbol;
        l.tl = 1;
        ACCEPT = true;
        if (l.getUTF(1) == 42) {
            if (l.getUTF(2) == 61) {
                l.ty = TokenSymbol;
                l.tl = 3;
                ACCEPT = true;
            }
        }
    }
    return ACCEPT;
}
function cp87f20bb1_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    if ((l.typeAt(8) != TokenIdentifier) && ((((((((l.getUTF(7) == 110) && (l.getUTF(6) == 111)) && (l.getUTF(5) == 105)) && (l.getUTF(4) == 116)) && (l.getUTF(3) == 99)) && (l.getUTF(2) == 110)) && (l.getUTF(1) == 117)) && (l.getUTF(0) == 102))) {
        l.ty = TokenSymbol;
        l.tl = 8;
        ACCEPT = true;
    }
    return ACCEPT;
}
function cp88c749c1_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    let val: u32 = 0;
    if (l.getUTF(0) == 119) {
        val = l.getUTF(1);
        if (val == 105) {
            if ((l.typeAt(4) != TokenIdentifier) && ((l.getUTF(3) == 104) && (l.getUTF(2) == 116))) {
                l.ty = TokenSymbol;
                l.tl = 4;
                ACCEPT = true;
            }
        } else if (val == 104) {
            if ((l.typeAt(5) != TokenIdentifier) && (((l.getUTF(4) == 101) && (l.getUTF(3) == 108)) && (l.getUTF(2) == 105))) {
                l.ty = TokenSymbol;
                l.tl = 5;
                ACCEPT = true;
            }
        }
    }
    return ACCEPT;
}
function cp8a61c8c0_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    if ((l.getUTF(1) == 61) && (l.getUTF(0) == 45)) {
        l.ty = TokenSymbol;
        l.tl = 2;
        ACCEPT = true;
    }
    return ACCEPT;
}
function cp8defc509_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    let val: u32 = 0;
    if (l.getUTF(0) == 124) {
        l.ty = TokenSymbol;
        l.tl = 1;
        ACCEPT = true;
        val = l.getUTF(1);
        if (val == 61) {
            l.ty = TokenSymbol;
            l.tl = 2;
            ACCEPT = true;
        } else if (val == 124) {
            l.ty = TokenSymbol;
            l.tl = 2;
            ACCEPT = true;
        }
    }
    return ACCEPT;
}
function cp8f376548_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    if ((l.typeAt(7) != TokenIdentifier) && (((((((l.getUTF(6) == 121) && (l.getUTF(5) == 108)) && (l.getUTF(4) == 108)) && (l.getUTF(3) == 97)) && (l.getUTF(2) == 110)) && (l.getUTF(1) == 105)) && (l.getUTF(0) == 102))) {
        l.ty = TokenSymbol;
        l.tl = 7;
        ACCEPT = true;
    }
    return ACCEPT;
}
function cp8fa1da3b_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    let val: u32 = 0;
    if (l.getUTF(0) == 61) {
        l.ty = TokenSymbol;
        l.tl = 1;
        ACCEPT = true;
        val = l.getUTF(1);
        if (val == 62) {
            l.ty = TokenSymbol;
            l.tl = 2;
            ACCEPT = true;
        } else if (val == 61) {
            l.ty = TokenSymbol;
            l.tl = 2;
            ACCEPT = true;
            if (l.getUTF(2) == 61) {
                l.ty = TokenSymbol;
                l.tl = 3;
                ACCEPT = true;
            }
        }
    }
    return ACCEPT;
}
function cp92ea8d2d_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    if ((l.typeAt(5) != TokenIdentifier) && (((((l.getUTF(4) == 116) && (l.getUTF(3) == 115)) && (l.getUTF(2) == 110)) && (l.getUTF(1) == 111)) && (l.getUTF(0) == 99))) {
        l.ty = TokenSymbol;
        l.tl = 5;
        ACCEPT = true;
    }
    return ACCEPT;
}
function cp93d4091f_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    let val: u32 = 0;
    if (l.getUTF(0) == 43) {
        val = l.getUTF(1);
        if (val == 43) {
            l.ty = TokenSymbol;
            l.tl = 2;
            ACCEPT = true;
        } else if (val == 61) {
            l.ty = TokenSymbol;
            l.tl = 2;
            ACCEPT = true;
        }
    }
    return ACCEPT;
}
function cp96563f93_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    if ((l.typeAt(8) != TokenIdentifier) && ((((((((l.getUTF(7) == 101) && (l.getUTF(6) == 117)) && (l.getUTF(5) == 110)) && (l.getUTF(4) == 105)) && (l.getUTF(3) == 116)) && (l.getUTF(2) == 110)) && (l.getUTF(1) == 111)) && (l.getUTF(0) == 99))) {
        l.ty = TokenSymbol;
        l.tl = 8;
        ACCEPT = true;
    }
    return ACCEPT;
}
function cp97ab5935_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    if ((l.typeAt(4) != TokenIdentifier) && ((((l.getUTF(3) == 101) && (l.getUTF(2) == 117)) && (l.getUTF(1) == 114)) && (l.getUTF(0) == 116))) {
        l.ty = TokenSymbol;
        l.tl = 4;
        ACCEPT = true;
    }
    return ACCEPT;
}
function cp99d83b20_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    if ((l.typeAt(1) != TokenIdentifier) && (l.getUTF(0) == 67)) {
        l.ty = TokenSymbol;
        l.tl = 1;
        ACCEPT = true;
    }
    return ACCEPT;
}
function cp9bc3c3be_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    let val: u32 = 0;
    if (l.getUTF(0) == 115) {
        val = l.getUTF(1);
        if (val == 119) {
            if ((l.typeAt(6) != TokenIdentifier) && ((((l.getUTF(5) == 104) && (l.getUTF(4) == 99)) && (l.getUTF(3) == 116)) && (l.getUTF(2) == 105))) {
                l.ty = TokenSymbol;
                l.tl = 6;
                ACCEPT = true;
            }
        } else if (val == 117) {
            if ((l.typeAt(5) != TokenIdentifier) && (((l.getUTF(4) == 114) && (l.getUTF(3) == 101)) && (l.getUTF(2) == 112))) {
                l.ty = TokenSymbol;
                l.tl = 5;
                ACCEPT = true;
            }
        }
    }
    return ACCEPT;
}
function cp9cee9bf7_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    let val: u32 = 0;
    if (l.getUTF(0) == 60) {
        l.ty = TokenSymbol;
        l.tl = 1;
        ACCEPT = true;
        val = l.getUTF(1);
        if (val == 61) {
            l.ty = TokenSymbol;
            l.tl = 2;
            ACCEPT = true;
        } else if (val == 60) {
            l.ty = TokenSymbol;
            l.tl = 2;
            ACCEPT = true;
            if (l.getUTF(2) == 61) {
                l.ty = TokenSymbol;
                l.tl = 3;
                ACCEPT = true;
            }
        }
    }
    return ACCEPT;
}
function cpa053380f_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    let val: u32 = 0;
    if (l.getUTF(0) == 62) {
        if (l.getUTF(1) == 62) {
            val = l.getUTF(2);
            if (val == 62) {
                if (l.getUTF(3) == 61) {
                    l.ty = TokenSymbol;
                    l.tl = 4;
                    ACCEPT = true;
                }
            } else if (val == 61) {
                l.ty = TokenSymbol;
                l.tl = 3;
                ACCEPT = true;
            }
        }
    }
    return ACCEPT;
}
function cpa0815727_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    if ((l.typeAt(3) != TokenIdentifier) && (((l.getUTF(2) == 116) && (l.getUTF(1) == 101)) && (l.getUTF(0) == 108))) {
        l.ty = TokenSymbol;
        l.tl = 3;
        ACCEPT = true;
    }
    return ACCEPT;
}
function cpa2c0bd5b_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    let val: u32 = 0;
    if (l.getUTF(0) == 99) {
        val = l.getUTF(1);
        if (val == 111) {
            if ((l.typeAt(5) != TokenIdentifier) && (((l.getUTF(4) == 116) && (l.getUTF(3) == 115)) && (l.getUTF(2) == 110))) {
                l.ty = TokenSymbol;
                l.tl = 5;
                ACCEPT = true;
            }
        } else if (val == 108) {
            if ((l.typeAt(5) != TokenIdentifier) && (((l.getUTF(4) == 115) && (l.getUTF(3) == 115)) && (l.getUTF(2) == 97))) {
                l.ty = TokenSymbol;
                l.tl = 5;
                ACCEPT = true;
            }
        }
    }
    return ACCEPT;
}
function cpa3b34eda_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    let val: u32 = 0;
    if (l.getUTF(0) == 97) {
        if (l.getUTF(1) == 115) {
            l.ty = TokenSymbol;
            l.tl = 2;
            ACCEPT = true;
            if (l.getUTF(2) == 121) {
                if ((l.typeAt(5) != TokenIdentifier) && ((l.getUTF(4) == 99) && (l.getUTF(3) == 110))) {
                    l.ty = TokenSymbol;
                    l.tl = 5;
                    ACCEPT = true;
                }
            }
        }
    }
    return ACCEPT;
}
function cpa457db98_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    let val: u32 = 0;
    if (l.getUTF(0) == 118) {
        val = l.getUTF(1);
        if (val == 111) {
            if ((l.typeAt(4) != TokenIdentifier) && ((l.getUTF(3) == 100) && (l.getUTF(2) == 105))) {
                l.ty = TokenSymbol;
                l.tl = 4;
                ACCEPT = true;
            }
        } else if (val == 97) {
            if ((l.typeAt(3) != TokenIdentifier) && (l.getUTF(2) == 114)) {
                l.ty = TokenSymbol;
                l.tl = 3;
                ACCEPT = true;
            }
        }
    }
    return ACCEPT;
}
function cpa70bdd76_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    if ((l.getUTF(1) == 43) && (l.getUTF(0) == 43)) {
        l.ty = TokenSymbol;
        l.tl = 2;
        ACCEPT = true;
    }
    return ACCEPT;
}
function cpa74f084c_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    if ((l.typeAt(7) != TokenIdentifier) && (((((((l.getUTF(6) == 115) && (l.getUTF(5) == 100)) && (l.getUTF(4) == 110)) && (l.getUTF(3) == 101)) && (l.getUTF(2) == 116)) && (l.getUTF(1) == 120)) && (l.getUTF(0) == 101))) {
        l.ty = TokenSymbol;
        l.tl = 7;
        ACCEPT = true;
    }
    return ACCEPT;
}
function cpa88fb47a_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    if ((l.typeAt(5) != TokenIdentifier) && (((((l.getUTF(4) == 107) && (l.getUTF(3) == 97)) && (l.getUTF(2) == 101)) && (l.getUTF(1) == 114)) && (l.getUTF(0) == 98))) {
        l.ty = TokenSymbol;
        l.tl = 5;
        ACCEPT = true;
    }
    return ACCEPT;
}
function cpab3c99ed_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    if ((l.typeAt(4) != TokenIdentifier) && ((((l.getUTF(3) == 101) && (l.getUTF(2) == 115)) && (l.getUTF(1) == 97)) && (l.getUTF(0) == 99))) {
        l.ty = TokenSymbol;
        l.tl = 4;
        ACCEPT = true;
    }
    return ACCEPT;
}
function cpac01a504_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    let val: u32 = 0;
    if (l.getUTF(0) == 60) {
        l.ty = TokenSymbol;
        l.tl = 1;
        ACCEPT = true;
        val = l.getUTF(1);
        if (val == 60) {
            l.ty = TokenSymbol;
            l.tl = 2;
            ACCEPT = true;
        } else if (val == 61) {
            l.ty = TokenSymbol;
            l.tl = 2;
            ACCEPT = true;
        }
    }
    return ACCEPT;
}
function cpad60fe53_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    let val: u32 = 0;
    if (l.getUTF(0) == 61) {
        l.ty = TokenSymbol;
        l.tl = 1;
        ACCEPT = true;
        val = l.getUTF(1);
        if (val == 61) {
            l.ty = TokenSymbol;
            l.tl = 2;
            ACCEPT = true;
            if (l.getUTF(2) == 61) {
                l.ty = TokenSymbol;
                l.tl = 3;
                ACCEPT = true;
            }
        } else if (val == 62) {
            l.ty = TokenSymbol;
            l.tl = 2;
            ACCEPT = true;
        }
    }
    return ACCEPT;
}
function cpaffbb9b3_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    let val: u32 = 0;
    if (l.getUTF(0) == 61) {
        l.ty = TokenSymbol;
        l.tl = 1;
        ACCEPT = true;
        if (l.getUTF(1) == 62) {
            l.ty = TokenSymbol;
            l.tl = 2;
            ACCEPT = true;
        }
    }
    return ACCEPT;
}
function cpb0cd62d6_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    let val: u32 = 0;
    if (l.getUTF(0) == 43) {
        l.ty = TokenSymbol;
        l.tl = 1;
        ACCEPT = true;
        val = l.getUTF(1);
        if (val == 43) {
            l.ty = TokenSymbol;
            l.tl = 2;
            ACCEPT = true;
        } else if (val == 61) {
            l.ty = TokenSymbol;
            l.tl = 2;
            ACCEPT = true;
        }
    }
    return ACCEPT;
}
function cpb0d301f2_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    if ((l.typeAt(1) != TokenIdentifier) && (l.getUTF(0) == 101)) {
        l.ty = TokenSymbol;
        l.tl = 1;
        ACCEPT = true;
    }
    return ACCEPT;
}
function cpb3d7011a_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    let val: u32 = 0;
    if (l.getUTF(0) == 124) {
        l.ty = TokenSymbol;
        l.tl = 1;
        ACCEPT = true;
        val = l.getUTF(1);
        if (val == 124) {
            l.ty = TokenSymbol;
            l.tl = 2;
            ACCEPT = true;
        } else if (val == 61) {
            l.ty = TokenSymbol;
            l.tl = 2;
            ACCEPT = true;
        }
    }
    return ACCEPT;
}
function cpb6e46596_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    if ((l.typeAt(5) != TokenIdentifier) && (((((l.getUTF(4) == 104) && (l.getUTF(3) == 99)) && (l.getUTF(2) == 116)) && (l.getUTF(1) == 97)) && (l.getUTF(0) == 99))) {
        l.ty = TokenSymbol;
        l.tl = 5;
        ACCEPT = true;
    }
    return ACCEPT;
}
function cpb9a3d66d_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    if ((l.getUTF(1) == 45) && (l.getUTF(0) == 45)) {
        l.ty = TokenSymbol;
        l.tl = 2;
        ACCEPT = true;
    }
    return ACCEPT;
}
function cpba9dd503_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    if ((l.getUTF(1) == 61) && (l.getUTF(0) == 37)) {
        l.ty = TokenSymbol;
        l.tl = 2;
        ACCEPT = true;
    }
    return ACCEPT;
}
function cpbb964dd2_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    let val: u32 = 0;
    if (l.getUTF(0) == 116) {
        val = l.getUTF(1);
        if (val == 114) {
            val = l.getUTF(2);
            if (val == 117) {
                if ((l.typeAt(4) != TokenIdentifier) && (l.getUTF(3) == 101)) {
                    l.ty = TokenSymbol;
                    l.tl = 4;
                    ACCEPT = true;
                }
            } else if (val == 121) {
                l.ty = TokenSymbol;
                l.tl = 3;
                ACCEPT = true;
            }
        } else if (val == 121) {
            if ((l.typeAt(6) != TokenIdentifier) && ((((l.getUTF(5) == 102) && (l.getUTF(4) == 111)) && (l.getUTF(3) == 101)) && (l.getUTF(2) == 112))) {
                l.ty = TokenSymbol;
                l.tl = 6;
                ACCEPT = true;
            }
        } else if (val == 104) {
            val = l.getUTF(2);
            if (val == 114) {
                if ((l.typeAt(5) != TokenIdentifier) && ((l.getUTF(4) == 119) && (l.getUTF(3) == 111))) {
                    l.ty = TokenSymbol;
                    l.tl = 5;
                    ACCEPT = true;
                }
            } else if (val == 105) {
                if ((l.typeAt(4) != TokenIdentifier) && (l.getUTF(3) == 115)) {
                    l.ty = TokenSymbol;
                    l.tl = 4;
                    ACCEPT = true;
                }
            }
        }
    }
    return ACCEPT;
}
function cpbbb8c976_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    if ((l.typeAt(5) != TokenIdentifier) && (((((l.getUTF(4) == 114) && (l.getUTF(3) == 101)) && (l.getUTF(2) == 112)) && (l.getUTF(1) == 117)) && (l.getUTF(0) == 115))) {
        l.ty = TokenSymbol;
        l.tl = 5;
        ACCEPT = true;
    }
    return ACCEPT;
}
function cpbd0a1baf_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    if ((l.getUTF(1) == 61) && (l.getUTF(0) == 38)) {
        l.ty = TokenSymbol;
        l.tl = 2;
        ACCEPT = true;
    }
    return ACCEPT;
}
function cpbd75a16c_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    if ((l.getUTF(1) == 61) && (l.getUTF(0) == 94)) {
        l.ty = TokenSymbol;
        l.tl = 2;
        ACCEPT = true;
    }
    return ACCEPT;
}
function cpbf65945a_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    let val: u32 = 0;
    if (l.getUTF(0) == 112) {
        val = l.getUTF(1);
        if (val == 117) {
            if ((l.typeAt(6) != TokenIdentifier) && ((((l.getUTF(5) == 99) && (l.getUTF(4) == 105)) && (l.getUTF(3) == 108)) && (l.getUTF(2) == 98))) {
                l.ty = TokenSymbol;
                l.tl = 6;
                ACCEPT = true;
            }
        } else if (val == 114) {
            val = l.getUTF(2);
            if (val == 105) {
                if ((l.typeAt(7) != TokenIdentifier) && ((((l.getUTF(6) == 101) && (l.getUTF(5) == 116)) && (l.getUTF(4) == 97)) && (l.getUTF(3) == 118))) {
                    l.ty = TokenSymbol;
                    l.tl = 7;
                    ACCEPT = true;
                }
            } else if (val == 111) {
                if ((l.typeAt(9) != TokenIdentifier) && ((((((l.getUTF(8) == 100) && (l.getUTF(7) == 101)) && (l.getUTF(6) == 116)) && (l.getUTF(5) == 99)) && (l.getUTF(4) == 101)) && (l.getUTF(3) == 116))) {
                    l.ty = TokenSymbol;
                    l.tl = 9;
                    ACCEPT = true;
                }
            }
        } else if (val == 97) {
            if ((l.typeAt(7) != TokenIdentifier) && (((((l.getUTF(6) == 101) && (l.getUTF(5) == 103)) && (l.getUTF(4) == 97)) && (l.getUTF(3) == 107)) && (l.getUTF(2) == 99))) {
                l.ty = TokenSymbol;
                l.tl = 7;
                ACCEPT = true;
            }
        }
    }
    return ACCEPT;
}
function cpc102d490_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    let val: u32 = 0;
    if (l.getUTF(0) == 33) {
        if (l.getUTF(1) == 61) {
            l.ty = TokenSymbol;
            l.tl = 2;
            ACCEPT = true;
            if (l.getUTF(2) == 61) {
                l.ty = TokenSymbol;
                l.tl = 3;
                ACCEPT = true;
            }
        }
    }
    return ACCEPT;
}
function cpc1d70283_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    if ((l.typeAt(1) != TokenIdentifier) && (l.getUTF(0) == 110)) {
        l.ty = TokenSymbol;
        l.tl = 1;
        ACCEPT = true;
    }
    return ACCEPT;
}
function cpc3443c4f_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    if (((l.getUTF(2) == 61) && (l.getUTF(1) == 42)) && (l.getUTF(0) == 42)) {
        l.ty = TokenSymbol;
        l.tl = 3;
        ACCEPT = true;
    }
    return ACCEPT;
}
function cpc47bdd9c_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    let val: u32 = 0;
    if (l.getUTF(0) == 105) {
        val = l.getUTF(1);
        if (val == 110) {
            if ((l.typeAt(9) != TokenIdentifier) && (((((((l.getUTF(8) == 101) && (l.getUTF(7) == 99)) && (l.getUTF(6) == 97)) && (l.getUTF(5) == 102)) && (l.getUTF(4) == 114)) && (l.getUTF(3) == 101)) && (l.getUTF(2) == 116))) {
                l.ty = TokenSymbol;
                l.tl = 9;
                ACCEPT = true;
            }
        } else if (val == 109) {
            if ((l.typeAt(10) != TokenIdentifier) && ((((((((l.getUTF(9) == 115) && (l.getUTF(8) == 116)) && (l.getUTF(7) == 110)) && (l.getUTF(6) == 101)) && (l.getUTF(5) == 109)) && (l.getUTF(4) == 101)) && (l.getUTF(3) == 108)) && (l.getUTF(2) == 112))) {
                l.ty = TokenSymbol;
                l.tl = 10;
                ACCEPT = true;
            }
        }
    }
    return ACCEPT;
}
function cpc71d0162_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    let val: u32 = 0;
    if (l.getUTF(0) == 63) {
        l.ty = TokenSymbol;
        l.tl = 1;
        ACCEPT = true;
        val = l.getUTF(1);
        if (val == 46) {
            l.ty = TokenSymbol;
            l.tl = 2;
            ACCEPT = true;
        } else if (val == 63) {
            l.ty = TokenSymbol;
            l.tl = 2;
            ACCEPT = true;
        }
    }
    return ACCEPT;
}
function cpc7ed71c1_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    if ((l.typeAt(6) != TokenIdentifier) && ((((((l.getUTF(5) == 101) && (l.getUTF(4) == 116)) && (l.getUTF(3) == 101)) && (l.getUTF(2) == 108)) && (l.getUTF(1) == 101)) && (l.getUTF(0) == 100))) {
        l.ty = TokenSymbol;
        l.tl = 6;
        ACCEPT = true;
    }
    return ACCEPT;
}
function cpcbadb5c4_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    let val: u32 = 0;
    if (l.getUTF(0) == 105) {
        if (l.getUTF(1) == 110) {
            l.ty = TokenSymbol;
            l.tl = 2;
            ACCEPT = true;
            if (l.getUTF(2) == 115) {
                if ((l.typeAt(10) != TokenIdentifier) && (((((((l.getUTF(9) == 102) && (l.getUTF(8) == 111)) && (l.getUTF(7) == 101)) && (l.getUTF(6) == 99)) && (l.getUTF(5) == 110)) && (l.getUTF(4) == 97)) && (l.getUTF(3) == 116))) {
                    l.ty = TokenSymbol;
                    l.tl = 10;
                    ACCEPT = true;
                }
            }
        }
    }
    return ACCEPT;
}
function cpcbd55029_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    if ((l.typeAt(5) != TokenIdentifier) && (((((l.getUTF(4) == 119) && (l.getUTF(3) == 111)) && (l.getUTF(2) == 114)) && (l.getUTF(1) == 104)) && (l.getUTF(0) == 116))) {
        l.ty = TokenSymbol;
        l.tl = 5;
        ACCEPT = true;
    }
    return ACCEPT;
}
function cpd244b007_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    let val: u32 = 0;
    if (l.getUTF(0) == 60) {
        l.ty = TokenSymbol;
        l.tl = 1;
        ACCEPT = true;
        val = l.getUTF(1);
        if (val == 60) {
            l.ty = TokenSymbol;
            l.tl = 2;
            ACCEPT = true;
            if (l.getUTF(2) == 61) {
                l.ty = TokenSymbol;
                l.tl = 3;
                ACCEPT = true;
            }
        } else if (val == 61) {
            l.ty = TokenSymbol;
            l.tl = 2;
            ACCEPT = true;
        }
    }
    return ACCEPT;
}
function cpd382bd1a_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    if ((l.typeAt(1) != TokenIdentifier) && (l.getUTF(0) == 68)) {
        l.ty = TokenSymbol;
        l.tl = 1;
        ACCEPT = true;
    }
    return ACCEPT;
}
function cpd4ebf6f8_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    let val: u32 = 0;
    if (l.getUTF(0) == 62) {
        l.ty = TokenSymbol;
        l.tl = 1;
        ACCEPT = true;
        val = l.getUTF(1);
        if (val == 61) {
            l.ty = TokenSymbol;
            l.tl = 2;
            ACCEPT = true;
        } else if (val == 62) {
            l.ty = TokenSymbol;
            l.tl = 2;
            ACCEPT = true;
            val = l.getUTF(2);
            if (val == 62) {
                l.ty = TokenSymbol;
                l.tl = 3;
                ACCEPT = true;
                if (l.getUTF(3) == 61) {
                    l.ty = TokenSymbol;
                    l.tl = 4;
                    ACCEPT = true;
                }
            } else if (val == 61) {
                l.ty = TokenSymbol;
                l.tl = 3;
                ACCEPT = true;
            }
        }
    }
    return ACCEPT;
}
function cpd644a1c0_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    let val: u32 = 0;
    if (l.getUTF(0) == 63) {
        l.ty = TokenSymbol;
        l.tl = 1;
        ACCEPT = true;
        if (l.getUTF(1) == 63) {
            l.ty = TokenSymbol;
            l.tl = 2;
            ACCEPT = true;
        }
    }
    return ACCEPT;
}
function cpd766eebc_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    if ((l.typeAt(4) != TokenIdentifier) && ((((l.getUTF(3) == 104) && (l.getUTF(2) == 116)) && (l.getUTF(1) == 105)) && (l.getUTF(0) == 119))) {
        l.ty = TokenSymbol;
        l.tl = 4;
        ACCEPT = true;
    }
    return ACCEPT;
}
function cpd93bce4d_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    let val: u32 = 0;
    if (l.getUTF(0) == 110) {
        val = l.getUTF(1);
        if (val == 117) {
            if ((l.typeAt(4) != TokenIdentifier) && ((l.getUTF(3) == 108) && (l.getUTF(2) == 108))) {
                l.ty = TokenSymbol;
                l.tl = 4;
                ACCEPT = true;
            }
        } else if (val == 101) {
            if ((l.typeAt(3) != TokenIdentifier) && (l.getUTF(2) == 119)) {
                l.ty = TokenSymbol;
                l.tl = 3;
                ACCEPT = true;
            }
        }
    }
    return ACCEPT;
}
function cpdc719e35_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    let val: u32 = 0;
    if (l.getUTF(0) == 62) {
        l.ty = TokenSymbol;
        l.tl = 1;
        ACCEPT = true;
        val = l.getUTF(1);
        if (val == 62) {
            l.ty = TokenSymbol;
            l.tl = 2;
            ACCEPT = true;
            if (l.getUTF(2) == 62) {
                l.ty = TokenSymbol;
                l.tl = 3;
                ACCEPT = true;
            }
        } else if (val == 61) {
            l.ty = TokenSymbol;
            l.tl = 2;
            ACCEPT = true;
        }
    }
    return ACCEPT;
}
function cpdcbfef5f_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    if ((l.typeAt(5) != TokenIdentifier) && (((((l.getUTF(4) == 99) && (l.getUTF(3) == 110)) && (l.getUTF(2) == 121)) && (l.getUTF(1) == 115)) && (l.getUTF(0) == 97))) {
        l.ty = TokenSymbol;
        l.tl = 5;
        ACCEPT = true;
    }
    return ACCEPT;
}
function cpdcf27c23_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    let val: u32 = 0;
    if (l.getUTF(0) == 45) {
        l.ty = TokenSymbol;
        l.tl = 1;
        ACCEPT = true;
        val = l.getUTF(1);
        if (val == 45) {
            l.ty = TokenSymbol;
            l.tl = 2;
            ACCEPT = true;
        } else if (val == 61) {
            l.ty = TokenSymbol;
            l.tl = 2;
            ACCEPT = true;
        }
    }
    return ACCEPT;
}
function cpe3a3596e_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    if ((l.typeAt(4) != TokenIdentifier) && ((((l.getUTF(3) == 108) && (l.getUTF(2) == 108)) && (l.getUTF(1) == 117)) && (l.getUTF(0) == 110))) {
        l.ty = TokenSymbol;
        l.tl = 4;
        ACCEPT = true;
    }
    return ACCEPT;
}
function cpe4ea5b7d_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    let val: u32 = 0;
    if (l.getUTF(0) == 105) {
        val = l.getUTF(1);
        if (val == 110) {
            l.ty = TokenSymbol;
            l.tl = 2;
            ACCEPT = true;
            if (l.getUTF(2) == 115) {
                if ((l.typeAt(10) != TokenIdentifier) && (((((((l.getUTF(9) == 102) && (l.getUTF(8) == 111)) && (l.getUTF(7) == 101)) && (l.getUTF(6) == 99)) && (l.getUTF(5) == 110)) && (l.getUTF(4) == 97)) && (l.getUTF(3) == 116))) {
                    l.ty = TokenSymbol;
                    l.tl = 10;
                    ACCEPT = true;
                }
            }
        } else if (val == 109) {
            if ((l.typeAt(6) != TokenIdentifier) && ((((l.getUTF(5) == 116) && (l.getUTF(4) == 114)) && (l.getUTF(3) == 111)) && (l.getUTF(2) == 112))) {
                l.ty = TokenSymbol;
                l.tl = 6;
                ACCEPT = true;
            }
        } else if (val == 102) {
            l.ty = TokenSymbol;
            l.tl = 2;
            ACCEPT = true;
        }
    }
    return ACCEPT;
}
function cpe8a3cd39_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    if ((l.typeAt(1) != TokenIdentifier) && (l.getUTF(0) == 100)) {
        l.ty = TokenSymbol;
        l.tl = 1;
        ACCEPT = true;
    }
    return ACCEPT;
}
function cped7e7079_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    if ((l.getUTF(1) == 123) && (l.getUTF(0) == 36)) {
        l.ty = TokenSymbol;
        l.tl = 2;
        ACCEPT = true;
    }
    return ACCEPT;
}
function cpee595c53_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    let val: u32 = 0;
    if (l.getUTF(0) == 60) {
        l.ty = TokenSymbol;
        l.tl = 1;
        ACCEPT = true;
        if (l.getUTF(1) == 61) {
            l.ty = TokenSymbol;
            l.tl = 2;
            ACCEPT = true;
        }
    }
    return ACCEPT;
}
function cpef2cb0a4_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    if ((l.typeAt(6) != TokenIdentifier) && ((((((l.getUTF(5) == 99) && (l.getUTF(4) == 105)) && (l.getUTF(3) == 116)) && (l.getUTF(2) == 97)) && (l.getUTF(1) == 116)) && (l.getUTF(0) == 115))) {
        l.ty = TokenSymbol;
        l.tl = 6;
        ACCEPT = true;
    }
    return ACCEPT;
}
function cpf1259c37_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    if ((l.typeAt(1) != TokenIdentifier) && (l.getUTF(0) == 66)) {
        l.ty = TokenSymbol;
        l.tl = 1;
        ACCEPT = true;
    }
    return ACCEPT;
}
function cpf26f817f_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    let val: u32 = 0;
    if (l.getUTF(0) == 102) {
        val = l.getUTF(1);
        if (val == 97) {
            if ((l.typeAt(5) != TokenIdentifier) && (((l.getUTF(4) == 101) && (l.getUTF(3) == 115)) && (l.getUTF(2) == 108))) {
                l.ty = TokenSymbol;
                l.tl = 5;
                ACCEPT = true;
            }
        } else if (val == 117) {
            if ((l.typeAt(8) != TokenIdentifier) && ((((((l.getUTF(7) == 110) && (l.getUTF(6) == 111)) && (l.getUTF(5) == 105)) && (l.getUTF(4) == 116)) && (l.getUTF(3) == 99)) && (l.getUTF(2) == 110))) {
                l.ty = TokenSymbol;
                l.tl = 8;
                ACCEPT = true;
            }
        } else if (val == 111) {
            if ((l.typeAt(3) != TokenIdentifier) && (l.getUTF(2) == 114)) {
                l.ty = TokenSymbol;
                l.tl = 3;
                ACCEPT = true;
            }
        } else if (val == 105) {
            if ((l.typeAt(7) != TokenIdentifier) && (((((l.getUTF(6) == 121) && (l.getUTF(5) == 108)) && (l.getUTF(4) == 108)) && (l.getUTF(3) == 97)) && (l.getUTF(2) == 110))) {
                l.ty = TokenSymbol;
                l.tl = 7;
                ACCEPT = true;
            }
        }
    }
    return ACCEPT;
}
function cpf2b923e4_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    if ((l.getUTF(1) == 42) && (l.getUTF(0) == 42)) {
        l.ty = TokenSymbol;
        l.tl = 2;
        ACCEPT = true;
    }
    return ACCEPT;
}
function cpf526e31a_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    if ((l.getUTF(1) == 62) && (l.getUTF(0) == 61)) {
        l.ty = TokenSymbol;
        l.tl = 2;
        ACCEPT = true;
    }
    return ACCEPT;
}
function cpf7472959_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    let val: u32 = 0;
    if (l.getUTF(0) == 37) {
        l.ty = TokenSymbol;
        l.tl = 1;
        ACCEPT = true;
        if (l.getUTF(1) == 61) {
            l.ty = TokenSymbol;
            l.tl = 2;
            ACCEPT = true;
        }
    }
    return ACCEPT;
}
function cpf9c848a4_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    if ((l.getUTF(1) == 39) && (l.getUTF(0) == 39)) {
        l.ty = TokenSymbol;
        l.tl = 2;
        ACCEPT = true;
    }
    return ACCEPT;
}
function cpf9ccda11_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    if ((l.getUTF(1) == 61) && (l.getUTF(0) == 124)) {
        l.ty = TokenSymbol;
        l.tl = 2;
        ACCEPT = true;
    }
    return ACCEPT;
}
function cpfa5d29df_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    let val: u32 = 0;
    if (l.getUTF(0) == 116) {
        val = l.getUTF(1);
        if (val == 121) {
            if ((l.typeAt(6) != TokenIdentifier) && ((((l.getUTF(5) == 102) && (l.getUTF(4) == 111)) && (l.getUTF(3) == 101)) && (l.getUTF(2) == 112))) {
                l.ty = TokenSymbol;
                l.tl = 6;
                ACCEPT = true;
            }
        } else if (val == 114) {
            if ((l.typeAt(4) != TokenIdentifier) && ((l.getUTF(3) == 101) && (l.getUTF(2) == 117))) {
                l.ty = TokenSymbol;
                l.tl = 4;
                ACCEPT = true;
            }
        } else if (val == 104) {
            if ((l.typeAt(4) != TokenIdentifier) && ((l.getUTF(3) == 115) && (l.getUTF(2) == 105))) {
                l.ty = TokenSymbol;
                l.tl = 4;
                ACCEPT = true;
            }
        }
    }
    return ACCEPT;
}
function cpfa882b22_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    if ((l.getUTF(1) == 61) && (l.getUTF(0) == 43)) {
        l.ty = TokenSymbol;
        l.tl = 2;
        ACCEPT = true;
    }
    return ACCEPT;
}
function cpfaa7aa14_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    let val: u32 = 0;
    if (l.getUTF(0) == 45) {
        l.ty = TokenSymbol;
        l.tl = 1;
        ACCEPT = true;
        if (l.getUTF(1) == 45) {
            l.ty = TokenSymbol;
            l.tl = 2;
            ACCEPT = true;
        }
    }
    return ACCEPT;
}
function cpfd2df4a8_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    let val: u32 = 0;
    if (l.getUTF(0) == 105) {
        val = l.getUTF(1);
        if (val == 110) {
            l.ty = TokenSymbol;
            l.tl = 2;
            ACCEPT = true;
            val = l.getUTF(2);
            if (val == 116) {
                if ((l.typeAt(9) != TokenIdentifier) && ((((((l.getUTF(8) == 101) && (l.getUTF(7) == 99)) && (l.getUTF(6) == 97)) && (l.getUTF(5) == 102)) && (l.getUTF(4) == 114)) && (l.getUTF(3) == 101))) {
                    l.ty = TokenSymbol;
                    l.tl = 9;
                    ACCEPT = true;
                }
            } else if (val == 115) {
                if ((l.typeAt(10) != TokenIdentifier) && (((((((l.getUTF(9) == 102) && (l.getUTF(8) == 111)) && (l.getUTF(7) == 101)) && (l.getUTF(6) == 99)) && (l.getUTF(5) == 110)) && (l.getUTF(4) == 97)) && (l.getUTF(3) == 116))) {
                    l.ty = TokenSymbol;
                    l.tl = 10;
                    ACCEPT = true;
                }
            }
        } else if (val == 109) {
            if (l.getUTF(2) == 112) {
                val = l.getUTF(3);
                if (val == 108) {
                    if ((l.typeAt(10) != TokenIdentifier) && ((((((l.getUTF(9) == 115) && (l.getUTF(8) == 116)) && (l.getUTF(7) == 110)) && (l.getUTF(6) == 101)) && (l.getUTF(5) == 109)) && (l.getUTF(4) == 101))) {
                        l.ty = TokenSymbol;
                        l.tl = 10;
                        ACCEPT = true;
                    }
                } else if (val == 111) {
                    if ((l.typeAt(6) != TokenIdentifier) && ((l.getUTF(5) == 116) && (l.getUTF(4) == 114))) {
                        l.ty = TokenSymbol;
                        l.tl = 6;
                        ACCEPT = true;
                    }
                }
            }
        } else if (val == 102) {
            l.ty = TokenSymbol;
            l.tl = 2;
            ACCEPT = true;
        }
    }
    return ACCEPT;
}
function cpfe029929_(l: Lexer): boolean {
    let ACCEPT: boolean = false;
    if ((l.typeAt(4) != TokenIdentifier) && ((((l.getUTF(3) == 115) && (l.getUTF(2) == 105)) && (l.getUTF(1) == 104)) && (l.getUTF(0) == 116))) {
        l.ty = TokenSymbol;
        l.tl = 4;
        ACCEPT = true;
    }
    return ACCEPT;
}
function skip_fn_(l: Lexer): Lexer {
    while (1) {
        if (!(l.isSP()/*[ws]*/ || l.isNL()/*[nl]*/)) {
            break;
        }
        l.next();
    }
    return l;
}
function skip_fn_000(l: Lexer): Lexer {
    while (1) {
        if (!(l.isSP()/*[ws]*/)) {
            break;
        }
        l.next();
    }
    return l;
}
function skip_fn_001(l: Lexer): Lexer {
    while (1) {
        if (!(l.isNL()/*[nl]*/)) {
            break;
        }
        l.next();
    }
    return l;
}
function __asi__(l: Lexer): boolean {
    if ((l.utf == 59/*[;]*/)) {
        return true;
    }
    if ((((l.isNL()/*[nl]*/) || (l.utf == 125/*[}]*/)) || (false)) || (l.utf == 40/*[(]*/)) {
        l.tl = 0;
        return true;
    }
    return false;
}
function __double_quote_string__(l: Lexer): boolean {
    let pk1: Lexer = l.copy();;
    while (!(pk1.utf == 34/*["]*/) && !(false)) {
        {
            if ((pk1.utf == 92/*[\]*/)) {
                pk1.next();
            }
            pk1.next();
        }
    }
    if (!(pk1.utf == 34/*["]*/)) {
        return false;
    }
    consume(l);
    return true;
}
function __single_quote_string__(l: Lexer): boolean {
    let pk1: Lexer = l.copy();;
    while (!(cpf9c848a4_(pk1)/*['']*/) && !(false)) {
        {
            if ((pk1.utf == 92/*[\]*/)) {
                pk1.next();
            }
            pk1.next();
        }
    }
    if (!(cpf9c848a4_(pk1)/*['']*/)) {
        return false;
    }
    consume(l);
    return true;
}
function set_error(val: u32): void {
    if (error_ptr >= 40980) {
        return;
    }
    store<u32>((error_ptr++ << 2) + error_array_offset, val);
}
function set_action(val: u32): void {
    store<u32>((action_ptr++ << 2) + action_array_offset, val);
}
function mark(): u32 {
    mark_ = action_ptr;
    return mark_;
}
function assert_table(l: Lexer, a: u32, b: u32, c: u32, d: u32): boolean {
    const utf: i32 = l.utf;
    if (utf < 32) {
        return (a & (1 << utf)) != 0;
    } else if (utf < 64) {
        return (b & (1 << (utf - 32))) != 0;
    } else if (utf < 96) {
        return (c & (1 << (utf - 64))) != 0;
    } else if (utf < 128) {
        return (d & (1 << (utf - 96))) != 0;
    }
    return false;
}
function reset(mark: u32, origin: Lexer, advanced: Lexer, pass: boolean): boolean {
    if (!FAILED && pass) {
        return false;
    }
    action_ptr = mark;
    advanced.sync(origin);
    FAILED = false;
    return true;
}
function add_shift(l: Lexer, char_len: u32): void {
    const skip_delta: u32 = l.getOffsetRegionDelta();
    let has_skip: u32 = skip_delta > 0;
    let has_len: u32 = char_len > 0;
    let val: u32 = 1;
    val |= (skip_delta << 3);
    if (has_skip && ((skip_delta > 36863) || (char_len > 36863))) {
        add_shift(l, 0);
        has_skip = 0;
        val = 1;
    }
    val |= (((has_skip << 2) | (has_len << 1)) | (char_len << (3 + (15 * has_skip))));
    set_action(val);
    l.advanceOffsetRegion();
}
function add_reduce(sym_len: u32, body: u32, DNP: boolean = false): void {
    set_action(((DNP << 1) | ((sym_len & 16383) << 2)) | (body << 16));
}
function fail(l: Lexer): boolean {
    if (!FAILED) {
        prod = -1;
        soft_fail(l);
    }
    return false;
}
function soft_fail(l: Lexer): void {
    FAILED = true;
    set_error(l.off);
}
function assertSuccess(l: Lexer, condition: boolean): boolean {
    if (!condition || FAILED) {
        return fail(l);
    }
    return true;
}
function consume(l: Lexer): void {
    add_shift(l, l.tl);
    l.next();
}
function consume_empty(l: Lexer): void {
    add_shift(l, 0);
}
function assert_consume(l: Lexer, accept: boolean): boolean {
    if (FAILED) {
        return false;
    }
    if (accept) {
        consume(l);
        return true;
    } else {
        return false;
    }
}
function reset_counters_and_pointers(): void {
    prod = -1;
    stack_ptr = 0;
    error_ptr = 0;
    action_ptr = 0;
    FAILED = false;
}
function $javascript(l: Lexer): boolean {
    if ($module_body(l)) {
        add_reduce(1, 2);
        add_reduce(1, 1);
        prod = 0;
    }
    return assertSuccess(l, prod == 0);
}
function $module_body(l: Lexer): boolean {
    if ($module_item(l)) {
        add_reduce(1, 4);
        prod = 4;
    }
    while (prod == 4) {
        let ACCEPT: boolean = false;
        skip_fn_(l/*[ ws ][ nl ]*/);
        if ((((cp0ac89158_(l)/*[+] [++]*/ || cpfaa7aa14_(l)/*[-] [--]*/) || assert_table(l, 0x0, 0x8008196, 0x88000000, 0x48000001)/*tbl:[ { ] [ ( ] [ $ ] [ _ ] [ " ] [ ' ] [ [ ] [ / ] [ ` ] [ ~ ] [ ! ] [ ; ]*/) || l.isID()/*[id]*/) || l.isNum()/*[num]*/) {
            /*assert-production-closure*/
            /*
               5 module_body=>module_body • module_item 
            */
            if ($module_item(l)) {
                add_reduce(2, 3);
                prod = 4;
                ACCEPT = true;
            }
        }
        if (!ACCEPT) {
            break;
        }
    }
    return assertSuccess(l, prod == 4);
}
function $module_item(l: Lexer): boolean {
    if (cp42a2a37f_(l)/*[export]*/) {
        /*assert-production-closure*/
        /*
           8 module_item=>• export_declaration 
        */
        if ($export_declaration(l)) {
            prod = 5;
        }
    } else if (cp2e37be7d_(l)/*[import]*/) {
        /*peek*/
        /*
           7 module_item=>• import_declaration 
           9 module_item=>• statement_list_item 
        */
        let pk: Lexer = l.copy();
        skip_fn_(pk.next()/*[ ws ][ nl ]*/);
        if (assert_table(pk, 0x0, 0x4100, 0x0, 0x0)/*tbl:[ . ] [ ( ]*/) {
            /*peek-production-closure*/
            /*
               9 module_item=>• statement_list_item 
            */
            if ($statement_list_item(l)) {
                prod = 5;
            }
        } else {
            /*peek-production-closure*/
            /*
               7 module_item=>• import_declaration 
            */
            if ($import_declaration(l)) {
                prod = 5;
            }
        }
    } else {
        /*assert-production-closure*/
        /*
           9 module_item=>• statement_list_item 
        */
        if ($statement_list_item(l)) {
            prod = 5;
        }
    }
    return assertSuccess(l, prod == 5);
}
function $import_declaration(l: Lexer): boolean {
    if (assert_consume(l, cp2e37be7d_(l)/*[import]*/)) {
        /*consume*/
        /*
           10 import_declaration=>τimport • import_clause from_clause asi 
           11 import_declaration=>τimport • module_specifier ; 
        */
        skip_fn_(l/*[ ws ][ nl ]*/);
        if (assert_table(l, 0x0, 0x84, 0x0, 0x0)/*tbl:[ ' ] [ " ]*/) {
            /*assert-production-closure*/
            /*
               11 import_declaration=>τimport • module_specifier ; 
            */
            if ($string_literal(l)) {
                skip_fn_(l/*[ ws ][ nl ]*/);
                if (assert_consume(l, l.utf == 59/*[;]*/)) {
                    add_reduce(3, 6);
                    prod = 6;
                }
            }
        } else {
            /*assert-production-closure*/
            /*
               10 import_declaration=>τimport • import_clause from_clause asi 
            */
            if ($import_clause(l)) {
                skip_fn_(l/*[ ws ][ nl ]*/);
                if ($from_clause(l)) {
                    skip_fn_000(l/*[ ws ]*/);
                    if (assert_consume(l, __asi__(l))) {
                        add_reduce(4, 5);
                        prod = 6;
                    }
                }
            }
        }
    }
    return assertSuccess(l, prod == 6);
}
function $import_clause(l: Lexer): boolean {
    if (l.utf == 123/*[{]*/) {
        /*assert-production-closure*/
        /*
           14 import_clause=>• named_imports 
        */
        if ($named_imports(l)) {
            add_reduce(1, 7);
            prod = 7;
        }
    } else if (l.utf == 42/*[asterisk]*/) {
        /*assert-production-closure*/
        /*
           13 import_clause=>• name_space_import 
        */
        if ($name_space_import(l)) {
            add_reduce(1, 7);
            prod = 7;
        }
    } else {
        /*peek-production-closure*/
        /*
           12 import_clause=>• imported_default_binding 
           15 import_clause=>• imported_default_binding , name_space_import 
           16 import_clause=>• imported_default_binding , named_imports 
        */
        skip_fn_(l/*[ ws ][ nl ]*/);
        if ($imported_default_binding(l)) {
            /*assert*/
            /*
               12 import_clause=>• imported_default_binding 
               15 import_clause=>• imported_default_binding , name_space_import 
               16 import_clause=>• imported_default_binding , named_imports 
            */
            skip_fn_(l/*[ ws ][ nl ]*/);
            if (assert_consume(l, l.utf == 44/*[,]*/)) {
                /*consume*/
                /*
                   15 import_clause=>imported_default_binding , • name_space_import 
                   16 import_clause=>imported_default_binding , • named_imports 
                */
                skip_fn_(l/*[ ws ][ nl ]*/);
                if (l.utf == 123/*[{]*/) {
                    /*assert-production-closure*/
                    /*
                       16 import_clause=>imported_default_binding , • named_imports 
                    */
                    if ($named_imports(l)) {
                        add_reduce(3, 8);
                        prod = 7;
                    }
                } else {
                    /*assert-production-closure*/
                    /*
                       15 import_clause=>imported_default_binding , • name_space_import 
                    */
                    if ($name_space_import(l)) {
                        add_reduce(3, 8);
                        prod = 7;
                    }
                }
            } else {
                /*assert-end*/
                /*
                   12 import_clause=>imported_default_binding • 
                */
                add_reduce(1, 7);
                prod = 7;
            }
        }
    }
    return assertSuccess(l, prod == 7);
}
function $imported_default_binding(l: Lexer): boolean {
    if ($identifier(l)) {
        add_reduce(1, 17);
        add_reduce(1, 9);
        prod = 8;
    }
    return assertSuccess(l, prod == 8);
}
function $name_space_import(l: Lexer): boolean {
    if (assert_consume(l, l.utf == 42/*[asterisk]*/)) {
        /*consume*/
        /*
           18 name_space_import=>* • τas imported_binding 
        */
        skip_fn_(l/*[ ws ][ nl ]*/);
        if (assert_consume(l, cp00a86e9e_(l)/*[as]*/)) {
            skip_fn_(l/*[ ws ][ nl ]*/);
            if ($identifier(l)) {
                add_reduce(1, 17);
                add_reduce(3, 10);
                prod = 9;
            }
        }
    }
    return assertSuccess(l, prod == 9);
}
function $named_imports_HC_listbody1_101(l: Lexer): boolean {
    if ($import_specifier(l)) {
        add_reduce(1, 4);
        prod = 10;
    }
    while (prod == 10) {
        let ACCEPT: boolean = false;
        skip_fn_(l/*[ ws ][ nl ]*/);
        if (assert_consume(l, l.utf == 44/*[,]*/)) {
            /*consume*/
            /*
               19 named_imports_HC_listbody1_101=>named_imports_HC_listbody1_101 , • import_specifier 
            */
            skip_fn_(l/*[ ws ][ nl ]*/);
            if ($import_specifier(l)) {
                add_reduce(3, 11);
                prod = 10;
                ACCEPT = true;
            }
        }
        if (!ACCEPT) {
            break;
        }
    }
    return assertSuccess(l, prod == 10);
}
function $named_imports(l: Lexer): boolean {
    if (assert_consume(l, l.utf == 123/*[{]*/)) {
        /*consume*/
        /*
           21 named_imports=>{ • named_imports_HC_listbody1_101 , } 
           22 named_imports=>{ • , } 
           23 named_imports=>{ • named_imports_HC_listbody1_101 } 
           24 named_imports=>{ • } 
        */
        skip_fn_(l/*[ ws ][ nl ]*/);
        if (assert_consume(l, l.utf == 125/*[}]*/)) {
            /*consume*/
            /*
               24 named_imports=>{ } • 
            */
            add_reduce(2, 13);
            prod = 11;
        } else if (assert_consume(l, l.utf == 44/*[,]*/)) {
            /*consume*/
            /*
               22 named_imports=>{ , • } 
            */
            skip_fn_(l/*[ ws ][ nl ]*/);
            if (assert_consume(l, l.utf == 125/*[}]*/)) {
                add_reduce(3, 13);
                prod = 11;
            }
        } else {
            /*peek-production-closure*/
            /*
               21 named_imports=>{ • named_imports_HC_listbody1_101 , } 
               23 named_imports=>{ • named_imports_HC_listbody1_101 } 
            */
            skip_fn_(l/*[ ws ][ nl ]*/);
            if ($named_imports_HC_listbody1_101(l)) {
                /*assert*/
                /*
                   21 named_imports=>{ • named_imports_HC_listbody1_101 , } 
                   23 named_imports=>{ • named_imports_HC_listbody1_101 } 
                */
                skip_fn_(l/*[ ws ][ nl ]*/);
                if (assert_consume(l, l.utf == 125/*[}]*/)) {
                    /*consume*/
                    /*
                       23 named_imports=>{ named_imports_HC_listbody1_101 } • 
                    */
                    add_reduce(3, 12);
                    prod = 11;
                } else if (assert_consume(l, l.utf == 44/*[,]*/)) {
                    /*consume*/
                    /*
                       21 named_imports=>{ named_imports_HC_listbody1_101 , • } 
                    */
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if (assert_consume(l, l.utf == 125/*[}]*/)) {
                        add_reduce(4, 12);
                        prod = 11;
                    }
                }
            }
        }
    }
    return assertSuccess(l, prod == 11);
}
function $from_clause(l: Lexer): boolean {
    if (assert_consume(l, cp65c0e04e_(l)/*[from]*/)) {
        /*consume*/
        /*
           25 from_clause=>τfrom • module_specifier 
        */
        skip_fn_(l/*[ ws ][ nl ]*/);
        if ($string_literal(l)) {
            add_reduce(2, 14);
            prod = 12;
        }
    }
    return assertSuccess(l, prod == 12);
}
function $import_specifier(l: Lexer): boolean {
    if ((((cp65c0e04e_(l)/*[from]*/ || cpa3b34eda_(l)/*[as] [async]*/) || cp28cc5037_(l)/*[target]*/) || cp248c12d4_(l)/*[set]*/) || cp47b3f727_(l)/*[get]*/) {
        /*assert-production-closure*/
        /*
           534 unreserved_word=>• τfrom 
           533 unreserved_word=>• τas 
           532 unreserved_word=>• τtarget 
           531 unreserved_word=>• τset 
           530 unreserved_word=>• τget 
           529 unreserved_word=>• τasync 
        */
        if ($unreserved_word(l)) {
            add_reduce(1, 254);
            prod = 179;
        }
    } else {
        /*assert-production-closure*/
        /*
           548 composite_identifier=>• _ 
           547 composite_identifier=>• $ 
           546 composite_identifier=>• θid 
        */
        if ($composite_identifier(l)) {
            add_reduce(1, 254);
            prod = 179;
        }
    }
    while (prod == 179) {
        let ACCEPT: boolean = false;
        skip_fn_000(l/*[ ws ]*/);
        if (assert_consume(l, cp00a86e9e_(l)/*[as]*/)) {
            /*consume*/
            /*
               27 import_specifier=>identifier τas • imported_binding 
            */
            skip_fn_(l/*[ ws ][ nl ]*/);
            if ($identifier(l)) {
                add_reduce(1, 17);
                add_reduce(3, 16);
                prod = 13;
                ACCEPT = true;
            }
        } else {
            /*assert-end*/
            /*
               29 imported_binding=>identifier • 
            */
            add_reduce(1, 17);
            add_reduce(1, 15);
            prod = 13;
            ACCEPT = true;
        }
        if (!ACCEPT) {
            break;
        }
    }
    return assertSuccess(l, prod == 13);
}
function $export_declaration(l: Lexer): boolean {
    if (assert_consume(l, cp42a2a37f_(l)/*[export]*/)) {
        /*consume*/
        /*
           30 export_declaration=>τexport • * from_clause asi 
           31 export_declaration=>τexport • export_clause from_clause asi 
           32 export_declaration=>τexport • variable_statement 
           33 export_declaration=>τexport • declaration 
           34 export_declaration=>τexport • τdefault hoistable_declaration 
           35 export_declaration=>τexport • τdefault class_declaration 
           36 export_declaration=>τexport • τdefault assignment_expression asi 
           37 export_declaration=>τexport • export_clause asi 
        */
        if (cp1f6ac4c1_(l)/*[default]*/) {
            /*peek*/
            /*
               34 export_declaration=>τexport • τdefault hoistable_declaration 
               35 export_declaration=>τexport • τdefault class_declaration 
               36 export_declaration=>τexport • τdefault assignment_expression asi 
            */
            let pk: Lexer = l.copy();
            skip_fn_(pk.next()/*[ ws ][ nl ]*/);
            if (cp1f027896_(pk)/*[class]*/) {
                /*peek*/
                /*
                   35 export_declaration=>τexport • τdefault class_declaration 
                */
                if (assert_consume(l, cp1f6ac4c1_(l)/*[default]*/)) {
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if ($class_declaration(l)) {
                        add_reduce(3, 21);
                        prod = 16;
                    }
                }
            } else if (cp87f20bb1_(pk)/*[function]*/) {
                /*peek*/
                /*
                   34 export_declaration=>τexport • τdefault hoistable_declaration 
                */
                if (assert_consume(l, cp1f6ac4c1_(l)/*[default]*/)) {
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if ($function_declaration(l)) {
                        add_reduce(3, 21);
                        prod = 16;
                    }
                }
            } else if (cpdcbfef5f_(pk)/*[async]*/) {
                /*peek*/
                /*
                   34 export_declaration=>τexport • τdefault hoistable_declaration 
                   36 export_declaration=>τexport • τdefault assignment_expression asi 
                */
                skip_fn_(l/*[ ws ][ nl ]*/);
                if (assert_consume(l, cp1f6ac4c1_(l)/*[default]*/)) {
                    /*consume*/
                    /*
                       34 export_declaration=>τexport τdefault • hoistable_declaration 
                       36 export_declaration=>τexport τdefault • assignment_expression asi 
                    */
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if (cp87f20bb1_(l)/*[function]*/) {
                        /*assert-production-closure*/
                        /*
                           34 export_declaration=>τexport τdefault • hoistable_declaration 
                        */
                        if ($function_declaration(l)) {
                            add_reduce(3, 21);
                            prod = 16;
                        }
                    } else if (cpdcbfef5f_(l)/*[async]*/) {
                        /*peek*/
                        /*
                           34 export_declaration=>τexport τdefault • hoistable_declaration 
                           36 export_declaration=>τexport τdefault • assignment_expression asi 
                        */
                        let pk: Lexer = l.copy();
                        skip_fn_000(pk.next()/*[ ws ]*/);
                        if (cp87f20bb1_(pk)/*[function]*/) {
                            /*peek-production-closure*/
                            /*
                               34 export_declaration=>τexport τdefault • hoistable_declaration 
                            */
                            if ($function_declaration(l)) {
                                add_reduce(3, 21);
                                prod = 16;
                            }
                        } else {
                            /*peek-production-closure*/
                            /*
                               36 export_declaration=>τexport τdefault • assignment_expression asi 
                            */
                            if ($assignment_expression(l)) {
                                skip_fn_000(l/*[ ws ]*/);
                                if (assert_consume(l, __asi__(l))) {
                                    add_reduce(4, 21);
                                    prod = 16;
                                }
                            }
                        }
                    } else {
                        /*assert-production-closure*/
                        /*
                           36 export_declaration=>τexport τdefault • assignment_expression asi 
                        */
                        if ($assignment_expression(l)) {
                            skip_fn_000(l/*[ ws ]*/);
                            if (assert_consume(l, __asi__(l))) {
                                add_reduce(4, 21);
                                prod = 16;
                            }
                        }
                    }
                }
            } else if ((((cpfaa7aa14_(pk)/*[-] [--]*/ || cp0ac89158_(pk)/*[+] [++]*/) || assert_table(pk, 0x0, 0x8196, 0x88000000, 0x48000001)/*tbl:[ ! ] [ ~ ] [ ( ] [ ` ] [ / ] [ { ] [ [ ] [ ' ] [ " ] [ _ ] [ $ ]*/) || pk.isNum()/*[num]*/) || pk.isID()/*[id]*/) {
                /*peek*/
                /*
                   36 export_declaration=>τexport • τdefault assignment_expression asi 
                */
                if (assert_consume(l, cp1f6ac4c1_(l)/*[default]*/)) {
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if ($assignment_expression(l)) {
                        skip_fn_000(l/*[ ws ]*/);
                        if (assert_consume(l, __asi__(l))) {
                            add_reduce(4, 21);
                            prod = 16;
                        }
                    }
                }
            }
        } else if (cp27956077_(l)/*[var]*/) {
            /*assert-production-closure*/
            /*
               32 export_declaration=>τexport • variable_statement 
            */
            if ($variable_statement(l)) {
                add_reduce(2, 20);
                prod = 16;
            }
        } else if (l.utf == 123/*[{]*/) {
            /*peek-production-closure*/
            /*
               31 export_declaration=>τexport • export_clause from_clause asi 
               37 export_declaration=>τexport • export_clause asi 
            */
            skip_fn_(l/*[ ws ][ nl ]*/);
            if ($export_clause(l)) {
                /*assert*/
                /*
                   31 export_declaration=>τexport • export_clause from_clause asi 
                   37 export_declaration=>τexport • export_clause asi 
                */
                skip_fn_000(l/*[ ws ]*/);
                if (assert_consume(l, __asi__(l))) {
                    /*consume*/
                    /*
                       37 export_declaration=>τexport export_clause asi • 
                    */
                    add_reduce(3, 22);
                    prod = 16;
                } else {
                    /*assert-production-closure*/
                    /*
                       31 export_declaration=>τexport export_clause • from_clause asi 
                    */
                    if ($from_clause(l)) {
                        skip_fn_000(l/*[ ws ]*/);
                        if (assert_consume(l, __asi__(l))) {
                            add_reduce(4, 19);
                            prod = 16;
                        }
                    }
                }
            }
        } else if (assert_consume(l, l.utf == 42/*[asterisk]*/)) {
            /*consume*/
            /*
               30 export_declaration=>τexport * • from_clause asi 
            */
            skip_fn_(l/*[ ws ][ nl ]*/);
            if ($from_clause(l)) {
                skip_fn_000(l/*[ ws ]*/);
                if (assert_consume(l, __asi__(l))) {
                    add_reduce(4, 18);
                    prod = 16;
                }
            }
        } else {
            /*assert-production-closure*/
            /*
               33 export_declaration=>τexport • declaration 
            */
            if ($declaration(l)) {
                add_reduce(2, 20);
                prod = 16;
            }
        }
    }
    return assertSuccess(l, prod == 16);
}
function $export_clause_HC_listbody1_102(l: Lexer): boolean {
    if ($export_specifier(l)) {
        add_reduce(1, 4);
        prod = 17;
    }
    while (prod == 17) {
        let ACCEPT: boolean = false;
        skip_fn_(l/*[ ws ][ nl ]*/);
        if (assert_consume(l, l.utf == 44/*[,]*/)) {
            /*consume*/
            /*
               38 export_clause_HC_listbody1_102=>export_clause_HC_listbody1_102 , • export_specifier 
            */
            skip_fn_(l/*[ ws ][ nl ]*/);
            if ($export_specifier(l)) {
                add_reduce(3, 11);
                prod = 17;
                ACCEPT = true;
            }
        }
        if (!ACCEPT) {
            break;
        }
    }
    return assertSuccess(l, prod == 17);
}
function $export_clause(l: Lexer): boolean {
    if (assert_consume(l, l.utf == 123/*[{]*/)) {
        /*consume*/
        /*
           40 export_clause=>{ • export_clause_HC_listbody1_102 , } 
           41 export_clause=>{ • , } 
           42 export_clause=>{ • export_clause_HC_listbody1_102 } 
           43 export_clause=>{ • } 
        */
        skip_fn_(l/*[ ws ][ nl ]*/);
        if (assert_consume(l, l.utf == 125/*[}]*/)) {
            /*consume*/
            /*
               43 export_clause=>{ } • 
            */
            add_reduce(2, 24);
            prod = 18;
        } else if (assert_consume(l, l.utf == 44/*[,]*/)) {
            /*consume*/
            /*
               41 export_clause=>{ , • } 
            */
            skip_fn_(l/*[ ws ][ nl ]*/);
            if (assert_consume(l, l.utf == 125/*[}]*/)) {
                add_reduce(3, 24);
                prod = 18;
            }
        } else {
            /*peek-production-closure*/
            /*
               40 export_clause=>{ • export_clause_HC_listbody1_102 , } 
               42 export_clause=>{ • export_clause_HC_listbody1_102 } 
            */
            skip_fn_(l/*[ ws ][ nl ]*/);
            if ($export_clause_HC_listbody1_102(l)) {
                /*assert*/
                /*
                   40 export_clause=>{ • export_clause_HC_listbody1_102 , } 
                   42 export_clause=>{ • export_clause_HC_listbody1_102 } 
                */
                skip_fn_(l/*[ ws ][ nl ]*/);
                if (assert_consume(l, l.utf == 125/*[}]*/)) {
                    /*consume*/
                    /*
                       42 export_clause=>{ export_clause_HC_listbody1_102 } • 
                    */
                    add_reduce(3, 23);
                    prod = 18;
                } else if (assert_consume(l, l.utf == 44/*[,]*/)) {
                    /*consume*/
                    /*
                       40 export_clause=>{ export_clause_HC_listbody1_102 , • } 
                    */
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if (assert_consume(l, l.utf == 125/*[}]*/)) {
                        add_reduce(4, 23);
                        prod = 18;
                    }
                }
            }
        }
    }
    return assertSuccess(l, prod == 18);
}
function $export_specifier(l: Lexer): boolean {
    if ($identifier(l)) {
        /*assert*/
        /*
           44 export_specifier=>• identifier 
           45 export_specifier=>• identifier τas identifier 
        */
        skip_fn_(l/*[ ws ][ nl ]*/);
        if (assert_consume(l, cp00a86e9e_(l)/*[as]*/)) {
            /*consume*/
            /*
               45 export_specifier=>identifier τas • identifier 
            */
            skip_fn_(l/*[ ws ][ nl ]*/);
            if ($identifier(l)) {
                add_reduce(3, 16);
                prod = 19;
            }
        } else {
            /*assert-end*/
            /*
               44 export_specifier=>identifier • 
            */
            add_reduce(1, 15);
            prod = 19;
        }
    }
    return assertSuccess(l, prod == 19);
}
function $statement_list(l: Lexer): boolean {
    if ($statement_list_item(l)) {
        add_reduce(1, 4);
        prod = 22;
    }
    while (prod == 22) {
        let ACCEPT: boolean = false;
        skip_fn_(l/*[ ws ][ nl ]*/);
        if (cp1f6ac4c1_(l)/*[default]*/ || cpab3c99ed_(l)/*[case]*/) {
            break;
        }
        if ((((cp0ac89158_(l)/*[+] [++]*/ || cpfaa7aa14_(l)/*[-] [--]*/) || assert_table(l, 0x0, 0x8008196, 0x88000000, 0x48000001)/*tbl:[ { ] [ ( ] [ $ ] [ _ ] [ " ] [ ' ] [ [ ] [ / ] [ ` ] [ ~ ] [ ! ] [ ; ]*/) || l.isID()/*[id]*/) || l.isNum()/*[num]*/) {
            /*assert-production-closure*/
            /*
               49 statement_list=>statement_list • statement_list_item 
            */
            if ($statement_list_item(l)) {
                add_reduce(2, 26);
                prod = 22;
                ACCEPT = true;
            }
        }
        if (!ACCEPT) {
            break;
        }
    }
    return assertSuccess(l, prod == 22);
}
function $statement_list_item(l: Lexer): boolean {
    if (cpdcbfef5f_(l)/*[async]*/) {
        /*peek*/
        /*
           50 statement_list_item=>• statement 
           51 statement_list_item=>• declaration 
        */
        let pk: Lexer = l.copy();
        skip_fn_(pk.next()/*[ ws ][ nl ]*/);
        if (cp87f20bb1_(pk)/*[function]*/) {
            /*peek-production-closure*/
            /*
               51 statement_list_item=>• declaration 
            */
            if ($declaration(l)) {
                prod = 23;
            }
        } else {
            /*peek-production-closure*/
            /*
               50 statement_list_item=>• statement 
            */
            if ($statement(l)) {
                prod = 23;
            }
        }
    } else if ((cpa2c0bd5b_(l)/*[const] [class]*/ || cpa0815727_(l)/*[let]*/) || cp87f20bb1_(l)/*[function]*/) {
        /*assert-production-closure*/
        /*
           51 statement_list_item=>• declaration 
        */
        if ($declaration(l)) {
            prod = 23;
        }
    } else {
        /*assert-production-closure*/
        /*
           50 statement_list_item=>• statement 
        */
        if ($statement(l)) {
            prod = 23;
        }
    }
    return assertSuccess(l, prod == 23);
}
function $statement(l: Lexer): boolean {
    if (cp5ee5ce67_(l)/*[debugger]*/) {
        /*assert-production-closure*/
        /*
           65 statement=>• debugger_statement 
        */
        if ($debugger_statement(l)) {
            prod = 24;
        }
    } else if (cp749f34fc_(l)/*[try]*/) {
        /*assert-production-closure*/
        /*
           64 statement=>• try_statement 
        */
        if ($try_statement(l)) {
            prod = 24;
        }
    } else if (cpcbd55029_(l)/*[throw]*/) {
        /*assert-production-closure*/
        /*
           63 statement=>• throw_statement 
        */
        if ($throw_statement(l)) {
            prod = 24;
        }
    } else if (cpd766eebc_(l)/*[with]*/) {
        /*assert-production-closure*/
        /*
           62 statement=>• with_statement 
        */
        if ($with_statement(l)) {
            prod = 24;
        }
    } else if (cp54e87682_(l)/*[return]*/) {
        /*assert-production-closure*/
        /*
           61 statement=>• return_statement 
        */
        if ($return_statement(l)) {
            prod = 24;
        }
    } else if (cpa88fb47a_(l)/*[break]*/) {
        /*assert-production-closure*/
        /*
           60 statement=>• break_statement 
        */
        if ($break_statement(l)) {
            prod = 24;
        }
    } else if (cp96563f93_(l)/*[continue]*/) {
        /*assert-production-closure*/
        /*
           59 statement=>• continue_statement 
        */
        if ($continue_statement(l)) {
            prod = 24;
        }
    } else if (cp3c57f5ab_(l)/*[if]*/) {
        /*assert-production-closure*/
        /*
           57 statement=>• if_statement 
        */
        if ($if_statement(l)) {
            prod = 24;
        }
    } else if (l.utf == 59/*[;]*/) {
        /*assert-production-closure*/
        /*
           56 statement=>• empty_statement 
        */
        if ($empty_statement(l)) {
            prod = 24;
        }
    } else if (cp27956077_(l)/*[var]*/) {
        /*assert-production-closure*/
        /*
           55 statement=>• variable_statement 
        */
        if ($variable_statement(l)) {
            prod = 24;
        }
    } else if (cpdcbfef5f_(l)/*[async]*/) {
        /*peek*/
        /*
           53 statement=>• expression_statement 
           54 statement=>• labeled_statement 
        */
        let pk: Lexer = l.copy();
        skip_fn_(pk.next()/*[ ws ][ nl ]*/);
        if (pk.utf == 40/*[(]*/) {
            /*peek*/
            /*
               53 statement=>• expression_statement 
               54 statement=>• labeled_statement 
            */
            skip_fn_(l/*[ ws ][ nl ]*/);
            if (assert_consume(l, cpdcbfef5f_(l)/*[async]*/)) {
                /*consume*/
                /*
                   208 arrow_function=>τasync • arrow_parameters => concise_body 
                   529 unreserved_word=>τasync • 
                */
                skip_fn_000(l/*[ ws ]*/);
                if (assert_table(l, 0x0, 0x110, 0x80000000, 0x0)/*tbl:[ $ ] [ _ ] [ ( ]*/ || l.isID()/*[id]*/) {
                    /*assert-production-closure*/
                    /*
                       208 arrow_function=>τasync • arrow_parameters => concise_body 
                    */
                    if ($arrow_parameters(l)) {
                        skip_fn_(l/*[ ws ][ nl ]*/);
                        if (assert_consume(l, cpf526e31a_(l)/*[=>]*/)) {
                            skip_fn_(l/*[ ws ][ nl ]*/);
                            if ($concise_body(l)) {
                                add_reduce(4, 124);
                                prod = 89;
                            }
                        }
                    }
                } else {
                    /*assert-end*/
                    /*
                       529 unreserved_word=>τasync • 
                    */
                    add_reduce(1, 254);
                    prod = 179;
                }
            }
        } else if (((((((((((((((cp8fa1da3b_(pk)/*[=>] [==] [===] [=]*/ || cp0dd8c784_(pk)/*[??] [?] [?.]*/) || cpb3d7011a_(pk)/*[||] [|] [|=]*/) || cp7e436356_(pk)/*[^] [^=]*/) || cp7d15091b_(pk)/*[&] [&=]*/) || cpc102d490_(pk)/*[!=] [!==]*/) || cpcbadb5c4_(pk)/*[in] [instanceof]*/) || cpd4ebf6f8_(pk)/*[>=] [>] [>>] [>>>] [>>>=] [>>=]*/) || cp9cee9bf7_(pk)/*[<=] [<] [<<] [<<=]*/) || cp40cf8450_(pk)/*[-] [-=] [--]*/) || cp709acfcd_(pk)/*[+] [+=] [++]*/) || cp228079b2_(pk)/*[/] [/=]*/) || cpf7472959_(pk)/*[%] [%=]*/) || cp2d4154bd_(pk)/*[asteriskasterisk] [asteriskasterisk=] [asterisk]*/) || assert_table(pk, 0x0, 0x4005000, 0x8000000, 0x1)/*tbl:[ : ] [ , ] [ [ ] [ . ] [ ` ]*/) || __asi__(pk)) {
            /*assert-production-closure*/
            /*
               529 unreserved_word=>• τasync 
            */
            if ($unreserved_word(l)) {
                add_reduce(1, 254);
                prod = 179;
            }
        } else {
            /*peek-production-closure*/
            /*
               53 statement=>• expression_statement 
            */
            if ($expression_statement(l)) {
                prod = 24;
            }
        }
    } else if (l.utf == 123/*[{]*/) {
        /*assert-production-closure*/
        /*
           52 statement=>• block_statement 
        */
        if ($block(l)) {
            prod = 24;
        }
    } else if (((cp56c09138_(l)/*[switch]*/ || cp6ce5d4c3_(l)/*[for]*/) || cp62236cc7_(l)/*[while]*/) || cp7b8b1d3a_(l)/*[do]*/) {
        /*assert-production-closure*/
        /*
           58 statement=>• breakable_statement 
        */
        if ($breakable_statement(l)) {
            prod = 24;
        }
    } else if ((((cp65c0e04e_(l)/*[from]*/ || cp00a86e9e_(l)/*[as]*/) || cp28cc5037_(l)/*[target]*/) || cp248c12d4_(l)/*[set]*/) || cp47b3f727_(l)/*[get]*/) {
        /*assert-production-closure*/
        /*
           534 unreserved_word=>• τfrom 
           533 unreserved_word=>• τas 
           532 unreserved_word=>• τtarget 
           531 unreserved_word=>• τset 
           530 unreserved_word=>• τget 
        */
        if ($unreserved_word(l)) {
            add_reduce(1, 254);
            prod = 179;
        }
    } else if ((((((((((((cp4cd44fa7_(l)/*[await]*/ || cpfaa7aa14_(l)/*[--] [-]*/) || cp0ac89158_(l)/*[++] [+]*/) || cpfa5d29df_(l)/*[typeof] [true] [this]*/) || cp3617ce6e_(l)/*[void]*/) || cpc7ed71c1_(l)/*[delete]*/) || cpd93bce4d_(l)/*[null] [new]*/) || cp3b3b9dc5_(l)/*[false]*/) || cp2e37be7d_(l)/*[import]*/) || cpbbb8c976_(l)/*[super]*/) || cp3e88794b_(l)/*[yield]*/) || assert_table(l, 0x0, 0x8186, 0x8000000, 0x40000001)/*tbl:[ ! ] [ ~ ] [ ` ] [ / ] [ [ ] [ ' ] [ " ] [ ( ]*/) || l.isNum()/*[num]*/) {
        /*assert-production-closure*/
        /*
           53 statement=>• expression_statement 
        */
        if ($expression_statement(l)) {
            prod = 24;
        }
    } else {
        /*assert-production-closure*/
        /*
           548 composite_identifier=>• _ 
           547 composite_identifier=>• $ 
           546 composite_identifier=>• θid 
        */
        if ($composite_identifier(l)) {
            add_reduce(1, 254);
            prod = 179;
        }
    }
    while (true) {
        let ACCEPT: boolean = false;
        switch (prod) {
            case 79:
                skip_fn_(l/*[ ws ][ nl ]*/);
                if (assert_consume(l, cpf526e31a_(l)/*[=>]*/)) {
                    /*consume*/
                    /*
                       209 arrow_function=>arrow_parameters => • concise_body 
                    */
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if ($concise_body(l)) {
                        add_reduce(3, 125);
                        prod = 89;
                        ACCEPT = true;
                    }
                }
                break;
            case 89:
                skip_fn_000(l/*[ ws ]*/);
                if (assert_consume(l, __asi__(l))) {
                    /*consume*/
                    /*
                       76 expression_statement=>expression asi • 
                    */
                    add_reduce(2, 30);
                    prod = 24;
                    ACCEPT = true;
                } else if (assert_consume(l, l.utf == 44/*[,]*/)) {
                    /*consume*/
                    /*
                       259 expression=>expression , • assignment_expression 
                    */
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if ($assignment_expression(l)) {
                        add_reduce(3, 162);
                        prod = 89;
                        ACCEPT = true;
                    }
                }
                break;
            case 90:
                skip_fn_000(l/*[ ws ]*/);
                if (assert_consume(l, l.utf == 61/*[=]*/)) {
                    /*consume*/
                    /*
                       323 assignment_expression=>left_hand_side_expression = • assignment_expression 
                    */
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if ($assignment_expression(l)) {
                        add_reduce(3, 183);
                        prod = 89;
                        ACCEPT = true;
                    }
                } else if (assert_consume(l, cpa70bdd76_(l)/*[++]*/ || cpb9a3d66d_(l)/*[--]*/)) {
                    /*consume*/
                    /*
                       390 update_expression=>left_hand_side_expression ++ • 
                       391 update_expression=>left_hand_side_expression -- • 
                    */
                    add_reduce(2, 201);
                    prod = 126;
                    ACCEPT = true;
                } else if (((((((((cp8687cbf2_(l)/*[asteriskasterisk=] [asterisk]*/ || cpf9ccda11_(l)/*[|=]*/) || cpbd75a16c_(l)/*[^=]*/) || cpbd0a1baf_(l)/*[&=]*/) || cpa053380f_(l)/*[>>>=] [>>=]*/) || cp0bb67c25_(l)/*[<<=]*/) || cp8a61c8c0_(l)/*[-=]*/) || cpfa882b22_(l)/*[+=]*/) || cpba9dd503_(l)/*[%=]*/) || cp29720e9d_(l)/*[/=]*/) {
                    /*assert-production-closure*/
                    /*
                       324 assignment_expression=>left_hand_side_expression • assignment_operator assignment_expression 
                    */
                    if ($assignment_operator(l)) {
                        skip_fn_(l/*[ ws ][ nl ]*/);
                        if ($assignment_expression(l)) {
                            add_reduce(3, 184);
                            prod = 89;
                            ACCEPT = true;
                        }
                    }
                } else {
                    /*assert-end*/
                    /*
                       389 update_expression=>left_hand_side_expression • 
                    */
                    prod = 126;
                    ACCEPT = true;
                }
                break;
            case 92:
                skip_fn_000(l/*[ ws ]*/);
                if (l.utf == 40/*[(]*/) {
                    /*assert-production-closure*/
                    /*
                       214 cover_call_expression_and_async_arrow_head=>member_expression • arguments 
                    */
                    if ($arguments(l)) {
                        add_reduce(2, 129);
                        prod = 97;
                        ACCEPT = true;
                    }
                } else if (cp2f3a2b3c_(l)/*[?.]*/) {
                    /*assert-production-closure*/
                    /*
                       298 optional_expression=>member_expression • optional_chain 
                    */
                    if ($optional_chain(l)) {
                        add_reduce(2, 179);
                        prod = 104;
                        ACCEPT = true;
                    }
                } else if (assert_consume(l, l.utf == 91/*[[]*/)) {
                    /*consume*/
                    /*
                       267 member_expression=>member_expression [ • expression ] 
                    */
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if ($expression(l)) {
                        skip_fn_(l/*[ ws ][ nl ]*/);
                        if (assert_consume(l, l.utf == 93/*[]]*/)) {
                            add_reduce(4, 164);
                            prod = 92;
                            ACCEPT = true;
                        }
                    }
                } else if (assert_consume(l, l.utf == 46/*[.]*/)) {
                    /*consume*/
                    /*
                       268 member_expression=>member_expression . • identifier_name 
                    */
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if ($identifier_name(l)) {
                        add_reduce(3, 165);
                        prod = 92;
                        ACCEPT = true;
                    }
                } else if (l.utf == 96/*[`]*/) {
                    /*assert-production-closure*/
                    /*
                       269 member_expression=>member_expression • template_literal 
                    */
                    if ($template_literal(l)) {
                        add_reduce(2, 166);
                        prod = 92;
                        ACCEPT = true;
                    }
                } else {
                    /*assert-end*/
                    /*
                       264 new_expression=>member_expression • 
                    */
                    prod = 90;
                    ACCEPT = true;
                }
                break;
            case 97:
                skip_fn_000(l/*[ ws ]*/);
                if (assert_consume(l, l.utf == 46/*[.]*/)) {
                    /*consume*/
                    /*
                       279 call_expression=>call_expression . • identifier_name 
                    */
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if ($identifier_name(l)) {
                        add_reduce(3, 165);
                        prod = 97;
                        ACCEPT = true;
                    }
                } else if (l.utf == 40/*[(]*/) {
                    /*assert-production-closure*/
                    /*
                       282 call_expression=>call_expression • arguments 
                    */
                    if ($arguments(l)) {
                        add_reduce(2, 172);
                        prod = 97;
                        ACCEPT = true;
                    }
                } else if (assert_consume(l, l.utf == 91/*[[]*/)) {
                    /*consume*/
                    /*
                       283 call_expression=>call_expression [ • expression ] 
                    */
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if ($expression(l)) {
                        skip_fn_(l/*[ ws ][ nl ]*/);
                        if (assert_consume(l, l.utf == 93/*[]]*/)) {
                            add_reduce(4, 164);
                            prod = 97;
                            ACCEPT = true;
                        }
                    }
                } else if (l.utf == 96/*[`]*/) {
                    /*assert-production-closure*/
                    /*
                       285 call_expression=>call_expression • template_literal 
                    */
                    if ($template_literal(l)) {
                        add_reduce(2, 173);
                        prod = 97;
                        ACCEPT = true;
                    }
                } else if (cp2f3a2b3c_(l)/*[?.]*/) {
                    /*assert-production-closure*/
                    /*
                       299 optional_expression=>call_expression • optional_chain 
                    */
                    if ($optional_chain(l)) {
                        add_reduce(2, 179);
                        prod = 104;
                        ACCEPT = true;
                    }
                } else {
                    /*assert-end*/
                    /*
                       262 left_hand_side_expression=>call_expression • 
                    */
                    prod = 90;
                    ACCEPT = true;
                }
                break;
            case 104:
                skip_fn_000(l/*[ ws ]*/);
                if (cp2f3a2b3c_(l)/*[?.]*/) {
                    /*assert-production-closure*/
                    /*
                       300 optional_expression=>optional_expression • optional_chain 
                    */
                    if ($optional_chain(l)) {
                        add_reduce(2, 179);
                        prod = 104;
                        ACCEPT = true;
                    }
                } else {
                    /*assert-end*/
                    /*
                       263 left_hand_side_expression=>optional_expression • 
                    */
                    prod = 90;
                    ACCEPT = true;
                }
                break;
            case 111:
                skip_fn_000(l/*[ ws ]*/);
                if (assert_consume(l, l.utf == 63/*[?]*/)) {
                    /*consume*/
                    /*
                       338 conditional_expression=>short_circuit_expression ? • assignment_expression : assignment_expression 
                    */
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if ($assignment_expression(l)) {
                        skip_fn_(l/*[ ws ][ nl ]*/);
                        if (assert_consume(l, l.utf == 58/*[:]*/)) {
                            skip_fn_(l/*[ ws ][ nl ]*/);
                            if ($assignment_expression(l)) {
                                add_reduce(5, 185);
                                prod = 89;
                                ACCEPT = true;
                            }
                        }
                    }
                } else {
                    /*assert-end*/
                    /*
                       337 conditional_expression=>short_circuit_expression • 
                    */
                    prod = 89;
                    ACCEPT = true;
                }
                break;
            case 112:
                skip_fn_000(l/*[ ws ]*/);
                if (assert_consume(l, cp600b6f48_(l)/*[||]*/)) {
                    /*consume*/
                    /*
                       342 logical_or_expression=>logical_or_expression || • logical_and_expression 
                    */
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if ($logical_and_expression(l)) {
                        add_reduce(3, 186);
                        prod = 112;
                        ACCEPT = true;
                    }
                } else {
                    /*assert-end*/
                    /*
                       339 short_circuit_expression=>logical_or_expression • 
                    */
                    prod = 111;
                    ACCEPT = true;
                }
                break;
            case 113:
                skip_fn_000(l/*[ ws ]*/);
                if (assert_consume(l, l.utf == 38/*[&]*/)) {
                    /*consume*/
                    /*
                       344 logical_and_expression=>logical_and_expression & • & bitwise_or_expression 
                    */
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if (assert_consume(l, l.utf == 38/*[&]*/)) {
                        skip_fn_(l/*[ ws ][ nl ]*/);
                        if ($bitwise_or_expression(l)) {
                            add_reduce(4, 186);
                            prod = 113;
                            ACCEPT = true;
                        }
                    }
                } else {
                    /*assert-end*/
                    /*
                       341 logical_or_expression=>logical_and_expression • 
                    */
                    prod = 112;
                    ACCEPT = true;
                }
                break;
            case 114:
                skip_fn_000(l/*[ ws ]*/);
                if (cp628ccfc7_(l)/*[??]*/) {
                    /*assert-end*/
                    /*
                       346 coalesce_expression_head_group_0233_113=>coalesce_expression • 
                    */
                    prod = 116;
                    ACCEPT = true;
                } else {
                    /*assert-end*/
                    /*
                       340 short_circuit_expression=>coalesce_expression • 
                    */
                    prod = 111;
                    ACCEPT = true;
                }
                break;
            case 116:
                skip_fn_(l/*[ ws ][ nl ]*/);
                if (assert_consume(l, cp628ccfc7_(l)/*[??]*/)) {
                    /*consume*/
                    /*
                       345 coalesce_expression=>coalesce_expression_head ?? • bitwise_or_expression 
                    */
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if ($bitwise_or_expression(l)) {
                        add_reduce(3, 187);
                        prod = 114;
                        ACCEPT = true;
                    }
                }
                break;
            case 117:
                skip_fn_000(l/*[ ws ]*/);
                if (assert_consume(l, l.utf == 124/*[|]*/)) {
                    /*consume*/
                    /*
                       350 bitwise_or_expression=>bitwise_or_expression | • bitwise_xor_expression 
                    */
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if ($bitwise_xor_expression(l)) {
                        add_reduce(3, 188);
                        prod = 117;
                        ACCEPT = true;
                    }
                } else if (cp628ccfc7_(l)/*[??]*/) {
                    /*assert-end*/
                    /*
                       347 coalesce_expression_head_group_0233_113=>bitwise_or_expression • 
                    */
                    prod = 116;
                    ACCEPT = true;
                } else {
                    /*assert-end*/
                    /*
                       343 logical_and_expression=>bitwise_or_expression • 
                    */
                    prod = 113;
                    ACCEPT = true;
                }
                break;
            case 118:
                skip_fn_000(l/*[ ws ]*/);
                if (assert_consume(l, l.utf == 94/*[^]*/)) {
                    /*consume*/
                    /*
                       352 bitwise_xor_expression=>bitwise_xor_expression ^ • bitwise_and_expression 
                    */
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if ($bitwise_and_expression(l)) {
                        add_reduce(3, 188);
                        prod = 118;
                        ACCEPT = true;
                    }
                } else {
                    /*assert-end*/
                    /*
                       349 bitwise_or_expression=>bitwise_xor_expression • 
                    */
                    prod = 117;
                    ACCEPT = true;
                }
                break;
            case 119:
                skip_fn_000(l/*[ ws ]*/);
                if (assert_consume(l, l.utf == 38/*[&]*/)) {
                    /*consume*/
                    /*
                       354 bitwise_and_expression=>bitwise_and_expression & • equality_expression 
                    */
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if ($equality_expression(l)) {
                        add_reduce(3, 188);
                        prod = 119;
                        ACCEPT = true;
                    }
                } else {
                    /*assert-end*/
                    /*
                       351 bitwise_xor_expression=>bitwise_and_expression • 
                    */
                    prod = 118;
                    ACCEPT = true;
                }
                break;
            case 120:
                skip_fn_000(l/*[ ws ]*/);
                if (assert_consume(l, cp35644963_(l)/*[==] [===]*/ || cpc102d490_(l)/*[!=] [!==]*/)) {
                    /*consume*/
                    /*
                       356 equality_expression=>equality_expression == • relational_expression 
                       357 equality_expression=>equality_expression != • relational_expression 
                       358 equality_expression=>equality_expression === • relational_expression 
                       359 equality_expression=>equality_expression !== • relational_expression 
                    */
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if ($relational_expression(l)) {
                        add_reduce(3, 189);
                        prod = 120;
                        ACCEPT = true;
                    }
                } else {
                    /*assert-end*/
                    /*
                       353 bitwise_and_expression=>equality_expression • 
                    */
                    prod = 119;
                    ACCEPT = true;
                }
                break;
            case 121:
                skip_fn_000(l/*[ ws ]*/);
                if (assert_consume(l, cp7d807160_(l)/*[instanceof]*/)) {
                    /*consume*/
                    /*
                       365 relational_expression=>relational_expression τinstanceof • shift_expression 
                    */
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if ($shift_expression(l)) {
                        add_reduce(3, 191);
                        prod = 121;
                        ACCEPT = true;
                    }
                } else if (assert_consume(l, cp0725ae43_(l)/*[in]*/)) {
                    /*consume*/
                    /*
                       366 relational_expression=>relational_expression τin • shift_expression 
                    */
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if ($shift_expression(l)) {
                        add_reduce(3, 192);
                        prod = 121;
                        ACCEPT = true;
                    }
                } else if (assert_consume(l, cpee595c53_(l)/*[<] [<=]*/ || cp744cb68c_(l)/*[>] [>=]*/)) {
                    /*consume*/
                    /*
                       361 relational_expression=>relational_expression < • shift_expression 
                       362 relational_expression=>relational_expression > • shift_expression 
                       363 relational_expression=>relational_expression <= • shift_expression 
                       364 relational_expression=>relational_expression >= • shift_expression 
                    */
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if ($shift_expression(l)) {
                        add_reduce(3, 190);
                        prod = 121;
                        ACCEPT = true;
                    }
                } else {
                    /*assert-end*/
                    /*
                       355 equality_expression=>relational_expression • 
                    */
                    prod = 120;
                    ACCEPT = true;
                }
                break;
            case 122:
                skip_fn_000(l/*[ ws ]*/);
                if (assert_consume(l, cp1ec153e7_(l)/*[<<]*/ || cp0b554d4a_(l)/*[>>] [>>>]*/)) {
                    /*consume*/
                    /*
                       368 shift_expression=>shift_expression << • additive_expression 
                       369 shift_expression=>shift_expression >> • additive_expression 
                       370 shift_expression=>shift_expression >>> • additive_expression 
                    */
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if ($additive_expression(l)) {
                        add_reduce(3, 193);
                        prod = 122;
                        ACCEPT = true;
                    }
                } else {
                    /*assert-end*/
                    /*
                       360 relational_expression=>shift_expression • 
                    */
                    prod = 121;
                    ACCEPT = true;
                }
                break;
            case 123:
                skip_fn_000(l/*[ ws ]*/);
                if (assert_consume(l, assert_table(l, 0x0, 0x2800, 0x0, 0x0)/*tbl:[ + ] [ - ]*/)) {
                    /*consume*/
                    /*
                       372 additive_expression=>additive_expression + • multiplicative_expression 
                       373 additive_expression=>additive_expression - • multiplicative_expression 
                    */
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if ($multiplicative_expression(l)) {
                        add_reduce(3, 194);
                        prod = 123;
                        ACCEPT = true;
                    }
                } else {
                    /*assert-end*/
                    /*
                       367 shift_expression=>additive_expression • 
                    */
                    prod = 122;
                    ACCEPT = true;
                }
                break;
            case 124:
                skip_fn_000(l/*[ ws ]*/);
                if (assert_consume(l, assert_table(l, 0x0, 0x8420, 0x0, 0x0)/*tbl:[ * ] [ / ] [ % ]*/)) {
                    /*consume*/
                    /*
                       375 multiplicative_expression=>multiplicative_expression * • exponentiation_expression 
                       376 multiplicative_expression=>multiplicative_expression / • exponentiation_expression 
                       377 multiplicative_expression=>multiplicative_expression % • exponentiation_expression 
                    */
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if ($exponentiation_expression(l)) {
                        add_reduce(3, 195);
                        prod = 124;
                        ACCEPT = true;
                    }
                } else {
                    /*assert-end*/
                    /*
                       371 additive_expression=>multiplicative_expression • 
                    */
                    prod = 123;
                    ACCEPT = true;
                }
                break;
            case 126:
                skip_fn_000(l/*[ ws ]*/);
                if (assert_consume(l, cpf2b923e4_(l)/*[asteriskasterisk]*/)) {
                    /*consume*/
                    /*
                       379 exponentiation_expression=>unary_expression ** • exponentiation_expression 
                    */
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if ($exponentiation_expression(l)) {
                        add_reduce(3, 196);
                        prod = 124;
                        ACCEPT = true;
                    }
                } else {
                    /*assert-end*/
                    /*
                       378 exponentiation_expression=>unary_expression • 
                    */
                    prod = 124;
                    ACCEPT = true;
                }
                break;
            case 176:
                skip_fn_000(l/*[ ws ]*/);
                if (assert_consume(l, l.utf == 58/*[:]*/)) {
                    /*consume*/
                    /*
                       129 labeled_statement=>label_identifier : • labeled_item 
                    */
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if ($labeled_item(l)) {
                        add_reduce(3, 73);
                        prod = 24;
                        ACCEPT = true;
                    }
                }
                break;
            case 177:
                skip_fn_000(l/*[ ws ]*/);
                if (cpf526e31a_(l)/*[=>]*/) {
                    /*assert-end*/
                    /*
                       210 arrow_parameters=>identifier_reference • 
                    */
                    add_reduce(1, 126);
                    prod = 79;
                    ACCEPT = true;
                } else {
                    /*assert-end*/
                    /*
                       310 primary_expression=>identifier_reference • 
                    */
                    prod = 92;
                    ACCEPT = true;
                }
                break;
            case 179:
                skip_fn_000(l/*[ ws ]*/);
                if (l.utf == 58/*[:]*/) {
                    /*assert-end*/
                    /*
                       521 label_identifier=>identifier • 
                    */
                    add_reduce(1, 252);
                    prod = 176;
                    ACCEPT = true;
                } else {
                    /*assert-end*/
                    /*
                       522 identifier_reference=>identifier • 
                    */
                    add_reduce(1, 253);
                    prod = 177;
                    ACCEPT = true;
                }
                break;
        }
        if (!ACCEPT) {
            break;
        }
    }
    return assertSuccess(l, prod == 24);
}
function $declaration(l: Lexer): boolean {
    if (cp1f027896_(l)/*[class]*/) {
        /*assert-production-closure*/
        /*
           66 declaration=>• class_declaration 
        */
        if ($class_declaration(l)) {
            prod = 25;
        }
    } else if (cp92ea8d2d_(l)/*[const]*/ || cpa0815727_(l)/*[let]*/) {
        /*assert-production-closure*/
        /*
           68 declaration=>• lexical_declaration 
        */
        if ($lexical_declaration(l)) {
            prod = 25;
        }
    } else {
        /*assert-production-closure*/
        /*
           67 declaration=>• hoistable_declaration 
        */
        if ($function_declaration(l)) {
            prod = 25;
        }
    }
    return assertSuccess(l, prod == 25);
}
function $breakable_statement(l: Lexer): boolean {
    if (cp56c09138_(l)/*[switch]*/) {
        /*assert-production-closure*/
        /*
           71 breakable_statement=>• switch_statement 
        */
        if ($switch_statement(l)) {
            prod = 27;
        }
    } else {
        /*assert-production-closure*/
        /*
           70 breakable_statement=>• iteration_statement 
        */
        if ($iteration_statement(l)) {
            prod = 27;
        }
    }
    return assertSuccess(l, prod == 27);
}
function $block(l: Lexer): boolean {
    if (assert_consume(l, l.utf == 123/*[{]*/)) {
        /*consume*/
        /*
           73 block=>{ • statement_list } 
           74 block=>{ • } 
        */
        skip_fn_(l/*[ ws ][ nl ]*/);
        if (assert_consume(l, l.utf == 125/*[}]*/)) {
            /*consume*/
            /*
               74 block=>{ } • 
            */
            add_reduce(2, 28);
            prod = 29;
        } else {
            /*assert-production-closure*/
            /*
               73 block=>{ • statement_list } 
            */
            if ($statement_list(l)) {
                skip_fn_(l/*[ ws ][ nl ]*/);
                if (assert_consume(l, l.utf == 125/*[}]*/)) {
                    add_reduce(3, 27);
                    prod = 29;
                }
            }
        }
    }
    return assertSuccess(l, prod == 29);
}
function $empty_statement(l: Lexer): boolean {
    if (assert_consume(l, l.utf == 59/*[;]*/)) {
        /*consume*/
        /*
           75 empty_statement=>; • 
        */
        add_reduce(1, 29);
        prod = 30;
    }
    return assertSuccess(l, prod == 30);
}
function $expression_statement(l: Lexer): boolean {
    if ($expression(l)) {
        skip_fn_000(l/*[ ws ]*/);
        if (assert_consume(l, __asi__(l))) {
            add_reduce(2, 30);
            prod = 31;
        }
    }
    return assertSuccess(l, prod == 31);
}
function $if_statement_group_163_103(l: Lexer): boolean {
    if (assert_consume(l, cp10383e4e_(l)/*[else]*/)) {
        /*consume*/
        /*
           77 if_statement_group_163_103=>τelse • statement 
        */
        skip_fn_(l/*[ ws ][ nl ]*/);
        if ($statement(l)) {
            add_reduce(2, 0);
            prod = 32;
        }
    }
    return assertSuccess(l, prod == 32);
}
function $if_statement(l: Lexer): boolean {
    if (assert_consume(l, cp3c57f5ab_(l)/*[if]*/)) {
        /*consume*/
        /*
           78 if_statement=>τif • ( expression ) statement if_statement_group_163_103 
           79 if_statement=>τif • ( expression ) statement 
        */
        skip_fn_(l/*[ ws ][ nl ]*/);
        if (assert_consume(l, l.utf == 40/*[(]*/)) {
            /*consume*/
            /*
               78 if_statement=>τif ( • expression ) statement if_statement_group_163_103 
               79 if_statement=>τif ( • expression ) statement 
            */
            skip_fn_(l/*[ ws ][ nl ]*/);
            if ($expression(l)) {
                /*assert*/
                /*
                   78 if_statement=>τif ( • expression ) statement if_statement_group_163_103 
                   79 if_statement=>τif ( • expression ) statement 
                */
                skip_fn_(l/*[ ws ][ nl ]*/);
                if (assert_consume(l, l.utf == 41/*[)]*/)) {
                    /*consume*/
                    /*
                       78 if_statement=>τif ( expression ) • statement if_statement_group_163_103 
                       79 if_statement=>τif ( expression ) • statement 
                    */
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if ($statement(l)) {
                        /*assert*/
                        /*
                           78 if_statement=>τif ( expression ) • statement if_statement_group_163_103 
                           79 if_statement=>τif ( expression ) • statement 
                        */
                        skip_fn_(l/*[ ws ][ nl ]*/);
                        if (cp10383e4e_(l)/*[else]*/) {
                            /*assert-production-closure*/
                            /*
                               78 if_statement=>τif ( expression ) statement • if_statement_group_163_103 
                            */
                            if ($if_statement_group_163_103(l)) {
                                add_reduce(6, 31);
                                prod = 33;
                            }
                        } else {
                            /*assert-end*/
                            /*
                               79 if_statement=>τif ( expression ) statement • 
                            */
                            add_reduce(5, 32);
                            prod = 33;
                        }
                    }
                }
            }
        }
    }
    return assertSuccess(l, prod == 33);
}
function $iteration_statement_group_168_104(l: Lexer): boolean {
    if (assert_consume(l, cp27956077_(l)/*[var]*/)) {
        /*consume*/
        /*
           81 iteration_statement_group_168_104=>τvar • variable_declaration_list 
        */
        skip_fn_(l/*[ ws ][ nl ]*/);
        if ($variable_declaration_list(l)) {
            add_reduce(2, 33);
            prod = 34;
        }
    } else {
        /*assert-production-closure*/
        /*
           80 iteration_statement_group_168_104=>• expression 
        */
        if ($expression(l)) {
            prod = 34;
        }
    }
    return assertSuccess(l, prod == 34);
}
function $iteration_statement_group_073_105(l: Lexer): boolean {
    if (assert_consume(l, cp27956077_(l)/*[var]*/)) {
        /*consume*/
        /*
           83 iteration_statement_group_073_105=>τvar • for_binding 
        */
        skip_fn_(l/*[ ws ][ nl ]*/);
        if ($for_binding(l)) {
            add_reduce(2, 34);
            prod = 35;
        }
    } else if (cp92ea8d2d_(l)/*[const]*/ || cpa0815727_(l)/*[let]*/) {
        /*assert-production-closure*/
        /*
           84 iteration_statement_group_073_105=>• for_declaration 
        */
        if ($for_declaration(l)) {
            prod = 35;
        }
    } else {
        /*assert-production-closure*/
        /*
           82 iteration_statement_group_073_105=>• left_hand_side_expression 
        */
        if ($left_hand_side_expression(l)) {
            prod = 35;
        }
    }
    return assertSuccess(l, prod == 35);
}
function $iteration_statement(l: Lexer): boolean {
    if (cp6ce5d4c3_(l)/*[for]*/) {
        /*peek*/
        /*
           87 iteration_statement=>• τfor ( iteration_statement_group_168_104 ; expression ; expression ) statement 
           88 iteration_statement=>• τfor ( lexical_declaration expression ; expression ) statement 
           89 iteration_statement=>• τfor ( iteration_statement_group_073_105 τin expression ) statement 
           90 iteration_statement=>• τfor τawait ( iteration_statement_group_073_105 τof expression ) statement 
           91 iteration_statement=>• τfor ( ; expression ; expression ) statement 
           92 iteration_statement=>• τfor ( iteration_statement_group_168_104 ; ; expression ) statement 
           93 iteration_statement=>• τfor ( iteration_statement_group_168_104 ; expression ; ) statement 
           94 iteration_statement=>• τfor ( lexical_declaration ; expression ) statement 
           95 iteration_statement=>• τfor ( lexical_declaration expression ; ) statement 
           96 iteration_statement=>• τfor ( iteration_statement_group_073_105 τof expression ) statement 
           97 iteration_statement=>• τfor ( ; ; expression ) statement 
           98 iteration_statement=>• τfor ( ; expression ; ) statement 
           99 iteration_statement=>• τfor ( iteration_statement_group_168_104 ; ; ) statement 
           100 iteration_statement=>• τfor ( lexical_declaration ; ) statement 
           101 iteration_statement=>• τfor ( ; ; ) statement 
        */
        let pk: Lexer = l.copy();
        skip_fn_(pk.next()/*[ ws ][ nl ]*/);
        if (cp4cd44fa7_(pk)/*[await]*/) {
            /*peek*/
            /*
               90 iteration_statement=>• τfor τawait ( iteration_statement_group_073_105 τof expression ) statement 
            */
            if (assert_consume(l, cp6ce5d4c3_(l)/*[for]*/)) {
                skip_fn_(l/*[ ws ][ nl ]*/);
                if (assert_consume(l, cp4cd44fa7_(l)/*[await]*/)) {
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if (assert_consume(l, l.utf == 40/*[(]*/)) {
                        skip_fn_(l/*[ ws ][ nl ]*/);
                        if ($iteration_statement_group_073_105(l)) {
                            skip_fn_(l/*[ ws ][ nl ]*/);
                            if (assert_consume(l, cp3ed7c1f5_(l)/*[of]*/)) {
                                skip_fn_(l/*[ ws ][ nl ]*/);
                                if ($expression(l)) {
                                    skip_fn_(l/*[ ws ][ nl ]*/);
                                    if (assert_consume(l, l.utf == 41/*[)]*/)) {
                                        skip_fn_(l/*[ ws ][ nl ]*/);
                                        if ($statement(l)) {
                                            add_reduce(8, 40);
                                            prod = 36;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        } else if (pk.utf == 40/*[(]*/) {
            /*peek*/
            /*
               87 iteration_statement=>• τfor ( iteration_statement_group_168_104 ; expression ; expression ) statement 
               88 iteration_statement=>• τfor ( lexical_declaration expression ; expression ) statement 
               89 iteration_statement=>• τfor ( iteration_statement_group_073_105 τin expression ) statement 
               91 iteration_statement=>• τfor ( ; expression ; expression ) statement 
               92 iteration_statement=>• τfor ( iteration_statement_group_168_104 ; ; expression ) statement 
               93 iteration_statement=>• τfor ( iteration_statement_group_168_104 ; expression ; ) statement 
               94 iteration_statement=>• τfor ( lexical_declaration ; expression ) statement 
               95 iteration_statement=>• τfor ( lexical_declaration expression ; ) statement 
               96 iteration_statement=>• τfor ( iteration_statement_group_073_105 τof expression ) statement 
               97 iteration_statement=>• τfor ( ; ; expression ) statement 
               98 iteration_statement=>• τfor ( ; expression ; ) statement 
               99 iteration_statement=>• τfor ( iteration_statement_group_168_104 ; ; ) statement 
               100 iteration_statement=>• τfor ( lexical_declaration ; ) statement 
               101 iteration_statement=>• τfor ( ; ; ) statement 
            */
            skip_fn_(l/*[ ws ][ nl ]*/);
            if (assert_consume(l, cp6ce5d4c3_(l)/*[for]*/)) {
                /*consume*/
                /*
                   87 iteration_statement=>τfor • ( iteration_statement_group_168_104 ; expression ; expression ) statement 
                   88 iteration_statement=>τfor • ( lexical_declaration expression ; expression ) statement 
                   89 iteration_statement=>τfor • ( iteration_statement_group_073_105 τin expression ) statement 
                   91 iteration_statement=>τfor • ( ; expression ; expression ) statement 
                   92 iteration_statement=>τfor • ( iteration_statement_group_168_104 ; ; expression ) statement 
                   93 iteration_statement=>τfor • ( iteration_statement_group_168_104 ; expression ; ) statement 
                   94 iteration_statement=>τfor • ( lexical_declaration ; expression ) statement 
                   95 iteration_statement=>τfor • ( lexical_declaration expression ; ) statement 
                   96 iteration_statement=>τfor • ( iteration_statement_group_073_105 τof expression ) statement 
                   97 iteration_statement=>τfor • ( ; ; expression ) statement 
                   98 iteration_statement=>τfor • ( ; expression ; ) statement 
                   99 iteration_statement=>τfor • ( iteration_statement_group_168_104 ; ; ) statement 
                   100 iteration_statement=>τfor • ( lexical_declaration ; ) statement 
                   101 iteration_statement=>τfor • ( ; ; ) statement 
                */
                skip_fn_(l/*[ ws ][ nl ]*/);
                if (assert_consume(l, l.utf == 40/*[(]*/)) {
                    /*consume*/
                    /*
                       87 iteration_statement=>τfor ( • iteration_statement_group_168_104 ; expression ; expression ) statement 
                       88 iteration_statement=>τfor ( • lexical_declaration expression ; expression ) statement 
                       89 iteration_statement=>τfor ( • iteration_statement_group_073_105 τin expression ) statement 
                       91 iteration_statement=>τfor ( • ; expression ; expression ) statement 
                       92 iteration_statement=>τfor ( • iteration_statement_group_168_104 ; ; expression ) statement 
                       93 iteration_statement=>τfor ( • iteration_statement_group_168_104 ; expression ; ) statement 
                       94 iteration_statement=>τfor ( • lexical_declaration ; expression ) statement 
                       95 iteration_statement=>τfor ( • lexical_declaration expression ; ) statement 
                       96 iteration_statement=>τfor ( • iteration_statement_group_073_105 τof expression ) statement 
                       97 iteration_statement=>τfor ( • ; ; expression ) statement 
                       98 iteration_statement=>τfor ( • ; expression ; ) statement 
                       99 iteration_statement=>τfor ( • iteration_statement_group_168_104 ; ; ) statement 
                       100 iteration_statement=>τfor ( • lexical_declaration ; ) statement 
                       101 iteration_statement=>τfor ( • ; ; ) statement 
                    */
                    if (l.utf == 59/*[;]*/) {
                        /*peek*/
                        /*
                           91 iteration_statement=>τfor ( • ; expression ; expression ) statement 
                           97 iteration_statement=>τfor ( • ; ; expression ) statement 
                           98 iteration_statement=>τfor ( • ; expression ; ) statement 
                           101 iteration_statement=>τfor ( • ; ; ) statement 
                        */
                        skip_fn_(l/*[ ws ][ nl ]*/);
                        if (assert_consume(l, l.utf == 59/*[;]*/)) {
                            /*consume*/
                            /*
                               91 iteration_statement=>τfor ( ; • expression ; expression ) statement 
                               97 iteration_statement=>τfor ( ; • ; expression ) statement 
                               98 iteration_statement=>τfor ( ; • expression ; ) statement 
                               101 iteration_statement=>τfor ( ; • ; ) statement 
                            */
                            if (l.utf == 59/*[;]*/) {
                                /*peek*/
                                /*
                                   97 iteration_statement=>τfor ( ; • ; expression ) statement 
                                   101 iteration_statement=>τfor ( ; • ; ) statement 
                                */
                                let pk: Lexer = l.copy();
                                skip_fn_(pk.next()/*[ ws ][ nl ]*/);
                                if (pk.utf == 41/*[)]*/) {
                                    /*peek*/
                                    /*
                                       101 iteration_statement=>τfor ( ; • ; ) statement 
                                    */
                                    if (assert_consume(l, l.utf == 59/*[;]*/)) {
                                        skip_fn_(l/*[ ws ][ nl ]*/);
                                        if (assert_consume(l, l.utf == 41/*[)]*/)) {
                                            skip_fn_(l/*[ ws ][ nl ]*/);
                                            if ($statement(l)) {
                                                add_reduce(6, 51);
                                                prod = 36;
                                            }
                                        }
                                    }
                                } else if ((((cpfaa7aa14_(pk)/*[--] [-]*/ || cp0ac89158_(pk)/*[++] [+]*/) || assert_table(pk, 0x0, 0x8196, 0x88000000, 0x48000001)/*tbl:[ ! ] [ ~ ] [ ` ] [ / ] [ { ] [ [ ] [ ' ] [ " ] [ _ ] [ $ ] [ ( ]*/) || pk.isNum()/*[num]*/) || pk.isID()/*[id]*/) {
                                    /*peek*/
                                    /*
                                       97 iteration_statement=>τfor ( ; • ; expression ) statement 
                                    */
                                    if (assert_consume(l, l.utf == 59/*[;]*/)) {
                                        skip_fn_(l/*[ ws ][ nl ]*/);
                                        if ($expression(l)) {
                                            skip_fn_(l/*[ ws ][ nl ]*/);
                                            if (assert_consume(l, l.utf == 41/*[)]*/)) {
                                                skip_fn_(l/*[ ws ][ nl ]*/);
                                                if ($statement(l)) {
                                                    add_reduce(7, 47);
                                                    prod = 36;
                                                }
                                            }
                                        }
                                    }
                                }
                            } else {
                                /*peek-production-closure*/
                                /*
                                   91 iteration_statement=>τfor ( ; • expression ; expression ) statement 
                                   98 iteration_statement=>τfor ( ; • expression ; ) statement 
                                */
                                skip_fn_(l/*[ ws ][ nl ]*/);
                                if ($expression(l)) {
                                    /*assert*/
                                    /*
                                       91 iteration_statement=>τfor ( ; • expression ; expression ) statement 
                                       98 iteration_statement=>τfor ( ; • expression ; ) statement 
                                    */
                                    skip_fn_(l/*[ ws ][ nl ]*/);
                                    if (assert_consume(l, l.utf == 59/*[;]*/)) {
                                        /*consume*/
                                        /*
                                           91 iteration_statement=>τfor ( ; expression ; • expression ) statement 
                                           98 iteration_statement=>τfor ( ; expression ; • ) statement 
                                        */
                                        skip_fn_(l/*[ ws ][ nl ]*/);
                                        if (assert_consume(l, l.utf == 41/*[)]*/)) {
                                            /*consume*/
                                            /*
                                               98 iteration_statement=>τfor ( ; expression ; ) • statement 
                                            */
                                            skip_fn_(l/*[ ws ][ nl ]*/);
                                            if ($statement(l)) {
                                                add_reduce(7, 48);
                                                prod = 36;
                                            }
                                        } else {
                                            /*assert-production-closure*/
                                            /*
                                               91 iteration_statement=>τfor ( ; expression ; • expression ) statement 
                                            */
                                            if ($expression(l)) {
                                                skip_fn_(l/*[ ws ][ nl ]*/);
                                                if (assert_consume(l, l.utf == 41/*[)]*/)) {
                                                    skip_fn_(l/*[ ws ][ nl ]*/);
                                                    if ($statement(l)) {
                                                        add_reduce(8, 41);
                                                        prod = 36;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    } else if (l.utf == 40/*[(]*/) {
                        /*peek*/
                        /*
                           87 iteration_statement=>τfor ( • iteration_statement_group_168_104 ; expression ; expression ) statement 
                           89 iteration_statement=>τfor ( • iteration_statement_group_073_105 τin expression ) statement 
                           92 iteration_statement=>τfor ( • iteration_statement_group_168_104 ; ; expression ) statement 
                           93 iteration_statement=>τfor ( • iteration_statement_group_168_104 ; expression ; ) statement 
                           96 iteration_statement=>τfor ( • iteration_statement_group_073_105 τof expression ) statement 
                           99 iteration_statement=>τfor ( • iteration_statement_group_168_104 ; ; ) statement 
                        */
                        let pk: Lexer = l.copy();
                        skip_fn_(pk.next()/*[ ws ][ nl ]*/);
                        if (cp7fa4386a_(pk)/*[...]*/ || assert_table(pk, 0x0, 0x200, 0x0, 0x0)/*tbl:[ ) ]*/) {
                            /*peek-production-closure*/
                            /*
                               87 iteration_statement=>τfor ( • iteration_statement_group_168_104 ; expression ; expression ) statement 
                               92 iteration_statement=>τfor ( • iteration_statement_group_168_104 ; ; expression ) statement 
                               93 iteration_statement=>τfor ( • iteration_statement_group_168_104 ; expression ; ) statement 
                               99 iteration_statement=>τfor ( • iteration_statement_group_168_104 ; ; ) statement 
                            */
                            skip_fn_(l/*[ ws ][ nl ]*/);
                            if ($iteration_statement_group_168_104(l)) {
                                /*assert*/
                                /*
                                   87 iteration_statement=>τfor ( • iteration_statement_group_168_104 ; expression ; expression ) statement 
                                   92 iteration_statement=>τfor ( • iteration_statement_group_168_104 ; ; expression ) statement 
                                   93 iteration_statement=>τfor ( • iteration_statement_group_168_104 ; expression ; ) statement 
                                   99 iteration_statement=>τfor ( • iteration_statement_group_168_104 ; ; ) statement 
                                */
                                skip_fn_(l/*[ ws ][ nl ]*/);
                                if (assert_consume(l, l.utf == 59/*[;]*/)) {
                                    /*consume*/
                                    /*
                                       87 iteration_statement=>τfor ( iteration_statement_group_168_104 ; • expression ; expression ) statement 
                                       92 iteration_statement=>τfor ( iteration_statement_group_168_104 ; • ; expression ) statement 
                                       93 iteration_statement=>τfor ( iteration_statement_group_168_104 ; • expression ; ) statement 
                                       99 iteration_statement=>τfor ( iteration_statement_group_168_104 ; • ; ) statement 
                                    */
                                    if (l.utf == 59/*[;]*/) {
                                        /*peek*/
                                        /*
                                           92 iteration_statement=>τfor ( iteration_statement_group_168_104 ; • ; expression ) statement 
                                           99 iteration_statement=>τfor ( iteration_statement_group_168_104 ; • ; ) statement 
                                        */
                                        let pk: Lexer = l.copy();
                                        skip_fn_(pk.next()/*[ ws ][ nl ]*/);
                                        if (pk.utf == 41/*[)]*/) {
                                            /*peek*/
                                            /*
                                               99 iteration_statement=>τfor ( iteration_statement_group_168_104 ; • ; ) statement 
                                            */
                                            if (assert_consume(l, l.utf == 59/*[;]*/)) {
                                                skip_fn_(l/*[ ws ][ nl ]*/);
                                                if (assert_consume(l, l.utf == 41/*[)]*/)) {
                                                    skip_fn_(l/*[ ws ][ nl ]*/);
                                                    if ($statement(l)) {
                                                        add_reduce(7, 49);
                                                        prod = 36;
                                                    }
                                                }
                                            }
                                        } else if ((((cpfaa7aa14_(pk)/*[--] [-]*/ || cp0ac89158_(pk)/*[++] [+]*/) || assert_table(pk, 0x0, 0x8196, 0x88000000, 0x48000001)/*tbl:[ ! ] [ ~ ] [ ` ] [ / ] [ { ] [ [ ] [ ' ] [ " ] [ _ ] [ $ ] [ ( ]*/) || pk.isNum()/*[num]*/) || pk.isID()/*[id]*/) {
                                            /*peek*/
                                            /*
                                               92 iteration_statement=>τfor ( iteration_statement_group_168_104 ; • ; expression ) statement 
                                            */
                                            if (assert_consume(l, l.utf == 59/*[;]*/)) {
                                                skip_fn_(l/*[ ws ][ nl ]*/);
                                                if ($expression(l)) {
                                                    skip_fn_(l/*[ ws ][ nl ]*/);
                                                    if (assert_consume(l, l.utf == 41/*[)]*/)) {
                                                        skip_fn_(l/*[ ws ][ nl ]*/);
                                                        if ($statement(l)) {
                                                            add_reduce(8, 42);
                                                            prod = 36;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    } else {
                                        /*peek-production-closure*/
                                        /*
                                           87 iteration_statement=>τfor ( iteration_statement_group_168_104 ; • expression ; expression ) statement 
                                           93 iteration_statement=>τfor ( iteration_statement_group_168_104 ; • expression ; ) statement 
                                        */
                                        skip_fn_(l/*[ ws ][ nl ]*/);
                                        if ($expression(l)) {
                                            /*assert*/
                                            /*
                                               87 iteration_statement=>τfor ( iteration_statement_group_168_104 ; • expression ; expression ) statement 
                                               93 iteration_statement=>τfor ( iteration_statement_group_168_104 ; • expression ; ) statement 
                                            */
                                            skip_fn_(l/*[ ws ][ nl ]*/);
                                            if (assert_consume(l, l.utf == 59/*[;]*/)) {
                                                /*consume*/
                                                /*
                                                   87 iteration_statement=>τfor ( iteration_statement_group_168_104 ; expression ; • expression ) statement 
                                                   93 iteration_statement=>τfor ( iteration_statement_group_168_104 ; expression ; • ) statement 
                                                */
                                                skip_fn_(l/*[ ws ][ nl ]*/);
                                                if (assert_consume(l, l.utf == 41/*[)]*/)) {
                                                    /*consume*/
                                                    /*
                                                       93 iteration_statement=>τfor ( iteration_statement_group_168_104 ; expression ; ) • statement 
                                                    */
                                                    skip_fn_(l/*[ ws ][ nl ]*/);
                                                    if ($statement(l)) {
                                                        add_reduce(8, 43);
                                                        prod = 36;
                                                    }
                                                } else {
                                                    /*assert-production-closure*/
                                                    /*
                                                       87 iteration_statement=>τfor ( iteration_statement_group_168_104 ; expression ; • expression ) statement 
                                                    */
                                                    if ($expression(l)) {
                                                        skip_fn_(l/*[ ws ][ nl ]*/);
                                                        if (assert_consume(l, l.utf == 41/*[)]*/)) {
                                                            skip_fn_(l/*[ ws ][ nl ]*/);
                                                            if ($statement(l)) {
                                                                add_reduce(9, 37);
                                                                prod = 36;
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        } else if ((((cpfaa7aa14_(pk)/*[--] [-]*/ || cp0ac89158_(pk)/*[++] [+]*/) || assert_table(pk, 0x0, 0x8196, 0x88000000, 0x48000001)/*tbl:[ ! ] [ ~ ] [ ` ] [ / ] [ { ] [ [ ] [ ' ] [ " ] [ _ ] [ $ ] [ ( ]*/) || pk.isNum()/*[num]*/) || pk.isID()/*[id]*/) {
                            /*peek*/
                            /*
                               87 iteration_statement=>τfor ( • iteration_statement_group_168_104 ; expression ; expression ) statement 
                               89 iteration_statement=>τfor ( • iteration_statement_group_073_105 τin expression ) statement 
                               92 iteration_statement=>τfor ( • iteration_statement_group_168_104 ; ; expression ) statement 
                               93 iteration_statement=>τfor ( • iteration_statement_group_168_104 ; expression ; ) statement 
                               96 iteration_statement=>τfor ( • iteration_statement_group_073_105 τof expression ) statement 
                               99 iteration_statement=>τfor ( • iteration_statement_group_168_104 ; ; ) statement 
                            */
                            let mk: i32 = mark();
                            let anchor: Lexer = l.copy();
                            /*36*/
                            skip_fn_(l/*[ ws ][ nl ]*/);
                            if ($iteration_statement_group_168_104(l)) {
                                /*assert*/
                                /*
                                   87 iteration_statement=>τfor ( • iteration_statement_group_168_104 ; expression ; expression ) statement 
                                   92 iteration_statement=>τfor ( • iteration_statement_group_168_104 ; ; expression ) statement 
                                   93 iteration_statement=>τfor ( • iteration_statement_group_168_104 ; expression ; ) statement 
                                   99 iteration_statement=>τfor ( • iteration_statement_group_168_104 ; ; ) statement 
                                */
                                skip_fn_(l/*[ ws ][ nl ]*/);
                                if (assert_consume(l, l.utf == 59/*[;]*/)) {
                                    /*consume*/
                                    /*
                                       87 iteration_statement=>τfor ( iteration_statement_group_168_104 ; • expression ; expression ) statement 
                                       92 iteration_statement=>τfor ( iteration_statement_group_168_104 ; • ; expression ) statement 
                                       93 iteration_statement=>τfor ( iteration_statement_group_168_104 ; • expression ; ) statement 
                                       99 iteration_statement=>τfor ( iteration_statement_group_168_104 ; • ; ) statement 
                                    */
                                    if (l.utf == 59/*[;]*/) {
                                        /*peek*/
                                        /*
                                           92 iteration_statement=>τfor ( iteration_statement_group_168_104 ; • ; expression ) statement 
                                           99 iteration_statement=>τfor ( iteration_statement_group_168_104 ; • ; ) statement 
                                        */
                                        let pk: Lexer = l.copy();
                                        skip_fn_(pk.next()/*[ ws ][ nl ]*/);
                                        if (pk.utf == 41/*[)]*/) {
                                            /*peek*/
                                            /*
                                               99 iteration_statement=>τfor ( iteration_statement_group_168_104 ; • ; ) statement 
                                            */
                                            if (assert_consume(l, l.utf == 59/*[;]*/)) {
                                                skip_fn_(l/*[ ws ][ nl ]*/);
                                                if (assert_consume(l, l.utf == 41/*[)]*/)) {
                                                    skip_fn_(l/*[ ws ][ nl ]*/);
                                                    if ($statement(l)) {
                                                        add_reduce(7, 49);
                                                        prod = 36;
                                                    }
                                                }
                                            }
                                        } else if ((((cpfaa7aa14_(pk)/*[--] [-]*/ || cp0ac89158_(pk)/*[++] [+]*/) || assert_table(pk, 0x0, 0x8196, 0x88000000, 0x48000001)/*tbl:[ ! ] [ ~ ] [ ` ] [ / ] [ { ] [ [ ] [ ' ] [ " ] [ _ ] [ $ ] [ ( ]*/) || pk.isNum()/*[num]*/) || pk.isID()/*[id]*/) {
                                            /*peek*/
                                            /*
                                               92 iteration_statement=>τfor ( iteration_statement_group_168_104 ; • ; expression ) statement 
                                            */
                                            if (assert_consume(l, l.utf == 59/*[;]*/)) {
                                                skip_fn_(l/*[ ws ][ nl ]*/);
                                                if ($expression(l)) {
                                                    skip_fn_(l/*[ ws ][ nl ]*/);
                                                    if (assert_consume(l, l.utf == 41/*[)]*/)) {
                                                        skip_fn_(l/*[ ws ][ nl ]*/);
                                                        if ($statement(l)) {
                                                            add_reduce(8, 42);
                                                            prod = 36;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    } else {
                                        /*peek-production-closure*/
                                        /*
                                           87 iteration_statement=>τfor ( iteration_statement_group_168_104 ; • expression ; expression ) statement 
                                           93 iteration_statement=>τfor ( iteration_statement_group_168_104 ; • expression ; ) statement 
                                        */
                                        skip_fn_(l/*[ ws ][ nl ]*/);
                                        if ($expression(l)) {
                                            /*assert*/
                                            /*
                                               87 iteration_statement=>τfor ( iteration_statement_group_168_104 ; • expression ; expression ) statement 
                                               93 iteration_statement=>τfor ( iteration_statement_group_168_104 ; • expression ; ) statement 
                                            */
                                            skip_fn_(l/*[ ws ][ nl ]*/);
                                            if (assert_consume(l, l.utf == 59/*[;]*/)) {
                                                /*consume*/
                                                /*
                                                   87 iteration_statement=>τfor ( iteration_statement_group_168_104 ; expression ; • expression ) statement 
                                                   93 iteration_statement=>τfor ( iteration_statement_group_168_104 ; expression ; • ) statement 
                                                */
                                                skip_fn_(l/*[ ws ][ nl ]*/);
                                                if (assert_consume(l, l.utf == 41/*[)]*/)) {
                                                    /*consume*/
                                                    /*
                                                       93 iteration_statement=>τfor ( iteration_statement_group_168_104 ; expression ; ) • statement 
                                                    */
                                                    skip_fn_(l/*[ ws ][ nl ]*/);
                                                    if ($statement(l)) {
                                                        add_reduce(8, 43);
                                                        prod = 36;
                                                    }
                                                } else {
                                                    /*assert-production-closure*/
                                                    /*
                                                       87 iteration_statement=>τfor ( iteration_statement_group_168_104 ; expression ; • expression ) statement 
                                                    */
                                                    if ($expression(l)) {
                                                        skip_fn_(l/*[ ws ][ nl ]*/);
                                                        if (assert_consume(l, l.utf == 41/*[)]*/)) {
                                                            skip_fn_(l/*[ ws ][ nl ]*/);
                                                            if ($statement(l)) {
                                                                add_reduce(9, 37);
                                                                prod = 36;
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            if (reset(mk, anchor, l, prod == 36)) {
                                prod = -1;
                                if ($iteration_statement_group_073_105(l)) {
                                    /*assert*/
                                    /*
                                       89 iteration_statement=>τfor ( • iteration_statement_group_073_105 τin expression ) statement 
                                       96 iteration_statement=>τfor ( • iteration_statement_group_073_105 τof expression ) statement 
                                    */
                                    skip_fn_(l/*[ ws ][ nl ]*/);
                                    if (assert_consume(l, cp3ed7c1f5_(l)/*[of]*/)) {
                                        /*consume*/
                                        /*
                                           96 iteration_statement=>τfor ( iteration_statement_group_073_105 τof • expression ) statement 
                                        */
                                        skip_fn_(l/*[ ws ][ nl ]*/);
                                        if ($expression(l)) {
                                            skip_fn_(l/*[ ws ][ nl ]*/);
                                            if (assert_consume(l, l.utf == 41/*[)]*/)) {
                                                skip_fn_(l/*[ ws ][ nl ]*/);
                                                if ($statement(l)) {
                                                    add_reduce(7, 46);
                                                    prod = 36;
                                                }
                                            }
                                        }
                                    } else if (assert_consume(l, cp0725ae43_(l)/*[in]*/)) {
                                        /*consume*/
                                        /*
                                           89 iteration_statement=>τfor ( iteration_statement_group_073_105 τin • expression ) statement 
                                        */
                                        skip_fn_(l/*[ ws ][ nl ]*/);
                                        if ($expression(l)) {
                                            skip_fn_(l/*[ ws ][ nl ]*/);
                                            if (assert_consume(l, l.utf == 41/*[)]*/)) {
                                                skip_fn_(l/*[ ws ][ nl ]*/);
                                                if ($statement(l)) {
                                                    add_reduce(7, 39);
                                                    prod = 36;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    } else if (cpdcbfef5f_(l)/*[async]*/) {
                        /*peek*/
                        /*
                           87 iteration_statement=>τfor ( • iteration_statement_group_168_104 ; expression ; expression ) statement 
                           89 iteration_statement=>τfor ( • iteration_statement_group_073_105 τin expression ) statement 
                           92 iteration_statement=>τfor ( • iteration_statement_group_168_104 ; ; expression ) statement 
                           93 iteration_statement=>τfor ( • iteration_statement_group_168_104 ; expression ; ) statement 
                           96 iteration_statement=>τfor ( • iteration_statement_group_073_105 τof expression ) statement 
                           99 iteration_statement=>τfor ( • iteration_statement_group_168_104 ; ; ) statement 
                        */
                        let pk: Lexer = l.copy();
                        skip_fn_000(pk.next()/*[ ws ]*/);
                        if (((((((((((((((((((cp2f772376_(pk)/*[function] [from]*/ || cpa74f084c_(pk)/*[extends]*/) || cp3ed7c1f5_(pk)/*[of]*/) || cp0725ae43_(pk)/*[in]*/) || cp8485b2d7_(pk)/*[--] [-=]*/) || cp93d4091f_(pk)/*[++] [+=]*/) || cp8687cbf2_(pk)/*[asteriskasterisk=] [asterisk]*/) || cpf9ccda11_(pk)/*[|=]*/) || cpbd75a16c_(pk)/*[^=]*/) || cpbd0a1baf_(pk)/*[&=]*/) || cpa053380f_(pk)/*[>>>=] [>>=]*/) || cp0bb67c25_(pk)/*[<<=]*/) || cpba9dd503_(pk)/*[%=]*/) || cp29720e9d_(pk)/*[/=]*/) || cp2f3a2b3c_(pk)/*[?.]*/) || cpaffbb9b3_(pk)/*[=>] [=]*/) || cp00a86e9e_(pk)/*[as]*/) || assert_table(pk, 0x0, 0xc005300, 0x28000000, 0x28000001)/*tbl:[ ] ] [ ) ] [ { ] [ ` ] [ . ] [ [ ] [ : ] [ ; ] [ } ] [ , ] [ ( ]*/) || false) || pk.isNL()/*[nl]*/) {
                            /*peek*/
                            /*
                               87 iteration_statement=>τfor ( • iteration_statement_group_168_104 ; expression ; expression ) statement 
                               89 iteration_statement=>τfor ( • iteration_statement_group_073_105 τin expression ) statement 
                               92 iteration_statement=>τfor ( • iteration_statement_group_168_104 ; ; expression ) statement 
                               93 iteration_statement=>τfor ( • iteration_statement_group_168_104 ; expression ; ) statement 
                               96 iteration_statement=>τfor ( • iteration_statement_group_073_105 τof expression ) statement 
                               99 iteration_statement=>τfor ( • iteration_statement_group_168_104 ; ; ) statement 
                            */
                            let mk: i32 = mark();
                            let anchor: Lexer = l.copy();
                            /*36*/
                            skip_fn_(l/*[ ws ][ nl ]*/);
                            if ($iteration_statement_group_168_104(l)) {
                                /*assert*/
                                /*
                                   87 iteration_statement=>τfor ( • iteration_statement_group_168_104 ; expression ; expression ) statement 
                                   92 iteration_statement=>τfor ( • iteration_statement_group_168_104 ; ; expression ) statement 
                                   93 iteration_statement=>τfor ( • iteration_statement_group_168_104 ; expression ; ) statement 
                                   99 iteration_statement=>τfor ( • iteration_statement_group_168_104 ; ; ) statement 
                                */
                                skip_fn_(l/*[ ws ][ nl ]*/);
                                if (assert_consume(l, l.utf == 59/*[;]*/)) {
                                    /*consume*/
                                    /*
                                       87 iteration_statement=>τfor ( iteration_statement_group_168_104 ; • expression ; expression ) statement 
                                       92 iteration_statement=>τfor ( iteration_statement_group_168_104 ; • ; expression ) statement 
                                       93 iteration_statement=>τfor ( iteration_statement_group_168_104 ; • expression ; ) statement 
                                       99 iteration_statement=>τfor ( iteration_statement_group_168_104 ; • ; ) statement 
                                    */
                                    if (l.utf == 59/*[;]*/) {
                                        /*peek*/
                                        /*
                                           92 iteration_statement=>τfor ( iteration_statement_group_168_104 ; • ; expression ) statement 
                                           99 iteration_statement=>τfor ( iteration_statement_group_168_104 ; • ; ) statement 
                                        */
                                        let pk: Lexer = l.copy();
                                        skip_fn_(pk.next()/*[ ws ][ nl ]*/);
                                        if (pk.utf == 41/*[)]*/) {
                                            /*peek*/
                                            /*
                                               99 iteration_statement=>τfor ( iteration_statement_group_168_104 ; • ; ) statement 
                                            */
                                            if (assert_consume(l, l.utf == 59/*[;]*/)) {
                                                skip_fn_(l/*[ ws ][ nl ]*/);
                                                if (assert_consume(l, l.utf == 41/*[)]*/)) {
                                                    skip_fn_(l/*[ ws ][ nl ]*/);
                                                    if ($statement(l)) {
                                                        add_reduce(7, 49);
                                                        prod = 36;
                                                    }
                                                }
                                            }
                                        } else if ((((cpfaa7aa14_(pk)/*[--] [-]*/ || cp0ac89158_(pk)/*[++] [+]*/) || assert_table(pk, 0x0, 0x8196, 0x88000000, 0x48000001)/*tbl:[ ! ] [ ~ ] [ ` ] [ / ] [ { ] [ [ ] [ ' ] [ " ] [ _ ] [ $ ] [ ( ]*/) || pk.isNum()/*[num]*/) || pk.isID()/*[id]*/) {
                                            /*peek*/
                                            /*
                                               92 iteration_statement=>τfor ( iteration_statement_group_168_104 ; • ; expression ) statement 
                                            */
                                            if (assert_consume(l, l.utf == 59/*[;]*/)) {
                                                skip_fn_(l/*[ ws ][ nl ]*/);
                                                if ($expression(l)) {
                                                    skip_fn_(l/*[ ws ][ nl ]*/);
                                                    if (assert_consume(l, l.utf == 41/*[)]*/)) {
                                                        skip_fn_(l/*[ ws ][ nl ]*/);
                                                        if ($statement(l)) {
                                                            add_reduce(8, 42);
                                                            prod = 36;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    } else {
                                        /*peek-production-closure*/
                                        /*
                                           87 iteration_statement=>τfor ( iteration_statement_group_168_104 ; • expression ; expression ) statement 
                                           93 iteration_statement=>τfor ( iteration_statement_group_168_104 ; • expression ; ) statement 
                                        */
                                        skip_fn_(l/*[ ws ][ nl ]*/);
                                        if ($expression(l)) {
                                            /*assert*/
                                            /*
                                               87 iteration_statement=>τfor ( iteration_statement_group_168_104 ; • expression ; expression ) statement 
                                               93 iteration_statement=>τfor ( iteration_statement_group_168_104 ; • expression ; ) statement 
                                            */
                                            skip_fn_(l/*[ ws ][ nl ]*/);
                                            if (assert_consume(l, l.utf == 59/*[;]*/)) {
                                                /*consume*/
                                                /*
                                                   87 iteration_statement=>τfor ( iteration_statement_group_168_104 ; expression ; • expression ) statement 
                                                   93 iteration_statement=>τfor ( iteration_statement_group_168_104 ; expression ; • ) statement 
                                                */
                                                skip_fn_(l/*[ ws ][ nl ]*/);
                                                if (assert_consume(l, l.utf == 41/*[)]*/)) {
                                                    /*consume*/
                                                    /*
                                                       93 iteration_statement=>τfor ( iteration_statement_group_168_104 ; expression ; ) • statement 
                                                    */
                                                    skip_fn_(l/*[ ws ][ nl ]*/);
                                                    if ($statement(l)) {
                                                        add_reduce(8, 43);
                                                        prod = 36;
                                                    }
                                                } else {
                                                    /*assert-production-closure*/
                                                    /*
                                                       87 iteration_statement=>τfor ( iteration_statement_group_168_104 ; expression ; • expression ) statement 
                                                    */
                                                    if ($expression(l)) {
                                                        skip_fn_(l/*[ ws ][ nl ]*/);
                                                        if (assert_consume(l, l.utf == 41/*[)]*/)) {
                                                            skip_fn_(l/*[ ws ][ nl ]*/);
                                                            if ($statement(l)) {
                                                                add_reduce(9, 37);
                                                                prod = 36;
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            if (reset(mk, anchor, l, prod == 36)) {
                                prod = -1;
                                if ($iteration_statement_group_073_105(l)) {
                                    /*assert*/
                                    /*
                                       89 iteration_statement=>τfor ( • iteration_statement_group_073_105 τin expression ) statement 
                                       96 iteration_statement=>τfor ( • iteration_statement_group_073_105 τof expression ) statement 
                                    */
                                    skip_fn_(l/*[ ws ][ nl ]*/);
                                    if (assert_consume(l, cp3ed7c1f5_(l)/*[of]*/)) {
                                        /*consume*/
                                        /*
                                           96 iteration_statement=>τfor ( iteration_statement_group_073_105 τof • expression ) statement 
                                        */
                                        skip_fn_(l/*[ ws ][ nl ]*/);
                                        if ($expression(l)) {
                                            skip_fn_(l/*[ ws ][ nl ]*/);
                                            if (assert_consume(l, l.utf == 41/*[)]*/)) {
                                                skip_fn_(l/*[ ws ][ nl ]*/);
                                                if ($statement(l)) {
                                                    add_reduce(7, 46);
                                                    prod = 36;
                                                }
                                            }
                                        }
                                    } else if (assert_consume(l, cp0725ae43_(l)/*[in]*/)) {
                                        /*consume*/
                                        /*
                                           89 iteration_statement=>τfor ( iteration_statement_group_073_105 τin • expression ) statement 
                                        */
                                        skip_fn_(l/*[ ws ][ nl ]*/);
                                        if ($expression(l)) {
                                            skip_fn_(l/*[ ws ][ nl ]*/);
                                            if (assert_consume(l, l.utf == 41/*[)]*/)) {
                                                skip_fn_(l/*[ ws ][ nl ]*/);
                                                if ($statement(l)) {
                                                    add_reduce(7, 39);
                                                    prod = 36;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        } else {
                            /*peek-production-closure*/
                            /*
                               87 iteration_statement=>τfor ( • iteration_statement_group_168_104 ; expression ; expression ) statement 
                               92 iteration_statement=>τfor ( • iteration_statement_group_168_104 ; ; expression ) statement 
                               93 iteration_statement=>τfor ( • iteration_statement_group_168_104 ; expression ; ) statement 
                               99 iteration_statement=>τfor ( • iteration_statement_group_168_104 ; ; ) statement 
                            */
                            skip_fn_(l/*[ ws ][ nl ]*/);
                            if ($iteration_statement_group_168_104(l)) {
                                /*assert*/
                                /*
                                   87 iteration_statement=>τfor ( • iteration_statement_group_168_104 ; expression ; expression ) statement 
                                   92 iteration_statement=>τfor ( • iteration_statement_group_168_104 ; ; expression ) statement 
                                   93 iteration_statement=>τfor ( • iteration_statement_group_168_104 ; expression ; ) statement 
                                   99 iteration_statement=>τfor ( • iteration_statement_group_168_104 ; ; ) statement 
                                */
                                skip_fn_(l/*[ ws ][ nl ]*/);
                                if (assert_consume(l, l.utf == 59/*[;]*/)) {
                                    /*consume*/
                                    /*
                                       87 iteration_statement=>τfor ( iteration_statement_group_168_104 ; • expression ; expression ) statement 
                                       92 iteration_statement=>τfor ( iteration_statement_group_168_104 ; • ; expression ) statement 
                                       93 iteration_statement=>τfor ( iteration_statement_group_168_104 ; • expression ; ) statement 
                                       99 iteration_statement=>τfor ( iteration_statement_group_168_104 ; • ; ) statement 
                                    */
                                    if (l.utf == 59/*[;]*/) {
                                        /*peek*/
                                        /*
                                           92 iteration_statement=>τfor ( iteration_statement_group_168_104 ; • ; expression ) statement 
                                           99 iteration_statement=>τfor ( iteration_statement_group_168_104 ; • ; ) statement 
                                        */
                                        let pk: Lexer = l.copy();
                                        skip_fn_(pk.next()/*[ ws ][ nl ]*/);
                                        if (pk.utf == 41/*[)]*/) {
                                            /*peek*/
                                            /*
                                               99 iteration_statement=>τfor ( iteration_statement_group_168_104 ; • ; ) statement 
                                            */
                                            if (assert_consume(l, l.utf == 59/*[;]*/)) {
                                                skip_fn_(l/*[ ws ][ nl ]*/);
                                                if (assert_consume(l, l.utf == 41/*[)]*/)) {
                                                    skip_fn_(l/*[ ws ][ nl ]*/);
                                                    if ($statement(l)) {
                                                        add_reduce(7, 49);
                                                        prod = 36;
                                                    }
                                                }
                                            }
                                        } else if ((((cpfaa7aa14_(pk)/*[--] [-]*/ || cp0ac89158_(pk)/*[++] [+]*/) || assert_table(pk, 0x0, 0x8196, 0x88000000, 0x48000001)/*tbl:[ ! ] [ ~ ] [ ` ] [ / ] [ { ] [ [ ] [ ' ] [ " ] [ _ ] [ $ ] [ ( ]*/) || pk.isNum()/*[num]*/) || pk.isID()/*[id]*/) {
                                            /*peek*/
                                            /*
                                               92 iteration_statement=>τfor ( iteration_statement_group_168_104 ; • ; expression ) statement 
                                            */
                                            if (assert_consume(l, l.utf == 59/*[;]*/)) {
                                                skip_fn_(l/*[ ws ][ nl ]*/);
                                                if ($expression(l)) {
                                                    skip_fn_(l/*[ ws ][ nl ]*/);
                                                    if (assert_consume(l, l.utf == 41/*[)]*/)) {
                                                        skip_fn_(l/*[ ws ][ nl ]*/);
                                                        if ($statement(l)) {
                                                            add_reduce(8, 42);
                                                            prod = 36;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    } else {
                                        /*peek-production-closure*/
                                        /*
                                           87 iteration_statement=>τfor ( iteration_statement_group_168_104 ; • expression ; expression ) statement 
                                           93 iteration_statement=>τfor ( iteration_statement_group_168_104 ; • expression ; ) statement 
                                        */
                                        skip_fn_(l/*[ ws ][ nl ]*/);
                                        if ($expression(l)) {
                                            /*assert*/
                                            /*
                                               87 iteration_statement=>τfor ( iteration_statement_group_168_104 ; • expression ; expression ) statement 
                                               93 iteration_statement=>τfor ( iteration_statement_group_168_104 ; • expression ; ) statement 
                                            */
                                            skip_fn_(l/*[ ws ][ nl ]*/);
                                            if (assert_consume(l, l.utf == 59/*[;]*/)) {
                                                /*consume*/
                                                /*
                                                   87 iteration_statement=>τfor ( iteration_statement_group_168_104 ; expression ; • expression ) statement 
                                                   93 iteration_statement=>τfor ( iteration_statement_group_168_104 ; expression ; • ) statement 
                                                */
                                                skip_fn_(l/*[ ws ][ nl ]*/);
                                                if (assert_consume(l, l.utf == 41/*[)]*/)) {
                                                    /*consume*/
                                                    /*
                                                       93 iteration_statement=>τfor ( iteration_statement_group_168_104 ; expression ; ) • statement 
                                                    */
                                                    skip_fn_(l/*[ ws ][ nl ]*/);
                                                    if ($statement(l)) {
                                                        add_reduce(8, 43);
                                                        prod = 36;
                                                    }
                                                } else {
                                                    /*assert-production-closure*/
                                                    /*
                                                       87 iteration_statement=>τfor ( iteration_statement_group_168_104 ; expression ; • expression ) statement 
                                                    */
                                                    if ($expression(l)) {
                                                        skip_fn_(l/*[ ws ][ nl ]*/);
                                                        if (assert_consume(l, l.utf == 41/*[)]*/)) {
                                                            skip_fn_(l/*[ ws ][ nl ]*/);
                                                            if ($statement(l)) {
                                                                add_reduce(9, 37);
                                                                prod = 36;
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    } else if (cp92ea8d2d_(l)/*[const]*/ || cpa0815727_(l)/*[let]*/) {
                        /*peek*/
                        /*
                           88 iteration_statement=>τfor ( • lexical_declaration expression ; expression ) statement 
                           89 iteration_statement=>τfor ( • iteration_statement_group_073_105 τin expression ) statement 
                           94 iteration_statement=>τfor ( • lexical_declaration ; expression ) statement 
                           95 iteration_statement=>τfor ( • lexical_declaration expression ; ) statement 
                           96 iteration_statement=>τfor ( • iteration_statement_group_073_105 τof expression ) statement 
                           100 iteration_statement=>τfor ( • lexical_declaration ; ) statement 
                        */
                        let mk: i32 = mark();
                        let anchor: Lexer = l.copy();
                        /*36*/
                        if ($lexical_declaration(l)) {
                            /*assert*/
                            /*
                               88 iteration_statement=>τfor ( • lexical_declaration expression ; expression ) statement 
                               94 iteration_statement=>τfor ( • lexical_declaration ; expression ) statement 
                               95 iteration_statement=>τfor ( • lexical_declaration expression ; ) statement 
                               100 iteration_statement=>τfor ( • lexical_declaration ; ) statement 
                            */
                            if (l.utf == 59/*[;]*/) {
                                /*peek*/
                                /*
                                   94 iteration_statement=>τfor ( lexical_declaration • ; expression ) statement 
                                   100 iteration_statement=>τfor ( lexical_declaration • ; ) statement 
                                */
                                let pk: Lexer = l.copy();
                                skip_fn_(pk.next()/*[ ws ][ nl ]*/);
                                if (pk.utf == 41/*[)]*/) {
                                    /*peek*/
                                    /*
                                       100 iteration_statement=>τfor ( lexical_declaration • ; ) statement 
                                    */
                                    if (assert_consume(l, l.utf == 59/*[;]*/)) {
                                        skip_fn_(l/*[ ws ][ nl ]*/);
                                        if (assert_consume(l, l.utf == 41/*[)]*/)) {
                                            skip_fn_(l/*[ ws ][ nl ]*/);
                                            if ($statement(l)) {
                                                add_reduce(6, 50);
                                                prod = 36;
                                            }
                                        }
                                    }
                                } else if ((((cpfaa7aa14_(pk)/*[--] [-]*/ || cp0ac89158_(pk)/*[++] [+]*/) || assert_table(pk, 0x0, 0x8196, 0x88000000, 0x48000001)/*tbl:[ ! ] [ ~ ] [ ` ] [ / ] [ { ] [ [ ] [ ' ] [ " ] [ _ ] [ $ ] [ ( ]*/) || pk.isNum()/*[num]*/) || pk.isID()/*[id]*/) {
                                    /*peek*/
                                    /*
                                       94 iteration_statement=>τfor ( lexical_declaration • ; expression ) statement 
                                    */
                                    if (assert_consume(l, l.utf == 59/*[;]*/)) {
                                        skip_fn_(l/*[ ws ][ nl ]*/);
                                        if ($expression(l)) {
                                            skip_fn_(l/*[ ws ][ nl ]*/);
                                            if (assert_consume(l, l.utf == 41/*[)]*/)) {
                                                skip_fn_(l/*[ ws ][ nl ]*/);
                                                if ($statement(l)) {
                                                    add_reduce(7, 44);
                                                    prod = 36;
                                                }
                                            }
                                        }
                                    }
                                }
                            } else {
                                /*peek-production-closure*/
                                /*
                                   88 iteration_statement=>τfor ( lexical_declaration • expression ; expression ) statement 
                                   95 iteration_statement=>τfor ( lexical_declaration • expression ; ) statement 
                                */
                                skip_fn_(l/*[ ws ][ nl ]*/);
                                if ($expression(l)) {
                                    /*assert*/
                                    /*
                                       88 iteration_statement=>τfor ( lexical_declaration • expression ; expression ) statement 
                                       95 iteration_statement=>τfor ( lexical_declaration • expression ; ) statement 
                                    */
                                    skip_fn_(l/*[ ws ][ nl ]*/);
                                    if (assert_consume(l, l.utf == 59/*[;]*/)) {
                                        /*consume*/
                                        /*
                                           88 iteration_statement=>τfor ( lexical_declaration expression ; • expression ) statement 
                                           95 iteration_statement=>τfor ( lexical_declaration expression ; • ) statement 
                                        */
                                        skip_fn_(l/*[ ws ][ nl ]*/);
                                        if (assert_consume(l, l.utf == 41/*[)]*/)) {
                                            /*consume*/
                                            /*
                                               95 iteration_statement=>τfor ( lexical_declaration expression ; ) • statement 
                                            */
                                            skip_fn_(l/*[ ws ][ nl ]*/);
                                            if ($statement(l)) {
                                                add_reduce(7, 45);
                                                prod = 36;
                                            }
                                        } else {
                                            /*assert-production-closure*/
                                            /*
                                               88 iteration_statement=>τfor ( lexical_declaration expression ; • expression ) statement 
                                            */
                                            if ($expression(l)) {
                                                skip_fn_(l/*[ ws ][ nl ]*/);
                                                if (assert_consume(l, l.utf == 41/*[)]*/)) {
                                                    skip_fn_(l/*[ ws ][ nl ]*/);
                                                    if ($statement(l)) {
                                                        add_reduce(8, 38);
                                                        prod = 36;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        if (reset(mk, anchor, l, prod == 36)) {
                            prod = -1;
                            if ($iteration_statement_group_073_105(l)) {
                                /*assert*/
                                /*
                                   89 iteration_statement=>τfor ( • iteration_statement_group_073_105 τin expression ) statement 
                                   96 iteration_statement=>τfor ( • iteration_statement_group_073_105 τof expression ) statement 
                                */
                                skip_fn_(l/*[ ws ][ nl ]*/);
                                if (assert_consume(l, cp3ed7c1f5_(l)/*[of]*/)) {
                                    /*consume*/
                                    /*
                                       96 iteration_statement=>τfor ( iteration_statement_group_073_105 τof • expression ) statement 
                                    */
                                    skip_fn_(l/*[ ws ][ nl ]*/);
                                    if ($expression(l)) {
                                        skip_fn_(l/*[ ws ][ nl ]*/);
                                        if (assert_consume(l, l.utf == 41/*[)]*/)) {
                                            skip_fn_(l/*[ ws ][ nl ]*/);
                                            if ($statement(l)) {
                                                add_reduce(7, 46);
                                                prod = 36;
                                            }
                                        }
                                    }
                                } else if (assert_consume(l, cp0725ae43_(l)/*[in]*/)) {
                                    /*consume*/
                                    /*
                                       89 iteration_statement=>τfor ( iteration_statement_group_073_105 τin • expression ) statement 
                                    */
                                    skip_fn_(l/*[ ws ][ nl ]*/);
                                    if ($expression(l)) {
                                        skip_fn_(l/*[ ws ][ nl ]*/);
                                        if (assert_consume(l, l.utf == 41/*[)]*/)) {
                                            skip_fn_(l/*[ ws ][ nl ]*/);
                                            if ($statement(l)) {
                                                add_reduce(7, 39);
                                                prod = 36;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    } else if (((((((cp4cd44fa7_(l)/*[await]*/ || cpfaa7aa14_(l)/*[--] [-]*/) || cp0ac89158_(l)/*[++] [+]*/) || cp5a8be194_(l)/*[typeof]*/) || cp3617ce6e_(l)/*[void]*/) || cpc7ed71c1_(l)/*[delete]*/) || cp3e88794b_(l)/*[yield]*/) || assert_table(l, 0x0, 0x2, 0x0, 0x40000000)/*tbl:[ ! ] [ ~ ]*/) {
                        /*peek-production-closure*/
                        /*
                           87 iteration_statement=>τfor ( • iteration_statement_group_168_104 ; expression ; expression ) statement 
                           92 iteration_statement=>τfor ( • iteration_statement_group_168_104 ; ; expression ) statement 
                           93 iteration_statement=>τfor ( • iteration_statement_group_168_104 ; expression ; ) statement 
                           99 iteration_statement=>τfor ( • iteration_statement_group_168_104 ; ; ) statement 
                        */
                        skip_fn_(l/*[ ws ][ nl ]*/);
                        if ($iteration_statement_group_168_104(l)) {
                            /*assert*/
                            /*
                               87 iteration_statement=>τfor ( • iteration_statement_group_168_104 ; expression ; expression ) statement 
                               92 iteration_statement=>τfor ( • iteration_statement_group_168_104 ; ; expression ) statement 
                               93 iteration_statement=>τfor ( • iteration_statement_group_168_104 ; expression ; ) statement 
                               99 iteration_statement=>τfor ( • iteration_statement_group_168_104 ; ; ) statement 
                            */
                            skip_fn_(l/*[ ws ][ nl ]*/);
                            if (assert_consume(l, l.utf == 59/*[;]*/)) {
                                /*consume*/
                                /*
                                   87 iteration_statement=>τfor ( iteration_statement_group_168_104 ; • expression ; expression ) statement 
                                   92 iteration_statement=>τfor ( iteration_statement_group_168_104 ; • ; expression ) statement 
                                   93 iteration_statement=>τfor ( iteration_statement_group_168_104 ; • expression ; ) statement 
                                   99 iteration_statement=>τfor ( iteration_statement_group_168_104 ; • ; ) statement 
                                */
                                if (l.utf == 59/*[;]*/) {
                                    /*peek*/
                                    /*
                                       92 iteration_statement=>τfor ( iteration_statement_group_168_104 ; • ; expression ) statement 
                                       99 iteration_statement=>τfor ( iteration_statement_group_168_104 ; • ; ) statement 
                                    */
                                    let pk: Lexer = l.copy();
                                    skip_fn_(pk.next()/*[ ws ][ nl ]*/);
                                    if (pk.utf == 41/*[)]*/) {
                                        /*peek*/
                                        /*
                                           99 iteration_statement=>τfor ( iteration_statement_group_168_104 ; • ; ) statement 
                                        */
                                        if (assert_consume(l, l.utf == 59/*[;]*/)) {
                                            skip_fn_(l/*[ ws ][ nl ]*/);
                                            if (assert_consume(l, l.utf == 41/*[)]*/)) {
                                                skip_fn_(l/*[ ws ][ nl ]*/);
                                                if ($statement(l)) {
                                                    add_reduce(7, 49);
                                                    prod = 36;
                                                }
                                            }
                                        }
                                    } else if ((((cpfaa7aa14_(pk)/*[--] [-]*/ || cp0ac89158_(pk)/*[++] [+]*/) || assert_table(pk, 0x0, 0x8196, 0x88000000, 0x48000001)/*tbl:[ ! ] [ ~ ] [ ` ] [ / ] [ { ] [ [ ] [ ' ] [ " ] [ _ ] [ $ ] [ ( ]*/) || pk.isNum()/*[num]*/) || pk.isID()/*[id]*/) {
                                        /*peek*/
                                        /*
                                           92 iteration_statement=>τfor ( iteration_statement_group_168_104 ; • ; expression ) statement 
                                        */
                                        if (assert_consume(l, l.utf == 59/*[;]*/)) {
                                            skip_fn_(l/*[ ws ][ nl ]*/);
                                            if ($expression(l)) {
                                                skip_fn_(l/*[ ws ][ nl ]*/);
                                                if (assert_consume(l, l.utf == 41/*[)]*/)) {
                                                    skip_fn_(l/*[ ws ][ nl ]*/);
                                                    if ($statement(l)) {
                                                        add_reduce(8, 42);
                                                        prod = 36;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                } else {
                                    /*peek-production-closure*/
                                    /*
                                       87 iteration_statement=>τfor ( iteration_statement_group_168_104 ; • expression ; expression ) statement 
                                       93 iteration_statement=>τfor ( iteration_statement_group_168_104 ; • expression ; ) statement 
                                    */
                                    skip_fn_(l/*[ ws ][ nl ]*/);
                                    if ($expression(l)) {
                                        /*assert*/
                                        /*
                                           87 iteration_statement=>τfor ( iteration_statement_group_168_104 ; • expression ; expression ) statement 
                                           93 iteration_statement=>τfor ( iteration_statement_group_168_104 ; • expression ; ) statement 
                                        */
                                        skip_fn_(l/*[ ws ][ nl ]*/);
                                        if (assert_consume(l, l.utf == 59/*[;]*/)) {
                                            /*consume*/
                                            /*
                                               87 iteration_statement=>τfor ( iteration_statement_group_168_104 ; expression ; • expression ) statement 
                                               93 iteration_statement=>τfor ( iteration_statement_group_168_104 ; expression ; • ) statement 
                                            */
                                            skip_fn_(l/*[ ws ][ nl ]*/);
                                            if (assert_consume(l, l.utf == 41/*[)]*/)) {
                                                /*consume*/
                                                /*
                                                   93 iteration_statement=>τfor ( iteration_statement_group_168_104 ; expression ; ) • statement 
                                                */
                                                skip_fn_(l/*[ ws ][ nl ]*/);
                                                if ($statement(l)) {
                                                    add_reduce(8, 43);
                                                    prod = 36;
                                                }
                                            } else {
                                                /*assert-production-closure*/
                                                /*
                                                   87 iteration_statement=>τfor ( iteration_statement_group_168_104 ; expression ; • expression ) statement 
                                                */
                                                if ($expression(l)) {
                                                    skip_fn_(l/*[ ws ][ nl ]*/);
                                                    if (assert_consume(l, l.utf == 41/*[)]*/)) {
                                                        skip_fn_(l/*[ ws ][ nl ]*/);
                                                        if ($statement(l)) {
                                                            add_reduce(9, 37);
                                                            prod = 36;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    } else if ((assert_table(l, 0x0, 0x8094, 0x88000000, 0x8000001)/*tbl:[ ` ] [ / ] [ { ] [ [ ] [ ' ] [ " ] [ _ ] [ $ ]*/ || l.isNum()/*[num]*/) || l.isID()/*[id]*/) {
                        /*peek*/
                        /*
                           87 iteration_statement=>τfor ( • iteration_statement_group_168_104 ; expression ; expression ) statement 
                           89 iteration_statement=>τfor ( • iteration_statement_group_073_105 τin expression ) statement 
                           92 iteration_statement=>τfor ( • iteration_statement_group_168_104 ; ; expression ) statement 
                           93 iteration_statement=>τfor ( • iteration_statement_group_168_104 ; expression ; ) statement 
                           96 iteration_statement=>τfor ( • iteration_statement_group_073_105 τof expression ) statement 
                           99 iteration_statement=>τfor ( • iteration_statement_group_168_104 ; ; ) statement 
                        */
                        let mk: i32 = mark();
                        let anchor: Lexer = l.copy();
                        /*36*/
                        skip_fn_(l/*[ ws ][ nl ]*/);
                        if ($iteration_statement_group_168_104(l)) {
                            /*assert*/
                            /*
                               87 iteration_statement=>τfor ( • iteration_statement_group_168_104 ; expression ; expression ) statement 
                               92 iteration_statement=>τfor ( • iteration_statement_group_168_104 ; ; expression ) statement 
                               93 iteration_statement=>τfor ( • iteration_statement_group_168_104 ; expression ; ) statement 
                               99 iteration_statement=>τfor ( • iteration_statement_group_168_104 ; ; ) statement 
                            */
                            skip_fn_(l/*[ ws ][ nl ]*/);
                            if (assert_consume(l, l.utf == 59/*[;]*/)) {
                                /*consume*/
                                /*
                                   87 iteration_statement=>τfor ( iteration_statement_group_168_104 ; • expression ; expression ) statement 
                                   92 iteration_statement=>τfor ( iteration_statement_group_168_104 ; • ; expression ) statement 
                                   93 iteration_statement=>τfor ( iteration_statement_group_168_104 ; • expression ; ) statement 
                                   99 iteration_statement=>τfor ( iteration_statement_group_168_104 ; • ; ) statement 
                                */
                                if (l.utf == 59/*[;]*/) {
                                    /*peek*/
                                    /*
                                       92 iteration_statement=>τfor ( iteration_statement_group_168_104 ; • ; expression ) statement 
                                       99 iteration_statement=>τfor ( iteration_statement_group_168_104 ; • ; ) statement 
                                    */
                                    let pk: Lexer = l.copy();
                                    skip_fn_(pk.next()/*[ ws ][ nl ]*/);
                                    if (pk.utf == 41/*[)]*/) {
                                        /*peek*/
                                        /*
                                           99 iteration_statement=>τfor ( iteration_statement_group_168_104 ; • ; ) statement 
                                        */
                                        if (assert_consume(l, l.utf == 59/*[;]*/)) {
                                            skip_fn_(l/*[ ws ][ nl ]*/);
                                            if (assert_consume(l, l.utf == 41/*[)]*/)) {
                                                skip_fn_(l/*[ ws ][ nl ]*/);
                                                if ($statement(l)) {
                                                    add_reduce(7, 49);
                                                    prod = 36;
                                                }
                                            }
                                        }
                                    } else if ((((cpfaa7aa14_(pk)/*[--] [-]*/ || cp0ac89158_(pk)/*[++] [+]*/) || assert_table(pk, 0x0, 0x8196, 0x88000000, 0x48000001)/*tbl:[ ! ] [ ~ ] [ ` ] [ / ] [ { ] [ [ ] [ ' ] [ " ] [ _ ] [ $ ] [ ( ]*/) || pk.isNum()/*[num]*/) || pk.isID()/*[id]*/) {
                                        /*peek*/
                                        /*
                                           92 iteration_statement=>τfor ( iteration_statement_group_168_104 ; • ; expression ) statement 
                                        */
                                        if (assert_consume(l, l.utf == 59/*[;]*/)) {
                                            skip_fn_(l/*[ ws ][ nl ]*/);
                                            if ($expression(l)) {
                                                skip_fn_(l/*[ ws ][ nl ]*/);
                                                if (assert_consume(l, l.utf == 41/*[)]*/)) {
                                                    skip_fn_(l/*[ ws ][ nl ]*/);
                                                    if ($statement(l)) {
                                                        add_reduce(8, 42);
                                                        prod = 36;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                } else {
                                    /*peek-production-closure*/
                                    /*
                                       87 iteration_statement=>τfor ( iteration_statement_group_168_104 ; • expression ; expression ) statement 
                                       93 iteration_statement=>τfor ( iteration_statement_group_168_104 ; • expression ; ) statement 
                                    */
                                    skip_fn_(l/*[ ws ][ nl ]*/);
                                    if ($expression(l)) {
                                        /*assert*/
                                        /*
                                           87 iteration_statement=>τfor ( iteration_statement_group_168_104 ; • expression ; expression ) statement 
                                           93 iteration_statement=>τfor ( iteration_statement_group_168_104 ; • expression ; ) statement 
                                        */
                                        skip_fn_(l/*[ ws ][ nl ]*/);
                                        if (assert_consume(l, l.utf == 59/*[;]*/)) {
                                            /*consume*/
                                            /*
                                               87 iteration_statement=>τfor ( iteration_statement_group_168_104 ; expression ; • expression ) statement 
                                               93 iteration_statement=>τfor ( iteration_statement_group_168_104 ; expression ; • ) statement 
                                            */
                                            skip_fn_(l/*[ ws ][ nl ]*/);
                                            if (assert_consume(l, l.utf == 41/*[)]*/)) {
                                                /*consume*/
                                                /*
                                                   93 iteration_statement=>τfor ( iteration_statement_group_168_104 ; expression ; ) • statement 
                                                */
                                                skip_fn_(l/*[ ws ][ nl ]*/);
                                                if ($statement(l)) {
                                                    add_reduce(8, 43);
                                                    prod = 36;
                                                }
                                            } else {
                                                /*assert-production-closure*/
                                                /*
                                                   87 iteration_statement=>τfor ( iteration_statement_group_168_104 ; expression ; • expression ) statement 
                                                */
                                                if ($expression(l)) {
                                                    skip_fn_(l/*[ ws ][ nl ]*/);
                                                    if (assert_consume(l, l.utf == 41/*[)]*/)) {
                                                        skip_fn_(l/*[ ws ][ nl ]*/);
                                                        if ($statement(l)) {
                                                            add_reduce(9, 37);
                                                            prod = 36;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        if (reset(mk, anchor, l, prod == 36)) {
                            prod = -1;
                            if ($iteration_statement_group_073_105(l)) {
                                /*assert*/
                                /*
                                   89 iteration_statement=>τfor ( • iteration_statement_group_073_105 τin expression ) statement 
                                   96 iteration_statement=>τfor ( • iteration_statement_group_073_105 τof expression ) statement 
                                */
                                skip_fn_(l/*[ ws ][ nl ]*/);
                                if (assert_consume(l, cp3ed7c1f5_(l)/*[of]*/)) {
                                    /*consume*/
                                    /*
                                       96 iteration_statement=>τfor ( iteration_statement_group_073_105 τof • expression ) statement 
                                    */
                                    skip_fn_(l/*[ ws ][ nl ]*/);
                                    if ($expression(l)) {
                                        skip_fn_(l/*[ ws ][ nl ]*/);
                                        if (assert_consume(l, l.utf == 41/*[)]*/)) {
                                            skip_fn_(l/*[ ws ][ nl ]*/);
                                            if ($statement(l)) {
                                                add_reduce(7, 46);
                                                prod = 36;
                                            }
                                        }
                                    }
                                } else if (assert_consume(l, cp0725ae43_(l)/*[in]*/)) {
                                    /*consume*/
                                    /*
                                       89 iteration_statement=>τfor ( iteration_statement_group_073_105 τin • expression ) statement 
                                    */
                                    skip_fn_(l/*[ ws ][ nl ]*/);
                                    if ($expression(l)) {
                                        skip_fn_(l/*[ ws ][ nl ]*/);
                                        if (assert_consume(l, l.utf == 41/*[)]*/)) {
                                            skip_fn_(l/*[ ws ][ nl ]*/);
                                            if ($statement(l)) {
                                                add_reduce(7, 39);
                                                prod = 36;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    } else if (assert_consume(l, cp62236cc7_(l)/*[while]*/)) {
        /*consume*/
        /*
           86 iteration_statement=>τwhile • ( expression ) statement 
        */
        skip_fn_(l/*[ ws ][ nl ]*/);
        if (assert_consume(l, l.utf == 40/*[(]*/)) {
            skip_fn_(l/*[ ws ][ nl ]*/);
            if ($expression(l)) {
                skip_fn_(l/*[ ws ][ nl ]*/);
                if (assert_consume(l, l.utf == 41/*[)]*/)) {
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if ($statement(l)) {
                        add_reduce(5, 36);
                        prod = 36;
                    }
                }
            }
        }
    } else if (assert_consume(l, cp7b8b1d3a_(l)/*[do]*/)) {
        /*consume*/
        /*
           85 iteration_statement=>τdo • statement τwhile ( expression ) asi 
        */
        skip_fn_(l/*[ ws ][ nl ]*/);
        if ($statement(l)) {
            skip_fn_(l/*[ ws ][ nl ]*/);
            if (assert_consume(l, cp62236cc7_(l)/*[while]*/)) {
                skip_fn_(l/*[ ws ][ nl ]*/);
                if (assert_consume(l, l.utf == 40/*[(]*/)) {
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if ($expression(l)) {
                        skip_fn_(l/*[ ws ][ nl ]*/);
                        if (assert_consume(l, l.utf == 41/*[)]*/)) {
                            skip_fn_000(l/*[ ws ]*/);
                            if (assert_consume(l, __asi__(l))) {
                                add_reduce(7, 35);
                                prod = 36;
                            }
                        }
                    }
                }
            }
        }
    }
    return assertSuccess(l, prod == 36);
}
function $for_declaration(l: Lexer): boolean {
    if ($let_or_const(l)) {
        skip_fn_(l/*[ ws ][ nl ]*/);
        if ($for_binding(l)) {
            add_reduce(2, 52);
            prod = 37;
        }
    }
    return assertSuccess(l, prod == 37);
}
function $for_binding(l: Lexer): boolean {
    if (assert_table(l, 0x0, 0x0, 0x8000000, 0x8000000)/*tbl:[ [ ] [ { ]*/) {
        /*assert-production-closure*/
        /*
           104 for_binding=>• binding_pattern 
        */
        if ($binding_pattern(l)) {
            prod = 38;
        }
    } else {
        /*assert-production-closure*/
        /*
           103 for_binding=>• binding_identifier 
        */
        if ($identifier(l)) {
            add_reduce(1, 126);
            prod = 38;
        }
    }
    return assertSuccess(l, prod == 38);
}
function $continue_statement(l: Lexer): boolean {
    if (assert_consume(l, cp96563f93_(l)/*[continue]*/)) {
        /*consume*/
        /*
           105 continue_statement=>τcontinue • label_identifier asi 
           106 continue_statement=>τcontinue • asi 
        */
        skip_fn_000(l/*[ ws ]*/);
        if (assert_consume(l, __asi__(l))) {
            /*consume*/
            /*
               106 continue_statement=>τcontinue asi • 
            */
            add_reduce(2, 54);
            prod = 39;
        } else {
            /*assert-production-closure*/
            /*
               105 continue_statement=>τcontinue • label_identifier asi 
            */
            if ($identifier(l)) {
                add_reduce(1, 252);
                skip_fn_000(l/*[ ws ]*/);
                if (assert_consume(l, __asi__(l))) {
                    add_reduce(3, 53);
                    prod = 39;
                }
            }
        }
    }
    return assertSuccess(l, prod == 39);
}
function $break_statement(l: Lexer): boolean {
    if (assert_consume(l, cpa88fb47a_(l)/*[break]*/)) {
        /*consume*/
        /*
           107 break_statement=>τbreak • label_identifier asi 
           108 break_statement=>τbreak • asi 
        */
        skip_fn_000(l/*[ ws ]*/);
        if (assert_consume(l, __asi__(l))) {
            /*consume*/
            /*
               108 break_statement=>τbreak asi • 
            */
            add_reduce(2, 56);
            prod = 40;
        } else {
            /*assert-production-closure*/
            /*
               107 break_statement=>τbreak • label_identifier asi 
            */
            if ($identifier(l)) {
                add_reduce(1, 252);
                skip_fn_000(l/*[ ws ]*/);
                if (assert_consume(l, __asi__(l))) {
                    add_reduce(3, 55);
                    prod = 40;
                }
            }
        }
    }
    return assertSuccess(l, prod == 40);
}
function $return_statement(l: Lexer): boolean {
    if (assert_consume(l, cp54e87682_(l)/*[return]*/)) {
        /*consume*/
        /*
           109 return_statement=>τreturn • expression asi 
           110 return_statement=>τreturn • asi 
        */
        skip_fn_000(l/*[ ws ]*/);
        if (assert_consume(l, __asi__(l))) {
            /*consume*/
            /*
               110 return_statement=>τreturn asi • 
            */
            add_reduce(2, 58);
            prod = 41;
        } else {
            /*assert-production-closure*/
            /*
               109 return_statement=>τreturn • expression asi 
            */
            if ($expression(l)) {
                skip_fn_000(l/*[ ws ]*/);
                if (assert_consume(l, __asi__(l))) {
                    add_reduce(3, 57);
                    prod = 41;
                }
            }
        }
    }
    return assertSuccess(l, prod == 41);
}
function $throw_statement(l: Lexer): boolean {
    if (assert_consume(l, cpcbd55029_(l)/*[throw]*/)) {
        /*consume*/
        /*
           111 throw_statement=>τthrow • expression asi 
        */
        skip_fn_(l/*[ ws ][ nl ]*/);
        if ($expression(l)) {
            skip_fn_000(l/*[ ws ]*/);
            if (assert_consume(l, __asi__(l))) {
                add_reduce(3, 59);
                prod = 42;
            }
        }
    }
    return assertSuccess(l, prod == 42);
}
function $with_statement(l: Lexer): boolean {
    if (assert_consume(l, cpd766eebc_(l)/*[with]*/)) {
        /*consume*/
        /*
           112 with_statement=>τwith • ( expression ) statement 
        */
        skip_fn_(l/*[ ws ][ nl ]*/);
        if (assert_consume(l, l.utf == 40/*[(]*/)) {
            skip_fn_(l/*[ ws ][ nl ]*/);
            if ($expression(l)) {
                skip_fn_(l/*[ ws ][ nl ]*/);
                if (assert_consume(l, l.utf == 41/*[)]*/)) {
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if ($statement(l)) {
                        add_reduce(5, 60);
                        prod = 43;
                    }
                }
            }
        }
    }
    return assertSuccess(l, prod == 43);
}
function $switch_statement(l: Lexer): boolean {
    if (assert_consume(l, cp56c09138_(l)/*[switch]*/)) {
        /*consume*/
        /*
           113 switch_statement=>τswitch • ( expression ) case_block 
        */
        skip_fn_(l/*[ ws ][ nl ]*/);
        if (assert_consume(l, l.utf == 40/*[(]*/)) {
            skip_fn_(l/*[ ws ][ nl ]*/);
            if ($expression(l)) {
                skip_fn_(l/*[ ws ][ nl ]*/);
                if (assert_consume(l, l.utf == 41/*[)]*/)) {
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if ($case_block(l)) {
                        add_reduce(5, 61);
                        prod = 44;
                    }
                }
            }
        }
    }
    return assertSuccess(l, prod == 44);
}
function $case_block(l: Lexer): boolean {
    if (assert_consume(l, l.utf == 123/*[{]*/)) {
        /*consume*/
        /*
           114 case_block=>{ • case_clauses default_clause case_clauses } 
           115 case_block=>{ • default_clause case_clauses } 
           116 case_block=>{ • case_clauses case_clauses } 
           117 case_block=>{ • case_clauses default_clause } 
           118 case_block=>{ • case_clauses } 
           119 case_block=>{ • default_clause } 
           120 case_block=>{ • } 
        */
        skip_fn_(l/*[ ws ][ nl ]*/);
        if (assert_consume(l, l.utf == 125/*[}]*/)) {
            /*consume*/
            /*
               120 case_block=>{ } • 
            */
            add_reduce(2, 68);
            prod = 45;
        } else if (cp1f6ac4c1_(l)/*[default]*/) {
            /*peek-production-closure*/
            /*
               115 case_block=>{ • default_clause case_clauses } 
               119 case_block=>{ • default_clause } 
            */
            skip_fn_(l/*[ ws ][ nl ]*/);
            if ($default_clause(l)) {
                /*assert*/
                /*
                   115 case_block=>{ • default_clause case_clauses } 
                   119 case_block=>{ • default_clause } 
                */
                skip_fn_(l/*[ ws ][ nl ]*/);
                if (assert_consume(l, l.utf == 125/*[}]*/)) {
                    /*consume*/
                    /*
                       119 case_block=>{ default_clause } • 
                    */
                    add_reduce(3, 67);
                    prod = 45;
                } else {
                    /*assert-production-closure*/
                    /*
                       115 case_block=>{ default_clause • case_clauses } 
                    */
                    if ($case_clauses(l)) {
                        skip_fn_(l/*[ ws ][ nl ]*/);
                        if (assert_consume(l, l.utf == 125/*[}]*/)) {
                            add_reduce(4, 63);
                            prod = 45;
                        }
                    }
                }
            }
        } else {
            /*peek-production-closure*/
            /*
               114 case_block=>{ • case_clauses default_clause case_clauses } 
               116 case_block=>{ • case_clauses case_clauses } 
               117 case_block=>{ • case_clauses default_clause } 
               118 case_block=>{ • case_clauses } 
            */
            skip_fn_(l/*[ ws ][ nl ]*/);
            if ($case_clauses(l)) {
                /*assert*/
                /*
                   114 case_block=>{ • case_clauses default_clause case_clauses } 
                   116 case_block=>{ • case_clauses case_clauses } 
                   117 case_block=>{ • case_clauses default_clause } 
                   118 case_block=>{ • case_clauses } 
                */
                skip_fn_(l/*[ ws ][ nl ]*/);
                if (assert_consume(l, l.utf == 125/*[}]*/)) {
                    /*consume*/
                    /*
                       118 case_block=>{ case_clauses } • 
                    */
                    add_reduce(3, 66);
                    prod = 45;
                } else if (cpab3c99ed_(l)/*[case]*/) {
                    /*assert-production-closure*/
                    /*
                       116 case_block=>{ case_clauses • case_clauses } 
                    */
                    if ($case_clauses(l)) {
                        skip_fn_(l/*[ ws ][ nl ]*/);
                        if (assert_consume(l, l.utf == 125/*[}]*/)) {
                            add_reduce(4, 64);
                            prod = 45;
                        }
                    }
                } else {
                    /*peek-production-closure*/
                    /*
                       114 case_block=>{ case_clauses • default_clause case_clauses } 
                       117 case_block=>{ case_clauses • default_clause } 
                    */
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if ($default_clause(l)) {
                        /*assert*/
                        /*
                           114 case_block=>{ case_clauses • default_clause case_clauses } 
                           117 case_block=>{ case_clauses • default_clause } 
                        */
                        skip_fn_(l/*[ ws ][ nl ]*/);
                        if (assert_consume(l, l.utf == 125/*[}]*/)) {
                            /*consume*/
                            /*
                               117 case_block=>{ case_clauses default_clause } • 
                            */
                            add_reduce(4, 65);
                            prod = 45;
                        } else {
                            /*assert-production-closure*/
                            /*
                               114 case_block=>{ case_clauses default_clause • case_clauses } 
                            */
                            if ($case_clauses(l)) {
                                skip_fn_(l/*[ ws ][ nl ]*/);
                                if (assert_consume(l, l.utf == 125/*[}]*/)) {
                                    add_reduce(5, 62);
                                    prod = 45;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return assertSuccess(l, prod == 45);
}
function $case_clauses(l: Lexer): boolean {
    if ($case_clause(l)) {
        add_reduce(1, 4);
        prod = 47;
    }
    while (prod == 47) {
        let ACCEPT: boolean = false;
        skip_fn_(l/*[ ws ][ nl ]*/);
        if (cpab3c99ed_(l)/*[case]*/) {
            /*assert-production-closure*/
            /*
               123 case_clauses=>case_clauses • case_clause 
            */
            if ($case_clause(l)) {
                add_reduce(2, 3);
                prod = 47;
                ACCEPT = true;
            }
        }
        if (!ACCEPT) {
            break;
        }
    }
    return assertSuccess(l, prod == 47);
}
function $case_clause(l: Lexer): boolean {
    if (assert_consume(l, cpab3c99ed_(l)/*[case]*/)) {
        /*consume*/
        /*
           125 case_clause=>τcase • expression : statement_list 
           126 case_clause=>τcase • expression : 
        */
        skip_fn_(l/*[ ws ][ nl ]*/);
        if ($expression(l)) {
            /*assert*/
            /*
               125 case_clause=>τcase • expression : statement_list 
               126 case_clause=>τcase • expression : 
            */
            skip_fn_(l/*[ ws ][ nl ]*/);
            if (assert_consume(l, l.utf == 58/*[:]*/)) {
                /*consume*/
                /*
                   125 case_clause=>τcase expression : • statement_list 
                   126 case_clause=>τcase expression : • 
                */
                skip_fn_(l/*[ ws ][ nl ]*/);
                if ((((cp0ac89158_(l)/*[+] [++]*/ || cpfaa7aa14_(l)/*[-] [--]*/) || assert_table(l, 0x0, 0x8008196, 0x88000000, 0x48000001)/*tbl:[ { ] [ ( ] [ $ ] [ _ ] [ " ] [ ' ] [ [ ] [ / ] [ ` ] [ ~ ] [ ! ] [ ; ]*/) || l.isID()/*[id]*/) || l.isNum()/*[num]*/) {
                    /*assert-production-closure*/
                    /*
                       125 case_clause=>τcase expression : • statement_list 
                    */
                    if ($statement_list(l)) {
                        add_reduce(4, 69);
                        prod = 48;
                    }
                } else {
                    /*assert-end*/
                    /*
                       126 case_clause=>τcase expression : • 
                    */
                    add_reduce(3, 70);
                    prod = 48;
                }
            }
        }
    }
    return assertSuccess(l, prod == 48);
}
function $default_clause(l: Lexer): boolean {
    if (assert_consume(l, cp1f6ac4c1_(l)/*[default]*/)) {
        /*consume*/
        /*
           127 default_clause=>τdefault • : statement_list 
           128 default_clause=>τdefault • : 
        */
        skip_fn_(l/*[ ws ][ nl ]*/);
        if (assert_consume(l, l.utf == 58/*[:]*/)) {
            /*consume*/
            /*
               127 default_clause=>τdefault : • statement_list 
               128 default_clause=>τdefault : • 
            */
            skip_fn_(l/*[ ws ][ nl ]*/);
            if ((((cp0ac89158_(l)/*[+] [++]*/ || cpfaa7aa14_(l)/*[-] [--]*/) || assert_table(l, 0x0, 0x8008196, 0x88000000, 0x48000001)/*tbl:[ { ] [ ( ] [ $ ] [ _ ] [ " ] [ ' ] [ [ ] [ / ] [ ` ] [ ~ ] [ ! ] [ ; ]*/) || l.isID()/*[id]*/) || l.isNum()/*[num]*/) {
                /*assert-production-closure*/
                /*
                   127 default_clause=>τdefault : • statement_list 
                */
                if ($statement_list(l)) {
                    add_reduce(3, 71);
                    prod = 49;
                }
            } else {
                /*assert-end*/
                /*
                   128 default_clause=>τdefault : • 
                */
                add_reduce(2, 72);
                prod = 49;
            }
        }
    }
    return assertSuccess(l, prod == 49);
}
function $labeled_item(l: Lexer): boolean {
    if (cp87f20bb1_(l)/*[function]*/) {
        /*assert-production-closure*/
        /*
           131 labeled_item=>• function_declaration 
        */
        if ($function_declaration(l)) {
            prod = 51;
        }
    } else if (cpdcbfef5f_(l)/*[async]*/) {
        /*peek*/
        /*
           130 labeled_item=>• statement 
           131 labeled_item=>• function_declaration 
        */
        let pk: Lexer = l.copy();
        skip_fn_(pk.next()/*[ ws ][ nl ]*/);
        if (cp87f20bb1_(pk)/*[function]*/) {
            /*peek-production-closure*/
            /*
               131 labeled_item=>• function_declaration 
            */
            if ($function_declaration(l)) {
                prod = 51;
            }
        } else {
            /*peek-production-closure*/
            /*
               130 labeled_item=>• statement 
            */
            if ($statement(l)) {
                prod = 51;
            }
        }
    } else {
        /*assert-production-closure*/
        /*
           130 labeled_item=>• statement 
        */
        if ($statement(l)) {
            prod = 51;
        }
    }
    return assertSuccess(l, prod == 51);
}
function $try_statement(l: Lexer): boolean {
    if (assert_consume(l, cp749f34fc_(l)/*[try]*/)) {
        /*consume*/
        /*
           132 try_statement=>τtry • block catch 
           133 try_statement=>τtry • block finally 
           134 try_statement=>τtry • block catch finally 
        */
        skip_fn_(l/*[ ws ][ nl ]*/);
        if ($block(l)) {
            /*assert*/
            /*
               132 try_statement=>τtry • block catch 
               133 try_statement=>τtry • block finally 
               134 try_statement=>τtry • block catch finally 
            */
            skip_fn_(l/*[ ws ][ nl ]*/);
            if (cp8f376548_(l)/*[finally]*/) {
                /*assert-production-closure*/
                /*
                   133 try_statement=>τtry block • finally 
                */
                if ($finally(l)) {
                    add_reduce(3, 75);
                    prod = 52;
                }
            } else {
                /*peek-production-closure*/
                /*
                   132 try_statement=>τtry block • catch 
                   134 try_statement=>τtry block • catch finally 
                */
                skip_fn_(l/*[ ws ][ nl ]*/);
                if ($catch(l)) {
                    /*assert*/
                    /*
                       132 try_statement=>τtry block • catch 
                       134 try_statement=>τtry block • catch finally 
                    */
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if (cp8f376548_(l)/*[finally]*/) {
                        /*assert-production-closure*/
                        /*
                           134 try_statement=>τtry block catch • finally 
                        */
                        if ($finally(l)) {
                            add_reduce(4, 76);
                            prod = 52;
                        }
                    } else {
                        /*assert-end*/
                        /*
                           132 try_statement=>τtry block catch • 
                        */
                        add_reduce(3, 74);
                        prod = 52;
                    }
                }
            }
        }
    }
    return assertSuccess(l, prod == 52);
}
function $catch(l: Lexer): boolean {
    if (assert_consume(l, cpb6e46596_(l)/*[catch]*/)) {
        /*consume*/
        /*
           135 catch=>τcatch • ( catch_parameter ) block 
        */
        skip_fn_(l/*[ ws ][ nl ]*/);
        if (assert_consume(l, l.utf == 40/*[(]*/)) {
            skip_fn_(l/*[ ws ][ nl ]*/);
            if ($catch_parameter(l)) {
                skip_fn_(l/*[ ws ][ nl ]*/);
                if (assert_consume(l, l.utf == 41/*[)]*/)) {
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if ($block(l)) {
                        add_reduce(5, 77);
                        prod = 53;
                    }
                }
            }
        }
    }
    return assertSuccess(l, prod == 53);
}
function $finally(l: Lexer): boolean {
    if (assert_consume(l, cp8f376548_(l)/*[finally]*/)) {
        /*consume*/
        /*
           136 finally=>τfinally • block 
        */
        skip_fn_(l/*[ ws ][ nl ]*/);
        if ($block(l)) {
            add_reduce(2, 78);
            prod = 54;
        }
    }
    return assertSuccess(l, prod == 54);
}
function $catch_parameter(l: Lexer): boolean {
    if (assert_table(l, 0x0, 0x0, 0x8000000, 0x8000000)/*tbl:[ [ ] [ { ]*/) {
        /*assert-production-closure*/
        /*
           138 catch_parameter=>• binding_pattern 
        */
        if ($binding_pattern(l)) {
            prod = 55;
        }
    } else {
        /*assert-production-closure*/
        /*
           137 catch_parameter=>• binding_identifier 
        */
        if ($identifier(l)) {
            add_reduce(1, 126);
            prod = 55;
        }
    }
    return assertSuccess(l, prod == 55);
}
function $debugger_statement(l: Lexer): boolean {
    if (assert_consume(l, cp5ee5ce67_(l)/*[debugger]*/)) {
        /*consume*/
        /*
           139 debugger_statement=>τdebugger • asi 
        */
        skip_fn_000(l/*[ ws ]*/);
        if (assert_consume(l, __asi__(l))) {
            add_reduce(2, 79);
            prod = 56;
        }
    }
    return assertSuccess(l, prod == 56);
}
function $variable_statement(l: Lexer): boolean {
    if (assert_consume(l, cp27956077_(l)/*[var]*/)) {
        /*consume*/
        /*
           140 variable_statement=>τvar • variable_declaration_list asi 
        */
        skip_fn_(l/*[ ws ][ nl ]*/);
        if ($variable_declaration_list(l)) {
            skip_fn_000(l/*[ ws ]*/);
            if (assert_consume(l, __asi__(l))) {
                add_reduce(3, 80);
                prod = 57;
            }
        }
    }
    return assertSuccess(l, prod == 57);
}
function $variable_declaration_list(l: Lexer): boolean {
    if ($variable_declaration(l)) {
        add_reduce(1, 4);
        prod = 59;
    }
    while (prod == 59) {
        let ACCEPT: boolean = false;
        skip_fn_000(l/*[ ws ]*/);
        if (l.isNL()/*[nl]*/) {
            break;
        }
        if (assert_consume(l, l.utf == 44/*[,]*/)) {
            /*consume*/
            /*
               143 variable_declaration_list=>variable_declaration_list , • variable_declaration 
            */
            skip_fn_(l/*[ ws ][ nl ]*/);
            if ($variable_declaration(l)) {
                add_reduce(3, 11);
                prod = 59;
                ACCEPT = true;
            }
        }
        if (!ACCEPT) {
            break;
        }
    }
    return assertSuccess(l, prod == 59);
}
function $variable_declaration(l: Lexer): boolean {
    if (assert_table(l, 0x0, 0x0, 0x8000000, 0x8000000)/*tbl:[ [ ] [ { ]*/) {
        /*assert-production-closure*/
        /*
           147 variable_declaration=>• binding_pattern initializer 
        */
        if ($binding_pattern(l)) {
            skip_fn_(l/*[ ws ][ nl ]*/);
            if ($initializer(l)) {
                add_reduce(2, 81);
                prod = 60;
            }
        }
    } else {
        /*peek-production-closure*/
        /*
           145 variable_declaration=>• binding_identifier initializer 
           146 variable_declaration=>• binding_identifier 
        */
        skip_fn_(l/*[ ws ][ nl ]*/);
        if ($binding_identifier(l)) {
            /*assert*/
            /*
               145 variable_declaration=>• binding_identifier initializer 
               146 variable_declaration=>• binding_identifier 
            */
            skip_fn_000(l/*[ ws ]*/);
            if (l.utf == 61/*[=]*/) {
                /*assert-production-closure*/
                /*
                   145 variable_declaration=>binding_identifier • initializer 
                */
                if ($initializer(l)) {
                    add_reduce(2, 81);
                    prod = 60;
                }
            } else {
                /*assert-end*/
                /*
                   146 variable_declaration=>binding_identifier • 
                */
                prod = 60;
            }
        }
    }
    return assertSuccess(l, prod == 60);
}
function $lexical_declaration(l: Lexer): boolean {
    if ($let_or_const(l)) {
        skip_fn_(l/*[ ws ][ nl ]*/);
        if ($binding_list(l)) {
            skip_fn_000(l/*[ ws ]*/);
            if (assert_consume(l, __asi__(l))) {
                add_reduce(3, 82);
                prod = 61;
            }
        }
    }
    return assertSuccess(l, prod == 61);
}
function $let_or_const(l: Lexer): boolean {
    if (assert_consume(l, cp92ea8d2d_(l)/*[const]*/)) {
        /*consume*/
        /*
           150 let_or_const=>τconst • 
        */
        add_reduce(1, 84);
        prod = 62;
    } else if (assert_consume(l, cpa0815727_(l)/*[let]*/)) {
        /*consume*/
        /*
           149 let_or_const=>τlet • 
        */
        add_reduce(1, 83);
        prod = 62;
    }
    return assertSuccess(l, prod == 62);
}
function $binding_list(l: Lexer): boolean {
    if ($lexical_binding(l)) {
        add_reduce(1, 4);
        prod = 64;
    }
    while (prod == 64) {
        let ACCEPT: boolean = false;
        skip_fn_000(l/*[ ws ]*/);
        if (l.isNL()/*[nl]*/) {
            break;
        }
        if (assert_consume(l, l.utf == 44/*[,]*/)) {
            /*consume*/
            /*
               153 binding_list=>binding_list , • lexical_binding 
            */
            skip_fn_(l/*[ ws ][ nl ]*/);
            if ($lexical_binding(l)) {
                add_reduce(3, 11);
                prod = 64;
                ACCEPT = true;
            }
        }
        if (!ACCEPT) {
            break;
        }
    }
    return assertSuccess(l, prod == 64);
}
function $lexical_binding(l: Lexer): boolean {
    if (assert_table(l, 0x0, 0x0, 0x8000000, 0x8000000)/*tbl:[ [ ] [ { ]*/) {
        /*assert-production-closure*/
        /*
           157 lexical_binding=>• binding_pattern initializer 
        */
        if ($binding_pattern(l)) {
            skip_fn_(l/*[ ws ][ nl ]*/);
            if ($initializer(l)) {
                add_reduce(2, 81);
                prod = 65;
            }
        }
    } else {
        /*peek-production-closure*/
        /*
           155 lexical_binding=>• binding_identifier 
           156 lexical_binding=>• binding_identifier initializer 
        */
        skip_fn_(l/*[ ws ][ nl ]*/);
        if ($binding_identifier(l)) {
            /*assert*/
            /*
               155 lexical_binding=>• binding_identifier 
               156 lexical_binding=>• binding_identifier initializer 
            */
            skip_fn_000(l/*[ ws ]*/);
            if (l.utf == 61/*[=]*/) {
                /*assert-production-closure*/
                /*
                   156 lexical_binding=>binding_identifier • initializer 
                */
                if ($initializer(l)) {
                    add_reduce(2, 81);
                    prod = 65;
                }
            } else {
                /*assert-end*/
                /*
                   155 lexical_binding=>binding_identifier • 
                */
                prod = 65;
            }
        }
    }
    return assertSuccess(l, prod == 65);
}
function $function_declaration_group_0115_109(l: Lexer): boolean {
    if (assert_consume(l, l.utf == 42/*[asterisk]*/)) {
        /*consume*/
        /*
           158 function_declaration_group_0115_109=>* • 
        */
        prod = 66;
    }
    return assertSuccess(l, prod == 66);
}
function $function_declaration(l: Lexer): boolean {
    if (cp87f20bb1_(l)/*[function]*/) {
        /*peek*/
        /*
           160 function_declaration=>• τfunction function_declaration_group_0115_109 binding_identifier ( formal_parameters ) { function_body } 
           164 function_declaration=>• τfunction binding_identifier ( formal_parameters ) { function_body } 
           165 function_declaration=>• τfunction function_declaration_group_0115_109 ( formal_parameters ) { function_body } 
           166 function_declaration=>• τfunction function_declaration_group_0115_109 binding_identifier ( ) { function_body } 
           170 function_declaration=>• τfunction ( formal_parameters ) { function_body } 
           171 function_declaration=>• τfunction binding_identifier ( ) { function_body } 
           172 function_declaration=>• τfunction function_declaration_group_0115_109 ( ) { function_body } 
           174 function_declaration=>• τfunction ( ) { function_body } 
        */
        let pk: Lexer = l.copy();
        skip_fn_(pk.next()/*[ ws ][ nl ]*/);
        if (pk.utf == 40/*[(]*/) {
            /*peek*/
            /*
               170 function_declaration=>• τfunction ( formal_parameters ) { function_body } 
               174 function_declaration=>• τfunction ( ) { function_body } 
            */
            skip_fn_(l/*[ ws ][ nl ]*/);
            if (assert_consume(l, cp87f20bb1_(l)/*[function]*/)) {
                /*consume*/
                /*
                   170 function_declaration=>τfunction • ( formal_parameters ) { function_body } 
                   174 function_declaration=>τfunction • ( ) { function_body } 
                */
                skip_fn_(l/*[ ws ][ nl ]*/);
                if (assert_consume(l, l.utf == 40/*[(]*/)) {
                    /*consume*/
                    /*
                       170 function_declaration=>τfunction ( • formal_parameters ) { function_body } 
                       174 function_declaration=>τfunction ( • ) { function_body } 
                    */
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if (assert_consume(l, l.utf == 41/*[)]*/)) {
                        /*consume*/
                        /*
                           174 function_declaration=>τfunction ( ) • { function_body } 
                        */
                        skip_fn_(l/*[ ws ][ nl ]*/);
                        if (assert_consume(l, l.utf == 123/*[{]*/)) {
                            skip_fn_(l/*[ ws ][ nl ]*/);
                            if ($function_statement_list(l)) {
                                add_reduce(1, 120);
                                skip_fn_(l/*[ ws ][ nl ]*/);
                                if (assert_consume(l, l.utf == 125/*[}]*/)) {
                                    add_reduce(6, 100);
                                    prod = 67;
                                }
                            }
                        }
                    } else {
                        /*assert-production-closure*/
                        /*
                           170 function_declaration=>τfunction ( • formal_parameters ) { function_body } 
                        */
                        if ($formal_parameters(l)) {
                            skip_fn_(l/*[ ws ][ nl ]*/);
                            if (assert_consume(l, l.utf == 41/*[)]*/)) {
                                skip_fn_(l/*[ ws ][ nl ]*/);
                                if (assert_consume(l, l.utf == 123/*[{]*/)) {
                                    skip_fn_(l/*[ ws ][ nl ]*/);
                                    if ($function_statement_list(l)) {
                                        add_reduce(1, 120);
                                        skip_fn_(l/*[ ws ][ nl ]*/);
                                        if (assert_consume(l, l.utf == 125/*[}]*/)) {
                                            add_reduce(7, 96);
                                            prod = 67;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        } else if (pk.utf == 42/*[asterisk]*/) {
            /*peek*/
            /*
               160 function_declaration=>• τfunction function_declaration_group_0115_109 binding_identifier ( formal_parameters ) { function_body } 
               165 function_declaration=>• τfunction function_declaration_group_0115_109 ( formal_parameters ) { function_body } 
               166 function_declaration=>• τfunction function_declaration_group_0115_109 binding_identifier ( ) { function_body } 
               172 function_declaration=>• τfunction function_declaration_group_0115_109 ( ) { function_body } 
            */
            skip_fn_(l/*[ ws ][ nl ]*/);
            if (assert_consume(l, cp87f20bb1_(l)/*[function]*/)) {
                /*consume*/
                /*
                   160 function_declaration=>τfunction • function_declaration_group_0115_109 binding_identifier ( formal_parameters ) { function_body } 
                   165 function_declaration=>τfunction • function_declaration_group_0115_109 ( formal_parameters ) { function_body } 
                   166 function_declaration=>τfunction • function_declaration_group_0115_109 binding_identifier ( ) { function_body } 
                   172 function_declaration=>τfunction • function_declaration_group_0115_109 ( ) { function_body } 
                */
                skip_fn_(l/*[ ws ][ nl ]*/);
                if ($function_declaration_group_0115_109(l)) {
                    /*assert*/
                    /*
                       160 function_declaration=>τfunction • function_declaration_group_0115_109 binding_identifier ( formal_parameters ) { function_body } 
                       165 function_declaration=>τfunction • function_declaration_group_0115_109 ( formal_parameters ) { function_body } 
                       166 function_declaration=>τfunction • function_declaration_group_0115_109 binding_identifier ( ) { function_body } 
                       172 function_declaration=>τfunction • function_declaration_group_0115_109 ( ) { function_body } 
                    */
                    if (l.utf == 40/*[(]*/) {
                        /*peek*/
                        /*
                           165 function_declaration=>τfunction function_declaration_group_0115_109 • ( formal_parameters ) { function_body } 
                           172 function_declaration=>τfunction function_declaration_group_0115_109 • ( ) { function_body } 
                        */
                        let pk: Lexer = l.copy();
                        skip_fn_(pk.next()/*[ ws ][ nl ]*/);
                        if (pk.utf == 41/*[)]*/) {
                            /*peek*/
                            /*
                               172 function_declaration=>τfunction function_declaration_group_0115_109 • ( ) { function_body } 
                            */
                            if (assert_consume(l, l.utf == 40/*[(]*/)) {
                                skip_fn_(l/*[ ws ][ nl ]*/);
                                if (assert_consume(l, l.utf == 41/*[)]*/)) {
                                    skip_fn_(l/*[ ws ][ nl ]*/);
                                    if (assert_consume(l, l.utf == 123/*[{]*/)) {
                                        skip_fn_(l/*[ ws ][ nl ]*/);
                                        if ($function_statement_list(l)) {
                                            add_reduce(1, 120);
                                            skip_fn_(l/*[ ws ][ nl ]*/);
                                            if (assert_consume(l, l.utf == 125/*[}]*/)) {
                                                add_reduce(7, 98);
                                                prod = 67;
                                            }
                                        }
                                    }
                                }
                            }
                        } else if ((cp7fa4386a_(pk)/*[...]*/ || assert_table(pk, 0x0, 0x10, 0x88000000, 0x8000000)/*tbl:[ _ ] [ $ ] [ [ ] [ { ]*/) || pk.isID()/*[id]*/) {
                            /*peek*/
                            /*
                               165 function_declaration=>τfunction function_declaration_group_0115_109 • ( formal_parameters ) { function_body } 
                            */
                            if (assert_consume(l, l.utf == 40/*[(]*/)) {
                                skip_fn_(l/*[ ws ][ nl ]*/);
                                if ($formal_parameters(l)) {
                                    skip_fn_(l/*[ ws ][ nl ]*/);
                                    if (assert_consume(l, l.utf == 41/*[)]*/)) {
                                        skip_fn_(l/*[ ws ][ nl ]*/);
                                        if (assert_consume(l, l.utf == 123/*[{]*/)) {
                                            skip_fn_(l/*[ ws ][ nl ]*/);
                                            if ($function_statement_list(l)) {
                                                add_reduce(1, 120);
                                                skip_fn_(l/*[ ws ][ nl ]*/);
                                                if (assert_consume(l, l.utf == 125/*[}]*/)) {
                                                    add_reduce(8, 91);
                                                    prod = 67;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    } else {
                        /*peek-production-closure*/
                        /*
                           160 function_declaration=>τfunction function_declaration_group_0115_109 • binding_identifier ( formal_parameters ) { function_body } 
                           166 function_declaration=>τfunction function_declaration_group_0115_109 • binding_identifier ( ) { function_body } 
                        */
                        skip_fn_(l/*[ ws ][ nl ]*/);
                        if ($binding_identifier(l)) {
                            /*assert*/
                            /*
                               160 function_declaration=>τfunction function_declaration_group_0115_109 • binding_identifier ( formal_parameters ) { function_body } 
                               166 function_declaration=>τfunction function_declaration_group_0115_109 • binding_identifier ( ) { function_body } 
                            */
                            skip_fn_(l/*[ ws ][ nl ]*/);
                            if (assert_consume(l, l.utf == 40/*[(]*/)) {
                                /*consume*/
                                /*
                                   160 function_declaration=>τfunction function_declaration_group_0115_109 binding_identifier ( • formal_parameters ) { function_body } 
                                   166 function_declaration=>τfunction function_declaration_group_0115_109 binding_identifier ( • ) { function_body } 
                                */
                                skip_fn_(l/*[ ws ][ nl ]*/);
                                if (assert_consume(l, l.utf == 41/*[)]*/)) {
                                    /*consume*/
                                    /*
                                       166 function_declaration=>τfunction function_declaration_group_0115_109 binding_identifier ( ) • { function_body } 
                                    */
                                    skip_fn_(l/*[ ws ][ nl ]*/);
                                    if (assert_consume(l, l.utf == 123/*[{]*/)) {
                                        skip_fn_(l/*[ ws ][ nl ]*/);
                                        if ($function_statement_list(l)) {
                                            add_reduce(1, 120);
                                            skip_fn_(l/*[ ws ][ nl ]*/);
                                            if (assert_consume(l, l.utf == 125/*[}]*/)) {
                                                add_reduce(8, 92);
                                                prod = 67;
                                            }
                                        }
                                    }
                                } else {
                                    /*assert-production-closure*/
                                    /*
                                       160 function_declaration=>τfunction function_declaration_group_0115_109 binding_identifier ( • formal_parameters ) { function_body } 
                                    */
                                    if ($formal_parameters(l)) {
                                        skip_fn_(l/*[ ws ][ nl ]*/);
                                        if (assert_consume(l, l.utf == 41/*[)]*/)) {
                                            skip_fn_(l/*[ ws ][ nl ]*/);
                                            if (assert_consume(l, l.utf == 123/*[{]*/)) {
                                                skip_fn_(l/*[ ws ][ nl ]*/);
                                                if ($function_statement_list(l)) {
                                                    add_reduce(1, 120);
                                                    skip_fn_(l/*[ ws ][ nl ]*/);
                                                    if (assert_consume(l, l.utf == 125/*[}]*/)) {
                                                        add_reduce(9, 86);
                                                        prod = 67;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        } else if (assert_table(pk, 0x0, 0x10, 0x80000000, 0x0)/*tbl:[ _ ] [ $ ]*/ || pk.isID()/*[id]*/) {
            /*peek*/
            /*
               164 function_declaration=>• τfunction binding_identifier ( formal_parameters ) { function_body } 
               171 function_declaration=>• τfunction binding_identifier ( ) { function_body } 
            */
            skip_fn_(l/*[ ws ][ nl ]*/);
            if (assert_consume(l, cp87f20bb1_(l)/*[function]*/)) {
                /*consume*/
                /*
                   164 function_declaration=>τfunction • binding_identifier ( formal_parameters ) { function_body } 
                   171 function_declaration=>τfunction • binding_identifier ( ) { function_body } 
                */
                skip_fn_(l/*[ ws ][ nl ]*/);
                if ($binding_identifier(l)) {
                    /*assert*/
                    /*
                       164 function_declaration=>τfunction • binding_identifier ( formal_parameters ) { function_body } 
                       171 function_declaration=>τfunction • binding_identifier ( ) { function_body } 
                    */
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if (assert_consume(l, l.utf == 40/*[(]*/)) {
                        /*consume*/
                        /*
                           164 function_declaration=>τfunction binding_identifier ( • formal_parameters ) { function_body } 
                           171 function_declaration=>τfunction binding_identifier ( • ) { function_body } 
                        */
                        skip_fn_(l/*[ ws ][ nl ]*/);
                        if (assert_consume(l, l.utf == 41/*[)]*/)) {
                            /*consume*/
                            /*
                               171 function_declaration=>τfunction binding_identifier ( ) • { function_body } 
                            */
                            skip_fn_(l/*[ ws ][ nl ]*/);
                            if (assert_consume(l, l.utf == 123/*[{]*/)) {
                                skip_fn_(l/*[ ws ][ nl ]*/);
                                if ($function_statement_list(l)) {
                                    add_reduce(1, 120);
                                    skip_fn_(l/*[ ws ][ nl ]*/);
                                    if (assert_consume(l, l.utf == 125/*[}]*/)) {
                                        add_reduce(7, 97);
                                        prod = 67;
                                    }
                                }
                            }
                        } else {
                            /*assert-production-closure*/
                            /*
                               164 function_declaration=>τfunction binding_identifier ( • formal_parameters ) { function_body } 
                            */
                            if ($formal_parameters(l)) {
                                skip_fn_(l/*[ ws ][ nl ]*/);
                                if (assert_consume(l, l.utf == 41/*[)]*/)) {
                                    skip_fn_(l/*[ ws ][ nl ]*/);
                                    if (assert_consume(l, l.utf == 123/*[{]*/)) {
                                        skip_fn_(l/*[ ws ][ nl ]*/);
                                        if ($function_statement_list(l)) {
                                            add_reduce(1, 120);
                                            skip_fn_(l/*[ ws ][ nl ]*/);
                                            if (assert_consume(l, l.utf == 125/*[}]*/)) {
                                                add_reduce(8, 90);
                                                prod = 67;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    } else if (cpdcbfef5f_(l)/*[async]*/) {
        /*peek*/
        /*
           159 function_declaration=>• τasync τfunction function_declaration_group_0115_109 binding_identifier ( formal_parameters ) { function_body } 
           161 function_declaration=>• τasync τfunction binding_identifier ( formal_parameters ) { function_body } 
           162 function_declaration=>• τasync τfunction function_declaration_group_0115_109 ( formal_parameters ) { function_body } 
           163 function_declaration=>• τasync τfunction function_declaration_group_0115_109 binding_identifier ( ) { function_body } 
           167 function_declaration=>• τasync τfunction ( formal_parameters ) { function_body } 
           168 function_declaration=>• τasync τfunction binding_identifier ( ) { function_body } 
           169 function_declaration=>• τasync τfunction function_declaration_group_0115_109 ( ) { function_body } 
           173 function_declaration=>• τasync τfunction ( ) { function_body } 
        */
        skip_fn_(l/*[ ws ][ nl ]*/);
        if (assert_consume(l, cpdcbfef5f_(l)/*[async]*/)) {
            /*consume*/
            /*
               159 function_declaration=>τasync • τfunction function_declaration_group_0115_109 binding_identifier ( formal_parameters ) { function_body } 
               161 function_declaration=>τasync • τfunction binding_identifier ( formal_parameters ) { function_body } 
               162 function_declaration=>τasync • τfunction function_declaration_group_0115_109 ( formal_parameters ) { function_body } 
               163 function_declaration=>τasync • τfunction function_declaration_group_0115_109 binding_identifier ( ) { function_body } 
               167 function_declaration=>τasync • τfunction ( formal_parameters ) { function_body } 
               168 function_declaration=>τasync • τfunction binding_identifier ( ) { function_body } 
               169 function_declaration=>τasync • τfunction function_declaration_group_0115_109 ( ) { function_body } 
               173 function_declaration=>τasync • τfunction ( ) { function_body } 
            */
            skip_fn_(l/*[ ws ][ nl ]*/);
            if (assert_consume(l, cp87f20bb1_(l)/*[function]*/)) {
                /*consume*/
                /*
                   159 function_declaration=>τasync τfunction • function_declaration_group_0115_109 binding_identifier ( formal_parameters ) { function_body } 
                   161 function_declaration=>τasync τfunction • binding_identifier ( formal_parameters ) { function_body } 
                   162 function_declaration=>τasync τfunction • function_declaration_group_0115_109 ( formal_parameters ) { function_body } 
                   163 function_declaration=>τasync τfunction • function_declaration_group_0115_109 binding_identifier ( ) { function_body } 
                   167 function_declaration=>τasync τfunction • ( formal_parameters ) { function_body } 
                   168 function_declaration=>τasync τfunction • binding_identifier ( ) { function_body } 
                   169 function_declaration=>τasync τfunction • function_declaration_group_0115_109 ( ) { function_body } 
                   173 function_declaration=>τasync τfunction • ( ) { function_body } 
                */
                if (l.utf == 40/*[(]*/) {
                    /*peek*/
                    /*
                       167 function_declaration=>τasync τfunction • ( formal_parameters ) { function_body } 
                       173 function_declaration=>τasync τfunction • ( ) { function_body } 
                    */
                    let pk: Lexer = l.copy();
                    skip_fn_(pk.next()/*[ ws ][ nl ]*/);
                    if (pk.utf == 41/*[)]*/) {
                        /*peek*/
                        /*
                           173 function_declaration=>τasync τfunction • ( ) { function_body } 
                        */
                        if (assert_consume(l, l.utf == 40/*[(]*/)) {
                            skip_fn_(l/*[ ws ][ nl ]*/);
                            if (assert_consume(l, l.utf == 41/*[)]*/)) {
                                skip_fn_(l/*[ ws ][ nl ]*/);
                                if (assert_consume(l, l.utf == 123/*[{]*/)) {
                                    skip_fn_(l/*[ ws ][ nl ]*/);
                                    if ($function_statement_list(l)) {
                                        add_reduce(1, 120);
                                        skip_fn_(l/*[ ws ][ nl ]*/);
                                        if (assert_consume(l, l.utf == 125/*[}]*/)) {
                                            add_reduce(7, 99);
                                            prod = 67;
                                        }
                                    }
                                }
                            }
                        }
                    } else if ((cp7fa4386a_(pk)/*[...]*/ || assert_table(pk, 0x0, 0x10, 0x88000000, 0x8000000)/*tbl:[ _ ] [ $ ] [ [ ] [ { ]*/) || pk.isID()/*[id]*/) {
                        /*peek*/
                        /*
                           167 function_declaration=>τasync τfunction • ( formal_parameters ) { function_body } 
                        */
                        if (assert_consume(l, l.utf == 40/*[(]*/)) {
                            skip_fn_(l/*[ ws ][ nl ]*/);
                            if ($formal_parameters(l)) {
                                skip_fn_(l/*[ ws ][ nl ]*/);
                                if (assert_consume(l, l.utf == 41/*[)]*/)) {
                                    skip_fn_(l/*[ ws ][ nl ]*/);
                                    if (assert_consume(l, l.utf == 123/*[{]*/)) {
                                        skip_fn_(l/*[ ws ][ nl ]*/);
                                        if ($function_statement_list(l)) {
                                            add_reduce(1, 120);
                                            skip_fn_(l/*[ ws ][ nl ]*/);
                                            if (assert_consume(l, l.utf == 125/*[}]*/)) {
                                                add_reduce(8, 93);
                                                prod = 67;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                } else if (l.utf == 42/*[asterisk]*/) {
                    /*peek-production-closure*/
                    /*
                       159 function_declaration=>τasync τfunction • function_declaration_group_0115_109 binding_identifier ( formal_parameters ) { function_body } 
                       162 function_declaration=>τasync τfunction • function_declaration_group_0115_109 ( formal_parameters ) { function_body } 
                       163 function_declaration=>τasync τfunction • function_declaration_group_0115_109 binding_identifier ( ) { function_body } 
                       169 function_declaration=>τasync τfunction • function_declaration_group_0115_109 ( ) { function_body } 
                    */
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if ($function_declaration_group_0115_109(l)) {
                        /*assert*/
                        /*
                           159 function_declaration=>τasync τfunction • function_declaration_group_0115_109 binding_identifier ( formal_parameters ) { function_body } 
                           162 function_declaration=>τasync τfunction • function_declaration_group_0115_109 ( formal_parameters ) { function_body } 
                           163 function_declaration=>τasync τfunction • function_declaration_group_0115_109 binding_identifier ( ) { function_body } 
                           169 function_declaration=>τasync τfunction • function_declaration_group_0115_109 ( ) { function_body } 
                        */
                        if (l.utf == 40/*[(]*/) {
                            /*peek*/
                            /*
                               162 function_declaration=>τasync τfunction function_declaration_group_0115_109 • ( formal_parameters ) { function_body } 
                               169 function_declaration=>τasync τfunction function_declaration_group_0115_109 • ( ) { function_body } 
                            */
                            let pk: Lexer = l.copy();
                            skip_fn_(pk.next()/*[ ws ][ nl ]*/);
                            if (pk.utf == 41/*[)]*/) {
                                /*peek*/
                                /*
                                   169 function_declaration=>τasync τfunction function_declaration_group_0115_109 • ( ) { function_body } 
                                */
                                if (assert_consume(l, l.utf == 40/*[(]*/)) {
                                    skip_fn_(l/*[ ws ][ nl ]*/);
                                    if (assert_consume(l, l.utf == 41/*[)]*/)) {
                                        skip_fn_(l/*[ ws ][ nl ]*/);
                                        if (assert_consume(l, l.utf == 123/*[{]*/)) {
                                            skip_fn_(l/*[ ws ][ nl ]*/);
                                            if ($function_statement_list(l)) {
                                                add_reduce(1, 120);
                                                skip_fn_(l/*[ ws ][ nl ]*/);
                                                if (assert_consume(l, l.utf == 125/*[}]*/)) {
                                                    add_reduce(8, 95);
                                                    prod = 67;
                                                }
                                            }
                                        }
                                    }
                                }
                            } else if ((cp7fa4386a_(pk)/*[...]*/ || assert_table(pk, 0x0, 0x10, 0x88000000, 0x8000000)/*tbl:[ _ ] [ $ ] [ [ ] [ { ]*/) || pk.isID()/*[id]*/) {
                                /*peek*/
                                /*
                                   162 function_declaration=>τasync τfunction function_declaration_group_0115_109 • ( formal_parameters ) { function_body } 
                                */
                                if (assert_consume(l, l.utf == 40/*[(]*/)) {
                                    skip_fn_(l/*[ ws ][ nl ]*/);
                                    if ($formal_parameters(l)) {
                                        skip_fn_(l/*[ ws ][ nl ]*/);
                                        if (assert_consume(l, l.utf == 41/*[)]*/)) {
                                            skip_fn_(l/*[ ws ][ nl ]*/);
                                            if (assert_consume(l, l.utf == 123/*[{]*/)) {
                                                skip_fn_(l/*[ ws ][ nl ]*/);
                                                if ($function_statement_list(l)) {
                                                    add_reduce(1, 120);
                                                    skip_fn_(l/*[ ws ][ nl ]*/);
                                                    if (assert_consume(l, l.utf == 125/*[}]*/)) {
                                                        add_reduce(9, 88);
                                                        prod = 67;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        } else {
                            /*peek-production-closure*/
                            /*
                               159 function_declaration=>τasync τfunction function_declaration_group_0115_109 • binding_identifier ( formal_parameters ) { function_body } 
                               163 function_declaration=>τasync τfunction function_declaration_group_0115_109 • binding_identifier ( ) { function_body } 
                            */
                            skip_fn_(l/*[ ws ][ nl ]*/);
                            if ($binding_identifier(l)) {
                                /*assert*/
                                /*
                                   159 function_declaration=>τasync τfunction function_declaration_group_0115_109 • binding_identifier ( formal_parameters ) { function_body } 
                                   163 function_declaration=>τasync τfunction function_declaration_group_0115_109 • binding_identifier ( ) { function_body } 
                                */
                                skip_fn_(l/*[ ws ][ nl ]*/);
                                if (assert_consume(l, l.utf == 40/*[(]*/)) {
                                    /*consume*/
                                    /*
                                       159 function_declaration=>τasync τfunction function_declaration_group_0115_109 binding_identifier ( • formal_parameters ) { function_body } 
                                       163 function_declaration=>τasync τfunction function_declaration_group_0115_109 binding_identifier ( • ) { function_body } 
                                    */
                                    skip_fn_(l/*[ ws ][ nl ]*/);
                                    if (assert_consume(l, l.utf == 41/*[)]*/)) {
                                        /*consume*/
                                        /*
                                           163 function_declaration=>τasync τfunction function_declaration_group_0115_109 binding_identifier ( ) • { function_body } 
                                        */
                                        skip_fn_(l/*[ ws ][ nl ]*/);
                                        if (assert_consume(l, l.utf == 123/*[{]*/)) {
                                            skip_fn_(l/*[ ws ][ nl ]*/);
                                            if ($function_statement_list(l)) {
                                                add_reduce(1, 120);
                                                skip_fn_(l/*[ ws ][ nl ]*/);
                                                if (assert_consume(l, l.utf == 125/*[}]*/)) {
                                                    add_reduce(9, 89);
                                                    prod = 67;
                                                }
                                            }
                                        }
                                    } else {
                                        /*assert-production-closure*/
                                        /*
                                           159 function_declaration=>τasync τfunction function_declaration_group_0115_109 binding_identifier ( • formal_parameters ) { function_body } 
                                        */
                                        if ($formal_parameters(l)) {
                                            skip_fn_(l/*[ ws ][ nl ]*/);
                                            if (assert_consume(l, l.utf == 41/*[)]*/)) {
                                                skip_fn_(l/*[ ws ][ nl ]*/);
                                                if (assert_consume(l, l.utf == 123/*[{]*/)) {
                                                    skip_fn_(l/*[ ws ][ nl ]*/);
                                                    if ($function_statement_list(l)) {
                                                        add_reduce(1, 120);
                                                        skip_fn_(l/*[ ws ][ nl ]*/);
                                                        if (assert_consume(l, l.utf == 125/*[}]*/)) {
                                                            add_reduce(10, 85);
                                                            prod = 67;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                } else {
                    /*peek-production-closure*/
                    /*
                       161 function_declaration=>τasync τfunction • binding_identifier ( formal_parameters ) { function_body } 
                       168 function_declaration=>τasync τfunction • binding_identifier ( ) { function_body } 
                    */
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if ($binding_identifier(l)) {
                        /*assert*/
                        /*
                           161 function_declaration=>τasync τfunction • binding_identifier ( formal_parameters ) { function_body } 
                           168 function_declaration=>τasync τfunction • binding_identifier ( ) { function_body } 
                        */
                        skip_fn_(l/*[ ws ][ nl ]*/);
                        if (assert_consume(l, l.utf == 40/*[(]*/)) {
                            /*consume*/
                            /*
                               161 function_declaration=>τasync τfunction binding_identifier ( • formal_parameters ) { function_body } 
                               168 function_declaration=>τasync τfunction binding_identifier ( • ) { function_body } 
                            */
                            skip_fn_(l/*[ ws ][ nl ]*/);
                            if (assert_consume(l, l.utf == 41/*[)]*/)) {
                                /*consume*/
                                /*
                                   168 function_declaration=>τasync τfunction binding_identifier ( ) • { function_body } 
                                */
                                skip_fn_(l/*[ ws ][ nl ]*/);
                                if (assert_consume(l, l.utf == 123/*[{]*/)) {
                                    skip_fn_(l/*[ ws ][ nl ]*/);
                                    if ($function_statement_list(l)) {
                                        add_reduce(1, 120);
                                        skip_fn_(l/*[ ws ][ nl ]*/);
                                        if (assert_consume(l, l.utf == 125/*[}]*/)) {
                                            add_reduce(8, 94);
                                            prod = 67;
                                        }
                                    }
                                }
                            } else {
                                /*assert-production-closure*/
                                /*
                                   161 function_declaration=>τasync τfunction binding_identifier ( • formal_parameters ) { function_body } 
                                */
                                if ($formal_parameters(l)) {
                                    skip_fn_(l/*[ ws ][ nl ]*/);
                                    if (assert_consume(l, l.utf == 41/*[)]*/)) {
                                        skip_fn_(l/*[ ws ][ nl ]*/);
                                        if (assert_consume(l, l.utf == 123/*[{]*/)) {
                                            skip_fn_(l/*[ ws ][ nl ]*/);
                                            if ($function_statement_list(l)) {
                                                add_reduce(1, 120);
                                                skip_fn_(l/*[ ws ][ nl ]*/);
                                                if (assert_consume(l, l.utf == 125/*[}]*/)) {
                                                    add_reduce(9, 87);
                                                    prod = 67;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return assertSuccess(l, prod == 67);
}
function $function_expression(l: Lexer): boolean {
    if (cp87f20bb1_(l)/*[function]*/) {
        /*peek*/
        /*
           176 function_expression=>• τfunction function_declaration_group_0115_109 binding_identifier ( formal_parameters ) { function_body } 
           180 function_expression=>• τfunction binding_identifier ( formal_parameters ) { function_body } 
           181 function_expression=>• τfunction function_declaration_group_0115_109 ( formal_parameters ) { function_body } 
           182 function_expression=>• τfunction function_declaration_group_0115_109 binding_identifier ( ) { function_body } 
           186 function_expression=>• τfunction ( formal_parameters ) { function_body } 
           187 function_expression=>• τfunction binding_identifier ( ) { function_body } 
           188 function_expression=>• τfunction function_declaration_group_0115_109 ( ) { function_body } 
           190 function_expression=>• τfunction ( ) { function_body } 
        */
        let pk: Lexer = l.copy();
        skip_fn_(pk.next()/*[ ws ][ nl ]*/);
        if (pk.utf == 40/*[(]*/) {
            /*peek*/
            /*
               186 function_expression=>• τfunction ( formal_parameters ) { function_body } 
               190 function_expression=>• τfunction ( ) { function_body } 
            */
            skip_fn_(l/*[ ws ][ nl ]*/);
            if (assert_consume(l, cp87f20bb1_(l)/*[function]*/)) {
                /*consume*/
                /*
                   186 function_expression=>τfunction • ( formal_parameters ) { function_body } 
                   190 function_expression=>τfunction • ( ) { function_body } 
                */
                skip_fn_(l/*[ ws ][ nl ]*/);
                if (assert_consume(l, l.utf == 40/*[(]*/)) {
                    /*consume*/
                    /*
                       186 function_expression=>τfunction ( • formal_parameters ) { function_body } 
                       190 function_expression=>τfunction ( • ) { function_body } 
                    */
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if (assert_consume(l, l.utf == 41/*[)]*/)) {
                        /*consume*/
                        /*
                           190 function_expression=>τfunction ( ) • { function_body } 
                        */
                        skip_fn_(l/*[ ws ][ nl ]*/);
                        if (assert_consume(l, l.utf == 123/*[{]*/)) {
                            skip_fn_(l/*[ ws ][ nl ]*/);
                            if ($function_statement_list(l)) {
                                add_reduce(1, 120);
                                skip_fn_(l/*[ ws ][ nl ]*/);
                                if (assert_consume(l, l.utf == 125/*[}]*/)) {
                                    add_reduce(6, 116);
                                    prod = 68;
                                }
                            }
                        }
                    } else {
                        /*assert-production-closure*/
                        /*
                           186 function_expression=>τfunction ( • formal_parameters ) { function_body } 
                        */
                        if ($formal_parameters(l)) {
                            skip_fn_(l/*[ ws ][ nl ]*/);
                            if (assert_consume(l, l.utf == 41/*[)]*/)) {
                                skip_fn_(l/*[ ws ][ nl ]*/);
                                if (assert_consume(l, l.utf == 123/*[{]*/)) {
                                    skip_fn_(l/*[ ws ][ nl ]*/);
                                    if ($function_statement_list(l)) {
                                        add_reduce(1, 120);
                                        skip_fn_(l/*[ ws ][ nl ]*/);
                                        if (assert_consume(l, l.utf == 125/*[}]*/)) {
                                            add_reduce(7, 112);
                                            prod = 68;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        } else if (pk.utf == 42/*[asterisk]*/) {
            /*peek*/
            /*
               176 function_expression=>• τfunction function_declaration_group_0115_109 binding_identifier ( formal_parameters ) { function_body } 
               181 function_expression=>• τfunction function_declaration_group_0115_109 ( formal_parameters ) { function_body } 
               182 function_expression=>• τfunction function_declaration_group_0115_109 binding_identifier ( ) { function_body } 
               188 function_expression=>• τfunction function_declaration_group_0115_109 ( ) { function_body } 
            */
            skip_fn_(l/*[ ws ][ nl ]*/);
            if (assert_consume(l, cp87f20bb1_(l)/*[function]*/)) {
                /*consume*/
                /*
                   176 function_expression=>τfunction • function_declaration_group_0115_109 binding_identifier ( formal_parameters ) { function_body } 
                   181 function_expression=>τfunction • function_declaration_group_0115_109 ( formal_parameters ) { function_body } 
                   182 function_expression=>τfunction • function_declaration_group_0115_109 binding_identifier ( ) { function_body } 
                   188 function_expression=>τfunction • function_declaration_group_0115_109 ( ) { function_body } 
                */
                skip_fn_(l/*[ ws ][ nl ]*/);
                if ($function_declaration_group_0115_109(l)) {
                    /*assert*/
                    /*
                       176 function_expression=>τfunction • function_declaration_group_0115_109 binding_identifier ( formal_parameters ) { function_body } 
                       181 function_expression=>τfunction • function_declaration_group_0115_109 ( formal_parameters ) { function_body } 
                       182 function_expression=>τfunction • function_declaration_group_0115_109 binding_identifier ( ) { function_body } 
                       188 function_expression=>τfunction • function_declaration_group_0115_109 ( ) { function_body } 
                    */
                    if (l.utf == 40/*[(]*/) {
                        /*peek*/
                        /*
                           181 function_expression=>τfunction function_declaration_group_0115_109 • ( formal_parameters ) { function_body } 
                           188 function_expression=>τfunction function_declaration_group_0115_109 • ( ) { function_body } 
                        */
                        let pk: Lexer = l.copy();
                        skip_fn_(pk.next()/*[ ws ][ nl ]*/);
                        if (pk.utf == 41/*[)]*/) {
                            /*peek*/
                            /*
                               188 function_expression=>τfunction function_declaration_group_0115_109 • ( ) { function_body } 
                            */
                            if (assert_consume(l, l.utf == 40/*[(]*/)) {
                                skip_fn_(l/*[ ws ][ nl ]*/);
                                if (assert_consume(l, l.utf == 41/*[)]*/)) {
                                    skip_fn_(l/*[ ws ][ nl ]*/);
                                    if (assert_consume(l, l.utf == 123/*[{]*/)) {
                                        skip_fn_(l/*[ ws ][ nl ]*/);
                                        if ($function_statement_list(l)) {
                                            add_reduce(1, 120);
                                            skip_fn_(l/*[ ws ][ nl ]*/);
                                            if (assert_consume(l, l.utf == 125/*[}]*/)) {
                                                add_reduce(7, 114);
                                                prod = 68;
                                            }
                                        }
                                    }
                                }
                            }
                        } else if ((cp7fa4386a_(pk)/*[...]*/ || assert_table(pk, 0x0, 0x10, 0x88000000, 0x8000000)/*tbl:[ _ ] [ $ ] [ [ ] [ { ]*/) || pk.isID()/*[id]*/) {
                            /*peek*/
                            /*
                               181 function_expression=>τfunction function_declaration_group_0115_109 • ( formal_parameters ) { function_body } 
                            */
                            if (assert_consume(l, l.utf == 40/*[(]*/)) {
                                skip_fn_(l/*[ ws ][ nl ]*/);
                                if ($formal_parameters(l)) {
                                    skip_fn_(l/*[ ws ][ nl ]*/);
                                    if (assert_consume(l, l.utf == 41/*[)]*/)) {
                                        skip_fn_(l/*[ ws ][ nl ]*/);
                                        if (assert_consume(l, l.utf == 123/*[{]*/)) {
                                            skip_fn_(l/*[ ws ][ nl ]*/);
                                            if ($function_statement_list(l)) {
                                                add_reduce(1, 120);
                                                skip_fn_(l/*[ ws ][ nl ]*/);
                                                if (assert_consume(l, l.utf == 125/*[}]*/)) {
                                                    add_reduce(8, 107);
                                                    prod = 68;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    } else {
                        /*peek-production-closure*/
                        /*
                           176 function_expression=>τfunction function_declaration_group_0115_109 • binding_identifier ( formal_parameters ) { function_body } 
                           182 function_expression=>τfunction function_declaration_group_0115_109 • binding_identifier ( ) { function_body } 
                        */
                        skip_fn_(l/*[ ws ][ nl ]*/);
                        if ($binding_identifier(l)) {
                            /*assert*/
                            /*
                               176 function_expression=>τfunction function_declaration_group_0115_109 • binding_identifier ( formal_parameters ) { function_body } 
                               182 function_expression=>τfunction function_declaration_group_0115_109 • binding_identifier ( ) { function_body } 
                            */
                            skip_fn_(l/*[ ws ][ nl ]*/);
                            if (assert_consume(l, l.utf == 40/*[(]*/)) {
                                /*consume*/
                                /*
                                   176 function_expression=>τfunction function_declaration_group_0115_109 binding_identifier ( • formal_parameters ) { function_body } 
                                   182 function_expression=>τfunction function_declaration_group_0115_109 binding_identifier ( • ) { function_body } 
                                */
                                skip_fn_(l/*[ ws ][ nl ]*/);
                                if (assert_consume(l, l.utf == 41/*[)]*/)) {
                                    /*consume*/
                                    /*
                                       182 function_expression=>τfunction function_declaration_group_0115_109 binding_identifier ( ) • { function_body } 
                                    */
                                    skip_fn_(l/*[ ws ][ nl ]*/);
                                    if (assert_consume(l, l.utf == 123/*[{]*/)) {
                                        skip_fn_(l/*[ ws ][ nl ]*/);
                                        if ($function_statement_list(l)) {
                                            add_reduce(1, 120);
                                            skip_fn_(l/*[ ws ][ nl ]*/);
                                            if (assert_consume(l, l.utf == 125/*[}]*/)) {
                                                add_reduce(8, 108);
                                                prod = 68;
                                            }
                                        }
                                    }
                                } else {
                                    /*assert-production-closure*/
                                    /*
                                       176 function_expression=>τfunction function_declaration_group_0115_109 binding_identifier ( • formal_parameters ) { function_body } 
                                    */
                                    if ($formal_parameters(l)) {
                                        skip_fn_(l/*[ ws ][ nl ]*/);
                                        if (assert_consume(l, l.utf == 41/*[)]*/)) {
                                            skip_fn_(l/*[ ws ][ nl ]*/);
                                            if (assert_consume(l, l.utf == 123/*[{]*/)) {
                                                skip_fn_(l/*[ ws ][ nl ]*/);
                                                if ($function_statement_list(l)) {
                                                    add_reduce(1, 120);
                                                    skip_fn_(l/*[ ws ][ nl ]*/);
                                                    if (assert_consume(l, l.utf == 125/*[}]*/)) {
                                                        add_reduce(9, 102);
                                                        prod = 68;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        } else if (assert_table(pk, 0x0, 0x10, 0x80000000, 0x0)/*tbl:[ _ ] [ $ ]*/ || pk.isID()/*[id]*/) {
            /*peek*/
            /*
               180 function_expression=>• τfunction binding_identifier ( formal_parameters ) { function_body } 
               187 function_expression=>• τfunction binding_identifier ( ) { function_body } 
            */
            skip_fn_(l/*[ ws ][ nl ]*/);
            if (assert_consume(l, cp87f20bb1_(l)/*[function]*/)) {
                /*consume*/
                /*
                   180 function_expression=>τfunction • binding_identifier ( formal_parameters ) { function_body } 
                   187 function_expression=>τfunction • binding_identifier ( ) { function_body } 
                */
                skip_fn_(l/*[ ws ][ nl ]*/);
                if ($binding_identifier(l)) {
                    /*assert*/
                    /*
                       180 function_expression=>τfunction • binding_identifier ( formal_parameters ) { function_body } 
                       187 function_expression=>τfunction • binding_identifier ( ) { function_body } 
                    */
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if (assert_consume(l, l.utf == 40/*[(]*/)) {
                        /*consume*/
                        /*
                           180 function_expression=>τfunction binding_identifier ( • formal_parameters ) { function_body } 
                           187 function_expression=>τfunction binding_identifier ( • ) { function_body } 
                        */
                        skip_fn_(l/*[ ws ][ nl ]*/);
                        if (assert_consume(l, l.utf == 41/*[)]*/)) {
                            /*consume*/
                            /*
                               187 function_expression=>τfunction binding_identifier ( ) • { function_body } 
                            */
                            skip_fn_(l/*[ ws ][ nl ]*/);
                            if (assert_consume(l, l.utf == 123/*[{]*/)) {
                                skip_fn_(l/*[ ws ][ nl ]*/);
                                if ($function_statement_list(l)) {
                                    add_reduce(1, 120);
                                    skip_fn_(l/*[ ws ][ nl ]*/);
                                    if (assert_consume(l, l.utf == 125/*[}]*/)) {
                                        add_reduce(7, 113);
                                        prod = 68;
                                    }
                                }
                            }
                        } else {
                            /*assert-production-closure*/
                            /*
                               180 function_expression=>τfunction binding_identifier ( • formal_parameters ) { function_body } 
                            */
                            if ($formal_parameters(l)) {
                                skip_fn_(l/*[ ws ][ nl ]*/);
                                if (assert_consume(l, l.utf == 41/*[)]*/)) {
                                    skip_fn_(l/*[ ws ][ nl ]*/);
                                    if (assert_consume(l, l.utf == 123/*[{]*/)) {
                                        skip_fn_(l/*[ ws ][ nl ]*/);
                                        if ($function_statement_list(l)) {
                                            add_reduce(1, 120);
                                            skip_fn_(l/*[ ws ][ nl ]*/);
                                            if (assert_consume(l, l.utf == 125/*[}]*/)) {
                                                add_reduce(8, 106);
                                                prod = 68;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    } else if (cpdcbfef5f_(l)/*[async]*/) {
        /*peek*/
        /*
           175 function_expression=>• τasync τfunction function_declaration_group_0115_109 binding_identifier ( formal_parameters ) { function_body } 
           177 function_expression=>• τasync τfunction binding_identifier ( formal_parameters ) { function_body } 
           178 function_expression=>• τasync τfunction function_declaration_group_0115_109 ( formal_parameters ) { function_body } 
           179 function_expression=>• τasync τfunction function_declaration_group_0115_109 binding_identifier ( ) { function_body } 
           183 function_expression=>• τasync τfunction ( formal_parameters ) { function_body } 
           184 function_expression=>• τasync τfunction binding_identifier ( ) { function_body } 
           185 function_expression=>• τasync τfunction function_declaration_group_0115_109 ( ) { function_body } 
           189 function_expression=>• τasync τfunction ( ) { function_body } 
        */
        skip_fn_(l/*[ ws ][ nl ]*/);
        if (assert_consume(l, cpdcbfef5f_(l)/*[async]*/)) {
            /*consume*/
            /*
               175 function_expression=>τasync • τfunction function_declaration_group_0115_109 binding_identifier ( formal_parameters ) { function_body } 
               177 function_expression=>τasync • τfunction binding_identifier ( formal_parameters ) { function_body } 
               178 function_expression=>τasync • τfunction function_declaration_group_0115_109 ( formal_parameters ) { function_body } 
               179 function_expression=>τasync • τfunction function_declaration_group_0115_109 binding_identifier ( ) { function_body } 
               183 function_expression=>τasync • τfunction ( formal_parameters ) { function_body } 
               184 function_expression=>τasync • τfunction binding_identifier ( ) { function_body } 
               185 function_expression=>τasync • τfunction function_declaration_group_0115_109 ( ) { function_body } 
               189 function_expression=>τasync • τfunction ( ) { function_body } 
            */
            skip_fn_(l/*[ ws ][ nl ]*/);
            if (assert_consume(l, cp87f20bb1_(l)/*[function]*/)) {
                /*consume*/
                /*
                   175 function_expression=>τasync τfunction • function_declaration_group_0115_109 binding_identifier ( formal_parameters ) { function_body } 
                   177 function_expression=>τasync τfunction • binding_identifier ( formal_parameters ) { function_body } 
                   178 function_expression=>τasync τfunction • function_declaration_group_0115_109 ( formal_parameters ) { function_body } 
                   179 function_expression=>τasync τfunction • function_declaration_group_0115_109 binding_identifier ( ) { function_body } 
                   183 function_expression=>τasync τfunction • ( formal_parameters ) { function_body } 
                   184 function_expression=>τasync τfunction • binding_identifier ( ) { function_body } 
                   185 function_expression=>τasync τfunction • function_declaration_group_0115_109 ( ) { function_body } 
                   189 function_expression=>τasync τfunction • ( ) { function_body } 
                */
                if (l.utf == 40/*[(]*/) {
                    /*peek*/
                    /*
                       183 function_expression=>τasync τfunction • ( formal_parameters ) { function_body } 
                       189 function_expression=>τasync τfunction • ( ) { function_body } 
                    */
                    let pk: Lexer = l.copy();
                    skip_fn_(pk.next()/*[ ws ][ nl ]*/);
                    if (pk.utf == 41/*[)]*/) {
                        /*peek*/
                        /*
                           189 function_expression=>τasync τfunction • ( ) { function_body } 
                        */
                        if (assert_consume(l, l.utf == 40/*[(]*/)) {
                            skip_fn_(l/*[ ws ][ nl ]*/);
                            if (assert_consume(l, l.utf == 41/*[)]*/)) {
                                skip_fn_(l/*[ ws ][ nl ]*/);
                                if (assert_consume(l, l.utf == 123/*[{]*/)) {
                                    skip_fn_(l/*[ ws ][ nl ]*/);
                                    if ($function_statement_list(l)) {
                                        add_reduce(1, 120);
                                        skip_fn_(l/*[ ws ][ nl ]*/);
                                        if (assert_consume(l, l.utf == 125/*[}]*/)) {
                                            add_reduce(7, 115);
                                            prod = 68;
                                        }
                                    }
                                }
                            }
                        }
                    } else if ((cp7fa4386a_(pk)/*[...]*/ || assert_table(pk, 0x0, 0x10, 0x88000000, 0x8000000)/*tbl:[ _ ] [ $ ] [ [ ] [ { ]*/) || pk.isID()/*[id]*/) {
                        /*peek*/
                        /*
                           183 function_expression=>τasync τfunction • ( formal_parameters ) { function_body } 
                        */
                        if (assert_consume(l, l.utf == 40/*[(]*/)) {
                            skip_fn_(l/*[ ws ][ nl ]*/);
                            if ($formal_parameters(l)) {
                                skip_fn_(l/*[ ws ][ nl ]*/);
                                if (assert_consume(l, l.utf == 41/*[)]*/)) {
                                    skip_fn_(l/*[ ws ][ nl ]*/);
                                    if (assert_consume(l, l.utf == 123/*[{]*/)) {
                                        skip_fn_(l/*[ ws ][ nl ]*/);
                                        if ($function_statement_list(l)) {
                                            add_reduce(1, 120);
                                            skip_fn_(l/*[ ws ][ nl ]*/);
                                            if (assert_consume(l, l.utf == 125/*[}]*/)) {
                                                add_reduce(8, 109);
                                                prod = 68;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                } else if (l.utf == 42/*[asterisk]*/) {
                    /*peek-production-closure*/
                    /*
                       175 function_expression=>τasync τfunction • function_declaration_group_0115_109 binding_identifier ( formal_parameters ) { function_body } 
                       178 function_expression=>τasync τfunction • function_declaration_group_0115_109 ( formal_parameters ) { function_body } 
                       179 function_expression=>τasync τfunction • function_declaration_group_0115_109 binding_identifier ( ) { function_body } 
                       185 function_expression=>τasync τfunction • function_declaration_group_0115_109 ( ) { function_body } 
                    */
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if ($function_declaration_group_0115_109(l)) {
                        /*assert*/
                        /*
                           175 function_expression=>τasync τfunction • function_declaration_group_0115_109 binding_identifier ( formal_parameters ) { function_body } 
                           178 function_expression=>τasync τfunction • function_declaration_group_0115_109 ( formal_parameters ) { function_body } 
                           179 function_expression=>τasync τfunction • function_declaration_group_0115_109 binding_identifier ( ) { function_body } 
                           185 function_expression=>τasync τfunction • function_declaration_group_0115_109 ( ) { function_body } 
                        */
                        if (l.utf == 40/*[(]*/) {
                            /*peek*/
                            /*
                               178 function_expression=>τasync τfunction function_declaration_group_0115_109 • ( formal_parameters ) { function_body } 
                               185 function_expression=>τasync τfunction function_declaration_group_0115_109 • ( ) { function_body } 
                            */
                            let pk: Lexer = l.copy();
                            skip_fn_(pk.next()/*[ ws ][ nl ]*/);
                            if (pk.utf == 41/*[)]*/) {
                                /*peek*/
                                /*
                                   185 function_expression=>τasync τfunction function_declaration_group_0115_109 • ( ) { function_body } 
                                */
                                if (assert_consume(l, l.utf == 40/*[(]*/)) {
                                    skip_fn_(l/*[ ws ][ nl ]*/);
                                    if (assert_consume(l, l.utf == 41/*[)]*/)) {
                                        skip_fn_(l/*[ ws ][ nl ]*/);
                                        if (assert_consume(l, l.utf == 123/*[{]*/)) {
                                            skip_fn_(l/*[ ws ][ nl ]*/);
                                            if ($function_statement_list(l)) {
                                                add_reduce(1, 120);
                                                skip_fn_(l/*[ ws ][ nl ]*/);
                                                if (assert_consume(l, l.utf == 125/*[}]*/)) {
                                                    add_reduce(8, 111);
                                                    prod = 68;
                                                }
                                            }
                                        }
                                    }
                                }
                            } else if ((cp7fa4386a_(pk)/*[...]*/ || assert_table(pk, 0x0, 0x10, 0x88000000, 0x8000000)/*tbl:[ _ ] [ $ ] [ [ ] [ { ]*/) || pk.isID()/*[id]*/) {
                                /*peek*/
                                /*
                                   178 function_expression=>τasync τfunction function_declaration_group_0115_109 • ( formal_parameters ) { function_body } 
                                */
                                if (assert_consume(l, l.utf == 40/*[(]*/)) {
                                    skip_fn_(l/*[ ws ][ nl ]*/);
                                    if ($formal_parameters(l)) {
                                        skip_fn_(l/*[ ws ][ nl ]*/);
                                        if (assert_consume(l, l.utf == 41/*[)]*/)) {
                                            skip_fn_(l/*[ ws ][ nl ]*/);
                                            if (assert_consume(l, l.utf == 123/*[{]*/)) {
                                                skip_fn_(l/*[ ws ][ nl ]*/);
                                                if ($function_statement_list(l)) {
                                                    add_reduce(1, 120);
                                                    skip_fn_(l/*[ ws ][ nl ]*/);
                                                    if (assert_consume(l, l.utf == 125/*[}]*/)) {
                                                        add_reduce(9, 104);
                                                        prod = 68;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        } else {
                            /*peek-production-closure*/
                            /*
                               175 function_expression=>τasync τfunction function_declaration_group_0115_109 • binding_identifier ( formal_parameters ) { function_body } 
                               179 function_expression=>τasync τfunction function_declaration_group_0115_109 • binding_identifier ( ) { function_body } 
                            */
                            skip_fn_(l/*[ ws ][ nl ]*/);
                            if ($binding_identifier(l)) {
                                /*assert*/
                                /*
                                   175 function_expression=>τasync τfunction function_declaration_group_0115_109 • binding_identifier ( formal_parameters ) { function_body } 
                                   179 function_expression=>τasync τfunction function_declaration_group_0115_109 • binding_identifier ( ) { function_body } 
                                */
                                skip_fn_(l/*[ ws ][ nl ]*/);
                                if (assert_consume(l, l.utf == 40/*[(]*/)) {
                                    /*consume*/
                                    /*
                                       175 function_expression=>τasync τfunction function_declaration_group_0115_109 binding_identifier ( • formal_parameters ) { function_body } 
                                       179 function_expression=>τasync τfunction function_declaration_group_0115_109 binding_identifier ( • ) { function_body } 
                                    */
                                    skip_fn_(l/*[ ws ][ nl ]*/);
                                    if (assert_consume(l, l.utf == 41/*[)]*/)) {
                                        /*consume*/
                                        /*
                                           179 function_expression=>τasync τfunction function_declaration_group_0115_109 binding_identifier ( ) • { function_body } 
                                        */
                                        skip_fn_(l/*[ ws ][ nl ]*/);
                                        if (assert_consume(l, l.utf == 123/*[{]*/)) {
                                            skip_fn_(l/*[ ws ][ nl ]*/);
                                            if ($function_statement_list(l)) {
                                                add_reduce(1, 120);
                                                skip_fn_(l/*[ ws ][ nl ]*/);
                                                if (assert_consume(l, l.utf == 125/*[}]*/)) {
                                                    add_reduce(9, 105);
                                                    prod = 68;
                                                }
                                            }
                                        }
                                    } else {
                                        /*assert-production-closure*/
                                        /*
                                           175 function_expression=>τasync τfunction function_declaration_group_0115_109 binding_identifier ( • formal_parameters ) { function_body } 
                                        */
                                        if ($formal_parameters(l)) {
                                            skip_fn_(l/*[ ws ][ nl ]*/);
                                            if (assert_consume(l, l.utf == 41/*[)]*/)) {
                                                skip_fn_(l/*[ ws ][ nl ]*/);
                                                if (assert_consume(l, l.utf == 123/*[{]*/)) {
                                                    skip_fn_(l/*[ ws ][ nl ]*/);
                                                    if ($function_statement_list(l)) {
                                                        add_reduce(1, 120);
                                                        skip_fn_(l/*[ ws ][ nl ]*/);
                                                        if (assert_consume(l, l.utf == 125/*[}]*/)) {
                                                            add_reduce(10, 101);
                                                            prod = 68;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                } else {
                    /*peek-production-closure*/
                    /*
                       177 function_expression=>τasync τfunction • binding_identifier ( formal_parameters ) { function_body } 
                       184 function_expression=>τasync τfunction • binding_identifier ( ) { function_body } 
                    */
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if ($binding_identifier(l)) {
                        /*assert*/
                        /*
                           177 function_expression=>τasync τfunction • binding_identifier ( formal_parameters ) { function_body } 
                           184 function_expression=>τasync τfunction • binding_identifier ( ) { function_body } 
                        */
                        skip_fn_(l/*[ ws ][ nl ]*/);
                        if (assert_consume(l, l.utf == 40/*[(]*/)) {
                            /*consume*/
                            /*
                               177 function_expression=>τasync τfunction binding_identifier ( • formal_parameters ) { function_body } 
                               184 function_expression=>τasync τfunction binding_identifier ( • ) { function_body } 
                            */
                            skip_fn_(l/*[ ws ][ nl ]*/);
                            if (assert_consume(l, l.utf == 41/*[)]*/)) {
                                /*consume*/
                                /*
                                   184 function_expression=>τasync τfunction binding_identifier ( ) • { function_body } 
                                */
                                skip_fn_(l/*[ ws ][ nl ]*/);
                                if (assert_consume(l, l.utf == 123/*[{]*/)) {
                                    skip_fn_(l/*[ ws ][ nl ]*/);
                                    if ($function_statement_list(l)) {
                                        add_reduce(1, 120);
                                        skip_fn_(l/*[ ws ][ nl ]*/);
                                        if (assert_consume(l, l.utf == 125/*[}]*/)) {
                                            add_reduce(8, 110);
                                            prod = 68;
                                        }
                                    }
                                }
                            } else {
                                /*assert-production-closure*/
                                /*
                                   177 function_expression=>τasync τfunction binding_identifier ( • formal_parameters ) { function_body } 
                                */
                                if ($formal_parameters(l)) {
                                    skip_fn_(l/*[ ws ][ nl ]*/);
                                    if (assert_consume(l, l.utf == 41/*[)]*/)) {
                                        skip_fn_(l/*[ ws ][ nl ]*/);
                                        if (assert_consume(l, l.utf == 123/*[{]*/)) {
                                            skip_fn_(l/*[ ws ][ nl ]*/);
                                            if ($function_statement_list(l)) {
                                                add_reduce(1, 120);
                                                skip_fn_(l/*[ ws ][ nl ]*/);
                                                if (assert_consume(l, l.utf == 125/*[}]*/)) {
                                                    add_reduce(9, 103);
                                                    prod = 68;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return assertSuccess(l, prod == 68);
}
function $unique_formal_parameters(l: Lexer): boolean {
    if ($formal_parameters(l)) {
        prod = 69;
    }
    return assertSuccess(l, prod == 69);
}
function $formal_parameters(l: Lexer): boolean {
    if (cp7fa4386a_(l)/*[...]*/) {
        /*assert-production-closure*/
        /*
           192 formal_parameters=>• function_rest_parameter 
        */
        if ($binding_rest_element(l)) {
            add_reduce(1, 117);
            prod = 70;
        }
    } else {
        /*peek-production-closure*/
        /*
           193 formal_parameters=>• formal_parameter_list , 
           194 formal_parameters=>• formal_parameter_list , function_rest_parameter 
           195 formal_parameters=>• formal_parameter_list 
        */
        skip_fn_(l/*[ ws ][ nl ]*/);
        if ($formal_parameter_list(l)) {
            /*assert*/
            /*
               193 formal_parameters=>• formal_parameter_list , 
               194 formal_parameters=>• formal_parameter_list , function_rest_parameter 
               195 formal_parameters=>• formal_parameter_list 
            */
            skip_fn_(l/*[ ws ][ nl ]*/);
            if (assert_consume(l, l.utf == 44/*[,]*/)) {
                /*consume*/
                /*
                   193 formal_parameters=>formal_parameter_list , • 
                   194 formal_parameters=>formal_parameter_list , • function_rest_parameter 
                */
                skip_fn_(l/*[ ws ][ nl ]*/);
                if (cp7fa4386a_(l)/*[...]*/) {
                    /*assert-production-closure*/
                    /*
                       194 formal_parameters=>formal_parameter_list , • function_rest_parameter 
                    */
                    if ($binding_rest_element(l)) {
                        add_reduce(3, 119);
                        prod = 70;
                    }
                } else {
                    /*assert-end*/
                    /*
                       193 formal_parameters=>formal_parameter_list , • 
                    */
                    add_reduce(2, 118);
                    prod = 70;
                }
            } else {
                /*assert-end*/
                /*
                   195 formal_parameters=>formal_parameter_list • 
                */
                add_reduce(1, 118);
                prod = 70;
            }
        }
    }
    return assertSuccess(l, prod == 70);
}
function $formal_parameter_list(l: Lexer): boolean {
    if ($binding_element(l)) {
        add_reduce(1, 4);
        prod = 72;
    }
    while (prod == 72) {
        let ACCEPT: boolean = false;
        skip_fn_(l/*[ ws ][ nl ]*/);
        if (assert_consume(l, l.utf == 44/*[,]*/)) {
            /*consume*/
            /*
               198 formal_parameter_list=>formal_parameter_list , • formal_parameter 
            */
            skip_fn_(l/*[ ws ][ nl ]*/);
            if ($binding_element(l)) {
                add_reduce(3, 11);
                prod = 72;
                ACCEPT = true;
            }
        }
        if (!ACCEPT) {
            break;
        }
    }
    return assertSuccess(l, prod == 72);
}
function $function_statement_list(l: Lexer): boolean {
    if ((((cp0ac89158_(l)/*[+] [++]*/ || cpfaa7aa14_(l)/*[-] [--]*/) || assert_table(l, 0x0, 0x8008196, 0x88000000, 0x48000001)/*tbl:[ { ] [ ( ] [ $ ] [ _ ] [ " ] [ ' ] [ [ ] [ / ] [ ` ] [ ~ ] [ ! ] [ ; ]*/) || l.isID()/*[id]*/) || l.isNum()/*[num]*/) {
        /*assert-production-closure*/
        /*
           203 function_statement_list=>• statement_list 
        */
        if ($statement_list(l)) {
            prod = 76;
        }
    } else {
        /*assert-end*/
        /*
           204 function_statement_list=>• 
        */
        prod = 76;
    }
    return assertSuccess(l, prod == 76);
}
function $yield_expression(l: Lexer): boolean {
    if (assert_consume(l, cp3e88794b_(l)/*[yield]*/)) {
        /*consume*/
        /*
           205 yield_expression=>τyield • θnl 
           206 yield_expression=>τyield • function_declaration_group_0115_109 assignment_expression 
           207 yield_expression=>τyield • assignment_expression 
        */
        skip_fn_000(l/*[ ws ]*/);
        if (l.utf == 42/*[asterisk]*/) {
            /*assert-production-closure*/
            /*
               206 yield_expression=>τyield • function_declaration_group_0115_109 assignment_expression 
            */
            if ($function_declaration_group_0115_109(l)) {
                skip_fn_(l/*[ ws ][ nl ]*/);
                if ($assignment_expression(l)) {
                    add_reduce(3, 122);
                    prod = 77;
                }
            }
        } else if (assert_consume(l, l.isNL()/*[nl]*/)) {
            /*consume*/
            /*
               205 yield_expression=>τyield θnl • 
            */
            add_reduce(2, 121);
            prod = 77;
        } else {
            /*assert-production-closure*/
            /*
               207 yield_expression=>τyield • assignment_expression 
            */
            if ($assignment_expression(l)) {
                add_reduce(2, 123);
                prod = 77;
            }
        }
    }
    return assertSuccess(l, prod == 77);
}
function $arrow_function(l: Lexer): boolean {
    if (cpdcbfef5f_(l)/*[async]*/) {
        /*peek*/
        /*
           208 arrow_function=>• τasync arrow_parameters => concise_body 
           209 arrow_function=>• arrow_parameters => concise_body 
        */
        let pk: Lexer = l.copy();
        skip_fn_(pk.next()/*[ ws ][ nl ]*/);
        if (cpf526e31a_(pk)/*[=>]*/) {
            /*peek-production-closure*/
            /*
               209 arrow_function=>• arrow_parameters => concise_body 
            */
            if ($arrow_parameters(l)) {
                skip_fn_(l/*[ ws ][ nl ]*/);
                if (assert_consume(l, cpf526e31a_(l)/*[=>]*/)) {
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if ($concise_body(l)) {
                        add_reduce(3, 125);
                        prod = 78;
                    }
                }
            }
        } else if (assert_table(pk, 0x0, 0x110, 0x80000000, 0x0)/*tbl:[ ( ] [ _ ] [ $ ]*/ || pk.isID()/*[id]*/) {
            /*peek*/
            /*
               208 arrow_function=>• τasync arrow_parameters => concise_body 
            */
            if (assert_consume(l, cpdcbfef5f_(l)/*[async]*/)) {
                skip_fn_(l/*[ ws ][ nl ]*/);
                if ($arrow_parameters(l)) {
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if (assert_consume(l, cpf526e31a_(l)/*[=>]*/)) {
                        skip_fn_(l/*[ ws ][ nl ]*/);
                        if ($concise_body(l)) {
                            add_reduce(4, 124);
                            prod = 78;
                        }
                    }
                }
            }
        }
    } else {
        /*assert-production-closure*/
        /*
           209 arrow_function=>• arrow_parameters => concise_body 
        */
        if ($arrow_parameters(l)) {
            skip_fn_(l/*[ ws ][ nl ]*/);
            if (assert_consume(l, cpf526e31a_(l)/*[=>]*/)) {
                skip_fn_(l/*[ ws ][ nl ]*/);
                if ($concise_body(l)) {
                    add_reduce(3, 125);
                    prod = 78;
                }
            }
        }
    }
    return assertSuccess(l, prod == 78);
}
function $arrow_parameters(l: Lexer): boolean {
    if (l.utf == 40/*[(]*/) {
        /*assert-production-closure*/
        /*
           211 arrow_parameters=>• cover_parenthesized_expression_and_arrow_parameter_list 
        */
        if ($cover_parenthesized_expression_and_arrow_parameter_list(l)) {
            add_reduce(1, 127);
            prod = 79;
        }
    } else {
        /*assert-production-closure*/
        /*
           210 arrow_parameters=>• identifier_reference 
        */
        if ($identifier(l)) {
            add_reduce(1, 253);
            add_reduce(1, 126);
            prod = 79;
        }
    }
    return assertSuccess(l, prod == 79);
}
function $concise_body(l: Lexer): boolean {
    if (assert_consume(l, l.utf == 123/*[{]*/)) {
        /*consume*/
        /*
           213 concise_body=>{ • function_statement_list } 
        */
        skip_fn_(l/*[ ws ][ nl ]*/);
        if ($function_statement_list(l)) {
            skip_fn_(l/*[ ws ][ nl ]*/);
            if (assert_consume(l, l.utf == 125/*[}]*/)) {
                add_reduce(3, 128);
                prod = 80;
            }
        }
    } else {
        /*assert-production-closure*/
        /*
           212 concise_body=>• assignment_expression 
        */
        if ($assignment_expression(l)) {
            prod = 80;
        }
    }
    return assertSuccess(l, prod == 80);
}
function $class_declaration(l: Lexer): boolean {
    if (assert_consume(l, cp1f027896_(l)/*[class]*/)) {
        /*consume*/
        /*
           215 class_declaration=>τclass • binding_identifier class_heritage { class_body } 
           216 class_declaration=>τclass • class_heritage { class_body } 
           217 class_declaration=>τclass • binding_identifier { class_body } 
           218 class_declaration=>τclass • binding_identifier class_heritage { } 
           219 class_declaration=>τclass • { class_body } 
           220 class_declaration=>τclass • class_heritage { } 
           221 class_declaration=>τclass • binding_identifier { } 
           222 class_declaration=>τclass • { } 
        */
        if (l.utf == 123/*[{]*/) {
            /*peek*/
            /*
               219 class_declaration=>τclass • { class_body } 
               222 class_declaration=>τclass • { } 
            */
            let pk: Lexer = l.copy();
            skip_fn_(pk.next()/*[ ws ][ nl ]*/);
            if (pk.utf == 125/*[}]*/) {
                /*peek*/
                /*
                   222 class_declaration=>τclass • { } 
                */
                if (assert_consume(l, l.utf == 123/*[{]*/)) {
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if (assert_consume(l, l.utf == 125/*[}]*/)) {
                        add_reduce(3, 137);
                        prod = 82;
                    }
                }
            } else if ((assert_table(pk, 0x0, 0x8000494, 0x88000000, 0x0)/*tbl:[ ; ] [ [ ] [ ' ] [ " ] [ _ ] [ $ ] [ * ]*/ || pk.isNum()/*[num]*/) || pk.isID()/*[id]*/) {
                /*peek*/
                /*
                   219 class_declaration=>τclass • { class_body } 
                */
                if (assert_consume(l, l.utf == 123/*[{]*/)) {
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if ($class_body(l)) {
                        skip_fn_(l/*[ ws ][ nl ]*/);
                        if (assert_consume(l, l.utf == 125/*[}]*/)) {
                            add_reduce(4, 134);
                            prod = 82;
                        }
                    }
                }
            }
        } else if (cpa74f084c_(l)/*[extends]*/) {
            /*peek-production-closure*/
            /*
               216 class_declaration=>τclass • class_heritage { class_body } 
               220 class_declaration=>τclass • class_heritage { } 
            */
            skip_fn_(l/*[ ws ][ nl ]*/);
            if ($class_heritage(l)) {
                /*assert*/
                /*
                   216 class_declaration=>τclass • class_heritage { class_body } 
                   220 class_declaration=>τclass • class_heritage { } 
                */
                skip_fn_(l/*[ ws ][ nl ]*/);
                if (assert_consume(l, l.utf == 123/*[{]*/)) {
                    /*consume*/
                    /*
                       216 class_declaration=>τclass class_heritage { • class_body } 
                       220 class_declaration=>τclass class_heritage { • } 
                    */
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if (assert_consume(l, l.utf == 125/*[}]*/)) {
                        /*consume*/
                        /*
                           220 class_declaration=>τclass class_heritage { } • 
                        */
                        add_reduce(4, 135);
                        prod = 82;
                    } else {
                        /*assert-production-closure*/
                        /*
                           216 class_declaration=>τclass class_heritage { • class_body } 
                        */
                        if ($class_body(l)) {
                            skip_fn_(l/*[ ws ][ nl ]*/);
                            if (assert_consume(l, l.utf == 125/*[}]*/)) {
                                add_reduce(5, 131);
                                prod = 82;
                            }
                        }
                    }
                }
            }
        } else {
            /*peek-production-closure*/
            /*
               215 class_declaration=>τclass • binding_identifier class_heritage { class_body } 
               217 class_declaration=>τclass • binding_identifier { class_body } 
               218 class_declaration=>τclass • binding_identifier class_heritage { } 
               221 class_declaration=>τclass • binding_identifier { } 
            */
            skip_fn_(l/*[ ws ][ nl ]*/);
            if ($binding_identifier(l)) {
                /*assert*/
                /*
                   215 class_declaration=>τclass • binding_identifier class_heritage { class_body } 
                   217 class_declaration=>τclass • binding_identifier { class_body } 
                   218 class_declaration=>τclass • binding_identifier class_heritage { } 
                   221 class_declaration=>τclass • binding_identifier { } 
                */
                if (l.utf == 123/*[{]*/) {
                    /*peek*/
                    /*
                       217 class_declaration=>τclass binding_identifier • { class_body } 
                       221 class_declaration=>τclass binding_identifier • { } 
                    */
                    let pk: Lexer = l.copy();
                    skip_fn_(pk.next()/*[ ws ][ nl ]*/);
                    if (pk.utf == 125/*[}]*/) {
                        /*peek*/
                        /*
                           221 class_declaration=>τclass binding_identifier • { } 
                        */
                        if (assert_consume(l, l.utf == 123/*[{]*/)) {
                            skip_fn_(l/*[ ws ][ nl ]*/);
                            if (assert_consume(l, l.utf == 125/*[}]*/)) {
                                add_reduce(4, 136);
                                prod = 82;
                            }
                        }
                    } else if ((assert_table(pk, 0x0, 0x8000494, 0x88000000, 0x0)/*tbl:[ ; ] [ [ ] [ ' ] [ " ] [ _ ] [ $ ] [ * ]*/ || pk.isNum()/*[num]*/) || pk.isID()/*[id]*/) {
                        /*peek*/
                        /*
                           217 class_declaration=>τclass binding_identifier • { class_body } 
                        */
                        if (assert_consume(l, l.utf == 123/*[{]*/)) {
                            skip_fn_(l/*[ ws ][ nl ]*/);
                            if ($class_body(l)) {
                                skip_fn_(l/*[ ws ][ nl ]*/);
                                if (assert_consume(l, l.utf == 125/*[}]*/)) {
                                    add_reduce(5, 132);
                                    prod = 82;
                                }
                            }
                        }
                    }
                } else {
                    /*peek-production-closure*/
                    /*
                       215 class_declaration=>τclass binding_identifier • class_heritage { class_body } 
                       218 class_declaration=>τclass binding_identifier • class_heritage { } 
                    */
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if ($class_heritage(l)) {
                        /*assert*/
                        /*
                           215 class_declaration=>τclass binding_identifier • class_heritage { class_body } 
                           218 class_declaration=>τclass binding_identifier • class_heritage { } 
                        */
                        skip_fn_(l/*[ ws ][ nl ]*/);
                        if (assert_consume(l, l.utf == 123/*[{]*/)) {
                            /*consume*/
                            /*
                               215 class_declaration=>τclass binding_identifier class_heritage { • class_body } 
                               218 class_declaration=>τclass binding_identifier class_heritage { • } 
                            */
                            skip_fn_(l/*[ ws ][ nl ]*/);
                            if (assert_consume(l, l.utf == 125/*[}]*/)) {
                                /*consume*/
                                /*
                                   218 class_declaration=>τclass binding_identifier class_heritage { } • 
                                */
                                add_reduce(5, 133);
                                prod = 82;
                            } else {
                                /*assert-production-closure*/
                                /*
                                   215 class_declaration=>τclass binding_identifier class_heritage { • class_body } 
                                */
                                if ($class_body(l)) {
                                    skip_fn_(l/*[ ws ][ nl ]*/);
                                    if (assert_consume(l, l.utf == 125/*[}]*/)) {
                                        add_reduce(6, 130);
                                        prod = 82;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return assertSuccess(l, prod == 82);
}
function $class_expression(l: Lexer): boolean {
    if (assert_consume(l, cp1f027896_(l)/*[class]*/)) {
        /*consume*/
        /*
           223 class_expression=>τclass • binding_identifier class_heritage { class_body } 
           224 class_expression=>τclass • class_heritage { class_body } 
           225 class_expression=>τclass • binding_identifier { class_body } 
           226 class_expression=>τclass • binding_identifier class_heritage { } 
           227 class_expression=>τclass • { class_body } 
           228 class_expression=>τclass • class_heritage { } 
           229 class_expression=>τclass • binding_identifier { } 
           230 class_expression=>τclass • { } 
        */
        if (l.utf == 123/*[{]*/) {
            /*peek*/
            /*
               227 class_expression=>τclass • { class_body } 
               230 class_expression=>τclass • { } 
            */
            let pk: Lexer = l.copy();
            skip_fn_(pk.next()/*[ ws ][ nl ]*/);
            if (pk.utf == 125/*[}]*/) {
                /*peek*/
                /*
                   230 class_expression=>τclass • { } 
                */
                if (assert_consume(l, l.utf == 123/*[{]*/)) {
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if (assert_consume(l, l.utf == 125/*[}]*/)) {
                        add_reduce(3, 137);
                        prod = 83;
                    }
                }
            } else if ((assert_table(pk, 0x0, 0x8000494, 0x88000000, 0x0)/*tbl:[ ; ] [ [ ] [ ' ] [ " ] [ _ ] [ $ ] [ * ]*/ || pk.isNum()/*[num]*/) || pk.isID()/*[id]*/) {
                /*peek*/
                /*
                   227 class_expression=>τclass • { class_body } 
                */
                if (assert_consume(l, l.utf == 123/*[{]*/)) {
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if ($class_body(l)) {
                        skip_fn_(l/*[ ws ][ nl ]*/);
                        if (assert_consume(l, l.utf == 125/*[}]*/)) {
                            add_reduce(4, 134);
                            prod = 83;
                        }
                    }
                }
            }
        } else if (cpa74f084c_(l)/*[extends]*/) {
            /*peek-production-closure*/
            /*
               224 class_expression=>τclass • class_heritage { class_body } 
               228 class_expression=>τclass • class_heritage { } 
            */
            skip_fn_(l/*[ ws ][ nl ]*/);
            if ($class_heritage(l)) {
                /*assert*/
                /*
                   224 class_expression=>τclass • class_heritage { class_body } 
                   228 class_expression=>τclass • class_heritage { } 
                */
                skip_fn_(l/*[ ws ][ nl ]*/);
                if (assert_consume(l, l.utf == 123/*[{]*/)) {
                    /*consume*/
                    /*
                       224 class_expression=>τclass class_heritage { • class_body } 
                       228 class_expression=>τclass class_heritage { • } 
                    */
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if (assert_consume(l, l.utf == 125/*[}]*/)) {
                        /*consume*/
                        /*
                           228 class_expression=>τclass class_heritage { } • 
                        */
                        add_reduce(4, 135);
                        prod = 83;
                    } else {
                        /*assert-production-closure*/
                        /*
                           224 class_expression=>τclass class_heritage { • class_body } 
                        */
                        if ($class_body(l)) {
                            skip_fn_(l/*[ ws ][ nl ]*/);
                            if (assert_consume(l, l.utf == 125/*[}]*/)) {
                                add_reduce(5, 131);
                                prod = 83;
                            }
                        }
                    }
                }
            }
        } else {
            /*peek-production-closure*/
            /*
               223 class_expression=>τclass • binding_identifier class_heritage { class_body } 
               225 class_expression=>τclass • binding_identifier { class_body } 
               226 class_expression=>τclass • binding_identifier class_heritage { } 
               229 class_expression=>τclass • binding_identifier { } 
            */
            skip_fn_(l/*[ ws ][ nl ]*/);
            if ($binding_identifier(l)) {
                /*assert*/
                /*
                   223 class_expression=>τclass • binding_identifier class_heritage { class_body } 
                   225 class_expression=>τclass • binding_identifier { class_body } 
                   226 class_expression=>τclass • binding_identifier class_heritage { } 
                   229 class_expression=>τclass • binding_identifier { } 
                */
                if (l.utf == 123/*[{]*/) {
                    /*peek*/
                    /*
                       225 class_expression=>τclass binding_identifier • { class_body } 
                       229 class_expression=>τclass binding_identifier • { } 
                    */
                    let pk: Lexer = l.copy();
                    skip_fn_(pk.next()/*[ ws ][ nl ]*/);
                    if (pk.utf == 125/*[}]*/) {
                        /*peek*/
                        /*
                           229 class_expression=>τclass binding_identifier • { } 
                        */
                        if (assert_consume(l, l.utf == 123/*[{]*/)) {
                            skip_fn_(l/*[ ws ][ nl ]*/);
                            if (assert_consume(l, l.utf == 125/*[}]*/)) {
                                add_reduce(4, 136);
                                prod = 83;
                            }
                        }
                    } else if ((assert_table(pk, 0x0, 0x8000494, 0x88000000, 0x0)/*tbl:[ ; ] [ [ ] [ ' ] [ " ] [ _ ] [ $ ] [ * ]*/ || pk.isNum()/*[num]*/) || pk.isID()/*[id]*/) {
                        /*peek*/
                        /*
                           225 class_expression=>τclass binding_identifier • { class_body } 
                        */
                        if (assert_consume(l, l.utf == 123/*[{]*/)) {
                            skip_fn_(l/*[ ws ][ nl ]*/);
                            if ($class_body(l)) {
                                skip_fn_(l/*[ ws ][ nl ]*/);
                                if (assert_consume(l, l.utf == 125/*[}]*/)) {
                                    add_reduce(5, 132);
                                    prod = 83;
                                }
                            }
                        }
                    }
                } else {
                    /*peek-production-closure*/
                    /*
                       223 class_expression=>τclass binding_identifier • class_heritage { class_body } 
                       226 class_expression=>τclass binding_identifier • class_heritage { } 
                    */
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if ($class_heritage(l)) {
                        /*assert*/
                        /*
                           223 class_expression=>τclass binding_identifier • class_heritage { class_body } 
                           226 class_expression=>τclass binding_identifier • class_heritage { } 
                        */
                        skip_fn_(l/*[ ws ][ nl ]*/);
                        if (assert_consume(l, l.utf == 123/*[{]*/)) {
                            /*consume*/
                            /*
                               223 class_expression=>τclass binding_identifier class_heritage { • class_body } 
                               226 class_expression=>τclass binding_identifier class_heritage { • } 
                            */
                            skip_fn_(l/*[ ws ][ nl ]*/);
                            if (assert_consume(l, l.utf == 125/*[}]*/)) {
                                /*consume*/
                                /*
                                   226 class_expression=>τclass binding_identifier class_heritage { } • 
                                */
                                add_reduce(5, 133);
                                prod = 83;
                            } else {
                                /*assert-production-closure*/
                                /*
                                   223 class_expression=>τclass binding_identifier class_heritage { • class_body } 
                                */
                                if ($class_body(l)) {
                                    skip_fn_(l/*[ ws ][ nl ]*/);
                                    if (assert_consume(l, l.utf == 125/*[}]*/)) {
                                        add_reduce(6, 130);
                                        prod = 83;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return assertSuccess(l, prod == 83);
}
function $class_heritage(l: Lexer): boolean {
    if (assert_consume(l, cpa74f084c_(l)/*[extends]*/)) {
        /*consume*/
        /*
           231 class_heritage=>τextends • left_hand_side_expression 
        */
        skip_fn_(l/*[ ws ][ nl ]*/);
        if ($left_hand_side_expression(l)) {
            add_reduce(2, 0);
            prod = 84;
        }
    }
    return assertSuccess(l, prod == 84);
}
function $class_body(l: Lexer): boolean {
    if (assert_consume(l, l.utf == 59/*[;]*/)) {
        /*consume*/
        /*
           235 class_body=>; • 
        */
        add_reduce(1, 140);
        prod = 85;
    } else {
        /*assert-production-closure*/
        /*
           232 class_body=>• class_element 
        */
        if ($class_element(l)) {
            add_reduce(1, 4);
            prod = 85;
        }
    }
    while (prod == 85) {
        let ACCEPT: boolean = false;
        skip_fn_(l/*[ ws ][ nl ]*/);
        if (assert_consume(l, l.utf == 59/*[;]*/)) {
            /*consume*/
            /*
               234 class_body=>class_body ; • 
            */
            add_reduce(2, 139);
            prod = 85;
            ACCEPT = true;
        } else if ((assert_table(l, 0x0, 0x494, 0x88000000, 0x0)/*tbl:[ [ ] [ ' ] [ " ] [ _ ] [ $ ] [ * ]*/ || l.isNum()/*[num]*/) || l.isID()/*[id]*/) {
            /*assert-production-closure*/
            /*
               233 class_body=>class_body • class_element 
            */
            if ($class_element(l)) {
                add_reduce(2, 138);
                prod = 85;
                ACCEPT = true;
            }
        }
        if (!ACCEPT) {
            break;
        }
    }
    return assertSuccess(l, prod == 85);
}
function $class_element(l: Lexer): boolean {
    if (assert_consume(l, cpef2cb0a4_(l)/*[static]*/)) {
        /*consume*/
        /*
           237 class_element=>τstatic • method_definition 
        */
        skip_fn_(l/*[ ws ][ nl ]*/);
        if ($method_definition(l)) {
            add_reduce(2, 141);
            prod = 86;
        }
    } else {
        /*assert-production-closure*/
        /*
           236 class_element=>• method_definition 
        */
        if ($method_definition(l)) {
            prod = 86;
        }
    }
    return assertSuccess(l, prod == 86);
}
function $method_definition(l: Lexer): boolean {
    if (l.utf == 42/*[asterisk]*/) {
        /*peek-production-closure*/
        /*
           241 method_definition=>• function_declaration_group_0115_109 property_name ( unique_formal_parameters ) { function_body } 
           248 method_definition=>• function_declaration_group_0115_109 property_name ( ) { function_body } 
           249 method_definition=>• function_declaration_group_0115_109 property_name ( unique_formal_parameters ) { } 
           255 method_definition=>• function_declaration_group_0115_109 property_name ( ) { } 
        */
        skip_fn_(l/*[ ws ][ nl ]*/);
        if ($function_declaration_group_0115_109(l)) {
            /*assert*/
            /*
               241 method_definition=>• function_declaration_group_0115_109 property_name ( unique_formal_parameters ) { function_body } 
               248 method_definition=>• function_declaration_group_0115_109 property_name ( ) { function_body } 
               249 method_definition=>• function_declaration_group_0115_109 property_name ( unique_formal_parameters ) { } 
               255 method_definition=>• function_declaration_group_0115_109 property_name ( ) { } 
            */
            skip_fn_(l/*[ ws ][ nl ]*/);
            if ($property_name(l)) {
                /*assert*/
                /*
                   241 method_definition=>function_declaration_group_0115_109 • property_name ( unique_formal_parameters ) { function_body } 
                   248 method_definition=>function_declaration_group_0115_109 • property_name ( ) { function_body } 
                   249 method_definition=>function_declaration_group_0115_109 • property_name ( unique_formal_parameters ) { } 
                   255 method_definition=>function_declaration_group_0115_109 • property_name ( ) { } 
                */
                skip_fn_(l/*[ ws ][ nl ]*/);
                if (assert_consume(l, l.utf == 40/*[(]*/)) {
                    /*consume*/
                    /*
                       241 method_definition=>function_declaration_group_0115_109 property_name ( • unique_formal_parameters ) { function_body } 
                       248 method_definition=>function_declaration_group_0115_109 property_name ( • ) { function_body } 
                       249 method_definition=>function_declaration_group_0115_109 property_name ( • unique_formal_parameters ) { } 
                       255 method_definition=>function_declaration_group_0115_109 property_name ( • ) { } 
                    */
                    if (l.utf == 41/*[)]*/) {
                        /*peek*/
                        /*
                           248 method_definition=>function_declaration_group_0115_109 property_name ( • ) { function_body } 
                           255 method_definition=>function_declaration_group_0115_109 property_name ( • ) { } 
                        */
                        skip_fn_(l/*[ ws ][ nl ]*/);
                        if (assert_consume(l, l.utf == 41/*[)]*/)) {
                            /*consume*/
                            /*
                               248 method_definition=>function_declaration_group_0115_109 property_name ( ) • { function_body } 
                               255 method_definition=>function_declaration_group_0115_109 property_name ( ) • { } 
                            */
                            skip_fn_(l/*[ ws ][ nl ]*/);
                            if (assert_consume(l, l.utf == 123/*[{]*/)) {
                                /*consume*/
                                /*
                                   248 method_definition=>function_declaration_group_0115_109 property_name ( ) { • function_body } 
                                   255 method_definition=>function_declaration_group_0115_109 property_name ( ) { • } 
                                */
                                skip_fn_(l/*[ ws ][ nl ]*/);
                                if (l.utf == 125/*[}]*/) {
                                    /*peek*/
                                    /*
                                       248 method_definition=>function_declaration_group_0115_109 property_name ( ) { • function_body } 
                                       255 method_definition=>function_declaration_group_0115_109 property_name ( ) { • } 
                                    */
                                    let pk: Lexer = l.copy();
                                    skip_fn_(pk.next()/*[ ws ][ nl ]*/);
                                    if ((assert_table(pk, 0x0, 0x8001494, 0x88000000, 0x20000000)/*tbl:[ , ] [ ; ] [ [ ] [ ' ] [ " ] [ _ ] [ $ ] [ * ] [ } ]*/ || pk.isNum()/*[num]*/) || pk.isID()/*[id]*/) {
                                        /*peek*/
                                        /*
                                           255 method_definition=>function_declaration_group_0115_109 property_name ( ) { • } 
                                        */
                                        if (assert_consume(l, l.utf == 125/*[}]*/)) {
                                            add_reduce(6, 159);
                                            prod = 87;
                                        }
                                    }
                                } else {
                                    /*assert-production-closure*/
                                    /*
                                       248 method_definition=>function_declaration_group_0115_109 property_name ( ) { • function_body } 
                                    */
                                    if ($function_statement_list(l)) {
                                        add_reduce(1, 120);
                                        skip_fn_(l/*[ ws ][ nl ]*/);
                                        if (assert_consume(l, l.utf == 125/*[}]*/)) {
                                            add_reduce(7, 152);
                                            prod = 87;
                                        }
                                    }
                                }
                            }
                        }
                    } else {
                        /*peek-production-closure*/
                        /*
                           241 method_definition=>function_declaration_group_0115_109 property_name ( • unique_formal_parameters ) { function_body } 
                           249 method_definition=>function_declaration_group_0115_109 property_name ( • unique_formal_parameters ) { } 
                        */
                        skip_fn_(l/*[ ws ][ nl ]*/);
                        if ($unique_formal_parameters(l)) {
                            /*assert*/
                            /*
                               241 method_definition=>function_declaration_group_0115_109 property_name ( • unique_formal_parameters ) { function_body } 
                               249 method_definition=>function_declaration_group_0115_109 property_name ( • unique_formal_parameters ) { } 
                            */
                            skip_fn_(l/*[ ws ][ nl ]*/);
                            if (assert_consume(l, l.utf == 41/*[)]*/)) {
                                /*consume*/
                                /*
                                   241 method_definition=>function_declaration_group_0115_109 property_name ( unique_formal_parameters ) • { function_body } 
                                   249 method_definition=>function_declaration_group_0115_109 property_name ( unique_formal_parameters ) • { } 
                                */
                                skip_fn_(l/*[ ws ][ nl ]*/);
                                if (assert_consume(l, l.utf == 123/*[{]*/)) {
                                    /*consume*/
                                    /*
                                       241 method_definition=>function_declaration_group_0115_109 property_name ( unique_formal_parameters ) { • function_body } 
                                       249 method_definition=>function_declaration_group_0115_109 property_name ( unique_formal_parameters ) { • } 
                                    */
                                    skip_fn_(l/*[ ws ][ nl ]*/);
                                    if (l.utf == 125/*[}]*/) {
                                        /*peek*/
                                        /*
                                           241 method_definition=>function_declaration_group_0115_109 property_name ( unique_formal_parameters ) { • function_body } 
                                           249 method_definition=>function_declaration_group_0115_109 property_name ( unique_formal_parameters ) { • } 
                                        */
                                        let pk: Lexer = l.copy();
                                        skip_fn_(pk.next()/*[ ws ][ nl ]*/);
                                        if ((assert_table(pk, 0x0, 0x8001494, 0x88000000, 0x20000000)/*tbl:[ , ] [ ; ] [ [ ] [ ' ] [ " ] [ _ ] [ $ ] [ * ] [ } ]*/ || pk.isNum()/*[num]*/) || pk.isID()/*[id]*/) {
                                            /*peek*/
                                            /*
                                               249 method_definition=>function_declaration_group_0115_109 property_name ( unique_formal_parameters ) { • } 
                                            */
                                            if (assert_consume(l, l.utf == 125/*[}]*/)) {
                                                add_reduce(7, 153);
                                                prod = 87;
                                            }
                                        }
                                    } else {
                                        /*assert-production-closure*/
                                        /*
                                           241 method_definition=>function_declaration_group_0115_109 property_name ( unique_formal_parameters ) { • function_body } 
                                        */
                                        if ($function_statement_list(l)) {
                                            add_reduce(1, 120);
                                            skip_fn_(l/*[ ws ][ nl ]*/);
                                            if (assert_consume(l, l.utf == 125/*[}]*/)) {
                                                add_reduce(8, 145);
                                                prod = 87;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    } else if (cp248c12d4_(l)/*[set]*/) {
        /*peek*/
        /*
           240 method_definition=>• τset property_name ( property_set_parameter_list ) { function_body } 
           246 method_definition=>• τset property_name ( property_set_parameter_list ) { } 
           247 method_definition=>• property_name ( unique_formal_parameters ) { function_body } 
           253 method_definition=>• property_name ( ) { function_body } 
           254 method_definition=>• property_name ( unique_formal_parameters ) { } 
           257 method_definition=>• property_name ( ) { } 
        */
        let pk: Lexer = l.copy();
        skip_fn_(pk.next()/*[ ws ][ nl ]*/);
        if (pk.utf == 40/*[(]*/) {
            /*peek-production-closure*/
            /*
               247 method_definition=>• property_name ( unique_formal_parameters ) { function_body } 
               253 method_definition=>• property_name ( ) { function_body } 
               254 method_definition=>• property_name ( unique_formal_parameters ) { } 
               257 method_definition=>• property_name ( ) { } 
            */
            skip_fn_(l/*[ ws ][ nl ]*/);
            if ($property_name(l)) {
                /*assert*/
                /*
                   247 method_definition=>• property_name ( unique_formal_parameters ) { function_body } 
                   253 method_definition=>• property_name ( ) { function_body } 
                   254 method_definition=>• property_name ( unique_formal_parameters ) { } 
                   257 method_definition=>• property_name ( ) { } 
                */
                skip_fn_(l/*[ ws ][ nl ]*/);
                if (assert_consume(l, l.utf == 40/*[(]*/)) {
                    /*consume*/
                    /*
                       247 method_definition=>property_name ( • unique_formal_parameters ) { function_body } 
                       253 method_definition=>property_name ( • ) { function_body } 
                       254 method_definition=>property_name ( • unique_formal_parameters ) { } 
                       257 method_definition=>property_name ( • ) { } 
                    */
                    if (l.utf == 41/*[)]*/) {
                        /*peek*/
                        /*
                           253 method_definition=>property_name ( • ) { function_body } 
                           257 method_definition=>property_name ( • ) { } 
                        */
                        skip_fn_(l/*[ ws ][ nl ]*/);
                        if (assert_consume(l, l.utf == 41/*[)]*/)) {
                            /*consume*/
                            /*
                               253 method_definition=>property_name ( ) • { function_body } 
                               257 method_definition=>property_name ( ) • { } 
                            */
                            skip_fn_(l/*[ ws ][ nl ]*/);
                            if (assert_consume(l, l.utf == 123/*[{]*/)) {
                                /*consume*/
                                /*
                                   253 method_definition=>property_name ( ) { • function_body } 
                                   257 method_definition=>property_name ( ) { • } 
                                */
                                skip_fn_(l/*[ ws ][ nl ]*/);
                                if (l.utf == 125/*[}]*/) {
                                    /*peek*/
                                    /*
                                       253 method_definition=>property_name ( ) { • function_body } 
                                       257 method_definition=>property_name ( ) { • } 
                                    */
                                    let pk: Lexer = l.copy();
                                    skip_fn_(pk.next()/*[ ws ][ nl ]*/);
                                    if ((assert_table(pk, 0x0, 0x8001494, 0x88000000, 0x20000000)/*tbl:[ , ] [ ; ] [ [ ] [ ' ] [ " ] [ _ ] [ $ ] [ * ] [ } ]*/ || pk.isNum()/*[num]*/) || pk.isID()/*[id]*/) {
                                        /*peek*/
                                        /*
                                           257 method_definition=>property_name ( ) { • } 
                                        */
                                        if (assert_consume(l, l.utf == 125/*[}]*/)) {
                                            add_reduce(5, 161);
                                            prod = 87;
                                        }
                                    }
                                } else {
                                    /*assert-production-closure*/
                                    /*
                                       253 method_definition=>property_name ( ) { • function_body } 
                                    */
                                    if ($function_statement_list(l)) {
                                        add_reduce(1, 120);
                                        skip_fn_(l/*[ ws ][ nl ]*/);
                                        if (assert_consume(l, l.utf == 125/*[}]*/)) {
                                            add_reduce(6, 157);
                                            prod = 87;
                                        }
                                    }
                                }
                            }
                        }
                    } else {
                        /*peek-production-closure*/
                        /*
                           247 method_definition=>property_name ( • unique_formal_parameters ) { function_body } 
                           254 method_definition=>property_name ( • unique_formal_parameters ) { } 
                        */
                        skip_fn_(l/*[ ws ][ nl ]*/);
                        if ($unique_formal_parameters(l)) {
                            /*assert*/
                            /*
                               247 method_definition=>property_name ( • unique_formal_parameters ) { function_body } 
                               254 method_definition=>property_name ( • unique_formal_parameters ) { } 
                            */
                            skip_fn_(l/*[ ws ][ nl ]*/);
                            if (assert_consume(l, l.utf == 41/*[)]*/)) {
                                /*consume*/
                                /*
                                   247 method_definition=>property_name ( unique_formal_parameters ) • { function_body } 
                                   254 method_definition=>property_name ( unique_formal_parameters ) • { } 
                                */
                                skip_fn_(l/*[ ws ][ nl ]*/);
                                if (assert_consume(l, l.utf == 123/*[{]*/)) {
                                    /*consume*/
                                    /*
                                       247 method_definition=>property_name ( unique_formal_parameters ) { • function_body } 
                                       254 method_definition=>property_name ( unique_formal_parameters ) { • } 
                                    */
                                    skip_fn_(l/*[ ws ][ nl ]*/);
                                    if (l.utf == 125/*[}]*/) {
                                        /*peek*/
                                        /*
                                           247 method_definition=>property_name ( unique_formal_parameters ) { • function_body } 
                                           254 method_definition=>property_name ( unique_formal_parameters ) { • } 
                                        */
                                        let pk: Lexer = l.copy();
                                        skip_fn_(pk.next()/*[ ws ][ nl ]*/);
                                        if ((assert_table(pk, 0x0, 0x8001494, 0x88000000, 0x20000000)/*tbl:[ , ] [ ; ] [ [ ] [ ' ] [ " ] [ _ ] [ $ ] [ * ] [ } ]*/ || pk.isNum()/*[num]*/) || pk.isID()/*[id]*/) {
                                            /*peek*/
                                            /*
                                               254 method_definition=>property_name ( unique_formal_parameters ) { • } 
                                            */
                                            if (assert_consume(l, l.utf == 125/*[}]*/)) {
                                                add_reduce(6, 158);
                                                prod = 87;
                                            }
                                        }
                                    } else {
                                        /*assert-production-closure*/
                                        /*
                                           247 method_definition=>property_name ( unique_formal_parameters ) { • function_body } 
                                        */
                                        if ($function_statement_list(l)) {
                                            add_reduce(1, 120);
                                            skip_fn_(l/*[ ws ][ nl ]*/);
                                            if (assert_consume(l, l.utf == 125/*[}]*/)) {
                                                add_reduce(7, 151);
                                                prod = 87;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        } else if ((assert_table(pk, 0x0, 0x94, 0x88000000, 0x0)/*tbl:[ [ ] [ ' ] [ " ] [ _ ] [ $ ]*/ || pk.isNum()/*[num]*/) || pk.isID()/*[id]*/) {
            /*peek*/
            /*
               240 method_definition=>• τset property_name ( property_set_parameter_list ) { function_body } 
               246 method_definition=>• τset property_name ( property_set_parameter_list ) { } 
            */
            skip_fn_(l/*[ ws ][ nl ]*/);
            if (assert_consume(l, cp248c12d4_(l)/*[set]*/)) {
                /*consume*/
                /*
                   240 method_definition=>τset • property_name ( property_set_parameter_list ) { function_body } 
                   246 method_definition=>τset • property_name ( property_set_parameter_list ) { } 
                */
                skip_fn_(l/*[ ws ][ nl ]*/);
                if ($property_name(l)) {
                    /*assert*/
                    /*
                       240 method_definition=>τset • property_name ( property_set_parameter_list ) { function_body } 
                       246 method_definition=>τset • property_name ( property_set_parameter_list ) { } 
                    */
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if (assert_consume(l, l.utf == 40/*[(]*/)) {
                        /*consume*/
                        /*
                           240 method_definition=>τset property_name ( • property_set_parameter_list ) { function_body } 
                           246 method_definition=>τset property_name ( • property_set_parameter_list ) { } 
                        */
                        skip_fn_(l/*[ ws ][ nl ]*/);
                        if ($property_set_parameter_list(l)) {
                            /*assert*/
                            /*
                               240 method_definition=>τset property_name ( • property_set_parameter_list ) { function_body } 
                               246 method_definition=>τset property_name ( • property_set_parameter_list ) { } 
                            */
                            skip_fn_(l/*[ ws ][ nl ]*/);
                            if (assert_consume(l, l.utf == 41/*[)]*/)) {
                                /*consume*/
                                /*
                                   240 method_definition=>τset property_name ( property_set_parameter_list ) • { function_body } 
                                   246 method_definition=>τset property_name ( property_set_parameter_list ) • { } 
                                */
                                skip_fn_(l/*[ ws ][ nl ]*/);
                                if (assert_consume(l, l.utf == 123/*[{]*/)) {
                                    /*consume*/
                                    /*
                                       240 method_definition=>τset property_name ( property_set_parameter_list ) { • function_body } 
                                       246 method_definition=>τset property_name ( property_set_parameter_list ) { • } 
                                    */
                                    skip_fn_(l/*[ ws ][ nl ]*/);
                                    if (l.utf == 125/*[}]*/) {
                                        /*peek*/
                                        /*
                                           240 method_definition=>τset property_name ( property_set_parameter_list ) { • function_body } 
                                           246 method_definition=>τset property_name ( property_set_parameter_list ) { • } 
                                        */
                                        let pk: Lexer = l.copy();
                                        skip_fn_(pk.next()/*[ ws ][ nl ]*/);
                                        if ((assert_table(pk, 0x0, 0x8001494, 0x88000000, 0x20000000)/*tbl:[ , ] [ ; ] [ [ ] [ ' ] [ " ] [ _ ] [ $ ] [ * ] [ } ]*/ || pk.isNum()/*[num]*/) || pk.isID()/*[id]*/) {
                                            /*peek*/
                                            /*
                                               246 method_definition=>τset property_name ( property_set_parameter_list ) { • } 
                                            */
                                            if (assert_consume(l, l.utf == 125/*[}]*/)) {
                                                add_reduce(7, 150);
                                                prod = 87;
                                            }
                                        }
                                    } else {
                                        /*assert-production-closure*/
                                        /*
                                           240 method_definition=>τset property_name ( property_set_parameter_list ) { • function_body } 
                                        */
                                        if ($function_statement_list(l)) {
                                            add_reduce(1, 120);
                                            skip_fn_(l/*[ ws ][ nl ]*/);
                                            if (assert_consume(l, l.utf == 125/*[}]*/)) {
                                                add_reduce(8, 144);
                                                prod = 87;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    } else if (cp47b3f727_(l)/*[get]*/) {
        /*peek*/
        /*
           239 method_definition=>• τget property_name ( ) { function_body } 
           245 method_definition=>• τget property_name ( ) { } 
           247 method_definition=>• property_name ( unique_formal_parameters ) { function_body } 
           253 method_definition=>• property_name ( ) { function_body } 
           254 method_definition=>• property_name ( unique_formal_parameters ) { } 
           257 method_definition=>• property_name ( ) { } 
        */
        let pk: Lexer = l.copy();
        skip_fn_(pk.next()/*[ ws ][ nl ]*/);
        if (pk.utf == 40/*[(]*/) {
            /*peek-production-closure*/
            /*
               247 method_definition=>• property_name ( unique_formal_parameters ) { function_body } 
               253 method_definition=>• property_name ( ) { function_body } 
               254 method_definition=>• property_name ( unique_formal_parameters ) { } 
               257 method_definition=>• property_name ( ) { } 
            */
            skip_fn_(l/*[ ws ][ nl ]*/);
            if ($property_name(l)) {
                /*assert*/
                /*
                   247 method_definition=>• property_name ( unique_formal_parameters ) { function_body } 
                   253 method_definition=>• property_name ( ) { function_body } 
                   254 method_definition=>• property_name ( unique_formal_parameters ) { } 
                   257 method_definition=>• property_name ( ) { } 
                */
                skip_fn_(l/*[ ws ][ nl ]*/);
                if (assert_consume(l, l.utf == 40/*[(]*/)) {
                    /*consume*/
                    /*
                       247 method_definition=>property_name ( • unique_formal_parameters ) { function_body } 
                       253 method_definition=>property_name ( • ) { function_body } 
                       254 method_definition=>property_name ( • unique_formal_parameters ) { } 
                       257 method_definition=>property_name ( • ) { } 
                    */
                    if (l.utf == 41/*[)]*/) {
                        /*peek*/
                        /*
                           253 method_definition=>property_name ( • ) { function_body } 
                           257 method_definition=>property_name ( • ) { } 
                        */
                        skip_fn_(l/*[ ws ][ nl ]*/);
                        if (assert_consume(l, l.utf == 41/*[)]*/)) {
                            /*consume*/
                            /*
                               253 method_definition=>property_name ( ) • { function_body } 
                               257 method_definition=>property_name ( ) • { } 
                            */
                            skip_fn_(l/*[ ws ][ nl ]*/);
                            if (assert_consume(l, l.utf == 123/*[{]*/)) {
                                /*consume*/
                                /*
                                   253 method_definition=>property_name ( ) { • function_body } 
                                   257 method_definition=>property_name ( ) { • } 
                                */
                                skip_fn_(l/*[ ws ][ nl ]*/);
                                if (l.utf == 125/*[}]*/) {
                                    /*peek*/
                                    /*
                                       253 method_definition=>property_name ( ) { • function_body } 
                                       257 method_definition=>property_name ( ) { • } 
                                    */
                                    let pk: Lexer = l.copy();
                                    skip_fn_(pk.next()/*[ ws ][ nl ]*/);
                                    if ((assert_table(pk, 0x0, 0x8001494, 0x88000000, 0x20000000)/*tbl:[ , ] [ ; ] [ [ ] [ ' ] [ " ] [ _ ] [ $ ] [ * ] [ } ]*/ || pk.isNum()/*[num]*/) || pk.isID()/*[id]*/) {
                                        /*peek*/
                                        /*
                                           257 method_definition=>property_name ( ) { • } 
                                        */
                                        if (assert_consume(l, l.utf == 125/*[}]*/)) {
                                            add_reduce(5, 161);
                                            prod = 87;
                                        }
                                    }
                                } else {
                                    /*assert-production-closure*/
                                    /*
                                       253 method_definition=>property_name ( ) { • function_body } 
                                    */
                                    if ($function_statement_list(l)) {
                                        add_reduce(1, 120);
                                        skip_fn_(l/*[ ws ][ nl ]*/);
                                        if (assert_consume(l, l.utf == 125/*[}]*/)) {
                                            add_reduce(6, 157);
                                            prod = 87;
                                        }
                                    }
                                }
                            }
                        }
                    } else {
                        /*peek-production-closure*/
                        /*
                           247 method_definition=>property_name ( • unique_formal_parameters ) { function_body } 
                           254 method_definition=>property_name ( • unique_formal_parameters ) { } 
                        */
                        skip_fn_(l/*[ ws ][ nl ]*/);
                        if ($unique_formal_parameters(l)) {
                            /*assert*/
                            /*
                               247 method_definition=>property_name ( • unique_formal_parameters ) { function_body } 
                               254 method_definition=>property_name ( • unique_formal_parameters ) { } 
                            */
                            skip_fn_(l/*[ ws ][ nl ]*/);
                            if (assert_consume(l, l.utf == 41/*[)]*/)) {
                                /*consume*/
                                /*
                                   247 method_definition=>property_name ( unique_formal_parameters ) • { function_body } 
                                   254 method_definition=>property_name ( unique_formal_parameters ) • { } 
                                */
                                skip_fn_(l/*[ ws ][ nl ]*/);
                                if (assert_consume(l, l.utf == 123/*[{]*/)) {
                                    /*consume*/
                                    /*
                                       247 method_definition=>property_name ( unique_formal_parameters ) { • function_body } 
                                       254 method_definition=>property_name ( unique_formal_parameters ) { • } 
                                    */
                                    skip_fn_(l/*[ ws ][ nl ]*/);
                                    if (l.utf == 125/*[}]*/) {
                                        /*peek*/
                                        /*
                                           247 method_definition=>property_name ( unique_formal_parameters ) { • function_body } 
                                           254 method_definition=>property_name ( unique_formal_parameters ) { • } 
                                        */
                                        let pk: Lexer = l.copy();
                                        skip_fn_(pk.next()/*[ ws ][ nl ]*/);
                                        if ((assert_table(pk, 0x0, 0x8001494, 0x88000000, 0x20000000)/*tbl:[ , ] [ ; ] [ [ ] [ ' ] [ " ] [ _ ] [ $ ] [ * ] [ } ]*/ || pk.isNum()/*[num]*/) || pk.isID()/*[id]*/) {
                                            /*peek*/
                                            /*
                                               254 method_definition=>property_name ( unique_formal_parameters ) { • } 
                                            */
                                            if (assert_consume(l, l.utf == 125/*[}]*/)) {
                                                add_reduce(6, 158);
                                                prod = 87;
                                            }
                                        }
                                    } else {
                                        /*assert-production-closure*/
                                        /*
                                           247 method_definition=>property_name ( unique_formal_parameters ) { • function_body } 
                                        */
                                        if ($function_statement_list(l)) {
                                            add_reduce(1, 120);
                                            skip_fn_(l/*[ ws ][ nl ]*/);
                                            if (assert_consume(l, l.utf == 125/*[}]*/)) {
                                                add_reduce(7, 151);
                                                prod = 87;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        } else if ((assert_table(pk, 0x0, 0x94, 0x88000000, 0x0)/*tbl:[ [ ] [ ' ] [ " ] [ _ ] [ $ ]*/ || pk.isNum()/*[num]*/) || pk.isID()/*[id]*/) {
            /*peek*/
            /*
               239 method_definition=>• τget property_name ( ) { function_body } 
               245 method_definition=>• τget property_name ( ) { } 
            */
            skip_fn_(l/*[ ws ][ nl ]*/);
            if (assert_consume(l, cp47b3f727_(l)/*[get]*/)) {
                /*consume*/
                /*
                   239 method_definition=>τget • property_name ( ) { function_body } 
                   245 method_definition=>τget • property_name ( ) { } 
                */
                skip_fn_(l/*[ ws ][ nl ]*/);
                if ($property_name(l)) {
                    /*assert*/
                    /*
                       239 method_definition=>τget • property_name ( ) { function_body } 
                       245 method_definition=>τget • property_name ( ) { } 
                    */
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if (assert_consume(l, l.utf == 40/*[(]*/)) {
                        /*consume*/
                        /*
                           239 method_definition=>τget property_name ( • ) { function_body } 
                           245 method_definition=>τget property_name ( • ) { } 
                        */
                        skip_fn_(l/*[ ws ][ nl ]*/);
                        if (assert_consume(l, l.utf == 41/*[)]*/)) {
                            /*consume*/
                            /*
                               239 method_definition=>τget property_name ( ) • { function_body } 
                               245 method_definition=>τget property_name ( ) • { } 
                            */
                            skip_fn_(l/*[ ws ][ nl ]*/);
                            if (assert_consume(l, l.utf == 123/*[{]*/)) {
                                /*consume*/
                                /*
                                   239 method_definition=>τget property_name ( ) { • function_body } 
                                   245 method_definition=>τget property_name ( ) { • } 
                                */
                                skip_fn_(l/*[ ws ][ nl ]*/);
                                if (l.utf == 125/*[}]*/) {
                                    /*peek*/
                                    /*
                                       239 method_definition=>τget property_name ( ) { • function_body } 
                                       245 method_definition=>τget property_name ( ) { • } 
                                    */
                                    let pk: Lexer = l.copy();
                                    skip_fn_(pk.next()/*[ ws ][ nl ]*/);
                                    if ((assert_table(pk, 0x0, 0x8001494, 0x88000000, 0x20000000)/*tbl:[ , ] [ ; ] [ [ ] [ ' ] [ " ] [ _ ] [ $ ] [ * ] [ } ]*/ || pk.isNum()/*[num]*/) || pk.isID()/*[id]*/) {
                                        /*peek*/
                                        /*
                                           245 method_definition=>τget property_name ( ) { • } 
                                        */
                                        if (assert_consume(l, l.utf == 125/*[}]*/)) {
                                            add_reduce(6, 149);
                                            prod = 87;
                                        }
                                    }
                                } else {
                                    /*assert-production-closure*/
                                    /*
                                       239 method_definition=>τget property_name ( ) { • function_body } 
                                    */
                                    if ($function_statement_list(l)) {
                                        add_reduce(1, 120);
                                        skip_fn_(l/*[ ws ][ nl ]*/);
                                        if (assert_consume(l, l.utf == 125/*[}]*/)) {
                                            add_reduce(7, 143);
                                            prod = 87;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    } else if (cpdcbfef5f_(l)/*[async]*/) {
        /*peek*/
        /*
           238 method_definition=>• τasync function_declaration_group_0115_109 property_name ( unique_formal_parameters ) { function_body } 
           242 method_definition=>• τasync property_name ( unique_formal_parameters ) { function_body } 
           243 method_definition=>• τasync function_declaration_group_0115_109 property_name ( ) { function_body } 
           244 method_definition=>• τasync function_declaration_group_0115_109 property_name ( unique_formal_parameters ) { } 
           247 method_definition=>• property_name ( unique_formal_parameters ) { function_body } 
           250 method_definition=>• τasync property_name ( ) { function_body } 
           251 method_definition=>• τasync property_name ( unique_formal_parameters ) { } 
           252 method_definition=>• τasync function_declaration_group_0115_109 property_name ( ) { } 
           253 method_definition=>• property_name ( ) { function_body } 
           254 method_definition=>• property_name ( unique_formal_parameters ) { } 
           256 method_definition=>• τasync property_name ( ) { } 
           257 method_definition=>• property_name ( ) { } 
        */
        let pk: Lexer = l.copy();
        skip_fn_(pk.next()/*[ ws ][ nl ]*/);
        if (pk.utf == 40/*[(]*/) {
            /*peek-production-closure*/
            /*
               247 method_definition=>• property_name ( unique_formal_parameters ) { function_body } 
               253 method_definition=>• property_name ( ) { function_body } 
               254 method_definition=>• property_name ( unique_formal_parameters ) { } 
               257 method_definition=>• property_name ( ) { } 
            */
            skip_fn_(l/*[ ws ][ nl ]*/);
            if ($property_name(l)) {
                /*assert*/
                /*
                   247 method_definition=>• property_name ( unique_formal_parameters ) { function_body } 
                   253 method_definition=>• property_name ( ) { function_body } 
                   254 method_definition=>• property_name ( unique_formal_parameters ) { } 
                   257 method_definition=>• property_name ( ) { } 
                */
                skip_fn_(l/*[ ws ][ nl ]*/);
                if (assert_consume(l, l.utf == 40/*[(]*/)) {
                    /*consume*/
                    /*
                       247 method_definition=>property_name ( • unique_formal_parameters ) { function_body } 
                       253 method_definition=>property_name ( • ) { function_body } 
                       254 method_definition=>property_name ( • unique_formal_parameters ) { } 
                       257 method_definition=>property_name ( • ) { } 
                    */
                    if (l.utf == 41/*[)]*/) {
                        /*peek*/
                        /*
                           253 method_definition=>property_name ( • ) { function_body } 
                           257 method_definition=>property_name ( • ) { } 
                        */
                        skip_fn_(l/*[ ws ][ nl ]*/);
                        if (assert_consume(l, l.utf == 41/*[)]*/)) {
                            /*consume*/
                            /*
                               253 method_definition=>property_name ( ) • { function_body } 
                               257 method_definition=>property_name ( ) • { } 
                            */
                            skip_fn_(l/*[ ws ][ nl ]*/);
                            if (assert_consume(l, l.utf == 123/*[{]*/)) {
                                /*consume*/
                                /*
                                   253 method_definition=>property_name ( ) { • function_body } 
                                   257 method_definition=>property_name ( ) { • } 
                                */
                                skip_fn_(l/*[ ws ][ nl ]*/);
                                if (l.utf == 125/*[}]*/) {
                                    /*peek*/
                                    /*
                                       253 method_definition=>property_name ( ) { • function_body } 
                                       257 method_definition=>property_name ( ) { • } 
                                    */
                                    let pk: Lexer = l.copy();
                                    skip_fn_(pk.next()/*[ ws ][ nl ]*/);
                                    if ((assert_table(pk, 0x0, 0x8001494, 0x88000000, 0x20000000)/*tbl:[ , ] [ ; ] [ [ ] [ ' ] [ " ] [ _ ] [ $ ] [ * ] [ } ]*/ || pk.isNum()/*[num]*/) || pk.isID()/*[id]*/) {
                                        /*peek*/
                                        /*
                                           257 method_definition=>property_name ( ) { • } 
                                        */
                                        if (assert_consume(l, l.utf == 125/*[}]*/)) {
                                            add_reduce(5, 161);
                                            prod = 87;
                                        }
                                    }
                                } else {
                                    /*assert-production-closure*/
                                    /*
                                       253 method_definition=>property_name ( ) { • function_body } 
                                    */
                                    if ($function_statement_list(l)) {
                                        add_reduce(1, 120);
                                        skip_fn_(l/*[ ws ][ nl ]*/);
                                        if (assert_consume(l, l.utf == 125/*[}]*/)) {
                                            add_reduce(6, 157);
                                            prod = 87;
                                        }
                                    }
                                }
                            }
                        }
                    } else {
                        /*peek-production-closure*/
                        /*
                           247 method_definition=>property_name ( • unique_formal_parameters ) { function_body } 
                           254 method_definition=>property_name ( • unique_formal_parameters ) { } 
                        */
                        skip_fn_(l/*[ ws ][ nl ]*/);
                        if ($unique_formal_parameters(l)) {
                            /*assert*/
                            /*
                               247 method_definition=>property_name ( • unique_formal_parameters ) { function_body } 
                               254 method_definition=>property_name ( • unique_formal_parameters ) { } 
                            */
                            skip_fn_(l/*[ ws ][ nl ]*/);
                            if (assert_consume(l, l.utf == 41/*[)]*/)) {
                                /*consume*/
                                /*
                                   247 method_definition=>property_name ( unique_formal_parameters ) • { function_body } 
                                   254 method_definition=>property_name ( unique_formal_parameters ) • { } 
                                */
                                skip_fn_(l/*[ ws ][ nl ]*/);
                                if (assert_consume(l, l.utf == 123/*[{]*/)) {
                                    /*consume*/
                                    /*
                                       247 method_definition=>property_name ( unique_formal_parameters ) { • function_body } 
                                       254 method_definition=>property_name ( unique_formal_parameters ) { • } 
                                    */
                                    skip_fn_(l/*[ ws ][ nl ]*/);
                                    if (l.utf == 125/*[}]*/) {
                                        /*peek*/
                                        /*
                                           247 method_definition=>property_name ( unique_formal_parameters ) { • function_body } 
                                           254 method_definition=>property_name ( unique_formal_parameters ) { • } 
                                        */
                                        let pk: Lexer = l.copy();
                                        skip_fn_(pk.next()/*[ ws ][ nl ]*/);
                                        if ((assert_table(pk, 0x0, 0x8001494, 0x88000000, 0x20000000)/*tbl:[ , ] [ ; ] [ [ ] [ ' ] [ " ] [ _ ] [ $ ] [ * ] [ } ]*/ || pk.isNum()/*[num]*/) || pk.isID()/*[id]*/) {
                                            /*peek*/
                                            /*
                                               254 method_definition=>property_name ( unique_formal_parameters ) { • } 
                                            */
                                            if (assert_consume(l, l.utf == 125/*[}]*/)) {
                                                add_reduce(6, 158);
                                                prod = 87;
                                            }
                                        }
                                    } else {
                                        /*assert-production-closure*/
                                        /*
                                           247 method_definition=>property_name ( unique_formal_parameters ) { • function_body } 
                                        */
                                        if ($function_statement_list(l)) {
                                            add_reduce(1, 120);
                                            skip_fn_(l/*[ ws ][ nl ]*/);
                                            if (assert_consume(l, l.utf == 125/*[}]*/)) {
                                                add_reduce(7, 151);
                                                prod = 87;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        } else if (pk.utf == 42/*[asterisk]*/) {
            /*peek*/
            /*
               238 method_definition=>• τasync function_declaration_group_0115_109 property_name ( unique_formal_parameters ) { function_body } 
               243 method_definition=>• τasync function_declaration_group_0115_109 property_name ( ) { function_body } 
               244 method_definition=>• τasync function_declaration_group_0115_109 property_name ( unique_formal_parameters ) { } 
               252 method_definition=>• τasync function_declaration_group_0115_109 property_name ( ) { } 
            */
            skip_fn_(l/*[ ws ][ nl ]*/);
            if (assert_consume(l, cpdcbfef5f_(l)/*[async]*/)) {
                /*consume*/
                /*
                   238 method_definition=>τasync • function_declaration_group_0115_109 property_name ( unique_formal_parameters ) { function_body } 
                   243 method_definition=>τasync • function_declaration_group_0115_109 property_name ( ) { function_body } 
                   244 method_definition=>τasync • function_declaration_group_0115_109 property_name ( unique_formal_parameters ) { } 
                   252 method_definition=>τasync • function_declaration_group_0115_109 property_name ( ) { } 
                */
                skip_fn_(l/*[ ws ][ nl ]*/);
                if ($function_declaration_group_0115_109(l)) {
                    /*assert*/
                    /*
                       238 method_definition=>τasync • function_declaration_group_0115_109 property_name ( unique_formal_parameters ) { function_body } 
                       243 method_definition=>τasync • function_declaration_group_0115_109 property_name ( ) { function_body } 
                       244 method_definition=>τasync • function_declaration_group_0115_109 property_name ( unique_formal_parameters ) { } 
                       252 method_definition=>τasync • function_declaration_group_0115_109 property_name ( ) { } 
                    */
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if ($property_name(l)) {
                        /*assert*/
                        /*
                           238 method_definition=>τasync function_declaration_group_0115_109 • property_name ( unique_formal_parameters ) { function_body } 
                           243 method_definition=>τasync function_declaration_group_0115_109 • property_name ( ) { function_body } 
                           244 method_definition=>τasync function_declaration_group_0115_109 • property_name ( unique_formal_parameters ) { } 
                           252 method_definition=>τasync function_declaration_group_0115_109 • property_name ( ) { } 
                        */
                        skip_fn_(l/*[ ws ][ nl ]*/);
                        if (assert_consume(l, l.utf == 40/*[(]*/)) {
                            /*consume*/
                            /*
                               238 method_definition=>τasync function_declaration_group_0115_109 property_name ( • unique_formal_parameters ) { function_body } 
                               243 method_definition=>τasync function_declaration_group_0115_109 property_name ( • ) { function_body } 
                               244 method_definition=>τasync function_declaration_group_0115_109 property_name ( • unique_formal_parameters ) { } 
                               252 method_definition=>τasync function_declaration_group_0115_109 property_name ( • ) { } 
                            */
                            if (l.utf == 41/*[)]*/) {
                                /*peek*/
                                /*
                                   243 method_definition=>τasync function_declaration_group_0115_109 property_name ( • ) { function_body } 
                                   252 method_definition=>τasync function_declaration_group_0115_109 property_name ( • ) { } 
                                */
                                skip_fn_(l/*[ ws ][ nl ]*/);
                                if (assert_consume(l, l.utf == 41/*[)]*/)) {
                                    /*consume*/
                                    /*
                                       243 method_definition=>τasync function_declaration_group_0115_109 property_name ( ) • { function_body } 
                                       252 method_definition=>τasync function_declaration_group_0115_109 property_name ( ) • { } 
                                    */
                                    skip_fn_(l/*[ ws ][ nl ]*/);
                                    if (assert_consume(l, l.utf == 123/*[{]*/)) {
                                        /*consume*/
                                        /*
                                           243 method_definition=>τasync function_declaration_group_0115_109 property_name ( ) { • function_body } 
                                           252 method_definition=>τasync function_declaration_group_0115_109 property_name ( ) { • } 
                                        */
                                        skip_fn_(l/*[ ws ][ nl ]*/);
                                        if (l.utf == 125/*[}]*/) {
                                            /*peek*/
                                            /*
                                               243 method_definition=>τasync function_declaration_group_0115_109 property_name ( ) { • function_body } 
                                               252 method_definition=>τasync function_declaration_group_0115_109 property_name ( ) { • } 
                                            */
                                            let pk: Lexer = l.copy();
                                            skip_fn_(pk.next()/*[ ws ][ nl ]*/);
                                            if ((assert_table(pk, 0x0, 0x8001494, 0x88000000, 0x20000000)/*tbl:[ , ] [ ; ] [ [ ] [ ' ] [ " ] [ _ ] [ $ ] [ * ] [ } ]*/ || pk.isNum()/*[num]*/) || pk.isID()/*[id]*/) {
                                                /*peek*/
                                                /*
                                                   252 method_definition=>τasync function_declaration_group_0115_109 property_name ( ) { • } 
                                                */
                                                if (assert_consume(l, l.utf == 125/*[}]*/)) {
                                                    add_reduce(7, 156);
                                                    prod = 87;
                                                }
                                            }
                                        } else {
                                            /*assert-production-closure*/
                                            /*
                                               243 method_definition=>τasync function_declaration_group_0115_109 property_name ( ) { • function_body } 
                                            */
                                            if ($function_statement_list(l)) {
                                                add_reduce(1, 120);
                                                skip_fn_(l/*[ ws ][ nl ]*/);
                                                if (assert_consume(l, l.utf == 125/*[}]*/)) {
                                                    add_reduce(8, 147);
                                                    prod = 87;
                                                }
                                            }
                                        }
                                    }
                                }
                            } else {
                                /*peek-production-closure*/
                                /*
                                   238 method_definition=>τasync function_declaration_group_0115_109 property_name ( • unique_formal_parameters ) { function_body } 
                                   244 method_definition=>τasync function_declaration_group_0115_109 property_name ( • unique_formal_parameters ) { } 
                                */
                                skip_fn_(l/*[ ws ][ nl ]*/);
                                if ($unique_formal_parameters(l)) {
                                    /*assert*/
                                    /*
                                       238 method_definition=>τasync function_declaration_group_0115_109 property_name ( • unique_formal_parameters ) { function_body } 
                                       244 method_definition=>τasync function_declaration_group_0115_109 property_name ( • unique_formal_parameters ) { } 
                                    */
                                    skip_fn_(l/*[ ws ][ nl ]*/);
                                    if (assert_consume(l, l.utf == 41/*[)]*/)) {
                                        /*consume*/
                                        /*
                                           238 method_definition=>τasync function_declaration_group_0115_109 property_name ( unique_formal_parameters ) • { function_body } 
                                           244 method_definition=>τasync function_declaration_group_0115_109 property_name ( unique_formal_parameters ) • { } 
                                        */
                                        skip_fn_(l/*[ ws ][ nl ]*/);
                                        if (assert_consume(l, l.utf == 123/*[{]*/)) {
                                            /*consume*/
                                            /*
                                               238 method_definition=>τasync function_declaration_group_0115_109 property_name ( unique_formal_parameters ) { • function_body } 
                                               244 method_definition=>τasync function_declaration_group_0115_109 property_name ( unique_formal_parameters ) { • } 
                                            */
                                            skip_fn_(l/*[ ws ][ nl ]*/);
                                            if (l.utf == 125/*[}]*/) {
                                                /*peek*/
                                                /*
                                                   238 method_definition=>τasync function_declaration_group_0115_109 property_name ( unique_formal_parameters ) { • function_body } 
                                                   244 method_definition=>τasync function_declaration_group_0115_109 property_name ( unique_formal_parameters ) { • } 
                                                */
                                                let pk: Lexer = l.copy();
                                                skip_fn_(pk.next()/*[ ws ][ nl ]*/);
                                                if ((assert_table(pk, 0x0, 0x8001494, 0x88000000, 0x20000000)/*tbl:[ , ] [ ; ] [ [ ] [ ' ] [ " ] [ _ ] [ $ ] [ * ] [ } ]*/ || pk.isNum()/*[num]*/) || pk.isID()/*[id]*/) {
                                                    /*peek*/
                                                    /*
                                                       244 method_definition=>τasync function_declaration_group_0115_109 property_name ( unique_formal_parameters ) { • } 
                                                    */
                                                    if (assert_consume(l, l.utf == 125/*[}]*/)) {
                                                        add_reduce(8, 148);
                                                        prod = 87;
                                                    }
                                                }
                                            } else {
                                                /*assert-production-closure*/
                                                /*
                                                   238 method_definition=>τasync function_declaration_group_0115_109 property_name ( unique_formal_parameters ) { • function_body } 
                                                */
                                                if ($function_statement_list(l)) {
                                                    add_reduce(1, 120);
                                                    skip_fn_(l/*[ ws ][ nl ]*/);
                                                    if (assert_consume(l, l.utf == 125/*[}]*/)) {
                                                        add_reduce(9, 142);
                                                        prod = 87;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        } else if ((assert_table(pk, 0x0, 0x94, 0x88000000, 0x0)/*tbl:[ [ ] [ ' ] [ " ] [ _ ] [ $ ]*/ || pk.isNum()/*[num]*/) || pk.isID()/*[id]*/) {
            /*peek*/
            /*
               242 method_definition=>• τasync property_name ( unique_formal_parameters ) { function_body } 
               250 method_definition=>• τasync property_name ( ) { function_body } 
               251 method_definition=>• τasync property_name ( unique_formal_parameters ) { } 
               256 method_definition=>• τasync property_name ( ) { } 
            */
            skip_fn_(l/*[ ws ][ nl ]*/);
            if (assert_consume(l, cpdcbfef5f_(l)/*[async]*/)) {
                /*consume*/
                /*
                   242 method_definition=>τasync • property_name ( unique_formal_parameters ) { function_body } 
                   250 method_definition=>τasync • property_name ( ) { function_body } 
                   251 method_definition=>τasync • property_name ( unique_formal_parameters ) { } 
                   256 method_definition=>τasync • property_name ( ) { } 
                */
                skip_fn_(l/*[ ws ][ nl ]*/);
                if ($property_name(l)) {
                    /*assert*/
                    /*
                       242 method_definition=>τasync • property_name ( unique_formal_parameters ) { function_body } 
                       250 method_definition=>τasync • property_name ( ) { function_body } 
                       251 method_definition=>τasync • property_name ( unique_formal_parameters ) { } 
                       256 method_definition=>τasync • property_name ( ) { } 
                    */
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if (assert_consume(l, l.utf == 40/*[(]*/)) {
                        /*consume*/
                        /*
                           242 method_definition=>τasync property_name ( • unique_formal_parameters ) { function_body } 
                           250 method_definition=>τasync property_name ( • ) { function_body } 
                           251 method_definition=>τasync property_name ( • unique_formal_parameters ) { } 
                           256 method_definition=>τasync property_name ( • ) { } 
                        */
                        if (l.utf == 41/*[)]*/) {
                            /*peek*/
                            /*
                               250 method_definition=>τasync property_name ( • ) { function_body } 
                               256 method_definition=>τasync property_name ( • ) { } 
                            */
                            skip_fn_(l/*[ ws ][ nl ]*/);
                            if (assert_consume(l, l.utf == 41/*[)]*/)) {
                                /*consume*/
                                /*
                                   250 method_definition=>τasync property_name ( ) • { function_body } 
                                   256 method_definition=>τasync property_name ( ) • { } 
                                */
                                skip_fn_(l/*[ ws ][ nl ]*/);
                                if (assert_consume(l, l.utf == 123/*[{]*/)) {
                                    /*consume*/
                                    /*
                                       250 method_definition=>τasync property_name ( ) { • function_body } 
                                       256 method_definition=>τasync property_name ( ) { • } 
                                    */
                                    skip_fn_(l/*[ ws ][ nl ]*/);
                                    if (l.utf == 125/*[}]*/) {
                                        /*peek*/
                                        /*
                                           250 method_definition=>τasync property_name ( ) { • function_body } 
                                           256 method_definition=>τasync property_name ( ) { • } 
                                        */
                                        let pk: Lexer = l.copy();
                                        skip_fn_(pk.next()/*[ ws ][ nl ]*/);
                                        if ((assert_table(pk, 0x0, 0x8001494, 0x88000000, 0x20000000)/*tbl:[ , ] [ ; ] [ [ ] [ ' ] [ " ] [ _ ] [ $ ] [ * ] [ } ]*/ || pk.isNum()/*[num]*/) || pk.isID()/*[id]*/) {
                                            /*peek*/
                                            /*
                                               256 method_definition=>τasync property_name ( ) { • } 
                                            */
                                            if (assert_consume(l, l.utf == 125/*[}]*/)) {
                                                add_reduce(6, 160);
                                                prod = 87;
                                            }
                                        }
                                    } else {
                                        /*assert-production-closure*/
                                        /*
                                           250 method_definition=>τasync property_name ( ) { • function_body } 
                                        */
                                        if ($function_statement_list(l)) {
                                            add_reduce(1, 120);
                                            skip_fn_(l/*[ ws ][ nl ]*/);
                                            if (assert_consume(l, l.utf == 125/*[}]*/)) {
                                                add_reduce(7, 154);
                                                prod = 87;
                                            }
                                        }
                                    }
                                }
                            }
                        } else {
                            /*peek-production-closure*/
                            /*
                               242 method_definition=>τasync property_name ( • unique_formal_parameters ) { function_body } 
                               251 method_definition=>τasync property_name ( • unique_formal_parameters ) { } 
                            */
                            skip_fn_(l/*[ ws ][ nl ]*/);
                            if ($unique_formal_parameters(l)) {
                                /*assert*/
                                /*
                                   242 method_definition=>τasync property_name ( • unique_formal_parameters ) { function_body } 
                                   251 method_definition=>τasync property_name ( • unique_formal_parameters ) { } 
                                */
                                skip_fn_(l/*[ ws ][ nl ]*/);
                                if (assert_consume(l, l.utf == 41/*[)]*/)) {
                                    /*consume*/
                                    /*
                                       242 method_definition=>τasync property_name ( unique_formal_parameters ) • { function_body } 
                                       251 method_definition=>τasync property_name ( unique_formal_parameters ) • { } 
                                    */
                                    skip_fn_(l/*[ ws ][ nl ]*/);
                                    if (assert_consume(l, l.utf == 123/*[{]*/)) {
                                        /*consume*/
                                        /*
                                           242 method_definition=>τasync property_name ( unique_formal_parameters ) { • function_body } 
                                           251 method_definition=>τasync property_name ( unique_formal_parameters ) { • } 
                                        */
                                        skip_fn_(l/*[ ws ][ nl ]*/);
                                        if (l.utf == 125/*[}]*/) {
                                            /*peek*/
                                            /*
                                               242 method_definition=>τasync property_name ( unique_formal_parameters ) { • function_body } 
                                               251 method_definition=>τasync property_name ( unique_formal_parameters ) { • } 
                                            */
                                            let pk: Lexer = l.copy();
                                            skip_fn_(pk.next()/*[ ws ][ nl ]*/);
                                            if ((assert_table(pk, 0x0, 0x8001494, 0x88000000, 0x20000000)/*tbl:[ , ] [ ; ] [ [ ] [ ' ] [ " ] [ _ ] [ $ ] [ * ] [ } ]*/ || pk.isNum()/*[num]*/) || pk.isID()/*[id]*/) {
                                                /*peek*/
                                                /*
                                                   251 method_definition=>τasync property_name ( unique_formal_parameters ) { • } 
                                                */
                                                if (assert_consume(l, l.utf == 125/*[}]*/)) {
                                                    add_reduce(7, 155);
                                                    prod = 87;
                                                }
                                            }
                                        } else {
                                            /*assert-production-closure*/
                                            /*
                                               242 method_definition=>τasync property_name ( unique_formal_parameters ) { • function_body } 
                                            */
                                            if ($function_statement_list(l)) {
                                                add_reduce(1, 120);
                                                skip_fn_(l/*[ ws ][ nl ]*/);
                                                if (assert_consume(l, l.utf == 125/*[}]*/)) {
                                                    add_reduce(8, 146);
                                                    prod = 87;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    } else {
        /*peek-production-closure*/
        /*
           247 method_definition=>• property_name ( unique_formal_parameters ) { function_body } 
           253 method_definition=>• property_name ( ) { function_body } 
           254 method_definition=>• property_name ( unique_formal_parameters ) { } 
           257 method_definition=>• property_name ( ) { } 
        */
        skip_fn_(l/*[ ws ][ nl ]*/);
        if ($property_name(l)) {
            /*assert*/
            /*
               247 method_definition=>• property_name ( unique_formal_parameters ) { function_body } 
               253 method_definition=>• property_name ( ) { function_body } 
               254 method_definition=>• property_name ( unique_formal_parameters ) { } 
               257 method_definition=>• property_name ( ) { } 
            */
            skip_fn_(l/*[ ws ][ nl ]*/);
            if (assert_consume(l, l.utf == 40/*[(]*/)) {
                /*consume*/
                /*
                   247 method_definition=>property_name ( • unique_formal_parameters ) { function_body } 
                   253 method_definition=>property_name ( • ) { function_body } 
                   254 method_definition=>property_name ( • unique_formal_parameters ) { } 
                   257 method_definition=>property_name ( • ) { } 
                */
                if (l.utf == 41/*[)]*/) {
                    /*peek*/
                    /*
                       253 method_definition=>property_name ( • ) { function_body } 
                       257 method_definition=>property_name ( • ) { } 
                    */
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if (assert_consume(l, l.utf == 41/*[)]*/)) {
                        /*consume*/
                        /*
                           253 method_definition=>property_name ( ) • { function_body } 
                           257 method_definition=>property_name ( ) • { } 
                        */
                        skip_fn_(l/*[ ws ][ nl ]*/);
                        if (assert_consume(l, l.utf == 123/*[{]*/)) {
                            /*consume*/
                            /*
                               253 method_definition=>property_name ( ) { • function_body } 
                               257 method_definition=>property_name ( ) { • } 
                            */
                            skip_fn_(l/*[ ws ][ nl ]*/);
                            if (l.utf == 125/*[}]*/) {
                                /*peek*/
                                /*
                                   253 method_definition=>property_name ( ) { • function_body } 
                                   257 method_definition=>property_name ( ) { • } 
                                */
                                let pk: Lexer = l.copy();
                                skip_fn_(pk.next()/*[ ws ][ nl ]*/);
                                if ((assert_table(pk, 0x0, 0x8001494, 0x88000000, 0x20000000)/*tbl:[ , ] [ ; ] [ [ ] [ ' ] [ " ] [ _ ] [ $ ] [ * ] [ } ]*/ || pk.isNum()/*[num]*/) || pk.isID()/*[id]*/) {
                                    /*peek*/
                                    /*
                                       257 method_definition=>property_name ( ) { • } 
                                    */
                                    if (assert_consume(l, l.utf == 125/*[}]*/)) {
                                        add_reduce(5, 161);
                                        prod = 87;
                                    }
                                }
                            } else {
                                /*assert-production-closure*/
                                /*
                                   253 method_definition=>property_name ( ) { • function_body } 
                                */
                                if ($function_statement_list(l)) {
                                    add_reduce(1, 120);
                                    skip_fn_(l/*[ ws ][ nl ]*/);
                                    if (assert_consume(l, l.utf == 125/*[}]*/)) {
                                        add_reduce(6, 157);
                                        prod = 87;
                                    }
                                }
                            }
                        }
                    }
                } else {
                    /*peek-production-closure*/
                    /*
                       247 method_definition=>property_name ( • unique_formal_parameters ) { function_body } 
                       254 method_definition=>property_name ( • unique_formal_parameters ) { } 
                    */
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if ($unique_formal_parameters(l)) {
                        /*assert*/
                        /*
                           247 method_definition=>property_name ( • unique_formal_parameters ) { function_body } 
                           254 method_definition=>property_name ( • unique_formal_parameters ) { } 
                        */
                        skip_fn_(l/*[ ws ][ nl ]*/);
                        if (assert_consume(l, l.utf == 41/*[)]*/)) {
                            /*consume*/
                            /*
                               247 method_definition=>property_name ( unique_formal_parameters ) • { function_body } 
                               254 method_definition=>property_name ( unique_formal_parameters ) • { } 
                            */
                            skip_fn_(l/*[ ws ][ nl ]*/);
                            if (assert_consume(l, l.utf == 123/*[{]*/)) {
                                /*consume*/
                                /*
                                   247 method_definition=>property_name ( unique_formal_parameters ) { • function_body } 
                                   254 method_definition=>property_name ( unique_formal_parameters ) { • } 
                                */
                                skip_fn_(l/*[ ws ][ nl ]*/);
                                if (l.utf == 125/*[}]*/) {
                                    /*peek*/
                                    /*
                                       247 method_definition=>property_name ( unique_formal_parameters ) { • function_body } 
                                       254 method_definition=>property_name ( unique_formal_parameters ) { • } 
                                    */
                                    let pk: Lexer = l.copy();
                                    skip_fn_(pk.next()/*[ ws ][ nl ]*/);
                                    if ((assert_table(pk, 0x0, 0x8001494, 0x88000000, 0x20000000)/*tbl:[ , ] [ ; ] [ [ ] [ ' ] [ " ] [ _ ] [ $ ] [ * ] [ } ]*/ || pk.isNum()/*[num]*/) || pk.isID()/*[id]*/) {
                                        /*peek*/
                                        /*
                                           254 method_definition=>property_name ( unique_formal_parameters ) { • } 
                                        */
                                        if (assert_consume(l, l.utf == 125/*[}]*/)) {
                                            add_reduce(6, 158);
                                            prod = 87;
                                        }
                                    }
                                } else {
                                    /*assert-production-closure*/
                                    /*
                                       247 method_definition=>property_name ( unique_formal_parameters ) { • function_body } 
                                    */
                                    if ($function_statement_list(l)) {
                                        add_reduce(1, 120);
                                        skip_fn_(l/*[ ws ][ nl ]*/);
                                        if (assert_consume(l, l.utf == 125/*[}]*/)) {
                                            add_reduce(7, 151);
                                            prod = 87;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return assertSuccess(l, prod == 87);
}
function $property_set_parameter_list(l: Lexer): boolean {
    if ($binding_element(l)) {
        prod = 88;
    }
    return assertSuccess(l, prod == 88);
}
function $expression(l: Lexer): boolean {
    if ($assignment_expression(l)) {
        prod = 89;
    }
    while (prod == 89) {
        let ACCEPT: boolean = false;
        skip_fn_000(l/*[ ws ]*/);
        if (l.isNL()/*[nl]*/) {
            break;
        }
        if (assert_consume(l, l.utf == 44/*[,]*/)) {
            /*consume*/
            /*
               259 expression=>expression , • assignment_expression 
            */
            skip_fn_(l/*[ ws ][ nl ]*/);
            if ($assignment_expression(l)) {
                add_reduce(3, 162);
                prod = 89;
                ACCEPT = true;
            }
        }
        if (!ACCEPT) {
            break;
        }
    }
    return assertSuccess(l, prod == 89);
}
function $left_hand_side_expression(l: Lexer): boolean {
    if (cp2e37be7d_(l)/*[import]*/) {
        /*peek*/
        /*
           261 left_hand_side_expression=>• new_expression 
           262 left_hand_side_expression=>• call_expression 
           263 left_hand_side_expression=>• optional_expression 
        */
        let pk: Lexer = l.copy();
        skip_fn_(pk.next()/*[ ws ][ nl ]*/);
        if (pk.utf == 40/*[(]*/) {
            /*assert-production-closure*/
            /*
               287 import_call=>• τimport ( assignment_expression ) 
            */
            if ($import_call(l)) {
                prod = 97;
            }
        } else {
            /*assert-production-closure*/
            /*
               277 import_meta=>• τimport . τmeta 
            */
            if ($import_meta(l)) {
                prod = 92;
            }
        }
    } else if (cpbbb8c976_(l)/*[super]*/) {
        /*peek*/
        /*
           261 left_hand_side_expression=>• new_expression 
           262 left_hand_side_expression=>• call_expression 
           263 left_hand_side_expression=>• optional_expression 
        */
        let pk: Lexer = l.copy();
        skip_fn_(pk.next()/*[ ws ][ nl ]*/);
        if (pk.utf == 40/*[(]*/) {
            /*assert-production-closure*/
            /*
               286 super_call=>• τsuper arguments 
            */
            if ($super_call(l)) {
                prod = 97;
            }
        } else {
            /*assert-production-closure*/
            /*
               274 super_property=>• τsuper [ expression ] 
               273 super_property=>• τsuper . identifier_name 
            */
            if ($super_property(l)) {
                prod = 92;
            }
        }
    } else if (cp8595dc97_(l)/*[new]*/) {
        /*peek*/
        /*
           261 left_hand_side_expression=>• new_expression 
           262 left_hand_side_expression=>• call_expression 
           263 left_hand_side_expression=>• optional_expression 
        */
        skip_fn_(l/*[ ws ][ nl ]*/);
        if (assert_consume(l, cp8595dc97_(l)/*[new]*/)) {
            /*consume*/
            /*
               272 member_expression=>τnew • member_expression arguments 
               278 new_target=>τnew • . τtarget 
               265 new_expression=>τnew • new_expression 
            */
            skip_fn_(l/*[ ws ][ nl ]*/);
            if (assert_consume(l, l.utf == 46/*[.]*/)) {
                /*consume*/
                /*
                   278 new_target=>τnew . • τtarget 
                */
                skip_fn_(l/*[ ws ][ nl ]*/);
                if (assert_consume(l, cp28cc5037_(l)/*[target]*/)) {
                    add_reduce(3, 171);
                    prod = 92;
                }
            } else if ((assert_table(l, 0x0, 0x8194, 0x88000000, 0x8000001)/*tbl:[ ( ] [ ` ] [ / ] [ { ] [ [ ] [ ' ] [ " ] [ _ ] [ $ ]*/ || l.isNum()/*[num]*/) || l.isID()/*[id]*/) {
                /*peek*/
                /*
                   272 member_expression=>τnew • member_expression arguments 
                   265 new_expression=>τnew • new_expression 
                */
                let mk: i32 = mark();
                let anchor: Lexer = l.copy();
                /*92*/
                if ($member_expression(l)) {
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if ($arguments(l)) {
                        add_reduce(3, 167);
                        prod = 92;
                    }
                }
                if (reset(mk, anchor, l, prod == 90)) {
                    prod = -1;
                    if ($new_expression(l)) {
                        add_reduce(2, 163);
                        prod = 90;
                    }
                }
            }
        }
    } else if (l.utf == 40/*[(]*/) {
        /*assert-production-closure*/
        /*
           403 parenthesized=>• ( expression ) 
        */
        if ($parenthesized(l)) {
            add_reduce(1, 181);
            prod = 92;
        }
    } else if (l.utf == 96/*[`]*/) {
        /*peek*/
        /*
           261 left_hand_side_expression=>• new_expression 
           262 left_hand_side_expression=>• call_expression 
           263 left_hand_side_expression=>• optional_expression 
        */
        skip_fn_(l/*[ ws ][ nl ]*/);
        if (assert_consume(l, l.utf == 96/*[`]*/)) {
            /*consume*/
            /*
               475 no_substitute_template=>` • ` 
               481 template_head=>` • ${ 
            */
            skip_fn_(l/*[ ws ][ nl ]*/);
            if (assert_consume(l, cped7e7079_(l)/*[${]*/)) {
                /*consume*/
                /*
                   481 template_head=>` ${ • 
                */
                add_reduce(2, 242);
                prod = 162;
            } else if (assert_consume(l, l.utf == 96/*[`]*/)) {
                /*consume*/
                /*
                   475 no_substitute_template=>` ` • 
                */
                add_reduce(2, 238);
                prod = 92;
            }
        }
    } else if (l.utf == 47/*[/]*/) {
        /*assert-production-closure*/
        /*
           436 regular_expression_literal=>• / / def$js_identifier 
        */
        if ($regular_expression_literal(l)) {
            prod = 92;
        }
    } else if (cp1f027896_(l)/*[class]*/) {
        /*assert-production-closure*/
        /*
           223 class_expression=>• τclass binding_identifier class_heritage { class_body } 
        */
        if ($class_expression(l)) {
            prod = 92;
        }
    } else if (cp87f20bb1_(l)/*[function]*/) {
        /*assert-production-closure*/
        /*
           176 function_expression=>• τfunction function_declaration_group_0115_109 binding_identifier ( formal_parameters ) { function_body } 
        */
        if ($function_expression(l)) {
            prod = 92;
        }
    } else if (l.utf == 123/*[{]*/) {
        /*assert-production-closure*/
        /*
           439 object_literal=>• { } 
        */
        if ($object_literal(l)) {
            prod = 92;
        }
    } else if (l.utf == 91/*[[]*/) {
        /*assert-production-closure*/
        /*
           457 array_literal=>• [ elision ] 
        */
        if ($array_literal(l)) {
            prod = 92;
        }
    } else if (cpe3a3596e_(l)/*[null]*/) {
        /*assert-production-closure*/
        /*
           518 null_literal=>• τnull 
        */
        if ($null_literal(l)) {
            prod = 92;
        }
    } else if (cpdcbfef5f_(l)/*[async]*/) {
        /*peek*/
        /*
           261 left_hand_side_expression=>• new_expression 
           262 left_hand_side_expression=>• call_expression 
           263 left_hand_side_expression=>• optional_expression 
        */
        skip_fn_(l/*[ ws ][ nl ]*/);
        if (assert_consume(l, cpdcbfef5f_(l)/*[async]*/)) {
            /*consume*/
            /*
               529 unreserved_word=>τasync • 
               175 function_expression=>τasync • τfunction function_declaration_group_0115_109 binding_identifier ( formal_parameters ) { function_body } 
               177 function_expression=>τasync • τfunction binding_identifier ( formal_parameters ) { function_body } 
               178 function_expression=>τasync • τfunction function_declaration_group_0115_109 ( formal_parameters ) { function_body } 
               179 function_expression=>τasync • τfunction function_declaration_group_0115_109 binding_identifier ( ) { function_body } 
               183 function_expression=>τasync • τfunction ( formal_parameters ) { function_body } 
               184 function_expression=>τasync • τfunction binding_identifier ( ) { function_body } 
               185 function_expression=>τasync • τfunction function_declaration_group_0115_109 ( ) { function_body } 
               189 function_expression=>τasync • τfunction ( ) { function_body } 
            */
            skip_fn_000(l/*[ ws ]*/);
            if (assert_consume(l, cp87f20bb1_(l)/*[function]*/)) {
                /*consume*/
                /*
                   175 function_expression=>τasync τfunction • function_declaration_group_0115_109 binding_identifier ( formal_parameters ) { function_body } 
                   177 function_expression=>τasync τfunction • binding_identifier ( formal_parameters ) { function_body } 
                   178 function_expression=>τasync τfunction • function_declaration_group_0115_109 ( formal_parameters ) { function_body } 
                   179 function_expression=>τasync τfunction • function_declaration_group_0115_109 binding_identifier ( ) { function_body } 
                   183 function_expression=>τasync τfunction • ( formal_parameters ) { function_body } 
                   184 function_expression=>τasync τfunction • binding_identifier ( ) { function_body } 
                   185 function_expression=>τasync τfunction • function_declaration_group_0115_109 ( ) { function_body } 
                   189 function_expression=>τasync τfunction • ( ) { function_body } 
                */
                if (l.utf == 40/*[(]*/) {
                    /*peek*/
                    /*
                       183 function_expression=>τasync τfunction • ( formal_parameters ) { function_body } 
                       189 function_expression=>τasync τfunction • ( ) { function_body } 
                    */
                    let pk: Lexer = l.copy();
                    skip_fn_(pk.next()/*[ ws ][ nl ]*/);
                    if (pk.utf == 41/*[)]*/) {
                        /*peek*/
                        /*
                           189 function_expression=>τasync τfunction • ( ) { function_body } 
                        */
                        if (assert_consume(l, l.utf == 40/*[(]*/)) {
                            skip_fn_(l/*[ ws ][ nl ]*/);
                            if (assert_consume(l, l.utf == 41/*[)]*/)) {
                                skip_fn_(l/*[ ws ][ nl ]*/);
                                if (assert_consume(l, l.utf == 123/*[{]*/)) {
                                    skip_fn_(l/*[ ws ][ nl ]*/);
                                    if ($function_statement_list(l)) {
                                        add_reduce(1, 120);
                                        skip_fn_(l/*[ ws ][ nl ]*/);
                                        if (assert_consume(l, l.utf == 125/*[}]*/)) {
                                            add_reduce(7, 115);
                                            prod = 92;
                                        }
                                    }
                                }
                            }
                        }
                    } else if ((cp7fa4386a_(pk)/*[...]*/ || assert_table(pk, 0x0, 0x10, 0x88000000, 0x8000000)/*tbl:[ _ ] [ $ ] [ [ ] [ { ]*/) || pk.isID()/*[id]*/) {
                        /*peek*/
                        /*
                           183 function_expression=>τasync τfunction • ( formal_parameters ) { function_body } 
                        */
                        if (assert_consume(l, l.utf == 40/*[(]*/)) {
                            skip_fn_(l/*[ ws ][ nl ]*/);
                            if ($formal_parameters(l)) {
                                skip_fn_(l/*[ ws ][ nl ]*/);
                                if (assert_consume(l, l.utf == 41/*[)]*/)) {
                                    skip_fn_(l/*[ ws ][ nl ]*/);
                                    if (assert_consume(l, l.utf == 123/*[{]*/)) {
                                        skip_fn_(l/*[ ws ][ nl ]*/);
                                        if ($function_statement_list(l)) {
                                            add_reduce(1, 120);
                                            skip_fn_(l/*[ ws ][ nl ]*/);
                                            if (assert_consume(l, l.utf == 125/*[}]*/)) {
                                                add_reduce(8, 109);
                                                prod = 92;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                } else if (l.utf == 42/*[asterisk]*/) {
                    /*peek-production-closure*/
                    /*
                       175 function_expression=>τasync τfunction • function_declaration_group_0115_109 binding_identifier ( formal_parameters ) { function_body } 
                       178 function_expression=>τasync τfunction • function_declaration_group_0115_109 ( formal_parameters ) { function_body } 
                       179 function_expression=>τasync τfunction • function_declaration_group_0115_109 binding_identifier ( ) { function_body } 
                       185 function_expression=>τasync τfunction • function_declaration_group_0115_109 ( ) { function_body } 
                    */
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if ($function_declaration_group_0115_109(l)) {
                        /*assert*/
                        /*
                           175 function_expression=>τasync τfunction • function_declaration_group_0115_109 binding_identifier ( formal_parameters ) { function_body } 
                           178 function_expression=>τasync τfunction • function_declaration_group_0115_109 ( formal_parameters ) { function_body } 
                           179 function_expression=>τasync τfunction • function_declaration_group_0115_109 binding_identifier ( ) { function_body } 
                           185 function_expression=>τasync τfunction • function_declaration_group_0115_109 ( ) { function_body } 
                        */
                        if (l.utf == 40/*[(]*/) {
                            /*peek*/
                            /*
                               178 function_expression=>τasync τfunction function_declaration_group_0115_109 • ( formal_parameters ) { function_body } 
                               185 function_expression=>τasync τfunction function_declaration_group_0115_109 • ( ) { function_body } 
                            */
                            let pk: Lexer = l.copy();
                            skip_fn_(pk.next()/*[ ws ][ nl ]*/);
                            if (pk.utf == 41/*[)]*/) {
                                /*peek*/
                                /*
                                   185 function_expression=>τasync τfunction function_declaration_group_0115_109 • ( ) { function_body } 
                                */
                                if (assert_consume(l, l.utf == 40/*[(]*/)) {
                                    skip_fn_(l/*[ ws ][ nl ]*/);
                                    if (assert_consume(l, l.utf == 41/*[)]*/)) {
                                        skip_fn_(l/*[ ws ][ nl ]*/);
                                        if (assert_consume(l, l.utf == 123/*[{]*/)) {
                                            skip_fn_(l/*[ ws ][ nl ]*/);
                                            if ($function_statement_list(l)) {
                                                add_reduce(1, 120);
                                                skip_fn_(l/*[ ws ][ nl ]*/);
                                                if (assert_consume(l, l.utf == 125/*[}]*/)) {
                                                    add_reduce(8, 111);
                                                    prod = 92;
                                                }
                                            }
                                        }
                                    }
                                }
                            } else if ((cp7fa4386a_(pk)/*[...]*/ || assert_table(pk, 0x0, 0x10, 0x88000000, 0x8000000)/*tbl:[ _ ] [ $ ] [ [ ] [ { ]*/) || pk.isID()/*[id]*/) {
                                /*peek*/
                                /*
                                   178 function_expression=>τasync τfunction function_declaration_group_0115_109 • ( formal_parameters ) { function_body } 
                                */
                                if (assert_consume(l, l.utf == 40/*[(]*/)) {
                                    skip_fn_(l/*[ ws ][ nl ]*/);
                                    if ($formal_parameters(l)) {
                                        skip_fn_(l/*[ ws ][ nl ]*/);
                                        if (assert_consume(l, l.utf == 41/*[)]*/)) {
                                            skip_fn_(l/*[ ws ][ nl ]*/);
                                            if (assert_consume(l, l.utf == 123/*[{]*/)) {
                                                skip_fn_(l/*[ ws ][ nl ]*/);
                                                if ($function_statement_list(l)) {
                                                    add_reduce(1, 120);
                                                    skip_fn_(l/*[ ws ][ nl ]*/);
                                                    if (assert_consume(l, l.utf == 125/*[}]*/)) {
                                                        add_reduce(9, 104);
                                                        prod = 92;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        } else {
                            /*peek-production-closure*/
                            /*
                               175 function_expression=>τasync τfunction function_declaration_group_0115_109 • binding_identifier ( formal_parameters ) { function_body } 
                               179 function_expression=>τasync τfunction function_declaration_group_0115_109 • binding_identifier ( ) { function_body } 
                            */
                            skip_fn_(l/*[ ws ][ nl ]*/);
                            if ($binding_identifier(l)) {
                                /*assert*/
                                /*
                                   175 function_expression=>τasync τfunction function_declaration_group_0115_109 • binding_identifier ( formal_parameters ) { function_body } 
                                   179 function_expression=>τasync τfunction function_declaration_group_0115_109 • binding_identifier ( ) { function_body } 
                                */
                                skip_fn_(l/*[ ws ][ nl ]*/);
                                if (assert_consume(l, l.utf == 40/*[(]*/)) {
                                    /*consume*/
                                    /*
                                       175 function_expression=>τasync τfunction function_declaration_group_0115_109 binding_identifier ( • formal_parameters ) { function_body } 
                                       179 function_expression=>τasync τfunction function_declaration_group_0115_109 binding_identifier ( • ) { function_body } 
                                    */
                                    skip_fn_(l/*[ ws ][ nl ]*/);
                                    if (assert_consume(l, l.utf == 41/*[)]*/)) {
                                        /*consume*/
                                        /*
                                           179 function_expression=>τasync τfunction function_declaration_group_0115_109 binding_identifier ( ) • { function_body } 
                                        */
                                        skip_fn_(l/*[ ws ][ nl ]*/);
                                        if (assert_consume(l, l.utf == 123/*[{]*/)) {
                                            skip_fn_(l/*[ ws ][ nl ]*/);
                                            if ($function_statement_list(l)) {
                                                add_reduce(1, 120);
                                                skip_fn_(l/*[ ws ][ nl ]*/);
                                                if (assert_consume(l, l.utf == 125/*[}]*/)) {
                                                    add_reduce(9, 105);
                                                    prod = 92;
                                                }
                                            }
                                        }
                                    } else {
                                        /*assert-production-closure*/
                                        /*
                                           175 function_expression=>τasync τfunction function_declaration_group_0115_109 binding_identifier ( • formal_parameters ) { function_body } 
                                        */
                                        if ($formal_parameters(l)) {
                                            skip_fn_(l/*[ ws ][ nl ]*/);
                                            if (assert_consume(l, l.utf == 41/*[)]*/)) {
                                                skip_fn_(l/*[ ws ][ nl ]*/);
                                                if (assert_consume(l, l.utf == 123/*[{]*/)) {
                                                    skip_fn_(l/*[ ws ][ nl ]*/);
                                                    if ($function_statement_list(l)) {
                                                        add_reduce(1, 120);
                                                        skip_fn_(l/*[ ws ][ nl ]*/);
                                                        if (assert_consume(l, l.utf == 125/*[}]*/)) {
                                                            add_reduce(10, 101);
                                                            prod = 92;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                } else {
                    /*peek-production-closure*/
                    /*
                       177 function_expression=>τasync τfunction • binding_identifier ( formal_parameters ) { function_body } 
                       184 function_expression=>τasync τfunction • binding_identifier ( ) { function_body } 
                    */
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if ($binding_identifier(l)) {
                        /*assert*/
                        /*
                           177 function_expression=>τasync τfunction • binding_identifier ( formal_parameters ) { function_body } 
                           184 function_expression=>τasync τfunction • binding_identifier ( ) { function_body } 
                        */
                        skip_fn_(l/*[ ws ][ nl ]*/);
                        if (assert_consume(l, l.utf == 40/*[(]*/)) {
                            /*consume*/
                            /*
                               177 function_expression=>τasync τfunction binding_identifier ( • formal_parameters ) { function_body } 
                               184 function_expression=>τasync τfunction binding_identifier ( • ) { function_body } 
                            */
                            skip_fn_(l/*[ ws ][ nl ]*/);
                            if (assert_consume(l, l.utf == 41/*[)]*/)) {
                                /*consume*/
                                /*
                                   184 function_expression=>τasync τfunction binding_identifier ( ) • { function_body } 
                                */
                                skip_fn_(l/*[ ws ][ nl ]*/);
                                if (assert_consume(l, l.utf == 123/*[{]*/)) {
                                    skip_fn_(l/*[ ws ][ nl ]*/);
                                    if ($function_statement_list(l)) {
                                        add_reduce(1, 120);
                                        skip_fn_(l/*[ ws ][ nl ]*/);
                                        if (assert_consume(l, l.utf == 125/*[}]*/)) {
                                            add_reduce(8, 110);
                                            prod = 92;
                                        }
                                    }
                                }
                            } else {
                                /*assert-production-closure*/
                                /*
                                   177 function_expression=>τasync τfunction binding_identifier ( • formal_parameters ) { function_body } 
                                */
                                if ($formal_parameters(l)) {
                                    skip_fn_(l/*[ ws ][ nl ]*/);
                                    if (assert_consume(l, l.utf == 41/*[)]*/)) {
                                        skip_fn_(l/*[ ws ][ nl ]*/);
                                        if (assert_consume(l, l.utf == 123/*[{]*/)) {
                                            skip_fn_(l/*[ ws ][ nl ]*/);
                                            if ($function_statement_list(l)) {
                                                add_reduce(1, 120);
                                                skip_fn_(l/*[ ws ][ nl ]*/);
                                                if (assert_consume(l, l.utf == 125/*[}]*/)) {
                                                    add_reduce(9, 103);
                                                    prod = 92;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            } else {
                /*assert-end*/
                /*
                   529 unreserved_word=>τasync • 
                */
                add_reduce(1, 254);
                add_reduce(1, 253);
                prod = 92;
            }
        }
    } else if (cpfe029929_(l)/*[this]*/) {
        /*assert-production-closure*/
        /*
           309 primary_expression=>• τthis 
        */
        if ($primary_expression(l)) {
            prod = 92;
        }
    } else if (l.isNum()/*[num]*/) {
        /*peek*/
        /*
           261 left_hand_side_expression=>• new_expression 
           262 left_hand_side_expression=>• call_expression 
           263 left_hand_side_expression=>• optional_expression 
        */
        skip_fn_(l/*[ ws ][ nl ]*/);
        if (assert_consume(l, l.isNum()/*[num]*/)) {
            /*consume*/
            /*
               517 numeric_literal=>θnum • 
               516 bigint=>θnum • τn 
            */
            skip_fn_000(l/*[ ws ]*/);
            if (assert_consume(l, cpc1d70283_(l)/*[n]*/)) {
                /*consume*/
                /*
                   516 bigint=>θnum τn • 
                */
                add_reduce(2, 248);
                prod = 92;
            } else {
                /*assert-end*/
                /*
                   517 numeric_literal=>θnum • 
                */
                add_reduce(1, 249);
                prod = 92;
            }
        }
    } else if (assert_table(l, 0x0, 0x84, 0x0, 0x0)/*tbl:[ ' ] [ " ]*/) {
        /*assert-production-closure*/
        /*
           499 string_literal=>• ' single_quote_string ' 
           498 string_literal=>• " double_quote_string " 
        */
        if ($string_literal(l)) {
            prod = 92;
        }
    } else if (cp3b3b9dc5_(l)/*[false]*/ || cp97ab5935_(l)/*[true]*/) {
        /*assert-production-closure*/
        /*
           520 boolean_literal=>• τfalse 
           519 boolean_literal=>• τtrue 
        */
        if ($boolean_literal(l)) {
            prod = 92;
        }
    } else if ((((cp65c0e04e_(l)/*[from]*/ || cp00a86e9e_(l)/*[as]*/) || cp28cc5037_(l)/*[target]*/) || cp248c12d4_(l)/*[set]*/) || cp47b3f727_(l)/*[get]*/) {
        /*assert-production-closure*/
        /*
           534 unreserved_word=>• τfrom 
           533 unreserved_word=>• τas 
           532 unreserved_word=>• τtarget 
           531 unreserved_word=>• τset 
           530 unreserved_word=>• τget 
        */
        if ($unreserved_word(l)) {
            add_reduce(1, 254);
            add_reduce(1, 253);
            prod = 92;
        }
    } else {
        /*assert-production-closure*/
        /*
           548 composite_identifier=>• _ 
           547 composite_identifier=>• $ 
           546 composite_identifier=>• θid 
        */
        if ($composite_identifier(l)) {
            add_reduce(1, 254);
            add_reduce(1, 253);
            prod = 92;
        }
    }
    while (true) {
        let ACCEPT: boolean = false;
        switch (prod) {
            case 92:
                skip_fn_000(l/*[ ws ]*/);
                if (assert_consume(l, l.utf == 91/*[[]*/)) {
                    /*consume*/
                    /*
                       267 member_expression=>member_expression [ • expression ] 
                    */
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if ($expression(l)) {
                        skip_fn_(l/*[ ws ][ nl ]*/);
                        if (assert_consume(l, l.utf == 93/*[]]*/)) {
                            add_reduce(4, 164);
                            prod = 92;
                            ACCEPT = true;
                        }
                    }
                } else if (assert_consume(l, l.utf == 46/*[.]*/)) {
                    /*consume*/
                    /*
                       268 member_expression=>member_expression . • identifier_name 
                    */
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if ($identifier_name(l)) {
                        add_reduce(3, 165);
                        prod = 92;
                        ACCEPT = true;
                    }
                } else if (l.utf == 96/*[`]*/) {
                    /*assert-production-closure*/
                    /*
                       269 member_expression=>member_expression • template_literal 
                    */
                    if ($template_literal(l)) {
                        add_reduce(2, 166);
                        prod = 92;
                        ACCEPT = true;
                    }
                } else if (l.utf == 40/*[(]*/) {
                    /*assert-production-closure*/
                    /*
                       214 cover_call_expression_and_async_arrow_head=>member_expression • arguments 
                    */
                    if ($arguments(l)) {
                        add_reduce(2, 129);
                        prod = 97;
                        ACCEPT = true;
                    }
                } else if (cp2f3a2b3c_(l)/*[?.]*/) {
                    /*assert-production-closure*/
                    /*
                       298 optional_expression=>member_expression • optional_chain 
                    */
                    if ($optional_chain(l)) {
                        add_reduce(2, 179);
                        prod = 104;
                        ACCEPT = true;
                    }
                } else {
                    /*assert-end*/
                    /*
                       264 new_expression=>member_expression • 
                    */
                    prod = 90;
                    ACCEPT = true;
                }
                break;
            case 97:
                skip_fn_000(l/*[ ws ]*/);
                if (assert_consume(l, l.utf == 46/*[.]*/)) {
                    /*consume*/
                    /*
                       279 call_expression=>call_expression . • identifier_name 
                    */
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if ($identifier_name(l)) {
                        add_reduce(3, 165);
                        prod = 97;
                        ACCEPT = true;
                    }
                } else if (l.utf == 40/*[(]*/) {
                    /*assert-production-closure*/
                    /*
                       282 call_expression=>call_expression • arguments 
                    */
                    if ($arguments(l)) {
                        add_reduce(2, 172);
                        prod = 97;
                        ACCEPT = true;
                    }
                } else if (assert_consume(l, l.utf == 91/*[[]*/)) {
                    /*consume*/
                    /*
                       283 call_expression=>call_expression [ • expression ] 
                    */
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if ($expression(l)) {
                        skip_fn_(l/*[ ws ][ nl ]*/);
                        if (assert_consume(l, l.utf == 93/*[]]*/)) {
                            add_reduce(4, 164);
                            prod = 97;
                            ACCEPT = true;
                        }
                    }
                } else if (l.utf == 96/*[`]*/) {
                    /*assert-production-closure*/
                    /*
                       285 call_expression=>call_expression • template_literal 
                    */
                    if ($template_literal(l)) {
                        add_reduce(2, 173);
                        prod = 97;
                        ACCEPT = true;
                    }
                } else if (cp2f3a2b3c_(l)/*[?.]*/) {
                    /*assert-production-closure*/
                    /*
                       299 optional_expression=>call_expression • optional_chain 
                    */
                    if ($optional_chain(l)) {
                        add_reduce(2, 179);
                        prod = 104;
                        ACCEPT = true;
                    }
                } else {
                    /*assert-end*/
                    /*
                       262 left_hand_side_expression=>call_expression • 
                    */
                    prod = 90;
                    ACCEPT = true;
                }
                break;
            case 104:
                skip_fn_000(l/*[ ws ]*/);
                if (cp2f3a2b3c_(l)/*[?.]*/) {
                    /*assert-production-closure*/
                    /*
                       300 optional_expression=>optional_expression • optional_chain 
                    */
                    if ($optional_chain(l)) {
                        add_reduce(2, 179);
                        prod = 104;
                        ACCEPT = true;
                    }
                } else {
                    /*assert-end*/
                    /*
                       263 left_hand_side_expression=>optional_expression • 
                    */
                    prod = 90;
                    ACCEPT = true;
                }
                break;
            case 162:
                skip_fn_(l/*[ ws ][ nl ]*/);
                if ((((cp0ac89158_(l)/*[+] [++]*/ || cpfaa7aa14_(l)/*[-] [--]*/) || assert_table(l, 0x0, 0x8196, 0x88000000, 0x48000001)/*tbl:[ ( ] [ $ ] [ _ ] [ " ] [ ' ] [ [ ] [ { ] [ / ] [ ` ] [ ~ ] [ ! ]*/) || l.isID()/*[id]*/) || l.isNum()/*[num]*/) {
                    /*assert-production-closure*/
                    /*
                       476 substitute_template=>template_head • expression template_spans 
                    */
                    if ($expression(l)) {
                        skip_fn_(l/*[ ws ][ nl ]*/);
                        if ($template_spans(l)) {
                            add_reduce(3, 239);
                            prod = 92;
                            ACCEPT = true;
                        }
                    }
                }
                break;
        }
        if (!ACCEPT) {
            break;
        }
    }
    return assertSuccess(l, prod == 90);
}
function $new_expression(l: Lexer): boolean {
    if (cp8595dc97_(l)/*[new]*/) {
        /*peek*/
        /*
           264 new_expression=>• member_expression 
           265 new_expression=>• τnew new_expression 
        */
        let pk: Lexer = l.copy();
        skip_fn_(pk.next()/*[ ws ][ nl ]*/);
        if (pk.utf == 46/*[.]*/) {
            /*peek-production-closure*/
            /*
               264 new_expression=>• member_expression 
            */
            if ($member_expression(l)) {
                prod = 91;
            }
        } else if ((assert_table(pk, 0x0, 0x8194, 0x88000000, 0x8000001)/*tbl:[ ( ] [ ` ] [ / ] [ { ] [ [ ] [ ' ] [ " ] [ _ ] [ $ ]*/ || pk.isNum()/*[num]*/) || pk.isID()/*[id]*/) {
            /*peek*/
            /*
               264 new_expression=>• member_expression 
               265 new_expression=>• τnew new_expression 
            */
            skip_fn_(l/*[ ws ][ nl ]*/);
            if (assert_consume(l, cp8595dc97_(l)/*[new]*/)) {
                /*consume*/
                /*
                   272 member_expression=>τnew • member_expression arguments 
                   265 new_expression=>τnew • new_expression 
                */
                skip_fn_(l/*[ ws ][ nl ]*/);
                if ((assert_table(l, 0x0, 0x8194, 0x88000000, 0x8000001)/*tbl:[ ( ] [ ` ] [ / ] [ { ] [ [ ] [ ' ] [ " ] [ _ ] [ $ ]*/ || l.isNum()/*[num]*/) || l.isID()/*[id]*/) {
                    /*peek*/
                    /*
                       272 member_expression=>τnew • member_expression arguments 
                       265 new_expression=>τnew • new_expression 
                    */
                    let mk: i32 = mark();
                    let anchor: Lexer = l.copy();
                    /*92*/
                    if ($member_expression(l)) {
                        skip_fn_(l/*[ ws ][ nl ]*/);
                        if ($arguments(l)) {
                            add_reduce(3, 167);
                            prod = 92;
                        }
                    }
                    if (reset(mk, anchor, l, prod == 91)) {
                        prod = -1;
                        if ($new_expression(l)) {
                            add_reduce(2, 163);
                            prod = 91;
                        }
                    }
                }
            }
        }
    } else {
        /*assert-production-closure*/
        /*
           264 new_expression=>• member_expression 
        */
        if ($member_expression(l)) {
            prod = 91;
        }
    }
    while (prod == 92) {
        let ACCEPT: boolean = false;
        skip_fn_000(l/*[ ws ]*/);
        if (assert_consume(l, l.utf == 91/*[[]*/)) {
            /*consume*/
            /*
               267 member_expression=>member_expression [ • expression ] 
            */
            skip_fn_(l/*[ ws ][ nl ]*/);
            if ($expression(l)) {
                skip_fn_(l/*[ ws ][ nl ]*/);
                if (assert_consume(l, l.utf == 93/*[]]*/)) {
                    add_reduce(4, 164);
                    prod = 92;
                    ACCEPT = true;
                }
            }
        } else if (assert_consume(l, l.utf == 46/*[.]*/)) {
            /*consume*/
            /*
               268 member_expression=>member_expression . • identifier_name 
            */
            skip_fn_(l/*[ ws ][ nl ]*/);
            if ($identifier_name(l)) {
                add_reduce(3, 165);
                prod = 92;
                ACCEPT = true;
            }
        } else if (l.utf == 96/*[`]*/) {
            /*assert-production-closure*/
            /*
               269 member_expression=>member_expression • template_literal 
            */
            if ($template_literal(l)) {
                add_reduce(2, 166);
                prod = 92;
                ACCEPT = true;
            }
        } else {
            /*assert-end*/
            /*
               264 new_expression=>member_expression • 
            */
            prod = 91;
            ACCEPT = true;
        }
        if (!ACCEPT) {
            break;
        }
    }
    return assertSuccess(l, prod == 91);
}
function $member_expression(l: Lexer): boolean {
    if (cp2e37be7d_(l)/*[import]*/) {
        /*assert-production-closure*/
        /*
           271 member_expression=>• meta_property 
        */
        if ($meta_property(l)) {
            prod = 92;
        }
    } else if (cp8595dc97_(l)/*[new]*/) {
        /*peek*/
        /*
           271 member_expression=>• meta_property 
           272 member_expression=>• τnew member_expression arguments 
        */
        let pk: Lexer = l.copy();
        skip_fn_(pk.next()/*[ ws ][ nl ]*/);
        if (pk.utf == 46/*[.]*/) {
            /*peek-production-closure*/
            /*
               271 member_expression=>• meta_property 
            */
            if ($meta_property(l)) {
                prod = 92;
            }
        } else if ((assert_table(pk, 0x0, 0x8194, 0x88000000, 0x8000001)/*tbl:[ ( ] [ ` ] [ / ] [ { ] [ [ ] [ ' ] [ " ] [ _ ] [ $ ]*/ || pk.isNum()/*[num]*/) || pk.isID()/*[id]*/) {
            /*peek*/
            /*
               272 member_expression=>• τnew member_expression arguments 
            */
            if (assert_consume(l, cp8595dc97_(l)/*[new]*/)) {
                skip_fn_(l/*[ ws ][ nl ]*/);
                if ($member_expression(l)) {
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if ($arguments(l)) {
                        add_reduce(3, 167);
                        prod = 92;
                    }
                }
            }
        }
    } else if (cpbbb8c976_(l)/*[super]*/) {
        /*assert-production-closure*/
        /*
           270 member_expression=>• super_property 
        */
        if ($super_property(l)) {
            prod = 92;
        }
    } else {
        /*assert-production-closure*/
        /*
           266 member_expression=>• primary_expression 
        */
        if ($primary_expression(l)) {
            prod = 92;
        }
    }
    while (prod == 92) {
        let ACCEPT: boolean = false;
        skip_fn_000(l/*[ ws ]*/);
        if (l.isNL()/*[nl]*/) {
            break;
        }
        if (l.utf == 96/*[`]*/) {
            /*assert-production-closure*/
            /*
               269 member_expression=>member_expression • template_literal 
            */
            if ($template_literal(l)) {
                add_reduce(2, 166);
                prod = 92;
                ACCEPT = true;
            }
        } else if (assert_consume(l, l.utf == 46/*[.]*/)) {
            /*consume*/
            /*
               268 member_expression=>member_expression . • identifier_name 
            */
            skip_fn_(l/*[ ws ][ nl ]*/);
            if ($identifier_name(l)) {
                add_reduce(3, 165);
                prod = 92;
                ACCEPT = true;
            }
        } else if (assert_consume(l, l.utf == 91/*[[]*/)) {
            /*consume*/
            /*
               267 member_expression=>member_expression [ • expression ] 
            */
            skip_fn_(l/*[ ws ][ nl ]*/);
            if ($expression(l)) {
                skip_fn_(l/*[ ws ][ nl ]*/);
                if (assert_consume(l, l.utf == 93/*[]]*/)) {
                    add_reduce(4, 164);
                    prod = 92;
                    ACCEPT = true;
                }
            }
        }
        if (!ACCEPT) {
            break;
        }
    }
    return assertSuccess(l, prod == 92);
}
function $super_property(l: Lexer): boolean {
    if (assert_consume(l, cpbbb8c976_(l)/*[super]*/)) {
        /*consume*/
        /*
           273 super_property=>τsuper • . identifier_name 
           274 super_property=>τsuper • [ expression ] 
        */
        skip_fn_(l/*[ ws ][ nl ]*/);
        if (assert_consume(l, l.utf == 91/*[[]*/)) {
            /*consume*/
            /*
               274 super_property=>τsuper [ • expression ] 
            */
            skip_fn_(l/*[ ws ][ nl ]*/);
            if ($expression(l)) {
                skip_fn_(l/*[ ws ][ nl ]*/);
                if (assert_consume(l, l.utf == 93/*[]]*/)) {
                    add_reduce(4, 169);
                    prod = 93;
                }
            }
        } else if (assert_consume(l, l.utf == 46/*[.]*/)) {
            /*consume*/
            /*
               273 super_property=>τsuper . • identifier_name 
            */
            skip_fn_(l/*[ ws ][ nl ]*/);
            if ($identifier_name(l)) {
                add_reduce(3, 168);
                prod = 93;
            }
        }
    }
    return assertSuccess(l, prod == 93);
}
function $meta_property(l: Lexer): boolean {
    if (cp2e37be7d_(l)/*[import]*/) {
        /*assert-production-closure*/
        /*
           276 meta_property=>• import_meta 
        */
        if ($import_meta(l)) {
            prod = 94;
        }
    } else {
        /*assert-production-closure*/
        /*
           275 meta_property=>• new_target 
        */
        if ($new_target(l)) {
            prod = 94;
        }
    }
    return assertSuccess(l, prod == 94);
}
function $import_meta(l: Lexer): boolean {
    if (assert_consume(l, cp2e37be7d_(l)/*[import]*/)) {
        /*consume*/
        /*
           277 import_meta=>τimport • . τmeta 
        */
        skip_fn_(l/*[ ws ][ nl ]*/);
        if (assert_consume(l, l.utf == 46/*[.]*/)) {
            skip_fn_(l/*[ ws ][ nl ]*/);
            if (assert_consume(l, cp5da57c06_(l)/*[meta]*/)) {
                add_reduce(3, 170);
                prod = 95;
            }
        }
    }
    return assertSuccess(l, prod == 95);
}
function $new_target(l: Lexer): boolean {
    if (assert_consume(l, cp8595dc97_(l)/*[new]*/)) {
        /*consume*/
        /*
           278 new_target=>τnew • . τtarget 
        */
        skip_fn_(l/*[ ws ][ nl ]*/);
        if (assert_consume(l, l.utf == 46/*[.]*/)) {
            skip_fn_(l/*[ ws ][ nl ]*/);
            if (assert_consume(l, cp28cc5037_(l)/*[target]*/)) {
                add_reduce(3, 171);
                prod = 96;
            }
        }
    }
    return assertSuccess(l, prod == 96);
}
function $super_call(l: Lexer): boolean {
    if (assert_consume(l, cpbbb8c976_(l)/*[super]*/)) {
        /*consume*/
        /*
           286 super_call=>τsuper • arguments 
        */
        skip_fn_(l/*[ ws ][ nl ]*/);
        if ($arguments(l)) {
            add_reduce(2, 174);
            prod = 98;
        }
    }
    return assertSuccess(l, prod == 98);
}
function $import_call(l: Lexer): boolean {
    if (assert_consume(l, cp2e37be7d_(l)/*[import]*/)) {
        /*consume*/
        /*
           287 import_call=>τimport • ( assignment_expression ) 
        */
        skip_fn_(l/*[ ws ][ nl ]*/);
        if (assert_consume(l, l.utf == 40/*[(]*/)) {
            skip_fn_(l/*[ ws ][ nl ]*/);
            if ($assignment_expression(l)) {
                skip_fn_(l/*[ ws ][ nl ]*/);
                if (assert_consume(l, l.utf == 41/*[)]*/)) {
                    add_reduce(4, 175);
                    prod = 99;
                }
            }
        }
    }
    return assertSuccess(l, prod == 99);
}
function $arguments(l: Lexer): boolean {
    if (assert_consume(l, l.utf == 40/*[(]*/)) {
        /*consume*/
        /*
           288 arguments=>( • argument_list , ) 
           289 arguments=>( • , ) 
           290 arguments=>( • argument_list ) 
           291 arguments=>( • ) 
        */
        skip_fn_(l/*[ ws ][ nl ]*/);
        if (assert_consume(l, l.utf == 41/*[)]*/)) {
            /*consume*/
            /*
               291 arguments=>( ) • 
            */
            add_reduce(2, 177);
            prod = 100;
        } else if (assert_consume(l, l.utf == 44/*[,]*/)) {
            /*consume*/
            /*
               289 arguments=>( , • ) 
            */
            skip_fn_(l/*[ ws ][ nl ]*/);
            if (assert_consume(l, l.utf == 41/*[)]*/)) {
                add_reduce(3, 177);
                prod = 100;
            }
        } else {
            /*peek-production-closure*/
            /*
               288 arguments=>( • argument_list , ) 
               290 arguments=>( • argument_list ) 
            */
            skip_fn_(l/*[ ws ][ nl ]*/);
            if ($argument_list(l)) {
                /*assert*/
                /*
                   288 arguments=>( • argument_list , ) 
                   290 arguments=>( • argument_list ) 
                */
                skip_fn_(l/*[ ws ][ nl ]*/);
                if (assert_consume(l, l.utf == 41/*[)]*/)) {
                    /*consume*/
                    /*
                       290 arguments=>( argument_list ) • 
                    */
                    add_reduce(3, 176);
                    prod = 100;
                } else if (assert_consume(l, l.utf == 44/*[,]*/)) {
                    /*consume*/
                    /*
                       288 arguments=>( argument_list , • ) 
                    */
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if (assert_consume(l, l.utf == 41/*[)]*/)) {
                        add_reduce(4, 176);
                        prod = 100;
                    }
                }
            }
        }
    }
    return assertSuccess(l, prod == 100);
}
function $argument_list_group_1182_111(l: Lexer): boolean {
    if (assert_consume(l, cp7fa4386a_(l)/*[...]*/)) {
        /*consume*/
        /*
           293 argument_list_group_1182_111=>... • assignment_expression 
        */
        skip_fn_(l/*[ ws ][ nl ]*/);
        if ($assignment_expression(l)) {
            add_reduce(2, 178);
            prod = 101;
        }
    } else {
        /*assert-production-closure*/
        /*
           292 argument_list_group_1182_111=>• assignment_expression 
        */
        if ($assignment_expression(l)) {
            prod = 101;
        }
    }
    return assertSuccess(l, prod == 101);
}
function $argument_list(l: Lexer): boolean {
    if ($argument_list_group_1182_111(l)) {
        add_reduce(1, 4);
        prod = 103;
    }
    while (prod == 103) {
        let ACCEPT: boolean = false;
        skip_fn_(l/*[ ws ][ nl ]*/);
        if (assert_consume(l, l.utf == 44/*[,]*/)) {
            /*consume*/
            /*
               296 argument_list=>argument_list , • argument_list_group_1182_111 
            */
            skip_fn_(l/*[ ws ][ nl ]*/);
            if ($argument_list_group_1182_111(l)) {
                add_reduce(3, 11);
                prod = 103;
                ACCEPT = true;
            }
        }
        if (!ACCEPT) {
            break;
        }
    }
    return assertSuccess(l, prod == 103);
}
function $optional_chain(l: Lexer): boolean {
    if (assert_consume(l, cp2f3a2b3c_(l)/*[?.]*/)) {
        /*consume*/
        /*
           301 optional_chain=>?. • arguments 
           302 optional_chain=>?. • [ expression ] 
           303 optional_chain=>?. • identifier_name 
           304 optional_chain=>?. • template_literal 
        */
        skip_fn_(l/*[ ws ][ nl ]*/);
        if (l.utf == 96/*[`]*/) {
            /*assert-production-closure*/
            /*
               304 optional_chain=>?. • template_literal 
            */
            if ($template_literal(l)) {
                add_reduce(2, 0);
                prod = 105;
            }
        } else if (assert_consume(l, l.utf == 91/*[[]*/)) {
            /*consume*/
            /*
               302 optional_chain=>?. [ • expression ] 
            */
            skip_fn_(l/*[ ws ][ nl ]*/);
            if ($expression(l)) {
                skip_fn_(l/*[ ws ][ nl ]*/);
                if (assert_consume(l, l.utf == 93/*[]]*/)) {
                    add_reduce(4, 0);
                    prod = 105;
                }
            }
        } else if (l.utf == 40/*[(]*/) {
            /*assert-production-closure*/
            /*
               301 optional_chain=>?. • arguments 
            */
            if ($arguments(l)) {
                add_reduce(2, 0);
                prod = 105;
            }
        } else {
            /*assert-production-closure*/
            /*
               303 optional_chain=>?. • identifier_name 
            */
            if ($identifier_name(l)) {
                add_reduce(2, 0);
                prod = 105;
            }
        }
    }
    while (prod == 105) {
        let ACCEPT: boolean = false;
        skip_fn_000(l/*[ ws ]*/);
        if (l.isNL()/*[nl]*/) {
            break;
        }
        if (l.utf == 40/*[(]*/) {
            /*assert-production-closure*/
            /*
               305 optional_chain=>optional_chain • arguments 
            */
            if ($arguments(l)) {
                add_reduce(2, 172);
                prod = 105;
                ACCEPT = true;
            }
        } else if (assert_consume(l, l.utf == 91/*[[]*/)) {
            /*consume*/
            /*
               306 optional_chain=>optional_chain [ • expression ] 
            */
            skip_fn_(l/*[ ws ][ nl ]*/);
            if ($expression(l)) {
                skip_fn_(l/*[ ws ][ nl ]*/);
                if (assert_consume(l, l.utf == 93/*[]]*/)) {
                    add_reduce(4, 164);
                    prod = 105;
                    ACCEPT = true;
                }
            }
        } else if (assert_consume(l, l.utf == 46/*[.]*/)) {
            /*consume*/
            /*
               307 optional_chain=>optional_chain . • identifier_name 
            */
            skip_fn_(l/*[ ws ][ nl ]*/);
            if ($identifier_name(l)) {
                add_reduce(3, 165);
                prod = 105;
                ACCEPT = true;
            }
        } else if (l.utf == 96/*[`]*/) {
            /*assert-production-closure*/
            /*
               308 optional_chain=>optional_chain • template_literal 
            */
            if ($template_literal(l)) {
                add_reduce(2, 166);
                prod = 105;
                ACCEPT = true;
            }
        }
        if (!ACCEPT) {
            break;
        }
    }
    return assertSuccess(l, prod == 105);
}
function $primary_expression(l: Lexer): boolean {
    if (l.utf == 40/*[(]*/) {
        /*assert-production-closure*/
        /*
           318 primary_expression=>• parenthesized 
        */
        if ($parenthesized(l)) {
            add_reduce(1, 181);
            prod = 106;
        }
    } else if (l.utf == 96/*[`]*/) {
        /*assert-production-closure*/
        /*
           317 primary_expression=>• template_literal 
        */
        if ($template_literal(l)) {
            prod = 106;
        }
    } else if (l.utf == 47/*[/]*/) {
        /*assert-production-closure*/
        /*
           316 primary_expression=>• regular_expression_literal 
        */
        if ($regular_expression_literal(l)) {
            prod = 106;
        }
    } else if (cp1f027896_(l)/*[class]*/) {
        /*assert-production-closure*/
        /*
           315 primary_expression=>• class_expression 
        */
        if ($class_expression(l)) {
            prod = 106;
        }
    } else if (cp87f20bb1_(l)/*[function]*/) {
        /*assert-production-closure*/
        /*
           314 primary_expression=>• function_expression 
        */
        if ($function_expression(l)) {
            prod = 106;
        }
    } else if (l.utf == 123/*[{]*/) {
        /*assert-production-closure*/
        /*
           313 primary_expression=>• object_literal 
        */
        if ($object_literal(l)) {
            prod = 106;
        }
    } else if (l.utf == 91/*[[]*/) {
        /*assert-production-closure*/
        /*
           312 primary_expression=>• array_literal 
        */
        if ($array_literal(l)) {
            prod = 106;
        }
    } else if (cpdcbfef5f_(l)/*[async]*/) {
        /*peek*/
        /*
           310 primary_expression=>• identifier_reference 
           314 primary_expression=>• function_expression 
        */
        let pk: Lexer = l.copy();
        skip_fn_000(pk.next()/*[ ws ]*/);
        if (cp87f20bb1_(pk)/*[function]*/) {
            /*peek-production-closure*/
            /*
               314 primary_expression=>• function_expression 
            */
            if ($function_expression(l)) {
                prod = 106;
            }
        } else {
            /*peek-production-closure*/
            /*
               310 primary_expression=>• identifier_reference 
            */
            if ($identifier(l)) {
                add_reduce(1, 253);
                prod = 106;
            }
        }
    } else if (assert_consume(l, cpfe029929_(l)/*[this]*/)) {
        /*consume*/
        /*
           309 primary_expression=>τthis • 
        */
        add_reduce(1, 180);
        prod = 106;
    } else if ((((cpe3a3596e_(l)/*[null]*/ || cp3b3b9dc5_(l)/*[false]*/) || cp97ab5935_(l)/*[true]*/) || assert_table(l, 0x0, 0x84, 0x0, 0x0)/*tbl:[ ' ] [ " ]*/) || l.isNum()/*[num]*/) {
        /*assert-production-closure*/
        /*
           311 primary_expression=>• literal 
        */
        if ($literal(l)) {
            prod = 106;
        }
    } else {
        /*assert-production-closure*/
        /*
           310 primary_expression=>• identifier_reference 
        */
        if ($identifier(l)) {
            add_reduce(1, 253);
            prod = 106;
        }
    }
    return assertSuccess(l, prod == 106);
}
function $await_expression(l: Lexer): boolean {
    if (assert_consume(l, cp4cd44fa7_(l)/*[await]*/)) {
        /*consume*/
        /*
           319 await_expression=>τawait • unary_expression 
        */
        skip_fn_(l/*[ ws ][ nl ]*/);
        if ($unary_expression(l)) {
            add_reduce(2, 182);
            prod = 107;
        }
    }
    return assertSuccess(l, prod == 107);
}
function $assignment_expression(l: Lexer): boolean {
    if (cp3e88794b_(l)/*[yield]*/) {
        /*assert-production-closure*/
        /*
           321 assignment_expression=>• yield_expression 
        */
        if ($yield_expression(l)) {
            prod = 108;
        }
    } else if (cp2e37be7d_(l)/*[import]*/) {
        /*peek*/
        /*
           320 assignment_expression=>• conditional_expression 
           323 assignment_expression=>• left_hand_side_expression = assignment_expression 
           324 assignment_expression=>• left_hand_side_expression assignment_operator assignment_expression 
        */
        skip_fn_(l/*[ ws ][ nl ]*/);
        if (assert_consume(l, cp2e37be7d_(l)/*[import]*/)) {
            /*consume*/
            /*
               277 import_meta=>τimport • . τmeta 
               287 import_call=>τimport • ( assignment_expression ) 
            */
            skip_fn_(l/*[ ws ][ nl ]*/);
            if (assert_consume(l, l.utf == 40/*[(]*/)) {
                /*consume*/
                /*
                   287 import_call=>τimport ( • assignment_expression ) 
                */
                skip_fn_(l/*[ ws ][ nl ]*/);
                if ($assignment_expression(l)) {
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if (assert_consume(l, l.utf == 41/*[)]*/)) {
                        add_reduce(4, 175);
                        prod = 97;
                    }
                }
            } else if (assert_consume(l, l.utf == 46/*[.]*/)) {
                /*consume*/
                /*
                   277 import_meta=>τimport . • τmeta 
                */
                skip_fn_(l/*[ ws ][ nl ]*/);
                if (assert_consume(l, cp5da57c06_(l)/*[meta]*/)) {
                    add_reduce(3, 170);
                    prod = 92;
                }
            }
        }
    } else if (cpbbb8c976_(l)/*[super]*/) {
        /*peek*/
        /*
           320 assignment_expression=>• conditional_expression 
           323 assignment_expression=>• left_hand_side_expression = assignment_expression 
           324 assignment_expression=>• left_hand_side_expression assignment_operator assignment_expression 
        */
        skip_fn_(l/*[ ws ][ nl ]*/);
        if (assert_consume(l, cpbbb8c976_(l)/*[super]*/)) {
            /*consume*/
            /*
               273 super_property=>τsuper • . identifier_name 
               274 super_property=>τsuper • [ expression ] 
               286 super_call=>τsuper • arguments 
            */
            skip_fn_(l/*[ ws ][ nl ]*/);
            if (l.utf == 40/*[(]*/) {
                /*assert-production-closure*/
                /*
                   286 super_call=>τsuper • arguments 
                */
                if ($arguments(l)) {
                    add_reduce(2, 174);
                    prod = 97;
                }
            } else if (assert_consume(l, l.utf == 91/*[[]*/)) {
                /*consume*/
                /*
                   274 super_property=>τsuper [ • expression ] 
                */
                skip_fn_(l/*[ ws ][ nl ]*/);
                if ($expression(l)) {
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if (assert_consume(l, l.utf == 93/*[]]*/)) {
                        add_reduce(4, 169);
                        prod = 92;
                    }
                }
            } else if (assert_consume(l, l.utf == 46/*[.]*/)) {
                /*consume*/
                /*
                   273 super_property=>τsuper . • identifier_name 
                */
                skip_fn_(l/*[ ws ][ nl ]*/);
                if ($identifier_name(l)) {
                    add_reduce(3, 168);
                    prod = 92;
                }
            }
        }
    } else if (cp8595dc97_(l)/*[new]*/) {
        /*peek*/
        /*
           320 assignment_expression=>• conditional_expression 
           323 assignment_expression=>• left_hand_side_expression = assignment_expression 
           324 assignment_expression=>• left_hand_side_expression assignment_operator assignment_expression 
        */
        skip_fn_(l/*[ ws ][ nl ]*/);
        if (assert_consume(l, cp8595dc97_(l)/*[new]*/)) {
            /*consume*/
            /*
               272 member_expression=>τnew • member_expression arguments 
               278 new_target=>τnew • . τtarget 
               265 new_expression=>τnew • new_expression 
            */
            skip_fn_(l/*[ ws ][ nl ]*/);
            if (assert_consume(l, l.utf == 46/*[.]*/)) {
                /*consume*/
                /*
                   278 new_target=>τnew . • τtarget 
                */
                skip_fn_(l/*[ ws ][ nl ]*/);
                if (assert_consume(l, cp28cc5037_(l)/*[target]*/)) {
                    add_reduce(3, 171);
                    prod = 92;
                }
            } else if ((assert_table(l, 0x0, 0x8194, 0x88000000, 0x8000001)/*tbl:[ ( ] [ ` ] [ / ] [ { ] [ [ ] [ ' ] [ " ] [ _ ] [ $ ]*/ || l.isNum()/*[num]*/) || l.isID()/*[id]*/) {
                /*peek*/
                /*
                   272 member_expression=>τnew • member_expression arguments 
                   265 new_expression=>τnew • new_expression 
                */
                let mk: i32 = mark();
                let anchor: Lexer = l.copy();
                /*92*/
                if ($member_expression(l)) {
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if ($arguments(l)) {
                        add_reduce(3, 167);
                        prod = 92;
                    }
                }
                if (reset(mk, anchor, l, prod == 90)) {
                    prod = -1;
                    if ($new_expression(l)) {
                        add_reduce(2, 163);
                        prod = 90;
                    }
                }
            }
        }
    } else if (l.utf == 40/*[(]*/) {
        /*peek*/
        /*
           320 assignment_expression=>• conditional_expression 
           322 assignment_expression=>• arrow_function 
           323 assignment_expression=>• left_hand_side_expression = assignment_expression 
           324 assignment_expression=>• left_hand_side_expression assignment_operator assignment_expression 
        */
        skip_fn_(l/*[ ws ][ nl ]*/);
        if (assert_consume(l, l.utf == 40/*[(]*/)) {
            /*consume*/
            /*
               403 parenthesized=>( • expression ) 
               396 cover_parenthesized_expression_and_arrow_parameter_list=>( • ) 
               397 cover_parenthesized_expression_and_arrow_parameter_list=>( • expression , ) 
               398 cover_parenthesized_expression_and_arrow_parameter_list=>( • cover_parenthesized_expression_and_arrow_parameter_list_group_1282_114 ) 
               399 cover_parenthesized_expression_and_arrow_parameter_list=>( • cover_parenthesized_expression_and_arrow_parameter_list_group_1284_115 ) 
               400 cover_parenthesized_expression_and_arrow_parameter_list=>( • expression , cover_parenthesized_expression_and_arrow_parameter_list_group_1282_114 ) 
               401 cover_parenthesized_expression_and_arrow_parameter_list=>( • expression , cover_parenthesized_expression_and_arrow_parameter_list_group_1284_115 ) 
            */
            if (cp7fa4386a_(l)/*[...]*/) {
                /*peek*/
                /*
                   398 cover_parenthesized_expression_and_arrow_parameter_list=>( • cover_parenthesized_expression_and_arrow_parameter_list_group_1282_114 ) 
                   399 cover_parenthesized_expression_and_arrow_parameter_list=>( • cover_parenthesized_expression_and_arrow_parameter_list_group_1284_115 ) 
                */
                if (cp7fa4386a_(l)/*[...]*/) {
                    /*peek*/
                    /*
                       398 cover_parenthesized_expression_and_arrow_parameter_list=>( • cover_parenthesized_expression_and_arrow_parameter_list_group_1282_114 ) 
                       399 cover_parenthesized_expression_and_arrow_parameter_list=>( • cover_parenthesized_expression_and_arrow_parameter_list_group_1284_115 ) 
                    */
                    let pk: Lexer = l.copy();
                    skip_fn_(pk.next()/*[ ws ][ nl ]*/);
                    if (assert_table(pk, 0x0, 0x0, 0x8000000, 0x8000000)/*tbl:[ [ ] [ { ]*/) {
                        /*peek-production-closure*/
                        /*
                           399 cover_parenthesized_expression_and_arrow_parameter_list=>( • cover_parenthesized_expression_and_arrow_parameter_list_group_1284_115 ) 
                        */
                        if ($cover_parenthesized_expression_and_arrow_parameter_list_group_1284_115(l)) {
                            skip_fn_(l/*[ ws ][ nl ]*/);
                            if (assert_consume(l, l.utf == 41/*[)]*/)) {
                                add_reduce(3, 204);
                                add_reduce(1, 127);
                                prod = 79;
                            }
                        }
                    } else {
                        /*peek-production-closure*/
                        /*
                           398 cover_parenthesized_expression_and_arrow_parameter_list=>( • cover_parenthesized_expression_and_arrow_parameter_list_group_1282_114 ) 
                        */
                        if ($cover_parenthesized_expression_and_arrow_parameter_list_group_1282_114(l)) {
                            skip_fn_(l/*[ ws ][ nl ]*/);
                            if (assert_consume(l, l.utf == 41/*[)]*/)) {
                                add_reduce(3, 204);
                                add_reduce(1, 127);
                                prod = 79;
                            }
                        }
                    }
                }
            } else if (assert_consume(l, l.utf == 41/*[)]*/)) {
                /*consume*/
                /*
                   396 cover_parenthesized_expression_and_arrow_parameter_list=>( ) • 
                */
                add_reduce(2, 203);
                add_reduce(1, 127);
                prod = 79;
            } else {
                /*peek-production-closure*/
                /*
                   403 parenthesized=>( • expression ) 
                   397 cover_parenthesized_expression_and_arrow_parameter_list=>( • expression , ) 
                   400 cover_parenthesized_expression_and_arrow_parameter_list=>( • expression , cover_parenthesized_expression_and_arrow_parameter_list_group_1282_114 ) 
                   401 cover_parenthesized_expression_and_arrow_parameter_list=>( • expression , cover_parenthesized_expression_and_arrow_parameter_list_group_1284_115 ) 
                */
                skip_fn_(l/*[ ws ][ nl ]*/);
                if ($expression(l)) {
                    /*assert*/
                    /*
                       403 parenthesized=>( • expression ) 
                       397 cover_parenthesized_expression_and_arrow_parameter_list=>( • expression , ) 
                       400 cover_parenthesized_expression_and_arrow_parameter_list=>( • expression , cover_parenthesized_expression_and_arrow_parameter_list_group_1282_114 ) 
                       401 cover_parenthesized_expression_and_arrow_parameter_list=>( • expression , cover_parenthesized_expression_and_arrow_parameter_list_group_1284_115 ) 
                    */
                    if (l.utf == 44/*[,]*/) {
                        /*peek*/
                        /*
                           397 cover_parenthesized_expression_and_arrow_parameter_list=>( expression • , ) 
                           400 cover_parenthesized_expression_and_arrow_parameter_list=>( expression • , cover_parenthesized_expression_and_arrow_parameter_list_group_1282_114 ) 
                           401 cover_parenthesized_expression_and_arrow_parameter_list=>( expression • , cover_parenthesized_expression_and_arrow_parameter_list_group_1284_115 ) 
                        */
                        let pk: Lexer = l.copy();
                        skip_fn_(pk.next()/*[ ws ][ nl ]*/);
                        if (cp7fa4386a_(pk)/*[...]*/) {
                            /*peek*/
                            /*
                               400 cover_parenthesized_expression_and_arrow_parameter_list=>( expression • , cover_parenthesized_expression_and_arrow_parameter_list_group_1282_114 ) 
                               401 cover_parenthesized_expression_and_arrow_parameter_list=>( expression • , cover_parenthesized_expression_and_arrow_parameter_list_group_1284_115 ) 
                            */
                            skip_fn_(l/*[ ws ][ nl ]*/);
                            if (assert_consume(l, l.utf == 44/*[,]*/)) {
                                /*consume*/
                                /*
                                   400 cover_parenthesized_expression_and_arrow_parameter_list=>( expression , • cover_parenthesized_expression_and_arrow_parameter_list_group_1282_114 ) 
                                   401 cover_parenthesized_expression_and_arrow_parameter_list=>( expression , • cover_parenthesized_expression_and_arrow_parameter_list_group_1284_115 ) 
                                */
                                if (cp7fa4386a_(l)/*[...]*/) {
                                    /*peek*/
                                    /*
                                       400 cover_parenthesized_expression_and_arrow_parameter_list=>( expression , • cover_parenthesized_expression_and_arrow_parameter_list_group_1282_114 ) 
                                       401 cover_parenthesized_expression_and_arrow_parameter_list=>( expression , • cover_parenthesized_expression_and_arrow_parameter_list_group_1284_115 ) 
                                    */
                                    let pk: Lexer = l.copy();
                                    skip_fn_(pk.next()/*[ ws ][ nl ]*/);
                                    if (assert_table(pk, 0x0, 0x0, 0x8000000, 0x8000000)/*tbl:[ [ ] [ { ]*/) {
                                        /*peek-production-closure*/
                                        /*
                                           401 cover_parenthesized_expression_and_arrow_parameter_list=>( expression , • cover_parenthesized_expression_and_arrow_parameter_list_group_1284_115 ) 
                                        */
                                        if ($cover_parenthesized_expression_and_arrow_parameter_list_group_1284_115(l)) {
                                            skip_fn_(l/*[ ws ][ nl ]*/);
                                            if (assert_consume(l, l.utf == 41/*[)]*/)) {
                                                add_reduce(5, 205);
                                                add_reduce(1, 127);
                                                prod = 79;
                                            }
                                        }
                                    } else {
                                        /*peek-production-closure*/
                                        /*
                                           400 cover_parenthesized_expression_and_arrow_parameter_list=>( expression , • cover_parenthesized_expression_and_arrow_parameter_list_group_1282_114 ) 
                                        */
                                        if ($cover_parenthesized_expression_and_arrow_parameter_list_group_1282_114(l)) {
                                            skip_fn_(l/*[ ws ][ nl ]*/);
                                            if (assert_consume(l, l.utf == 41/*[)]*/)) {
                                                add_reduce(5, 205);
                                                add_reduce(1, 127);
                                                prod = 79;
                                            }
                                        }
                                    }
                                }
                            }
                        } else if (pk.utf == 41/*[)]*/) {
                            /*peek*/
                            /*
                               397 cover_parenthesized_expression_and_arrow_parameter_list=>( expression • , ) 
                            */
                            if (assert_consume(l, l.utf == 44/*[,]*/)) {
                                skip_fn_(l/*[ ws ][ nl ]*/);
                                if (assert_consume(l, l.utf == 41/*[)]*/)) {
                                    add_reduce(4, 204);
                                    add_reduce(1, 127);
                                    prod = 79;
                                }
                            }
                        }
                    } else if (assert_consume(l, l.utf == 41/*[)]*/)) {
                        /*consume*/
                        /*
                           403 parenthesized=>( expression ) • 
                        */
                        add_reduce(3, 204);
                        prod = 131;
                    }
                }
            }
        }
    } else if (l.utf == 96/*[`]*/) {
        /*peek*/
        /*
           320 assignment_expression=>• conditional_expression 
           323 assignment_expression=>• left_hand_side_expression = assignment_expression 
           324 assignment_expression=>• left_hand_side_expression assignment_operator assignment_expression 
        */
        skip_fn_(l/*[ ws ][ nl ]*/);
        if (assert_consume(l, l.utf == 96/*[`]*/)) {
            /*consume*/
            /*
               475 no_substitute_template=>` • ` 
               481 template_head=>` • ${ 
            */
            skip_fn_(l/*[ ws ][ nl ]*/);
            if (assert_consume(l, cped7e7079_(l)/*[${]*/)) {
                /*consume*/
                /*
                   481 template_head=>` ${ • 
                */
                add_reduce(2, 242);
                prod = 162;
            } else if (assert_consume(l, l.utf == 96/*[`]*/)) {
                /*consume*/
                /*
                   475 no_substitute_template=>` ` • 
                */
                add_reduce(2, 238);
                prod = 92;
            }
        }
    } else if (l.utf == 47/*[/]*/) {
        /*assert-production-closure*/
        /*
           436 regular_expression_literal=>• / / def$js_identifier 
        */
        if ($regular_expression_literal(l)) {
            prod = 92;
        }
    } else if (cp1f027896_(l)/*[class]*/) {
        /*assert-production-closure*/
        /*
           223 class_expression=>• τclass binding_identifier class_heritage { class_body } 
        */
        if ($class_expression(l)) {
            prod = 92;
        }
    } else if (cp87f20bb1_(l)/*[function]*/) {
        /*assert-production-closure*/
        /*
           176 function_expression=>• τfunction function_declaration_group_0115_109 binding_identifier ( formal_parameters ) { function_body } 
        */
        if ($function_expression(l)) {
            prod = 92;
        }
    } else if (l.utf == 123/*[{]*/) {
        /*assert-production-closure*/
        /*
           439 object_literal=>• { } 
        */
        if ($object_literal(l)) {
            prod = 92;
        }
    } else if (l.utf == 91/*[[]*/) {
        /*assert-production-closure*/
        /*
           457 array_literal=>• [ elision ] 
        */
        if ($array_literal(l)) {
            prod = 92;
        }
    } else if (cpe3a3596e_(l)/*[null]*/) {
        /*assert-production-closure*/
        /*
           518 null_literal=>• τnull 
        */
        if ($null_literal(l)) {
            prod = 92;
        }
    } else if (cpdcbfef5f_(l)/*[async]*/) {
        /*peek*/
        /*
           320 assignment_expression=>• conditional_expression 
           322 assignment_expression=>• arrow_function 
           323 assignment_expression=>• left_hand_side_expression = assignment_expression 
           324 assignment_expression=>• left_hand_side_expression assignment_operator assignment_expression 
        */
        let pk: Lexer = l.copy();
        skip_fn_(pk.next()/*[ ws ][ nl ]*/);
        if (cp87f20bb1_(pk)/*[function]*/) {
            /*assert-production-closure*/
            /*
               175 function_expression=>• τasync τfunction function_declaration_group_0115_109 binding_identifier ( formal_parameters ) { function_body } 
            */
            if ($function_expression(l)) {
                prod = 92;
            }
        } else if (pk.utf == 40/*[(]*/) {
            /*peek*/
            /*
               320 assignment_expression=>• conditional_expression 
               322 assignment_expression=>• arrow_function 
               323 assignment_expression=>• left_hand_side_expression = assignment_expression 
               324 assignment_expression=>• left_hand_side_expression assignment_operator assignment_expression 
            */
            skip_fn_(l/*[ ws ][ nl ]*/);
            if (assert_consume(l, cpdcbfef5f_(l)/*[async]*/)) {
                /*consume*/
                /*
                   529 unreserved_word=>τasync • 
                   208 arrow_function=>τasync • arrow_parameters => concise_body 
                */
                skip_fn_000(l/*[ ws ]*/);
                if (assert_table(l, 0x0, 0x110, 0x80000000, 0x0)/*tbl:[ $ ] [ _ ] [ ( ]*/ || l.isID()/*[id]*/) {
                    /*assert-production-closure*/
                    /*
                       208 arrow_function=>τasync • arrow_parameters => concise_body 
                    */
                    if ($arrow_parameters(l)) {
                        skip_fn_(l/*[ ws ][ nl ]*/);
                        if (assert_consume(l, cpf526e31a_(l)/*[=>]*/)) {
                            skip_fn_(l/*[ ws ][ nl ]*/);
                            if ($concise_body(l)) {
                                add_reduce(4, 124);
                                prod = 108;
                            }
                        }
                    }
                } else {
                    /*assert-end*/
                    /*
                       529 unreserved_word=>τasync • 
                    */
                    add_reduce(1, 254);
                    add_reduce(1, 253);
                    prod = 177;
                }
            }
        } else if ((((((((((((((cp0dd8c784_(pk)/*[?] [??] [?.]*/ || cpb3d7011a_(pk)/*[||] [|] [|=]*/) || cp7e436356_(pk)/*[^] [^=]*/) || cp7d15091b_(pk)/*[&] [&=]*/) || cpc102d490_(pk)/*[!==] [!=]*/) || cpad60fe53_(pk)/*[===] [==] [=] [=>]*/) || cp9cee9bf7_(pk)/*[<] [<=] [<<] [<<=]*/) || cpd4ebf6f8_(pk)/*[>] [>=] [>>>] [>>] [>>>=] [>>=]*/) || cpcbadb5c4_(pk)/*[instanceof] [in]*/) || cp709acfcd_(pk)/*[+] [+=] [++]*/) || cp40cf8450_(pk)/*[-] [-=] [--]*/) || cpf7472959_(pk)/*[%] [%=]*/) || cp228079b2_(pk)/*[/] [/=]*/) || cp2d4154bd_(pk)/*[asteriskasterisk] [asteriskasterisk=] [asterisk]*/) || assert_table(pk, 0x0, 0x4000, 0x8000000, 0x1)/*tbl:[ ` ] [ . ] [ [ ]*/) {
            /*assert-production-closure*/
            /*
               529 unreserved_word=>• τasync 
            */
            if ($unreserved_word(l)) {
                add_reduce(1, 254);
                add_reduce(1, 253);
                prod = 177;
            }
        } else {
            /*peek-production-closure*/
            /*
               322 assignment_expression=>• arrow_function 
            */
            if ($arrow_function(l)) {
                prod = 108;
            }
        }
    } else if (cpfe029929_(l)/*[this]*/) {
        /*assert-production-closure*/
        /*
           309 primary_expression=>• τthis 
        */
        if ($primary_expression(l)) {
            prod = 92;
        }
    } else if (l.isNum()/*[num]*/) {
        /*peek*/
        /*
           320 assignment_expression=>• conditional_expression 
           323 assignment_expression=>• left_hand_side_expression = assignment_expression 
           324 assignment_expression=>• left_hand_side_expression assignment_operator assignment_expression 
        */
        skip_fn_(l/*[ ws ][ nl ]*/);
        if (assert_consume(l, l.isNum()/*[num]*/)) {
            /*consume*/
            /*
               517 numeric_literal=>θnum • 
               516 bigint=>θnum • τn 
            */
            skip_fn_000(l/*[ ws ]*/);
            if (assert_consume(l, cpc1d70283_(l)/*[n]*/)) {
                /*consume*/
                /*
                   516 bigint=>θnum τn • 
                */
                add_reduce(2, 248);
                prod = 92;
            } else {
                /*assert-end*/
                /*
                   517 numeric_literal=>θnum • 
                */
                add_reduce(1, 249);
                prod = 92;
            }
        }
    } else if (assert_table(l, 0x0, 0x84, 0x0, 0x0)/*tbl:[ ' ] [ " ]*/) {
        /*assert-production-closure*/
        /*
           499 string_literal=>• ' single_quote_string ' 
           498 string_literal=>• " double_quote_string " 
        */
        if ($string_literal(l)) {
            prod = 92;
        }
    } else if (cp3b3b9dc5_(l)/*[false]*/ || cp97ab5935_(l)/*[true]*/) {
        /*assert-production-closure*/
        /*
           520 boolean_literal=>• τfalse 
           519 boolean_literal=>• τtrue 
        */
        if ($boolean_literal(l)) {
            prod = 92;
        }
    } else if ((((cp65c0e04e_(l)/*[from]*/ || cp00a86e9e_(l)/*[as]*/) || cp28cc5037_(l)/*[target]*/) || cp248c12d4_(l)/*[set]*/) || cp47b3f727_(l)/*[get]*/) {
        /*assert-production-closure*/
        /*
           534 unreserved_word=>• τfrom 
           533 unreserved_word=>• τas 
           532 unreserved_word=>• τtarget 
           531 unreserved_word=>• τset 
           530 unreserved_word=>• τget 
        */
        if ($unreserved_word(l)) {
            add_reduce(1, 254);
            add_reduce(1, 253);
            prod = 177;
        }
    } else if ((((((cp4cd44fa7_(l)/*[await]*/ || cpfaa7aa14_(l)/*[-] [--]*/) || cp0ac89158_(l)/*[+] [++]*/) || cp5a8be194_(l)/*[typeof]*/) || cp3617ce6e_(l)/*[void]*/) || cpc7ed71c1_(l)/*[delete]*/) || assert_table(l, 0x0, 0x2, 0x0, 0x40000000)/*tbl:[ ! ] [ ~ ]*/) {
        /*assert-production-closure*/
        /*
           320 assignment_expression=>• conditional_expression 
        */
        if ($conditional_expression(l)) {
            prod = 108;
        }
    } else {
        /*assert-production-closure*/
        /*
           548 composite_identifier=>• _ 
           547 composite_identifier=>• $ 
           546 composite_identifier=>• θid 
        */
        if ($composite_identifier(l)) {
            add_reduce(1, 254);
            add_reduce(1, 253);
            prod = 177;
        }
    }
    while (true) {
        let ACCEPT: boolean = false;
        switch (prod) {
            case 79:
                skip_fn_(l/*[ ws ][ nl ]*/);
                if (assert_consume(l, cpf526e31a_(l)/*[=>]*/)) {
                    /*consume*/
                    /*
                       209 arrow_function=>arrow_parameters => • concise_body 
                    */
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if ($concise_body(l)) {
                        add_reduce(3, 125);
                        prod = 108;
                        ACCEPT = true;
                    }
                }
                break;
            case 90:
                skip_fn_000(l/*[ ws ]*/);
                if (assert_consume(l, l.utf == 61/*[=]*/)) {
                    /*consume*/
                    /*
                       323 assignment_expression=>left_hand_side_expression = • assignment_expression 
                    */
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if ($assignment_expression(l)) {
                        add_reduce(3, 183);
                        prod = 108;
                        ACCEPT = true;
                    }
                } else if (assert_consume(l, cpa70bdd76_(l)/*[++]*/ || cpb9a3d66d_(l)/*[--]*/)) {
                    /*consume*/
                    /*
                       390 update_expression=>left_hand_side_expression ++ • 
                       391 update_expression=>left_hand_side_expression -- • 
                    */
                    add_reduce(2, 201);
                    prod = 126;
                    ACCEPT = true;
                } else if (((((((((cp8687cbf2_(l)/*[asteriskasterisk=] [asterisk]*/ || cpf9ccda11_(l)/*[|=]*/) || cpbd75a16c_(l)/*[^=]*/) || cpbd0a1baf_(l)/*[&=]*/) || cpa053380f_(l)/*[>>>=] [>>=]*/) || cp0bb67c25_(l)/*[<<=]*/) || cp8a61c8c0_(l)/*[-=]*/) || cpfa882b22_(l)/*[+=]*/) || cpba9dd503_(l)/*[%=]*/) || cp29720e9d_(l)/*[/=]*/) {
                    /*assert-production-closure*/
                    /*
                       324 assignment_expression=>left_hand_side_expression • assignment_operator assignment_expression 
                    */
                    if ($assignment_operator(l)) {
                        skip_fn_(l/*[ ws ][ nl ]*/);
                        if ($assignment_expression(l)) {
                            add_reduce(3, 184);
                            prod = 108;
                            ACCEPT = true;
                        }
                    }
                } else {
                    /*assert-end*/
                    /*
                       389 update_expression=>left_hand_side_expression • 
                    */
                    prod = 126;
                    ACCEPT = true;
                }
                break;
            case 92:
                skip_fn_000(l/*[ ws ]*/);
                if (assert_consume(l, l.utf == 91/*[[]*/)) {
                    /*consume*/
                    /*
                       267 member_expression=>member_expression [ • expression ] 
                    */
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if ($expression(l)) {
                        skip_fn_(l/*[ ws ][ nl ]*/);
                        if (assert_consume(l, l.utf == 93/*[]]*/)) {
                            add_reduce(4, 164);
                            prod = 92;
                            ACCEPT = true;
                        }
                    }
                } else if (assert_consume(l, l.utf == 46/*[.]*/)) {
                    /*consume*/
                    /*
                       268 member_expression=>member_expression . • identifier_name 
                    */
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if ($identifier_name(l)) {
                        add_reduce(3, 165);
                        prod = 92;
                        ACCEPT = true;
                    }
                } else if (l.utf == 96/*[`]*/) {
                    /*assert-production-closure*/
                    /*
                       269 member_expression=>member_expression • template_literal 
                    */
                    if ($template_literal(l)) {
                        add_reduce(2, 166);
                        prod = 92;
                        ACCEPT = true;
                    }
                } else if (l.utf == 40/*[(]*/) {
                    /*assert-production-closure*/
                    /*
                       214 cover_call_expression_and_async_arrow_head=>member_expression • arguments 
                    */
                    if ($arguments(l)) {
                        add_reduce(2, 129);
                        prod = 97;
                        ACCEPT = true;
                    }
                } else if (cp2f3a2b3c_(l)/*[?.]*/) {
                    /*assert-production-closure*/
                    /*
                       298 optional_expression=>member_expression • optional_chain 
                    */
                    if ($optional_chain(l)) {
                        add_reduce(2, 179);
                        prod = 104;
                        ACCEPT = true;
                    }
                } else {
                    /*assert-end*/
                    /*
                       264 new_expression=>member_expression • 
                    */
                    prod = 90;
                    ACCEPT = true;
                }
                break;
            case 97:
                skip_fn_000(l/*[ ws ]*/);
                if (assert_consume(l, l.utf == 46/*[.]*/)) {
                    /*consume*/
                    /*
                       279 call_expression=>call_expression . • identifier_name 
                    */
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if ($identifier_name(l)) {
                        add_reduce(3, 165);
                        prod = 97;
                        ACCEPT = true;
                    }
                } else if (l.utf == 40/*[(]*/) {
                    /*assert-production-closure*/
                    /*
                       282 call_expression=>call_expression • arguments 
                    */
                    if ($arguments(l)) {
                        add_reduce(2, 172);
                        prod = 97;
                        ACCEPT = true;
                    }
                } else if (assert_consume(l, l.utf == 91/*[[]*/)) {
                    /*consume*/
                    /*
                       283 call_expression=>call_expression [ • expression ] 
                    */
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if ($expression(l)) {
                        skip_fn_(l/*[ ws ][ nl ]*/);
                        if (assert_consume(l, l.utf == 93/*[]]*/)) {
                            add_reduce(4, 164);
                            prod = 97;
                            ACCEPT = true;
                        }
                    }
                } else if (l.utf == 96/*[`]*/) {
                    /*assert-production-closure*/
                    /*
                       285 call_expression=>call_expression • template_literal 
                    */
                    if ($template_literal(l)) {
                        add_reduce(2, 173);
                        prod = 97;
                        ACCEPT = true;
                    }
                } else if (cp2f3a2b3c_(l)/*[?.]*/) {
                    /*assert-production-closure*/
                    /*
                       299 optional_expression=>call_expression • optional_chain 
                    */
                    if ($optional_chain(l)) {
                        add_reduce(2, 179);
                        prod = 104;
                        ACCEPT = true;
                    }
                } else {
                    /*assert-end*/
                    /*
                       262 left_hand_side_expression=>call_expression • 
                    */
                    prod = 90;
                    ACCEPT = true;
                }
                break;
            case 104:
                skip_fn_000(l/*[ ws ]*/);
                if (cp2f3a2b3c_(l)/*[?.]*/) {
                    /*assert-production-closure*/
                    /*
                       300 optional_expression=>optional_expression • optional_chain 
                    */
                    if ($optional_chain(l)) {
                        add_reduce(2, 179);
                        prod = 104;
                        ACCEPT = true;
                    }
                } else {
                    /*assert-end*/
                    /*
                       263 left_hand_side_expression=>optional_expression • 
                    */
                    prod = 90;
                    ACCEPT = true;
                }
                break;
            case 111:
                skip_fn_000(l/*[ ws ]*/);
                if (assert_consume(l, l.utf == 63/*[?]*/)) {
                    /*consume*/
                    /*
                       338 conditional_expression=>short_circuit_expression ? • assignment_expression : assignment_expression 
                    */
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if ($assignment_expression(l)) {
                        skip_fn_(l/*[ ws ][ nl ]*/);
                        if (assert_consume(l, l.utf == 58/*[:]*/)) {
                            skip_fn_(l/*[ ws ][ nl ]*/);
                            if ($assignment_expression(l)) {
                                add_reduce(5, 185);
                                prod = 108;
                                ACCEPT = true;
                            }
                        }
                    }
                } else {
                    /*assert-end*/
                    /*
                       337 conditional_expression=>short_circuit_expression • 
                    */
                    prod = 108;
                    ACCEPT = true;
                }
                break;
            case 112:
                skip_fn_000(l/*[ ws ]*/);
                if (assert_consume(l, cp600b6f48_(l)/*[||]*/)) {
                    /*consume*/
                    /*
                       342 logical_or_expression=>logical_or_expression || • logical_and_expression 
                    */
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if ($logical_and_expression(l)) {
                        add_reduce(3, 186);
                        prod = 112;
                        ACCEPT = true;
                    }
                } else {
                    /*assert-end*/
                    /*
                       339 short_circuit_expression=>logical_or_expression • 
                    */
                    prod = 111;
                    ACCEPT = true;
                }
                break;
            case 113:
                skip_fn_000(l/*[ ws ]*/);
                if (assert_consume(l, l.utf == 38/*[&]*/)) {
                    /*consume*/
                    /*
                       344 logical_and_expression=>logical_and_expression & • & bitwise_or_expression 
                    */
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if (assert_consume(l, l.utf == 38/*[&]*/)) {
                        skip_fn_(l/*[ ws ][ nl ]*/);
                        if ($bitwise_or_expression(l)) {
                            add_reduce(4, 186);
                            prod = 113;
                            ACCEPT = true;
                        }
                    }
                } else {
                    /*assert-end*/
                    /*
                       341 logical_or_expression=>logical_and_expression • 
                    */
                    prod = 112;
                    ACCEPT = true;
                }
                break;
            case 114:
                skip_fn_000(l/*[ ws ]*/);
                if (l.utf == 63/*[?]*/) {
                    /*assert-end*/
                    /*
                       340 short_circuit_expression=>coalesce_expression • 
                    */
                    prod = 111;
                    ACCEPT = true;
                } else {
                    /*assert-end*/
                    /*
                       346 coalesce_expression_head_group_0233_113=>coalesce_expression • 
                    */
                    prod = 116;
                    ACCEPT = true;
                }
                break;
            case 116:
                skip_fn_(l/*[ ws ][ nl ]*/);
                if (assert_consume(l, cp628ccfc7_(l)/*[??]*/)) {
                    /*consume*/
                    /*
                       345 coalesce_expression=>coalesce_expression_head ?? • bitwise_or_expression 
                    */
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if ($bitwise_or_expression(l)) {
                        add_reduce(3, 187);
                        prod = 114;
                        ACCEPT = true;
                    }
                }
                break;
            case 117:
                skip_fn_000(l/*[ ws ]*/);
                if (assert_consume(l, l.utf == 124/*[|]*/)) {
                    /*consume*/
                    /*
                       350 bitwise_or_expression=>bitwise_or_expression | • bitwise_xor_expression 
                    */
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if ($bitwise_xor_expression(l)) {
                        add_reduce(3, 188);
                        prod = 117;
                        ACCEPT = true;
                    }
                } else if (cp628ccfc7_(l)/*[??]*/) {
                    /*assert-end*/
                    /*
                       347 coalesce_expression_head_group_0233_113=>bitwise_or_expression • 
                    */
                    prod = 116;
                    ACCEPT = true;
                } else {
                    /*assert-end*/
                    /*
                       343 logical_and_expression=>bitwise_or_expression • 
                    */
                    prod = 113;
                    ACCEPT = true;
                }
                break;
            case 118:
                skip_fn_000(l/*[ ws ]*/);
                if (assert_consume(l, l.utf == 94/*[^]*/)) {
                    /*consume*/
                    /*
                       352 bitwise_xor_expression=>bitwise_xor_expression ^ • bitwise_and_expression 
                    */
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if ($bitwise_and_expression(l)) {
                        add_reduce(3, 188);
                        prod = 118;
                        ACCEPT = true;
                    }
                } else {
                    /*assert-end*/
                    /*
                       349 bitwise_or_expression=>bitwise_xor_expression • 
                    */
                    prod = 117;
                    ACCEPT = true;
                }
                break;
            case 119:
                skip_fn_000(l/*[ ws ]*/);
                if (assert_consume(l, l.utf == 38/*[&]*/)) {
                    /*consume*/
                    /*
                       354 bitwise_and_expression=>bitwise_and_expression & • equality_expression 
                    */
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if ($equality_expression(l)) {
                        add_reduce(3, 188);
                        prod = 119;
                        ACCEPT = true;
                    }
                } else {
                    /*assert-end*/
                    /*
                       351 bitwise_xor_expression=>bitwise_and_expression • 
                    */
                    prod = 118;
                    ACCEPT = true;
                }
                break;
            case 120:
                skip_fn_000(l/*[ ws ]*/);
                if (assert_consume(l, cp35644963_(l)/*[==] [===]*/ || cpc102d490_(l)/*[!=] [!==]*/)) {
                    /*consume*/
                    /*
                       356 equality_expression=>equality_expression == • relational_expression 
                       357 equality_expression=>equality_expression != • relational_expression 
                       358 equality_expression=>equality_expression === • relational_expression 
                       359 equality_expression=>equality_expression !== • relational_expression 
                    */
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if ($relational_expression(l)) {
                        add_reduce(3, 189);
                        prod = 120;
                        ACCEPT = true;
                    }
                } else {
                    /*assert-end*/
                    /*
                       353 bitwise_and_expression=>equality_expression • 
                    */
                    prod = 119;
                    ACCEPT = true;
                }
                break;
            case 121:
                skip_fn_000(l/*[ ws ]*/);
                if (assert_consume(l, cp7d807160_(l)/*[instanceof]*/)) {
                    /*consume*/
                    /*
                       365 relational_expression=>relational_expression τinstanceof • shift_expression 
                    */
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if ($shift_expression(l)) {
                        add_reduce(3, 191);
                        prod = 121;
                        ACCEPT = true;
                    }
                } else if (assert_consume(l, cp0725ae43_(l)/*[in]*/)) {
                    /*consume*/
                    /*
                       366 relational_expression=>relational_expression τin • shift_expression 
                    */
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if ($shift_expression(l)) {
                        add_reduce(3, 192);
                        prod = 121;
                        ACCEPT = true;
                    }
                } else if (assert_consume(l, cpee595c53_(l)/*[<] [<=]*/ || cp744cb68c_(l)/*[>] [>=]*/)) {
                    /*consume*/
                    /*
                       361 relational_expression=>relational_expression < • shift_expression 
                       362 relational_expression=>relational_expression > • shift_expression 
                       363 relational_expression=>relational_expression <= • shift_expression 
                       364 relational_expression=>relational_expression >= • shift_expression 
                    */
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if ($shift_expression(l)) {
                        add_reduce(3, 190);
                        prod = 121;
                        ACCEPT = true;
                    }
                } else {
                    /*assert-end*/
                    /*
                       355 equality_expression=>relational_expression • 
                    */
                    prod = 120;
                    ACCEPT = true;
                }
                break;
            case 122:
                skip_fn_000(l/*[ ws ]*/);
                if (assert_consume(l, cp1ec153e7_(l)/*[<<]*/ || cp0b554d4a_(l)/*[>>] [>>>]*/)) {
                    /*consume*/
                    /*
                       368 shift_expression=>shift_expression << • additive_expression 
                       369 shift_expression=>shift_expression >> • additive_expression 
                       370 shift_expression=>shift_expression >>> • additive_expression 
                    */
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if ($additive_expression(l)) {
                        add_reduce(3, 193);
                        prod = 122;
                        ACCEPT = true;
                    }
                } else {
                    /*assert-end*/
                    /*
                       360 relational_expression=>shift_expression • 
                    */
                    prod = 121;
                    ACCEPT = true;
                }
                break;
            case 123:
                skip_fn_000(l/*[ ws ]*/);
                if (assert_consume(l, assert_table(l, 0x0, 0x2800, 0x0, 0x0)/*tbl:[ + ] [ - ]*/)) {
                    /*consume*/
                    /*
                       372 additive_expression=>additive_expression + • multiplicative_expression 
                       373 additive_expression=>additive_expression - • multiplicative_expression 
                    */
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if ($multiplicative_expression(l)) {
                        add_reduce(3, 194);
                        prod = 123;
                        ACCEPT = true;
                    }
                } else {
                    /*assert-end*/
                    /*
                       367 shift_expression=>additive_expression • 
                    */
                    prod = 122;
                    ACCEPT = true;
                }
                break;
            case 124:
                skip_fn_000(l/*[ ws ]*/);
                if (assert_consume(l, assert_table(l, 0x0, 0x8420, 0x0, 0x0)/*tbl:[ * ] [ / ] [ % ]*/)) {
                    /*consume*/
                    /*
                       375 multiplicative_expression=>multiplicative_expression * • exponentiation_expression 
                       376 multiplicative_expression=>multiplicative_expression / • exponentiation_expression 
                       377 multiplicative_expression=>multiplicative_expression % • exponentiation_expression 
                    */
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if ($exponentiation_expression(l)) {
                        add_reduce(3, 195);
                        prod = 124;
                        ACCEPT = true;
                    }
                } else {
                    /*assert-end*/
                    /*
                       371 additive_expression=>multiplicative_expression • 
                    */
                    prod = 123;
                    ACCEPT = true;
                }
                break;
            case 126:
                skip_fn_000(l/*[ ws ]*/);
                if (assert_consume(l, cpf2b923e4_(l)/*[asteriskasterisk]*/)) {
                    /*consume*/
                    /*
                       379 exponentiation_expression=>unary_expression ** • exponentiation_expression 
                    */
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if ($exponentiation_expression(l)) {
                        add_reduce(3, 196);
                        prod = 124;
                        ACCEPT = true;
                    }
                } else {
                    /*assert-end*/
                    /*
                       378 exponentiation_expression=>unary_expression • 
                    */
                    prod = 124;
                    ACCEPT = true;
                }
                break;
            case 131:
                skip_fn_000(l/*[ ws ]*/);
                if (cpf526e31a_(l)/*[=>]*/) {
                    /*assert-end*/
                    /*
                       402 cover_parenthesized_expression_and_arrow_parameter_list=>parenthesized • 
                    */
                    add_reduce(1, 127);
                    prod = 79;
                    ACCEPT = true;
                } else {
                    /*assert-end*/
                    /*
                       318 primary_expression=>parenthesized • 
                    */
                    add_reduce(1, 181);
                    prod = 92;
                    ACCEPT = true;
                }
                break;
            case 162:
                skip_fn_(l/*[ ws ][ nl ]*/);
                if ((((cp0ac89158_(l)/*[+] [++]*/ || cpfaa7aa14_(l)/*[-] [--]*/) || assert_table(l, 0x0, 0x8196, 0x88000000, 0x48000001)/*tbl:[ ( ] [ $ ] [ _ ] [ " ] [ ' ] [ [ ] [ { ] [ / ] [ ` ] [ ~ ] [ ! ]*/) || l.isID()/*[id]*/) || l.isNum()/*[num]*/) {
                    /*assert-production-closure*/
                    /*
                       476 substitute_template=>template_head • expression template_spans 
                    */
                    if ($expression(l)) {
                        skip_fn_(l/*[ ws ][ nl ]*/);
                        if ($template_spans(l)) {
                            add_reduce(3, 239);
                            prod = 92;
                            ACCEPT = true;
                        }
                    }
                }
                break;
            case 177:
                skip_fn_000(l/*[ ws ]*/);
                if (cpf526e31a_(l)/*[=>]*/) {
                    /*assert-end*/
                    /*
                       210 arrow_parameters=>identifier_reference • 
                    */
                    add_reduce(1, 126);
                    prod = 79;
                    ACCEPT = true;
                } else {
                    /*assert-end*/
                    /*
                       310 primary_expression=>identifier_reference • 
                    */
                    prod = 92;
                    ACCEPT = true;
                }
                break;
        }
        if (!ACCEPT) {
            break;
        }
    }
    return assertSuccess(l, prod == 108);
}
function $assignment_operator(l: Lexer): boolean {
    if (assert_consume(l, l.utf == 42/*[asterisk]*/)) {
        /*consume*/
        /*
           325 assignment_operator=>* • = 
        */
        skip_fn_(l/*[ ws ][ nl ]*/);
        if (assert_consume(l, l.utf == 61/*[=]*/)) {
            add_reduce(2, 0);
            prod = 109;
        }
    } else if (assert_consume(l, ((((((((cpc3443c4f_(l)/*[asteriskasterisk=]*/ || cpf9ccda11_(l)/*[|=]*/) || cpbd75a16c_(l)/*[^=]*/) || cpbd0a1baf_(l)/*[&=]*/) || cpa053380f_(l)/*[>>>=] [>>=]*/) || cp0bb67c25_(l)/*[<<=]*/) || cp8a61c8c0_(l)/*[-=]*/) || cpfa882b22_(l)/*[+=]*/) || cpba9dd503_(l)/*[%=]*/) || cp29720e9d_(l)/*[/=]*/)) {
        /*consume*/
        /*
           336 assignment_operator=>**= • 
           335 assignment_operator=>|= • 
           334 assignment_operator=>^= • 
           333 assignment_operator=>&= • 
           332 assignment_operator=>>>>= • 
           331 assignment_operator=>>>= • 
           330 assignment_operator=><<= • 
           329 assignment_operator=>-= • 
           328 assignment_operator=>+= • 
           327 assignment_operator=>%= • 
           326 assignment_operator=>/= • 
        */
        prod = 109;
    }
    return assertSuccess(l, prod == 109);
}
function $conditional_expression(l: Lexer): boolean {
    if ($short_circuit_expression(l)) {
        /*assert*/
        /*
           337 conditional_expression=>• short_circuit_expression 
           338 conditional_expression=>• short_circuit_expression ? assignment_expression : assignment_expression 
        */
        skip_fn_000(l/*[ ws ]*/);
        if (assert_consume(l, l.utf == 63/*[?]*/)) {
            /*consume*/
            /*
               338 conditional_expression=>short_circuit_expression ? • assignment_expression : assignment_expression 
            */
            skip_fn_(l/*[ ws ][ nl ]*/);
            if ($assignment_expression(l)) {
                skip_fn_(l/*[ ws ][ nl ]*/);
                if (assert_consume(l, l.utf == 58/*[:]*/)) {
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if ($assignment_expression(l)) {
                        add_reduce(5, 185);
                        prod = 110;
                    }
                }
            }
        } else {
            /*assert-end*/
            /*
               337 conditional_expression=>short_circuit_expression • 
            */
            prod = 110;
        }
    }
    return assertSuccess(l, prod == 110);
}
function $short_circuit_expression(l: Lexer): boolean {
    if (cp4cd44fa7_(l)/*[await]*/) {
        /*assert-production-closure*/
        /*
           319 await_expression=>• τawait unary_expression 
        */
        if ($await_expression(l)) {
            prod = 126;
        }
    } else if (cp2e37be7d_(l)/*[import]*/) {
        /*peek*/
        /*
           339 short_circuit_expression=>• logical_or_expression 
           340 short_circuit_expression=>• coalesce_expression 
        */
        skip_fn_(l/*[ ws ][ nl ]*/);
        if (assert_consume(l, cp2e37be7d_(l)/*[import]*/)) {
            /*consume*/
            /*
               277 import_meta=>τimport • . τmeta 
               287 import_call=>τimport • ( assignment_expression ) 
            */
            skip_fn_(l/*[ ws ][ nl ]*/);
            if (assert_consume(l, l.utf == 40/*[(]*/)) {
                /*consume*/
                /*
                   287 import_call=>τimport ( • assignment_expression ) 
                */
                skip_fn_(l/*[ ws ][ nl ]*/);
                if ($assignment_expression(l)) {
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if (assert_consume(l, l.utf == 41/*[)]*/)) {
                        add_reduce(4, 175);
                        prod = 97;
                    }
                }
            } else if (assert_consume(l, l.utf == 46/*[.]*/)) {
                /*consume*/
                /*
                   277 import_meta=>τimport . • τmeta 
                */
                skip_fn_(l/*[ ws ][ nl ]*/);
                if (assert_consume(l, cp5da57c06_(l)/*[meta]*/)) {
                    add_reduce(3, 170);
                    prod = 92;
                }
            }
        }
    } else if (cpbbb8c976_(l)/*[super]*/) {
        /*peek*/
        /*
           339 short_circuit_expression=>• logical_or_expression 
           340 short_circuit_expression=>• coalesce_expression 
        */
        skip_fn_(l/*[ ws ][ nl ]*/);
        if (assert_consume(l, cpbbb8c976_(l)/*[super]*/)) {
            /*consume*/
            /*
               273 super_property=>τsuper • . identifier_name 
               274 super_property=>τsuper • [ expression ] 
               286 super_call=>τsuper • arguments 
            */
            skip_fn_(l/*[ ws ][ nl ]*/);
            if (l.utf == 40/*[(]*/) {
                /*assert-production-closure*/
                /*
                   286 super_call=>τsuper • arguments 
                */
                if ($arguments(l)) {
                    add_reduce(2, 174);
                    prod = 97;
                }
            } else if (assert_consume(l, l.utf == 91/*[[]*/)) {
                /*consume*/
                /*
                   274 super_property=>τsuper [ • expression ] 
                */
                skip_fn_(l/*[ ws ][ nl ]*/);
                if ($expression(l)) {
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if (assert_consume(l, l.utf == 93/*[]]*/)) {
                        add_reduce(4, 169);
                        prod = 92;
                    }
                }
            } else if (assert_consume(l, l.utf == 46/*[.]*/)) {
                /*consume*/
                /*
                   273 super_property=>τsuper . • identifier_name 
                */
                skip_fn_(l/*[ ws ][ nl ]*/);
                if ($identifier_name(l)) {
                    add_reduce(3, 168);
                    prod = 92;
                }
            }
        }
    } else if (cp8595dc97_(l)/*[new]*/) {
        /*peek*/
        /*
           339 short_circuit_expression=>• logical_or_expression 
           340 short_circuit_expression=>• coalesce_expression 
        */
        skip_fn_(l/*[ ws ][ nl ]*/);
        if (assert_consume(l, cp8595dc97_(l)/*[new]*/)) {
            /*consume*/
            /*
               272 member_expression=>τnew • member_expression arguments 
               278 new_target=>τnew • . τtarget 
               265 new_expression=>τnew • new_expression 
            */
            skip_fn_(l/*[ ws ][ nl ]*/);
            if (assert_consume(l, l.utf == 46/*[.]*/)) {
                /*consume*/
                /*
                   278 new_target=>τnew . • τtarget 
                */
                skip_fn_(l/*[ ws ][ nl ]*/);
                if (assert_consume(l, cp28cc5037_(l)/*[target]*/)) {
                    add_reduce(3, 171);
                    prod = 92;
                }
            } else if ((assert_table(l, 0x0, 0x8194, 0x88000000, 0x8000001)/*tbl:[ ( ] [ ` ] [ / ] [ { ] [ [ ] [ ' ] [ " ] [ _ ] [ $ ]*/ || l.isNum()/*[num]*/) || l.isID()/*[id]*/) {
                /*peek*/
                /*
                   272 member_expression=>τnew • member_expression arguments 
                   265 new_expression=>τnew • new_expression 
                */
                let mk: i32 = mark();
                let anchor: Lexer = l.copy();
                /*92*/
                if ($member_expression(l)) {
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if ($arguments(l)) {
                        add_reduce(3, 167);
                        prod = 92;
                    }
                }
                if (reset(mk, anchor, l, prod == 90)) {
                    prod = -1;
                    if ($new_expression(l)) {
                        add_reduce(2, 163);
                        prod = 90;
                    }
                }
            }
        }
    } else if (l.utf == 40/*[(]*/) {
        /*assert-production-closure*/
        /*
           403 parenthesized=>• ( expression ) 
        */
        if ($parenthesized(l)) {
            add_reduce(1, 181);
            prod = 92;
        }
    } else if (l.utf == 96/*[`]*/) {
        /*peek*/
        /*
           339 short_circuit_expression=>• logical_or_expression 
           340 short_circuit_expression=>• coalesce_expression 
        */
        skip_fn_(l/*[ ws ][ nl ]*/);
        if (assert_consume(l, l.utf == 96/*[`]*/)) {
            /*consume*/
            /*
               475 no_substitute_template=>` • ` 
               481 template_head=>` • ${ 
            */
            skip_fn_(l/*[ ws ][ nl ]*/);
            if (assert_consume(l, cped7e7079_(l)/*[${]*/)) {
                /*consume*/
                /*
                   481 template_head=>` ${ • 
                */
                add_reduce(2, 242);
                prod = 162;
            } else if (assert_consume(l, l.utf == 96/*[`]*/)) {
                /*consume*/
                /*
                   475 no_substitute_template=>` ` • 
                */
                add_reduce(2, 238);
                prod = 92;
            }
        }
    } else if (l.utf == 47/*[/]*/) {
        /*assert-production-closure*/
        /*
           436 regular_expression_literal=>• / / def$js_identifier 
        */
        if ($regular_expression_literal(l)) {
            prod = 92;
        }
    } else if (cp1f027896_(l)/*[class]*/) {
        /*assert-production-closure*/
        /*
           223 class_expression=>• τclass binding_identifier class_heritage { class_body } 
        */
        if ($class_expression(l)) {
            prod = 92;
        }
    } else if (cp87f20bb1_(l)/*[function]*/) {
        /*assert-production-closure*/
        /*
           176 function_expression=>• τfunction function_declaration_group_0115_109 binding_identifier ( formal_parameters ) { function_body } 
        */
        if ($function_expression(l)) {
            prod = 92;
        }
    } else if (l.utf == 123/*[{]*/) {
        /*assert-production-closure*/
        /*
           439 object_literal=>• { } 
        */
        if ($object_literal(l)) {
            prod = 92;
        }
    } else if (l.utf == 91/*[[]*/) {
        /*assert-production-closure*/
        /*
           457 array_literal=>• [ elision ] 
        */
        if ($array_literal(l)) {
            prod = 92;
        }
    } else if (cpe3a3596e_(l)/*[null]*/) {
        /*assert-production-closure*/
        /*
           518 null_literal=>• τnull 
        */
        if ($null_literal(l)) {
            prod = 92;
        }
    } else if (cpdcbfef5f_(l)/*[async]*/) {
        /*peek*/
        /*
           339 short_circuit_expression=>• logical_or_expression 
           340 short_circuit_expression=>• coalesce_expression 
        */
        skip_fn_(l/*[ ws ][ nl ]*/);
        if (assert_consume(l, cpdcbfef5f_(l)/*[async]*/)) {
            /*consume*/
            /*
               529 unreserved_word=>τasync • 
               175 function_expression=>τasync • τfunction function_declaration_group_0115_109 binding_identifier ( formal_parameters ) { function_body } 
               177 function_expression=>τasync • τfunction binding_identifier ( formal_parameters ) { function_body } 
               178 function_expression=>τasync • τfunction function_declaration_group_0115_109 ( formal_parameters ) { function_body } 
               179 function_expression=>τasync • τfunction function_declaration_group_0115_109 binding_identifier ( ) { function_body } 
               183 function_expression=>τasync • τfunction ( formal_parameters ) { function_body } 
               184 function_expression=>τasync • τfunction binding_identifier ( ) { function_body } 
               185 function_expression=>τasync • τfunction function_declaration_group_0115_109 ( ) { function_body } 
               189 function_expression=>τasync • τfunction ( ) { function_body } 
            */
            skip_fn_000(l/*[ ws ]*/);
            if (assert_consume(l, cp87f20bb1_(l)/*[function]*/)) {
                /*consume*/
                /*
                   175 function_expression=>τasync τfunction • function_declaration_group_0115_109 binding_identifier ( formal_parameters ) { function_body } 
                   177 function_expression=>τasync τfunction • binding_identifier ( formal_parameters ) { function_body } 
                   178 function_expression=>τasync τfunction • function_declaration_group_0115_109 ( formal_parameters ) { function_body } 
                   179 function_expression=>τasync τfunction • function_declaration_group_0115_109 binding_identifier ( ) { function_body } 
                   183 function_expression=>τasync τfunction • ( formal_parameters ) { function_body } 
                   184 function_expression=>τasync τfunction • binding_identifier ( ) { function_body } 
                   185 function_expression=>τasync τfunction • function_declaration_group_0115_109 ( ) { function_body } 
                   189 function_expression=>τasync τfunction • ( ) { function_body } 
                */
                if (l.utf == 40/*[(]*/) {
                    /*peek*/
                    /*
                       183 function_expression=>τasync τfunction • ( formal_parameters ) { function_body } 
                       189 function_expression=>τasync τfunction • ( ) { function_body } 
                    */
                    let pk: Lexer = l.copy();
                    skip_fn_(pk.next()/*[ ws ][ nl ]*/);
                    if (pk.utf == 41/*[)]*/) {
                        /*peek*/
                        /*
                           189 function_expression=>τasync τfunction • ( ) { function_body } 
                        */
                        if (assert_consume(l, l.utf == 40/*[(]*/)) {
                            skip_fn_(l/*[ ws ][ nl ]*/);
                            if (assert_consume(l, l.utf == 41/*[)]*/)) {
                                skip_fn_(l/*[ ws ][ nl ]*/);
                                if (assert_consume(l, l.utf == 123/*[{]*/)) {
                                    skip_fn_(l/*[ ws ][ nl ]*/);
                                    if ($function_statement_list(l)) {
                                        add_reduce(1, 120);
                                        skip_fn_(l/*[ ws ][ nl ]*/);
                                        if (assert_consume(l, l.utf == 125/*[}]*/)) {
                                            add_reduce(7, 115);
                                            prod = 92;
                                        }
                                    }
                                }
                            }
                        }
                    } else if ((cp7fa4386a_(pk)/*[...]*/ || assert_table(pk, 0x0, 0x10, 0x88000000, 0x8000000)/*tbl:[ _ ] [ $ ] [ [ ] [ { ]*/) || pk.isID()/*[id]*/) {
                        /*peek*/
                        /*
                           183 function_expression=>τasync τfunction • ( formal_parameters ) { function_body } 
                        */
                        if (assert_consume(l, l.utf == 40/*[(]*/)) {
                            skip_fn_(l/*[ ws ][ nl ]*/);
                            if ($formal_parameters(l)) {
                                skip_fn_(l/*[ ws ][ nl ]*/);
                                if (assert_consume(l, l.utf == 41/*[)]*/)) {
                                    skip_fn_(l/*[ ws ][ nl ]*/);
                                    if (assert_consume(l, l.utf == 123/*[{]*/)) {
                                        skip_fn_(l/*[ ws ][ nl ]*/);
                                        if ($function_statement_list(l)) {
                                            add_reduce(1, 120);
                                            skip_fn_(l/*[ ws ][ nl ]*/);
                                            if (assert_consume(l, l.utf == 125/*[}]*/)) {
                                                add_reduce(8, 109);
                                                prod = 92;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                } else if (l.utf == 42/*[asterisk]*/) {
                    /*peek-production-closure*/
                    /*
                       175 function_expression=>τasync τfunction • function_declaration_group_0115_109 binding_identifier ( formal_parameters ) { function_body } 
                       178 function_expression=>τasync τfunction • function_declaration_group_0115_109 ( formal_parameters ) { function_body } 
                       179 function_expression=>τasync τfunction • function_declaration_group_0115_109 binding_identifier ( ) { function_body } 
                       185 function_expression=>τasync τfunction • function_declaration_group_0115_109 ( ) { function_body } 
                    */
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if ($function_declaration_group_0115_109(l)) {
                        /*assert*/
                        /*
                           175 function_expression=>τasync τfunction • function_declaration_group_0115_109 binding_identifier ( formal_parameters ) { function_body } 
                           178 function_expression=>τasync τfunction • function_declaration_group_0115_109 ( formal_parameters ) { function_body } 
                           179 function_expression=>τasync τfunction • function_declaration_group_0115_109 binding_identifier ( ) { function_body } 
                           185 function_expression=>τasync τfunction • function_declaration_group_0115_109 ( ) { function_body } 
                        */
                        if (l.utf == 40/*[(]*/) {
                            /*peek*/
                            /*
                               178 function_expression=>τasync τfunction function_declaration_group_0115_109 • ( formal_parameters ) { function_body } 
                               185 function_expression=>τasync τfunction function_declaration_group_0115_109 • ( ) { function_body } 
                            */
                            let pk: Lexer = l.copy();
                            skip_fn_(pk.next()/*[ ws ][ nl ]*/);
                            if (pk.utf == 41/*[)]*/) {
                                /*peek*/
                                /*
                                   185 function_expression=>τasync τfunction function_declaration_group_0115_109 • ( ) { function_body } 
                                */
                                if (assert_consume(l, l.utf == 40/*[(]*/)) {
                                    skip_fn_(l/*[ ws ][ nl ]*/);
                                    if (assert_consume(l, l.utf == 41/*[)]*/)) {
                                        skip_fn_(l/*[ ws ][ nl ]*/);
                                        if (assert_consume(l, l.utf == 123/*[{]*/)) {
                                            skip_fn_(l/*[ ws ][ nl ]*/);
                                            if ($function_statement_list(l)) {
                                                add_reduce(1, 120);
                                                skip_fn_(l/*[ ws ][ nl ]*/);
                                                if (assert_consume(l, l.utf == 125/*[}]*/)) {
                                                    add_reduce(8, 111);
                                                    prod = 92;
                                                }
                                            }
                                        }
                                    }
                                }
                            } else if ((cp7fa4386a_(pk)/*[...]*/ || assert_table(pk, 0x0, 0x10, 0x88000000, 0x8000000)/*tbl:[ _ ] [ $ ] [ [ ] [ { ]*/) || pk.isID()/*[id]*/) {
                                /*peek*/
                                /*
                                   178 function_expression=>τasync τfunction function_declaration_group_0115_109 • ( formal_parameters ) { function_body } 
                                */
                                if (assert_consume(l, l.utf == 40/*[(]*/)) {
                                    skip_fn_(l/*[ ws ][ nl ]*/);
                                    if ($formal_parameters(l)) {
                                        skip_fn_(l/*[ ws ][ nl ]*/);
                                        if (assert_consume(l, l.utf == 41/*[)]*/)) {
                                            skip_fn_(l/*[ ws ][ nl ]*/);
                                            if (assert_consume(l, l.utf == 123/*[{]*/)) {
                                                skip_fn_(l/*[ ws ][ nl ]*/);
                                                if ($function_statement_list(l)) {
                                                    add_reduce(1, 120);
                                                    skip_fn_(l/*[ ws ][ nl ]*/);
                                                    if (assert_consume(l, l.utf == 125/*[}]*/)) {
                                                        add_reduce(9, 104);
                                                        prod = 92;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        } else {
                            /*peek-production-closure*/
                            /*
                               175 function_expression=>τasync τfunction function_declaration_group_0115_109 • binding_identifier ( formal_parameters ) { function_body } 
                               179 function_expression=>τasync τfunction function_declaration_group_0115_109 • binding_identifier ( ) { function_body } 
                            */
                            skip_fn_(l/*[ ws ][ nl ]*/);
                            if ($binding_identifier(l)) {
                                /*assert*/
                                /*
                                   175 function_expression=>τasync τfunction function_declaration_group_0115_109 • binding_identifier ( formal_parameters ) { function_body } 
                                   179 function_expression=>τasync τfunction function_declaration_group_0115_109 • binding_identifier ( ) { function_body } 
                                */
                                skip_fn_(l/*[ ws ][ nl ]*/);
                                if (assert_consume(l, l.utf == 40/*[(]*/)) {
                                    /*consume*/
                                    /*
                                       175 function_expression=>τasync τfunction function_declaration_group_0115_109 binding_identifier ( • formal_parameters ) { function_body } 
                                       179 function_expression=>τasync τfunction function_declaration_group_0115_109 binding_identifier ( • ) { function_body } 
                                    */
                                    skip_fn_(l/*[ ws ][ nl ]*/);
                                    if (assert_consume(l, l.utf == 41/*[)]*/)) {
                                        /*consume*/
                                        /*
                                           179 function_expression=>τasync τfunction function_declaration_group_0115_109 binding_identifier ( ) • { function_body } 
                                        */
                                        skip_fn_(l/*[ ws ][ nl ]*/);
                                        if (assert_consume(l, l.utf == 123/*[{]*/)) {
                                            skip_fn_(l/*[ ws ][ nl ]*/);
                                            if ($function_statement_list(l)) {
                                                add_reduce(1, 120);
                                                skip_fn_(l/*[ ws ][ nl ]*/);
                                                if (assert_consume(l, l.utf == 125/*[}]*/)) {
                                                    add_reduce(9, 105);
                                                    prod = 92;
                                                }
                                            }
                                        }
                                    } else {
                                        /*assert-production-closure*/
                                        /*
                                           175 function_expression=>τasync τfunction function_declaration_group_0115_109 binding_identifier ( • formal_parameters ) { function_body } 
                                        */
                                        if ($formal_parameters(l)) {
                                            skip_fn_(l/*[ ws ][ nl ]*/);
                                            if (assert_consume(l, l.utf == 41/*[)]*/)) {
                                                skip_fn_(l/*[ ws ][ nl ]*/);
                                                if (assert_consume(l, l.utf == 123/*[{]*/)) {
                                                    skip_fn_(l/*[ ws ][ nl ]*/);
                                                    if ($function_statement_list(l)) {
                                                        add_reduce(1, 120);
                                                        skip_fn_(l/*[ ws ][ nl ]*/);
                                                        if (assert_consume(l, l.utf == 125/*[}]*/)) {
                                                            add_reduce(10, 101);
                                                            prod = 92;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                } else {
                    /*peek-production-closure*/
                    /*
                       177 function_expression=>τasync τfunction • binding_identifier ( formal_parameters ) { function_body } 
                       184 function_expression=>τasync τfunction • binding_identifier ( ) { function_body } 
                    */
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if ($binding_identifier(l)) {
                        /*assert*/
                        /*
                           177 function_expression=>τasync τfunction • binding_identifier ( formal_parameters ) { function_body } 
                           184 function_expression=>τasync τfunction • binding_identifier ( ) { function_body } 
                        */
                        skip_fn_(l/*[ ws ][ nl ]*/);
                        if (assert_consume(l, l.utf == 40/*[(]*/)) {
                            /*consume*/
                            /*
                               177 function_expression=>τasync τfunction binding_identifier ( • formal_parameters ) { function_body } 
                               184 function_expression=>τasync τfunction binding_identifier ( • ) { function_body } 
                            */
                            skip_fn_(l/*[ ws ][ nl ]*/);
                            if (assert_consume(l, l.utf == 41/*[)]*/)) {
                                /*consume*/
                                /*
                                   184 function_expression=>τasync τfunction binding_identifier ( ) • { function_body } 
                                */
                                skip_fn_(l/*[ ws ][ nl ]*/);
                                if (assert_consume(l, l.utf == 123/*[{]*/)) {
                                    skip_fn_(l/*[ ws ][ nl ]*/);
                                    if ($function_statement_list(l)) {
                                        add_reduce(1, 120);
                                        skip_fn_(l/*[ ws ][ nl ]*/);
                                        if (assert_consume(l, l.utf == 125/*[}]*/)) {
                                            add_reduce(8, 110);
                                            prod = 92;
                                        }
                                    }
                                }
                            } else {
                                /*assert-production-closure*/
                                /*
                                   177 function_expression=>τasync τfunction binding_identifier ( • formal_parameters ) { function_body } 
                                */
                                if ($formal_parameters(l)) {
                                    skip_fn_(l/*[ ws ][ nl ]*/);
                                    if (assert_consume(l, l.utf == 41/*[)]*/)) {
                                        skip_fn_(l/*[ ws ][ nl ]*/);
                                        if (assert_consume(l, l.utf == 123/*[{]*/)) {
                                            skip_fn_(l/*[ ws ][ nl ]*/);
                                            if ($function_statement_list(l)) {
                                                add_reduce(1, 120);
                                                skip_fn_(l/*[ ws ][ nl ]*/);
                                                if (assert_consume(l, l.utf == 125/*[}]*/)) {
                                                    add_reduce(9, 103);
                                                    prod = 92;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            } else {
                /*assert-end*/
                /*
                   529 unreserved_word=>τasync • 
                */
                add_reduce(1, 254);
                add_reduce(1, 253);
                prod = 92;
            }
        }
    } else if (cpfe029929_(l)/*[this]*/) {
        /*assert-production-closure*/
        /*
           309 primary_expression=>• τthis 
        */
        if ($primary_expression(l)) {
            prod = 92;
        }
    } else if (cpb9a3d66d_(l)/*[--]*/ || cpa70bdd76_(l)/*[++]*/) {
        /*assert-production-closure*/
        /*
           393 update_expression=>• -- unary_expression 
           392 update_expression=>• ++ unary_expression 
        */
        if ($update_expression(l)) {
            prod = 126;
        }
    } else if (l.isNum()/*[num]*/) {
        /*peek*/
        /*
           339 short_circuit_expression=>• logical_or_expression 
           340 short_circuit_expression=>• coalesce_expression 
        */
        skip_fn_(l/*[ ws ][ nl ]*/);
        if (assert_consume(l, l.isNum()/*[num]*/)) {
            /*consume*/
            /*
               517 numeric_literal=>θnum • 
               516 bigint=>θnum • τn 
            */
            skip_fn_000(l/*[ ws ]*/);
            if (assert_consume(l, cpc1d70283_(l)/*[n]*/)) {
                /*consume*/
                /*
                   516 bigint=>θnum τn • 
                */
                add_reduce(2, 248);
                prod = 92;
            } else {
                /*assert-end*/
                /*
                   517 numeric_literal=>θnum • 
                */
                add_reduce(1, 249);
                prod = 92;
            }
        }
    } else if (assert_table(l, 0x0, 0x84, 0x0, 0x0)/*tbl:[ ' ] [ " ]*/) {
        /*assert-production-closure*/
        /*
           499 string_literal=>• ' single_quote_string ' 
           498 string_literal=>• " double_quote_string " 
        */
        if ($string_literal(l)) {
            prod = 92;
        }
    } else if (cp3b3b9dc5_(l)/*[false]*/ || cp97ab5935_(l)/*[true]*/) {
        /*assert-production-closure*/
        /*
           520 boolean_literal=>• τfalse 
           519 boolean_literal=>• τtrue 
        */
        if ($boolean_literal(l)) {
            prod = 92;
        }
    } else if ((((cp65c0e04e_(l)/*[from]*/ || cp00a86e9e_(l)/*[as]*/) || cp28cc5037_(l)/*[target]*/) || cp248c12d4_(l)/*[set]*/) || cp47b3f727_(l)/*[get]*/) {
        /*assert-production-closure*/
        /*
           534 unreserved_word=>• τfrom 
           533 unreserved_word=>• τas 
           532 unreserved_word=>• τtarget 
           531 unreserved_word=>• τset 
           530 unreserved_word=>• τget 
        */
        if ($unreserved_word(l)) {
            add_reduce(1, 254);
            add_reduce(1, 253);
            prod = 92;
        }
    } else if (((cp5a8be194_(l)/*[typeof]*/ || cp3617ce6e_(l)/*[void]*/) || cpc7ed71c1_(l)/*[delete]*/) || assert_table(l, 0x0, 0x2802, 0x0, 0x40000000)/*tbl:[ ! ] [ ~ ] [ - ] [ + ]*/) {
        /*assert-production-closure*/
        /*
           387 unary_expression=>• ! unary_expression 
           386 unary_expression=>• ~ unary_expression 
           385 unary_expression=>• - unary_expression 
           384 unary_expression=>• + unary_expression 
           383 unary_expression=>• τtypeof unary_expression 
           382 unary_expression=>• τvoid unary_expression 
           381 unary_expression=>• τdelete unary_expression 
        */
        if ($unary_expression(l)) {
            prod = 126;
        }
    } else {
        /*assert-production-closure*/
        /*
           548 composite_identifier=>• _ 
           547 composite_identifier=>• $ 
           546 composite_identifier=>• θid 
        */
        if ($composite_identifier(l)) {
            add_reduce(1, 254);
            add_reduce(1, 253);
            prod = 92;
        }
    }
    while (true) {
        let ACCEPT: boolean = false;
        switch (prod) {
            case 90:
                skip_fn_000(l/*[ ws ]*/);
                if (assert_consume(l, cpa70bdd76_(l)/*[++]*/ || cpb9a3d66d_(l)/*[--]*/)) {
                    /*consume*/
                    /*
                       390 update_expression=>left_hand_side_expression ++ • 
                       391 update_expression=>left_hand_side_expression -- • 
                    */
                    add_reduce(2, 201);
                    prod = 126;
                    ACCEPT = true;
                } else {
                    /*assert-end*/
                    /*
                       389 update_expression=>left_hand_side_expression • 
                    */
                    prod = 126;
                    ACCEPT = true;
                }
                break;
            case 92:
                skip_fn_000(l/*[ ws ]*/);
                if (assert_consume(l, l.utf == 91/*[[]*/)) {
                    /*consume*/
                    /*
                       267 member_expression=>member_expression [ • expression ] 
                    */
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if ($expression(l)) {
                        skip_fn_(l/*[ ws ][ nl ]*/);
                        if (assert_consume(l, l.utf == 93/*[]]*/)) {
                            add_reduce(4, 164);
                            prod = 92;
                            ACCEPT = true;
                        }
                    }
                } else if (assert_consume(l, l.utf == 46/*[.]*/)) {
                    /*consume*/
                    /*
                       268 member_expression=>member_expression . • identifier_name 
                    */
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if ($identifier_name(l)) {
                        add_reduce(3, 165);
                        prod = 92;
                        ACCEPT = true;
                    }
                } else if (l.utf == 96/*[`]*/) {
                    /*assert-production-closure*/
                    /*
                       269 member_expression=>member_expression • template_literal 
                    */
                    if ($template_literal(l)) {
                        add_reduce(2, 166);
                        prod = 92;
                        ACCEPT = true;
                    }
                } else if (l.utf == 40/*[(]*/) {
                    /*assert-production-closure*/
                    /*
                       214 cover_call_expression_and_async_arrow_head=>member_expression • arguments 
                    */
                    if ($arguments(l)) {
                        add_reduce(2, 129);
                        prod = 97;
                        ACCEPT = true;
                    }
                } else if (cp2f3a2b3c_(l)/*[?.]*/) {
                    /*assert-production-closure*/
                    /*
                       298 optional_expression=>member_expression • optional_chain 
                    */
                    if ($optional_chain(l)) {
                        add_reduce(2, 179);
                        prod = 104;
                        ACCEPT = true;
                    }
                } else {
                    /*assert-end*/
                    /*
                       264 new_expression=>member_expression • 
                    */
                    prod = 90;
                    ACCEPT = true;
                }
                break;
            case 97:
                skip_fn_000(l/*[ ws ]*/);
                if (assert_consume(l, l.utf == 46/*[.]*/)) {
                    /*consume*/
                    /*
                       279 call_expression=>call_expression . • identifier_name 
                    */
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if ($identifier_name(l)) {
                        add_reduce(3, 165);
                        prod = 97;
                        ACCEPT = true;
                    }
                } else if (l.utf == 40/*[(]*/) {
                    /*assert-production-closure*/
                    /*
                       282 call_expression=>call_expression • arguments 
                    */
                    if ($arguments(l)) {
                        add_reduce(2, 172);
                        prod = 97;
                        ACCEPT = true;
                    }
                } else if (assert_consume(l, l.utf == 91/*[[]*/)) {
                    /*consume*/
                    /*
                       283 call_expression=>call_expression [ • expression ] 
                    */
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if ($expression(l)) {
                        skip_fn_(l/*[ ws ][ nl ]*/);
                        if (assert_consume(l, l.utf == 93/*[]]*/)) {
                            add_reduce(4, 164);
                            prod = 97;
                            ACCEPT = true;
                        }
                    }
                } else if (l.utf == 96/*[`]*/) {
                    /*assert-production-closure*/
                    /*
                       285 call_expression=>call_expression • template_literal 
                    */
                    if ($template_literal(l)) {
                        add_reduce(2, 173);
                        prod = 97;
                        ACCEPT = true;
                    }
                } else if (cp2f3a2b3c_(l)/*[?.]*/) {
                    /*assert-production-closure*/
                    /*
                       299 optional_expression=>call_expression • optional_chain 
                    */
                    if ($optional_chain(l)) {
                        add_reduce(2, 179);
                        prod = 104;
                        ACCEPT = true;
                    }
                } else {
                    /*assert-end*/
                    /*
                       262 left_hand_side_expression=>call_expression • 
                    */
                    prod = 90;
                    ACCEPT = true;
                }
                break;
            case 104:
                skip_fn_000(l/*[ ws ]*/);
                if (cp2f3a2b3c_(l)/*[?.]*/) {
                    /*assert-production-closure*/
                    /*
                       300 optional_expression=>optional_expression • optional_chain 
                    */
                    if ($optional_chain(l)) {
                        add_reduce(2, 179);
                        prod = 104;
                        ACCEPT = true;
                    }
                } else {
                    /*assert-end*/
                    /*
                       263 left_hand_side_expression=>optional_expression • 
                    */
                    prod = 90;
                    ACCEPT = true;
                }
                break;
            case 112:
                skip_fn_000(l/*[ ws ]*/);
                if (assert_consume(l, cp600b6f48_(l)/*[||]*/)) {
                    /*consume*/
                    /*
                       342 logical_or_expression=>logical_or_expression || • logical_and_expression 
                    */
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if ($logical_and_expression(l)) {
                        add_reduce(3, 186);
                        prod = 112;
                        ACCEPT = true;
                    }
                } else {
                    /*assert-end*/
                    /*
                       339 short_circuit_expression=>logical_or_expression • 
                    */
                    prod = 111;
                    ACCEPT = true;
                }
                break;
            case 113:
                skip_fn_000(l/*[ ws ]*/);
                if (assert_consume(l, l.utf == 38/*[&]*/)) {
                    /*consume*/
                    /*
                       344 logical_and_expression=>logical_and_expression & • & bitwise_or_expression 
                    */
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if (assert_consume(l, l.utf == 38/*[&]*/)) {
                        skip_fn_(l/*[ ws ][ nl ]*/);
                        if ($bitwise_or_expression(l)) {
                            add_reduce(4, 186);
                            prod = 113;
                            ACCEPT = true;
                        }
                    }
                } else {
                    /*assert-end*/
                    /*
                       341 logical_or_expression=>logical_and_expression • 
                    */
                    prod = 112;
                    ACCEPT = true;
                }
                break;
            case 114:
                skip_fn_000(l/*[ ws ]*/);
                if (cp628ccfc7_(l)/*[??]*/) {
                    /*assert-end*/
                    /*
                       346 coalesce_expression_head_group_0233_113=>coalesce_expression • 
                    */
                    prod = 116;
                    ACCEPT = true;
                } else {
                    /*assert-end*/
                    /*
                       340 short_circuit_expression=>coalesce_expression • 
                    */
                    prod = 111;
                    ACCEPT = true;
                }
                break;
            case 116:
                skip_fn_(l/*[ ws ][ nl ]*/);
                if (assert_consume(l, cp628ccfc7_(l)/*[??]*/)) {
                    /*consume*/
                    /*
                       345 coalesce_expression=>coalesce_expression_head ?? • bitwise_or_expression 
                    */
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if ($bitwise_or_expression(l)) {
                        add_reduce(3, 187);
                        prod = 114;
                        ACCEPT = true;
                    }
                }
                break;
            case 117:
                skip_fn_000(l/*[ ws ]*/);
                if (assert_consume(l, l.utf == 124/*[|]*/)) {
                    /*consume*/
                    /*
                       350 bitwise_or_expression=>bitwise_or_expression | • bitwise_xor_expression 
                    */
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if ($bitwise_xor_expression(l)) {
                        add_reduce(3, 188);
                        prod = 117;
                        ACCEPT = true;
                    }
                } else if (cp628ccfc7_(l)/*[??]*/) {
                    /*assert-end*/
                    /*
                       347 coalesce_expression_head_group_0233_113=>bitwise_or_expression • 
                    */
                    prod = 116;
                    ACCEPT = true;
                } else {
                    /*assert-end*/
                    /*
                       343 logical_and_expression=>bitwise_or_expression • 
                    */
                    prod = 113;
                    ACCEPT = true;
                }
                break;
            case 118:
                skip_fn_000(l/*[ ws ]*/);
                if (assert_consume(l, l.utf == 94/*[^]*/)) {
                    /*consume*/
                    /*
                       352 bitwise_xor_expression=>bitwise_xor_expression ^ • bitwise_and_expression 
                    */
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if ($bitwise_and_expression(l)) {
                        add_reduce(3, 188);
                        prod = 118;
                        ACCEPT = true;
                    }
                } else {
                    /*assert-end*/
                    /*
                       349 bitwise_or_expression=>bitwise_xor_expression • 
                    */
                    prod = 117;
                    ACCEPT = true;
                }
                break;
            case 119:
                skip_fn_000(l/*[ ws ]*/);
                if (assert_consume(l, l.utf == 38/*[&]*/)) {
                    /*consume*/
                    /*
                       354 bitwise_and_expression=>bitwise_and_expression & • equality_expression 
                    */
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if ($equality_expression(l)) {
                        add_reduce(3, 188);
                        prod = 119;
                        ACCEPT = true;
                    }
                } else {
                    /*assert-end*/
                    /*
                       351 bitwise_xor_expression=>bitwise_and_expression • 
                    */
                    prod = 118;
                    ACCEPT = true;
                }
                break;
            case 120:
                skip_fn_000(l/*[ ws ]*/);
                if (assert_consume(l, cp35644963_(l)/*[==] [===]*/ || cpc102d490_(l)/*[!=] [!==]*/)) {
                    /*consume*/
                    /*
                       356 equality_expression=>equality_expression == • relational_expression 
                       357 equality_expression=>equality_expression != • relational_expression 
                       358 equality_expression=>equality_expression === • relational_expression 
                       359 equality_expression=>equality_expression !== • relational_expression 
                    */
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if ($relational_expression(l)) {
                        add_reduce(3, 189);
                        prod = 120;
                        ACCEPT = true;
                    }
                } else {
                    /*assert-end*/
                    /*
                       353 bitwise_and_expression=>equality_expression • 
                    */
                    prod = 119;
                    ACCEPT = true;
                }
                break;
            case 121:
                skip_fn_000(l/*[ ws ]*/);
                if (assert_consume(l, cp7d807160_(l)/*[instanceof]*/)) {
                    /*consume*/
                    /*
                       365 relational_expression=>relational_expression τinstanceof • shift_expression 
                    */
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if ($shift_expression(l)) {
                        add_reduce(3, 191);
                        prod = 121;
                        ACCEPT = true;
                    }
                } else if (assert_consume(l, cp0725ae43_(l)/*[in]*/)) {
                    /*consume*/
                    /*
                       366 relational_expression=>relational_expression τin • shift_expression 
                    */
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if ($shift_expression(l)) {
                        add_reduce(3, 192);
                        prod = 121;
                        ACCEPT = true;
                    }
                } else if (assert_consume(l, cpee595c53_(l)/*[<] [<=]*/ || cp744cb68c_(l)/*[>] [>=]*/)) {
                    /*consume*/
                    /*
                       361 relational_expression=>relational_expression < • shift_expression 
                       362 relational_expression=>relational_expression > • shift_expression 
                       363 relational_expression=>relational_expression <= • shift_expression 
                       364 relational_expression=>relational_expression >= • shift_expression 
                    */
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if ($shift_expression(l)) {
                        add_reduce(3, 190);
                        prod = 121;
                        ACCEPT = true;
                    }
                } else {
                    /*assert-end*/
                    /*
                       355 equality_expression=>relational_expression • 
                    */
                    prod = 120;
                    ACCEPT = true;
                }
                break;
            case 122:
                skip_fn_000(l/*[ ws ]*/);
                if (assert_consume(l, cp1ec153e7_(l)/*[<<]*/ || cp0b554d4a_(l)/*[>>] [>>>]*/)) {
                    /*consume*/
                    /*
                       368 shift_expression=>shift_expression << • additive_expression 
                       369 shift_expression=>shift_expression >> • additive_expression 
                       370 shift_expression=>shift_expression >>> • additive_expression 
                    */
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if ($additive_expression(l)) {
                        add_reduce(3, 193);
                        prod = 122;
                        ACCEPT = true;
                    }
                } else {
                    /*assert-end*/
                    /*
                       360 relational_expression=>shift_expression • 
                    */
                    prod = 121;
                    ACCEPT = true;
                }
                break;
            case 123:
                skip_fn_000(l/*[ ws ]*/);
                if (assert_consume(l, assert_table(l, 0x0, 0x2800, 0x0, 0x0)/*tbl:[ + ] [ - ]*/)) {
                    /*consume*/
                    /*
                       372 additive_expression=>additive_expression + • multiplicative_expression 
                       373 additive_expression=>additive_expression - • multiplicative_expression 
                    */
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if ($multiplicative_expression(l)) {
                        add_reduce(3, 194);
                        prod = 123;
                        ACCEPT = true;
                    }
                } else {
                    /*assert-end*/
                    /*
                       367 shift_expression=>additive_expression • 
                    */
                    prod = 122;
                    ACCEPT = true;
                }
                break;
            case 124:
                skip_fn_000(l/*[ ws ]*/);
                if (assert_consume(l, assert_table(l, 0x0, 0x8420, 0x0, 0x0)/*tbl:[ * ] [ / ] [ % ]*/)) {
                    /*consume*/
                    /*
                       375 multiplicative_expression=>multiplicative_expression * • exponentiation_expression 
                       376 multiplicative_expression=>multiplicative_expression / • exponentiation_expression 
                       377 multiplicative_expression=>multiplicative_expression % • exponentiation_expression 
                    */
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if ($exponentiation_expression(l)) {
                        add_reduce(3, 195);
                        prod = 124;
                        ACCEPT = true;
                    }
                } else {
                    /*assert-end*/
                    /*
                       371 additive_expression=>multiplicative_expression • 
                    */
                    prod = 123;
                    ACCEPT = true;
                }
                break;
            case 126:
                skip_fn_000(l/*[ ws ]*/);
                if (assert_consume(l, cpf2b923e4_(l)/*[asteriskasterisk]*/)) {
                    /*consume*/
                    /*
                       379 exponentiation_expression=>unary_expression ** • exponentiation_expression 
                    */
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if ($exponentiation_expression(l)) {
                        add_reduce(3, 196);
                        prod = 124;
                        ACCEPT = true;
                    }
                } else {
                    /*assert-end*/
                    /*
                       378 exponentiation_expression=>unary_expression • 
                    */
                    prod = 124;
                    ACCEPT = true;
                }
                break;
            case 162:
                skip_fn_(l/*[ ws ][ nl ]*/);
                if ((((cp0ac89158_(l)/*[+] [++]*/ || cpfaa7aa14_(l)/*[-] [--]*/) || assert_table(l, 0x0, 0x8196, 0x88000000, 0x48000001)/*tbl:[ ( ] [ $ ] [ _ ] [ " ] [ ' ] [ [ ] [ { ] [ / ] [ ` ] [ ~ ] [ ! ]*/) || l.isID()/*[id]*/) || l.isNum()/*[num]*/) {
                    /*assert-production-closure*/
                    /*
                       476 substitute_template=>template_head • expression template_spans 
                    */
                    if ($expression(l)) {
                        skip_fn_(l/*[ ws ][ nl ]*/);
                        if ($template_spans(l)) {
                            add_reduce(3, 239);
                            prod = 92;
                            ACCEPT = true;
                        }
                    }
                }
                break;
        }
        if (!ACCEPT) {
            break;
        }
    }
    return assertSuccess(l, prod == 111);
}
function $logical_and_expression(l: Lexer): boolean {
    if ($bitwise_or_expression(l)) {
        prod = 113;
    }
    while (prod == 113) {
        let ACCEPT: boolean = false;
        skip_fn_000(l/*[ ws ]*/);
        if (l.isNL()/*[nl]*/) {
            break;
        }
        if (assert_consume(l, l.utf == 38/*[&]*/)) {
            /*consume*/
            /*
               344 logical_and_expression=>logical_and_expression & • & bitwise_or_expression 
            */
            skip_fn_(l/*[ ws ][ nl ]*/);
            if (assert_consume(l, l.utf == 38/*[&]*/)) {
                skip_fn_(l/*[ ws ][ nl ]*/);
                if ($bitwise_or_expression(l)) {
                    add_reduce(4, 186);
                    prod = 113;
                    ACCEPT = true;
                }
            }
        }
        if (!ACCEPT) {
            break;
        }
    }
    return assertSuccess(l, prod == 113);
}
function $bitwise_or_expression(l: Lexer): boolean {
    if ($bitwise_xor_expression(l)) {
        prod = 117;
    }
    while (prod == 117) {
        let ACCEPT: boolean = false;
        skip_fn_000(l/*[ ws ]*/);
        if (l.isNL()/*[nl]*/) {
            break;
        }
        if (assert_consume(l, l.utf == 124/*[|]*/)) {
            /*consume*/
            /*
               350 bitwise_or_expression=>bitwise_or_expression | • bitwise_xor_expression 
            */
            skip_fn_(l/*[ ws ][ nl ]*/);
            if ($bitwise_xor_expression(l)) {
                add_reduce(3, 188);
                prod = 117;
                ACCEPT = true;
            }
        }
        if (!ACCEPT) {
            break;
        }
    }
    return assertSuccess(l, prod == 117);
}
function $bitwise_xor_expression(l: Lexer): boolean {
    if ($bitwise_and_expression(l)) {
        prod = 118;
    }
    while (prod == 118) {
        let ACCEPT: boolean = false;
        skip_fn_000(l/*[ ws ]*/);
        if (l.isNL()/*[nl]*/) {
            break;
        }
        if (assert_consume(l, l.utf == 94/*[^]*/)) {
            /*consume*/
            /*
               352 bitwise_xor_expression=>bitwise_xor_expression ^ • bitwise_and_expression 
            */
            skip_fn_(l/*[ ws ][ nl ]*/);
            if ($bitwise_and_expression(l)) {
                add_reduce(3, 188);
                prod = 118;
                ACCEPT = true;
            }
        }
        if (!ACCEPT) {
            break;
        }
    }
    return assertSuccess(l, prod == 118);
}
function $bitwise_and_expression(l: Lexer): boolean {
    if ($equality_expression(l)) {
        prod = 119;
    }
    while (prod == 119) {
        let ACCEPT: boolean = false;
        skip_fn_000(l/*[ ws ]*/);
        if (l.isNL()/*[nl]*/) {
            break;
        }
        if (assert_consume(l, l.utf == 38/*[&]*/)) {
            /*consume*/
            /*
               354 bitwise_and_expression=>bitwise_and_expression & • equality_expression 
            */
            skip_fn_(l/*[ ws ][ nl ]*/);
            if ($equality_expression(l)) {
                add_reduce(3, 188);
                prod = 119;
                ACCEPT = true;
            }
        }
        if (!ACCEPT) {
            break;
        }
    }
    return assertSuccess(l, prod == 119);
}
function $equality_expression(l: Lexer): boolean {
    if ($relational_expression(l)) {
        prod = 120;
    }
    while (prod == 120) {
        let ACCEPT: boolean = false;
        skip_fn_000(l/*[ ws ]*/);
        if (l.isNL()/*[nl]*/) {
            break;
        }
        if (assert_consume(l, cpc102d490_(l)/*[!==] [!=]*/ || cp35644963_(l)/*[===] [==]*/)) {
            /*consume*/
            /*
               359 equality_expression=>equality_expression !== • relational_expression 
               358 equality_expression=>equality_expression === • relational_expression 
               357 equality_expression=>equality_expression != • relational_expression 
               356 equality_expression=>equality_expression == • relational_expression 
            */
            skip_fn_(l/*[ ws ][ nl ]*/);
            if ($relational_expression(l)) {
                add_reduce(3, 189);
                prod = 120;
                ACCEPT = true;
            }
        }
        if (!ACCEPT) {
            break;
        }
    }
    return assertSuccess(l, prod == 120);
}
function $relational_expression(l: Lexer): boolean {
    if ($shift_expression(l)) {
        prod = 121;
    }
    while (prod == 121) {
        let ACCEPT: boolean = false;
        skip_fn_000(l/*[ ws ]*/);
        if (l.isNL()/*[nl]*/) {
            break;
        }
        if (assert_consume(l, cp0725ae43_(l)/*[in]*/)) {
            /*consume*/
            /*
               366 relational_expression=>relational_expression τin • shift_expression 
            */
            skip_fn_(l/*[ ws ][ nl ]*/);
            if ($shift_expression(l)) {
                add_reduce(3, 192);
                prod = 121;
                ACCEPT = true;
            }
        } else if (assert_consume(l, cp7d807160_(l)/*[instanceof]*/)) {
            /*consume*/
            /*
               365 relational_expression=>relational_expression τinstanceof • shift_expression 
            */
            skip_fn_(l/*[ ws ][ nl ]*/);
            if ($shift_expression(l)) {
                add_reduce(3, 191);
                prod = 121;
                ACCEPT = true;
            }
        } else if (assert_consume(l, cp744cb68c_(l)/*[>=] [>]*/ || cpee595c53_(l)/*[<=] [<]*/)) {
            /*consume*/
            /*
               364 relational_expression=>relational_expression >= • shift_expression 
               363 relational_expression=>relational_expression <= • shift_expression 
               362 relational_expression=>relational_expression > • shift_expression 
               361 relational_expression=>relational_expression < • shift_expression 
            */
            skip_fn_(l/*[ ws ][ nl ]*/);
            if ($shift_expression(l)) {
                add_reduce(3, 190);
                prod = 121;
                ACCEPT = true;
            }
        }
        if (!ACCEPT) {
            break;
        }
    }
    return assertSuccess(l, prod == 121);
}
function $shift_expression(l: Lexer): boolean {
    if ($additive_expression(l)) {
        prod = 122;
    }
    while (prod == 122) {
        let ACCEPT: boolean = false;
        skip_fn_000(l/*[ ws ]*/);
        if (l.isNL()/*[nl]*/) {
            break;
        }
        if (assert_consume(l, cp0b554d4a_(l)/*[>>>] [>>]*/ || cp1ec153e7_(l)/*[<<]*/)) {
            /*consume*/
            /*
               370 shift_expression=>shift_expression >>> • additive_expression 
               369 shift_expression=>shift_expression >> • additive_expression 
               368 shift_expression=>shift_expression << • additive_expression 
            */
            skip_fn_(l/*[ ws ][ nl ]*/);
            if ($additive_expression(l)) {
                add_reduce(3, 193);
                prod = 122;
                ACCEPT = true;
            }
        }
        if (!ACCEPT) {
            break;
        }
    }
    return assertSuccess(l, prod == 122);
}
function $additive_expression(l: Lexer): boolean {
    if ($multiplicative_expression(l)) {
        prod = 123;
    }
    while (prod == 123) {
        let ACCEPT: boolean = false;
        skip_fn_000(l/*[ ws ]*/);
        if (l.isNL()/*[nl]*/) {
            break;
        }
        if (assert_consume(l, assert_table(l, 0x0, 0x2800, 0x0, 0x0)/*tbl:[ - ] [ + ]*/)) {
            /*consume*/
            /*
               373 additive_expression=>additive_expression - • multiplicative_expression 
               372 additive_expression=>additive_expression + • multiplicative_expression 
            */
            skip_fn_(l/*[ ws ][ nl ]*/);
            if ($multiplicative_expression(l)) {
                add_reduce(3, 194);
                prod = 123;
                ACCEPT = true;
            }
        }
        if (!ACCEPT) {
            break;
        }
    }
    return assertSuccess(l, prod == 123);
}
function $multiplicative_expression(l: Lexer): boolean {
    if ($exponentiation_expression(l)) {
        prod = 124;
    }
    while (prod == 124) {
        let ACCEPT: boolean = false;
        skip_fn_000(l/*[ ws ]*/);
        if (l.isNL()/*[nl]*/) {
            break;
        }
        if (assert_consume(l, assert_table(l, 0x0, 0x8420, 0x0, 0x0)/*tbl:[ % ] [ / ] [ * ]*/)) {
            /*consume*/
            /*
               377 multiplicative_expression=>multiplicative_expression % • exponentiation_expression 
               376 multiplicative_expression=>multiplicative_expression / • exponentiation_expression 
               375 multiplicative_expression=>multiplicative_expression * • exponentiation_expression 
            */
            skip_fn_(l/*[ ws ][ nl ]*/);
            if ($exponentiation_expression(l)) {
                add_reduce(3, 195);
                prod = 124;
                ACCEPT = true;
            }
        }
        if (!ACCEPT) {
            break;
        }
    }
    return assertSuccess(l, prod == 124);
}
function $exponentiation_expression(l: Lexer): boolean {
    if ($unary_expression(l)) {
        /*assert*/
        /*
           378 exponentiation_expression=>• unary_expression 
           379 exponentiation_expression=>• unary_expression ** exponentiation_expression 
        */
        skip_fn_000(l/*[ ws ]*/);
        if (assert_consume(l, cpf2b923e4_(l)/*[asteriskasterisk]*/)) {
            /*consume*/
            /*
               379 exponentiation_expression=>unary_expression ** • exponentiation_expression 
            */
            skip_fn_(l/*[ ws ][ nl ]*/);
            if ($exponentiation_expression(l)) {
                add_reduce(3, 196);
                prod = 125;
            }
        } else {
            /*assert-end*/
            /*
               378 exponentiation_expression=>unary_expression • 
            */
            prod = 125;
        }
    }
    return assertSuccess(l, prod == 125);
}
function $unary_expression(l: Lexer): boolean {
    if (cp4cd44fa7_(l)/*[await]*/) {
        /*assert-production-closure*/
        /*
           388 unary_expression=>• await_expression 
        */
        if ($await_expression(l)) {
            prod = 126;
        }
    } else if (assert_consume(l, cp5a8be194_(l)/*[typeof]*/)) {
        /*consume*/
        /*
           383 unary_expression=>τtypeof • unary_expression 
        */
        skip_fn_(l/*[ ws ][ nl ]*/);
        if ($unary_expression(l)) {
            add_reduce(2, 199);
            prod = 126;
        }
    } else if (assert_consume(l, cp3617ce6e_(l)/*[void]*/)) {
        /*consume*/
        /*
           382 unary_expression=>τvoid • unary_expression 
        */
        skip_fn_(l/*[ ws ][ nl ]*/);
        if ($unary_expression(l)) {
            add_reduce(2, 198);
            prod = 126;
        }
    } else if (assert_consume(l, cpc7ed71c1_(l)/*[delete]*/)) {
        /*consume*/
        /*
           381 unary_expression=>τdelete • unary_expression 
        */
        skip_fn_(l/*[ ws ][ nl ]*/);
        if ($unary_expression(l)) {
            add_reduce(2, 197);
            prod = 126;
        }
    } else if (assert_consume(l, assert_table(l, 0x0, 0x2802, 0x0, 0x40000000)/*tbl:[ ! ] [ ~ ] [ - ] [ + ]*/)) {
        /*consume*/
        /*
           387 unary_expression=>! • unary_expression 
           386 unary_expression=>~ • unary_expression 
           385 unary_expression=>- • unary_expression 
           384 unary_expression=>+ • unary_expression 
        */
        skip_fn_(l/*[ ws ][ nl ]*/);
        if ($unary_expression(l)) {
            add_reduce(2, 200);
            prod = 126;
        }
    } else {
        /*assert-production-closure*/
        /*
           380 unary_expression=>• update_expression 
        */
        if ($update_expression(l)) {
            prod = 126;
        }
    }
    return assertSuccess(l, prod == 126);
}
function $update_expression(l: Lexer): boolean {
    if (assert_consume(l, cpb9a3d66d_(l)/*[--]*/ || cpa70bdd76_(l)/*[++]*/)) {
        /*consume*/
        /*
           393 update_expression=>-- • unary_expression 
           392 update_expression=>++ • unary_expression 
        */
        skip_fn_(l/*[ ws ][ nl ]*/);
        if ($unary_expression(l)) {
            add_reduce(2, 202);
            prod = 127;
        }
    } else {
        /*peek-production-closure*/
        /*
           389 update_expression=>• left_hand_side_expression 
           390 update_expression=>• left_hand_side_expression ++ 
           391 update_expression=>• left_hand_side_expression -- 
        */
        skip_fn_(l/*[ ws ][ nl ]*/);
        if ($left_hand_side_expression(l)) {
            /*assert*/
            /*
               389 update_expression=>• left_hand_side_expression 
               390 update_expression=>• left_hand_side_expression ++ 
               391 update_expression=>• left_hand_side_expression -- 
            */
            skip_fn_000(l/*[ ws ]*/);
            if (assert_consume(l, cpb9a3d66d_(l)/*[--]*/ || cpa70bdd76_(l)/*[++]*/)) {
                /*consume*/
                /*
                   391 update_expression=>left_hand_side_expression -- • 
                   390 update_expression=>left_hand_side_expression ++ • 
                */
                add_reduce(2, 201);
                prod = 127;
            } else {
                /*assert-end*/
                /*
                   389 update_expression=>left_hand_side_expression • 
                */
                prod = 127;
            }
        }
    }
    return assertSuccess(l, prod == 127);
}
function $cover_parenthesized_expression_and_arrow_parameter_list_group_1282_114(l: Lexer): boolean {
    if (assert_consume(l, cp7fa4386a_(l)/*[...]*/)) {
        /*consume*/
        /*
           394 cover_parenthesized_expression_and_arrow_parameter_list_group_1282_114=>... • binding_identifier 
        */
        skip_fn_(l/*[ ws ][ nl ]*/);
        if ($identifier(l)) {
            add_reduce(1, 126);
            add_reduce(2, 178);
            prod = 128;
        }
    }
    return assertSuccess(l, prod == 128);
}
function $cover_parenthesized_expression_and_arrow_parameter_list_group_1284_115(l: Lexer): boolean {
    if (assert_consume(l, cp7fa4386a_(l)/*[...]*/)) {
        /*consume*/
        /*
           395 cover_parenthesized_expression_and_arrow_parameter_list_group_1284_115=>... • binding_pattern 
        */
        skip_fn_(l/*[ ws ][ nl ]*/);
        if ($binding_pattern(l)) {
            add_reduce(2, 178);
            prod = 129;
        }
    }
    return assertSuccess(l, prod == 129);
}
function $cover_parenthesized_expression_and_arrow_parameter_list(l: Lexer): boolean {
    if (l.utf == 40/*[(]*/) {
        /*peek*/
        /*
           396 cover_parenthesized_expression_and_arrow_parameter_list=>• ( ) 
           397 cover_parenthesized_expression_and_arrow_parameter_list=>• ( expression , ) 
           398 cover_parenthesized_expression_and_arrow_parameter_list=>• ( cover_parenthesized_expression_and_arrow_parameter_list_group_1282_114 ) 
           399 cover_parenthesized_expression_and_arrow_parameter_list=>• ( cover_parenthesized_expression_and_arrow_parameter_list_group_1284_115 ) 
           400 cover_parenthesized_expression_and_arrow_parameter_list=>• ( expression , cover_parenthesized_expression_and_arrow_parameter_list_group_1282_114 ) 
           401 cover_parenthesized_expression_and_arrow_parameter_list=>• ( expression , cover_parenthesized_expression_and_arrow_parameter_list_group_1284_115 ) 
           402 cover_parenthesized_expression_and_arrow_parameter_list=>• parenthesized 
        */
        let pk: Lexer = l.copy();
        skip_fn_(pk.next()/*[ ws ][ nl ]*/);
        if (cp7fa4386a_(pk)/*[...]*/) {
            /*peek*/
            /*
               398 cover_parenthesized_expression_and_arrow_parameter_list=>• ( cover_parenthesized_expression_and_arrow_parameter_list_group_1282_114 ) 
               399 cover_parenthesized_expression_and_arrow_parameter_list=>• ( cover_parenthesized_expression_and_arrow_parameter_list_group_1284_115 ) 
            */
            skip_fn_(l/*[ ws ][ nl ]*/);
            if (assert_consume(l, l.utf == 40/*[(]*/)) {
                /*consume*/
                /*
                   398 cover_parenthesized_expression_and_arrow_parameter_list=>( • cover_parenthesized_expression_and_arrow_parameter_list_group_1282_114 ) 
                   399 cover_parenthesized_expression_and_arrow_parameter_list=>( • cover_parenthesized_expression_and_arrow_parameter_list_group_1284_115 ) 
                */
                if (cp7fa4386a_(l)/*[...]*/) {
                    /*peek*/
                    /*
                       398 cover_parenthesized_expression_and_arrow_parameter_list=>( • cover_parenthesized_expression_and_arrow_parameter_list_group_1282_114 ) 
                       399 cover_parenthesized_expression_and_arrow_parameter_list=>( • cover_parenthesized_expression_and_arrow_parameter_list_group_1284_115 ) 
                    */
                    let pk: Lexer = l.copy();
                    skip_fn_(pk.next()/*[ ws ][ nl ]*/);
                    if (assert_table(pk, 0x0, 0x0, 0x8000000, 0x8000000)/*tbl:[ [ ] [ { ]*/) {
                        /*peek-production-closure*/
                        /*
                           399 cover_parenthesized_expression_and_arrow_parameter_list=>( • cover_parenthesized_expression_and_arrow_parameter_list_group_1284_115 ) 
                        */
                        if ($cover_parenthesized_expression_and_arrow_parameter_list_group_1284_115(l)) {
                            skip_fn_(l/*[ ws ][ nl ]*/);
                            if (assert_consume(l, l.utf == 41/*[)]*/)) {
                                add_reduce(3, 204);
                                prod = 130;
                            }
                        }
                    } else {
                        /*peek-production-closure*/
                        /*
                           398 cover_parenthesized_expression_and_arrow_parameter_list=>( • cover_parenthesized_expression_and_arrow_parameter_list_group_1282_114 ) 
                        */
                        if ($cover_parenthesized_expression_and_arrow_parameter_list_group_1282_114(l)) {
                            skip_fn_(l/*[ ws ][ nl ]*/);
                            if (assert_consume(l, l.utf == 41/*[)]*/)) {
                                add_reduce(3, 204);
                                prod = 130;
                            }
                        }
                    }
                }
            }
        } else if (pk.utf == 41/*[)]*/) {
            /*peek*/
            /*
               396 cover_parenthesized_expression_and_arrow_parameter_list=>• ( ) 
            */
            if (assert_consume(l, l.utf == 40/*[(]*/)) {
                skip_fn_(l/*[ ws ][ nl ]*/);
                if (assert_consume(l, l.utf == 41/*[)]*/)) {
                    add_reduce(2, 203);
                    prod = 130;
                }
            }
        } else if ((((cpfaa7aa14_(pk)/*[--] [-]*/ || cp0ac89158_(pk)/*[++] [+]*/) || assert_table(pk, 0x0, 0x8196, 0x88000000, 0x48000001)/*tbl:[ ! ] [ ~ ] [ ` ] [ / ] [ { ] [ [ ] [ ' ] [ " ] [ _ ] [ $ ] [ ( ]*/) || pk.isNum()/*[num]*/) || pk.isID()/*[id]*/) {
            /*peek*/
            /*
               397 cover_parenthesized_expression_and_arrow_parameter_list=>• ( expression , ) 
               400 cover_parenthesized_expression_and_arrow_parameter_list=>• ( expression , cover_parenthesized_expression_and_arrow_parameter_list_group_1282_114 ) 
               401 cover_parenthesized_expression_and_arrow_parameter_list=>• ( expression , cover_parenthesized_expression_and_arrow_parameter_list_group_1284_115 ) 
               402 cover_parenthesized_expression_and_arrow_parameter_list=>• parenthesized 
            */
            skip_fn_(l/*[ ws ][ nl ]*/);
            if (assert_consume(l, l.utf == 40/*[(]*/)) {
                /*consume*/
                /*
                   397 cover_parenthesized_expression_and_arrow_parameter_list=>( • expression , ) 
                   400 cover_parenthesized_expression_and_arrow_parameter_list=>( • expression , cover_parenthesized_expression_and_arrow_parameter_list_group_1282_114 ) 
                   401 cover_parenthesized_expression_and_arrow_parameter_list=>( • expression , cover_parenthesized_expression_and_arrow_parameter_list_group_1284_115 ) 
                   403 parenthesized=>( • expression ) 
                */
                skip_fn_(l/*[ ws ][ nl ]*/);
                if ($expression(l)) {
                    /*assert*/
                    /*
                       397 cover_parenthesized_expression_and_arrow_parameter_list=>( • expression , ) 
                       400 cover_parenthesized_expression_and_arrow_parameter_list=>( • expression , cover_parenthesized_expression_and_arrow_parameter_list_group_1282_114 ) 
                       401 cover_parenthesized_expression_and_arrow_parameter_list=>( • expression , cover_parenthesized_expression_and_arrow_parameter_list_group_1284_115 ) 
                       403 parenthesized=>( • expression ) 
                    */
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if (assert_consume(l, l.utf == 41/*[)]*/)) {
                        /*consume*/
                        /*
                           403 parenthesized=>( expression ) • 
                        */
                        add_reduce(3, 204);
                        prod = 130;
                    } else if (l.utf == 44/*[,]*/) {
                        /*peek*/
                        /*
                           397 cover_parenthesized_expression_and_arrow_parameter_list=>( expression • , ) 
                           400 cover_parenthesized_expression_and_arrow_parameter_list=>( expression • , cover_parenthesized_expression_and_arrow_parameter_list_group_1282_114 ) 
                           401 cover_parenthesized_expression_and_arrow_parameter_list=>( expression • , cover_parenthesized_expression_and_arrow_parameter_list_group_1284_115 ) 
                        */
                        let pk: Lexer = l.copy();
                        skip_fn_(pk.next()/*[ ws ][ nl ]*/);
                        if (cp7fa4386a_(pk)/*[...]*/) {
                            /*peek*/
                            /*
                               400 cover_parenthesized_expression_and_arrow_parameter_list=>( expression • , cover_parenthesized_expression_and_arrow_parameter_list_group_1282_114 ) 
                               401 cover_parenthesized_expression_and_arrow_parameter_list=>( expression • , cover_parenthesized_expression_and_arrow_parameter_list_group_1284_115 ) 
                            */
                            skip_fn_(l/*[ ws ][ nl ]*/);
                            if (assert_consume(l, l.utf == 44/*[,]*/)) {
                                /*consume*/
                                /*
                                   400 cover_parenthesized_expression_and_arrow_parameter_list=>( expression , • cover_parenthesized_expression_and_arrow_parameter_list_group_1282_114 ) 
                                   401 cover_parenthesized_expression_and_arrow_parameter_list=>( expression , • cover_parenthesized_expression_and_arrow_parameter_list_group_1284_115 ) 
                                */
                                if (cp7fa4386a_(l)/*[...]*/) {
                                    /*peek*/
                                    /*
                                       400 cover_parenthesized_expression_and_arrow_parameter_list=>( expression , • cover_parenthesized_expression_and_arrow_parameter_list_group_1282_114 ) 
                                       401 cover_parenthesized_expression_and_arrow_parameter_list=>( expression , • cover_parenthesized_expression_and_arrow_parameter_list_group_1284_115 ) 
                                    */
                                    let pk: Lexer = l.copy();
                                    skip_fn_(pk.next()/*[ ws ][ nl ]*/);
                                    if (assert_table(pk, 0x0, 0x0, 0x8000000, 0x8000000)/*tbl:[ [ ] [ { ]*/) {
                                        /*peek-production-closure*/
                                        /*
                                           401 cover_parenthesized_expression_and_arrow_parameter_list=>( expression , • cover_parenthesized_expression_and_arrow_parameter_list_group_1284_115 ) 
                                        */
                                        if ($cover_parenthesized_expression_and_arrow_parameter_list_group_1284_115(l)) {
                                            skip_fn_(l/*[ ws ][ nl ]*/);
                                            if (assert_consume(l, l.utf == 41/*[)]*/)) {
                                                add_reduce(5, 205);
                                                prod = 130;
                                            }
                                        }
                                    } else {
                                        /*peek-production-closure*/
                                        /*
                                           400 cover_parenthesized_expression_and_arrow_parameter_list=>( expression , • cover_parenthesized_expression_and_arrow_parameter_list_group_1282_114 ) 
                                        */
                                        if ($cover_parenthesized_expression_and_arrow_parameter_list_group_1282_114(l)) {
                                            skip_fn_(l/*[ ws ][ nl ]*/);
                                            if (assert_consume(l, l.utf == 41/*[)]*/)) {
                                                add_reduce(5, 205);
                                                prod = 130;
                                            }
                                        }
                                    }
                                }
                            }
                        } else if (pk.utf == 41/*[)]*/) {
                            /*peek*/
                            /*
                               397 cover_parenthesized_expression_and_arrow_parameter_list=>( expression • , ) 
                            */
                            if (assert_consume(l, l.utf == 44/*[,]*/)) {
                                skip_fn_(l/*[ ws ][ nl ]*/);
                                if (assert_consume(l, l.utf == 41/*[)]*/)) {
                                    add_reduce(4, 204);
                                    prod = 130;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return assertSuccess(l, prod == 130);
}
function $parenthesized(l: Lexer): boolean {
    if (assert_consume(l, l.utf == 40/*[(]*/)) {
        /*consume*/
        /*
           403 parenthesized=>( • expression ) 
        */
        skip_fn_(l/*[ ws ][ nl ]*/);
        if ($expression(l)) {
            skip_fn_(l/*[ ws ][ nl ]*/);
            if (assert_consume(l, l.utf == 41/*[)]*/)) {
                add_reduce(3, 204);
                prod = 131;
            }
        }
    }
    return assertSuccess(l, prod == 131);
}
function $binding_pattern(l: Lexer): boolean {
    if (l.utf == 91/*[[]*/) {
        /*assert-production-closure*/
        /*
           405 binding_pattern=>• array_binding_pattern 
        */
        if ($array_binding_pattern(l)) {
            prod = 132;
        }
    } else {
        /*assert-production-closure*/
        /*
           404 binding_pattern=>• object_binding_pattern 
        */
        if ($object_binding_pattern(l)) {
            prod = 132;
        }
    }
    return assertSuccess(l, prod == 132);
}
function $object_binding_pattern(l: Lexer): boolean {
    if (assert_consume(l, l.utf == 123/*[{]*/)) {
        /*consume*/
        /*
           406 object_binding_pattern=>{ • } 
           407 object_binding_pattern=>{ • binding_rest_property } 
           408 object_binding_pattern=>{ • binding_property_list } 
           409 object_binding_pattern=>{ • binding_property_list , binding_rest_property } 
           410 object_binding_pattern=>{ • binding_property_list , } 
        */
        if (cp7fa4386a_(l)/*[...]*/) {
            /*assert-production-closure*/
            /*
               407 object_binding_pattern=>{ • binding_rest_property } 
            */
            if ($binding_rest_property(l)) {
                skip_fn_(l/*[ ws ][ nl ]*/);
                if (assert_consume(l, l.utf == 125/*[}]*/)) {
                    add_reduce(3, 207);
                    prod = 133;
                }
            }
        } else if (assert_consume(l, l.utf == 125/*[}]*/)) {
            /*consume*/
            /*
               406 object_binding_pattern=>{ } • 
            */
            add_reduce(2, 206);
            prod = 133;
        } else {
            /*peek-production-closure*/
            /*
               408 object_binding_pattern=>{ • binding_property_list } 
               409 object_binding_pattern=>{ • binding_property_list , binding_rest_property } 
               410 object_binding_pattern=>{ • binding_property_list , } 
            */
            skip_fn_(l/*[ ws ][ nl ]*/);
            if ($binding_property_list(l)) {
                /*assert*/
                /*
                   408 object_binding_pattern=>{ • binding_property_list } 
                   409 object_binding_pattern=>{ • binding_property_list , binding_rest_property } 
                   410 object_binding_pattern=>{ • binding_property_list , } 
                */
                if (l.utf == 44/*[,]*/) {
                    /*peek*/
                    /*
                       409 object_binding_pattern=>{ binding_property_list • , binding_rest_property } 
                       410 object_binding_pattern=>{ binding_property_list • , } 
                    */
                    let pk: Lexer = l.copy();
                    skip_fn_(pk.next()/*[ ws ][ nl ]*/);
                    if (pk.utf == 125/*[}]*/) {
                        /*peek*/
                        /*
                           410 object_binding_pattern=>{ binding_property_list • , } 
                        */
                        if (assert_consume(l, l.utf == 44/*[,]*/)) {
                            skip_fn_(l/*[ ws ][ nl ]*/);
                            if (assert_consume(l, l.utf == 125/*[}]*/)) {
                                add_reduce(4, 208);
                                prod = 133;
                            }
                        }
                    } else if (cp7fa4386a_(pk)/*[...]*/) {
                        /*peek*/
                        /*
                           409 object_binding_pattern=>{ binding_property_list • , binding_rest_property } 
                        */
                        if (assert_consume(l, l.utf == 44/*[,]*/)) {
                            skip_fn_(l/*[ ws ][ nl ]*/);
                            if ($binding_rest_property(l)) {
                                skip_fn_(l/*[ ws ][ nl ]*/);
                                if (assert_consume(l, l.utf == 125/*[}]*/)) {
                                    add_reduce(5, 209);
                                    prod = 133;
                                }
                            }
                        }
                    }
                } else if (assert_consume(l, l.utf == 125/*[}]*/)) {
                    /*consume*/
                    /*
                       408 object_binding_pattern=>{ binding_property_list } • 
                    */
                    add_reduce(3, 208);
                    prod = 133;
                }
            }
        }
    }
    return assertSuccess(l, prod == 133);
}
function $array_binding_pattern(l: Lexer): boolean {
    if (assert_consume(l, l.utf == 91/*[[]*/)) {
        /*consume*/
        /*
           411 array_binding_pattern=>[ • elision binding_rest_element ] 
           412 array_binding_pattern=>[ • binding_element_list ] 
           413 array_binding_pattern=>[ • binding_element_list , elision binding_rest_element ] 
           414 array_binding_pattern=>[ • binding_rest_element ] 
           415 array_binding_pattern=>[ • elision ] 
           416 array_binding_pattern=>[ • binding_element_list , binding_rest_element ] 
           417 array_binding_pattern=>[ • binding_element_list , elision ] 
           418 array_binding_pattern=>[ • ] 
           419 array_binding_pattern=>[ • binding_element_list , ] 
        */
        skip_fn_(l/*[ ws ][ nl ]*/);
        if (assert_consume(l, l.utf == 93/*[]]*/)) {
            /*consume*/
            /*
               418 array_binding_pattern=>[ ] • 
            */
            add_reduce(2, 215);
            prod = 134;
        } else if (cp7fa4386a_(l)/*[...]*/) {
            /*assert-production-closure*/
            /*
               414 array_binding_pattern=>[ • binding_rest_element ] 
            */
            if ($binding_rest_element(l)) {
                skip_fn_(l/*[ ws ][ nl ]*/);
                if (assert_consume(l, l.utf == 93/*[]]*/)) {
                    add_reduce(3, 213);
                    prod = 134;
                }
            }
        } else if (l.utf == 44/*[,]*/) {
            /*peek*/
            /*
               411 array_binding_pattern=>[ • elision binding_rest_element ] 
               412 array_binding_pattern=>[ • binding_element_list ] 
               413 array_binding_pattern=>[ • binding_element_list , elision binding_rest_element ] 
               415 array_binding_pattern=>[ • elision ] 
               416 array_binding_pattern=>[ • binding_element_list , binding_rest_element ] 
               417 array_binding_pattern=>[ • binding_element_list , elision ] 
               419 array_binding_pattern=>[ • binding_element_list , ] 
            */
            let mk: i32 = mark();
            let anchor: Lexer = l.copy();
            /*134*/
            if ($elision(l)) {
                /*assert*/
                /*
                   411 array_binding_pattern=>[ • elision binding_rest_element ] 
                   415 array_binding_pattern=>[ • elision ] 
                */
                skip_fn_(l/*[ ws ][ nl ]*/);
                if (assert_consume(l, l.utf == 93/*[]]*/)) {
                    /*consume*/
                    /*
                       415 array_binding_pattern=>[ elision ] • 
                    */
                    add_reduce(3, 213);
                    prod = 134;
                } else {
                    /*assert-production-closure*/
                    /*
                       411 array_binding_pattern=>[ elision • binding_rest_element ] 
                    */
                    if ($binding_rest_element(l)) {
                        skip_fn_(l/*[ ws ][ nl ]*/);
                        if (assert_consume(l, l.utf == 93/*[]]*/)) {
                            add_reduce(4, 210);
                            prod = 134;
                        }
                    }
                }
            }
            if (reset(mk, anchor, l, prod == 134)) {
                prod = -1;
                if ($binding_element_list(l)) {
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if (assert_consume(l, l.utf == 93/*[]]*/)) {
                        add_reduce(3, 211);
                        prod = 134;
                    }
                }
            } else if (reset(mk, anchor, l, prod == 134)) {
                prod = -1;
                if ($binding_element_list(l)) {
                    /*assert*/
                    /*
                       413 array_binding_pattern=>[ • binding_element_list , elision binding_rest_element ] 
                       416 array_binding_pattern=>[ • binding_element_list , binding_rest_element ] 
                       417 array_binding_pattern=>[ • binding_element_list , elision ] 
                       419 array_binding_pattern=>[ • binding_element_list , ] 
                    */
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if (assert_consume(l, l.utf == 44/*[,]*/)) {
                        /*consume*/
                        /*
                           413 array_binding_pattern=>[ binding_element_list , • elision binding_rest_element ] 
                           416 array_binding_pattern=>[ binding_element_list , • binding_rest_element ] 
                           417 array_binding_pattern=>[ binding_element_list , • elision ] 
                           419 array_binding_pattern=>[ binding_element_list , • ] 
                        */
                        skip_fn_(l/*[ ws ][ nl ]*/);
                        if (assert_consume(l, l.utf == 93/*[]]*/)) {
                            /*consume*/
                            /*
                               419 array_binding_pattern=>[ binding_element_list , ] • 
                            */
                            add_reduce(4, 211);
                            prod = 134;
                        } else if (cp7fa4386a_(l)/*[...]*/) {
                            /*assert-production-closure*/
                            /*
                               416 array_binding_pattern=>[ binding_element_list , • binding_rest_element ] 
                            */
                            if ($binding_rest_element(l)) {
                                skip_fn_(l/*[ ws ][ nl ]*/);
                                if (assert_consume(l, l.utf == 93/*[]]*/)) {
                                    add_reduce(5, 214);
                                    prod = 134;
                                }
                            }
                        } else {
                            /*peek-production-closure*/
                            /*
                               413 array_binding_pattern=>[ binding_element_list , • elision binding_rest_element ] 
                               417 array_binding_pattern=>[ binding_element_list , • elision ] 
                            */
                            skip_fn_(l/*[ ws ][ nl ]*/);
                            if ($elision(l)) {
                                /*assert*/
                                /*
                                   413 array_binding_pattern=>[ binding_element_list , • elision binding_rest_element ] 
                                   417 array_binding_pattern=>[ binding_element_list , • elision ] 
                                */
                                skip_fn_(l/*[ ws ][ nl ]*/);
                                if (assert_consume(l, l.utf == 93/*[]]*/)) {
                                    /*consume*/
                                    /*
                                       417 array_binding_pattern=>[ binding_element_list , elision ] • 
                                    */
                                    add_reduce(5, 214);
                                    prod = 134;
                                } else {
                                    /*assert-production-closure*/
                                    /*
                                       413 array_binding_pattern=>[ binding_element_list , elision • binding_rest_element ] 
                                    */
                                    if ($binding_rest_element(l)) {
                                        skip_fn_(l/*[ ws ][ nl ]*/);
                                        if (assert_consume(l, l.utf == 93/*[]]*/)) {
                                            add_reduce(6, 212);
                                            prod = 134;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        } else {
            /*peek-production-closure*/
            /*
               412 array_binding_pattern=>[ • binding_element_list ] 
               413 array_binding_pattern=>[ • binding_element_list , elision binding_rest_element ] 
               416 array_binding_pattern=>[ • binding_element_list , binding_rest_element ] 
               417 array_binding_pattern=>[ • binding_element_list , elision ] 
               419 array_binding_pattern=>[ • binding_element_list , ] 
            */
            skip_fn_(l/*[ ws ][ nl ]*/);
            if ($binding_element_list(l)) {
                /*assert*/
                /*
                   412 array_binding_pattern=>[ • binding_element_list ] 
                   413 array_binding_pattern=>[ • binding_element_list , elision binding_rest_element ] 
                   416 array_binding_pattern=>[ • binding_element_list , binding_rest_element ] 
                   417 array_binding_pattern=>[ • binding_element_list , elision ] 
                   419 array_binding_pattern=>[ • binding_element_list , ] 
                */
                if (l.utf == 44/*[,]*/) {
                    /*peek*/
                    /*
                       413 array_binding_pattern=>[ binding_element_list • , elision binding_rest_element ] 
                       416 array_binding_pattern=>[ binding_element_list • , binding_rest_element ] 
                       417 array_binding_pattern=>[ binding_element_list • , elision ] 
                       419 array_binding_pattern=>[ binding_element_list • , ] 
                    */
                    let pk: Lexer = l.copy();
                    skip_fn_(pk.next()/*[ ws ][ nl ]*/);
                    if (pk.utf == 93/*[]]*/) {
                        /*peek*/
                        /*
                           419 array_binding_pattern=>[ binding_element_list • , ] 
                        */
                        if (assert_consume(l, l.utf == 44/*[,]*/)) {
                            skip_fn_(l/*[ ws ][ nl ]*/);
                            if (assert_consume(l, l.utf == 93/*[]]*/)) {
                                add_reduce(4, 211);
                                prod = 134;
                            }
                        }
                    } else if (cp7fa4386a_(pk)/*[...]*/) {
                        /*peek*/
                        /*
                           416 array_binding_pattern=>[ binding_element_list • , binding_rest_element ] 
                        */
                        if (assert_consume(l, l.utf == 44/*[,]*/)) {
                            skip_fn_(l/*[ ws ][ nl ]*/);
                            if ($binding_rest_element(l)) {
                                skip_fn_(l/*[ ws ][ nl ]*/);
                                if (assert_consume(l, l.utf == 93/*[]]*/)) {
                                    add_reduce(5, 214);
                                    prod = 134;
                                }
                            }
                        }
                    } else if (pk.utf == 44/*[,]*/) {
                        /*peek*/
                        /*
                           413 array_binding_pattern=>[ binding_element_list • , elision binding_rest_element ] 
                           417 array_binding_pattern=>[ binding_element_list • , elision ] 
                        */
                        skip_fn_(l/*[ ws ][ nl ]*/);
                        if (assert_consume(l, l.utf == 44/*[,]*/)) {
                            /*consume*/
                            /*
                               413 array_binding_pattern=>[ binding_element_list , • elision binding_rest_element ] 
                               417 array_binding_pattern=>[ binding_element_list , • elision ] 
                            */
                            skip_fn_(l/*[ ws ][ nl ]*/);
                            if ($elision(l)) {
                                /*assert*/
                                /*
                                   413 array_binding_pattern=>[ binding_element_list , • elision binding_rest_element ] 
                                   417 array_binding_pattern=>[ binding_element_list , • elision ] 
                                */
                                skip_fn_(l/*[ ws ][ nl ]*/);
                                if (assert_consume(l, l.utf == 93/*[]]*/)) {
                                    /*consume*/
                                    /*
                                       417 array_binding_pattern=>[ binding_element_list , elision ] • 
                                    */
                                    add_reduce(5, 214);
                                    prod = 134;
                                } else {
                                    /*assert-production-closure*/
                                    /*
                                       413 array_binding_pattern=>[ binding_element_list , elision • binding_rest_element ] 
                                    */
                                    if ($binding_rest_element(l)) {
                                        skip_fn_(l/*[ ws ][ nl ]*/);
                                        if (assert_consume(l, l.utf == 93/*[]]*/)) {
                                            add_reduce(6, 212);
                                            prod = 134;
                                        }
                                    }
                                }
                            }
                        }
                    }
                } else if (assert_consume(l, l.utf == 93/*[]]*/)) {
                    /*consume*/
                    /*
                       412 array_binding_pattern=>[ binding_element_list ] • 
                    */
                    add_reduce(3, 211);
                    prod = 134;
                }
            }
        }
    }
    return assertSuccess(l, prod == 134);
}
function $binding_rest_property(l: Lexer): boolean {
    if (assert_consume(l, cp7fa4386a_(l)/*[...]*/)) {
        /*consume*/
        /*
           420 binding_rest_property=>... • binding_identifier 
        */
        skip_fn_(l/*[ ws ][ nl ]*/);
        if ($identifier(l)) {
            add_reduce(1, 126);
            add_reduce(2, 178);
            prod = 135;
        }
    }
    return assertSuccess(l, prod == 135);
}
function $binding_property_list(l: Lexer): boolean {
    if ($binding_property(l)) {
        add_reduce(1, 4);
        prod = 136;
    }
    while (prod == 136) {
        let ACCEPT: boolean = false;
        skip_fn_(l/*[ ws ][ nl ]*/);
        if (assert_consume(l, l.utf == 44/*[,]*/)) {
            /*consume*/
            /*
               422 binding_property_list=>binding_property_list , • binding_property 
            */
            skip_fn_(l/*[ ws ][ nl ]*/);
            if ($binding_property(l)) {
                add_reduce(3, 216);
                prod = 136;
                ACCEPT = true;
            }
        }
        if (!ACCEPT) {
            break;
        }
    }
    return assertSuccess(l, prod == 136);
}
function $binding_element_list(l: Lexer): boolean {
    if ($binding_elision_element(l)) {
        prod = 137;
    }
    while (prod == 137) {
        let ACCEPT: boolean = false;
        skip_fn_(l/*[ ws ][ nl ]*/);
        if (assert_consume(l, l.utf == 44/*[,]*/)) {
            /*consume*/
            /*
               424 binding_element_list=>binding_element_list , • binding_elision_element 
            */
            skip_fn_(l/*[ ws ][ nl ]*/);
            if ($binding_elision_element(l)) {
                add_reduce(3, 217);
                prod = 137;
                ACCEPT = true;
            }
        }
        if (!ACCEPT) {
            break;
        }
    }
    return assertSuccess(l, prod == 137);
}
function $binding_elision_element(l: Lexer): boolean {
    if (l.utf == 44/*[,]*/) {
        /*assert-production-closure*/
        /*
           425 binding_elision_element=>• elision binding_element 
        */
        if ($elision(l)) {
            skip_fn_(l/*[ ws ][ nl ]*/);
            if ($binding_element(l)) {
                add_reduce(2, 218);
                prod = 138;
            }
        }
    } else {
        /*assert-production-closure*/
        /*
           426 binding_elision_element=>• binding_element 
        */
        if ($binding_element(l)) {
            add_reduce(1, 4);
            prod = 138;
        }
    }
    return assertSuccess(l, prod == 138);
}
function $binding_property(l: Lexer): boolean {
    if ((((cp65c0e04e_(l)/*[from]*/ || cpa3b34eda_(l)/*[as] [async]*/) || cp28cc5037_(l)/*[target]*/) || cp248c12d4_(l)/*[set]*/) || cp47b3f727_(l)/*[get]*/) {
        /*assert-production-closure*/
        /*
           534 unreserved_word=>• τfrom 
           533 unreserved_word=>• τas 
           532 unreserved_word=>• τtarget 
           531 unreserved_word=>• τset 
           530 unreserved_word=>• τget 
           529 unreserved_word=>• τasync 
        */
        if ($unreserved_word(l)) {
            prod = 181;
        }
    } else if ((((((((((((((((cpf26f817f_(l)/*[false] [function] [for] [finally]*/ || cpbb964dd2_(l)/*[true] [typeof] [try] [throw] [this]*/) || cpd93bce4d_(l)/*[null] [new]*/) || cpbf65945a_(l)/*[public] [private] [protected] [package]*/) || cpfd2df4a8_(l)/*[interface] [implements] [instanceof] [in] [import] [if]*/) || cp3e88794b_(l)/*[yield]*/) || cp88c749c1_(l)/*[with] [while]*/) || cpa457db98_(l)/*[void] [var]*/) || cp9bc3c3be_(l)/*[switch] [super]*/) || cp54e87682_(l)/*[return]*/) || cp2d6537dd_(l)/*[extends] [export] [else]*/) || cp4a63017e_(l)/*[do] [delete] [default] [debugger]*/) || cp742d6419_(l)/*[continue] [const] [class] [catch] [case]*/) || cpa88fb47a_(l)/*[break]*/) || cp4cd44fa7_(l)/*[await]*/) || assert_table(l, 0x0, 0x84, 0x8000000, 0x0)/*tbl:[ [ ] [ ' ] [ " ]*/) || l.isNum()/*[num]*/) {
        /*assert-production-closure*/
        /*
           428 binding_property=>• property_name : binding_element 
        */
        if ($property_name(l)) {
            skip_fn_(l/*[ ws ][ nl ]*/);
            if (assert_consume(l, l.utf == 58/*[:]*/)) {
                skip_fn_(l/*[ ws ][ nl ]*/);
                if ($binding_element(l)) {
                    add_reduce(3, 219);
                    prod = 139;
                }
            }
        }
    } else {
        /*assert-production-closure*/
        /*
           548 composite_identifier=>• _ 
           547 composite_identifier=>• $ 
           546 composite_identifier=>• θid 
        */
        if ($composite_identifier(l)) {
            prod = 184;
        }
    }
    while (true) {
        let ACCEPT: boolean = false;
        switch (prod) {
            case 148:
                skip_fn_(l/*[ ws ][ nl ]*/);
                if (assert_consume(l, l.utf == 58/*[:]*/)) {
                    /*consume*/
                    /*
                       428 binding_property=>property_name : • binding_element 
                    */
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if ($binding_element(l)) {
                        add_reduce(3, 219);
                        prod = 139;
                        ACCEPT = true;
                    }
                }
                break;
            case 178:
                skip_fn_000(l/*[ ws ]*/);
                if (l.utf == 61/*[=]*/) {
                    /*assert-production-closure*/
                    /*
                       432 single_name_binding=>binding_identifier • initializer 
                    */
                    if ($initializer(l)) {
                        add_reduce(2, 220);
                        prod = 139;
                        ACCEPT = true;
                    }
                } else {
                    /*assert-end*/
                    /*
                       433 single_name_binding=>binding_identifier • 
                    */
                    add_reduce(1, 221);
                    prod = 139;
                    ACCEPT = true;
                }
                break;
            case 181:
                skip_fn_000(l/*[ ws ]*/);
                if (l.utf == 58/*[:]*/) {
                    /*assert-end*/
                    /*
                       528 identifier_name=>unreserved_word • 
                    */
                    add_reduce(1, 255);
                    add_reduce(1, 227);
                    prod = 148;
                    ACCEPT = true;
                } else {
                    /*assert-end*/
                    /*
                       525 identifier=>unreserved_word • 
                    */
                    add_reduce(1, 254);
                    add_reduce(1, 126);
                    prod = 178;
                    ACCEPT = true;
                }
                break;
            case 184:
                skip_fn_000(l/*[ ws ]*/);
                if (l.utf == 58/*[:]*/) {
                    /*assert-end*/
                    /*
                       526 identifier_name=>composite_identifier • 
                    */
                    add_reduce(1, 255);
                    add_reduce(1, 227);
                    prod = 148;
                    ACCEPT = true;
                } else {
                    /*assert-end*/
                    /*
                       524 identifier=>composite_identifier • 
                    */
                    add_reduce(1, 254);
                    add_reduce(1, 126);
                    prod = 178;
                    ACCEPT = true;
                }
                break;
        }
        if (!ACCEPT) {
            break;
        }
    }
    return assertSuccess(l, prod == 139);
}
function $binding_element(l: Lexer): boolean {
    if (assert_table(l, 0x0, 0x0, 0x8000000, 0x8000000)/*tbl:[ [ ] [ { ]*/) {
        /*peek-production-closure*/
        /*
           430 binding_element=>• binding_pattern initializer 
           431 binding_element=>• binding_pattern 
        */
        skip_fn_(l/*[ ws ][ nl ]*/);
        if ($binding_pattern(l)) {
            /*assert*/
            /*
               430 binding_element=>• binding_pattern initializer 
               431 binding_element=>• binding_pattern 
            */
            skip_fn_(l/*[ ws ][ nl ]*/);
            if (l.utf == 61/*[=]*/) {
                /*assert-production-closure*/
                /*
                   430 binding_element=>binding_pattern • initializer 
                */
                if ($initializer(l)) {
                    add_reduce(2, 220);
                    prod = 140;
                }
            } else {
                /*assert-end*/
                /*
                   431 binding_element=>binding_pattern • 
                */
                add_reduce(1, 221);
                prod = 140;
            }
        }
    } else {
        /*assert-production-closure*/
        /*
           429 binding_element=>• single_name_binding 
        */
        if ($single_name_binding(l)) {
            prod = 140;
        }
    }
    return assertSuccess(l, prod == 140);
}
function $single_name_binding(l: Lexer): boolean {
    if ($binding_identifier(l)) {
        /*assert*/
        /*
           432 single_name_binding=>• binding_identifier initializer 
           433 single_name_binding=>• binding_identifier 
        */
        skip_fn_(l/*[ ws ][ nl ]*/);
        if (l.utf == 61/*[=]*/) {
            /*assert-production-closure*/
            /*
               432 single_name_binding=>binding_identifier • initializer 
            */
            if ($initializer(l)) {
                add_reduce(2, 220);
                prod = 141;
            }
        } else {
            /*assert-end*/
            /*
               433 single_name_binding=>binding_identifier • 
            */
            add_reduce(1, 221);
            prod = 141;
        }
    }
    return assertSuccess(l, prod == 141);
}
function $binding_rest_element(l: Lexer): boolean {
    if (assert_consume(l, cp7fa4386a_(l)/*[...]*/)) {
        /*consume*/
        /*
           434 binding_rest_element=>... • binding_identifier 
           435 binding_rest_element=>... • binding_pattern 
        */
        skip_fn_(l/*[ ws ][ nl ]*/);
        if (assert_table(l, 0x0, 0x0, 0x8000000, 0x8000000)/*tbl:[ [ ] [ { ]*/) {
            /*assert-production-closure*/
            /*
               435 binding_rest_element=>... • binding_pattern 
            */
            if ($binding_pattern(l)) {
                add_reduce(2, 178);
                prod = 142;
            }
        } else {
            /*assert-production-closure*/
            /*
               434 binding_rest_element=>... • binding_identifier 
            */
            if ($identifier(l)) {
                add_reduce(1, 126);
                add_reduce(2, 178);
                prod = 142;
            }
        }
    }
    return assertSuccess(l, prod == 142);
}
function $regular_expression_literal(l: Lexer): boolean {
    if (assert_consume(l, l.utf == 47/*[/]*/)) {
        /*consume*/
        /*
           436 regular_expression_literal=>/ • / def$js_identifier 
           437 regular_expression_literal=>/ • / 
        */
        skip_fn_(l/*[ ws ][ nl ]*/);
        if (assert_consume(l, l.utf == 47/*[/]*/)) {
            /*consume*/
            /*
               436 regular_expression_literal=>/ / • def$js_identifier 
               437 regular_expression_literal=>/ / • 
            */
            skip_fn_000(l/*[ ws ]*/);
            if (assert_table(l, 0x0, 0x10, 0x80000000, 0x0)/*tbl:[ _ ] [ $ ]*/ || l.isID()/*[id]*/) {
                /*assert-production-closure*/
                /*
                   436 regular_expression_literal=>/ / • def$js_identifier 
                */
                if ($def$js_id_symbols(l)) {
                    add_reduce(3, 222);
                    prod = 143;
                }
            } else {
                /*assert-end*/
                /*
                   437 regular_expression_literal=>/ / • 
                */
                add_reduce(2, 223);
                prod = 143;
            }
        }
    }
    return assertSuccess(l, prod == 143);
}
function $object_literal(l: Lexer): boolean {
    if (assert_consume(l, l.utf == 123/*[{]*/)) {
        /*consume*/
        /*
           439 object_literal=>{ • } 
           440 object_literal=>{ • property_definition_list , } 
           441 object_literal=>{ • property_definition_list } 
        */
        if (assert_consume(l, l.utf == 125/*[}]*/)) {
            /*consume*/
            /*
               439 object_literal=>{ } • 
            */
            add_reduce(2, 224);
            prod = 145;
        } else {
            /*peek-production-closure*/
            /*
               440 object_literal=>{ • property_definition_list , } 
               441 object_literal=>{ • property_definition_list } 
            */
            skip_fn_(l/*[ ws ][ nl ]*/);
            if ($property_definition_list(l)) {
                /*assert*/
                /*
                   440 object_literal=>{ • property_definition_list , } 
                   441 object_literal=>{ • property_definition_list } 
                */
                skip_fn_(l/*[ ws ][ nl ]*/);
                if (assert_consume(l, l.utf == 125/*[}]*/)) {
                    /*consume*/
                    /*
                       441 object_literal=>{ property_definition_list } • 
                    */
                    add_reduce(3, 225);
                    prod = 145;
                } else if (assert_consume(l, l.utf == 44/*[,]*/)) {
                    /*consume*/
                    /*
                       440 object_literal=>{ property_definition_list , • } 
                    */
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if (assert_consume(l, l.utf == 125/*[}]*/)) {
                        add_reduce(4, 225);
                        prod = 145;
                    }
                }
            }
        }
    }
    return assertSuccess(l, prod == 145);
}
function $property_definition_list(l: Lexer): boolean {
    if ($property_definition(l)) {
        add_reduce(1, 4);
        prod = 146;
    }
    while (prod == 146) {
        let ACCEPT: boolean = false;
        skip_fn_(l/*[ ws ][ nl ]*/);
        if (assert_consume(l, l.utf == 44/*[,]*/)) {
            /*consume*/
            /*
               443 property_definition_list=>property_definition_list , • property_definition 
            */
            skip_fn_(l/*[ ws ][ nl ]*/);
            if ($property_definition(l)) {
                add_reduce(3, 226);
                prod = 146;
                ACCEPT = true;
            }
        }
        if (!ACCEPT) {
            break;
        }
    }
    return assertSuccess(l, prod == 146);
}
function $property_definition(l: Lexer): boolean {
    if (assert_consume(l, cp7fa4386a_(l)/*[...]*/)) {
        /*consume*/
        /*
           447 property_definition=>... • assignment_expression 
        */
        skip_fn_(l/*[ ws ][ nl ]*/);
        if ($assignment_expression(l)) {
            add_reduce(2, 178);
            prod = 147;
        }
    } else if (l.utf == 91/*[[]*/) {
        /*assert-production-closure*/
        /*
           454 computed_property_name=>• [ assignment_expression ] 
        */
        if ($computed_property_name(l)) {
            add_reduce(1, 227);
            prod = 148;
        }
    } else if (l.utf == 42/*[asterisk]*/) {
        /*assert-production-closure*/
        /*
           446 property_definition=>• method_definition 
        */
        if ($method_definition(l)) {
            prod = 147;
        }
    } else if (cp248c12d4_(l)/*[set]*/) {
        /*peek*/
        /*
           444 property_definition=>• cover_initialized_name 
           445 property_definition=>• identifier_reference 
           446 property_definition=>• method_definition 
           448 property_definition=>• property_name : assignment_expression 
        */
        let pk: Lexer = l.copy();
        skip_fn_(pk.next()/*[ ws ][ nl ]*/);
        if (assert_table(pk, 0x0, 0x24000100, 0x0, 0x0)/*tbl:[ = ] [ : ] [ ( ]*/) {
            /*assert-production-closure*/
            /*
               531 unreserved_word=>• τset 
            */
            if ($unreserved_word(l)) {
                prod = 181;
            }
        } else {
            /*peek-production-closure*/
            /*
               446 property_definition=>• method_definition 
            */
            if ($method_definition(l)) {
                prod = 147;
            }
        }
    } else if (cp47b3f727_(l)/*[get]*/) {
        /*peek*/
        /*
           444 property_definition=>• cover_initialized_name 
           445 property_definition=>• identifier_reference 
           446 property_definition=>• method_definition 
           448 property_definition=>• property_name : assignment_expression 
        */
        let pk: Lexer = l.copy();
        skip_fn_(pk.next()/*[ ws ][ nl ]*/);
        if (assert_table(pk, 0x0, 0x24000100, 0x0, 0x0)/*tbl:[ = ] [ : ] [ ( ]*/) {
            /*assert-production-closure*/
            /*
               530 unreserved_word=>• τget 
            */
            if ($unreserved_word(l)) {
                prod = 181;
            }
        } else {
            /*peek-production-closure*/
            /*
               446 property_definition=>• method_definition 
            */
            if ($method_definition(l)) {
                prod = 147;
            }
        }
    } else if (cpdcbfef5f_(l)/*[async]*/) {
        /*peek*/
        /*
           444 property_definition=>• cover_initialized_name 
           445 property_definition=>• identifier_reference 
           446 property_definition=>• method_definition 
           448 property_definition=>• property_name : assignment_expression 
        */
        let pk: Lexer = l.copy();
        skip_fn_(pk.next()/*[ ws ][ nl ]*/);
        if (assert_table(pk, 0x0, 0x24000100, 0x0, 0x0)/*tbl:[ = ] [ : ] [ ( ]*/) {
            /*assert-production-closure*/
            /*
               529 unreserved_word=>• τasync 
            */
            if ($unreserved_word(l)) {
                prod = 181;
            }
        } else {
            /*peek-production-closure*/
            /*
               446 property_definition=>• method_definition 
            */
            if ($method_definition(l)) {
                prod = 147;
            }
        }
    } else if (l.isNum()/*[num]*/) {
        /*assert-production-closure*/
        /*
           517 numeric_literal=>• θnum 
        */
        if ($numeric_literal(l)) {
            add_reduce(1, 227);
            prod = 148;
        }
    } else if (assert_table(l, 0x0, 0x84, 0x0, 0x0)/*tbl:[ ' ] [ " ]*/) {
        /*assert-production-closure*/
        /*
           499 string_literal=>• ' single_quote_string ' 
           498 string_literal=>• " double_quote_string " 
        */
        if ($string_literal(l)) {
            add_reduce(1, 227);
            prod = 148;
        }
    } else if ((cp3b3b9dc5_(l)/*[false]*/ || cp97ab5935_(l)/*[true]*/) || cpe3a3596e_(l)/*[null]*/) {
        /*assert-production-closure*/
        /*
           539 reserved_word=>• τfalse 
           538 reserved_word=>• τtrue 
           537 reserved_word=>• τnull 
        */
        if ($reserved_word(l)) {
            add_reduce(1, 255);
            add_reduce(1, 227);
            prod = 148;
        }
    } else if ((cp65c0e04e_(l)/*[from]*/ || cp00a86e9e_(l)/*[as]*/) || cp28cc5037_(l)/*[target]*/) {
        /*assert-production-closure*/
        /*
           534 unreserved_word=>• τfrom 
           533 unreserved_word=>• τas 
           532 unreserved_word=>• τtarget 
        */
        if ($unreserved_word(l)) {
            prod = 181;
        }
    } else if (cpbf65945a_(l)/*[public] [private] [protected] [package]*/ || cpc47bdd9c_(l)/*[interface] [implements]*/) {
        /*assert-production-closure*/
        /*
           545 future_reserved_word=>• τpublic 
           544 future_reserved_word=>• τprivate 
           543 future_reserved_word=>• τinterface 
           542 future_reserved_word=>• τprotected 
           541 future_reserved_word=>• τpackage 
           540 future_reserved_word=>• τimplements 
        */
        if ($future_reserved_word(l)) {
            add_reduce(1, 255);
            add_reduce(1, 227);
            prod = 148;
        }
    } else if (((((((((((((cp3e88794b_(l)/*[yield]*/ || cp88c749c1_(l)/*[with] [while]*/) || cpa457db98_(l)/*[void] [var]*/) || cp241648a0_(l)/*[typeof] [try] [throw] [this]*/) || cp9bc3c3be_(l)/*[switch] [super]*/) || cp54e87682_(l)/*[return]*/) || cp8595dc97_(l)/*[new]*/) || cpe4ea5b7d_(l)/*[instanceof] [in] [import] [if]*/) || cp01881f9c_(l)/*[function] [for] [finally]*/) || cp2d6537dd_(l)/*[extends] [export] [else]*/) || cp4a63017e_(l)/*[do] [delete] [default] [debugger]*/) || cp742d6419_(l)/*[continue] [const] [class] [catch] [case]*/) || cpa88fb47a_(l)/*[break]*/) || cp4cd44fa7_(l)/*[await]*/) {
        /*assert-production-closure*/
        /*
           582 keyword=>• τyield 
           581 keyword=>• τwith 
           580 keyword=>• τwhile 
           579 keyword=>• τvoid 
           578 keyword=>• τvar 
           577 keyword=>• τtypeof 
           576 keyword=>• τtry 
           575 keyword=>• τthrow 
           574 keyword=>• τthis 
           573 keyword=>• τswitch 
           572 keyword=>• τsuper 
           571 keyword=>• τreturn 
           570 keyword=>• τnew 
           569 keyword=>• τinstanceof 
           568 keyword=>• τin 
           567 keyword=>• τimport 
           566 keyword=>• τif 
           565 keyword=>• τfunction 
           564 keyword=>• τfor 
           563 keyword=>• τfinally 
           562 keyword=>• τextends 
           561 keyword=>• τexport 
           560 keyword=>• τelse 
           559 keyword=>• τdo 
           558 keyword=>• τdelete 
           557 keyword=>• τdefault 
           556 keyword=>• τdebugger 
           555 keyword=>• τcontinue 
           554 keyword=>• τconst 
           553 keyword=>• τclass 
           552 keyword=>• τcatch 
           551 keyword=>• τcase 
           550 keyword=>• τbreak 
           549 keyword=>• τawait 
        */
        if ($keyword(l)) {
            add_reduce(1, 255);
            add_reduce(1, 227);
            prod = 148;
        }
    } else {
        /*assert-production-closure*/
        /*
           548 composite_identifier=>• _ 
           547 composite_identifier=>• $ 
           546 composite_identifier=>• θid 
        */
        if ($composite_identifier(l)) {
            prod = 184;
        }
    }
    while (true) {
        let ACCEPT: boolean = false;
        switch (prod) {
            case 148:
                skip_fn_(l/*[ ws ][ nl ]*/);
                if (assert_consume(l, l.utf == 58/*[:]*/)) {
                    /*consume*/
                    /*
                       448 property_definition=>property_name : • assignment_expression 
                    */
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if ($assignment_expression(l)) {
                        add_reduce(3, 219);
                        prod = 147;
                        ACCEPT = true;
                    }
                } else if (l.utf == 40/*[(]*/) {
                    /*peek*/
                    /*
                       247 method_definition=>property_name • ( unique_formal_parameters ) { function_body } 
                       253 method_definition=>property_name • ( ) { function_body } 
                       254 method_definition=>property_name • ( unique_formal_parameters ) { } 
                       257 method_definition=>property_name • ( ) { } 
                    */
                    let pk: Lexer = l.copy();
                    skip_fn_(pk.next()/*[ ws ][ nl ]*/);
                    if (pk.utf == 41/*[)]*/) {
                        /*peek*/
                        /*
                           253 method_definition=>property_name • ( ) { function_body } 
                           257 method_definition=>property_name • ( ) { } 
                        */
                        skip_fn_(l/*[ ws ][ nl ]*/);
                        if (assert_consume(l, l.utf == 40/*[(]*/)) {
                            /*consume*/
                            /*
                               253 method_definition=>property_name ( • ) { function_body } 
                               257 method_definition=>property_name ( • ) { } 
                            */
                            skip_fn_(l/*[ ws ][ nl ]*/);
                            if (assert_consume(l, l.utf == 41/*[)]*/)) {
                                /*consume*/
                                /*
                                   253 method_definition=>property_name ( ) • { function_body } 
                                   257 method_definition=>property_name ( ) • { } 
                                */
                                skip_fn_(l/*[ ws ][ nl ]*/);
                                if (assert_consume(l, l.utf == 123/*[{]*/)) {
                                    /*consume*/
                                    /*
                                       253 method_definition=>property_name ( ) { • function_body } 
                                       257 method_definition=>property_name ( ) { • } 
                                    */
                                    skip_fn_(l/*[ ws ][ nl ]*/);
                                    if (l.utf == 125/*[}]*/) {
                                        /*peek*/
                                        /*
                                           253 method_definition=>property_name ( ) { • function_body } 
                                           257 method_definition=>property_name ( ) { • } 
                                        */
                                        let pk: Lexer = l.copy();
                                        skip_fn_(pk.next()/*[ ws ][ nl ]*/);
                                        if ((assert_table(pk, 0x0, 0x8001494, 0x88000000, 0x20000000)/*tbl:[ , ] [ ; ] [ [ ] [ ' ] [ " ] [ _ ] [ $ ] [ * ] [ } ]*/ || pk.isNum()/*[num]*/) || pk.isID()/*[id]*/) {
                                            /*peek*/
                                            /*
                                               257 method_definition=>property_name ( ) { • } 
                                            */
                                            if (assert_consume(l, l.utf == 125/*[}]*/)) {
                                                add_reduce(5, 161);
                                                prod = 147;
                                                ACCEPT = true;
                                            }
                                        }
                                    } else {
                                        /*assert-production-closure*/
                                        /*
                                           253 method_definition=>property_name ( ) { • function_body } 
                                        */
                                        if ($function_statement_list(l)) {
                                            add_reduce(1, 120);
                                            skip_fn_(l/*[ ws ][ nl ]*/);
                                            if (assert_consume(l, l.utf == 125/*[}]*/)) {
                                                add_reduce(6, 157);
                                                prod = 147;
                                                ACCEPT = true;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    } else if ((cp7fa4386a_(pk)/*[...]*/ || assert_table(pk, 0x0, 0x10, 0x88000000, 0x8000000)/*tbl:[ _ ] [ $ ] [ [ ] [ { ]*/) || pk.isID()/*[id]*/) {
                        /*peek*/
                        /*
                           247 method_definition=>property_name • ( unique_formal_parameters ) { function_body } 
                           254 method_definition=>property_name • ( unique_formal_parameters ) { } 
                        */
                        skip_fn_(l/*[ ws ][ nl ]*/);
                        if (assert_consume(l, l.utf == 40/*[(]*/)) {
                            /*consume*/
                            /*
                               247 method_definition=>property_name ( • unique_formal_parameters ) { function_body } 
                               254 method_definition=>property_name ( • unique_formal_parameters ) { } 
                            */
                            skip_fn_(l/*[ ws ][ nl ]*/);
                            if ($unique_formal_parameters(l)) {
                                /*assert*/
                                /*
                                   247 method_definition=>property_name ( • unique_formal_parameters ) { function_body } 
                                   254 method_definition=>property_name ( • unique_formal_parameters ) { } 
                                */
                                skip_fn_(l/*[ ws ][ nl ]*/);
                                if (assert_consume(l, l.utf == 41/*[)]*/)) {
                                    /*consume*/
                                    /*
                                       247 method_definition=>property_name ( unique_formal_parameters ) • { function_body } 
                                       254 method_definition=>property_name ( unique_formal_parameters ) • { } 
                                    */
                                    skip_fn_(l/*[ ws ][ nl ]*/);
                                    if (assert_consume(l, l.utf == 123/*[{]*/)) {
                                        /*consume*/
                                        /*
                                           247 method_definition=>property_name ( unique_formal_parameters ) { • function_body } 
                                           254 method_definition=>property_name ( unique_formal_parameters ) { • } 
                                        */
                                        skip_fn_(l/*[ ws ][ nl ]*/);
                                        if (l.utf == 125/*[}]*/) {
                                            /*peek*/
                                            /*
                                               247 method_definition=>property_name ( unique_formal_parameters ) { • function_body } 
                                               254 method_definition=>property_name ( unique_formal_parameters ) { • } 
                                            */
                                            let pk: Lexer = l.copy();
                                            skip_fn_(pk.next()/*[ ws ][ nl ]*/);
                                            if ((assert_table(pk, 0x0, 0x8001494, 0x88000000, 0x20000000)/*tbl:[ , ] [ ; ] [ [ ] [ ' ] [ " ] [ _ ] [ $ ] [ * ] [ } ]*/ || pk.isNum()/*[num]*/) || pk.isID()/*[id]*/) {
                                                /*peek*/
                                                /*
                                                   254 method_definition=>property_name ( unique_formal_parameters ) { • } 
                                                */
                                                if (assert_consume(l, l.utf == 125/*[}]*/)) {
                                                    add_reduce(6, 158);
                                                    prod = 147;
                                                    ACCEPT = true;
                                                }
                                            }
                                        } else {
                                            /*assert-production-closure*/
                                            /*
                                               247 method_definition=>property_name ( unique_formal_parameters ) { • function_body } 
                                            */
                                            if ($function_statement_list(l)) {
                                                add_reduce(1, 120);
                                                skip_fn_(l/*[ ws ][ nl ]*/);
                                                if (assert_consume(l, l.utf == 125/*[}]*/)) {
                                                    add_reduce(7, 151);
                                                    prod = 147;
                                                    ACCEPT = true;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                break;
            case 177:
                skip_fn_000(l/*[ ws ]*/);
                if (l.utf == 61/*[=]*/) {
                    /*assert-production-closure*/
                    /*
                       455 cover_initialized_name=>identifier_reference • initializer 
                    */
                    if ($initializer(l)) {
                        add_reduce(2, 81);
                        prod = 147;
                        ACCEPT = true;
                    }
                } else {
                    /*assert-end*/
                    /*
                       445 property_definition=>identifier_reference • 
                    */
                    add_reduce(1, 227);
                    prod = 147;
                    ACCEPT = true;
                }
                break;
            case 181:
                skip_fn_000(l/*[ ws ]*/);
                if (l.utf == 61/*[=]*/) {
                    /*assert-end*/
                    /*
                       525 identifier=>unreserved_word • 
                    */
                    add_reduce(1, 254);
                    add_reduce(1, 253);
                    prod = 177;
                    ACCEPT = true;
                } else {
                    /*assert-end*/
                    /*
                       528 identifier_name=>unreserved_word • 
                    */
                    add_reduce(1, 255);
                    add_reduce(1, 227);
                    prod = 148;
                    ACCEPT = true;
                }
                break;
            case 184:
                skip_fn_000(l/*[ ws ]*/);
                if (l.utf == 61/*[=]*/) {
                    /*assert-end*/
                    /*
                       524 identifier=>composite_identifier • 
                    */
                    add_reduce(1, 254);
                    add_reduce(1, 253);
                    prod = 177;
                    ACCEPT = true;
                } else {
                    /*assert-end*/
                    /*
                       526 identifier_name=>composite_identifier • 
                    */
                    add_reduce(1, 255);
                    add_reduce(1, 227);
                    prod = 148;
                    ACCEPT = true;
                }
                break;
        }
        if (!ACCEPT) {
            break;
        }
    }
    return assertSuccess(l, prod == 147);
}
function $property_name(l: Lexer): boolean {
    if (l.utf == 91/*[[]*/) {
        /*assert-production-closure*/
        /*
           450 property_name=>• computed_property_name 
        */
        if ($computed_property_name(l)) {
            add_reduce(1, 227);
            prod = 148;
        }
    } else {
        /*assert-production-closure*/
        /*
           449 property_name=>• literal_property_name 
        */
        if ($literal_property_name(l)) {
            add_reduce(1, 227);
            prod = 148;
        }
    }
    return assertSuccess(l, prod == 148);
}
function $literal_property_name(l: Lexer): boolean {
    if (l.isNum()/*[num]*/) {
        /*assert-production-closure*/
        /*
           453 literal_property_name=>• numeric_literal 
        */
        if ($numeric_literal(l)) {
            prod = 149;
        }
    } else if (assert_table(l, 0x0, 0x84, 0x0, 0x0)/*tbl:[ ' ] [ " ]*/) {
        /*assert-production-closure*/
        /*
           452 literal_property_name=>• string_literal 
        */
        if ($string_literal(l)) {
            prod = 149;
        }
    } else {
        /*assert-production-closure*/
        /*
           451 literal_property_name=>• identifier_name 
        */
        if ($identifier_name(l)) {
            prod = 149;
        }
    }
    return assertSuccess(l, prod == 149);
}
function $computed_property_name(l: Lexer): boolean {
    if (assert_consume(l, l.utf == 91/*[[]*/)) {
        /*consume*/
        /*
           454 computed_property_name=>[ • assignment_expression ] 
        */
        skip_fn_(l/*[ ws ][ nl ]*/);
        if ($assignment_expression(l)) {
            skip_fn_(l/*[ ws ][ nl ]*/);
            if (assert_consume(l, l.utf == 93/*[]]*/)) {
                add_reduce(3, 228);
                prod = 150;
            }
        }
    }
    return assertSuccess(l, prod == 150);
}
function $initializer(l: Lexer): boolean {
    if (assert_consume(l, l.utf == 61/*[=]*/)) {
        /*consume*/
        /*
           456 initializer=>= • assignment_expression 
        */
        skip_fn_(l/*[ ws ][ nl ]*/);
        if ($assignment_expression(l)) {
            add_reduce(2, 229);
            prod = 152;
        }
    }
    return assertSuccess(l, prod == 152);
}
function $array_literal(l: Lexer): boolean {
    if (assert_consume(l, l.utf == 91/*[[]*/)) {
        /*consume*/
        /*
           457 array_literal=>[ • elision ] 
           458 array_literal=>[ • element_list ] 
           459 array_literal=>[ • element_list , elision ] 
           460 array_literal=>[ • ] 
           461 array_literal=>[ • element_list , ] 
        */
        skip_fn_(l/*[ ws ][ nl ]*/);
        if (assert_consume(l, l.utf == 93/*[]]*/)) {
            /*consume*/
            /*
               460 array_literal=>[ ] • 
            */
            add_reduce(2, 233);
            prod = 153;
        } else if (l.utf == 44/*[,]*/) {
            /*peek*/
            /*
               457 array_literal=>[ • elision ] 
               458 array_literal=>[ • element_list ] 
               459 array_literal=>[ • element_list , elision ] 
               461 array_literal=>[ • element_list , ] 
            */
            let mk: i32 = mark();
            let anchor: Lexer = l.copy();
            /*153*/
            if ($elision(l)) {
                skip_fn_(l/*[ ws ][ nl ]*/);
                if (assert_consume(l, l.utf == 93/*[]]*/)) {
                    add_reduce(3, 230);
                    prod = 153;
                }
            }
            if (reset(mk, anchor, l, prod == 153)) {
                prod = -1;
                if ($element_list(l)) {
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if (assert_consume(l, l.utf == 93/*[]]*/)) {
                        add_reduce(3, 231);
                        prod = 153;
                    }
                }
            } else if (reset(mk, anchor, l, prod == 153)) {
                prod = -1;
                if ($element_list(l)) {
                    /*assert*/
                    /*
                       459 array_literal=>[ • element_list , elision ] 
                       461 array_literal=>[ • element_list , ] 
                    */
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if (assert_consume(l, l.utf == 44/*[,]*/)) {
                        /*consume*/
                        /*
                           459 array_literal=>[ element_list , • elision ] 
                           461 array_literal=>[ element_list , • ] 
                        */
                        skip_fn_(l/*[ ws ][ nl ]*/);
                        if (assert_consume(l, l.utf == 93/*[]]*/)) {
                            /*consume*/
                            /*
                               461 array_literal=>[ element_list , ] • 
                            */
                            add_reduce(4, 234);
                            prod = 153;
                        } else {
                            /*assert-production-closure*/
                            /*
                               459 array_literal=>[ element_list , • elision ] 
                            */
                            if ($elision(l)) {
                                skip_fn_(l/*[ ws ][ nl ]*/);
                                if (assert_consume(l, l.utf == 93/*[]]*/)) {
                                    add_reduce(5, 232);
                                    prod = 153;
                                }
                            }
                        }
                    }
                }
            }
        } else {
            /*peek-production-closure*/
            /*
               458 array_literal=>[ • element_list ] 
               459 array_literal=>[ • element_list , elision ] 
               461 array_literal=>[ • element_list , ] 
            */
            skip_fn_(l/*[ ws ][ nl ]*/);
            if ($element_list(l)) {
                /*assert*/
                /*
                   458 array_literal=>[ • element_list ] 
                   459 array_literal=>[ • element_list , elision ] 
                   461 array_literal=>[ • element_list , ] 
                */
                if (l.utf == 44/*[,]*/) {
                    /*peek*/
                    /*
                       459 array_literal=>[ element_list • , elision ] 
                       461 array_literal=>[ element_list • , ] 
                    */
                    let pk: Lexer = l.copy();
                    skip_fn_(pk.next()/*[ ws ][ nl ]*/);
                    if (pk.utf == 93/*[]]*/) {
                        /*peek*/
                        /*
                           461 array_literal=>[ element_list • , ] 
                        */
                        if (assert_consume(l, l.utf == 44/*[,]*/)) {
                            skip_fn_(l/*[ ws ][ nl ]*/);
                            if (assert_consume(l, l.utf == 93/*[]]*/)) {
                                add_reduce(4, 234);
                                prod = 153;
                            }
                        }
                    } else if (pk.utf == 44/*[,]*/) {
                        /*peek*/
                        /*
                           459 array_literal=>[ element_list • , elision ] 
                        */
                        if (assert_consume(l, l.utf == 44/*[,]*/)) {
                            skip_fn_(l/*[ ws ][ nl ]*/);
                            if ($elision(l)) {
                                skip_fn_(l/*[ ws ][ nl ]*/);
                                if (assert_consume(l, l.utf == 93/*[]]*/)) {
                                    add_reduce(5, 232);
                                    prod = 153;
                                }
                            }
                        }
                    }
                } else if (assert_consume(l, l.utf == 93/*[]]*/)) {
                    /*consume*/
                    /*
                       458 array_literal=>[ element_list ] • 
                    */
                    add_reduce(3, 231);
                    prod = 153;
                }
            }
        }
    }
    return assertSuccess(l, prod == 153);
}
function $element_list(l: Lexer): boolean {
    if (cp7fa4386a_(l)/*[...]*/) {
        /*assert-production-closure*/
        /*
           467 element_list=>• spread_element 
        */
        if ($spread_element(l)) {
            add_reduce(1, 4);
            prod = 154;
        }
    } else if (l.utf == 44/*[,]*/) {
        /*peek-production-closure*/
        /*
           462 element_list=>• elision assignment_expression 
           463 element_list=>• elision spread_element 
        */
        skip_fn_(l/*[ ws ][ nl ]*/);
        if ($elision(l)) {
            /*assert*/
            /*
               462 element_list=>• elision assignment_expression 
               463 element_list=>• elision spread_element 
            */
            skip_fn_(l/*[ ws ][ nl ]*/);
            if (cp7fa4386a_(l)/*[...]*/) {
                /*assert-production-closure*/
                /*
                   463 element_list=>elision • spread_element 
                */
                if ($spread_element(l)) {
                    add_reduce(2, 218);
                    prod = 154;
                }
            } else {
                /*assert-production-closure*/
                /*
                   462 element_list=>elision • assignment_expression 
                */
                if ($assignment_expression(l)) {
                    add_reduce(2, 218);
                    prod = 154;
                }
            }
        }
    } else {
        /*assert-production-closure*/
        /*
           466 element_list=>• assignment_expression 
        */
        if ($assignment_expression(l)) {
            add_reduce(1, 4);
            prod = 154;
        }
    }
    while (prod == 154) {
        let ACCEPT: boolean = false;
        skip_fn_(l/*[ ws ][ nl ]*/);
        if (assert_consume(l, l.utf == 44/*[,]*/)) {
            /*consume*/
            /*
               464 element_list=>element_list , • elision assignment_expression 
               465 element_list=>element_list , • elision spread_element 
               468 element_list=>element_list , • assignment_expression 
               469 element_list=>element_list , • spread_element 
            */
            skip_fn_(l/*[ ws ][ nl ]*/);
            if (cp7fa4386a_(l)/*[...]*/) {
                /*assert-production-closure*/
                /*
                   469 element_list=>element_list , • spread_element 
                */
                if ($spread_element(l)) {
                    add_reduce(3, 216);
                    prod = 154;
                    ACCEPT = true;
                }
            } else if (l.utf == 44/*[,]*/) {
                /*peek-production-closure*/
                /*
                   464 element_list=>element_list , • elision assignment_expression 
                   465 element_list=>element_list , • elision spread_element 
                */
                skip_fn_(l/*[ ws ][ nl ]*/);
                if ($elision(l)) {
                    /*assert*/
                    /*
                       464 element_list=>element_list , • elision assignment_expression 
                       465 element_list=>element_list , • elision spread_element 
                    */
                    skip_fn_(l/*[ ws ][ nl ]*/);
                    if (cp7fa4386a_(l)/*[...]*/) {
                        /*assert-production-closure*/
                        /*
                           465 element_list=>element_list , elision • spread_element 
                        */
                        if ($spread_element(l)) {
                            add_reduce(4, 235);
                            prod = 154;
                            ACCEPT = true;
                        }
                    } else {
                        /*assert-production-closure*/
                        /*
                           464 element_list=>element_list , elision • assignment_expression 
                        */
                        if ($assignment_expression(l)) {
                            add_reduce(4, 235);
                            prod = 154;
                            ACCEPT = true;
                        }
                    }
                }
            } else if ((((cpfaa7aa14_(l)/*[-] [--]*/ || cp0ac89158_(l)/*[+] [++]*/) || assert_table(l, 0x0, 0x8196, 0x88000000, 0x48000001)/*tbl:[ ! ] [ ~ ] [ ( ] [ ` ] [ / ] [ { ] [ [ ] [ ' ] [ " ] [ _ ] [ $ ]*/) || l.isNum()/*[num]*/) || l.isID()/*[id]*/) {
                /*assert-production-closure*/
                /*
                   468 element_list=>element_list , • assignment_expression 
                */
                if ($assignment_expression(l)) {
                    add_reduce(3, 216);
                    prod = 154;
                    ACCEPT = true;
                }
            }
        }
        if (!ACCEPT) {
            break;
        }
    }
    return assertSuccess(l, prod == 154);
}
function $elision(l: Lexer): boolean {
    if (assert_consume(l, l.utf == 44/*[,]*/)) {
        /*consume*/
        /*
           470 elision=>, • 
        */
        add_reduce(1, 236);
        prod = 155;
    }
    while (prod == 155) {
        let ACCEPT: boolean = false;
        skip_fn_(l/*[ ws ][ nl ]*/);
        if (assert_consume(l, l.utf == 44/*[,]*/)) {
            /*consume*/
            /*
               471 elision=>elision , • 
            */
            add_reduce(2, 237);
            prod = 155;
            ACCEPT = true;
        }
        if (!ACCEPT) {
            break;
        }
    }
    return assertSuccess(l, prod == 155);
}
function $spread_element(l: Lexer): boolean {
    if (assert_consume(l, cp7fa4386a_(l)/*[...]*/)) {
        /*consume*/
        /*
           472 spread_element=>... • assignment_expression 
        */
        skip_fn_(l/*[ ws ][ nl ]*/);
        if ($assignment_expression(l)) {
            add_reduce(2, 178);
            prod = 156;
        }
    }
    return assertSuccess(l, prod == 156);
}
function $template_literal(l: Lexer): boolean {
    if (l.utf == 96/*[`]*/) {
        /*peek*/
        /*
           473 template_literal=>• no_substitute_template 
           474 template_literal=>• substitute_template 
        */
        let pk: Lexer = l.copy();
        skip_fn_(pk.next()/*[ ws ][ nl ]*/);
        if (cped7e7079_(pk)/*[${]*/) {
            /*peek-production-closure*/
            /*
               474 template_literal=>• substitute_template 
            */
            if ($substitute_template(l)) {
                prod = 157;
            }
        } else {
            /*peek-production-closure*/
            /*
               473 template_literal=>• no_substitute_template 
            */
            if ($no_substitute_template(l)) {
                prod = 157;
            }
        }
    }
    return assertSuccess(l, prod == 157);
}
function $no_substitute_template(l: Lexer): boolean {
    if (assert_consume(l, l.utf == 96/*[`]*/)) {
        /*consume*/
        /*
           475 no_substitute_template=>` • ` 
        */
        skip_fn_(l/*[ ws ][ nl ]*/);
        if (assert_consume(l, l.utf == 96/*[`]*/)) {
            add_reduce(2, 238);
            prod = 158;
        }
    }
    return assertSuccess(l, prod == 158);
}
function $substitute_template(l: Lexer): boolean {
    if ($template_head(l)) {
        skip_fn_(l/*[ ws ][ nl ]*/);
        if ($expression(l)) {
            skip_fn_(l/*[ ws ][ nl ]*/);
            if ($template_spans(l)) {
                add_reduce(3, 239);
                prod = 159;
            }
        }
    }
    return assertSuccess(l, prod == 159);
}
function $template_spans(l: Lexer): boolean {
    if (l.utf == 125/*[}]*/) {
        /*peek*/
        /*
           477 template_spans=>• template_tail 
           478 template_spans=>• template_middle_list template_tail 
        */
        let pk: Lexer = l.copy();
        skip_fn_(pk.next()/*[ ws ][ nl ]*/);
        if (cped7e7079_(pk)/*[${]*/) {
            /*peek-production-closure*/
            /*
               478 template_spans=>• template_middle_list template_tail 
            */
            if ($template_middle_list(l)) {
                skip_fn_(l/*[ ws ][ nl ]*/);
                if ($template_tail(l)) {
                    add_reduce(2, 240);
                    prod = 160;
                }
            }
        } else {
            /*peek-production-closure*/
            /*
               477 template_spans=>• template_tail 
            */
            if ($template_tail(l)) {
                add_reduce(1, 4);
                prod = 160;
            }
        }
    }
    return assertSuccess(l, prod == 160);
}
function $template_middle_list(l: Lexer): boolean {
    if ($template_middle(l)) {
        skip_fn_(l/*[ ws ][ nl ]*/);
        if ($expression(l)) {
            add_reduce(2, 218);
            prod = 161;
        }
    }
    while (prod == 161) {
        let ACCEPT: boolean = false;
        skip_fn_(l/*[ ws ][ nl ]*/);
        if (l.utf == 125/*[}]*/) {
            /*assert-production-closure*/
            /*
               480 template_middle_list=>template_middle_list • template_middle expression 
            */
            if ($template_middle(l)) {
                skip_fn_(l/*[ ws ][ nl ]*/);
                if ($expression(l)) {
                    add_reduce(3, 241);
                    prod = 161;
                    ACCEPT = true;
                }
            }
        }
        if (!ACCEPT) {
            break;
        }
    }
    return assertSuccess(l, prod == 161);
}
function $template_head(l: Lexer): boolean {
    if (assert_consume(l, l.utf == 96/*[`]*/)) {
        /*consume*/
        /*
           481 template_head=>` • ${ 
        */
        skip_fn_(l/*[ ws ][ nl ]*/);
        if (assert_consume(l, cped7e7079_(l)/*[${]*/)) {
            add_reduce(2, 242);
            prod = 162;
        }
    }
    return assertSuccess(l, prod == 162);
}
function $template_middle(l: Lexer): boolean {
    if (assert_consume(l, l.utf == 125/*[}]*/)) {
        /*consume*/
        /*
           482 template_middle=>} • ${ 
        */
        skip_fn_(l/*[ ws ][ nl ]*/);
        if (assert_consume(l, cped7e7079_(l)/*[${]*/)) {
            add_reduce(2, 243);
            prod = 163;
        }
    }
    return assertSuccess(l, prod == 163);
}
function $template_tail(l: Lexer): boolean {
    if (assert_consume(l, l.utf == 125/*[}]*/)) {
        /*consume*/
        /*
           483 template_tail=>} • ` 
        */
        skip_fn_(l/*[ ws ][ nl ]*/);
        if (assert_consume(l, l.utf == 96/*[`]*/)) {
            add_reduce(2, 244);
            prod = 164;
        }
    }
    return assertSuccess(l, prod == 164);
}
function $literal(l: Lexer): boolean {
    if (cpe3a3596e_(l)/*[null]*/) {
        /*assert-production-closure*/
        /*
           494 literal=>• null_literal 
        */
        if ($null_literal(l)) {
            prod = 167;
        }
    } else if (l.isNum()/*[num]*/) {
        /*peek*/
        /*
           496 literal=>• numeric_literal 
           497 literal=>• bigint 
        */
        let pk: Lexer = l.copy();
        skip_fn_(pk.next()/*[ ws ][ nl ]*/);
        if (cpc1d70283_(pk)/*[n]*/) {
            /*peek-production-closure*/
            /*
               497 literal=>• bigint 
            */
            if ($bigint(l)) {
                prod = 167;
            }
        } else {
            /*peek-production-closure*/
            /*
               496 literal=>• numeric_literal 
            */
            if ($numeric_literal(l)) {
                prod = 167;
            }
        }
    } else if (assert_table(l, 0x0, 0x84, 0x0, 0x0)/*tbl:[ ' ] [ " ]*/) {
        /*assert-production-closure*/
        /*
           495 literal=>• string_literal 
        */
        if ($string_literal(l)) {
            prod = 167;
        }
    } else {
        /*assert-production-closure*/
        /*
           493 literal=>• boolean_literal 
        */
        if ($boolean_literal(l)) {
            prod = 167;
        }
    }
    return assertSuccess(l, prod == 167);
}
function $string_literal(l: Lexer): boolean {
    if (assert_consume(l, l.utf == 39/*[']*/)) {
        /*consume*/
        /*
           499 string_literal=>' • single_quote_string ' 
        */
        skip_fn_(l/*[ ws ][ nl ]*/);
        if (assert_consume(l, __single_quote_string__(l))) {
            skip_fn_(l/*[ ws ][ nl ]*/);
            if (assert_consume(l, l.utf == 39/*[']*/)) {
                add_reduce(3, 246);
                prod = 168;
            }
        }
    } else if (assert_consume(l, l.utf == 34/*["]*/)) {
        /*consume*/
        /*
           498 string_literal=>" • double_quote_string " 
        */
        skip_fn_(l/*[ ws ][ nl ]*/);
        if (assert_consume(l, __double_quote_string__(l))) {
            skip_fn_(l/*[ ws ][ nl ]*/);
            if (assert_consume(l, l.utf == 34/*["]*/)) {
                add_reduce(3, 246);
                prod = 168;
            }
        }
    }
    return assertSuccess(l, prod == 168);
}
function $bigint(l: Lexer): boolean {
    if (assert_consume(l, l.isNum()/*[num]*/)) {
        /*consume*/
        /*
           516 bigint=>θnum • τn 
        */
        skip_fn_(l/*[ ws ][ nl ]*/);
        if (assert_consume(l, cpc1d70283_(l)/*[n]*/)) {
            add_reduce(2, 248);
            prod = 172;
        }
    }
    return assertSuccess(l, prod == 172);
}
function $numeric_literal(l: Lexer): boolean {
    if (assert_consume(l, l.isNum()/*[num]*/)) {
        /*consume*/
        /*
           517 numeric_literal=>θnum • 
        */
        add_reduce(1, 249);
        prod = 173;
    }
    return assertSuccess(l, prod == 173);
}
function $null_literal(l: Lexer): boolean {
    if (assert_consume(l, cpe3a3596e_(l)/*[null]*/)) {
        /*consume*/
        /*
           518 null_literal=>τnull • 
        */
        add_reduce(1, 250);
        prod = 174;
    }
    return assertSuccess(l, prod == 174);
}
function $boolean_literal(l: Lexer): boolean {
    if (assert_consume(l, cp3b3b9dc5_(l)/*[false]*/ || cp97ab5935_(l)/*[true]*/)) {
        /*consume*/
        /*
           520 boolean_literal=>τfalse • 
           519 boolean_literal=>τtrue • 
        */
        add_reduce(1, 251);
        prod = 175;
    }
    return assertSuccess(l, prod == 175);
}
function $binding_identifier(l: Lexer): boolean {
    if ($identifier(l)) {
        add_reduce(1, 126);
        prod = 178;
    }
    return assertSuccess(l, prod == 178);
}
function $identifier(l: Lexer): boolean {
    if ((((cp65c0e04e_(l)/*[from]*/ || cpa3b34eda_(l)/*[as] [async]*/) || cp28cc5037_(l)/*[target]*/) || cp248c12d4_(l)/*[set]*/) || cp47b3f727_(l)/*[get]*/) {
        /*assert-production-closure*/
        /*
           525 identifier=>• unreserved_word 
        */
        if ($unreserved_word(l)) {
            add_reduce(1, 254);
            prod = 179;
        }
    } else {
        /*assert-production-closure*/
        /*
           524 identifier=>• composite_identifier 
        */
        if ($composite_identifier(l)) {
            add_reduce(1, 254);
            prod = 179;
        }
    }
    return assertSuccess(l, prod == 179);
}
function $identifier_name(l: Lexer): boolean {
    if ((((cp65c0e04e_(l)/*[from]*/ || cpa3b34eda_(l)/*[as] [async]*/) || cp28cc5037_(l)/*[target]*/) || cp248c12d4_(l)/*[set]*/) || cp47b3f727_(l)/*[get]*/) {
        /*assert-production-closure*/
        /*
           528 identifier_name=>• unreserved_word 
        */
        if ($unreserved_word(l)) {
            add_reduce(1, 255);
            prod = 180;
        }
    } else if ((((((((((((((cpf26f817f_(l)/*[false] [function] [for] [finally]*/ || cpbb964dd2_(l)/*[true] [typeof] [try] [throw] [this]*/) || cpd93bce4d_(l)/*[null] [new]*/) || cpbf65945a_(l)/*[public] [private] [protected] [package]*/) || cpfd2df4a8_(l)/*[interface] [implements] [instanceof] [in] [import] [if]*/) || cp3e88794b_(l)/*[yield]*/) || cp88c749c1_(l)/*[with] [while]*/) || cpa457db98_(l)/*[void] [var]*/) || cp9bc3c3be_(l)/*[switch] [super]*/) || cp54e87682_(l)/*[return]*/) || cp2d6537dd_(l)/*[extends] [export] [else]*/) || cp4a63017e_(l)/*[do] [delete] [default] [debugger]*/) || cp742d6419_(l)/*[continue] [const] [class] [catch] [case]*/) || cpa88fb47a_(l)/*[break]*/) || cp4cd44fa7_(l)/*[await]*/) {
        /*assert-production-closure*/
        /*
           527 identifier_name=>• reserved_word 
        */
        if ($reserved_word(l)) {
            add_reduce(1, 255);
            prod = 180;
        }
    } else {
        /*assert-production-closure*/
        /*
           526 identifier_name=>• composite_identifier 
        */
        if ($composite_identifier(l)) {
            add_reduce(1, 255);
            prod = 180;
        }
    }
    return assertSuccess(l, prod == 180);
}
function $unreserved_word(l: Lexer): boolean {
    if (assert_consume(l, (((cp65c0e04e_(l)/*[from]*/ || cpa3b34eda_(l)/*[as] [async]*/) || cp28cc5037_(l)/*[target]*/) || cp248c12d4_(l)/*[set]*/) || cp47b3f727_(l)/*[get]*/)) {
        /*consume*/
        /*
           534 unreserved_word=>τfrom • 
           533 unreserved_word=>τas • 
           532 unreserved_word=>τtarget • 
           531 unreserved_word=>τset • 
           530 unreserved_word=>τget • 
           529 unreserved_word=>τasync • 
        */
        prod = 181;
    }
    return assertSuccess(l, prod == 181);
}
function $reserved_word(l: Lexer): boolean {
    if (assert_consume(l, (cp3b3b9dc5_(l)/*[false]*/ || cp97ab5935_(l)/*[true]*/) || cpe3a3596e_(l)/*[null]*/)) {
        /*consume*/
        /*
           539 reserved_word=>τfalse • 
           538 reserved_word=>τtrue • 
           537 reserved_word=>τnull • 
        */
        prod = 182;
    } else if (cpbf65945a_(l)/*[public] [private] [protected] [package]*/ || cpc47bdd9c_(l)/*[interface] [implements]*/) {
        /*assert-production-closure*/
        /*
           536 reserved_word=>• future_reserved_word 
        */
        if ($future_reserved_word(l)) {
            prod = 182;
        }
    } else {
        /*assert-production-closure*/
        /*
           535 reserved_word=>• keyword 
        */
        if ($keyword(l)) {
            prod = 182;
        }
    }
    return assertSuccess(l, prod == 182);
}
function $future_reserved_word(l: Lexer): boolean {
    if (assert_consume(l, cpbf65945a_(l)/*[public] [private] [protected] [package]*/ || cpc47bdd9c_(l)/*[interface] [implements]*/)) {
        /*consume*/
        /*
           545 future_reserved_word=>τpublic • 
           544 future_reserved_word=>τprivate • 
           543 future_reserved_word=>τinterface • 
           542 future_reserved_word=>τprotected • 
           541 future_reserved_word=>τpackage • 
           540 future_reserved_word=>τimplements • 
        */
        prod = 183;
    }
    return assertSuccess(l, prod == 183);
}
function $composite_identifier(l: Lexer): boolean {
    if (assert_consume(l, assert_table(l, 0x0, 0x10, 0x80000000, 0x0)/*tbl:[ _ ] [ $ ]*/ || l.isID()/*[id]*/)) {
        /*consume*/
        /*
           548 composite_identifier=>_ • 
           547 composite_identifier=>$ • 
           546 composite_identifier=>θid • 
        */
        prod = 184;
    }
    return assertSuccess(l, prod == 184);
}
function $keyword(l: Lexer): boolean {
    if (assert_consume(l, ((((((((((((cp3e88794b_(l)/*[yield]*/ || cp88c749c1_(l)/*[with] [while]*/) || cpa457db98_(l)/*[void] [var]*/) || cp241648a0_(l)/*[typeof] [try] [throw] [this]*/) || cp9bc3c3be_(l)/*[switch] [super]*/) || cp54e87682_(l)/*[return]*/) || cp8595dc97_(l)/*[new]*/) || cpe4ea5b7d_(l)/*[instanceof] [in] [import] [if]*/) || cp01881f9c_(l)/*[function] [for] [finally]*/) || cp2d6537dd_(l)/*[extends] [export] [else]*/) || cp4a63017e_(l)/*[do] [delete] [default] [debugger]*/) || cp742d6419_(l)/*[continue] [const] [class] [catch] [case]*/) || cpa88fb47a_(l)/*[break]*/) || cp4cd44fa7_(l)/*[await]*/)) {
        /*consume*/
        /*
           582 keyword=>τyield • 
           581 keyword=>τwith • 
           580 keyword=>τwhile • 
           579 keyword=>τvoid • 
           578 keyword=>τvar • 
           577 keyword=>τtypeof • 
           576 keyword=>τtry • 
           575 keyword=>τthrow • 
           574 keyword=>τthis • 
           573 keyword=>τswitch • 
           572 keyword=>τsuper • 
           571 keyword=>τreturn • 
           570 keyword=>τnew • 
           569 keyword=>τinstanceof • 
           568 keyword=>τin • 
           567 keyword=>τimport • 
           566 keyword=>τif • 
           565 keyword=>τfunction • 
           564 keyword=>τfor • 
           563 keyword=>τfinally • 
           562 keyword=>τextends • 
           561 keyword=>τexport • 
           560 keyword=>τelse • 
           559 keyword=>τdo • 
           558 keyword=>τdelete • 
           557 keyword=>τdefault • 
           556 keyword=>τdebugger • 
           555 keyword=>τcontinue • 
           554 keyword=>τconst • 
           553 keyword=>τclass • 
           552 keyword=>τcatch • 
           551 keyword=>τcase • 
           550 keyword=>τbreak • 
           549 keyword=>τawait • 
        */
        prod = 185;
    }
    return assertSuccess(l, prod == 185);
}
function $def$js_id_symbols(l: Lexer): boolean {
    if (assert_consume(l, assert_table(l, 0x0, 0x10, 0x80000000, 0x0)/*tbl:[ $ ] [ _ ]*/ || l.isID()/*[id]*/)) {
        /*consume*/
        /*
           645 def$js_id_symbols=>θid • 
           644 def$js_id_symbols=>$ • 
           643 def$js_id_symbols=>_ • 
        */
        prod = 207;
    }
    while (prod == 207) {
        let ACCEPT: boolean = false;
        if ((cpcbadb5c4_(l)/*[instanceof] [in]*/ || cp3ed7c1f5_(l)/*[of]*/) || l.isNL()/*[nl]*/) {
            break;
        }
        if (assert_consume(l, (assert_table(l, 0x0, 0x10, 0x80000000, 0x0)/*tbl:[ _ ] [ $ ]*/ || l.isID()/*[id]*/) || l.isNum()/*[num]*/)) {
            /*consume*/
            /*
               639 def$js_id_symbols=>def$js_id_symbols θid • 
               640 def$js_id_symbols=>def$js_id_symbols _ • 
               641 def$js_id_symbols=>def$js_id_symbols $ • 
               642 def$js_id_symbols=>def$js_id_symbols θnum • 
            */
            add_reduce(2, 247);
            prod = 207;
            ACCEPT = true;
        }
        if (!ACCEPT) {
            break;
        }
    }
    return assertSuccess(l, prod == 207);
}
function main(input_string: string): boolean {
    str = input_string;
    const l: Lexer = new Lexer();
    l.next();
    reset_counters_and_pointers();
    $javascript(l);
    set_action(0);
    set_error(0);
    return FAILED || !l.END();
}
export { main };