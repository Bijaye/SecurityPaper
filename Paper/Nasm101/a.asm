extern _MessageBoxA@16
 
global _main
 
section .data
    msg  db "Vulnerable Space",0
    ttl  db "Welcome",0
 
section .text
_main:
    push  dword 0x00       ; MB_OK = 0
    push  dword ttl        ; "Welcome"
    push  dword msg        ; "Vulnerable Space"
    push  dword 0          ; handle to owner window
    call  _MessageBoxA@16  ; in user32.dll
