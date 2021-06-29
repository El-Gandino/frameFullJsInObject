//IndexedDB

class cookie{
    constructor(cookieName,cookieValue,daysToExpire){
        var date = new Date();
        //date.setTime(date.getTime()+(daysToExpire*24*60*60*1000));
        document.cookie = cookieName + "=" + cookieValue + ";expires=Thu, 18 Dec 2033 12:00:00 UTC";
  	}   
    static accessCookie(cookieName)
    {
      let name = cookieName + "=";
      let allCookieArray = document.cookie.split(';');
      for(let i=0; i<allCookieArray.length; i++)
      {
        let temp = allCookieArray[i].trim();
        if (temp.indexOf(name)==0)
        return temp.substring(name.length,temp.length);
         }
        return "";
    }
    static checkCookie()
    {
      let user = this.accessCookie("user");
      if (user!=""){
        return user;
      }
      else return false
    }    
		__destruct(name){
      document.cookie = name+ "=; expires = Thu, 01 Jan 1970 00:00:00 GMT"
    }
}
