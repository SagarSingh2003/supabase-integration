### endpoints : 

1 )

- Req : Post ,
- action : creates a user in the permit directory
- url : https://asnvuyznngsplkniggui.supabase.co/functions/v1/createUser
- Body:
```
  {
    id : "user id that will be used to uniquely identify the user"
    defaultRole : "the default role that the users will be assigned like Admin or Employee or Viewer",
    tenant : "the tenant under which the user will be added",
    permit_token : "your permit_token"
  }
```

- example : 
![image](https://github.com/SagarSingh2003/supabase-integration/assets/129133613/e58c553e-516d-47e6-9e92-8f6d7ddbe8a0)


2 )   

- Req : Post ,
- action : checks for user permissions in permit 
- url : https://asnvuyznngsplkniggui.supabase.co/functions/v1/check-permission,
- Body :
  ```
  {
    id : "user id that will be used to uniquely identify the user",
    resource: "resource on which user want to perform the operation",
    operation: "operation which the user wants to perform",
    tenant : "the tenant under which the user is present",
    permit_token : "your permit_token"
  }
- example : 
![image](https://github.com/SagarSingh2003/supabase-integration/assets/129133613/c19927b4-5981-4b53-863c-b0ada84b2412)
