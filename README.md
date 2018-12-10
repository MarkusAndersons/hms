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
Why is it an over-engineered Java Spring app rather than just something like Rails? I have no idea.

## To configure
Configure the DB by updating the `DATABASE_URL` environment variable to be the connection string for the DB in the format `postgres://<username>:<password>@<host>:<port>/<dbname>`

Update the value of the JWT secret in com.markusandersons.hms.auth.AuthConstants.

The environment variables `MG_DOMAIN` and `MG_API_KEY` must be set to the domain and API key for a mailgun account to send emails.

## Notes
* A default user is currently initialised with username "admin" and password "password". These should be removed from data.sql
