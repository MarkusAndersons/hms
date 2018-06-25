# hms
```
          _____                    _____                    _____          
         /\    \                  /\    \                  /\    \         
        /::\____\                /::\____\                /::\    \        
       /:::/    /               /::::|   |               /::::\    \       
      /:::/    /               /:::::|   |              /::::::\    \      
     /:::/    /               /::::::|   |             /:::/\:::\    \     
    /:::/____/               /:::/|::|   |            /:::/__\:::\    \    
   /::::\    \              /:::/ |::|   |            \:::\   \:::\    \   
  /::::::\    \   _____    /:::/  |::|___|______    ___\:::\   \:::\    \  
 /:::/\:::\    \ /\    \  /:::/   |::::::::\    \  /\   \:::\   \:::\    \ 
/:::/  \:::\    /::\____\/:::/    |:::::::::\____\/::\   \:::\   \:::\____\
\::/    \:::\  /:::/    /\::/    / ~~~~~/:::/    /\:::\   \:::\   \::/    /
 \/____/ \:::\/:::/    /  \/____/      /:::/    /  \:::\   \:::\   \/____/ 
          \::::::/    /               /:::/    /    \:::\   \:::\    \     
           \::::/    /               /:::/    /      \:::\   \:::\____\    
           /:::/    /               /:::/    /        \:::\  /:::/    /    
          /:::/    /               /:::/    /          \:::\/:::/    /     
         /:::/    /               /:::/    /            \::::::/    /      
        /:::/    /               /:::/    /              \::::/    /       
        \::/    /                \::/    /                \::/    /        
         \/____/                  \/____/                  \/____/         
                                                                           
```

This is a housemate management system. 
Why is it an over-engineered Java Spring app rather than just something like Rails?

Simply because I want to try out spring and it's super powerful.

## To configure
Configure the DB by updating the `spring.datasource` values within the `application.properies` file.

Update the value of the JWT secret in com.markusandersons.hms.auth.AuthConstants.

## Notes
* A default user is currently initialised with username "admin" and password "password". These should be removed from data.sql