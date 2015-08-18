#Tap Event Listener#

Tape event listener in JavaScript for mobile applications

## Example

```
document.addEventListener( "DOMContentLoaded", function(){
    TapEvents.init({
        eventTimeout: 0
    })
}, false );

document.getElementById('tapBtn').addEventListener('tap', function(e){
    console.log('TAP - catched on #tapBtn', e);
}, false);
```