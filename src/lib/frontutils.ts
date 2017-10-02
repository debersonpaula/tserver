/*
* Front End Utils
* descr: generic lib
* scope: only client
* author: dpaula
* https://github.com/debersonpaula
*/

export function SendAjax(method:string,url:string,callback:(response:string)=>void){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          callback && callback( this.responseText);
        }
      };
    xhttp.open(method, url, true);
    xhttp.send();
}