# hms
This is a housemate management system. 
Why is it a Java Spring app rather than just something like Rails?
Because I want to try out spring (but I know this is going to be over engineered)

## To run on Heroku
Remove H2 from the pom and set the SPRING_DATABASE_URL environment variable - to see the value of this run `heroku run echo \$SPRING_BOOT_URL`
